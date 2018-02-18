import { BadInput } from '../../../common/errors/bad-input';
import { Observable } from 'rxjs/Observable';
import { PartnerService } from '../../../shared/services/partner.service';
import { Router } from '@angular/router';
import { NotFound } from '../../../common/errors/not-found-error';
import { AppError } from '../../../common/errors/app-error';
import { PartnerDTO } from '../../../shared/models/partner';
import { ReservationDTO } from '../../../shared/models/reservation';
import { AlertService } from '../../../shared/services/alert.service';
import { Component } from '@angular/core';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';

/**
 * Component for showing the reservations
 * of the authenticated partner
 */
@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent {

  // indicates whether the page is loading or not
  isLoading: boolean;

  // reservations of the authenticated partner
  partnerReservations: ReservationDTO[];

  constructor(
    private partnerService: PartnerService,
    private alertService: AlertService,
    private router: Router
  ) {

    // getting the partner's reservations
    this.partnerReservations = new Array<ReservationDTO>();
    this.isLoading = true;    
    this.getPartnerReservations();
  }

  // authenticated user property
  get User(): PartnerDTO {
    return this.partnerService.currentUser;
  }

  /**
   * Gets the authenticated partner's reservation
   */
  getPartnerReservations() {
    this.partnerService.get(this.partnerService.currentUser.Id)
      .subscribe((partner: PartnerDTO) => {
        this.partnerReservations = partner.partnerReservations;
        if (this.partnerReservations) {
          this.partnerReservations.forEach(reservation => {
            let time = new Date(reservation.time);
            reservation.time = time;
          });
        }
        this.isLoading = false;
      },
      (error: AppError) => {
        if (error instanceof NotFound) {
          this.alertService.error('Partner cannot be found!');
          this.router.navigate(['/']);
        } else throw error;
      });
  }

  /**
   * Deletes a reservation from the list
   * @param subscription - the subscription of deletion
   */
  deleteReservation(subscription: Observable<any>) {
    this.isLoading = true;

    subscription
      .subscribe((deletedReservation) => {
        this.alertService.success('Reservation successfully deleted!');
        for (let i = 0; i < this.partnerReservations.length; i++) {
          if (deletedReservation.id === this.partnerReservations[i].id)
            this.partnerReservations.splice(i, 1);
        }
        this.isLoading = false;
      },
      (error: AppError) => {
        this.isLoading = false;
        if (error instanceof NotFound)
          this.alertService.error('Reservation cannot be found!');
        else throw error;
      });
  }

}
