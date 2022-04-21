import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  txtToFilter: string = '';
  categoryToFilter: number | null = null;
  timer: any = null;
  products: Array<any> = [];
  categories: Array<any> = [];
  loading: any = {
    getting: false
  }

  constructor(
    public http: HttpService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.GetCategories();
    this.GetOfferedProducts();
  }

  GetCategories() {
    this.http.Get(`/Categories`).subscribe((categories: any) => {
      this.categories = categories;
    }, err => {
      console.error("Error al obtener las categorías", err);
    })
  }

  GetOfferedProducts() {
    this.loading.getting = true;
    const filterText = this.txtToFilter ? this.txtToFilter : '*'
    this.http.Get(`/Products/OfferedThatIncludes/${filterText}/AndCategory/${this.categoryToFilter ? this.categoryToFilter : 0}/AsCostumer/1`).subscribe((products: any) => {
      this.products = products;
      this.loading.getting = false;
    }, err => {
      console.error("Error al obtener las ofertas", err);
      this.loading.getting = false;
    });
  }

  SetSearchTrigger() {
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.GetOfferedProducts();
    }, 300);
  }

}
