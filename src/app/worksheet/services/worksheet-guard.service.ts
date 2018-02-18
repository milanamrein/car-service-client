import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { WorksheetDTO } from './../../shared/models/worksheet';
import { WorksheetService } from './../../shared/services/worksheet.service';

@Injectable()
export class WorksheetGuardService implements CanActivate {

  constructor(
    private router: Router,
    private worksheetService: WorksheetService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | Observable<boolean> | Promise<boolean> {
      return this.worksheetService.get(route.paramMap.get('id'))
        .map(
          (worksheet) => {
            if (this.worksheetService.currentUser.Id === worksheet.partner.id) 
              return true;

            this.router.navigate(['/']);
            return false;
          },
          (error) => { throw error; });
  }

}
