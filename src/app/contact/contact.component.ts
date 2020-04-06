import { Component, OnInit } from '@angular/core';

import {faMapMarker} from '@fortawesome/free-solid-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  faMapMarker = faMapMarker;
  faPhone = faPhone;
  faLocationArrow = faLocationArrow;

  constructor() { }

  ngOnInit(): void {
  }

}
