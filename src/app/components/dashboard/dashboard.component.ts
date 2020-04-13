import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {User} from '../../../models/User';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(public loginComponent: LoginComponent) {
    // tslint:disable-next-line:label-position
  }
  user: User = this.loginComponent.getUser();
  ngOnInit(): void {
  }

}
