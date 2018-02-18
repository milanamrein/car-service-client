import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-date-form',
  templateUrl: './reservation-date-form.component.html',
  styleUrls: ['./reservation-date-form.component.css']
})
export class ReservationDateFormComponent {

  // the minimum date limit input property
  minDate: Date;

  // maximum date limit
  maxDate: Date;

  // the date input element output property
  @Output('reservation-date') reservationDate: EventEmitter<string>;

  // Reactive Form
  form = new FormGroup({
    date: new FormControl(this.minDate, [
      Validators.required,
      Validators.min(Date.now())
    ])
  });

  constructor() { 
    this.minDate = new Date(Date.now());    
    this.maxDate = new Date(
      this.minDate.getFullYear() + 1, 
      this.minDate.getMonth(), 
      this.minDate.getDate()
    );
    this.reservationDate = new EventEmitter<string>();
  }

  /**
   * Filters weekends in the DatePicker
   */
  weekendFilter = (d: Date): boolean => {
    let day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  /**
   * Gets the chosen date input element
   * @param date - The date input
   */
  selectReservationDate(date: HTMLInputElement) {
    this.reservationDate.emit(new Date(date.value).toLocaleDateString());
  }

}
