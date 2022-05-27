import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sales-graphic',
  templateUrl: './sales-graphic.component.html',
  styleUrls: ['./sales-graphic.component.css']
})
export class SalesGraphicComponent implements OnInit {

  @Input() orders: Array<any> = [];

  loadingData: boolean = true;
  categories: Array<any> = [];
  productsByCategory: Array<any> = [];
  productsStockByCategory: Array<any> = [];
  productsSales: Array<any> = [];
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
      label: 'Piezas por categoría',
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

  constructor(
    private http: HttpService
  ) {
    this.GetCategoriesWithProducts();
  }

  ngOnInit(): void {
    this.GraphicSalesByCategory();
  }

  OnGraphicSelected() {
    this.loadingData = true;
    switch (this.selectedGraphic) {
      case 'byCategory':
        this.GraphicSalesByCategory();
        break;
      case 'stockByCategory':
        this.GraphicProductStockByCategory();
        break;
      case 'byProduct':
        this.GraphicSalesByProducts();
        break;
    }
  }

  GetCategoriesWithProducts() {
    this.http.Get(`Categories/WithProducts`).subscribe((categories: any) => {
      this.categories = categories;
      this.GraphicProductStockByCategory();
    }, err => {
      console.error("Error al obtener las categorias", err);
    });
  }
  
  GraphicSalesByCategory() {
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
          title: key,
          data: Object.assign({}, this.chartData)
        });
      }
    }

    this.productsByCategory = this.productsByCategory.sort((a: any, b: any) => {
      if(a.title > b.title) return 1;
      if(a.title < b.title) return -1;
      return 0;
    });

    this.loadingData = false;
  }

  GraphicProductStockByCategory() {
    this.productsStockByCategory = [];
    this.categories.forEach((category: any) => {
      this.chartData = {labels: [], datasets: []};
      const products = category.products;
      this.chartData.labels = products.map((prod: any) => `${prod.name} - ${prod.key}`);
      this.chartData.datasets.push({
        label: 'Stock en inventario',
        data: products.map((prod: any) => prod.stock)
      });
  
      this.productsStockByCategory.push({
        title: category.name,
        data: Object.assign({}, this.chartData)
      });
    });
    
    this.loadingData = false;
  }

  GraphicSalesByProducts() {
    this.productsSales = [];
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

    this.chartData = {labels: [], datasets: [{label: 'Ventas', data: []}]};
    for (const key in byProduct) {
      if (Object.prototype.hasOwnProperty.call(byProduct, key)) {
        const product = byProduct[key];
        this.chartData.labels.push(`${product.name} - ${product.key}`);
        this.chartData.datasets[0].data.push(product.quantity);
      }
    }

    this.loadingData = false;
  }
  
}
