import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FileService } from 'src/app/services/file.service';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  modalRefs: Array<any> = [];
  timer: any;
  txtToFilter: string = '';
  roleToFilter: any = null;
  roles: Array<any> = [];
  rolesToCreateUser: Array<any> = [];
  users: Array<any> = [];
  selectedUser: any;
  isEditing: boolean = false;
  user: any = null;
  loading: any = {
    getting: false,
    creatingOrEditing: false,
    deleting: false,
    restoringPassword: false
  }
  passwordValidators: Array<any> = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30)
  ]
  userForm: FormGroup = new FormGroup({
    role: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(70), Validators.pattern(/^[a-zA-Z\s]{1,}$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.form.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstTimeConfiguration: new FormControl(true, this.passwordValidators),
  });
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', []),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  confirmDeletionForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(this.form.emailOrCodeRegex)]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private http: HttpService,
    private toast: ToastService,
    private modalService: BsModalService,
    public file: FileService,
    public form: FormService
  ) { }

  ngOnInit(): void {
    this.GetRoles();
    this.GetUsers();
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    if(user) this.confirmDeletionForm.controls['username'].setValue(this.user.email);
  }

  OpenModal(template: any) {
    this.modalRefs.push(this.modalService.show(template, {backdrop: 'static', keyboard: false}));
  }

  CloseModal() {
    if(this.modalRefs.length) this.modalRefs.pop().hide();
  }

  CloseAllModals() {
    while(this.modalRefs.length) this.CloseModal();
  }

  GetRoleByName(roleName: string | null): any | null {
    return this.roles.find(role => role.name == roleName);
  }

  GetRoles() {
    this.http.Get(`/Accounts/Roles`).subscribe((roles: any) => {
      this.roles = roles;
      this.rolesToCreateUser = roles.filter((role: any) => role.name != 'User');
    }, err => {
      console.error("Error al obtener los roles", err);
    })
  }

  GetUsers() {
    this.loading.getting = true;
    this.http.Get(`/Accounts/FilteredByText/${this.txtToFilter ? this.txtToFilter : '*'}/Role/${this.roleToFilter ? this.roleToFilter : '*'}`).subscribe((users: any) => {
      this.users = users;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener los usuarios", err);
      this.toast.ShowDefaultDanger(`Error al obtener los usuarios`);
      this.loading.getting = false;
    })
  }

  CreateUser() {
    if(!this.userForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de completar los datos del formulario`, `Formulario incompleto`);
      this.userForm.markAllAsTouched();
      return;
    }
    this.loading.creatingOrEditing = true;
    this.http.Post(`/Accounts/WithRole`, {user: this.userForm.value}).subscribe(newUser => {
      this.GetUsers();
      this.ResetForm(this.userForm);
      this.CloseModal();
      this.toast.ShowDefaultSuccess(`Usuario creado correctamente`);
      this.loading.creatingOrEditing = false;
    }, err => {
      console.error("Error al crear usuario", err);
      this.toast.ShowDefaultDanger(`Error al crear usuario`);
      this.loading.creatingOrEditing = false;
    });
  }

  UpdateUserAsAdmin() {
    if(!this.userForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de completar el formulario`, `Formulario incompleto`);
      this.userForm.markAllAsTouched();
      return;
    }
    this.loading.creatingOrEditing = true;
    this.http.Patch(`/Accounts/${this.selectedUser ? this.selectedUser.id : 0}/AsAdmin`, {userData: this.userForm.value}).subscribe(userUpdated => {
      this.GetUsers();
      this.ResetForm(this.userForm);
      this.CloseModal();
      this.toast.ShowDefaultSuccess(`Usuario actualizado correctamente`);
      this.loading.creatingOrEditing = false;
    }, err => {
      console.error("Error al actualizar usuario", err);
      this.toast.ShowDefaultDanger(`Error al actualizar usuario`);
      this.loading.creatingOrEditing = false;
    });
  }

  DeleteUser() {
    if(!this.confirmDeletionForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
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
      this.http.Delete(`/Accounts/${this.selectedUser ? this.selectedUser.id : 0}`).subscribe(userDeleted => {
        this.CloseAllModals();
        this.GetUsers();
        this.toast.ShowDefaultSuccess(`Usuario eliminado correctamente`);
        this.loading.deleting = false;
      }, err => {
        console.error("Error al eliminar usuario", err);
        this.toast.ShowDefaultDanger(`Error al eliminar el usuario`);
        this.loading.deleting = false;
      });
    }, err => {
      this.toast.ShowDefaultDanger(`Error al verificar identidad`);
      this.loading.deleting = false;
    })
  }

  ChangePassword() {
    if(!this.changePasswordForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario correctamente`, `Formulario incompleto`);
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    
    this.loading.restoringPassword = true;
    let postParams = {
      newPassword: this.changePasswordForm.value.password
    }
    this.http.Patch(`/Accounts/${this.selectedUser ? this.selectedUser.id: 0}/SetPassword`, postParams).subscribe(userUpdated => {
      this.toast.ShowDefaultSuccess(`Contraseña actualizada correctamente`);
      this.CloseModal();
      this.form.ResetForm(this.changePasswordForm);
      this.loading.restoringPassword = false;
    }, err => {
      console.error("Error al cambiar contraseña", err);
      this.toast.ShowDefaultDanger(`Error al cambiar contraseña`);
      this.loading.restoringPassword = false;
    })
  }

  ResetForm(form: FormGroup) {
    form.reset();
  }

  SetUserToDelete(user: any) {
    this.selectedUser = user;
  }

  SetUserToEdit(user: any) {
    this.SetValidatorsToEditUser();
    this.userForm.controls['role'].setValue(user.role.name);
    this.userForm.controls['name'].setValue(user.name);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['firstTimeConfiguration'].setValue(false);
    this.selectedUser = user;
    this.isEditing = true;
  }
  
  SetValidatorsToEditUser() {
    this.userForm.controls['password'].clearValidators();
    this.userForm.controls['confirmPassword'].clearValidators();
  }
  
  SetValidatorsToCreateUser() {
    this.userForm.controls['password'].setValidators(this.passwordValidators);
    this.userForm.controls['confirmPassword'].setValidators([Validators.required]);
    this.userForm.controls['firstTimeConfiguration'].setValue(true);
    this.isEditing = false;
  }

  SetTrigger() {
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.GetUsers();
    }, 300);
  }

}
