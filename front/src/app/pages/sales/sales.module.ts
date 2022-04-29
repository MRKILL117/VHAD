import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SalesComponent } from './sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent
  }
];


@NgModule({
  declarations: [SalesComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesModule { }
