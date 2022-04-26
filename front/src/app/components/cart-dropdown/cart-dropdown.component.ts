import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {

  cartProducts: Array<any> = [];

  constructor(
    public cart: CartService,
    private router: Router,
    private role: RoleService
  ) { }

  ngOnInit(): void {
    this.GetCartProducts();
  }

  GetCartProducts() {
    this.cartProducts = this.cart.GetCartProducts(true);
  }

  ProceedWithPayment() {
    this.GoToRoute(`${this.role.GetUserRole()?.toLocaleLowerCase()}/finalizar-compra`);
  }

  GoToRoute(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
