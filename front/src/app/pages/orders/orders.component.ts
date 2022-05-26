import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { RoleService } from 'src/app/services/role.service';
import { RouterService } from 'src/app/services/router.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  timer: any = null;
  user: any;
  selectedOrder: any = null;
  orders: Array<any> = [];
  orderStatuses: Array<any> = [];
  statusToFilter: any = null
  startDate: string = '';
  endDate: string = '';
  loading: any = {
    orderId: null,
    getting: false,
    updating: false
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
        let isAdmin = this.role.GetUserRole() == 'Admin';
        let isClosed = order.status.name == 'Entregado';
        let isFromUser = order.sellerId == this.user.id;
        let hasSeller = !!order.sellerId
        return (isFromUser || !hasSeller || isAdmin) && !isClosed;
      });
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener ordenes", err);
      this.loading.getting = false;
    })
  }
  
  GetOrderProductsLength(order: any): number {
    return order.products.reduce((length: number, product: any) => length + product.quantity, 0);
  }
  
  AttendOrder(order: any) {
    this.loading.orderId = order.id;
    this.loading.updating = true;
    this.http.Patch(`/Orders/${order ? order.id : 0}/AttendedBy`, {sellerId: this.user ? this.user.id : 0}).subscribe(orderUpdated => {
      this.modal.CloseModal();
      this.loading.updating = false;
      this.loading.orderId = null;
      this.router.GoToRoute(`/pedidos/${order.id}`);
    }, err => {
      this.GetOrders();
      this.toast.ShowDefaultDanger(`Error al atender orden`);
      console.error("Error al atender orden", err);
      this.loading.updating = false;
      this.loading.orderId = null;
    });
  }
  
  CloseOrder(order: any) {
    this.http.Patch(`Orders/${order ? order.id : 0}/ChangeStatus`, {status: 'entregado'}).subscribe((order: any) => {
      this.toast.ShowDefaultSuccess(`Orden actualizada correctamente`);
      this.GetOrders();
    }, err => {
      console.error("Error al actualizar la orden", err);
      this.toast.ShowDefaultDanger(`Error al actualizar orden`);
    });
  }

}
