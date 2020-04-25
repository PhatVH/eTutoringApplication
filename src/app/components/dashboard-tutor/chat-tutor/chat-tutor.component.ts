import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../service/chat/chat.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../../login/login.component';
import {Tutor} from '../../../models/Tutor';
import {StudentService} from '../../../service/manage-student/student.service';
import {Student} from '../../../models/Student';
import {Chat} from '../../../models/Chat';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat-tutor',
  templateUrl: './chat-tutor.component.html',
  styleUrls: ['./chat-tutor.component.css']
})
export class ChatTutorComponent implements OnInit {
  content;
  user;
  $chat: Observable<any>;
  students: Student[] = [];
  sessionTutor: Tutor = JSON.parse(sessionStorage.getItem('tutorSession'));
  studentClick: Student;
  haveStudent: any = null;
  chat: Chat[];

  constructor(private chatService: ChatService, private router: Router,
              private loginComponent: LoginComponent,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getChat();
    this.getAllMessage();
    console.log(this.sessionTutor);
    if (this.loginComponent.user.type === 'tutor') {
      this.user = this.loginComponent.getUser();
      console.log(this.user);
      console.log(this.user.user_ID);
      this.getStudentOfTutor(this.loginComponent.user.id);
    } else {
      console.log(`haha`);
      this.user = this.sessionTutor;
      this.getStudentOfTutor(this.sessionTutor.id);
      console.log(this.students);
    }
  }

  getStudentOfTutor(tutorID) {
    this.studentService.getListStudentOfTutor(tutorID).subscribe(result => {
      if (result === []) {
        this.haveStudent = null;
      } else {
        this.haveStudent = 'value';
        this.studentClick = result[0];
        this.students = result;
      }
    });
  }

  studentClicked(eachStudent: Student) {
    this.studentClick = eachStudent;
  }

  getChat() {
    this.chatService.getChat().subscribe(result => {
      console.log(result);
      this.chat = result;
    });
  }

  getAllMessage() {
    this.chatService.getAllMessage(this.user.user_ID, this.studentClick.user_ID).subscribe(
      result => {
        this.$chat = result;
      }
    );
  }

  sendMessage(value: string) {
    this.chatService.sendMessage(this.user.user_ID, value).subscribe(
      result => {
        this.$chat = result;
        console.log(`chat`);
        console.log(this.$chat);
        this.chatService.getAllMessage(this.user.user_ID, this.studentClick.user_ID).subscribe(
          result1 => {
            this.$chat = result1;
          }
        );
      }
    );
  }
}
