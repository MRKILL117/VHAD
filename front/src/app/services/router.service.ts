import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
    private router: Router,
    private role: RoleService
  ) { }

  GoToRoute(route: string) {
    const user = this.role.GetUser();
    if(user) this.router.navigate([`/${user.role.name.toLowerCase()}/${route}`]);
    else this.router.navigate([`/${route}`]);
  }
}
