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
  lineChartReady: any = null;
  tableChartReady: any = null;
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
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData;
  // tslint:disable-next-line:max-line-length
  public doughnutChartLabels = ['Students with no interaction in 7 days', 'Students without a personal tutor', 'Students with interaction'];
  public doughnutChartData = [120, 150, 180];
  public doughnutChartType = 'doughnut';
  totalStudent;
  totalTutor;
  // line chart
  public lineChartLabels;
  public lineChartData;
  public days: Array<any> = [];
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
    this.getNumberOfChat(Constant.getNumberOfChatURL);
    this.getNumberOfChatStudent(Constant.getNumberOfChatStudentURL);
    this.getDateLabel();
  }
  getDateLabel() {
    const dte = new Date();
    let i = 0;
    this.days.unshift(`${dte.getDate()}/${dte.getMonth() + 1}`);
    while (i < 6) {
      dte.setDate(dte.getDate() - 1);
      this.days.unshift(`${dte.getDate()}/${dte.getMonth() + 1}`);
      i += 1;
    }

    this.lineChartLabels = this.days;
    console.log(this.days);
  }
  getNumberOfChat(url) {
    this.studentService.getDataChat(url).subscribe(
      result => {
        this.lineChartData = result.numberMess;
        this.lineChartReady = 'value';
      }
    );
  }

  getNumberOfChatStudent(url) {
    this.studentService.getDataChat(url).subscribe(
      result => {
        this.studentService.getDataChat(Constant.getNumberOfChatTutorURL).subscribe(
          result1 => {
            this.barChartData = [
              {data: result1.numberMess, label: 'Tutor Messages'},
              {data: result.numberMess, label: 'Student Messages'}
            ];
            this.tableChartReady = 'value';
          }
        );
      }
    );
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
    sessionStorage.removeItem('dashboard');
    sessionStorage.setItem('dashboard', JSON.stringify(student));
    this.router.navigate(['/dashboardStudent']);
  }


}
