import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Router } from '@angular/router';
import { Claims } from '../model';

@Injectable()
export class AuthService {

  private manager = new UserManager(getSimpleClientSettings());
  private user: User = null;
  private returnUrl = '';

  claims: Claims;

  constructor(private router: Router) {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  setReturnUrl(url: string) {
    this.returnUrl = url;
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): Claims {

    if (this.claims) {
       return this.claims;
    }

    this.claims = new Claims();

    // tslint:disable-next-line:forin
    for (const key in this.user.profile) {

      if (key.endsWith('associateid')) {
        this.claims.associateid = this.user.profile[key];
      }

      if (key.endsWith('webapi_url')) {
        this.claims.webapi_url = this.user.profile[key] + 'v1';
      }

      if (key.endsWith('ctx')) {
        this.claims.ctx = this.user.profile[key];
      }

      if (key.endsWith('email')) {
        this.claims.email = this.user.profile[key];
      }

      if (key.endsWith('firstname')) {
        this.claims.firstname = this.user.profile[key];
      }

      if (key.endsWith('lastname')) {
        this.claims.lastname = this.user.profile[key];
      }

      if (key.endsWith('netserver_url')) {
        this.claims.netserver_url = this.user.profile[key];
      }

      if (key.endsWith('serial')) {
        this.claims.serial = this.user.profile[key];
      }

      if (key.endsWith('system_user')) {
        this.claims.serial = this.user.profile[key];
      }
    }
    return this.claims;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    const url = decodeURIComponent(window.location.toString());
    return this.manager.signinRedirectCallback(url)
      .then(user => {
        this.user = user;
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        }
      });
  }
}

export function getSimpleClientSettings(): UserManagerSettings {
  return {
    authority: 'https://sod.superoffice.com/login',
    client_id: 'db1834037c58c02b6bd9898feef19845',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid',
    filterProtocolClaims: true,
    loadUserInfo: false,
  };
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://sod.superoffice.com/login',
    client_id: 'db1834037c58c02b6bd9898feef19845',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid',
    filterProtocolClaims: true,
    loadUserInfo: false,
    metadata:
      {
        issuer: 'https://sod.superoffice.com',
        authorization_endpoint: 'https://sod.superoffice.com/login/common/oauth/authorize',
        token_endpoint: 'https://sod.superoffice.com/login/common/oauth/tokens',
        jwks_uri: 'https://sod.superoffice.com/login/.well-known/jwks',
      },
    signingKeys: [
      {
        'kty': 'RSA',
        'use': 'sig',
        'kid': 'Frf7jD-asGiFqADGTmTJfEq16Yw',
        'x5t': 'Frf7jD-asGiFqADGTmTJfEq16Yw',
        // tslint:disable-next-line:max-line-length
        'x5c': ['MIIDrTCCApUCAQowDQYJKoZIhvcNAQEFBQAwgZQxCzAJBgNVBAYTAk5PMQ0wCwYDVQQIDARPc2xvMQ0wCwYDVQQHDARPc2xvMRcwFQYDVQQKDA5TdXBlck9mZmljZSBBUzEqMCgGA1UEAwwhU3VwZXJPZmZpY2UgT25saW5lIERldmVsb3BtZW50IENBMSIwIAYJKoZIhvcNAQkBFhNzZGtAc3VwZXJvZmZpY2UuY29tMCAXDTEzMDkwMzExNDIyN1oYDzIxMTMwODEwMTE0MjI3WjCBoTELMAkGA1UEBhMCTk8xDTALBgNVBAgMBE9zbG8xDTALBgNVBAcMBE9zbG8xFzAVBgNVBAoMDlN1cGVyT2ZmaWNlIEFTMTcwNQYDVQQDDC5TdXBlck9mZmljZSBPbmxpbmUgRGV2ZWxvcG1lbnQgRmVkZXJhdGVkIExvZ2luMSIwIAYJKoZIhvcNAQkBFhNzZGtAc3VwZXJvZmZpY2UuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsY6PrEDYl7VuiTaFDCnTKYwcqq2y5J/vttZWf8QCV9oOXsI77lhCqO71SavHaoRQe3gkXsWIbgpv3hwmYyDiOiqf6XdJxVarmrvvjmXDQDl9mgUZ4visDhxNPFyWjsMiLQpVUlpO73ASy7+F/cuBCTQ4g9YDX7YBh94WL+EvA9ciB6ZtRsRS945ezrDMq8Q38RjpemXekc7ObwPXOX7PzFkGcdMWLHNm6Ktj2OFIqkuJYBRmOr85IlKcuek4x0LeVDj24Min/HG+4MqVpvDzF4m2Ib5AgFI3Akl9p7Z+dCSq6KTphu8hO/LmW+E93kz6weG7dZxt7otFps0j09py+QIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQCrx88qTpQlM27TPd3i/qHt182+Gy40klx2l9ho1PW8EZqKJTZQD4+guHGLrMzYLTl0rDWcqbjVbYjZKw6xoSGAFOlKjoBCZqkiVhFyiOeXYpg4F3rNCau944nNkLr+XJ+84B8ieruGDDcf0gCN33WXmIvG69I4PmLJB9RbdVaTvmPdwonPiIZ0+i60L9w8IW8pL4EM7upIiRkpBrHMhHJr/DhmDV+P+nO8GuyYKXmgbkeTtVvskwRbO6j/USEjTFdCcAj0WHpKYAKxvgqpdfZsdfo2JAnnuv83BbuAkYxZWPip7kEMcNEPGpLp7CBr58g5JlvWr1pSsm0NNXEER3E2']
      }
    ]
  };
}
