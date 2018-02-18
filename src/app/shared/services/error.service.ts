import { AppError } from '../../common/errors/app-error';
import { NotFound } from '../../common/errors/not-found-error';
import { Unauthorized } from '../../common/errors/unauthorized';
import { BadInput } from '../../common/errors/bad-input';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  handleError(error: Response) {
    switch (error.status) {
      case 400: return Observable.throw(new BadInput(error));
      case 401: return Observable.throw(new Unauthorized());
      case 404: return Observable.throw(new NotFound());
      default: return Observable.throw(new AppError(error));
    }
  }

}
