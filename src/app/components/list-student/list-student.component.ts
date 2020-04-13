import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
    arrStudent = [
      {id: 1, name: 'Ngo Viet Anh', age: 20, country: 'Ha Long', email: "adamsimons911@gmail.com", images: "student1.jpg"},
      {id: 2, name: 'Nguyen Tuan Anh', age: 20, country: 'Thanh Hoa', email: "nguyentuananh@gmail.com", images: "student1.jpg"},
      {id: 3, name: 'Nguyen Quoc Trung', age: 20, country: 'Soc Trang', email: "nguyenquoctrung@gmail.com", images: "student1.jpg"},
      {id: 4, name: 'Tran Van A', age: 20, country: 'Binh Dinh', email: "TranVanA@gmail.com", images: "student1.jpg"},
      {id: 5, name: 'Nguyen Tra My', age: 20, country: 'Nghe an', email: "nguyentramy@gmail.com", images: "student1.jpg"},
      {id: 6, name: 'Nguyen Tra My', age: 20, country: 'Nghe an', email: "nguyentramy@gmail.com", images: "student1.jpg"},
      {id: 7, name: 'Nguyen Tra My', age: 20, country: 'Nghe an', email: "nguyentramy@gmail.com", images: "student1.jpg"},
      {id: 8, name: 'Nguyen Tra My', age: 20, country: 'Nghe an', email: "nguyentramy@gmail.com", images: "student1.jpg"},
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
