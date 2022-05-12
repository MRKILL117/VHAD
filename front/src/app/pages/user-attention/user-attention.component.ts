import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-attention',
  templateUrl: './user-attention.component.html',
  styleUrls: ['./user-attention.component.css']
})
export class UserAttentionComponent implements OnInit {

  user: any;
  loading: any = {
    creating: false
  }
  attentionForm: FormGroup = new FormGroup({
    subject: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    comment: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]),
    userId: new FormControl(null, [])
  });

  constructor(
    private role: RoleService,
    private http: HttpService,
    private toast: ToastService,
    public form: FormService,
  ) {
    this.user = this.role.GetUser();
    this.attentionForm.controls['userId'].setValue(this.user ? this.user.id : 0);
  }

  ngOnInit(): void {
  }

  CreateHelpRequest() {
    if(!this.attentionForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar los campos correctamente`, `Formulario incompleto`);
      this.attentionForm.markAllAsTouched();
      return;
    }

    this.loading.creating = true;
    const userAttention = this.attentionForm.value;
    this.http.Post(`UserAttentions`, {userAttention}).subscribe(newAttention => {
      this.toast.ShowDefaultSuccess(`Solicitud de ayuda enviada`);
      this.form.ResetForm(this.attentionForm);
      this.loading.creating = false;
    }, err => {
      console.error("Error al crear solicitud de ayuda", err);
      this.toast.ShowDefaultDanger(`Error al enviar la solicitud`);
      this.loading.creating = false;
    })
  }

}
