"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var dotenv = require("dotenv");
var WebhookServer = /** @class */ (function () {
    function WebhookServer() {
        dotenv.config();
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
        console.log(process.env.SECRET);
    }
    WebhookServer.prototype.createApp = function () {
        this.app = express();
    };
    WebhookServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    // Express error-handling middleware function.
    // Read more: http://expressjs.com/en/guide/error-handling.html
    WebhookServer.prototype.abortOnError = function (err, req, res, next) {
        if (err) {
            console.log(err);
            res.status(400).send({ error: "Invalid signature." });
        }
        else {
            next();
        }
    };
    WebhookServer.prototype.config = function () {
        this.port = process.env.PORT || WebhookServer.PORT;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // verify signature when X-SuperOffice-Signature is present
        this.app.use(bodyParser.json({
            verify: function (req, res, buf) {
                // get the signature from the request headers
                var signature = req.get("X-SuperOffice-Signature");
                if (signature) {
                    // get secret from .env file. or set a default for debugging
                    var secret = process.env.SECRET || "Super";
                    var computedSignature = crypto
                        .createHmac("sha256", secret)
                        .update(buf.toString())
                        .digest("base64");
                    if (computedSignature === signature) {
                        console.log("Valid signature!");
                    }
                    else {
                        throw new Error("Invalid signature. The signatures do not match!");
                    }
                }
            }
        }));
        // Add an error-handling Express middleware function
        // to prevent returning sensitive information.
        this.app.use(this.abortOnError);
    };
    WebhookServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    WebhookServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log("Running server on port %s", _this.port);
        });
        this.app.post("", function (req, res) {
            console.log("[%s] Emitting message: %s", new Date().toLocaleString(), JSON.stringify(req.body));
            _this.io.emit("webhook", req.body);
            res.sendStatus(200);
        });
        this.io.on("connect", function (socket) {
            console.log("Connected client on port %s.", _this.port);
            socket.on("webhook", function (w) {
                console.log("[server](webhook): %s", JSON.stringify(w));
                _this.io.emit("webhook", w);
            });
            socket.on("disconnect", function () {
                console.log("Client disconnected");
            });
        });
    };
    WebhookServer.prototype.getApp = function () {
        return this.app;
    };
    WebhookServer.PORT = 3000;
    return WebhookServer;
}());
exports.WebhookServer = WebhookServer;
