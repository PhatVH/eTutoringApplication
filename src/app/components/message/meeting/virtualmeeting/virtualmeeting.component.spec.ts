import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualmeetingComponent } from './virtualmeeting.component';

describe('VirtualmeetingComponent', () => {
  let component: VirtualmeetingComponent;
  let fixture: ComponentFixture<VirtualmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
