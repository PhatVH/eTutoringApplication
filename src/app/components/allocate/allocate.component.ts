import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
import {Student} from '../../models/Student';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Class} from '../../models/Class';
import {Tutor} from '../../models/Tutor';
import {TutorService} from '../../service/tutor.service';
import {ClassService} from '../../service/class.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.css']
})
export class AllocateComponent implements OnInit {
  faUserCircle = faUserCircle;
  faUserPlus = faUserPlus;
  faSearch = faSearch;
  newStudents: Student[];
  newTutors: Tutor[];
  students: Student[];
  classes: Class[];
  tutors: Tutor[];
  selectTutor: Tutor[] = [];
  selectStudent: Student[] = [];
  countCheckAll = 0;
  private searchTutor = new Subject<string>();
  private searchStudent = new Subject<string>();
  openDivStudent: any = null;
  openDivTutor: any = null;

  constructor(private studentService: StudentService,
              private tutorService: TutorService) {
  }

  checkSelected(resultFromApi, selectedArr) {
    resultFromApi.forEach(obj => {
      selectedArr.forEach(obj2 => {
        if (obj.id === obj2.id) {
          obj.selected = obj2.selected;
        }
      });
    });
    return resultFromApi;
  }
  searchTutorAllocate(searchTutor: string): void {
    this.searchTutor.next(searchTutor);
    this.tutorService.searchTutor(searchTutor).subscribe(result => {
      this.newTutors = this.checkSelected(result, this.selectTutor);
    });
  }

  searchStudentAllocate(searchStudent: string): void {
    this.searchStudent.next(searchStudent);
    this.studentService.searchStudent(searchStudent).subscribe(result => {
      this.newStudents = this.checkSelected(result, this.selectStudent);
    });
  }

  ngOnInit(): void {
  }

  tutorChange(tutor) {
    const index = this.selectTutor.indexOf(tutor);
    if (index === -1) {
      tutor.selected = true ;
      this.selectTutor[0] = tutor;
      this.selectTutor.splice(0, 1, tutor)
    }
  }


  studentChange(student) {
    const index = this.selectStudent.indexOf(student);
    // tslint:disable-next-line:triple-equals
    console.log(index)
    if (index === -1) {
      student.selected = !student.selected;
      this.selectStudent.push(student);
    } else {
      student.selected = !student.selected;
      this.selectStudent.splice(index, 1);
    }
  }
  selectAllStudent(): void {
    this.countCheckAll += 1;
    if (this.countCheckAll % 2 !== 0) {
      this.newStudents.forEach(obj => {
        obj.selected = true;
        this.selectStudent.push(obj);
      });
    } else {
      this.selectStudent.forEach(obj => {
        obj.selected = false;
        this.selectStudent = [];
      });
    }
  }

  onClickBtnCancelStudent() {

  }

  onClickBtnAcceptStudent() {
    this.openDivStudent = 'value';
  }

  onClickBtnAcceptTutor() {
    this.openDivTutor = 'value';
  }
}
