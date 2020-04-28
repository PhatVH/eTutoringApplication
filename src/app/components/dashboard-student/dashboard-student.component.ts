import { Component, OnInit } from '@angular/core';
import {DocumentStudentComponent} from './document-student/document-student.component';
import {LoginComponent} from '../login/login.component';
import {Tutor} from '../../models/Tutor';
import {Student} from '../../models/Student';
import {TutorService} from '../../service/manage-tutor/tutor.service';


@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css'],
  providers: [DocumentStudentComponent]
})
export class DashboardStudentComponent implements OnInit {
  tutorDetail: any = 'value';
  meeting: any;
  document: any;
  storage: any;
  user;
  tutor: Tutor;
  haveTutor: any = null;
  sessionStudent: Student = JSON.parse(sessionStorage.getItem('studentSession'));
  listMenu: any[] = [
    {id : 1, name: 'Tutor', selected: true},
    {id : 2, name: 'Meeting', selected: false},
    {id : 3, name: 'Document', selected: false},
    {id : 4, name: 'Storage', selected: false},
  ]
  constructor(private documentStudent: DocumentStudentComponent,
              private loginComponent: LoginComponent,
              private tutorService: TutorService) { }

  ngOnInit(): void {
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
      if (result.length === 0) {
        this.haveTutor = null;
      } else {
        this.tutor = result[0];
        this.haveTutor = 'value';
      }
    });
  }
  click(item) {
    this.listMenu.map( r => {
      r.selected = false;
    });
    item.selected = true;
    if (item.id === 1) {
      this.tutorClick();
    }
    if (item.id === 2) {
      this.meetingClick();
    }
    if (item.id === 3) {
      this.documentClick();
    }
    if (item.id === 4) {
      this.storageClick();
    }
  }

  tutorClick() {
    this.tutorDetail = 'value';
    this.meeting = null;
    this.document = null;
    this.storage = null;
  }
  meetingClick() {
    this.meeting = 'value';
    this.tutorDetail = null;
    this.document = null;
    this.storage = null;

  }
  documentClick() {
    this.document = 'value';
    this.tutorDetail = null;
    this.meeting = null;
    this.storage = null;
    this.documentStudent.post = 'value';
    this.documentStudent.afterPost = null;

  }
  storageClick() {
    this.storage = 'value';
    this.tutorDetail = null;
    this.meeting = null;
    this.document = null;

  }

}
