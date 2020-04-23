import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CountryService} from '../../service/manage-student/country.service';
import {Constant} from '../../models/Constant';
import {Observable} from 'rxjs';
import {Student} from '../../models/Student';
import {SortableDirective, SortEvent} from '../../service/sortable/sortable.directive';
import {Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {StudentService} from '../../service/manage-student/student.service';
import {TutorService} from '../../service/manage-tutor/tutor.service';

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
  totalStudent;
  totalTutor;
  // line chart
  public lineChartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public lineChartData = [120, 150, 140, 90, 70, 143, 80];
  public lineChartType = 'line';

  constructor(public service: CountryService,
              private router: Router,
              private studentService: StudentService,
              private tutorService: TutorService) {
    this.students$ = service.students$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.studentWithoutTutor();
    this.getTotalStudent();
    this.getTotalTutor();
  }

  studentWithoutTutor() {
    this.service.getAllStudentWithoutTutor(Constant.studentWithoutTutorURL);
  }
  studentWithNoInteract() {
    this.service.getAllStudentWithNoInteract(Constant.studentWithNoInteractionURL);
  }
  getTotalStudent() {
    this.studentService.getStudents(Constant.studentsURL).subscribe(result => {
      this.totalStudent = result.length;
    });
  }

  getTotalTutor() {
    this.tutorService.getTutors().subscribe(result => {
      this.totalTutor = result.length;
    });
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
