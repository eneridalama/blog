import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : '';
    if (user != '') {
      return this.router.createUrlTree(['/login']);
    }
    return true;
  }
}
