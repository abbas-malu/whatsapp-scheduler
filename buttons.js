const qrcode = require("qrcode-terminal");
const csvtojson = require("csvtojson");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { MessageMedia } = require("whatsapp-web.js");
const { List } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});
client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
});
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
client.on("message", (message) => {
    client.sendMessage(message.from, "hi");
});
client.initialize();