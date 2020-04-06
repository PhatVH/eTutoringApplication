import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForewordComponent } from './foreword.component';

describe('ForewordComponent', () => {
  let component: ForewordComponent;
  let fixture: ComponentFixture<ForewordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForewordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForewordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
