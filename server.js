const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const { MessageMedia } = require("whatsapp-web.js");
// var express = require('express');
var path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    const client = new Client();
    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
      res.render("index",{qr});
    });
    
    client.on("ready", () => {
      console.log("Client is ready!");
    });
    client.on('message',(message) => {
        message.reply('Ok boss')
    });
    client.initialize();
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
