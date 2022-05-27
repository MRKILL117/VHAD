import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SalesTableComponent } from './sales-table.component';

const routes: Routes = [
  {
    path: '',
    component: SalesTableComponent
  }
];

@NgModule({
  declarations: [SalesTableComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [SalesTableComponent]
})
export class SalesTableModule { }
