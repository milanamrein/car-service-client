import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../../shared/services/data.service';
import { AlertService } from '../../../shared/services/alert.service';
import { NotFound } from '../../../common/errors/not-found-error';
import { BadInput } from '../../../common/errors/bad-input';
import { AppError } from '../../../common/errors/app-error';
import { ReservationDTO } from '../../../shared/models/reservation';
import { ReservationService } from '../../../shared/services/reservation.service';
import { Component, Inject } from '@angular/core';

/**
 * Component of getting a reservation's details
 */
@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent {

  // ID of the specific reservation
  reservationId: number;

  // the reservation
  reservation: ReservationDTO;

  // indicates whether the dialog is loading or not
  isLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReservationDetailsComponent>,
    private reservationService: ReservationService,
    private alertService: AlertService) {

      // getting reservation's data
      this.reservationId = data;
      this.reservation = new ReservationDTO();
      this.isLoading = true;
      this.reservationService.get(this.reservationId)
        .subscribe(
          (reservation: ReservationDTO) => {
            this.reservation.id = reservation.id;
            this.reservation.time = new Date(reservation.time);
            this.reservation.mechanic = reservation.mechanic;
            this.reservation.worksheet = reservation.worksheet;
            this.reservation.type = reservation.type;
            this.isLoading = false;
          },
          (error: AppError) => {
            this.isLoading = false;
            this.dialogRef.close(false);
            if (error instanceof NotFound)
              this.alertService.error('Reservation cannot be found!');
            else throw error;
          }
        );

   }

  /**
   * Deletes the reservation
   * @param subscription - the subscription of the deletion
   */
  deleteReservation(subscription: Observable<any>) {
    this.isLoading = true;
    this.dialogRef.disableClose = true;

    subscription
      .subscribe(() => {
        this.alertService.success('Reservation successfully deleted!');
        this.dialogRef.disableClose = false;
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      (error: AppError) => {
        this.dialogRef.disableClose = false;
        this.isLoading = false;
        this.dialogRef.close(false);
        if (error instanceof NotFound)
          this.alertService.error('Reservation cannot be found!');
        else throw error;
      });
  }

}
