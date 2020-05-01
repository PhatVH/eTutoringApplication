import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Constant} from '../../models/Constant';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }
  addNote(userID, title, content): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const params = new HttpParams().set('user_id', userID).set('title', title).set('content', content);
    // @ts-ignore
    return this.http.post<any>(Constant.addNoteURL, params, headers ).pipe(
      catchError(err => of(null))
    );
  }

  showNotes(userID): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    // @ts-ignore
    return this.http.get<any>(`${Constant.showNotesURL}?user_id=${userID}`, headers ).pipe(
      catchError(err => of(null))
    );
  }

  deleteNote(noteID): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const params = new HttpParams().set('note_id', noteID);
    // @ts-ignore
    return this.http.post<any>(Constant.deleteNoteURL, params, headers ).pipe(
      catchError(err => of(null))
    );
  }
}
