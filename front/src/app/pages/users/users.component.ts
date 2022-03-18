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
  roles: Array<any> = [];
  users: Array<any> = [];
  loading: any = {
    getting: false,
    creating: false,
    restoringPassword: false
  }
  userForm: FormGroup = new FormGroup({
    role: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.form.emailRegex)]),
    password: new FormControl('', [Validators.required]),
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
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
    this.ResetForm(this.userForm);
    this.ResetForm(this.changePasswordForm);
  }

  OnPasswordChange(form: FormGroup, controlName: string, controlNameToUpdateValidator: string) {
    const formControl: AbstractControl | null = this.form.GetFormControlByName(form, controlName);
    const formControltoUpdateValidator: AbstractControl | null = this.form.GetFormControlByName(form, controlNameToUpdateValidator);
    if(formControl != null && formControltoUpdateValidator != null) {
      const controlValue = formControl.value;
      formControltoUpdateValidator.setValidators([
        Validators.required,
        matchString(controlValue)
      ]);
      formControltoUpdateValidator.updateValueAndValidity({onlySelf: true});
    }
  }

  GetRoles() {
    this.http.Get(`/Accounts/Roles`).subscribe((roles: any) => {
      this.roles = roles.filter((role: any) => role.name != 'User');
    }, err => {
      console.error("Error al obtener los roles", err);
    })
  }

  GetUsers() {
    this.loading.getting = true;
    this.http.Get(`/Accounts`).subscribe((users: any) => {
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
    this.loading.creating = true;
    this.http.Post(`/Accounts/WithRole`, {user: this.userForm.value}).subscribe(newUser => {
      this.GetUsers();
      this.ResetForm(this.userForm);
      this.CloseModal();
      this.toast.ShowDefaultSuccess(`Usuario creado correctamente`);
      this.loading.creating = false;
    }, err => {
      console.error("Error al crear usuario", err);
      this.toast.ShowDefaultDanger(`Error al crear usuario`);
      this.loading.creating = false;
    });
  }

  RestorePassword() {
    this.loading.restoringPassword = true;
    this.http.Patch(``, {}).subscribe(userUpdated => {
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

}
