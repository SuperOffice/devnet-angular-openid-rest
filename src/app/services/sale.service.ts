import { Injectable } from '@angular/core';
import { AuthService, Claims } from '../services/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SaleService {

  private claims: Claims;
  private options;

  private queryAllSales = {
    'ProviderName': 'FindSale',
    'Columns': 'saleId, heading, description',
    'Restrictions': 'saleId > 0',
    'Entities': 'sale',
    'Page': 0,
    'PageSize': 20
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.options = {
      headers: new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() })
    };

    this.claims = this.authService.getClaims();
   }

   getAllSales(): Observable<any> {
    return this.http.post<any>(
      this.claims.webapi_url + '/Agents/Archive/GetArchiveListByColumns2',
      this.queryAllSales, this.options).catch(this.onError);
  }

   /** Gets or creates a sale depended on saleId. 0 will create a new sale */
   getSale(saleId): Observable<any> {
    if (saleId === 0) {
      return this.http.get<any>(this.claims.webapi_url + '/Sale/default', this.options)
      .catch(this.onError);
     } else {
      return this.http.get<any>(this.claims.webapi_url + '/Sale/' + saleId, this.options)
      .catch(this.onError);
     }
  }

  deleteSale(saleId) {
    return this.http.delete(this.claims.webapi_url + '/Sale/' + saleId, this.options)
    .catch(this.onError);
  }

  saveSale(sale) {
    if (sale.SaleId > 0) {
      return this.http.put<any>(this.claims.webapi_url + '/Sale/' + sale.SaleId, sale,
       this.options)
       .catch(this.onError);
     } else {
       return this.http.post<any>(this.claims.webapi_url + '/Sale', sale,
       this.options)
      .catch(this.onError);
     }
  }

  onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
