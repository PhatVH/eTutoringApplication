import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealmeetingnoteComponent } from './realmeetingnote.component';

describe('RealmeetingnoteComponent', () => {
  let component: RealmeetingnoteComponent;
  let fixture: ComponentFixture<RealmeetingnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealmeetingnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealmeetingnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
