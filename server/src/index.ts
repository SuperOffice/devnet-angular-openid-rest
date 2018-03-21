import { WebhookServer } from './webhook-server'

let app = new WebhookServer().getApp(); 

export { app };