import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppError } from '../../../common/errors/app-error';
import { Unauthorized } from '../../../common/errors/unauthorized';
import { AuthService } from '../../../membership/services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // indicates whether the form is loading or not
  isLoading = false;

  // Reactive form
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  // Default constructor
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  login() {
    this.isLoading = true;

    this.authService.login(this.form.get('username').value, this.form.get('password').value)
      .subscribe(result => {
        this.alertService.info('Welcome back!');

        // if the user tried to reach a page unauthenticated before, get that page's url
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        // and redirect the user to that desired page after successful login
        // otherwise redirect to the home page
        this.router.navigate([returnUrl || '/']);
        this.isLoading = false;
      }, (error: AppError) => {
        // if user credentials are not valid, alert error
        if (error instanceof Unauthorized) {
          this.alertService.error('Invalid username and/or password!');
          this.router.navigate(['/login']);
          this.isLoading = false;
        } else throw error; // throw error back to AppErrorHandler
      });
  }

}
