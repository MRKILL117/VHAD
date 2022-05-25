import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MyOrdersComponent } from './my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: MyOrdersComponent
  }
];

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MyOrdersModule { }
