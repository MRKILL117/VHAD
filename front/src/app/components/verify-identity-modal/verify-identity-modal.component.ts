import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-verify-identity-modal',
  templateUrl: './verify-identity-modal.component.html',
  styleUrls: ['./verify-identity-modal.component.css']
})
export class VerifyIdentityModalComponent implements OnInit {
  
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('verifyIdentityModal') verifyIdentityModal?: ModalDirective;

  user: any;
  validatingIdentity: boolean = false;
  confirmIdentityForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(this.form.emailOrCodeRegex)]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private http: HttpService,
    private role: RoleService,
    private toast: ToastService,
    public form: FormService,
  ) {
    this.user = this.role.GetUser();
    this.confirmIdentityForm.controls['username'].setValue(this.user.email);
  }

  ngOnInit(): void {
  }

  show() {
    this.verifyIdentityModal?.show();
  }
 
   ConfirmIdentity() {
     if(!this.confirmIdentityForm.valid) {
       this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
       this.confirmIdentityForm.markAllAsTouched();
       return;
     }
 
     // Formating credentials based on what user wrote
     let credentials = this.confirmIdentityForm.value;
     if(this.form.emailRegex.test(credentials.username)) {
       credentials['email'] = credentials.username;
       delete credentials.username;
     }
     this.validatingIdentity = true;
     this.http.Post(`/Accounts/VerifyIdentity`, {password: credentials.password}).subscribe(userVerified => {
       if(!userVerified) {
         this.toast.ShowDefaultDanger(`Credenciales inválidas`);
         this.validatingIdentity = false;
         return;
       }
       this.verifyIdentityModal?.hide();
       this.validatingIdentity = false;
       this.onSuccess.emit();
     }, err => {
       console.error("Error al validar credenciales", err);
       this.toast.ShowDefaultDanger(`Error al validar identidad`);
       this.validatingIdentity = false;
     });
   }

}
