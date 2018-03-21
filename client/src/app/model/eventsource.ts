import { SourceDefinition } from './sourcedefinition';
import { EventDefinition  } from './eventdefinition';

export interface EventSource {
  sourceDefinition: SourceDefinition;
  eventDefinition: EventDefinition[];
}
