export interface WebhookPayload {
  EventId: string;
  Timestamp: string;
  Changes?: (string)[] | null;
  Event: string;
  PrimaryKey: number;
  Entity: string;
  ContextIdentifier: string;
  ChangedByAssociateId: number;
  WebhookName: string;
}
