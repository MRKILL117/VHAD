import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownLinksModule } from '../dropdown-links/dropdown-links.module';
import { HeaderComponent } from './header.component';
import { CartDropdownModule } from '../cart-dropdown/cart-dropdown.module';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent
  }
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    FormsModule,
    CommonModule,
    CartDropdownModule,
    ReactiveFormsModule,
    DropdownLinksModule,
    // RouterModule.forChild(routes)
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
