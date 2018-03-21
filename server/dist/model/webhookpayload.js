"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebhookPayload = /** @class */ (function () {
    function WebhookPayload(d) {
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
    return WebhookPayload;
}());
exports.WebhookPayload = WebhookPayload;
