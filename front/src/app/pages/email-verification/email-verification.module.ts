import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmailVerificationComponent } from './email-verification.component';

const routes: Routes = [
  {
    path: '',
    component: EmailVerificationComponent
  }
];

@NgModule({
  declarations: [EmailVerificationComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class EmailVerificationModule { }
