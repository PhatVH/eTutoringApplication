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
  students: Student[] = [];
  sessionTutor: Tutor = JSON.parse(sessionStorage.getItem('tutorSession'));
  studentClick: Student;
  haveStudent: any = null;
  chats: Chat[];
  chatId: any;

  constructor(private chatService: ChatService, private router: Router,
              private loginComponent: LoginComponent,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    if (this.loginComponent.user.type === 'tutor') {
      this.user = this.loginComponent.getUser();
      this.getStudentOfTutor(this.loginComponent.user.id);
    } else {
      this.user = this.sessionTutor;
      this.getStudentOfTutor(this.sessionTutor.id);
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
        this.getAllMessage();
      }
    });
  }

  studentClicked(eachStudent: Student) {
    this.studentClick = eachStudent;
    this.getAllMessage();
  }
  getAllMessage() {
    console.log(`this.studentClick.user_ID`);
    console.log(this.studentClick.user_ID);
    console.log(`this.user.user_ID`);
    console.log(this.user.user_ID);
    this.chatService.getAllMessage(this.studentClick.user_ID, this.user.user_ID).subscribe(
      result => {
        console.log(`JSON.stringify(result)`)
        console.log(result.chat)
        console.log(`result.chat_id`)
        console.log(result.chat_id)
        this.chats = result.chat;
        this.chatId = result.chat_id;
      }
    );
  }

  sendMessage(value: string) {
    console.log(this.chatId)
    console.log(this.user.user_ID)
    console.log(`value`)
    console.log(value)
    this.chatService.sendMessage(this.chatId, this.user.user_ID, value).subscribe(
      result => {
        this.chatService.getAllMessage(this.studentClick.user_ID, this.user.user_ID).subscribe(
          result1 => {
            this.chats = result1.chat;
          }
        );
      }
    );
  }
}
