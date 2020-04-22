import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../service/chat.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../../login/login.component';
import {Tutor} from '../../../models/Tutor';
import {StudentService} from '../../../service/student.service';
import {Student} from '../../../models/Student';

@Component({
  selector: 'app-chat-tutor',
  templateUrl: './chat-tutor.component.html',
  styleUrls: ['./chat-tutor.component.css']
})
export class ChatTutorComponent implements OnInit {
  content;
  user;
  studentIndex0: Student;
  students: Student[] = [];
  sessionTutor: Tutor = JSON.parse(sessionStorage.getItem('tutorSession'));
  studentClick: Student;
  haveStudent: any;
  constructor(private chatService: ChatService, private router: Router,
              private loginComponent: LoginComponent,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    console.log(this.sessionTutor);
    if (this.loginComponent.user.type === 'tutor') {
      this.user = this.loginComponent.getUser();
      /*this.getChat(this.loginComponent.user.name);*/
      this.getStudentOfTutor(this.loginComponent.user.id);
    } else {
      console.log(`haha`);
      this.user = this.sessionTutor;
      /*this.getChat(this.sessionTutor.name);*/
      this.getStudentOfTutor(this.sessionTutor.id);
      console.log(this.students);
    }
  }

  getStudentOfTutor(tutorID) {
    this.studentService.getListStudentOfTutor(tutorID).subscribe(result => {
      if (result === []) {
      this.haveStudent = null;
      }
      this.haveStudent = 'value';
      this.studentClick = result[0]
      this.students = result;
    });
  }

  getChat(userName): void {
    this.chatService.getChatStudent(userName).subscribe(result => {
      this.content = result[0].content;
      console.log(result[0].content);
    });
  }

  studentClicked(eachStudent: Student) {
    this.studentClick = eachStudent;
  }
}
