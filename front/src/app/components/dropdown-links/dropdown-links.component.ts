import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dropdown-links',
  templateUrl: './dropdown-links.component.html',
  styleUrls: ['./dropdown-links.component.css']
})
export class DropdownLinksComponent implements OnInit {

  @Input() title: string = 'Menu';
  @Input() linkItems: Array<{title: string, link: string, icon: string}> = [];

  constructor(
    private http: HttpService,
    private role: RoleService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  GoToRoute(route: string) {
    this.router.navigate([`${route}`]);
  }

  LogOut() {
    this.http.Post(`/Accounts/LogOut`, {token: this.role.GetUserToken()}).subscribe(loggedOut => {
      this.toast.ShowDefaultSuccess('Sesión cerrada');
      localStorage.clear();
      this.GoToRoute('/login');
    }, err => {
      console.error("Error al cerrar sesión", err);
      this.toast.ShowDefaultDanger('Error al cerrar sesión');
    })
  }

}
