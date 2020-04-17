import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatService} from 'src/app/chat.service';
import {Router} from '@angular/router';
import {Chat} from '../../../models/Chat';
import {Student} from '../../../models/Student';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService, private router: Router) {
  }

  content;
  sessionStudent: Student = JSON.parse(sessionStorage.getItem('dashboard'));

  ngOnInit(): void {
    console.log(this.sessionStudent);
    this.getChat(this.sessionStudent.name);
  }

  getChat(userName): void {
    this.chatService.getChatStudent(userName).subscribe(result => {
      this.content = result[0].content;
      console.log(result[0].content);
    });
  }

}
