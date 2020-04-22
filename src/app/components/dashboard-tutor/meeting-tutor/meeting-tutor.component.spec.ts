import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingTutorComponent } from './meeting-tutor.component';

describe('MeetingTutorComponent', () => {
  let component: MeetingTutorComponent;
  let fixture: ComponentFixture<MeetingTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
