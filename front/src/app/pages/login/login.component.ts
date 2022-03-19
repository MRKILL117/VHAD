import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from './../../services/toast.service';
import { FormService } from './../../services/form.service';
import { HttpService } from './../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{4}$)|(^[a-zA-Z0-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$)/)]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private http: HttpService,
    public form: FormService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  Login() {
    if(!this.loginForm.valid) {
      this.toast.ShowDefaultWarning('Favor de llenar todos los campos', 'Formulario incompleto');
      return;
    }

    // Formating credentials based on what user wrote
    let credentials = this.loginForm.value;
    if(this.form.emailRegex.test(credentials.username)) {
      credentials['email'] = credentials.username;
      delete credentials.username;
    }

    this.http.Post(`/Accounts/Login`, {credentials: this.loginForm.value}).subscribe((userLogged: any) => {
      this.http.SetUserSession(userLogged);
      this.toast.ShowDefaultSuccess('Sesión iniciada correctamente');
      if(!userLogged.firstTimeConfiguration) this.router.navigate([`/${userLogged.role.name.toLowerCase()}/profile`]);
      else this.router.navigate([`/${userLogged.role.name.toLowerCase()}/dashboard`]);
    }, err => {
      this.toast.ShowDefaultDanger(`Correo y/o contraseña incorrectos`, 'Login fallido');
      console.error("Error al hacer login", err);
    })
  }

  GetRegisterRoute() {
    return `${this.http.hostBaseUrl}/registro`;
  }

}
