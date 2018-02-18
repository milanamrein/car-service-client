import { NavigationStart, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// declaring AlertifyJS
declare let alertify: any;

/**
 * Service for sending different types of notifications
 */
@Injectable()
export class AlertService {

  constructor() {}

  // creates an info notification
  info(message: string) {
    alertify.message(message);
  }

  // creates a success notification
  success(message: string) {
    alertify.success(message);
  }

  // creates a warning notification
  warning(message: string) {
    alertify.warning(message);
  }

  // creates an error notification
  error(message: string) {
    alertify.error(message);    
  }

}
