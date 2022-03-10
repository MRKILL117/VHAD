import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  adminLinks: Array<{title: string, link: string, icon: string}> = [
    {
      title: 'Inicio',
      link: 'admin/dashboard',
      icon: 'zmdi-home'
    }
  ];
  sellerLinks: Array<{title: string, link: string, icon: string}> = [
    {
      title: 'Inicio',
      link: 'seller/dashboard',
      icon: 'zmdi-home'
    }
  ];
  userLinks: Array<{title: string, link: string, icon: string}> = [
    {
      title: 'Inicio',
      link: 'user/dashboard',
      icon: 'zmdi-home'
    }
  ];

  constructor(
    public role: RoleService
  ) { }

  ngOnInit(): void {
  }

}
