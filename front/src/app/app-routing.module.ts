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
      {
        path: 'pedidos',
        loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersModule)
      },
      {
        path: 'pedidos/:orderId',
        loadChildren: () => import('./pages/attend-order/attend-order.module').then( m => m.AttendOrderModule)
      },
      {
        path: 'finalizar-compra',
        loadChildren: () => import('./pages/finish-shopping/finish-shopping.module').then( m => m.FinishShoppingModule)
      },
      {
        path: 'mis-pedidos',
        loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersModule)
      },
      {
        path: 'producto/:productId',
        loadChildren: () => import('./pages/product/product.module').then( m => m.ProductModule)
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
      {
        path: 'pedidos',
        loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersModule)
      },
      {
        path: 'pedidos/:orderId',
        loadChildren: () => import('./pages/attend-order/attend-order.module').then( m => m.AttendOrderModule)
      },
      {
        path: 'finalizar-compra',
        loadChildren: () => import('./pages/finish-shopping/finish-shopping.module').then( m => m.FinishShoppingModule)
      },
      {
        path: 'mis-pedidos',
        loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersModule)
      },
      {
        path: 'producto/:productId',
        loadChildren: () => import('./pages/product/product.module').then( m => m.ProductModule)
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
      {
        path: 'finalizar-compra',
        loadChildren: () => import('./pages/finish-shopping/finish-shopping.module').then( m => m.FinishShoppingModule)
      },
      {
        path: 'atencion-usuario',
        loadChildren: () => import('./pages/user-attention/user-attention.module').then( m => m.UserAttentionModule)
      },
      {
        path: 'mis-pedidos',
        loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersModule)
      },
      {
        path: 'producto/:productId',
        loadChildren: () => import('./pages/product/product.module').then( m => m.ProductModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
