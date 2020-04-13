import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
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
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
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
  constructor() { }

  ngOnInit(): void {
  }

}
