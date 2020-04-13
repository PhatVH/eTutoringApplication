import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {
  arrBlog = [
    {id: 1, name: "What does students do when they stay at home? ", images: "blog.jpg"},
    {id: 2, name: "What would they like to do? ", images: "blog.jpg"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
