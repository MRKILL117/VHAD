import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FileService } from 'src/app/services/file.service';
import { HttpService } from 'src/app/services/http.service';
import { RouterService } from 'src/app/services/router.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: number | null = null;
  product: any = null;
  loading: any = {
    getting: false
  }

  constructor(
    public http: HttpService,
    public file: FileService,
    public router: RouterService,
    private toast: ToastService,
    public cart: CartService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.productId = Number(params.productId);
      this.GetProduct();
    })
  }

  GetProduct() {
    this.loading.getting = true;
    this.http.Get(`Products/${this.productId ? this.productId : 0}`).subscribe((product: any) => {
      this.product = product;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener el producto", err);
      this.loading.getting = false;
    });
  }

}
