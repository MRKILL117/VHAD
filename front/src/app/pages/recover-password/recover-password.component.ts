import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverAccountForm: FormGroup = new FormGroup({
    emailOrUsername: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{4}$)|(^[a-zA-Z0-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$)/)]),
  });

  constructor(
    private http: HttpService,
    public form: FormService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  SendEmailToRecoverAccount() {
    if(!this.recoverAccountForm.valid) {
      this.toast.ShowDefaultWarning('Favor de llenar todos los campos', 'Formulario incompleto');
      return;
    }

    // Formating credentials based on what user wrote
    let credentials = this.recoverAccountForm.value;
    if(this.form.emailRegex.test(credentials.username)) {
      credentials['email'] = credentials.username;
      delete credentials.username;
    }

    this.http.Post(`/Accounts/Login`, {credentials: this.recoverAccountForm.value}).subscribe((userLogged: any) => {
      this.http.SetUserSession(userLogged);
      this.toast.ShowDefaultSuccess('Sesión iniciada correctamente');
      if(!userLogged.firstTimeConfiguration) this.router.navigate([`/${userLogged.role.name.toLowerCase()}/profile`]);
      else this.router.navigate([`/${userLogged.role.name.toLowerCase()}/dashboard`]);
    }, err => {
      this.toast.ShowDefaultDanger(`Correo y/o contraseña incorrectos`, 'Login fallido');
      console.error("Error al hacer login", err);
    });
  }

  GetRegisterRoute() {
    return `${this.http.hostBaseUrl}/registro`;
  }

  GetRecoverPasswordRoute() {
    return `${this.http.hostBaseUrl}/recuperar-cuenta`;
  }

}
