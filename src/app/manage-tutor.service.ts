import {Injectable, PipeTransform} from '@angular/core';
import {Tutor} from '../models/Tutor';
import {SortColumn, SortDirection} from './sortable.directive';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {Constant} from '../models/Constant';
import {catchError, debounceTime, delay, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  tutors: Tutor[];
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
function sort(tutors: Tutor[], column: SortColumn, direction: string): Tutor[] {
  if (direction === '' || column === '') {
    return tutors;
  } else {
    return [...tutors].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(tutor: Tutor, term: string, pipe: PipeTransform) {
  return tutor.name.toLowerCase().includes(term.toLowerCase())
    || tutor.email.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(tutor.id).includes(term);
}

@Injectable({providedIn: 'root'})
export class ManageTutorService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tutors$ = new BehaviorSubject<Tutor[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private TUTORS: Tutor[];
  private TUTORS$: Observable<Tutor[]>;
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe,
              private http: HttpClient) {
    this.getAllTutors();
  }

  getTutors(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(Constant.tutorsURL).pipe(
      tap(recieve => console.log(`recieve Tutor: ${JSON.stringify(recieve)}`)),
      catchError(error => of([]))
    );
  }

  getAllTutors(): void {
    this.getTutors().subscribe(
      tutorsRecieve => {
        this.TUTORS = tutorsRecieve;
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._tutors$.next(result.tutors);
          this._total$.next(result.total);
        });
        this._search$.next();
        console.log(`this.TUTORS`);
        console.log(this.TUTORS);
      }
    );
  }

  get tutors$() {
    return this._tutors$.asObservable();
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
    let tutors = sort(this.TUTORS, sortColumn, sortDirection);

    // 2. filter
    tutors = tutors.filter(tutor => matches(tutor, searchTerm, this.pipe));
    const total = tutors.length;

    // 3. paginate
    tutors = tutors.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({tutors, total});
  }
}
