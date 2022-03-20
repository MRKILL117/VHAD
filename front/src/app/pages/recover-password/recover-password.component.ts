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

    this.http.Post(`/Accounts/SendRestorePasswordEmail`, this.recoverAccountForm.value).subscribe((userLogged: any) => {
      this.toast.ShowDefaultSuccess('Verifique su correo', `Codigo de verificacion enviado`);
    }, err => {
      this.toast.ShowDefaultDanger(`Correo o código incorrecto`, 'Error al recuperar cuenta');
      console.error("Error al hacer login", err);
    });
  }

  GetRegisterRoute() {
    return `${this.http.hostBaseUrl}/registro`;
  }

  GetLoginRoute() {
    return `${this.http.hostBaseUrl}/login`;
  }

}
