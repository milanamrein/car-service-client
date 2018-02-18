import { TestBed, inject } from '@angular/core/testing';

import { ReservationTypeService } from './reservation-type.service';

describe('ReservationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservationTypeService]
    });
  });

  it('should be created', inject([ReservationTypeService], (service: ReservationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
