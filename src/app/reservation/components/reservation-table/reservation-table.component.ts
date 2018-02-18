import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MechanicDTO } from '../../../shared/models/mechanic';
import { ReservationDTO } from '../../../shared/models/reservation';
import { MechanicService } from '../../../shared/services/mechanic.service';
import { ReservationsTable } from '../../models/reservations-table';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent {

  // table input property
  @Input('table') table: ReservationsTable;

  // the current date input property
  @Input('current-date') currentDate: string;

  // the current hour
  currentHour: number;

  // the minimum date
  minDate: string;

  // the maximum date
  maxDate: string;

  // the authenticated user's ID
  userId: string;

  /**
   * output property that indicates whether 
   * the mechanics should be refreshed or not
   */
  @Output('get-all-mechanics') getAllMechanics: EventEmitter<boolean>;

  constructor(
    mechanicService: MechanicService,
    private dialog: MatDialog) {

    this.currentHour = (new Date(Date.now()).getUTCHours() + 1 === 24) ? 
      0 : new Date(Date.now()).getUTCHours() + 1;
    this.minDate = new Date(Date.now()).toLocaleDateString();
    this.maxDate = new Date(
      new Date(this.minDate).getFullYear() + 1, 
      new Date(this.minDate).getMonth(), 
      new Date(this.minDate).getDate()
    ).toLocaleDateString();
    this.userId = mechanicService.currentUser.Id;
    this.getAllMechanics = new EventEmitter<boolean>();
  }

  /**
   * Property which indicates whether the current day
   * is a weekend or not
   */
  get IsWeekend(): boolean {
    let date = new Date(this.currentDate);
    return (date.getDay() === 0 || date.getDay() === 6);
  }

  /**
   * Checks if the current date is
   * out of the Reservation date range
   */
  get IsOutOfDate(): boolean {
    return this.currentDate.localeCompare(this.minDate) === -1
      || this.currentDate.localeCompare(this.maxDate) === 1;
  }

  /**
   * Checks if a cell in the table is unavailable or not
   * @param time - the time
   * @param reservation - the reservation
   */
  isUnavailableCell(time: number, reservation: ReservationDTO): boolean {
    return (((time <= 12 || this.currentHour >= 12) && !reservation
      && !this.currentDate.localeCompare(this.minDate))
      || this.IsWeekend || this.IsOutOfDate);
  }

  /**
   * Checks if a cell in the table is available or not
   * @param time - the time
   * @param reservation - the reservation
   */
  isAvailableCell(time: number, reservation: ReservationDTO): boolean {
    return (!reservation
      && ((this.currentHour < 12 && time > 12) 
      || this.currentDate.localeCompare(this.minDate) !== 0)
      && !this.IsWeekend && !this.IsOutOfDate);
  }

  /**
   * Opens the dialog of adding a new reservation
   * and passes data to the dialog
   * @param time - the hour of the reservation
   * @param mechanic - the mechanic who has to handle the reservation
   */
  openAddReservationDialog(time: number, mechanic: MechanicDTO) {
    this.dialog.open(AddReservationComponent, {
      data: {
        time: time,
        date: this.currentDate,
        mechanic: mechanic
      }
    }).afterClosed().subscribe((isCreationSuccessful) => {
      if (isCreationSuccessful)
        this.getAllMechanics.emit(true);
    });
  }

  /**
   * Opens a reservation's details dialog
   * @param id - The reservation's ID
   */
  openReservationDetailsDialog(id: number) {
    this.dialog.open(ReservationDetailsComponent, {
      data: id
    }).afterClosed().subscribe((isDeletedSuccessfully) => {
      if (isDeletedSuccessfully)
        this.getAllMechanics.emit(true);
    });
  }

}
