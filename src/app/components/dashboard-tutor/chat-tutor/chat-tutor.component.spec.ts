import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTutorComponent } from './chat-tutor.component';

describe('ChatTutorComponent', () => {
  let component: ChatTutorComponent;
  let fixture: ComponentFixture<ChatTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
