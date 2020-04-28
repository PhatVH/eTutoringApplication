import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Constant} from '../../models/Constant';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  getNotification(userID): Observable<any> {
    return this.http.get<any>(`${Constant.getNotificationURL}?user_id=${userID}`);
  }

  getDataChat(): Observable<any[]> {
    console.log(`check`);
    return this.http.get<any[]>(Constant.getNumberOfChatURL);
  }
  constructor(private http: HttpClient) { }
}
