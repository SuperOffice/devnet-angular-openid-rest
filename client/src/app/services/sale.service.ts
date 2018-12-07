
import {catchError} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';


import { SoBaseService } from '../services/sobase.service';

// import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class SaleService extends SoBaseService {

  private queryAllSales = {
    'ProviderName': 'FindSale',
    'Columns': 'saleId, heading, description',
    'Restrictions': 'saleId > 0',
    'Entities': 'sale',
    'Page': 0,
    'PageSize': 20
  };

  constructor(private injector: Injector) {
    super('Sale', injector);
   }

   getAllSales(): Observable<any> {
    return this.http.post<any>(
      this.claims.webapi_url + '/Agents/Archive/GetArchiveListByColumns2',
      this.queryAllSales, this.options).pipe(catchError(this.onError));
  }

   /** Gets or creates a sale depended on saleId. 0 will create a new sale */
   getSale(saleId): Observable<any> {
    return this.get(saleId);
  }

  deleteSale(saleId) {
    return this.delete(saleId);
  }

  saveSale(sale) {
    return this.save(sale);
  }
}
