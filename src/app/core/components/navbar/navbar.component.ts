import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../../membership/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isAriaExpanded: boolean = false;
  togglerClass: string = 'navbar-toggler collapsed';
  menuClass: string = 'collapse navbar-collapse';

  constructor(
    private authService: AuthService,
    private router: Router) {}

  // toggles the navigation icon button
  toggleNavbarIcon() {
    this.isAriaExpanded = !this.isAriaExpanded;
    this.togglerClass = (this.isAriaExpanded) 
      ? 'navbar-toggler' : 'navbar-toggler collapsed';
    this.menuClass = (this.isAriaExpanded)
      ? 'collapse navbar-collapse show' : 'collapse navbar-collapse';
  }

  // logout method
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // is user logged in public property
  get IsUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
