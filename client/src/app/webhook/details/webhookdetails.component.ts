import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { WebhookService } from "../../services/webhook.service";
import { IWebHook,  EventType, Source, EventSource } from "../../model";


@Component({
  selector: "app-webhookdetails",
  templateUrl: "./webhookdetails.component.html",
  styleUrls: ["./webhookdetails.component.css"]
})
export class WebhookDetailsComponent implements OnInit {
  public errorMessage: string;
  public selectedWebhookId: number;
  public selectedWebhook: IWebHook;
  public eventTypes = EventType;
  public sources = Source;

  public eventSources: EventSource[] = [];
  private testing: boolean = false;

  constructor(
    private webhookSvc: WebhookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const webhookId = this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedWebhookId = Number(params.get('id'));

      if (this.selectedWebhookId > 0) {
        this.webhookSvc
          .getWebhook(this.selectedWebhookId)
          .subscribe(webhook => {
            this.selectedWebhook = webhook;
            this.populateEventSources();
          });
      } else {
        this.webhookSvc.getWebhook(0).subscribe(webhook => {
          this.selectedWebhook = webhook;
          this.populateEventSources();
        });
      }
    });
  }

  /** Loops over webhook events and populates eventSources collection. */
  populateEventSources() {
    this.eventSources = this.webhookSvc.getWebHookEventSources();

    const wh = this.selectedWebhook;

    for (let index = 0; index < wh.Events.length; index++) {
      // get the entity and event type as array
      const whEvent = wh.Events[index].split(".");

      for (let j = 0; j < this.eventSources.length; j++) {
        let eventListing = this.eventSources[j];

        if (whEvent[0] == this.eventSources[j].sourceDefinition.sourceType.toString()) {
          for (let k = 0; k < this.eventSources[j].eventDefinition.length; k++) {
            const eventIndex = this.eventSources[j].eventDefinition[k];

            if (
              whEvent[1] == this.eventSources[j].eventDefinition[k].name.toLowerCase()
            ) {
              // found the correct event, lets set it...
              this.eventSources[j].eventDefinition[k].selected = true;
            }
          }
        }
      }
    }
  }

  saveWebhook() {
    // prepare list of events:
    const eventListing: string[] = [];
    this.eventSources.forEach(s => {
      s.eventDefinition.forEach(ev => {
        if (ev.selected) {
          eventListing.push(s.sourceDefinition.sourceType + "." + ev.name.toLowerCase());
        }
      });
    });

    this.selectedWebhook.Events = eventListing;

    this.webhookSvc.saveWebhook(this.selectedWebhook).subscribe(result => {
      this.goBack();
    });
  }

  deleteWebhook(webhookId) {
    this.webhookSvc.deleteWebhook(webhookId).subscribe(deleted => {
      // deleted should be null
      if(deleted) {
        // throw an exception.
      }

      this.goBack();
    });
  }

  goBack() {
    this.router.navigateByUrl("/webhook");
  }
}
