import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { RouterService } from 'src/app/services/router.service';
import { ToastService } from 'src/app/services/toast.service';
import { FileService } from 'src/app/services/file.service';

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
    public file: FileService,
    private toast: ToastService,
    public router: RouterService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.orderId = Number(params['orderId']);
      this.GetOrder();
    });
  }

  GetOrder() {
    this.loading.getting = true;
    this.http.Get(`Orders/${this.orderId}`).subscribe((order: any) => {
      this.order = order;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener l aorden", err);
      this.loading.getting = false;
    })
  }

}
