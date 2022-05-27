import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  timer: any = null;
  user: any;
  orders: Array<any> = [];
  products: Array<any> = [];
  selectedProducts: any = null;
  sellers: Array<any> = [];
  selectedSellers: any = null;
  startDate: string = '';
  endDate: string = '';
  tab: string = 'graphic';
  paymentMethods: Array<any> = [
    {
      value: 'cash',
      label: 'Efectivo'
    },
    {
      value: 'card',
      label: 'Tarjeta'
    }
  ];
  selectedPaymentMethod: any = null;
  loading: any = {
    getting: false
  }
  filter: any = {
    products: null,
    paymentMethod: null,

  }

  constructor(
    private http: HttpService,
    private role: RoleService
  ) {
    this.user = this.role.GetUser();
  }

  ngOnInit(): void {
    this.GetSellers();
    this.GetProducts();
    this.GetOrders();
  }

  SetTrigger() {
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.GetOrders();
    }, 300);
  }

  GetProducts() {
    this.http.Get(`Products`).subscribe((products: any) => {
      this.products = products;
    }, err => {
      console.error("Error al obtener los productos", err);
    });
  }
  
  GetSellers() {
    this.http.Get(`Accounts`).subscribe((sellers: any) => {
      this.sellers = sellers.filter((user: any) => user.role.name == 'Admin' || user.role.name == 'Seller').sort((a: any, b: any) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
      });
    }, err => {
      console.error("Error al obtener los vendedores", err);
    });
  }

  GetOrders() {
    this.loading.getting = true;
    const filtersFormated = {
      products: this.selectedProducts ? this.selectedProducts : [],
      paymentMethod: this.selectedPaymentMethod ? this.selectedPaymentMethod : '*',
      startDate: this.startDate ? this.startDate : '*',
      endDate: this.endDate ? this.endDate : '*',
      sellerIds: this.selectedSellers ? this.selectedSellers : []
    }
    this.http.Get(`/Orders/FilteredByProductIds/${JSON.stringify(filtersFormated.products)}/PaymentMethod/${filtersFormated.paymentMethod}/From/${filtersFormated.startDate}/To/${filtersFormated.endDate}/OfSellers/${JSON.stringify(filtersFormated.sellerIds)}`).subscribe((orders: any) => {
      this.orders = orders.filter((order: any) => {
        let isAdmin = this.role.GetUserRole() == 'Admin';
        let isFromUser = order.sellerId == this.user.id;
        let isFinished = order.status.name == 'Entregado';
        return (isFromUser || isAdmin) && isFinished;
      });
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener ordenes", err);
      this.loading.getting = false;
    });
  }

}
