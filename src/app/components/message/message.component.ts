import { Component, OnInit } from '@angular/core';
import { AfterpostComponent } from './afterpost/afterpost.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [AfterpostComponent]

})
export class MessageComponent implements OnInit {

  message: any = "value";
  meeting: any;
  document: any;
  storage: any;
  constructor(private afterpostComponent : AfterpostComponent ) { }

  ngOnInit(): void {
  }

  messageClick() {
    this.message = "value";
    this.meeting = null;
    this.document = null;
    this.storage = null;
  }
  meetingClick() {
    this.meeting = "value";
    this.message = null;
    this.document = null;
    this.storage = null;

  }
  documentClick() {
    this.document = "value";
    this.message = null;
    this.meeting = null;
    this.storage = null;
    this.afterpostComponent.post = "value";
    this.afterpostComponent.afterPost = null;

  }
  storageClick() {
    this.storage = "value";
    this.message = null;
    this.meeting = null;
    this.document = null;

  }

}
