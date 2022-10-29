const qrcode = require("qrcode-terminal");
const csvtojson = require("csvtojson");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { MessageMedia } = require("whatsapp-web.js");
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
let msg;
let wait_time = "";
let rcpnt = "";
let set_rcpnt = "";
let msg_string = "";
let msg_json = "";
client.on("message", (message) => {
  if (message.body.includes("@json@")) {
    msg_string = message.body.replace("@json@", "");
    msg_json = JSON.parse(msg_string);
    let jSend = async function () {
      await sleep(msg_json["wait_time"] * 1000);
      client.sendMessage(`91${msg_json["rec"]}@c.us`, msg_json["msg"]);
    };
    jSend();
  }

  if (message.body.includes("@msg@")) {
    msg = message.body.replace("@msg@", "");
  }

  if (message.body.includes("@time@")) {
    wait_time = Number(message.body.replace("@time@", ""));
  }

  if (message.body.includes("@rec@")) {
    rcpnt = message.body.replace("@rec@", "");
  }

  if (message.body.includes("@srec@")) {
    rcpnt = message.body.replace("@srec@", "");
  }

  if (message.body.includes("@set@")) {
    let send = async function () {
      await sleep(wait_time * 1000);
      client.sendMessage(`91${rcpnt}@c.us`, msg);
      msg = "";
      wait_time = "";
      rcpnt = "";
    };
    send();
  }

  if (message.body.includes("@sset@")) {
    let rSend = async function () {
      await sleep(wait_time * 1000);
      client.sendMessage(`91${set_rcpnt}@c.us`, msg);
      msg = "";
      wait_time = "";
    };
    rSend();
  }
});
client.initialize();
