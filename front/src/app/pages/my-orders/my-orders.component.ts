import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { RoleService } from 'src/app/services/role.service';
import { RouterService } from 'src/app/services/router.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  timer: any = null;
  user: any;
  orders: Array<any> = [];
  orderStatuses: Array<any> = [];
  statusToFilter: any = null
  startDate: string = '';
  endDate: string = '';
  loading: any = {
    getting: false,
    cancelling: false
  }
  
  constructor(
    private http: HttpService,
    private role: RoleService,
    private toast: ToastService,
    public form: FormService,
    public modal: ModalService,
    public router: RouterService
  ) {
    this.user = this.role.GetUser();
  }
  
  ngOnInit(): void {
    this.GetOrderStatuses();
    this.GetOrders();
  }

  IsCancellable(order: any) {
    const daysOld = moment().tz('America/Mexico_City').diff(moment(order.creationDate).tz('America/Mexico_City'), 'days', false);
    const minutsOld = moment().tz('America/Mexico_City').diff(moment(order.creationDate).tz('America/Mexico_City'), 'minutes', false);
    return minutsOld < 3 && order.status.name != 'Entregado';
  }

  GetOrderProductsLength(order: any): number {
    return order.products.reduce((length: number, product: any) => length + product.quantity, 0);
  }

  SetTrigger() {
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.GetOrders();
    }, 300);
  }

  GetOrderStatuses() {
    this.http.Get(`/OrderStatuses`).subscribe((orderStatuses: any) => {
      this.orderStatuses = orderStatuses;
    }, err => {
      console.error("Error al obtener los estados de ordenes", err);
    })
  }

  GetOrders() {
    const filterStatus = this.statusToFilter ? [this.statusToFilter] : [];
    this.loading.getting = true;
    this.http.Get(`/Orders/FilteredByStatusIds/${JSON.stringify(filterStatus)}/From/${this.startDate ? this.startDate : '*'}/To/${this.endDate ? this.endDate : '*'}`).subscribe((orders: any) => {
      this.orders = orders.filter((order: any) => {
        let isFromUser = order.userId == this.user.id;
        return isFromUser;
      }).sort((a:any, b:any) => {
        if(a.creationDate > b.creationDate) return -1;
        if(a.creationDate < b.creationDate) return 1;
        return 0;
      });
      this.loading.getting = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al obtener los pedidos`);
      console.error("Error al obtener ordenes", err);
      this.loading.getting = false;
    });
  }

  CancelOrder(order: any) {
    this.loading.cancelling = true;
    this.http.Delete(`Orders/${order.id}/Cancel`).subscribe(orderCancelled => {
      this.toast.ShowDefaultInfo(`Orden cancelada`);
      if(order.fedexTrackingNumber) {
        this.http.Delete(`Orders/${order.id}/CancelShipment`).subscribe(canceled => {
          this.loading.cancelling = false;
          this.GetOrders();
        }, err => {
          console.error("Error al cancelar la orden", err);
          this.loading.cancelling = false;
        });
      }
      else {
        this.loading.cancelling = false;
        this.GetOrders();
      }
    }, err => {
      console.error("Error al cancelar la orden", err);
      this.toast.ShowDefaultDanger(`Error al cancelar la orden`);
      this.loading.cancelling = false;
    });
  }

}
