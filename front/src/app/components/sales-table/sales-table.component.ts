import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent implements OnInit {

  @Input() orders: Array<any> = [];

  loadingData: boolean = false;
  sellerOrders: Array<any> = [];
  products: Array<any> = [];
  tableSelected: string = 'byOrders';
  tableOptions: Array<any> = [
    {
      label: 'Ventas',
      value: 'byOrders'
    },
    {
      label: 'Ventas por vendedor',
      value: 'bySeller'
    },
    {
      label: 'Productos más vendidos',
      value: 'byBestProducts'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  OnTableSelect() {
    this.loadingData = true;
    switch (this.tableSelected) {
      case 'byOrders':
        this.loadingData = false;
        break;
      case 'bySeller':
        this.TableOrdersBySeller();
        break;
      case 'byBestProducts':
        this.TableOrdersByBestProduct();
        break;
    }
  }

  GetOrderProductsLength(order: any): number {
    return order.products.reduce((length: number, product: any) => length + product.quantity, 0);
  }

  GetOrdersTotal(orders: Array<any>) {
    return orders.reduce((total, order) => total + order.total, 0);
  }

  TableOrdersBySeller() {
    let ordersBySeller: any = {};
    this.orders.forEach((order: any) => {
      if(!ordersBySeller.hasOwnProperty(order.sellerId)) ordersBySeller[order.sellerId] = [order];
      else ordersBySeller[order.sellerId].push(order);
    });

    this.sellerOrders = [];
    for (const key in ordersBySeller) {
      if (Object.prototype.hasOwnProperty.call(ordersBySeller, key)) {
        const orders = ordersBySeller[key];
        this.sellerOrders.push({
          seller: orders[0].seller,
          orders
        });
      }
    }

    this.loadingData = false;
  }
  
  TableOrdersByBestProduct() {
    let byProduct: any = {};
    this.orders.forEach((order: any) => {
      order.products.forEach((product: any) => {
        if(product.id) {
          if(!byProduct.hasOwnProperty(product.id)) byProduct[product.id] = product;
          else {
            byProduct[product.id].quantity += product.quantity;
            byProduct[product.id].total += product.total;
          }
        }
      });
    });
  
    this.products = [];
    for (const key in byProduct) {
      if (Object.prototype.hasOwnProperty.call(byProduct, key)) {
        const product = byProduct[key];
        this.products.push(product);
      }
    }
  
    this.loadingData = false;
  }

}
