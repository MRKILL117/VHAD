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

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.pattern(this.form.emailRegex)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
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
      this.toast.ShowDefaultWarning('Favor de llenar todos los campos', 'Formulario incompleto');
      return;
    }

    // Formating credentials based on what user wrote
    let credentials = this.registerForm.value;
    if(this.form.emailRegex.test(credentials.username)) {
      credentials['email'] = credentials.username;
      delete credentials.username;
    }

    this.http.Post(`/Accounts/Login`, {credentials: this.registerForm.value}).subscribe((userLogged: any) => {
      this.http.SetUserSession(userLogged);
      this.toast.ShowDefaultSuccess('Sesión iniciada correctamente');
      if(!userLogged.firstTimeConfiguration) this.router.navigate([`/${userLogged.role.name.toLowerCase()}/profile`]);
      else this.router.navigate([`/${userLogged.role.name.toLowerCase()}/dashboard`]);
    }, err => {
      console.error("Error al hacer login", err);
    })
  }

  GetLoginRoute() {
    return `${this.http.hostBaseUrl}/login`;
  }

}
