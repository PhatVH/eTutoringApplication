import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../service/chat.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../../login/login.component';
import {Student} from '../../../models/Student';
import {TutorService} from '../../../service/tutor.service';
import {Tutor} from '../../../models/Tutor';

@Component({
  selector: 'app-chat-student',
  templateUrl: './chat-student.component.html',
  styleUrls: ['./chat-student.component.css'],
  providers: [TutorService]
})
export class ChatStudentComponent implements OnInit {
  constructor(private chatService: ChatService, private router: Router,
              private loginComponent: LoginComponent,
              private tutorService: TutorService) {
  }
  content;
  user;
  tutor: Tutor;
  sessionStudent: Student = JSON.parse(sessionStorage.getItem('studentSession'));

  ngOnInit(): void {
    console.log(this.sessionStudent);
    if (this.loginComponent.user.type === 'student') {
      console.log(`this.loginComponent.user.type`);
      console.log(this.loginComponent.user.type);
      this.user = this.loginComponent.getUser();
      /*this.getChat(this.loginComponent.user.name);*/
      this.getTutorOfStudent(this.loginComponent.user.id);
    } else {
      console.log(`this.loginComponent.user.type`);
      console.log(this.loginComponent.user.type);
      this.user = this.sessionStudent;
      /*this.getChat(this.sessionStudent.name);*/
      this.getTutorOfStudent(this.sessionStudent.id);
    }
  }
  getTutorOfStudent(studentID) {
    this.tutorService.getTutorOfStudent(studentID).subscribe(result => {
      this.tutor = result;
      console.log(`this.tutor`);
      console.log(this.tutor);
    });
  }

  getChat(userName): void {
    this.chatService.getChatStudent(userName).subscribe(result => {
      this.content = result[0].content;
      console.log(result[0].content);
    });
  }

}
