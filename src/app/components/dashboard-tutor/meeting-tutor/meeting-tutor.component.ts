import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../../login/login.component';
import {User} from '../../../models/User';
import {NoteService} from '../../../service/note/note.service';

@Component({
  selector: 'app-meeting-tutor',
  templateUrl: './meeting-tutor.component.html',
  styleUrls: ['./meeting-tutor.component.css'],
  providers: [LoginComponent]
})
export class MeetingTutorComponent implements OnInit {
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
