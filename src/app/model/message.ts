import { User } from './user';
import { Action } from './action';
import { EventType } from './eventtype';
import { Source } from './source';

export interface Message {
    type?: Event;
    primaryKey?: number;
    entityName?: Source;
    changes?: any;
    changedBy?: number
}
