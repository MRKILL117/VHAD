import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserAttentionComponent } from './user-attention.component';

const routes: Routes = [
  {
    path: '',
    component: UserAttentionComponent
  }
];

@NgModule({
  declarations: [UserAttentionComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserAttentionModule { }
