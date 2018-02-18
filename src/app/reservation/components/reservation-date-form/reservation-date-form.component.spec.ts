import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDateFormComponent } from './reservation-date-form.component';

describe('ReservationDateFormComponent', () => {
  let component: ReservationDateFormComponent;
  let fixture: ComponentFixture<ReservationDateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationDateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
