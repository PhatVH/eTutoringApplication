import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginComponent} from '../../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
              private loginComponent: LoginComponent) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginComponent.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
