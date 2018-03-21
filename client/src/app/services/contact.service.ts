import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Claims } from '../model';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../contact/contact.interface';
import { HttpResponse } from 'selenium-webdriver/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ContactService {

  private claims: Claims;
  private options;
  contacts: any = {};

  constructor(private http: HttpClient, private authService: AuthService) {
    this.options = {
      headers: new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() })
    };

    this.claims = this.authService.getClaims();
   }

  createContact(): Observable<Contact> {
    return this.http.get<Contact>(
      this.claims.webapi_url + '/Contact/default', this.options)
    .catch(this.onError);
  }

  getMyContact(): Observable<Contact> {
    return this.http.post<Contact>(
      this.claims.webapi_url + '/Agents/Contact/GetMyContact',
      '', this.options).catch(this.onError);
  }

  getContacts(): Observable<any> {
    return this.http.get<any>(
      this.claims.webapi_url + '/Contact?$select=name', this.options).catch(this.onError);
  }

  getContact(id) {
    return this.http.get<Contact>(
      this.claims.webapi_url + '/Contact/' + id, this.options)
    .catch(this.onError);
  }

  saveContact(contact) {
    return this.http.put(this.claims.webapi_url + '/Contact/' + contact.ContactId,
      contact,
      this.options)
      .catch(this.onError);
  }

  deleteContact(contactId) {
    return this.http.delete(this.claims.webapi_url + '/Contact/' + contactId, this.options).catch(this.onError);
  }

  onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
