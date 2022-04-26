import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: Array<{quantity: number, product: any}>;
  private cartProductsLocalStorageKey: string = 'cartProducts';

  constructor() {
    this.cartProducts = this.GetCartProductsSaved();
  }

  public AddToCart(product: any) {
    if(this.cartProducts.length) {
      const cartIdx = this.cartProducts.findIndex(cartProd => cartProd.product.id == product.id);
      if(cartIdx != -1) this.cartProducts[cartIdx].quantity++;
      else this.cartProducts.push({quantity: 1, product});
    }
    else this.cartProducts.push({quantity: 1, product});
    this.SaveCartProductsInLocalStorage();
  }
  
  public RemoveFromCart(product: any) {
    if(this.cartProducts.length) {
      const cartIdx = this.cartProducts.findIndex(cartProd => cartProd.product.id == product.id);
      if(cartIdx != -1) {
        this.cartProducts[cartIdx].quantity--;
        if(this.cartProducts[cartIdx].quantity < 1) this.cartProducts.splice(cartIdx, 1);
      }
    }
    this.SaveCartProductsInLocalStorage();
  }

  public GetCartProducts(original: boolean = false) {
    if(original) return this.cartProducts;
    return Array.from(this.cartProducts);
  }

  public GetProductFormCart(product: any) {
    return this.cartProducts.find(cartProd => cartProd.product.id == product.id);
  }

  private SaveCartProductsInLocalStorage() {
    localStorage.setItem(this.cartProductsLocalStorageKey, JSON.stringify(this.cartProducts));
  }

  private GetCartProductsSaved(): Array<any> {
    const cartProducts = localStorage.getItem(this.cartProductsLocalStorageKey);
    if(cartProducts != null) return JSON.parse(cartProducts);
    return [];
  }
}
