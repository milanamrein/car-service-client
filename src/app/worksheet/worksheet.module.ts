import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WorksheetDetailsComponent } from './components/worksheet-details/worksheet-details.component';
import { WorksheetGuardService } from './services/worksheet-guard.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    WorksheetDetailsComponent
  ],
  providers: [
    WorksheetGuardService
  ]
})
export class WorksheetModule { }
