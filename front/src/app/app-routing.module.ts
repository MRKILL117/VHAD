import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterModule)
  },
  {
    path: 'recuperar-cuenta',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordModule)
  },
  {
    path: 'verificar-email/:verificationLink',
    loadChildren: () => import('./pages/email-verification/email-verification.module').then( m => m.EmailVerificationModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    data: { roleAuthorized: 'Admin' },
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfileModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/users/users.module').then( m => m.UsersModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsModule)
      },
      {
        path: 'ofertas',
        loadChildren: () => import('./pages/offers/offers.module').then( m => m.OffersModule)
      },
      {
        path: 'ventas',
        loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesModule)
      },
    ]
  },
  {
    path: 'seller',
    canActivate: [AuthGuardService],
    data: { roleAuthorized: 'Seller' },
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfileModule)
      },
      {
        path: 'ventas',
        loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesModule)
      },
    ]
  },
  {
    path: 'user',
    canActivate: [AuthGuardService],
    data: { roleAuthorized: 'User' },
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfileModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
