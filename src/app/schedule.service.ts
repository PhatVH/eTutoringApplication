import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Student} from '../models/Student';
import {Constant} from '../models/Constant';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {CalendarEvent} from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) { }
  getScheduleEvent(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(Constant.scheduleURL).pipe(
      tap(recieve => console.log(`recieve CalendarEvent: ${JSON.stringify(recieve)}`)),
      catchError(error => of([]))
    );
  }
}
