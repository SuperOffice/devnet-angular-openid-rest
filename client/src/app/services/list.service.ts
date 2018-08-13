import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Claims } from '../model';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SoBaseService } from './sobase.service';

@Injectable()
export class ListService extends SoBaseService {

  constructor(private injector: Injector) {
    super('List', injector);
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
}
