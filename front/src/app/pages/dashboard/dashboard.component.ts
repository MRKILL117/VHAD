import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
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
    public cart: CartService,
    public modal: ModalService
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
    const filterText = this.txtToFilter ? this.txtToFilter : '*';
    const categoriesIds = this.categories.filter(category => category.checked).map(category => category.id);
    const subcategoriesIds = this.categories.map((category: any) => {
      return category.subcategories.filter((subcategory: any) => subcategory.checked).map((subcategory: any) => subcategory.id);
    }).reduce((subcategoriesIds, currentIds) => subcategoriesIds.concat(currentIds), []);
    this.http.Get(`/Products/OfferedThatIncludes/${filterText}/AndCategories/${JSON.stringify(categoriesIds)}/AndSubcategories/${JSON.stringify(subcategoriesIds)}/AsCostumer/1`).subscribe((products: any) => {
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

  OnCategoryFilterChange(event: any, category: any) {
    if(event && event.target) {
      const checked = event.target.checked;

      category.checked = checked;
      this.SetSearchTrigger();
    }
  }

  OnSubcategoryFilterChange(event: any, subcategory: any) {
    if(event && event.target) {
      const checked = event.target.checked;

      subcategory.checked = checked;
      this.SetSearchTrigger();
    }
  }

}
