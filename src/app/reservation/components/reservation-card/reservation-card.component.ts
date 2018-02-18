import { ReservationService } from '../../../shared/services/reservation.service';
import { Observable } from 'rxjs/Observable';
import { ReservationDTO } from '../../../shared/models/reservation';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent {

  // The reservation input property
  @Input('reservation') reservation: ReservationDTO;

  // Input property which indicates whether all the
  // details has to be shown
  @Input('show-all') showAll = true;

  /**
   * Output property which tells the parent whether
   * the reservation was deleted or not
   */
  @Output('on-reservation-deleted') onReservationDeleted: EventEmitter<Observable<any>>;

  /**
   * Output property which indicates whether
   * the dialog should be closed or not
   */
  @Output('dialog-should-be-closed') dialogShouldBeClosed: EventEmitter<boolean>;

  constructor(private reservationService: ReservationService) { 
    this.onReservationDeleted = new EventEmitter<Observable<any>>();
    this.dialogShouldBeClosed = new EventEmitter<boolean>();
  }

  /**
   * Deletes the reservation from the database
   */
  deleteReservation() {
    this.onReservationDeleted.emit(this.reservationService.delete(this.reservation.id));
  }

  /**
   * Indicates that the dialog should be closed
   */
  closeDialog() {
    this.dialogShouldBeClosed.emit(true);
  }

}
