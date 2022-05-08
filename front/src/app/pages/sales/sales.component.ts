import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  orders: Array<any> = [];
  loading: any = {
    getting: false
  }

  constructor(
    private http: HttpService,
    public modal: ModalService
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
