import { Component, OnInit } from '@angular/core';
import { Source } from '../model/source';

import { WebhookSocketService } from '../services/webhooksocket.service';
import { WebhookService } from '../services/webhook.service';
import { IWebHook, EventSource, Event, WebhookPayload } from '../model'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToasterContainerComponent, ToasterService } from 'angular5-toaster';


@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.css']
})
export class WebhookComponent implements OnInit {

  messageContent: string;
  ioConnection: any;
  errorMessage: string;
  messages: WebhookPayload[] = [];

  webhooks: IWebHook[] = [];

  constructor(private webSocket: WebhookSocketService, private webhookSvc: WebhookService /*, private toasterSvc: ToasterService */) { }

  ngOnInit() {
    // uncomment this line to test receiving webhooks
    // requires having web server to connect to via websockets
    // web server settings in \services\webhooksocket.service.ts
    this.initIoConnection();

    this.webhookSvc.getAllWebhooks()
    .subscribe( webhookData => {
        this.webhooks = webhookData;
    }, error => {
      this.errorMessage = error;
    });
  }

  private initIoConnection(): void {
    this.webSocket.initSocket();

    this.ioConnection = this.webSocket.onMessage()
      .subscribe((webhook: WebhookPayload) => {
        this.messages.push(webhook);
        //this.toasterSvc.clear();
        //this.toasterSvc.pop('info', webhook.WebhookName + ' Arrived!', 'Event: ' + webhook.Event + '\n\nChanges: \n' + webhook.Changes);
      });

    this.webSocket.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.webSocket.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

}
