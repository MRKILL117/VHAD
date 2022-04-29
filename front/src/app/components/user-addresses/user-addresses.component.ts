import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  userAddresses: Array<any> = [];
  addressForm: FormGroup = new FormGroup({
    street: new FormControl('', [Validators.required]),
    externalNumber: new FormControl('', [Validators.required]),
    internalNumber: new FormControl('', []),
    colony: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,}$/), Validators.minLength(5), Validators.maxLength(5)]),
    betweenStreets: new FormControl('', []),
    references: new FormControl('', [])
  });

  constructor(
    private http: HttpService,
    public modal: ModalService,
    public form: FormService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  GetUserAddresses() {

  }

  AddAddressToUser() {
    if(!this.addressForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
      this.addressForm.markAllAsTouched();
      return;
    }


  }

}
