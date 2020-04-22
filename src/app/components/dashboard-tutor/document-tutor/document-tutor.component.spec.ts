import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTutorComponent } from './document-tutor.component';

describe('DocumentTutorComponent', () => {
  let component: DocumentTutorComponent;
  let fixture: ComponentFixture<DocumentTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
