import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Student} from '../models/Student';
import {Tutor} from '../models/Tutor';

const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsURL = 'http://localhost:3000/students';
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsURL).pipe(
      tap(recieve => console.log(`recieve studen: ${JSON.stringify(recieve)}`)),
      catchError(error => of([]))
    );
  }
  getLoginStudent(userName: string, pass: string): Observable<Student> {
    const url = `${this.studentsURL}?name=${userName}&&pass=${pass}`;
    return this.http.get<Student>(url).pipe(
      tap(recieve => console.log(`recieve movie: ${JSON.stringify(recieve)}`)),
      catchError(error => of(null))
    );
  }

  searchStudent(typeString: string): Observable<Student[]> {
    if (!typeString) {
      return this.http.get<Student[]>(this.studentsURL).pipe(
        tap(recieve => console.log(`recieve student Search: ${JSON.stringify(recieve)}`)),
        catchError(error => of([]))
      );
    }
    return this.http.get(`${this.studentsURL}?name_like=${typeString}`).pipe(
      tap(recieve => console.log(`recieve students: ${JSON.stringify(recieve)}`)),
      catchError(error => of(null))
    );
  }
  constructor(private http: HttpClient) { }
}
