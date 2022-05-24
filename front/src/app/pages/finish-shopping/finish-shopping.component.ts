import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CartService } from 'src/app/services/cart.service';
import { FileService } from 'src/app/services/file.service';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment-timezone';
import { VerifyIdentityModalComponent } from 'src/app/components/verify-identity-modal/verify-identity-modal.component';

@Component({
  selector: 'app-finish-shopping',
  templateUrl: './finish-shopping.component.html',
  styleUrls: ['./finish-shopping.component.css']
})
export class FinishShoppingComponent implements OnInit {

  @ViewChild('confirmDeletProductFromCart') confirmDeletProductFromCart?: ModalDirective;
  @ViewChild('verifyIdentity') verifyIdentity?: VerifyIdentityModalComponent;
  cartProducts: Array<any> = [];
  currentStep: number = 0;
  lastStep: number = 2;
  productToDelete: any = null;
  addressSelected: any = null;
  cardSelected: any = null;
  paymentMethod: string = '';
  user: any;
  loading: any = {
    creating: false
  }
  cashOrderForm: FormGroup = new FormGroup({
    client: new FormControl(null, [Validators.required]),
    seller: new FormControl(null, [Validators.required]),
    total: new FormControl(null, [Validators.required]),
    timestamp: new FormControl(null, [Validators.required]),
  });

  constructor(
    public cart: CartService,
    private http: HttpService,
    public file: FileService,
    private toast: ToastService,
    private router: Router,
    private role: RoleService,
    public form: FormService
  ) {
    this.user = this.role.GetUser();
  }

  ngOnInit(): void {
    this.GetCartProducts();
    if(this.role.GetUserRole() == 'User') this.paymentMethod = 'card';
  }

  GetCartProducts() {
    this.cartProducts = this.cart.GetCartProducts(true);
  }

  InitializeCahsOrderForm() {
    this.cashOrderForm.controls['seller'].setValue(this.user.name);
    this.cashOrderForm.controls['total'].setValue(this.GetTotalPrice());
    this.cashOrderForm.controls['timestamp'].setValue(moment().tz('America/Mexico_City').format('DD/MM/YYYY'));
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
        if(this.paymentMethod == 'cash') {
          return this.cashOrderForm.invalid;
        } else if(!this.paymentMethod || (this.paymentMethod == 'card' && !this.cardSelected)) disableButton = true;
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

  CreateOrder(verifyIdentity: boolean = true) {
    if(verifyIdentity && this.role.GetUserRole() != 'User') {
      this.verifyIdentity?.show();
      return;
    }
    const params = {
      cartProducts: this.cartProducts,
      address: this.addressSelected,
      payment: {
        method: this.paymentMethod,
        card: this.cardSelected,
        client: this.paymentMethod == 'cash' ? this.cashOrderForm.value.client : null
      }
    };
    this.loading.creating = true;
    this.http.Post(`/Orders`, params).subscribe((newOrder: any) => {
      this.toast.ShowDefaultSuccess(`Orden creada correctamente`);
      this.cart.ClearCart();
      this.currentStep++;
      this.loading.creating = false;
    }, err => {
      console.error("Error al crear orden", err);
      if(err.error.error.errorCode == 520) this.toast.ShowDefaultDanger(`No contamos con el stock suficiente`);
      else if(err.error.error.details && err.error.error.details.length) {
        this.toast.ShowDefaultDanger(err.error.error.details[0].message);
      } else this.toast.ShowDefaultDanger(`Error al procesar la orden`);
      this.loading.creating = false;
    });
  }

  GoToHome() {
    const userRole = this.role.GetUserRole();
    this.router.navigate([`/${userRole ? userRole.toLowerCase() : null}/inicio`]);
  }

  // ------------------------ Step 1 ----------------------

  OnAddressSelect(address: any) {
    if(address == 'default') this.NextStep();
    else this.addressSelected = address;
  }
  
  // ------------------------ Step 2 ----------------------
  
  OnCardSelect(card: any) {
    this.cardSelected = card;
  }

}
