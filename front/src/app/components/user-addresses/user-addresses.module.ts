import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserAddressesComponent } from './user-addresses.component';

const routes: Routes = [
  {
    path: '',
    component: UserAddressesComponent
  }
];

@NgModule({
  declarations: [UserAddressesComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [UserAddressesComponent]
})
export class UserAddressesModule { }
