import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyIdentityModalModule } from 'src/app/components/verify-identity-modal/verify-identity-modal.module';

import { AttendOrderComponent } from './attend-order.component';

const routes: Routes = [
  {
    path: '',
    component: AttendOrderComponent
  }
];

@NgModule({
  declarations: [AttendOrderComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    VerifyIdentityModalModule,
    RouterModule.forChild(routes)
  ]
})
export class AttendOrderModule { }
