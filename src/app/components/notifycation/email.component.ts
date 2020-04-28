import {Component, OnInit} from '@angular/core';
import {EmailService} from '../../service/notifycation/email.service';
import {Notifycation} from '../../models/Notifycation';
import {LoginComponent} from '../login/login.component';
import {User} from '../../models/User';
import {Constant} from '../../models/Constant';
import {Student} from '../../models/Student';
import {StudentService} from '../../service/manage-student/student.service';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  notyfications: Notifycation[];
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
        this.notyfications = result;
        console.log(this.notyfications);
      }
    );
  }

}
