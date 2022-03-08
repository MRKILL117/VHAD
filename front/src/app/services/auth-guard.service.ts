import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private role: RoleService,
    private router: Router
  ) { }

  canActivate(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if(!token) {
      this.router.navigate([`/login`]);
      return false;
    }
    if(this.role.GetUserRole() != snapshot.data['roleAuthorized']) {
      this.router.navigate([`/login`]);
      return false;
    }
    return true;
  }
}
