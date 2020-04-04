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
  }
  getAllTutor(): void {
    this.tutorService.getTutors().subscribe(
    );
  }
  onSubmitForm(user: string, pass: string) {
    // tslint:disable-next-line:triple-equals
    if (user == '' || pass == '') {
      console.log(`roonxg`);
      this.result = 'aaa';
    }
    this.result = null;
    this.classService.getLogin(user, pass).subscribe(
      userRecieve => {this.user = userRecieve;
                      console.log(this.user);
                      if (this.user.type == 1) {
                        sessionStorage.setItem('type', this.user.type);
                        this.router.navigate(['/dashboard']);
                      }

      }
    );
    console.log(user, pass);
  }
  isUserLoggedIn() {
    const type = sessionStorage.getItem('type');
  }

  logOut() {
    sessionStorage.removeItem('type');
  }
  constructor(private studentService: StudentService,
              private tutorService: TutorService,
              private classService: ClassService,
              private router: Router,
              ) {
  }
}
