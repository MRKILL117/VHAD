import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-graphic',
  templateUrl: './sales-graphic.component.html',
  styleUrls: ['./sales-graphic.component.css']
})
export class SalesGraphicComponent implements OnInit {

  @Input() orders: Array<any> = [];
  @Input() loading: any = {};

  loadingData: boolean = true;
  productsByCategory: Array<any> = [];
  selectedGraphic: string = 'byCategory';
  graphicOptions: Array<any> = [
    {
      label: 'Ventas por categoría',
      value: 'byCategory'
    },
    {
      label: 'Ventas por producto',
      value: 'byProduct'
    },
    {
      label: 'Piezas por categoria',
      value: 'stockByCategory'
    },
  ]

  // chart properties
  chartData: any = null;
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales : {},
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    tooltips: {
      enable: true,
      mode: 'nearest',
      intersect: true,
      titleFontColor: '#000',
      bodyFontColor: '#000',
      backgroundColor: '#ddd',
    },
  }

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.GroupProductsByCategory();
    }, 500);
  }

  OnGraphicSelected() {
    this.loadingData = true;
  }
  
  GroupProductsByCategory() {
    this.productsByCategory = []
    let productsByCategory: any = {};
    this.orders.forEach((order: any) => {
      order.products.forEach((product: any) => {
        if(product.category) {
          if(!productsByCategory.hasOwnProperty(product.category.name)) productsByCategory[product.category.name] = [product];
          else {
            let productMatch = productsByCategory[product.category.name].find((prod: any) => prod.id == product.id);
            if(!!productMatch) {
              productMatch.quantity += product.quantity;
              productMatch.total += product.total;
            }
            else productsByCategory[product.category.name].push(product);
          }
        }
      });
    });
    
    for (const key in productsByCategory) {
      if (Object.prototype.hasOwnProperty.call(productsByCategory, key)) {
        this.chartData = {labels: [], datasets: []};
        const products = productsByCategory[key].sort((a: any, b: any) => b.quantity - a.quantity).slice(0, 5);
        this.chartData.labels = products.map((prod: any) => `${prod.name} - ${prod.key}`);
        this.chartData.datasets.push({
          data: products.map((prod: any) => prod.quantity)
        });

        this.productsByCategory.push({
          data: Object.assign({}, this.chartData)
        });
      }
    }
    console.log(productsByCategory, this.productsByCategory);
    this.loadingData = false;
  }
  
}
