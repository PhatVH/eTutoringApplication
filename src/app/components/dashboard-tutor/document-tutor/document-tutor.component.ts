import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-tutor',
  templateUrl: './document-tutor.component.html',
  styleUrls: ['./document-tutor.component.css']
})
export class DocumentTutorComponent implements OnInit {
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
