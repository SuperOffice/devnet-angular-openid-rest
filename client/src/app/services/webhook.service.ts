
import {catchError} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IWebHook, Source, EventType, EventSource, Claims, EventDefinition, SourceDefinition } from '../model';
import { SoBaseService } from './sobase.service';

@Injectable()
export class WebhookService extends SoBaseService {

  constructor(private injector: Injector) {
    super('Webhook', injector);
  }

  getAllWebhooks(): Observable<IWebHook[]> {
    return this.http
      .get<IWebHook[]>(this.claims.webapi_url + '/Webhook', this.options).pipe(
      catchError(this.onError));
  }

  getWebhook(webhookId: number): Observable<IWebHook> {
    return this.get(webhookId);
  }

  saveWebhook(webhook): Observable<IWebHook> {
    return this.save(webhook);
  }

  deleteWebhook(webHookId) {
    return this.delete(webHookId);
  }

  getWebHookEventSources(): EventSource[] {
    return [
      this.getEventDefinition('Appointment', Source.APPOINTMENT),
      this.getEventDefinition('Associate', Source.ASSOCIATE),
      this.getEventDefinition('Contact', Source.CONTACT),
      this.getEventDefinition('Person', Source.PERSON),
      this.getEventDefinition('Project', Source.PROJECT),
      this.getEventDefinition('ProjectMember', Source.PROJECTMEMBER),
      this.getEventDefinition('Sale', Source.SALE),
      this.getEventDefinition('SaleStakeholder', Source.SALESTAKEHOLDER),
      this.getEventDefinition('Document', Source.DOCUMENT)
    ];
  }

  getEventDefinition(eventName: string, eventType: Source): EventSource {

    let result = {
      sourceDefinition: { sourceType: eventType, name: eventName },
      eventDefinition: [
        {
          name: 'Created',
          eventType: EventType.CREATED,
          selected: false
        },
        {
          name: 'Changed',
          eventType: EventType.CHANGED,
          selected: false
        },
        {
          name: 'Deleted',
          eventType: EventType.DELECTED,
          selected: false
        }
      ]
    };

    switch (eventType) {
      case Source.APPOINTMENT:
      case Source.ASSOCIATE:
      case Source.CONTACT:
      case Source.PROJECT:
      case Source.PROJECTMEMBER:
      case Source.SALESTAKEHOLDER:
        return result;
      case Source.DOCUMENT:
        result['eventDefinition'].push({name: 'Edited', eventType: EventType.EDITED, selected: false});
        return result;
      case Source.PERSON:
        result['eventDefinition'].push({name: 'Consented', eventType: EventType.CONSENTED, selected: false});
        result['eventDefinition'].push({name: 'Unconsented', eventType: EventType.UNCONSENTED, selected: false});
        return result;
      case Source.SALE:
        result['eventDefinition'].push({name: 'Completed', eventType: EventType.COMPLETED, selected: false});
        result['eventDefinition'].push({name: 'Sold', eventType: EventType.SOLD, selected: false});
        result['eventDefinition'].push({name: 'Lost', eventType: EventType.LOST, selected: false});
        return result;
      default:
        return result;
    }
  }
}
