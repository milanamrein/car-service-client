import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import { DataService } from './data.service';
import { ErrorService } from './error.service';

/**
 * Service for handling HTTP requests regarding to reservations
 */
@Injectable()
export class ReservationService extends DataService {

  constructor(
    http: HttpClient, 
    errorService: ErrorService, 
    jwtHelperService: JwtHelperService) {
    super(environment.url + 'reservations', http, errorService, jwtHelperService);
  }

}
