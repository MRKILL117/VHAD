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

  loginForm: FormGroup;

  constructor(
    private http: HttpService,
    public form: FormService,
    private toast: ToastService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  Login() {
    if(!this.loginForm.valid) {
      this.toast.ShowDefaultWarning('Favor de llenar todos los campos', 'Formulario incompleto');
      return;
    }
    this.http.Post(`/Accounts/Login`, {credentials: this.loginForm.value}).subscribe((userLogged: any) => {
      this.SetUserSession(userLogged);
      this.toast.ShowDefaultSuccess('Sesión iniciada correctamente');
      this.router.navigate([`/${userLogged.role.name.toLowerCase()}/dashboard`]);
    }, err => {
      console.error("Error al hacer login", err);
    })
  }

  SetUserSession(userLogged: any) {
    if(userLogged) {
      const userToken = userLogged.token;
      delete userLogged.token;
      localStorage.setItem('token', userToken.id);
      localStorage.setItem('user', JSON.stringify(userLogged));
    }
  }

}
