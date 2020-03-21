import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateAddComponent } from './allocate-add.component';

describe('AllocateAddComponent', () => {
  let component: AllocateAddComponent;
  let fixture: ComponentFixture<AllocateAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
