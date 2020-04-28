import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Constant} from '../../models/Constant';
import {catchError} from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  login(username, password): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const params = new HttpParams().set('username', username).set('password', password);
    // @ts-ignore
    return this.http.post<any>(Constant.loginURL, params, headers ).pipe(
      catchError(err => of(null))
    );
  }

  constructor(private http: HttpClient) { }
}
