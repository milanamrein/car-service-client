import { TestBed, inject } from '@angular/core/testing';

import { WorksheetGuardService } from './worksheet-guard.service';

describe('WorksheetGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorksheetGuardService]
    });
  });

  it('should be created', inject([WorksheetGuardService], (service: WorksheetGuardService) => {
    expect(service).toBeTruthy();
  }));
});
