import { NgModule } from '@angular/core';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';

import { SharedModule } from './../shared/shared.module';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationCardComponent } from './components/reservation-card/reservation-card.component';
import { ReservationDateFormComponent } from './components/reservation-date-form/reservation-date-form.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HomeComponent,
    AddReservationComponent,
    ReservationDetailsComponent,
    ReservationsListComponent,
    ReservationCardComponent,
    ReservationTableComponent,
    ReservationDateFormComponent
  ],
  entryComponents: [
    AddReservationComponent,
    ReservationDetailsComponent
  ],
  providers: []
})
export class ReservationModule { }
