import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { RouterService } from 'src/app/services/router.service';
import { FileService } from 'src/app/services/file.service';
import { ToastService } from 'src/app/services/toast.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-attend-order',
  templateUrl: './attend-order.component.html',
  styleUrls: ['./attend-order.component.css']
})
export class AttendOrderComponent implements OnInit {

  orderId: number = 0;
  order: any = null;
  loading: any = {
    getting: false,
    updating: false
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpService,
    public file: FileService,
    public router: RouterService,
    private toast: ToastService,
    public modal: ModalService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.orderId = Number(params['orderId']);
      this.GetOrder();
    });
  }

  GetStreetAddress(address: any) {
    if(!address) return `P. Sherman calle wallaby #42 Sidney`;
    let streetAddress = `${address.street} #${address.externalNumber}`;
    if(address.internalNumber) streetAddress = streetAddress.concat(` int. ${address.internalNumber}`);
    return streetAddress
  }

  GetOrder() {
    this.loading.getting = true;
    this.http.Get(`Orders/${this.orderId}`).subscribe((order: any) => {
      this.order = order;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener la orden", err);
      this.loading.getting = false;
    });
  }

  FinishOrder(modal: any) {
    this.loading.updating = true;
    if(this.order.paymentMethod == "card" && this.order.addressId) {
      this.http.Post(`Orders/${this.orderId}/CreateShipment`, {}).subscribe(trackingNumber => {
        this.http.Patch(`Orders/${this.orderId}/SendOrder`, {}).subscribe((order: any) => {
          this.order.fedexTrackingNumber = trackingNumber;
          this.toast.ShowDefaultSuccess(`Orden actualizada correctamente`);
          this.modal.OpenModal(modal);
          this.loading.updating = false;
        }, err => {
          console.error("Error al actualizar la orden", err);
          if(err.error.error.errorCode == 508) this.toast.ShowDefaultDanger(`El pedido ha sido cancelado`);
          else this.toast.ShowDefaultDanger(`Error al actualizar orden`);
          this.loading.updating = false;
        });
      }, err => {
        console.error("Error al crear el pedido de FedEx", err);
        this.toast.ShowDefaultDanger(`Error al crear pedido FedEx`);
        this.loading.updating = false;
      });
    }
    else {
      this.http.Patch(`Orders/${this.orderId}/SendOrder`, {}).subscribe((order: any) => {
        this.toast.ShowDefaultSuccess(`Orden actualizada correctamente`);
        this.modal.OpenModal(modal);
        this.loading.updating = false;
      }, err => {
        console.error("Error al actualizar la orden", err);
        if(err.error.error.errorCode == 508) this.toast.ShowDefaultDanger(`El pedido ha sido cancelado`);
        else this.toast.ShowDefaultDanger(`Error al actualizar orden`);
        this.loading.updating = false;
      });
    }
  }

  TogglePackedProduct(product: any) {
    if(!product.hasOwnProperty('packed')) product.packed = true;
    else product.packed = !product.packed;
  }
  
  AllProductsPacked() {
    if(!this.order) return false;
    return this.order.products.every((product: any) => product.packed);
  }

}
