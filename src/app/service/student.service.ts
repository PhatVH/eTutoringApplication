import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Student} from '../models/Student';
import {Tutor} from '../models/Tutor';
import {Constant} from '../models/Constant';

const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  getStudents(url): Observable<Student[]> {
    // @ts-ignore
    return this.http.get<any>(url, Constant.headers);
  }
  searchStudent(typeString: string, url): Observable<Student[]> {
    if (!typeString.trim()) {
      return this.getStudents(url);
    }
    // @ts-ignore
    return this.http.get<any>(`${url}&name_like=${typeString}`, Constant.headers);
  }

  getListStudentOfTutor(tutor): Observable<Student[]> {
    const url = `${Constant.studentsURL}?tutor=${tutor}`;
    // @ts-ignore
    return this.http.get<any>(url, Constant.headers);
  }

  constructor(private http: HttpClient) { }
}
