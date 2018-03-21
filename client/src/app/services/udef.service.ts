import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Claims } from '../model';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UdefType, UserDefinedField } from '../model'

@Injectable()
export class UdefService {

  private claims: Claims;
  private options;


  constructor(private authService: AuthService, private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() })
    };

    this.claims = this.authService.getClaims();
   }

   getAllUdefFields(entityName: string): Observable<any> {
    return this.http.get(`${this.claims.webapi_url}/${entityName}/UdefLayout/Published/`, this.options);
   }

   getAllContactUdefFields(): Observable<any> {
    return this.getAllUdefFields('Contact');
   }

   getAllProjectUdefFields() {
    return this.getAllUdefFields('Project');
   }

   getAllSaleUdefFields() {
    return this.getAllUdefFields('Sale');
   }

   getAllDocumentUdefFields() {
    return this.getAllUdefFields('Document');
   }

   onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
