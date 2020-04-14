import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Class} from '../../models/Class';
import {catchError, tap} from 'rxjs/operators';
import {Student} from '../../models/Student';
import {User} from '../../models/User';

const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classesURL = 'http://localhost:3000/classes';
  private usersURL = 'http://localhost:3000/user';

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.classesURL).pipe(
      tap(recieve => console.log(`recieve classes: ${JSON.stringify(recieve)}`)),
      catchError(error => of([]))
    );
  }

  searchClass(typeString: string): Observable<Class[]> {
    if (!typeString.trim()) {
      this.getClasses();
    }
    return this.http.get(`${this.classesURL}?name_like=${typeString}`).pipe(
      tap(recieve => console.log(`recieve classes: ${JSON.stringify(recieve)}`)),
      catchError(error => of(null))
    );
  }

  getLogin(userName: string, pass: string): Observable<User> {
    const url = `${this.usersURL}?name=${userName}&&pass=${pass}`;
    return this.http.get<User>(url).pipe(
      tap(recieve => console.log('recieve user: ' +  recieve)),
      catchError(error => of(null))
    );
  }
  constructor(private http: HttpClient) { }
}
