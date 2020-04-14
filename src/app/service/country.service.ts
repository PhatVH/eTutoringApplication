import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {catchError, debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../sortable.directive';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../../models/Student';
import {Constant} from '../../models/Constant';
import {Country} from '../../models/Countries';

interface SearchResult {
  countries: Country[];
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

function sort(countries: Country[], column: SortColumn, direction: string): Country[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: Country, term: string, pipe: PipeTransform) {
  return country.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(country.area).includes(term)
    || pipe.transform(country.population).includes(term);
}

@Injectable({providedIn: 'root'})
export class CountryService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Country[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private COUNTRIES: Country[] = [{
    "id": 12,
    "name": "Tuvalu",
    "flag": "3/38/Flag_of_Tuvalu.svg",
    "area": 26,
    "population": 11097
  },
    {
      "id": 13,
      "name": "China",
      "flag": "f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
      "area": 9596960,
      "population": 1409517397
    }];
  private COUNTRIES$: Observable<Country[]>;
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe,
              private http: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });

    this._search$.next();
    this.getAllCountries();
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(Constant.countryURL).pipe(
      tap(recieve => console.log(`recieve Country: ${JSON.stringify(recieve)}`)),
      catchError(error => of([]))
    );
  }

  getAllCountries(): void {
    this.getCountries().subscribe(
      studentsRecieve => {
        this.COUNTRIES = studentsRecieve;
        console.log(`this.COUNTRIES`);
        console.log(this.COUNTRIES);
      }
    );
  }

  get countries$() {
    return this._countries$.asObservable();
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
    let countries = sort(this.COUNTRIES, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  }
}
