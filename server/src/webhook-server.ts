import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import { WebhookPayload } from './model';

export class WebhookServer {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private signature: string;
  private webhookPayload: WebhookPayload;

  constructor() {
    dotenv.config();
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
    console.log(process.env.SECRET);
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  // Express error-handling middleware function.
  // Read more: http://expressjs.com/en/guide/error-handling.html
  private abortOnError(err: any, req: express.Request, res: express.Response, next: any) {
    if (err) {
      console.log(err);
      res.status(400).send({ error: "Invalid signature." });
    } else {
      next();
    }
  }

  private config(): void {
    this.port = process.env.PORT || WebhookServer.PORT;

    this.app.use(bodyParser.urlencoded({ extended: false }));

    // verify signature when X-SuperOffice-Signature is present

    this.app.use(
      bodyParser.json({
        verify: function(req, res, buf) {
          const signature = req.get("X-SuperOffice-Signature");
          // get secret from .env file.
          const secret = process.env.SECRET || "Super";

          if (signature) {
            const computedSignature = crypto
              .createHmac("sha256", secret)
              .update(buf.toString())
              .digest("base64");
            if (computedSignature === signature) {
              console.log("Valid signature!");
            } else {
              throw new Error("Invalid signature.");
            }
          }
        }
      })
    );

    // Add an error-handling Express middleware function
    // to prevent returning sensitive information.
    this.app.use(this.abortOnError);
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.app.post("", (req, res) => {
      
      console.log("[%s] Emitting message: %s", new Date().toLocaleString(), JSON.stringify(req.body))

      this.io.emit("webhook", req.body);
      res.sendStatus(200);
    });

    this.io.on("connect", (socket: any) => {
      console.log("Connected client on port %s.", this.port);
      socket.on("webhook", (w: WebhookPayload) => {
        console.log("[server](webhook): %s", JSON.stringify(w));
        this.io.emit("webhook", w);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
