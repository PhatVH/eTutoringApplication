import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthGaurdService} from '../../service/auth-gaurd.service';
import {LoginComponent} from '../login/login.component';
import {User} from '../../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public loginComponent: LoginComponent) { }
  user: User = this.loginComponent.getUser();
  ngOnInit(): void {
  }
  logout() {
    this.loginComponent.logOut();
  }
  login() {
    this.router.navigate(['/login']);
  }
}
