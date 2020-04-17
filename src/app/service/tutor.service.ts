import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tutor} from '../../models/Tutor';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Constant} from '../../models/Constant';
const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class TutorService {

  private tutorsURL = 'http://localhost:3000/tutors';
  getTutors(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.tutorsURL).pipe(
      tap(recieve => console.log(`recieve tutors: ${JSON.stringify(recieve)}`)),
      catchError(error => of([]))
    );
  }

  getLoginTutor(userName: string, pass: string): Observable<Tutor> {
    const url = `${this.tutorsURL}?name=${userName}&&pass=${pass}`;
    return this.http.get<Tutor>(url).pipe(
      catchError(error => of(null))
    );
  }

  searchTutor(typeString: string): Observable<Tutor[]> {
    if (!typeString.trim()) {
      this.getTutors();
    }
    return this.http.get(`${this.tutorsURL}?name_like=${typeString}`).pipe(
      tap(recieve => console.log(`recieve tutors: ${JSON.stringify(recieve)}`)),
      catchError(error => of(null))
    );
  }
  constructor(private http: HttpClient) { }
}
