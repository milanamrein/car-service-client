import { ErrorService } from '../../shared/services/error.service';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Authentication service
 */
@Injectable()
export class AuthService {

  url = environment.url + 'users/';
  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
    private jwtHelperService: JwtHelperService) {}

  /**
   * Registers a new user
   * @param newUser - the new user's inputs
   */
  register(newUser) {
    return this.http.post(this.url, newUser)
      .map(response => response)
      .catch(this.errorService.handleError);
  }

  /**
   * Signs a user in
   * @param username - the username
   * @param password - the password
   */
  login(username, password) {
    return this.http.get(this.url + 'Partner/login/' + username + '/' + password)
      .map(response => {
        let result = response;
        localStorage.setItem('token', result['token']);
        return true;
      })
      .catch(this.errorService.handleError);
  }

  /**
   * Signs a user out
   */
  logout() {
    return localStorage.removeItem('token');
  }

  /**
   * Checks if there's any user with this username
   * @param user - the user's username
   */
  isExists(user) {
    return this.http.get(environment.url + 'users/isexists/' + user)
      .map(response => response)
      .catch(this.errorService.handleError);
  }

  /**
   * Checks if there is a valid token
   */
  isLoggedIn() {
    let token: string = this.jwtHelperService.tokenGetter();

    if (!token)
      return false;    

    return !this.jwtHelperService.isTokenExpired(token);
  }

}
