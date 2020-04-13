import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateRemoveComponent } from './allocate-remove.component';

describe('AllocateRemoveComponent', () => {
  let component: AllocateRemoveComponent;
  let fixture: ComponentFixture<AllocateRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
