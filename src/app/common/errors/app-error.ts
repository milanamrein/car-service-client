import { Error } from 'tslint/lib/error';

// general service error
export class AppError {
    constructor(public originalError?: any) {}
}
