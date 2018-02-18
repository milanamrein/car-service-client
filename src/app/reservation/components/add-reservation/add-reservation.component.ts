import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AppError } from '../../../common/errors/app-error';
import { BadInput } from '../../../common/errors/bad-input';
import { PartnerDTO } from '../../../shared/models/partner';
import { ReservationDTO } from '../../../shared/models/reservation';
import { ReservationTypeDTO } from '../../../shared/models/reservation-type';
import { AlertService } from '../../../shared/services/alert.service';
import { ReservationTypeService } from '../../../shared/services/reservation-type.service';
import { ReservationService } from '../../../shared/services/reservation.service';
import { DialogData } from '../../models/dialog-data';
import { MechanicDTO } from './../../../shared/models/mechanic';

/**
 * Component of adding a new reservation
 */
@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent {

  //#region Fields

  // reservation date
  date: string;

  // reservation time
  time: number;

  // reservation mechanic
  mechanic: MechanicDTO;

  // the new reservation
  newReservation: ReservationDTO;

  // array that holds all the reservation types
  reservationTypes: ReservationTypeDTO[];

  // indicates whether the form is loading or not
  isLoading: boolean;

  //#endregion

  //#region Reactive Form

  form = new FormGroup({
    select: new FormControl(),
    comment: new FormControl('', Validators.maxLength(100))
  });

  //#endregion

  //#region Default Constructor

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddReservationComponent>,
    private reservationService: ReservationService,
    private reservationTypeService: ReservationTypeService,
    private alertService: AlertService) {

    this.newReservation = new ReservationDTO();
    this.newReservation.time = new Date(data.date);
    this.newReservation.time.setHours(data.time);
    this.newReservation.mechanic = data.mechanic;

    this.isLoading = true;
    this.reservationTypeService.getAll()
      .subscribe(
        (reservationTypes: ReservationTypeDTO[]) => {
            this.reservationTypes = reservationTypes;
            this.isLoading = false;
        },
        (error: AppError) => { throw error; }
      );
  }

  //#endregion

  //#region Methods

  /**
   * Adds a new reservation
   */
  addReservation() {
    this.isLoading = true;
    this.dialogRef.disableClose = true;

    // create partner instance
    let partner = new PartnerDTO();
    partner.Id = this.reservationService.currentUser.Id;

    // create type instance
    let type = new ReservationTypeDTO();
    type.id = this.form.get('select').value;

    // create the new reservation
    this.newReservation.partner = partner,
    this.newReservation.type = type;
    // if there is a comment, add it to the reservation
    if (this.form.get('comment').value)
      this.newReservation.comment = this.form.get('comment').value;

    // create reservation
    this.reservationService.create(this.newReservation)
      .subscribe(response => {
        // if the creation was successful, redirect back with success message
        this.alertService.success('Reservation has been successfully created!');
        this.isLoading = false;
        this.dialogRef.disableClose = false;
        this.dialogRef.close(true);
      }, (error: AppError) => {
        this.isLoading = false;
        this.dialogRef.disableClose = false;
        this.dialogRef.close(false);
        // if the time has already been taken in the meantime
        if (error instanceof BadInput) {
          // then show error message
          this.alertService
            .error(
              'The time ' + this.newReservation.time + ' has already been taken!');
        } else throw error;
      });
  }

  //#endregion

}
