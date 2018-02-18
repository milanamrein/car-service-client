import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './services/auth.service';
import { UnAuthGuard } from './services/un-auth-guard.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    AuthService,
    UnAuthGuard
  ]
})
export class MembershipModule { }
