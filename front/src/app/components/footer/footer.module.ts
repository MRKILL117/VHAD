import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownLinksModule } from '../dropdown-links/dropdown-links.module';
import { FooterComponent } from './footer.component';

const routes: Routes = [
  {
    path: '',
    component: FooterComponent
  }
];

@NgModule({
  declarations: [FooterComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownLinksModule,
    // RouterModule.forChild(routes)
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
