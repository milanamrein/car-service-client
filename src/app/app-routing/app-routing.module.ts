import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../membership/components/login/login.component';
import { SignupComponent } from './../membership/components/signup/signup.component';
import { UnAuthGuard } from './../membership/services/un-auth-guard.service';
import { HomeComponent } from './../reservation/components/home/home.component';
import { ReservationsListComponent } from './../reservation/components/reservations-list/reservations-list.component';
import { AuthGuard } from './../shared/services/auth-guard.service';
import { WorksheetDetailsComponent } from './../worksheet/components/worksheet-details/worksheet-details.component';
import { WorksheetGuardService } from './../worksheet/services/worksheet-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [UnAuthGuard]    
  },
  
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservations',
    component: ReservationsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'worksheet/:id',
    component: WorksheetDetailsComponent,
    canActivate: [AuthGuard, WorksheetGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
