import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { RoleService } from 'src/app/services/role.service';
import { RouterService } from 'src/app/services/router.service';
import { ToastService } from 'src/app/services/toast.service';

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
    })
  }

  GetOrderProductsLength(order: any): number {
    return order.products.reduce((length: number, product: any) => length + product.quantity, 0);
  }

}
