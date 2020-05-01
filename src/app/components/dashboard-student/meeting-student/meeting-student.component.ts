import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../../service/note/note.service';
import {LoginComponent} from '../../login/login.component';
import {User} from '../../../models/User';

@Component({
  selector: 'app-meeting-student',
  templateUrl: './meeting-student.component.html',
  styleUrls: ['./meeting-student.component.css']
})
export class MeetingStudentComponent implements OnInit {
  openMeetingNote = null;
  count = 0;
  constructor(private noteService: NoteService,
              private loginComponent: LoginComponent) { }
  user: User = this.loginComponent.getUser();
  ngOnInit(): void {
  }

  cancelMeetingNote() {
    this.clickOpenMeetingNote();
  }

  addMeetingNote(title, content) {
    const userID = this.user.user_ID;
    this.noteService.addNote(userID, title, content).subscribe(result => alert(result.message));
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
