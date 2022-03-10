import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  public GetUserToken(): string | null {
    return localStorage.getItem('token');
  }

  public GetUserRole(): string | null {
    let userStored = localStorage.getItem('user');
    if(userStored != null) {
      const user: any = JSON.parse(userStored);
      if(user && user.role) return user.role.name;
    }
    return null;
  }

  public IsAdmin(): boolean {
    const accountRole = this.GetUserRole();
    if(!accountRole) return false;
    return accountRole == 'Admin';
  }

  public IsSeller(): boolean {
    const accountRole = this.GetUserRole();
    if(!accountRole) return false;
    return accountRole == 'Seller';
  }

  public IsUser(): boolean {
    const accountRole = this.GetUserRole();
    if(!accountRole) return false;
    return accountRole == 'User';
  }
}
