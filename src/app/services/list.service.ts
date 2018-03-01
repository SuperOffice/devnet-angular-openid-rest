import { Injectable } from '@angular/core';
import { AuthService, Claims } from '../services/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ListService {

  private claims: Claims;
  private options;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.options = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getAuthorizationHeaderValue(),
        'Accept-Language': 'US'
      }),
    };

    this.claims = this.authService.getClaims();
  }

  getBusinessList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/Business/Items', this.options).catch(this.onError);
  }

  getCategoryList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/Category/Items', this.options).catch(this.onError);
  }

  getCountryList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/Country/Items', this.options).catch(this.onError);
  }

  getProjectTypeList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/ProjectType/Items', this.options).catch(this.onError);
  }

  getProjectStatusList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/ProjectStatus/Items', this.options).catch(this.onError);
  }

  getSaleTypeList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/SaleType/Items', this.options).catch(this.onError);
  }

  getDocTemplateList(): Observable<any> {
    return this.http.get(this.claims.webapi_url + '/List/DocumentTemplate/Items', this.options).catch(this.onError);
  }

  onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
