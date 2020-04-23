import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Tutor} from '../../models/Tutor';
import {Observable, of} from 'rxjs';
import {Constant} from '../../models/Constant';
const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class TutorService {
  getTutors(): Observable<Tutor[]> {
    // @ts-ignore
    return this.http.get<any>(Constant.tutorsURL, Constant.headers );
  }
  getTutorByStudentId(studentID): Observable<Tutor[]> {
    const url = `${Constant.getTutorByStudentIdUrl}?student_id=${studentID}`
    // @ts-ignore
    return this.http.get<Tutor[]>(url, Constant.headers );

  }

  searchTutor(typeString: string): Observable<Tutor[]> {
    if (!typeString.trim()) {
      this.getTutors();
    }
    // @ts-ignore
    return this.http.get<any>(`${Constant.tutorsURL}?name_like=${typeString}`, Constant.headers );
  }
  constructor(private http: HttpClient) { }


}
