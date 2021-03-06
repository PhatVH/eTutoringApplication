import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DocumentTutorComponent} from './document-tutor/document-tutor.component';
import {CountryService} from '../../service/manage-student/country.service';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Student} from '../../models/Student';
import {Constant} from '../../models/Constant';
import {LoginComponent} from '../login/login.component';
import {User} from '../../models/User';
import {SortableDirective, SortEvent} from '../../service/sortable/sortable.directive';
import {Tutor} from '../../models/Tutor';
import {NoteService} from '../../service/note/note.service';

@Component({
  selector: 'app-dashboard-tutor',
  templateUrl: './dashboard-tutor.component.html',
  styleUrls: ['./dashboard-tutor.component.css'],
  providers: [DocumentTutorComponent, CountryService, DecimalPipe]
})
export class DashboardTutorComponent implements OnInit {

  constructor(private documentTutor: DocumentTutorComponent,
              public service: CountryService,
              private loginComponent: LoginComponent,
              private noteService: NoteService) {
    this.students$ = service.students$;
    this.total$ = service.total$;
  }
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  tutees: any = 'value';
  meeting: any;
  document: any;
  storage: any;
  students$: Observable<Student[]>;
  total$: Observable<number>;
  user: any;
  tutorSession: Tutor = JSON.parse(sessionStorage.getItem('tutorSession'));

  listMenu: any[] = [
    {id: 1, name: 'Tutees', selected: true},
    {id: 2, name: 'Meeting', selected: false},
    {id: 3, name: 'Document', selected: false},
    {id: 4, name: 'Storage', selected: false},
  ];
  notes: any;
  noteSelected: any;
  openDivNote: any = null;
  count: any = 0;

  ngOnInit(): void {
    if (this.loginComponent.user.type === 'tutor') {
      this.user = this.loginComponent.getUser();
      this.allStudentsOfTutor();
      this.showNote(this.loginComponent.getUser().user_ID);
    } else {
      this.user = this.tutorSession;
      this.allStudentsOfTutor();
      this.showNote(this.tutorSession.user_ID);
    }
  }

  click(item) {
    this.listMenu.map(r => {
      r.selected = false;
    });
    item.selected = true;
    if (item.id === 1) {
      this.TuteesClick();
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

  showNote(userID) {
    this.noteService.showNotes(userID).subscribe(result => {
      this.notes = result;
    });
  }
  deleteNote(noteId) {
    this.noteService.deleteNote(noteId).subscribe(result => {
      alert(result.message);
      this.noteService.showNotes(this.user.user_ID).subscribe(result1 => {
        this.notes = result1;
      });
    });
  }

  allStudentsOfTutor() {
    this.service.getAllStudentsOfTutor(`${Constant.getStudentsByTutorIdUrl}?tutor_ID=${this.user.id}`);
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  meetingClick() {
    this.meeting = 'value';
    this.tutees = null;
    this.document = null;
    this.storage = null;

  }

  documentClick() {
    this.document = 'value';
    this.tutees = null;
    this.meeting = null;
    this.storage = null;
    this.documentTutor.post = 'value';
    this.documentTutor.afterPost = null;

  }

  storageClick() {
    this.storage = 'value';
    this.tutees = null;
    this.meeting = null;
    this.document = null;
    this.showNote(this.user.user_ID);
  }

  TuteesClick() {
    this.tutees = 'value';
    this.meeting = null;
    this.document = null;
    this.storage = null;
  }
  openNote(eachNote: any) {
    this.noteSelected = eachNote;
    if (this.count % 2 === 0) {
      this.openDivNote = 'value';
      this.count += 1;
    } else {
      this.count += 1;
      this.openDivNote = null;
    }
  }

}
