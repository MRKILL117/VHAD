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
    const token = this.role.GetUserToken();
    const userRole = this.role.GetUserRole();
    if(!token) {
      this.router.navigate([`/login`]);
      return false;
    }
    else if(userRole != snapshot.data['roleAuthorized']) {
      if(userRole == null) this.router.navigate([`/login`]);
      else this.router.navigate([`/${userRole.toLowerCase()}/dashboard`]);
      return false;
    }
    return true;
  }
}
