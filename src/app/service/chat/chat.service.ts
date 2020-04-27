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

  getAllMessage(studentUserId, tutorUserId): Observable<any> {
    return this.http.get<any>(`${Constant.getAllMessageURL}?student_user_id=${studentUserId}&tutor_user_id=${tutorUserId}`);
  }

  sendMessage(chatID, userID, contentChat): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${Constant.sendMessageURL}?chat_id=${chatID}&user_id=${userID}&content=${contentChat}`);
  }
}
