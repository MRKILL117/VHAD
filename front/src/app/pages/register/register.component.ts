import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchString } from 'src/app/Common/custom-validators.directive';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: any = {
    creating: false
  }
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.form.emailRegex)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    firstTimeConfiguration: new FormControl(true, []),
  });

  constructor(
    private http: HttpService,
    public form: FormService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  RegisterUser() {
    if(!this.registerForm.valid) {
      this.toast.ShowDefaultWarning('Favor de llenar el formulario correctamente', 'Formulario incompleto');
      return;
    }

    this.loading.creating = true;
    this.http.Post(`/Accounts/RegisterUser`, {userData: this.registerForm.value}).subscribe((userRegister: any) => {
      this.http.Post(`/Accounts/Login`, {credentials: this.registerForm.value}).subscribe((userLogged: any) => {
        this.http.SetUserSession(userLogged);
        this.toast.ShowDefaultSuccess('Sesión iniciada correctamente');
        this.loading.creating = false;
        this.router.navigate([`/${userLogged.role.name.toLowerCase()}/dashboard`]);
      }, err => {
        console.error("Error al iniciar sesión", err);
        this.loading.creating = false;
      });
    }, err => {
      console.error("Error al hacer login", err);
      this.loading.creating = false;
    });
  }

  GetLoginRoute() {
    return `${this.http.hostBaseUrl}/login`;
  }

}
