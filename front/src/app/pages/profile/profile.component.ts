import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('firstTimeConfigurationModal') firstTimeConfigurationModal?: ModalDirective;
  modalRefs: Array<any> = [];
  newProfileImage: any = null;
  newProfileImagePreview: any = null;
  user: any;
  roles: Array<any> = [];
  loading: any = {
    deleting: false,
    updating: false,
    changingPassword: false
  }
  userForm: FormGroup = new FormGroup({
    role: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.form.emailRegex)])
  });
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  confirmDeletionForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(this.form.emailOrCodeRegex)]),
    password: new FormControl('', [Validators.required])
  });
  firstTimeConfigForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.form.emailRegex)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  constructor(
    private http: HttpService,
    private toast: ToastService,
    public form: FormService,
    private modalService: BsModalService,
    public file: FileService
  ) { }

  ngOnInit(): void {
    this.GetRoles();
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    if(user) this.confirmDeletionForm.controls['username'].setValue(this.user.email);
    this.CheckUserFirstConfiguration();
  }

  OpenModal(template: any) {
    this.modalRefs.push(this.modalService.show(template, {backdrop: 'static', keyboard: false}));
  }

  CloseModal() {
    if(this.modalRefs.length) this.modalRefs.pop().hide();
  }

  CloseFirstTimeConfigurationModal() {
    if(!this.firstTimeConfigForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Datos incompletos`);
      this.firstTimeConfigForm.markAllAsTouched();
      return;
    }
    this.SaveAccountData(this.firstTimeConfigForm.value);
  }

  CheckUserFirstConfiguration() {
    if(this.user && !this.user.firstTimeConfiguration) {
      setTimeout(() => {
        this.firstTimeConfigurationModal?.show();
      }, 10);
    }
  }

  OnProfileImageSelected(event: any) {
    if(event && event.target) {
      this.newProfileImage = null;
      this.newProfileImagePreview = null;
      const files = event.target.files;
      this.newProfileImage = files[0];

      // reading to get image preview
      const reader = new FileReader();
      reader.onload = (loaded => {
        this.newProfileImagePreview = reader.result;
      });
      reader.readAsDataURL(this.newProfileImage);
    }
  }

  CleanFileInput(input: any) {
    this.newProfileImage = null;
    this.newProfileImagePreview = null;
    input.value = '';
  }

  GetRoles() {
    this.http.Get(`/Accounts/Roles`).subscribe((roles: any) => {
      this.roles = roles;
    }, err => {
      console.error("Error al obtener los roles", err);
    })
  }

  PrepareUserToEdit() {
    this.userForm.controls['role'].setValue(this.user.role.name);
    this.userForm.controls['name'].setValue(this.user.name);
    this.userForm.controls['email'].setValue(this.user.email);
  }

  SaveAccountData(accountData: any) {
    this.http.Patch(`/Accounts/${this.user ? this.user.id : 0}/FirstTimeConfig`, {accountData}).subscribe(userUpdated => {
      this.http.SetUserSession(userUpdated);
      this.toast.ShowDefaultSuccess(`Datos actualizados correctamente`);
      if(this.firstTimeConfigurationModal?.isShown) this.firstTimeConfigurationModal.hide();
    }, err => {
      console.error("Error al actualizar los datos", err);
      if(err.error.error.errorCode == 410) this.toast.ShowDefaultDanger(`Email ya está registrado`);
      else this.toast.ShowDefaultDanger(`Error al actualizar los datos`);
    })
  }

  UpdateAccount() {
    if(!this.userForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de completar el formulario`, `Formulario incompleto`);
      return;
    }

    this.loading.updating = true;
    let userData = {
      ...this.userForm.value,
      generateToken: true
    }
    this.http.Patch(`/Accounts/${this.user ? this.user.id : 0}`, {userData}).subscribe((userUpdated: any) => {
      this.CloseModal();
      this.user = userUpdated;
      if(userUpdated.token) {
        const token = userUpdated.token;
        delete userUpdated.token;
        localStorage.setItem('token', token.id);
      }
      localStorage.setItem('user', JSON.stringify(userUpdated));
      this.toast.ShowDefaultSuccess(`Datos actualizados correctamente`);
      this.loading.updating = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al actualizar cuenta`);
      console.error("Error al actualizar cuenta", err);
      this.loading.updating = false;
    });
  }

  DeleteUser() {
    if(!this.confirmDeletionForm.valid) {
      this.toast.ShowDefaultWarning(`Confirmar identidad`, `Formulario incompleto`);
      this.confirmDeletionForm.markAllAsTouched();
      return;
    }
    
    // Formating credentials based on what user wrote
    let credentials = this.confirmDeletionForm.value;
    if(this.form.emailRegex.test(credentials.username)) {
      credentials['email'] = credentials.username;
      delete credentials.username;
    }
    
    this.loading.deleting = true;
    this.http.Post(`/Accounts/VerifyIdentity`, {password: credentials.password}).subscribe(userVerified => {
      if(!userVerified) {
        this.toast.ShowDefaultDanger(`Credenciales inválidas`);
        this.loading.deleting = false;
        return;
      }
      this.http.Delete(`/Accounts/${this.user ? this.user.id : 0}`).subscribe(deleted => {
        localStorage.clear();
        this.loading.deleting = false;
        location.reload();
        this.toast.ShowDefaultSuccess(`Cuenta borrada correctamente`);
      }, err => {
        this.toast.ShowDefaultDanger(`Error al borrar cuenta`);
        console.error("Error al borrar cuenta", err);
        this.loading.deleting = false;
      });
    }, err => {
      this.toast.ShowDefaultDanger(`Error al verificar identidad`);
      this.loading.deleting = false;
    })
  }

  ChangePassword() {
    if(!this.changePasswordForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario correctamente`, `Formulario inválido`);
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.loading.changingPassword = true;
    this.http.Patch(`/Accounts/${this.user ? this.user.id : 0}/ChangePassword`, {...this.changePasswordForm.value}).subscribe((newToken: any) => {
      this.CloseModal();
      localStorage.setItem('token', newToken.id);
      this.toast.ShowDefaultSuccess(`Contraseña actualizada correctamente`);
      this.loading.changingPassword = false;
    }, err => {
      console.error("Error al cambiar la contraseña", err);
      this.toast.ShowDefaultDanger(`Error al cambiar la contraseña`);
      this.loading.changingPassword = false;
    })
  }

  ChangeProflePicture() {
    if(!this.newProfileImage) {
      this.toast.ShowDefaultWarning(`Selecicone una imagen`, `Archivo no seleccionado`);
      return;
    }

    this.file.UploadFile(this.newProfileImage, 'profile-images').then(partialUrl => {
      this.http.Patch(`/Accounts/${this.user ? this.user.id : 0}/ChangeProfilePicture`, {newImage: partialUrl}).subscribe(userUpdated => {
        this.toast.ShowDefaultSuccess(`Imagen actualizada correctamente`);
        this.user = userUpdated;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.CloseModal();
      }, err => {
        console.error("Error al actualizar imagen", err);
        this.toast.ShowDefaultDanger(`Error al actualizar imagen`);
      });
    }, err => {
      console.error("Error al subir archivo", err);
      this.toast.ShowDefaultDanger(`Error al actualizar imagen`);
    });
  }

}
