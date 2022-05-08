import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  loading: any = {
    getting: false
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.GetOrders();
  }

  GetOrders() {
    this.loading.getting = true;
    this.http.Get(`/Orders`).subscribe((orders: any) => {
      this.orders = orders;
      console.log(orders);
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener ordenes", err);
      this.loading.getting = false;
    })
  }

}
