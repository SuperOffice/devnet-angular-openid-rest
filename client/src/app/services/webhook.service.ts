import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IWebHook, Source, EventType, EventSource, Claims, EventDefinition, SourceDefinition } from '../model';
import { SoBaseService } from './sobase.service';

@Injectable()
export class WebhookService extends SoBaseService {

  constructor(private injector: Injector) {
    super('Webhook', injector);
  }

  getAllWebhooks(): Observable<IWebHook[]> {
    return this.http
      .get<IWebHook[]>(this.claims.webapi_url + '/Webhook', this.options)
      .catch(this.onError);
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
      this.getEventDefinition('SaleStakeholder', Source.SALESTAKEHOLDER)
    ];
  }

  getEventDefinition(eventName: string, eventType: Source): EventSource {

    return {
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
  }
}
