export class WebhookPayload {
  public readonly EventId: string;
  public readonly Timestamp: string;
  public readonly Changes: string[] | null;
  public readonly Event: string;
  public readonly PrimaryKey: number;
  public readonly Entity: string;
  public readonly ContextIdentifier: string;
  public readonly ChangedByAssociateId: number;
  public readonly WebhookName: string;

  private constructor(d: any) {
    this.EventId = d.EventId;
    this.Timestamp = d.Timestamp;
    this.Changes = d.Changes;
    this.Event = d.Event;
    this.PrimaryKey = d.PrimaryKey;
    this.Entity = d.Entity;
    this.ContextIdentifier = d.ContextIdentifier;
    this.ChangedByAssociateId = d.ChangedByAssociateId;
    this.WebhookName = d.WebhookName;
  }
}

