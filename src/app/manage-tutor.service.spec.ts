import { TestBed } from '@angular/core/testing';

import { ManageTutorService } from './manage-tutor.service';

describe('ManageTutorService', () => {
  let service: ManageTutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
