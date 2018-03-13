import { EventType } from './eventtype'

export interface EventDefinition {
  name: string,
  eventType: EventType;
  selected: boolean;
}
