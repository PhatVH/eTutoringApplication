import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Student} from '../../models/Student';
import {Tutor} from '../../models/Tutor';
import {Constant} from '../../models/Constant';

const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(Constant.studentsURL).pipe(
      tap(recieve => console.log(`recieve studen: ${JSON.stringify(recieve)}`)),
      catchError(error => of([]))
    );
  }
  getLoginStudent(userName: string, pass: string): Observable<Student> {
    const url = `${Constant.studentsURL}?name=${userName}&&pass=${pass}`;
    return this.http.get<Student>(url).pipe(
      tap(recieve => console.log(`recieve movie: ${JSON.stringify(recieve)}`)),
      catchError(error => of(null))
    );
  }

  searchStudent(typeString: string): Observable<Student[]> {
    if (!typeString.trim()) {
      return this.http.get(`${Constant.studentsURL}`).pipe(
        tap(recieve => console.log(`recieve students: ${JSON.stringify(recieve)}`)),
        catchError(error => of(null))
      );
    }
    return this.http.get(`${Constant.studentsURL}?name_like=${typeString}`).pipe(
      tap(recieve => console.log(`recieve students allocate: ${JSON.stringify(recieve)}`)),
      catchError(error => of(null))
    );
  }
  constructor(private http: HttpClient) { }
}
