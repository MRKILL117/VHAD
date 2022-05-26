import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent implements OnInit {

  @Input() orders: Array<any> = [];
  @Input() loading: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  GetOrderProductsLength(order: any): number {
    return order.products.reduce((length: number, product: any) => length + product.quantity, 0);
  }

}
