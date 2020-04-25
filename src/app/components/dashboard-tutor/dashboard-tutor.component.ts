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

@Component({
  selector: 'app-dashboard-tutor',
  templateUrl: './dashboard-tutor.component.html',
  styleUrls: ['./dashboard-tutor.component.css'],
  providers: [DocumentTutorComponent, CountryService, DecimalPipe]
})
export class DashboardTutorComponent implements OnInit {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  tutees: any = 'value';
  message: any;
  meeting: any;
  document: any;
  storage: any;
  students$: Observable<Student[]>;
  total$: Observable<number>;
  user: User;

  listMenu: any[] = [
    {id : 1, name: 'Tutees', selected: true},
    {id : 2, name: 'Message', selected: false},
    {id : 3, name: 'Meeting', selected: false},
    {id : 4, name: 'Document', selected: false},
    {id : 5, name: 'Storage', selected: false},
  ]
  constructor(private documentTutor: DocumentTutorComponent,
              public service: CountryService,
              private loginComponent: LoginComponent) {
    this.students$ = service.students$;
    this.total$ = service.total$;
  }
  ngOnInit(): void {
    this.user = this.loginComponent.getUser();
    this.allStudentsOfTutor();
  }
  click(item) {
    this.listMenu.map( r => {
      r.selected = false;
    });
    item.selected = true;
    if (item.id === 1) {
      this.TuteesClick();
    }
    if (item.id === 2) {
      this.messageClick();
    }
    if (item.id === 3) {
      this.meetingClick();
    }
    if (item.id === 4) {
      this.documentClick();
    }
    if (item.id === 5) {
      this.storageClick();
    }
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
  messageClick() {
    this.message = 'value';
    this.tutees = null;
    this.meeting = null;
    this.document = null;
    this.storage = null;
  }
  meetingClick() {
    this.meeting = 'value';
    this.tutees = null;
    this.message = null;
    this.document = null;
    this.storage = null;

  }
  documentClick() {
    this.document = 'value';
    this.tutees = null;
    this.message = null;
    this.meeting = null;
    this.storage = null;
    this.documentTutor.post = 'value';
    this.documentTutor.afterPost = null;

  }
  storageClick() {
    this.storage = 'value';
    this.tutees = null;
    this.message = null;
    this.meeting = null;
    this.document = null;

  }

  TuteesClick() {
    this.tutees = 'value'
    this.meeting = null;
    this.message = null;
    this.document = null;
    this.storage = null;
  }
}
