import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {User} from '../../models/User';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(public loginComponent: LoginComponent) {
    // tslint:disable-next-line:label-position
  }
  user: User = this.loginComponent.getUser();
  ngOnInit(): void {
  }

}
