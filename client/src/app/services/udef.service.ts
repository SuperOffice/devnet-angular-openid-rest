import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Claims } from '../model';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UdefType, UserDefinedField } from '../model';
import { SoBaseService } from './sobase.service';

@Injectable()
export class UdefService extends SoBaseService {

  constructor(private injector: Injector) {
    super('Udef', injector);
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
}
