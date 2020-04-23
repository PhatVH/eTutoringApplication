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
  styleUrls: ['./chat-student.component.css']
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
  haveTutor: any;

  ngOnInit(): void {
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
      }
      this.haveTutor = 'value';
      this.tutor = result[0];
    });
  }


}
