import { Component, OnInit } from "@angular/core";
import { Source } from "../model/source";

import { WebhookSocketService } from "../services/webhooksocket.service";
import { WebhookService } from "../services/webhook.service";
import { IWebHook, EventSource, Event, WebhookPayload } from "../model";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { ToasterContainerComponent, ToasterService } from 'angular5-toaster';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-webhook",
  templateUrl: "./webhook.component.html",
  styleUrls: ["./webhook.component.css"]
})
export class WebhookComponent implements OnInit {
  messageContent: string;
  ioConnection: any;
  errorMessage: string;
  messages: WebhookPayload[] = [];

  webhooks: IWebHook[] = [];

  constructor(
    private webSocket: WebhookSocketService,
    private webhookSvc: WebhookService,
    private toastrSvc: ToastrService
  ) {}

  ngOnInit() {
    // uncomment this line to test receiving webhooks
    // requires having web server to connect to via websockets
    // web server settings in \services\webhooksocket.service.ts
    this.initIoConnection();

    this.webhookSvc.getAllWebhooks().subscribe(
      webhookData => {
        this.webhooks = webhookData;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  private initIoConnection(): void {
    this.webSocket.initSocket();

    this.ioConnection = this.webSocket
      .onMessage()
      .subscribe((webhook: WebhookPayload) => {
        this.messages.push(webhook);
        this.toastrSvc.clear();
        this.toastrSvc.show(
          "Event: " + webhook.Event + "\n\nChanges: \n" + webhook.Changes,
          webhook.WebhookName + " Arrived"
        );
      });

    this.webSocket.onEvent(Event.CONNECT).subscribe(() => {
      console.log("connected");
    });

    this.webSocket.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("disconnected");
    });
  }
}
