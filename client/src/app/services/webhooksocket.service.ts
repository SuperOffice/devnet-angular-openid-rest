import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import * as socketIo from "socket.io-client";

import { Event } from "../model/event";
import { WebhookPayload } from '../model/webhookpayload'

@Injectable()
export class WebhookSocketService {
  private LOCAL_SERVER_URL = "http://localhost:3000";

  constructor() {}

  private socket;

  public initSocket(): void {
    this.socket = socketIo(this.LOCAL_SERVER_URL);
  }

  public onMessage(): Observable<WebhookPayload> {
    return new Observable<WebhookPayload>(observer => {
      this.socket.on("webhook", (data: WebhookPayload) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
