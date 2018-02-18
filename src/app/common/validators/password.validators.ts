import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
    // validates whether the password and password again controls match
    static passwordsDoNotMatch(control: AbstractControl): ValidationErrors | null {
        return (((control.get('password').value !== '') &&
                    (control.get('confirmPassword').value !== '')) &&
                (control.get('password').value !== control.get('confirmPassword').value))
            ? { passwordsDoNotMatch: true } : null;
    }
}
