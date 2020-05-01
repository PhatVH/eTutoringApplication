import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {catchError, debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../sortable/sortable.directive';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constant} from '../../models/Constant';
import {Student} from '../../models/Student';
import {Tutor} from '../../models/Tutor';

interface SearchResult {
  students: Student[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(students: Student[], column: SortColumn, direction: string): Student[] {
  if (direction === '' || column === '') {
    return students;
  } else {
    return [...students].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(student: Student, term: string, pipe: PipeTransform) {
  return student.name.toLowerCase().includes(term.toLowerCase())
    || student.email.toLowerCase().includes(term.toLowerCase())
    || student.country.toLowerCase().includes(term.toLowerCase())
    || student.phone.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(student.id).includes(term);
}

@Injectable({providedIn: 'root'})
export class CountryService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _students$ = new BehaviorSubject<Student[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private STUDENTS: Student[];
  private STUDENTS$: Observable<Student[]>;
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe,
              private http: HttpClient) {
  }

  getStudents(studentsURL): Observable<Student[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    // @ts-ignore
    return this.http.get<any>(studentsURL, headers );
  }


  getAllStudentManage(studentsURL): void {
    this.getAllStudents(studentsURL);
  }
  getAllStudentWithoutTutor(studentsURL): void {
    this.getAllStudents(studentsURL);
  }
  getAllStudentWithNoInteract(studentsURL: string) {
    this.getAllStudents(studentsURL);
  }
  getAllStudentsOfTutor(studentsURL): void {
    this.getAllStudents(studentsURL);
  }

  getAllStudents(studentsURL): void {
    this.getStudents(studentsURL).subscribe(
      studentsRecieve => {
        this.STUDENTS = studentsRecieve;
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._students$.next(result.students);
          this._total$.next(result.total);
        });
        this._search$.next();
      }
    );
  }

  get students$() {
    return this._students$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let students = sort(this.STUDENTS, sortColumn, sortDirection);

    // 2. filter
    students = students.filter(student => matches(student, searchTerm, this.pipe));
    const total = students.length;

    // 3. paginate
    students = students.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({students, total});
  }


}
