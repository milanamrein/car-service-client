import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MembershipModule } from './membership/membership.module';
import { ReservationModule } from './reservation/reservation.module';
import { SharedModule } from './shared/shared.module';
import { WorksheetModule } from './worksheet/worksheet.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [   
    AppRoutingModule, 
    SharedModule,
    CoreModule,
    MembershipModule,
    ReservationModule,
    WorksheetModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.url]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
