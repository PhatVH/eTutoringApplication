import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Class} from '../models/Class';
import {catchError, map, tap} from 'rxjs/operators';
import {Student} from '../models/Student';
import {User} from '../models/User';
import {Constant} from '../models/Constant';

const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private usersURL = 'http://localhost:3000/user';
  getLogin(userName: string, pass: string): Observable<User> {
    const url = `${this.usersURL}?name=${userName}&&pass=${pass}`;
    return this.http.get<User>(url).pipe(
      tap(recieve => console.log(`recieve user: ${JSON.stringify(recieve)}`)),
      catchError(error => of(null))
    );
  }

  login(username, password): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const params = new HttpParams().set('username', username).set('password', password);
    // @ts-ignore
    return this.http.post<any>(Constant.loginURL, params, headers );
  }

  constructor(private http: HttpClient) { }
}
