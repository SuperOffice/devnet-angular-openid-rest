"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webhook_server_1 = require("./webhook-server");
var app = new webhook_server_1.WebhookServer().getApp();
exports.app = app;
