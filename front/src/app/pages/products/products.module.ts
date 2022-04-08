import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductsComponent } from './products.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
