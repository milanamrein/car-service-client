import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppErrorHandler } from './../common/errors/app-error-handler';
import { MatComponentsModule } from './../mat-components/mat-components.module';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './services/auth-guard.service';
import { ErrorService } from './services/error.service';
import { MechanicService } from './services/mechanic.service';
import { PartnerService } from './services/partner.service';
import { ReservationTypeService } from './services/reservation-type.service';
import { ReservationService } from './services/reservation.service';
import { WorksheetService } from './services/worksheet.service';

@NgModule({
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatComponentsModule   
  ],
  providers: [
    AlertService,
    ErrorService,    
    MechanicService,
    PartnerService,
    ReservationTypeService,
    ReservationService,
    WorksheetService,
    AuthGuard,
    // use custom AppErrorHandler class to handle errors
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ]
})
export class SharedModule { }
