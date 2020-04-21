import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Student} from '../models/Student';
import {Constant} from '../models/Constant';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  deleteMeeting(event): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const params = new HttpParams().set('event', event);
    return this.http.post<any>(Constant.deleteMeetingURL, {headers, params});
  }
}
