import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CountryService} from '../../service/country.service';
import {Constant} from '../../models/Constant';
import {Observable} from 'rxjs';
import {Student} from '../../models/Student';
import {SortableDirective, SortEvent} from '../../sortable.directive';
import {Router} from '@angular/router';
import {ChatComponent} from '../chat/chat.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class ReportComponent implements OnInit {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  students$: Observable<Student[]>;
  total$: Observable<number>;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    beginAtZero: false,
    lineTension: 0.2,
    fill: false,
    borderColor: 'red',
    borderWidth: 1
  };
  // bar chart
  public barChartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Tutor Messages'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Student Messages'}
  ];
  // donut chart
  // tslint:disable-next-line:max-line-length
  public doughnutChartLabels = ['Students with no interaction for 7 days', 'Students without a personal tutor', 'Students with interaction'];
  public doughnutChartData = [120, 150, 180];
  public doughnutChartType = 'doughnut';
  // line chart
  public lineChartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public lineChartData = [120, 150, 140, 90, 70, 143, 80];
  public lineChartType = 'line';

  constructor(public service: CountryService,
              private router: Router) {
    this.students$ = service.students$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.studentWithoutTutor();
  }

  studentWithoutTutor() {
    this.service.getAllStudentWithoutTutor(Constant.studentWithoutTutorURL);
  }
  studentWithNoInteract() {
    this.service.getAllStudentWithNoInteract(Constant.studentWithNoInteractionURL);
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
    sessionStorage.removeItem('dashboard');
    sessionStorage.setItem('dashboard', JSON.stringify(student));
    console.log(student);
    this.router.navigate(['/dashboardStudent']);
  }


}
