import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatService} from 'src/app/service/chat.service';
import {Router} from '@angular/router';
import {Chat} from '../../models/Chat';
import {Student} from '../../models/Student';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService, private router: Router,
              private loginComponent: LoginComponent) {
  }

  content;
  sessionStudent: Student = JSON.parse(sessionStorage.getItem('dashboard'));

  ngOnInit(): void {
    console.log(this.sessionStudent);
    if (this.loginComponent.user.type === 'student' || this.loginComponent.user.type === 'tutor') {
      this.getChat(this.loginComponent.user.name);
    } else {
      this.getChat(this.sessionStudent.student_name);
    }
  }

  getChat(userName): void {
    this.chatService.getChatStudent(userName).subscribe(result => {
      this.content = result[0].content;
      console.log(result[0].content);
    });
  }

}
