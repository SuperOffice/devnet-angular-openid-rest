import { Injectable } from '@angular/core';
import { AuthService, Claims } from '../services/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UdefService {

  private claims: Claims;
  private options;

  public fieldDataTypes = {
    1 : 'number',
    2 : 'shortText',
    3 : 'longText',
    4 : 'date',
    5 : 'unlimitedDate',
    6 : 'checkbox',
    7 : 'list',
    8 : 'decimal'
  };

  public fieldDataTypesByType = {
    'number'       : 1,
    'shortText'    : 2,
    'longText'     : 3,
    'date'         : 4,
    'unlimitedDate': 5,
    'checkbox'     : 6,
    'list'         : 7,
    'decimal'      : 8
    };

  constructor(private authService: AuthService, private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() })
    };

    this.claims = this.authService.getClaims();
   }

   getAllContactUdefFields() {
    return this.http.get(this.claims.webapi_url + '/Contact/UdefLayout/Published/', this.options);
   }

   getAllProjectUdefFields() {
    return this.http.get(this.claims.webapi_url + '/Project/UdefLayout/Published/', this.options);
   }

   getAllSaleUdefFields() {
    return this.http.get(this.claims.webapi_url + '/Sale/UdefLayout/Published/', this.options);
   }

   getAllDocumentUdefFields() {
    return this.http.get(this.claims.webapi_url + '/Document/UdefLayout/Published/', this.options);
   }

   onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
