import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';

import { SalesGraphicComponent } from './sales-graphic.component';

const routes: Routes = [
  {
    path: '',
    component: SalesGraphicComponent
  }
];

@NgModule({
  declarations: [SalesGraphicComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    NgChartsModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [SalesGraphicComponent]
})
export class SalesGraphicModule { }
