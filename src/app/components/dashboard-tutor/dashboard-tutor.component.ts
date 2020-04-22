import { Component, OnInit } from '@angular/core';
import {DocumentTutorComponent} from './document-tutor/document-tutor.component';

@Component({
  selector: 'app-dashboard-tutor',
  templateUrl: './dashboard-tutor.component.html',
  styleUrls: ['./dashboard-tutor.component.css'],
  providers: [DocumentTutorComponent]
})
export class DashboardTutorComponent implements OnInit {
  message: any = 'value';
  meeting: any;
  document: any;
  storage: any;
  constructor(private documentTutor: DocumentTutorComponent ) { }

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
    this.documentTutor.post = 'value';
    this.documentTutor.afterPost = null;

  }
  storageClick() {
    this.storage = 'value';
    this.message = null;
    this.meeting = null;
    this.document = null;

  }

}
