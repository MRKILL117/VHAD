import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { RouterService } from 'src/app/services/router.service';

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
  filtersToShow: Array<any> = [];
  loading: any = {
    getting: false
  }
  filters: any = {
    minPrice: null,
    maxPrice: null,
  }

  constructor(
    public http: HttpService,
    public cart: CartService,
    public modal: ModalService,
    public router: RouterService
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
    this.modal.CloseModal();
    this.loading.getting = true;
    const filterText = this.txtToFilter ? this.txtToFilter : '*';
    const categoriesIds = this.categories.filter(category => category.checked).map(category => category.id);
    const subcategoriesIds = this.categories.map((category: any) => {
      return category.subcategories.filter((subcategory: any) => subcategory.checked).map((subcategory: any) => subcategory.id);
    }).reduce((subcategoriesIds, currentIds) => subcategoriesIds.concat(currentIds), []);
    this.filters['productsFilters'] = this.filtersToShow.map(filter => {
      return {
        categoryFilterId: filter.categoryFilterId,
        values: filter.values.filter((value: any) => value.checked).map((value: any) => value.value)
      }
    });
    this.http.Get(`/Products/OfferedThatIncludes/${filterText}/AndCategories/${JSON.stringify(categoriesIds)}/AndSubcategories/${JSON.stringify(subcategoriesIds)}/AndFilters/${JSON.stringify(this.filters)}/AsCostumer/1`).subscribe((products: any) => {
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
      if(checked) this.SetFiltersOfCategory(category);
      else this.RemoveFiltersOfCategory(category);
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

  OnFilterChange(event: any, value: any) {
    if(event && event.target) {
      const checked = event.target.checked;

      value.checked = checked;
    }
  }

  RemoveFiltersOfCategory(category: any) {
    category.filters.forEach((filter: any) => {
      const categoryFilterId = filter.productsFilters && filter.productsFilters.length ? filter.productsFilters[0].categoryFilterId : 0;
      const filterIdx = this.filtersToShow.findIndex(filter => filter.categoryFilterId == categoryFilterId);
      if(filterIdx != -1) {
        this.filtersToShow.splice(filterIdx, 1);
      }
    });
  }
  
  SetFiltersOfCategory(category: any) {
    category.filters.forEach((filter: any) => {
      const values = filter.productsFilters.map((productFilter: any) => productFilter.value.replace(/[ \_\-]/g, '').toUpperCase()).reduce((values: any, currentValue: any) => {
        let match = false;
        values.forEach((value: any) => {
          if(value == currentValue) match = true;
        });
        if(!match) return values.concat(currentValue);
        else return values;
      }, []).map((value: any) => {return {value, checked: false}});

      const filterToShow = {
        label: filter.formName,
        categoryFilterId: filter.productsFilters && filter.productsFilters.length ? filter.productsFilters[0].categoryFilterId : 0,
        values,
      }
      if(!this.filtersToShow.find(filter => filter.categoryFilterId == filterToShow.categoryFilterId)) {
        this.filtersToShow.push(filterToShow);
      }
    });

  }

}
