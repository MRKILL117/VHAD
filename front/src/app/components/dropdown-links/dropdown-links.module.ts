import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownLinksComponent } from './dropdown-links.component';


const routes: Routes = [
  {
    path: '',
    component: DropdownLinksComponent
  }
];


@NgModule({
  declarations: [DropdownLinksComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [DropdownLinksComponent]
})
export class DropdownLinksModule { }
