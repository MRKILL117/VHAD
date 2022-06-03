import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  @Output() OnAddressSelect: EventEmitter<any> = new EventEmitter<any>(false);
  userAddresses: Array<any> = [];
  selectedAddress: any = null;
  user: any = {};
  loading: any = {
    getting: false,
    creating: false,
  }
  addressForm: FormGroup = new FormGroup({
    street: new FormControl(null, [Validators.required]),
    externalNumber: new FormControl(null, [Validators.required]),
    internalNumber: new FormControl(null, []),
    colony: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{1,}$/), Validators.minLength(5), Validators.maxLength(5)]),
    betweenStreets: new FormControl(null, []),
    references: new FormControl(null, [])
  });

  constructor(
    private http: HttpService,
    public modal: ModalService,
    public form: FormService,
    private toast: ToastService,
    private role: RoleService
  ) { }

  ngOnInit(): void {
    this.user = this.role.GetUser();
    if(this.role.GetUserRole() == 'User') this.GetUserAddresses();
    else {
      setTimeout(() => {
        this.OnAddressSelect.emit('default');
      }, 1);
    }
  }

  GetUserAddresses() {
    this.loading.getting = true;
    const user = this.role.GetUser();
    this.http.Get(`/Addresses/OfUser/${user ? user.id : 0}`).subscribe((userAddresses: any) => {
      this.userAddresses = userAddresses;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener las direcciones del usuario", err);
      this.loading.getting = false;
    });
  }

  AddAddressToUser() {
    if(!this.addressForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario`, `Formulario incompleto`);
      this.addressForm.markAllAsTouched();
      return;
    }

    this.loading.creating = true;
    const user = this.role.GetUser();
    let address = {
      ...this.addressForm.value,
      userId: user.id
    }
    this.http.Post(`/Addresses`, {address}).subscribe(newUserAddress => {
      this.toast.ShowDefaultSuccess(`Dirección creada`);
      this.modal.CloseModal();
      this.form.ResetForm(this.addressForm);
      this.GetUserAddresses();
      this.loading.creating = false;
    }, err => {
      console.error("Error al crear la dirección", err);
      this.toast.ShowDefaultDanger(`Error al crear direccón`);
      this.loading.creating = false;
    })
  }

  GetStreetAddress(address: any) {
    let streetAddress = `${address.street} #${address.externalNumber}`;
    if(address.internalNumber) streetAddress = streetAddress.concat(` int. ${address.internalNumber}`);
    return streetAddress;
  }

  SelectAddress(address: any) {
    this.selectedAddress = address;
    this.OnAddressSelect.emit(address);
  }

}
