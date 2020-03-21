import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {NgForm} from '@angular/forms';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faUnlock} from '@fortawesome/free-solid-svg-icons';
import {StudentService} from '../student.service';
import {TutorService} from '../tutor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faUnlock = faUnlock;
  user: User = new User();

  ngOnInit(): void {
  }

  getAllTutor(): void {
    this.tutorService.getTutors().subscribe(
    );
  }

  onSubmitForm(userName: string, pass: string) {
    this.tutorService.getLoginTutor(userName, pass).subscribe(

    );
  }
  constructor(private studentService: StudentService,
              private tutorService: TutorService) {
  }
}
