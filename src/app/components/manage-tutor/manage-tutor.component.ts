import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SortableDirective, SortEvent} from '../../service/sortable/sortable.directive';
import {ManageTutorService} from '../../service/manage-tutor/manage-tutor.service';
import {Tutor} from '../../models/Tutor';

@Component({
  selector: 'app-manage-tutor',
  templateUrl: './manage-tutor.component.html',
  styleUrls: ['./manage-tutor.component.css'],
  providers: [ManageTutorService, DecimalPipe]
})
export class ManageTutorComponent implements OnInit {
  constructor(public service: ManageTutorService,
              private router: Router) {
    this.tutors$ = service.tutors$;
    this.total$ = service.total$;
  }
  tutors$: Observable<Tutor[]>;
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

  onDashboadTutor(tutor) {
    sessionStorage.removeItem('tutorSession')
    sessionStorage.setItem('tutorSession', JSON.stringify(tutor));
    this.router.navigate(['/dashboardTutor']);
  }
}
