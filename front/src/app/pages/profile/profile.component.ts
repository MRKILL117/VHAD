import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('firstTimeConfigurationModal') firstTimeConfigurationModal?: ModalDirective;
  modalRef: any = null;
  user: any;

  firstTimeConfigForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!#$%&'*+.\-/=?^_`{|}~]{1,}@{1}([a-z]){1,}\.[a-z]{2,}$/)]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private http: HttpService,
    private role: RoleService,
    private toast: ToastService,
    public form: FormService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    this.CheckUserFirstConfiguration();
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }

  CloseFirstTimeConfigurationModal() {
    if(!this.firstTimeConfigForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Datos incompletos`);
      return;
    }
    this.SaveAccountData(this.firstTimeConfigForm.value);
  }

  CheckUserFirstConfiguration() {
    if(this.user && !this.user.firstTimeConfiguration) {
      setTimeout(() => {
        this.firstTimeConfigurationModal?.show();
      }, 10);
    }
  }

  SaveAccountData(accountData: any) {
    this.http.Patch(`/Accounts/${this.user ? this.user.id : 0}/FirstTimeConfig`, {accountData}).subscribe(userUpdated => {
      this.http.SetUserSession(userUpdated);
      this.toast.ShowDefaultSuccess(`Datos actualizados correctamente`);
      if(this.firstTimeConfigurationModal?.isShown) this.firstTimeConfigurationModal.hide();
    }, err => {
      console.error("Error al actualizar los datos", err);
      if(err.error.error.errorCode == 410) this.toast.ShowDefaultDanger(`Email ya está registrado`);
      else this.toast.ShowDefaultDanger(`Error al actualizar los datos`);
    })
  }

}
