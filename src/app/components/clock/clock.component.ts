import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    // this.realtimeClock();
    this.renderDate();
  }


  rtClock: any;
  hours: any = 1;
  minutes: any = 1;
  seconds: any = 1;
  amPm: any = '';

  realtimeClock() {
    this.rtClock = new Date();
    this.hours = this.rtClock.getHours();
    this.minutes = this.rtClock.getMinutes();
    this.seconds = this.rtClock.getSeconds();
    this.amPm = (this.hours < 12) ? "AM" : "PM";


    // Convert clock to 12 hours format instead of 24hrs
    this.hours = (this.hours > 12) ? this.hours - 12 : this.hours;

    //Plus 0 before hours if hours have just 1 number (decorate the clock)
    if (this.hours < 10) {
      this.hours = "0" + this.hours;
    }
    if (this.minutes < 10) {
      this.minutes = "0" + this.minutes;
    }
    if (this.seconds < 10) {
      this.seconds = "0" + this.seconds;
    }

    //Display the clock
    document.getElementById('clock').innerHTML =
      this.hours + " : " + this.minutes + " : " + this.seconds + " " + this.amPm;
    setInterval(() => this.realtimeClock(), 1000)
  }
  dt: any;

  renderDate() {
    this.dt = new Date();
    this.dt.setDate(1);
    var day = this.dt.getDay();
    var today = new Date();
    var endDate = new Date(
      this.dt.getFullYear(),
      this.dt.getMonth() + 1,
      0
    ).getDate();

    var prevDate = new Date(
      this.dt.getFullYear(),
      this.dt.getMonth(),
      0
    ).getDate();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    document.getElementById("month").innerHTML = months[this.dt.getMonth()];
    document.getElementById("date_str").innerHTML = this.dt.getFullYear();
    var cells = "";
    for (let x = day; x > 0; x--) {
      cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
    }
    console.log(day);
    for (let i = 1; i <= endDate; i++) {
      if (i == today.getDate() && this.dt.getMonth() == today.getMonth())
        cells += "<div class='today'>" + i + "</div>";
      else
        cells += "<div>" + i + "</div>";
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;

  }

}






