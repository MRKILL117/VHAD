import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  adminLinks: Array<{title: string, link: string, icon: string}> = [
    { title: 'Inicio', link: 'admin/dashboard', icon: 'zmdi-home' },
    { title: 'Perfil', link: 'admin/profile', icon: 'zmdi-account' },
    { title: 'Cuentas', link: 'admin/users', icon: 'zmdi-accounts-add' },
    { title: 'Productos', link: 'admin/productos', icon: 'zmdi-collection-case-play' },
    { title: 'Ofertas', link: 'admin/ofertas', icon: 'zmdi-assignment-returned' },
  ];
  sellerLinks: Array<{title: string, link: string, icon: string}> = [
    { title: 'Inicio', link: 'seller/dashboard', icon: 'zmdi-home' },
    { title: 'Perfil', link: 'seller/profile', icon: 'zmdi-account' },
  ];
  userLinks: Array<{title: string, link: string, icon: string}> = [
    { title: 'Inicio', link: 'user/dashboard', icon: 'zmdi-home' },
    { title: 'Perfil', link: 'user/profile', icon: 'zmdi-account' },
  ];

  constructor(
    public role: RoleService
  ) { }

  ngOnInit(): void {
  }

}
