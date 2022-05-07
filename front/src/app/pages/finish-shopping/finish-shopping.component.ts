import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CartService } from 'src/app/services/cart.service';
import { FileService } from 'src/app/services/file.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-finish-shopping',
  templateUrl: './finish-shopping.component.html',
  styleUrls: ['./finish-shopping.component.css']
})
export class FinishShoppingComponent implements OnInit {

  @ViewChild('confirmDeletProductFromCart') confirmDeletProductFromCart?: ModalDirective;
  cartProducts: Array<any> = [];
  currentStep: number = 0;
  productToDelete: any = null;
  addressSelected: any = null;
  cardSelected: any = null;

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

  GetProductPrice(product: any) {
    if(!product) return 0;
    if(product.activeOffer && product.offerPrice) return product.offerPrice;
    return product.price;
  }
  
  GetTotalPrice() {
    let total = 0;
    this.cartProducts.forEach(cartProduct => total += (this.GetProductPrice(cartProduct.product) * cartProduct.quantity));
    return total;
  }

  RemoveProduct(cartProduct: any) {
    if(cartProduct.quantity == 1) {
      this.productToDelete = cartProduct.product;
      this.confirmDeletProductFromCart?.show();
    }
    else this.cart.RemoveProduct(cartProduct.product);
  }

  DisableContinueButton() {
    let disableButton = false;
    switch (this.currentStep) {
      // address selection
      case 1:
        if(!this.addressSelected) disableButton = true;
        break;
      // crad selection
      case 2:
        if(!this.cardSelected) disableButton = true;
        break;
      // products review
      default:
        if(!this.cartProducts.length) disableButton = true;
        break;
    }
    return disableButton;
  }
  
  NextStep() {
    this.currentStep++;
  }

  PreviousStep() {
    this.currentStep--;
  }

  // ------------------------ Step 2 ----------------------

  OnAddressSelect(address: any) {
    this.addressSelected = address;
  }

  // ------------------------ Step 2 ----------------------

}
