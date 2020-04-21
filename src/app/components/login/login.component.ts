import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {NgForm} from '@angular/forms';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faUnlock} from '@fortawesome/free-solid-svg-icons';
import {StudentService} from '../../service/student.service';
import {TutorService} from '../../service/tutor.service';
import {ClassService} from '../../service/class.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faUnlock = faUnlock;
  user: User = null;
  result: string;
  invalidAccount: string;

  ngOnInit(): void {
    this.getUser();
  }

  onSubmitForm(user: string, pass: string) {
    // tslint:disable-next-line:triple-equals
    if (user == '' || pass == '') {
      this.result = 'result';
      return;
    }
    this.result = null;
    this.classService.login(user, pass).subscribe(
      (userRecieve) => {
        // tslint:disable-next-line:triple-equals
        if (userRecieve == null) {
          this.invalidAccount = 'invalidAccount';
          this.router.navigate(['/login']);
        } else {
          this.user = userRecieve;
          console.log(this.user)
          sessionStorage.setItem('user', JSON.stringify(userRecieve));
          this.router.navigate(['/home']);
        }
      }
    );
  }

  isUserLoggedIn() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return !(user === null);
  }

  getUser(): User {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      this.user = user;
      return this.user;
    }
    return this.user;
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  constructor(private studentService: StudentService,
              private tutorService: TutorService,
              private classService: ClassService,
              private router: Router,
  ) {
  }
}
