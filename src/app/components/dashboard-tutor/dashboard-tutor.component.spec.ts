import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTutorComponent } from './dashboard-tutor.component';

describe('DashboardTutorComponent', () => {
  let component: DashboardTutorComponent;
  let fixture: ComponentFixture<DashboardTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
