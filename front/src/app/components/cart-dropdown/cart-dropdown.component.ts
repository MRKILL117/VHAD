import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {

  user: any = null;
  cartProducts: Array<any> = [];

  constructor(
    public cart: CartService,
    private router: Router,
    private role: RoleService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.user = this.role.GetUser();
    this.GetCartProducts();
  }

  GetCartProducts() {
    this.cartProducts = this.cart.GetCartProducts(true);
  }

  ProceedWithPayment() {
    if(!this.user) this.user = this.role.GetUser();
    if(!this.user.emailVerified && this.user.role.name == 'User') this.toast.ShowDefaultWarning(`No has verificado tu correo`, `Correo no verificado`);
    else this.GoToRoute(`${this.role.GetUserRole()?.toLocaleLowerCase()}/finalizar-compra`);
  }

  GoToRoute(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
