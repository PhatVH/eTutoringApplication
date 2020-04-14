import { Component, OnInit } from '@angular/core';
import {CountryService} from '../../service/country.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-manage-tutor',
  templateUrl: './manage-tutor.component.html',
  styleUrls: ['./manage-tutor.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class ManageTutorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
