import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Student} from 'src/app/models/Student';
import {catchError, tap} from 'rxjs/operators';
import {Constant} from 'src/app/models/Constant';
import {Chat} from 'src/app/models/Chat';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  getChat(): Observable<any> {
    return this.http.get<any>(Constant.chatURL);
  }

  getAllMessage(userID1, userID2): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const params = new HttpParams().set('user_id1', userID1).set('user_id2', userID2);
    // @ts-ignore
    return this.http.get<any>(Constant.getAllMessageURL, params, headers);
  }

  sendMessage(userID, contentChat): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const params = new HttpParams().set('user_id', userID).set('content', contentChat);
    // @ts-ignore
    return this.http.post<any>(Constant.sendMessageURL, params, headers);
  }
}
