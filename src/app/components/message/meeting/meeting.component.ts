import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
openMeetingNote = null;
count = 0;
  constructor() { }

  ngOnInit(): void {
  }

  cancelMeetingNote() {
  this.clickOpenMeetingNote();
  }

  addMeetingNote() {

  }

  clickOpenMeetingNote() {
    this.count += 1;
    if (this.count % 2 !== 0) {
    this.openMeetingNote = 'value';
    } else {
      this.openMeetingNote = null;
    }
  }
}
