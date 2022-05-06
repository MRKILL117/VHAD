import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserCardsComponent } from './user-cards.component';

const routes: Routes = [
  {
    path: '',
    component: UserCardsComponent
  }
];

@NgModule({
  declarations: [UserCardsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [UserCardsComponent]
})
export class UserCardsModule { }
