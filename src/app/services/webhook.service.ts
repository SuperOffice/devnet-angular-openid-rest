import { Injectable } from "@angular/core";
import { AuthService, Claims } from "../services/auth.service";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Source } from "../model/source";
import { EventType } from "../model/eventtype";
import { IWebHook, EventSource } from "../model/webhook";

@Injectable()
export class WebhookService {

  private claims: Claims;
  private options;
  private testing: boolean = true;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAuthorizationHeaderValue()
      })
    };

    this.claims = this.authService.getClaims();
  }

  getAllWebhooks(): Observable<IWebHook[]> {
    return this.http
      .get<IWebHook[]>(this.claims.webapi_url + "/Webhook", this.options)
      .catch(this.onError);
  }

  getWebhook(webhookId: number): Observable<IWebHook> {

    if (webhookId === 0) {
      return this.http
        .get<IWebHook>(
          this.claims.webapi_url + "/Webhook/default",
          this.options
        )
        .catch(this.onError);
    } else {
      return this.http
        .get<IWebHook>(
          this.claims.webapi_url + "/Webhook/" + webhookId,
          this.options
        )
        .catch(this.onError);
    }
  }

  save(webhook: IWebHook): Observable<IWebHook> {
    if(webhook) {
      if (webhook.WebhookId > 0) {
        return this.http.put<IWebHook>(this.claims.webapi_url + '/Webhook/' + webhook.WebhookId, webhook,
         this.options)
         .catch(this.onError);
       } else {
         return this.http.post<IWebHook>(this.claims.webapi_url + '/Webhook', webhook,
         this.options)
        .catch(this.onError);
       }
    }
    return null;
  }

  deleteWebhook(webHookId) {
    return this.http.delete(this.claims.webapi_url + '/Webhook/' + webHookId, this.options)
    .catch(this.onError);
  }

  getWebHookEventSources(): EventSource[] {
    return [
      this.getEventDefinition("Appointment", Source.APPOINTMENT),
      this.getEventDefinition("Associate", Source.ASSOCIATE),
      this.getEventDefinition("Contact", Source.CONTACT),
      this.getEventDefinition("Person", Source.PERSON),
      this.getEventDefinition("Project", Source.PROJECT),
      this.getEventDefinition("ProjectMember", Source.PROJECTMEMBER),
      this.getEventDefinition("Sale", Source.SALE),
      this.getEventDefinition("SaleStakeholder", Source.SALESTAKEHOLDER)
    ];
  }

  getEventDefinition(eventName: string, eventType: Source): EventSource {
    return {
      source: { source: eventType, name: eventName },
      events: [
        {
          name: "Created",
          eventType: EventType.CREATED,
          selected: false
        },
        {
          name: "Changed",
          eventType: EventType.CHANGED,
          selected: false
        },
        {
          name: "Deleted",
          eventType: EventType.DELECTED,
          selected: false
        }
      ]
    };
  }

  onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getMockData2(): IWebHook[] {
    return [
      {
        WebhookId: 1,
        Name: "Monitor Contact",
        Events: ["contact.created", "contact.changed", "contact.deleted"],
        TargetUrl: "https://www.ngrok.com/someidentifier",
        Secret: "123-123-123-123",
        State: "Active",
        Type: "webhook",
        Headers: {},
        Properties: {},
        Registered: "2018-03-07T10:51:27.6188244+01:00",
        RegisteredAssociate: {
          TableRight: {
            Mask: "None",
            Reason: "sample string 1"
          },
          FieldProperties: {},
          AssociateId: 1,
          Name: "sample string 2",
          PersonId: 3,
          Rank: 4,
          Tooltip: "sample string 5",
          Type: "Unknown",
          GroupIdx: 6,
          FullName: "sample string 7",
          FormalName: "sample string 8",
          Deleted: true,
          EjUserId: 10
        },
        Updated: "2018-03-07T10:51:27.6188244+01:00",
        UpdatedAssociate: {
          TableRight: {
            Mask: "None",
            Reason: "sample string 1"
          },
          FieldProperties: {},
          AssociateId: 1,
          Name: "sample string 2",
          PersonId: 3,
          Rank: 4,
          Tooltip: "sample string 5",
          Type: "Unknown",
          GroupIdx: 6,
          FullName: "sample string 7",
          FormalName: "sample string 8",
          Deleted: true,
          EjUserId: 10
        }
      },
      {
        WebhookId: 1,
        Name: "Monitor Projects",
        Events: ["project.changed", "project.deleted"],
        TargetUrl: "https://www.ngrok.com/someidentifier",
        Secret: "123-123-123-123",
        State: "Active",
        Type: "webhook",
        Headers: {},
        Properties: {},
        Registered: "2018-03-07T10:51:27.6188244+01:00",
        RegisteredAssociate: {
          TableRight: {
            Mask: "None",
            Reason: "sample string 1"
          },
          FieldProperties: {},
          AssociateId: 1,
          Name: "sample string 2",
          PersonId: 3,
          Rank: 4,
          Tooltip: "sample string 5",
          Type: "Unknown",
          GroupIdx: 6,
          FullName: "sample string 7",
          FormalName: "sample string 8",
          Deleted: true,
          EjUserId: 10
        },
        Updated: "2018-03-07T10:51:27.6188244+01:00",
        UpdatedAssociate: {
          TableRight: {
            Mask: "None",
            Reason: "sample string 1"
          },
          FieldProperties: {},
          AssociateId: 1,
          Name: "sample string 2",
          PersonId: 3,
          Rank: 4,
          Tooltip: "sample string 5",
          Type: "Unknown",
          GroupIdx: 6,
          FullName: "sample string 7",
          FormalName: "sample string 8",
          Deleted: true,
          EjUserId: 10
        }
      }
    ];
  }
}
