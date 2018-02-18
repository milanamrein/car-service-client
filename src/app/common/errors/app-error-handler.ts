import { AlertService } from '../../shared/services/alert.service';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

// class that handles all unexpected errors
@Injectable()
export class AppErrorHandler implements ErrorHandler {

    // injecting AlertService using Injector to prevent cyclic dependencies
    private alertService: AlertService;
    constructor(injector: Injector) {
        setTimeout(() => this.alertService = injector.get(AlertService));
    }

    handleError(error: any): void {
        if (error.originalError.message)
            this.alertService.warning('An unexpected error has occured: '
                + error.originalError.message + '. Please try again later...');
        else
            this.alertService.warning('An unexpected error has occured: '
                + error.originalError + '. Please try again later...');
    }
}
