import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../service/student.service';
import {Student} from '../../../models/Student';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Class} from '../../../models/Class';
import {Tutor} from '../../../models/Tutor';
import {TutorService} from '../../service/tutor.service';
import {ClassService} from '../../service/class.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validator} from '@angular/forms';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.css']
})
export class AllocateComponent implements OnInit {
  faUserCircle = faUserCircle;
  faUserPlus = faUserPlus;
  faSearch = faSearch;
  tutors$: Observable<Tutor[]>;
  clases$: Observable<Class[]>;
  students$: Observable<Student[]>;
  newStudents: Student[];
  students: Student[];
  classes: Class[];
  tutors: Tutor[];
  selectTutor: Tutor[] = [];
  selectClass: Class[] = [];
  selectStudent: Student[] = [];
  private searchTutor = new Subject<string>();
  private searchClass = new Subject<string>();
  private searchStudent = new Subject<string>();
  constructor(private studentService: StudentService,
              private tutorService: TutorService,
              private classService: ClassService) {
  }
  checkSelectedStudent(beforeFilter: Student[], afterFilter: Student[]) {
    beforeFilter.forEach(obj => {
      afterFilter.forEach(obj2 => {
        if (obj.id === obj2.id) {
         obj.selected = true;
        }
      });
    });
    return beforeFilter;
  }
  searchTutorAllocate(searchTutor: string): void {
    console.log(`searchTutor = ${searchTutor}`);
    this.searchTutor.next(searchTutor);
  }
  searchClassAllocate(searchClass: string): void {
    console.log(`searchedString = ${searchClass}`);
    this.searchClass.next(searchClass);
  }
  searchStudentAllocate(searchStudent: string): void {
    console.log(`search nhập từ bàn phím student = ${searchStudent}`);
    this.searchStudent.next(searchStudent);
    this.studentService.searchStudent(searchStudent).subscribe(result => {
      this.newStudents = this.checkSelectedStudent(result, this.selectStudent);
    });
  }

  ngOnInit(): void {
    this.tutors$ = this.searchTutor.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTutor: string) => this.tutorService.searchTutor(searchTutor))
    );
    this.clases$ = this.searchClass.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchClass: string) => this.classService.searchClass(searchClass))
    );
    this.students$ = this.searchStudent.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchStudent: string) => this.studentService.searchStudent(searchStudent))
    );

  }

  tutorChange(tutor) {
    const index = this.selectTutor.indexOf(tutor);
    // tslint:disable-next-line:triple-equals
    if (index == 1) {
     return;
    } else {
      this.selectTutor.splice(0, 1, tutor);
    }
  }

  classChange(eachClass) {
    const index = this.selectClass.indexOf(eachClass);
    // tslint:disable-next-line:triple-equals
    if (index == 1) {
      return;
    } else {
      this.selectClass.splice(0, 1, eachClass);
    }
  }

  studentChange(student: Student) {
    const index = this.selectStudent.indexOf(student);
    // tslint:disable-next-line:triple-equals
    if (index == -1) {
      student.selected = true
      this.selectStudent.push(student);
      console.log(`this.selectStudent`);
      console.log(this.selectStudent);
    } else {
      this.selectStudent.splice(index, 1);
      this.selectStudent[index].selected = false;
    }
  }

  onSubmitFormAllocateTutor(value: NgForm) {
    // tslint:disable-next-line:triple-equals
      console.log(`hhaha`);
  }
}
