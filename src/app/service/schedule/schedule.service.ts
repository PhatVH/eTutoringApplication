import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Constant} from '../../models/Constant';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) { }
  getScheduleEvent(userID): Observable<any> {
    return this.http.get<any>(`${Constant.getAllMeetingsByUserIdURL}?user_id=${userID}`);
  }

  deleteMeeting(eventID): Observable<any> {
    const params = new HttpParams().set('id', eventID);
    // @ts-ignore
    return this.http.post<any>(Constant.deleteMeetingURL, params, Constant.headers);
  }
  createMeeting(hostID, inviteID, start, end, title): Observable<any> {
    let params = new HttpParams().set('host_ID', hostID);
    params = params.append('invite_ID', inviteID);
    params = params.append('start', start);
    params = params.append('end', end);
    params = params.append('title', title);
    // @ts-ignore
    return this.http.post<any>(Constant.createMeetingUrl, params, Constant.headers);
  }

  studentCreateMeeting(hostID, start, end, title): Observable<any> {
    let params = new HttpParams().set('host_ID', hostID);
    params = params.append('start', start);
    params = params.append('end', end);
    params = params.append('title', title);
    // @ts-ignore
    return this.http.post<any>(Constant.studentCreateMeetingUrl, params, Constant.headers);
  }
}
