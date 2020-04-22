import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-student',
  templateUrl: './document-student.component.html',
  styleUrls: ['./document-student.component.css']
})
export class DocumentStudentComponent implements OnInit {
  post: any = 'value';
  afterPost: any;
  constructor() { }

  ngOnInit(): void {

  }

  cancelClick() {

  }

  postClick() {
    this.post = null;
    this.afterPost = 'value';
  }
}
