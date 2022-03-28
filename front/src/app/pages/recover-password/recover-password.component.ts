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

  mailSent: boolean = true;
  userEmail: string = 'aromanomacias@gmail.com';
  isVerificationCodeValid: boolean = false;
  recoverAccountForm: FormGroup = new FormGroup({
    emailOrUsername: new FormControl('', [Validators.required, Validators.pattern(this.form.emailOrCodeRegex)]),
  });
  verificationCodeForm: FormGroup = new FormGroup({
    verificationCode: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{6}$)/)]),
  });
  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpService,
    public form: FormService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  SendEmailToRecoverAccount() {
    if(!this.recoverAccountForm.valid) {
      this.toast.ShowDefaultWarning('Favor de llenar todos los campos', 'Formulario incompleto');
      return;
    }

    this.http.Post(`/Accounts/SendRestorePasswordEmail`, this.recoverAccountForm.value).subscribe((user: any) => {
      this.toast.ShowDefaultSuccess('Verifique su correo', `Codigo de verificacion enviado`);
      this.userEmail = user.email;
      this.mailSent = true;
    }, err => {
      this.toast.ShowDefaultDanger(`Correo o código incorrecto`, 'Error al recuperar cuenta');
      console.error("Error al hacer login", err);
    });
  }

  CheckIfVerificationCodeIsValid() {
    if(!this.verificationCodeForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de ingresar el PIN`, `Formulario incompleto`);
      return;
    }
    this.http.Post(`/Accounts/VerifyPIN`, this.verificationCodeForm.value).subscribe((userEmail: any) => {
      if(this.userEmail != userEmail) {
        this.toast.ShowDefaultDanger(`El PIN no coincide`);
        return;
      }
      this.isVerificationCodeValid = true;
    }, err => {
      console.error("Error al verificar PIN", err);
      this.toast.ShowDefaultDanger(`Error al verificar PIN`);
    })
  }

  ResetPassword() {

  }

  GetRegisterRoute() {
    return `${this.http.hostBaseUrl}/registro`;
  }

  GetLoginRoute() {
    return `${this.http.hostBaseUrl}/login`;
  }

}
