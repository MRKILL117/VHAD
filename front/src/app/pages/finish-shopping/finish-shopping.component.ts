import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FileService } from 'src/app/services/file.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-finish-shopping',
  templateUrl: './finish-shopping.component.html',
  styleUrls: ['./finish-shopping.component.css']
})
export class FinishShoppingComponent implements OnInit {

  cartProducts: Array<any> = [];
  currentStep: number = 2;

  constructor(
    public cart: CartService,
    private http: HttpService,
    public file: FileService
  ) { }

  ngOnInit(): void {
    this.GetCartProducts();
  }

  GetCartProducts() {
    this.cartProducts = this.cart.GetCartProducts(true);
  }

  RemoveProduct(product: any) {
    this.cart.RemoveProduct(product)
  }

  GetProductPrice(product: any) {
    if(!product) return 0;
    if(product.activeOffer && product.offerPrice) return product.offerPrice;
    return product.price;
  }

  GetTotalPrice() {
    let total = 0;
    this.cartProducts.forEach(cartProduct => total += this.GetProductPrice(cartProduct.product));
    return total;
  }

  NextStep() {
    this.currentStep++;
  }

  PreviousStep() {
    this.currentStep--;
  }

  // ------------------------ Step 2 ----------------------

}
