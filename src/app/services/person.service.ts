import { Injectable } from '@angular/core';
import { AuthService, Claims } from '../services/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Person } from '../person/person.interface';

@Injectable()
export class PersonService {

  private queryMyPerson = {
    'ProviderName': 'Person',
    'Columns': 'personId',
    'Restrictions': 'personAssociate/associateDbId = placeholder',
    'Entities': 'person',
    'Page': 0,
    'PageSize': 1
  };

  private claims: Claims;
  private options;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() })
    };

    this.claims = this.authService.getClaims();
   }

   getMyPerson(): Observable<any> {
    this.queryMyPerson.Restrictions =
      this.queryMyPerson.Restrictions.replace('placeholder',
      this.authService.claims.associateid.toString());

    return this.http.post<any>(
      this.claims.webapi_url + '/Agents/Archive/GetArchiveListByColumns2',
      this.queryMyPerson, this.options).catch(this.onError);
   }

   getPerson(personId): Observable<Person> {
     if (personId === 0) {
      return this.http.get<Person>(this.claims.webapi_url + '/Person/default', this.options)
      .catch(this.onError);
     } else {
      return this.http.get<Person>(this.claims.webapi_url + '/Person/' + personId, this.options)
      .catch(this.onError);
     }
   }

   savePerson(person) {
     if (person.PersonId > 0) {
      return this.http.put<Person>(this.claims.webapi_url + '/Person/' + person.PersonId, person,
       this.options)
       .catch(this.onError);
     } else {
       return this.http.post<Person>(this.claims.webapi_url + '/Person', person,
       this.options)
      .catch(this.onError);
     }
   }

   deletePerson(personId) {
    return this.http.delete(this.claims.webapi_url + '/Person/' + personId, this.options)
    .catch(this.onError);
   }

   getAllPerson(contactId): Observable<any> {

    let query = this.claims.webapi_url + '/Contact/' + contactId + '/Persons';
    query += '?$select=personId,firstName,middleName,lastName,contactId,title,birthdate,';
    query += 'portraitThumbnail,phone/formattedNumber,email/emailAddress';

      return this.http.get(query, this.options)
      .catch(this.onError);
   }

   getAllAssociates(): Observable<any> {

    let query = this.claims.webapi_url + '/Archive/InternalUsers?$select=associateDbId,fullName';
    // query += '?$select=personId,firstName,middleName,lastName,contactId,title,birthdate,';
    // query += 'portraitThumbnail,phone/formattedNumber,email/emailAddress';

      return this.http.get(query, this.options)
      .catch(this.onError);
   }

   onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
