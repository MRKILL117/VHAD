import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { DropdownLinksModule } from '../dropdown-links/dropdown-links.module';


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
    ReactiveFormsModule,
    DropdownLinksModule,
    // RouterModule.forChild(routes)
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
