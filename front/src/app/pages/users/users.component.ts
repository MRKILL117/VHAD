import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { matchString } from 'src/app/Common/custom-validators.directive';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  modalRef: any;
  timer: any;
  txtToFilter: string = '';
  roleToFilter: any = null;
  roles: Array<any> = [];
  users: Array<any> = [];
  selectedUser: any;
  isEditing: boolean = false;
  loading: any = {
    getting: false,
    creatingOrEditing: false,
    deleting: false,
    restoringPassword: false
  }
  userForm: FormGroup = new FormGroup({
    role: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.form.emailRegex)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstTimeConfiguration: new FormControl(true, []),
  });
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpService,
    private toast: ToastService,
    private modalService: BsModalService,
    public form: FormService
  ) { }

  ngOnInit(): void {
    this.GetRoles();
    this.GetUsers();
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static', keyboard: false});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }

  GetRoles() {
    this.http.Get(`/Accounts/Roles`).subscribe((roles: any) => {
      this.roles = roles;
      console.log(roles);
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
    this.loading.deleting = true;
    this.http.Delete(`/Accounts/${this.selectedUser ? this.selectedUser.id : 0}`).subscribe(userDeleted => {
      this.GetUsers();
      this.CloseModal();
      this.toast.ShowDefaultSuccess(`Usuario eliminado correctamente`);
      this.loading.deleting = false;
    }, err => {
      console.error("Error al eliminar usuario", err);
      this.toast.ShowDefaultDanger(`Error al eliminar el usuario`);
      this.loading.deleting = false;
    })
  }

  ChangePassword() {
    if(!this.changePasswordForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario correctamente`, `Formulario incompleto`);
      return;
    }
    
    this.loading.restoringPassword = true;
    let postParams = {
      newPassword: this.changePasswordForm.value.password
    }
    this.http.Patch(`/Accounts/${this.selectedUser ? this.selectedUser.id: 0}/SetPassword`, postParams).subscribe(userUpdated => {
      this.toast.ShowDefaultSuccess(`Contraseña actualizada correctamente`);
      this.CloseModal();
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
    this.userForm.controls['password'].setValidators([Validators.required]);
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
