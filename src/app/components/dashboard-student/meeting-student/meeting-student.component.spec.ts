import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingStudentComponent } from './meeting-student.component';

describe('MeetingStudentComponent', () => {
  let component: MeetingStudentComponent;
  let fixture: ComponentFixture<MeetingStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
