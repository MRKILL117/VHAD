import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  user: any;
  orders: Array<any> = [];
  loading: any = {
    getting: false
  }

  constructor(
    private http: HttpService,
    private role: RoleService
  ) {
    this.user = this.role.GetUser();
  }

  ngOnInit(): void {
    this.GetOrders();
  }

  GetOrderProductsLength(order: any): number {
    return order.products.reduce((length: number, product: any) => length + product.quantity, 0);
  }

  GetOrders() {
    this.loading.getting = true;
    this.http.Get(`/Orders/`).subscribe((orders: any) => {
      this.orders = orders.filter((order: any) => {
        let isAdmin = this.role.GetUserRole() == 'Admin';
        let isFromUser = order.sellerId == this.user.id;
        let isFinished = order.status.name == 'Entregado';
        return isFromUser || isAdmin || isFinished;
      });
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener ordenes", err);
      this.loading.getting = false;
    });
  }

}
