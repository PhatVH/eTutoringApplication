import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-afterpost',
  templateUrl: './afterpost.component.html',
  styleUrls: ['./afterpost.component.css']
})
export class AfterpostComponent implements OnInit {
  post : any = "value";
  afterPost : any;
  constructor() { }

  ngOnInit(): void {
    
  }

  cancelClick(){

  }

  postClick(){
    this.post = null;
    this.afterPost = "value";
  }
}
