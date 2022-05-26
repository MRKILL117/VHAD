import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

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
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesModule { }
