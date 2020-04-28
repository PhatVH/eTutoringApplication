import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Student} from '../../models/Student';
import {Tutor} from '../../models/Tutor';
import {Constant} from '../../models/Constant';

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

  searchStudentAllocate(typeString: string, url): Observable<Student[]> {
    if (!typeString.trim()) {
      return this.getStudents(url);
    }
    // @ts-ignore
    return this.http.get<any>(`${url}?name_like=${typeString}`, Constant.headers);
  }

  searchStudentInvite(typeString: string, url): Observable<Student[]> {
    if (!typeString.trim()) {
      return null;
    }
    // @ts-ignore
    return this.http.get<any>(`${url}&name_like=${typeString}`, Constant.headers);
  }

  getListStudentOfTutor(tutorID): Observable<Student[]> {
    const url = `${Constant.getStudentsByTutorIdUrl}?tutor_ID=${tutorID}`
    // @ts-ignore
    return this.http.get<Student[]>(url, Constant.headers );
  }

  constructor(private http: HttpClient) {
  }

  postAllocateAndReallocate(tutorID, arrStudentID, url) {
    let params = new HttpParams().set('tutor_id', tutorID);
    // tslint:disable-next-line:only-arrow-functions
    arrStudentID.forEach(function(studentID) {
      params = params.append('student_id[]', studentID);
    });
    return this.http.post<any>(url, params);
  }

  getDataChat(url): Observable<any> {
    console.log(`check`)
    // @ts-ignore
    return this.http.get<any>(url, Constant.headers);
  }
}
