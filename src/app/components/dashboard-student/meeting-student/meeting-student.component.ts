import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-student',
  templateUrl: './meeting-student.component.html',
  styleUrls: ['./meeting-student.component.css']
})
export class MeetingStudentComponent implements OnInit {
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
