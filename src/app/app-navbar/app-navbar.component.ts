import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin() {
    this.authService.startAuthentication();
  }

  onSignout() {
    const out = true;
  }

  get givenName() {
    const claims = null;
    if (!claims) {
      return null;
    }
    return claims['firstname'];
  }

}
