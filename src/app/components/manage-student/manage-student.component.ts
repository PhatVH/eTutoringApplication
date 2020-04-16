import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from '../../../models/Countries';
import {SortableDirective, SortEvent} from '../../sortable.directive';
import {DecimalPipe} from '@angular/common';
import {Student} from '../../../models/Student';
import {CountryService} from '../../service/country.service';
import {Router} from '@angular/router';
import { ChatService } from 'src/app/chat.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css'],
  providers: [CountryService, DecimalPipe, ChatComponent]
})
export class ManageStudentComponent implements OnInit {

  constructor(public service: CountryService,
              private router: Router,
              private chatComponent: ChatComponent) {
    this.students$ = service.students$;
    this.total$ = service.total$;
  }
  students$: Observable<Student[]>;
  total$: Observable<number>;

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  ngOnInit(): void {
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

  onDashboadStudent(student) {
    console.log(`click dashboard student`);
    this.chatComponent.getChatStudent(student);
    this.router.navigate(['/dashboardStudent']);
  }
}
