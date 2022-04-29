import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/components/footer/footer.module';

import { FinishShoppingComponent } from './finish-shopping.component';
import { UserAddressesModule } from 'src/app/components/user-addresses/user-addresses.module';

const routes: Routes = [
  {
    path: '',
    component: FinishShoppingComponent
  }
];

@NgModule({
  declarations: [FinishShoppingComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UserAddressesModule,
    RouterModule.forChild(routes)
  ]
})
export class FinishShoppingModule { }
