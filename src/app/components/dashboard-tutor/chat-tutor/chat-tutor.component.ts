import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../service/chat/chat.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../../login/login.component';
import {Tutor} from '../../../models/Tutor';
import {StudentService} from '../../../service/manage-student/student.service';
import {Student} from '../../../models/Student';

@Component({
  selector: 'app-chat-tutor',
  templateUrl: './chat-tutor.component.html',
  styleUrls: ['./chat-tutor.component.css']
})
export class ChatTutorComponent implements OnInit {
  content;
  user;
  students: Student[] = [];
  sessionTutor: Tutor = JSON.parse(sessionStorage.getItem('tutorSession'));
  studentClick: Student;
  haveStudent: any = null;
  constructor(private chatService: ChatService, private router: Router,
              private loginComponent: LoginComponent,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    console.log(this.sessionTutor);
    if (this.loginComponent.user.type === 'tutor') {
      this.user = this.loginComponent.getUser();
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
      console.log(`result`)
      console.log(result)
      if (result === []) {
      this.haveStudent = null;
      } else {
        this.haveStudent = 'value';
        this.studentClick = result[0]
        this.students = result;
      }
    });
  }
  studentClicked(eachStudent: Student) {
    this.studentClick = eachStudent;
  }
}
