import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../service/chat/chat.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../../login/login.component';
import {Student} from '../../../models/Student';
import {TutorService} from '../../../service/manage-tutor/tutor.service';
import {Tutor} from '../../../models/Tutor';
import {Chat} from '../../../models/Chat';

@Component({
  selector: 'app-chat-student',
  templateUrl: './chat-student.component.html',
  styleUrls: ['./chat-student.component.css']
})
export class ChatStudentComponent implements OnInit {

  constructor(private chatService: ChatService, private router: Router,
              private loginComponent: LoginComponent,
              private tutorService: TutorService) {
  }

  content;
  user;
  chat: Chat[];
  tutor: Tutor;
  sessionStudent: Student = JSON.parse(sessionStorage.getItem('studentSession'));
  haveTutor: any;

  ngOnInit(): void {
    this.getChat();
    console.log(this.sessionStudent);
    if (this.loginComponent.user.type === 'student') {
      this.user = this.loginComponent.getUser();
      this.getTutorOfStudent(this.loginComponent.user.id);
    } else {
      this.user = this.sessionStudent;
      this.getTutorOfStudent(this.sessionStudent.id);
    }
  }

  getTutorOfStudent(studentID) {
    this.tutorService.getTutorByStudentId(studentID).subscribe(result => {
      if (result === []) {
        this.haveTutor = null;
      } else {
        this.haveTutor = 'value';
        this.tutor = result[0];
        console.log(`this.tutor`)
        console.log(this.tutor)
      }
    });
  }
  getChat() {
    this.chatService.getChat().subscribe(result => {console.log(result);
      this.chat = result;
    });
  }

}
