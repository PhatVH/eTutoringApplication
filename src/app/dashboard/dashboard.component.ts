import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginComponent} from '../login/login.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(private loginComponent: LoginComponent) {
    // tslint:disable-next-line:label-position
  }
  type: string
  ngOnInit(): void {
    this.type = this.loginComponent.getDataType();
    console.log('type user dashboard: '  + this.type);
  }
}
