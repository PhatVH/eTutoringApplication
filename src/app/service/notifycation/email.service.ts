import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Constant} from '../../models/Constant';
import {catchError, map} from 'rxjs/operators';
import {Notifycation} from '../../models/Notifycation';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  getNotification(userID): Observable<Notifycation[]> {
    return this.http.get<Notifycation[]>(`${Constant.getNotificationURL}?user_id=${userID}`);
  }

  getDataChat(): Observable<any[]> {
    console.log(`check`);
    return this.http.get<any[]>(Constant.getNumberOfChatURL);
  }
  constructor(private http: HttpClient) { }
}
