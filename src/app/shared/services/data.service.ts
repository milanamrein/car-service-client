import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { PartnerDTO } from './../models/partner';
import { ErrorService } from './error.service';

// Base service for HTTP requests to back-end
export class DataService {

  constructor(
    private url: string,
    private http: HttpClient,
    private errorService: ErrorService,
    private jwtHelperService: JwtHelperService) {}

  //#region Properties

  /**
   * Gets the current user's data from token
   */
  get currentUser(): PartnerDTO {
    let token = localStorage.getItem('token');
    if (!token) return null;

    return this.jwtHelperService.decodeToken(token);
  }

  /**
   * Gets the Authentication Header
   */
  private get authHeader(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  //#endregion

  //#region HTTP requests

  /**
   * HTTP GET
   */
  getAll() {
    return this.http.get(this.url, { headers: this.authHeader })
      .map(response => response)
      .catch(this.errorService.handleError);
  }

  /**
   * HTTP GET {id}
   * @param id - The item's id
   */
  get(id: any) {
    return this.http.get(this.url + '/' + id, { headers: this.authHeader })
      .map(response => response)
      .catch(this.errorService.handleError);
  }

  /**
   * HTTP POST
   * @param item - The item to create
   */
  create(item: any) {
    return this.http.post(this.url, item, { headers: this.authHeader })
      .map(response => response)
      .catch(this.errorService.handleError);
  }

  /**
   * HTTP DELETE {id}
   * @param id - The deletable item's id
   */
  delete(id: any) {
    return this.http.delete(this.url + '/' + id, { headers: this.authHeader })
      .map(response => response)
      .catch(this.errorService.handleError);
  }

  //#endregion

}
