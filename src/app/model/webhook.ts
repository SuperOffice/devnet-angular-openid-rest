import { Source } from './source';
import { EventType } from './eventtype';

export interface IWebHook {
  WebhookId: number;
  Name: string;
  Events?: (string)[];
  TargetUrl: string;
  Secret: string;
  State: string;
  Type: string;
  Headers: any;
  Properties: any;
  Registered: string;
  RegisteredAssociate: IAssociate;
  Updated: string;
  UpdatedAssociate: IAssociate;
}

export interface EventDefinition {
  name: string,
  eventType: EventType;
  selected: boolean;
}
export interface SourceDefinition {
  source: Source;
  name: string;
}

export interface EventSource {
  source: SourceDefinition;
  events: EventDefinition [];
}

export interface IAssociate {
  TableRight: ITableRight;
  FieldProperties: any;
  AssociateId: number;
  Deleted: boolean;
  EjUserId: number;
  FormalName: string;
  FullName: string;
  GroupIdx: number;
  Name: string;
  PersonId: number;
  Rank: number;
  Tooltip: string;
  Type: string;
}

export interface ITableRight {
  Mask: string;
  Reason: string;
}
