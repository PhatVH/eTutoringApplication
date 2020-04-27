import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Constant} from '../../models/Constant';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  getNotification(userID): Observable<any> {
    return this.http.get<any>(`${Constant.getNotificationURL}?user_id=${userID}`);
  }
  constructor(private http: HttpClient) { }
}
