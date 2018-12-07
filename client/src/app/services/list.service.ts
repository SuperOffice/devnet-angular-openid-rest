
import {catchError} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Claims } from '../model';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


import { SoBaseService } from './sobase.service';

@Injectable()
export class ListService extends SoBaseService {

  constructor(private injector: Injector) {
    super('List', injector);
  }

  getBusinessList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/Business/Items', this.options).pipe(catchError(this.onError));
  }

  getCategoryList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/Category/Items', this.options).pipe(catchError(this.onError));
  }

  getCountryList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/Country/Items', this.options).pipe(catchError(this.onError));
  }

  getProjectTypeList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/ProjectType/Items', this.options).pipe(catchError(this.onError));
  }

  getProjectStatusList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/ProjectStatus/Items', this.options).pipe(catchError(this.onError));
  }

  getSaleTypeList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/SaleType/Items', this.options).pipe(catchError(this.onError));
  }

  getDocTemplateList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/DocumentTemplate/Items', this.options).pipe(catchError(this.onError));
  }
}
