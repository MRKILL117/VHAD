import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordComponent } from './recover-password.component';


const routes: Routes = [
  {
    path: '',
    component: RecoverPasswordComponent
  }
];


@NgModule({
  declarations: [RecoverPasswordComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RecoverPasswordModule { }
