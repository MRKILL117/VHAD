import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/components/footer/footer.module';

import { FinishShoppingComponent } from './finish-shopping.component';
import { UserAddressesModule } from 'src/app/components/user-addresses/user-addresses.module';
import { UserCardsModule } from 'src/app/components/user-cards/user-cards.module';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    UserCardsModule,
    ReactiveFormsModule,
    UserAddressesModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class FinishShoppingModule { }
