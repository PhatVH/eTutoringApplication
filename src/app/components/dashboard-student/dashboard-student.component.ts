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
  listMenu: any[] = [
    {id : 1, name: 'Message', selected: true},
    {id : 2, name: 'Meeting', selected: false},
    {id : 3, name: 'Document', selected: false},
    {id : 4, name: 'Storage', selected: false},
  ]
  constructor(private documentStudent: DocumentStudentComponent ) { }

  ngOnInit(): void {
  }
  click(item) {
    this.listMenu.map( r => {
      r.selected = false;
    });
    item.selected = true;
    if (item.id === 1) {
      this.messageClick();
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
