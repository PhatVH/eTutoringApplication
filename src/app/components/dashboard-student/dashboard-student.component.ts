import { Component, OnInit } from '@angular/core';
import {DocumentStudentComponent} from './document-student/document-student.component';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css'],
  providers: [DocumentStudentComponent]
})
export class DashboardStudentComponent implements OnInit {
  message: any = 'value';
  meeting: any;
  document: any;
  storage: any;
  constructor(private documentStudent: DocumentStudentComponent ) { }

  ngOnInit(): void {
  }

  messageClick() {
    this.message = 'value';
    this.meeting = null;
    this.document = null;
    this.storage = null;
  }
  meetingClick() {
    this.meeting = 'value';
    this.message = null;
    this.document = null;
    this.storage = null;

  }
  documentClick() {
    this.document = 'value';
    this.message = null;
    this.meeting = null;
    this.storage = null;
    this.documentStudent.post = 'value';
    this.documentStudent.afterPost = null;

  }
  storageClick() {
    this.storage = 'value';
    this.message = null;
    this.meeting = null;
    this.document = null;

  }

}
