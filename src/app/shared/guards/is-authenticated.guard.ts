import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthClientService } from '../services/auth-client.service';

@Injectable()
export class isAuthenticated implements CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AuthClientService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const token = localStorage.getItem('token');

    if (token) {
      this.auth.isAuthenticated$.next(true);
    } else {
      this.router.navigate(['/auth/sign-in']);
    }
    return this.auth.isAuthenticated$.getValue();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
