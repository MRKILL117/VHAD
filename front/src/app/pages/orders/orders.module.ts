import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersComponent } from './orders.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VerifyIdentityModalModule } from 'src/app/components/verify-identity-modal/verify-identity-modal.module';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    VerifyIdentityModalModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule { }
