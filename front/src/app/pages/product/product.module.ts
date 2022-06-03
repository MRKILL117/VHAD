import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  }
];

@NgModule({
  declarations: [ProductComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
