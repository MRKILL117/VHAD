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

  mailSent: boolean = false;
  userEmail: string = '';
  isVerificationCodeValid: boolean = false;
  loading: any = {
    sendingEmail: false,
    verifyingCode: false,
    restoringPassword: false
  }
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
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  SendEmailToRecoverAccount() {
    if(!this.recoverAccountForm.valid) {
      this.toast.ShowDefaultWarning('Favor de llenar todos los campos', 'Formulario incompleto');
      this.recoverAccountForm.markAllAsTouched();
      return;
    }

    this.loading.sendingEmail = true;
    this.http.Post(`/Accounts/SendRestorePasswordEmail`, this.recoverAccountForm.value).subscribe((user: any) => {
      this.toast.ShowDefaultSuccess('Verifique su correo', `Codigo de verificacion enviado`);
      this.userEmail = user.email;
      this.mailSent = true;
      this.loading.sendingEmail = false;
    }, err => {
      if(err.error.error.errorCode == 415) this.toast.ShowDefaultDanger(`Administradores no pueden reestablecer su contraseña`, `Admin detectado`);
      else this.toast.ShowDefaultDanger(`Correo o código incorrecto`, 'Error al recuperar cuenta');
      console.error("Error al hacer login", err);
      this.loading.sendingEmail = false;
    });
  }

  CheckIfVerificationCodeIsValid() {
    if(!this.verificationCodeForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de ingresar el PIN`, `Formulario incompleto`);
      this.verificationCodeForm.markAllAsTouched();
      return;
    }

    this.loading.verifyingCode = true;
    this.http.Post(`/Accounts/VerifyPIN`, this.verificationCodeForm.value).subscribe((user: any) => {
      if(this.userEmail != user.email) {
        this.toast.ShowDefaultDanger(`El PIN no coincide`);
        this.loading.verifyingCode = false;
        return;
      }
      this.isVerificationCodeValid = true;
      this.loading.verifyingCode = false;
    }, err => {
      console.error("Error al verificar PIN", err);
      this.toast.ShowDefaultDanger(`Error al verificar PIN`);
      this.loading.verifyingCode = false;
    })
  }

  ResetPassword() {
    if(!this.resetPasswordForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar los cmapos correctamente`, `Formulario incompleto`);
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.loading.restoringPassword = true;
    let requestParams = {
      verificationCode: this.verificationCodeForm.value.verificationCode,
      newPassword: this.resetPasswordForm.value.password
    }
    this.http.Patch(`/Accounts/RestorePassword`, requestParams).subscribe(resetPassword => {
      this.toast.ShowDefaultSuccess(`Contraseña restaurada correctamente`);
      this.BackToLogin();
      this.loading.restoringPassword = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al restaurar su contraseña`);
      this.loading.restoringPassword = false;
    })
  }

  BackToLogin() {
    this.router.navigate([`/login`]);
  }

  GetRegisterRoute() {
    return `${this.http.hostBaseUrl}/registro`;
  }

  GetLoginRoute() {
    return `${this.http.hostBaseUrl}/login`;
  }

}
