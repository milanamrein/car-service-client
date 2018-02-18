import { PasswordErrorStateMatcher } from './../../../common/validators/error-state-matcher';
import { AuthService } from './../../services/auth.service';
import { BadInput } from '../../../common/errors/bad-input';
import { AppError } from '../../../common/errors/app-error';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { UsernameValidators } from '../../../common/validators/username.validator';
import { PasswordValidators } from '../../../common/validators/password.validators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsernameValidators]
})
export class SignupComponent {

  // Regular expression input patterns
  nameRegexPattern = '^[A-Z][a-z]*';
  usernameRegexPattern = '^[A-Za-z](?:\\S.{0,}\\S\\w)?$';
  phoneNumberRegexPattern = '^[0-9]{2}\\/[0-9]{3}-[0-9]{4}';
  countryRegexPattern = '^[A-Z]{1,2}';
  zipCodeRegexPattern = '^[A-Z0-9](?:\\S.{0,}\\S\\w)?$';
  cityRegexPattern = '^[A-Z](?:\\S.{0,}\\S\\w)?$';
  streetRegexPattern = '^[0-9/A-Z]* [A-Z](?:\\S.{0,}\\S)?$';

  // ErrorStateMatcher to show PasswordGroup validation error message
  // in the ConfirmPassword form field
  passwordErrorStateMatcher = new PasswordErrorStateMatcher();

  isLoading = false;

  // Default constructor
  constructor(
    private usernameValidators: UsernameValidators,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  //#region Reactive form
    form = new FormGroup({      
      firstName: new FormControl('', [
        Validators.minLength(3),
        Validators.pattern(this.nameRegexPattern)
      ]),
      lastName: new FormControl('', [
        Validators.minLength(3),
        Validators.pattern(this.nameRegexPattern)
      ]),
      username: new FormControl('', [
        Validators.minLength(5),
        Validators.pattern(this.usernameRegexPattern)
      ], this.usernameValidators.shouldBeUnique.bind(this.usernameValidators)),
      phoneNumber: new FormControl('', [
        Validators.pattern(this.phoneNumberRegexPattern)
      ]),
      country: new FormControl('', [
        Validators.pattern(this.countryRegexPattern)
      ]),
      zipCode: new FormControl('', [
        Validators.minLength(3),
        Validators.pattern(this.zipCodeRegexPattern)
      ]),
      city: new FormControl('', [
        Validators.minLength(3),
        Validators.pattern(this.cityRegexPattern)
      ]),
      street: new FormControl('', [
        Validators.pattern(this.streetRegexPattern)
      ]),
      passwordGroup: new FormGroup({
        password: new FormControl('', [
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('')
      }, PasswordValidators.passwordsDoNotMatch)
    });
  //#endregion

  //#region Form control properties
    get FirstName() {
      return this.form.get('firstName');
    }

    get LastName() {
      return this.form.get('lastName');
    }

    get Username() {
      return this.form.get('username');
    }

    get PhoneNumber() {
      return this.form.get('phoneNumber');
    }

    get Country() {
      return this.form.get('country');
    }

    get ZipCode() {
      return this.form.get('zipCode');
    }

    get City() {
      return this.form.get('city');
    }

    get Street() {
      return this.form.get('street');
    }

    get PasswordGroup() {
      return this.form.get('passwordGroup');
    }

    get Password() {
      return this.form.get('passwordGroup.password');
    }

    get ConfirmPassword() {
      return this.form.get('passwordGroup.confirmPassword');
    }
  //#endregion

  // the sign up method
  signUp() {
    let newUser: any = {
      FirstName: this.FirstName.value,
      LastName: this.LastName.value,
      Username: this.Username.value,
      PhoneNumber: '(+36) ' + this.PhoneNumber.value,
      Street: this.Street.value,
      City: this.City.value,
      ZipCode: this.ZipCode.value,
      Country: this.Country.value,
      Password: this.Password.value,
      ConfirmPassword: this.ConfirmPassword.value,
      Role: 'Partner'
    };

    this.isLoading = true;
    this.authService.register(newUser)
      .subscribe(user => {
        this.alertService.success('Registration was successful!');
        this.router.navigate(['/login']);
        this.isLoading = false;
      }, (error: AppError) => {
        // if input validation fails, alert errors
        if (error instanceof BadInput) {
          this.alertService.error(
            'Password must contain uppercase and lowercase letters, and at least one digit!');
          this.isLoading = false;
        } else throw error; // throw error back to AppErrorHandler
      });
  }

}
