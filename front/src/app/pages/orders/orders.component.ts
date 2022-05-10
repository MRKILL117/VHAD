import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  user: any;
  orders: Array<any> = [];
  orderStatuses: Array<any> = [];
  loading: any = {
    orderId: null,
    getting: false,
    updating: false
  }

  constructor(
    private http: HttpService,
    private role: RoleService,
    private toast: ToastService,
    private router: Router
  ) {
    this.user = this.role.GetUser();
  }

  ngOnInit(): void {
    this.GetOrderStatuses();
    this.GetOrders();
  }

  GetOrderStatuses() {
    this.http.Get(`/OrderStatuses`).subscribe((orderStatuses: any) => {
      this.orderStatuses = orderStatuses;
      console.log(orderStatuses);
    }, err => {
      console.error("Error al obtener los estados de ordenes", err);
    })
  }

  GetOrders() {
    this.loading.getting = true;
    this.http.Get(`/Orders`).subscribe((orders: any) => {
      this.orders = orders.filter((order: any) => order.status.name.includes('Abierto'));
      console.log(orders);
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
      this.loading.updating = false;
      this.loading.orderId = null;
      this.router.navigate([`/${this.user.role.name.toLowerCase()}/pedidos/${order.id}`]);
    }, err => {
      this.toast.ShowDefaultDanger(`Error al atender orden`);
      console.error("Error al atender orden", err);
      this.loading.updating = false;
      this.loading.orderId = null;
    });
  }

}
