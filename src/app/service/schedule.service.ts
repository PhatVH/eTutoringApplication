import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Constant} from '../models/Constant';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CalendarEvent} from 'angular-calendar';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) { }
/*  getScheduleEvent(userID): Observable<CalendarEvent[]> {
    const params = new HttpParams().set('user_id', userID);
    // @ts-ignore
    return this.http.get<CalendarEvent[]>(Constant.getMeetingByHostURL, params, Constant.headers);
  }*/

  getScheduleEvent(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(Constant.scheduleURL).pipe(
      tap(recieve => console.log(`recieve CalendarEvent: ${JSON.stringify(recieve)}`)),
      catchError(error => of([]))
    );
  }

  deleteMeeting(userID): Observable<any> {
    const params = new HttpParams().set('user_id', userID);
    // @ts-ignore
    return this.http.post<any>(Constant.deleteMeetingURL, params, Constant.headers);
  }
  createMeeting(hostID, inviteID, start, end, title): Observable<any> {
    let params = new HttpParams().set('host_id', hostID);
    params = params.append('invite_id', inviteID);
    params = params.append('start', start);
    params = params.append('end', end);
    params = params.append('title', title);
    // @ts-ignore
    return this.http.post<any>(Constant.createMeetingUrl, params, Constant.headers);
  }
}
