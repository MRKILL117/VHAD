import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartDropdownComponent } from './cart-dropdown.component';

const routes: Routes = [
  {
    path: '',
    component: CartDropdownComponent
  }
];

@NgModule({
  declarations: [CartDropdownComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [CartDropdownComponent]
})
export class CartDropdownModule { }
