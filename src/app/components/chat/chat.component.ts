import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }
content: any
  getChatStudent(student): void {
    this.chatService.getChatStudent(student).subscribe(
      studentsRecieve => this.content = studentsRecieve.content
    );
  }

}
