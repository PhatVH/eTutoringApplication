import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Student } from 'src/app/models/Student';
import {catchError, tap} from 'rxjs/operators';
import { Constant } from 'src/app/models/Constant';
import { Chat } from 'src/app/models/Chat';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChatStudent(userName: string): Observable<Chat> {
    const url = `${Constant.chatURL}?studentName=${userName}`;
    return this.http.get<Chat>(url).pipe(
      tap(recieve => console.log(`recieve chat: ${JSON.stringify(recieve)}`)),
      catchError(error => of(null))
    );
  }
}
