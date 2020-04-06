import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../models/User';
import {NgForm} from '@angular/forms';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faUnlock} from '@fortawesome/free-solid-svg-icons';
import {StudentService} from '../student.service';
import {TutorService} from '../tutor.service';
import {ClassService} from '../class.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faUnlock = faUnlock;
  user: User;
  result: string;

  ngOnInit(): void {
    this.getDataType();
  }
  getAllTutor(): void {
    this.tutorService.getTutors().subscribe(
    );
  }
  onSubmitForm(user: string, pass: string) {
    // tslint:disable-next-line:triple-equals
    if (user == '' || pass == '') {
      this.result = 'aaa';
    }
    this.result = null;
    this.classService.getLogin(user, pass).subscribe(
      userRecieve => {this.user = userRecieve;
        // tslint:disable-next-line:triple-equals
                      sessionStorage.setItem('typeUser', this.user[0].type);
                      this.router.navigate(['/dashboard']);
                      console.log('login component :' + this.user[0].type);

      }
    );
  }
  isUserLoggedIn() {
    const typeUser = sessionStorage.getItem('typeUser');
    return !(typeUser === null);
  }

  logOut() {
    sessionStorage.removeItem('typeUser');
  }
  getDataType(): string {
    const typeUser = sessionStorage.getItem('typeUser');
    return typeUser;
  }
  constructor(private studentService: StudentService,
              private tutorService: TutorService,
              private classService: ClassService,
              private router: Router,
              ) {
  }
}
