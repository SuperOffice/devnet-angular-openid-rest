import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Person } from '../person/person.interface';
import { SoBaseService } from './sobase.service';

// import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class PersonService extends SoBaseService {

  private queryMyPerson = {
    'ProviderName': 'Person',
    'Columns': 'personId',
    'Restrictions': 'personAssociate/associateDbId = placeholder',
    'Entities': 'person',
    'Page': 0,
    'PageSize': 1
  };

  constructor(injector: Injector) {
     super('Person', injector);
   }

   getMyPerson(): Observable<any> {
    this.queryMyPerson.Restrictions =
      this.queryMyPerson.Restrictions.replace('placeholder',
      this.claims.associateid.toString());

    return this.http.post<any>(
      this.claims.webapi_url + '/Agents/Archive/GetArchiveListByColumns2',
      this.queryMyPerson, this.options).catch(this.onError);
   }

   getPerson(personId): Observable<Person> {
     return this.get<Person>(personId);
   }

   savePerson(person) {
     return this.save(person);
   }

   deletePerson(personId) {
    return this.delete(personId);
   }

   getAllPerson(contactId): Observable<any> {

    let query = this.claims.webapi_url + '/Contact/' + contactId + '/Persons';
    query += '?$select=personId,firstName,middleName,lastName,contactId,title,birthdate,';
    query += 'portraitThumbnail,phone/formattedNumber,email/emailAddress';

      return this.http.get(query, this.options)
      .catch(this.onError);
   }

   getAllAssociates(): Observable<any> {

    const query = this.claims.webapi_url + '/Archive/InternalUsers?$select=associateDbId,fullName';
    // query += '?$select=personId,firstName,middleName,lastName,contactId,title,birthdate,';
    // query += 'portraitThumbnail,phone/formattedNumber,email/emailAddress';

      return this.http.get(query, this.options)
      .catch(this.onError);
   }
}
