import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

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
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.orderId = Number(params['orderId']);
    });
  }

  GetOrder() {
    this.loading.getting = true;
    this.http.Get(`Orderd/${this.orderId}`).subscribe((order: any) => {
      this.order = order;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener l aorden", err);
      this.loading.getting = false;
    })
  }

}
