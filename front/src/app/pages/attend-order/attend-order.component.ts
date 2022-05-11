import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { RouterService } from 'src/app/services/router.service';
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
    public router: RouterService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.orderId = Number(params['orderId']);
      this.GetOrder();
    });
  }

  GetStreetAddress(address: any) {
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
      console.error("Error al obtener l aorden", err);
      this.loading.getting = false;
    })
  }

  FinishOrder() {

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