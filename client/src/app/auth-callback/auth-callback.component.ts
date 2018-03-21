import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authService.completeAuthentication();
  }

}
