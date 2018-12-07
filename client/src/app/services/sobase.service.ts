
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Injector, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Claims } from '../model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import { Person } from '../person/person.interface';

@Injectable()
export class SoBaseService {

  protected claims: Claims;
  protected options: { headers: HttpHeaders };
  protected authService: AuthService;
  protected http: HttpClient;
  protected Name: String;
  private name: String;

  constructor(serviceName: String, injector: Injector) {
    // name of the service, usually the uri endpoint
    this.name = serviceName;
    this.authService = injector.get(AuthService);
    this.http = injector.get(HttpClient);
    this.Name = serviceName.charAt(0).toUpperCase() + serviceName.substring(1);

    // this.options = {
    //   headers: new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() })
    // };

    this.options = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getAuthorizationHeaderValue(),
        'Accept-Language': 'US'
      }),
    };


    this.claims = this.authService.getClaims();
   }

   get<T>(id): Observable<T> {
     //console.log('Options: ' + this.options);

     if (id === 0) {
      return this.http.get<T>(`${this.claims.webapi_url}/${this.Name}/default`, this.options).pipe(
      catchError(this.onError));
     } else {
      return this.http.get<T>(`${this.claims.webapi_url}/${this.Name}/${id}`, this.options).pipe(
      catchError(this.onError));
     }
   }

   save<T>(entity): Observable<T> {
     const id = entity[`${this.Name}Id`];
     if (id > 0) {
      return this.http.put<T>(`${this.claims.webapi_url}/${this.Name}/${id}`, entity,
       this.options).pipe(
       catchError(this.onError));
     } else {
       return this.http.post<T>(`${this.claims.webapi_url}/${this.Name}`, entity,
       this.options).pipe(
      catchError(this.onError));
     }
   }

   delete(id) {
    return this.http.delete(`${this.claims.webapi_url}/${this.Name}/${id}`, this.options).pipe(
    catchError(this.onError));
   }

   onError(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }

}
