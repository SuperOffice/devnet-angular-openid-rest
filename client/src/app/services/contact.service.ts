
import {catchError} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../contact/contact.interface';


import { SoBaseService } from './sobase.service';

@Injectable()
export class ContactService extends SoBaseService  {

  contacts: any = {};

  constructor(injector: Injector) {
    super('Contact', injector);
   }

  createContact(): Observable<Contact> {
    return this.get<Contact>(0);
  }

  getMyContact(): Observable<Contact> {
    return this.http.post<Contact>(
      this.claims.webapi_url + '/Agents/Contact/GetMyContact',
      '', this.options).pipe(catchError(this.onError));
  }

  getContacts(): Observable<any> {
    return this.http.get<any>(
      this.claims.webapi_url + '/Contact?$select=name', this.options).pipe(catchError(this.onError));
  }

  getContact(id): Observable<Contact> {
   return this.get<Contact>(id);
  }

  saveContact(contact): Observable<Contact> {
    return this.save(contact);
  }

  deleteContact(contactId) {
    return this.delete(contactId);
  }
}
