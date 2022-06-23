import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class isAdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if(this.authService.loggedIn() && this.authService.isAdmin()){
      return true;
    } else {
     this.router.navigate(['/home']);
     return false;
    }
  }
}
