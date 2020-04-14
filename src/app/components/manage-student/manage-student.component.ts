import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from '../../../models/Countries';
import {SortableDirective, SortEvent} from '../../sortable.directive';
import {DecimalPipe} from '@angular/common';
import {Student} from '../../../models/Student';
import {CountryService} from '../../service/country.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class ManageStudentComponent implements OnInit {

  constructor(public service: CountryService) {
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

}
