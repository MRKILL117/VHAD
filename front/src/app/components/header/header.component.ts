import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  adminLinks: Array<{title: string, link: string, icon: string}> = [
    { title: 'Inicio', link: 'admin/inicio', icon: 'zmdi-home' },
    { title: 'Perfil', link: 'admin/perfil', icon: 'zmdi-account' },
    { title: 'Mis pedidos', link: 'admin/mis-pedidos', icon: 'zmdi-money' },
    { title: 'Cuentas', link: 'admin/usuarios', icon: 'zmdi-accounts-add' },
    { title: 'Productos', link: 'admin/productos', icon: 'zmdi-collection-case-play' },
    { title: 'Ofertas', link: 'admin/ofertas', icon: 'zmdi-assignment-returned' },
    { title: 'Pedidos', link: 'admin/pedidos', icon: 'zmdi-assignment' },
    { title: 'Ventas', link: 'admin/ventas', icon: 'zmdi-money' },
  ];
  sellerLinks: Array<{title: string, link: string, icon: string}> = [
    { title: 'Inicio', link: 'seller/inicio', icon: 'zmdi-home' },
    { title: 'Perfil', link: 'seller/perfil', icon: 'zmdi-account' },
    { title: 'Pedidos', link: 'seller/pedidos', icon: 'zmdi-assignment' },
    { title: 'Ventas', link: 'seller/ventas', icon: 'zmdi-money' },
  ];
  userLinks: Array<{title: string, link: string, icon: string}> = [
    { title: 'Inicio', link: 'user/inicio', icon: 'zmdi-home' },
    { title: 'Perfil', link: 'user/perfil', icon: 'zmdi-account' },
    { title: 'Atención al usuario', link: 'user/atencion-usuario', icon: 'zmdi-help' },
  ];

  constructor(
    public role: RoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  GoToHome() {
    if(this.role.GetUserRole()) this.router.navigate([`/${this.role.GetUserRole()?.toLocaleLowerCase()}/inicio`]);
  }

}
