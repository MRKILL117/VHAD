import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CartService } from 'src/app/services/cart.service';
import { FileService } from 'src/app/services/file.service';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-finish-shopping',
  templateUrl: './finish-shopping.component.html',
  styleUrls: ['./finish-shopping.component.css']
})
export class FinishShoppingComponent implements OnInit {

  @ViewChild('confirmDeletProductFromCart') confirmDeletProductFromCart?: ModalDirective;
  cartProducts: Array<any> = [];
  currentStep: number = 0;
  lastStep: number = 2;
  productToDelete: any = null;
  addressSelected: any = null;
  cardSelected: any = null;

  constructor(
    public cart: CartService,
    private http: HttpService,
    public file: FileService,
    private toast: ToastService,
    private router: Router,
    private role: RoleService
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
    let total = this.cartProducts.reduce((total, cartProduct) => {
      const productPrice = cartProduct.product.activeOffer ? cartProduct.product.offerPrice : cartProduct.product.price;
      return total + (cartProduct.quantity * productPrice);
    }, 0);
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
    if(this.currentStep == this.lastStep) this.CreateOrder();
    else this.currentStep++;
  }

  PreviousStep() {
    this.currentStep--;
  }

  CreateOrder() {
    this.http.Post(`/Orders`, {cartProducts: this.cartProducts, address: this.addressSelected}).subscribe((newOrder: any) => {
      this.toast.ShowDefaultSuccess(`Orden creada correctamente`);
      this.cart.ClearCart();
      this.currentStep++;
    }, err => {
      console.error("Error al crear orden", err);
      this.toast.ShowDefaultDanger(`Error al procesar la orden`);
    });
  }

  GoToHome() {
    const userRole = this.role.GetUserRole();
    this.router.navigate([`/${userRole ? userRole.toLowerCase() : null}/inicio`]);
  }

  // ------------------------ Step 1 ----------------------

  OnAddressSelect(address: any) {
    this.addressSelected = address;
  }
  
  // ------------------------ Step 2 ----------------------
  
  OnCardSelect(card: any) {
    this.cardSelected = card;
  }

}
