import {Component, OnInit} from '@angular/core';
import {EmailService} from '../../service/notifycation/email.service';
import {Notifycation} from '../../models/Notifycation';
import {LoginComponent} from '../login/login.component';
import {User} from '../../models/User';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  notyfications: Array<Notifycation> = [];
  user: User;

  constructor(private emailService: EmailService,
              private loginComponent: LoginComponent) {
  }

  ngOnInit(): void {
    this.user = this.loginComponent.getUser();
    this.getNotification(this.user.user_ID);
  }

  getNotification(userID) {
    this.emailService.getNotification(userID).subscribe(
      result => {
        result.forEach(data => this.notyfications.unshift(data));
      }
    );
  }

}
