import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {

  cartProducts: Array<any> = [];

  constructor(
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.GetCartProducts();
  }

  GetCartProducts() {
    this.cartProducts = this.cart.GetCartProducts(true);
    console.log(this.cartProducts);
  }

}
