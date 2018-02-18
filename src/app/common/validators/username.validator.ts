import { AuthService } from 'app/membership/services/auth.service';
import { AppError } from './../errors/app-error';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class UsernameValidators {

    // injecting AuthService
    constructor(private service: AuthService) { }

    // validates whether the username already exists
    shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            if (control.value)
                this.service.isExists(control.value)
                    .subscribe(argIsExists => {
                        if (argIsExists)
                            resolve({ shouldBeUnique: true });
                        else
                            resolve(null);
                    }, (error: AppError) => { throw error; });
        });
    }
}
