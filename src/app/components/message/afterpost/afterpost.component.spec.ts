import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterpostComponent } from './afterpost.component';

describe('AfterpostComponent', () => {
  let component: AfterpostComponent;
  let fixture: ComponentFixture<AfterpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
