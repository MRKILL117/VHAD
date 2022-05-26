import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [SalesTableComponent]
})
export class SalesTableModule { }
