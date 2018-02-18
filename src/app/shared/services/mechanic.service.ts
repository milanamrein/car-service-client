import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import { DataService } from './data.service';
import { ErrorService } from './error.service';

/**
 * Service for handling HTTP requests regarding to mechanics
 */
@Injectable()
export class MechanicService extends DataService {

  constructor(
    http: HttpClient, 
    errorService: ErrorService, 
    jwtHelperService: JwtHelperService) {
    super(environment.url + 'users/Mechanic', http, errorService, jwtHelperService);
  }

}
