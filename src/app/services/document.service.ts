import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Claims } from '../model';

@Injectable()
export class DocumentService {

  private claims: Claims;
  private options;

  private queryAllDocuments = {
    'ProviderName': 'FindDocument',
    'Columns': 'documentId,text,document/description',
    'Restrictions': 'documentId > 0',
    'Entities': 'document',
    'Page': 0,
    'PageSize': 20
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.options = {
      headers: new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() })
    };

    this.claims = this.authService.getClaims();
   }


  getAllDocuments(): Observable<any> {
    return this.http.post<any>(
      this.claims.webapi_url + '/Agents/Archive/GetArchiveListByColumns2',
      this.queryAllDocuments, this.options).catch(this.onError);
  }

  getDocument(documentId): Observable<any> {
    if (documentId === 0) {
      return this.http.get<any>(this.claims.webapi_url + '/Document/default', this.options)
      .catch(this.onError);
     } else {
      return this.http.get<any>(this.claims.webapi_url + '/Document/' + documentId, this.options)
      .catch(this.onError);
     }
  }

  onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
