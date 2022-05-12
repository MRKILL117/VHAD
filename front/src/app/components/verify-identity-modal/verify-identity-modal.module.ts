import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { VerifyIdentityModalComponent } from './verify-identity-modal.component';

const routes: Routes = [
  {
    path: '',
    component: VerifyIdentityModalComponent
  }
];

@NgModule({
  declarations: [VerifyIdentityModalComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    // RouterModule.forChild(routes)
  ],
  exports: [VerifyIdentityModalComponent]
})
export class VerifyIdentityModalModule { }
