const qrcode = require("qrcode-terminal");
const csvtojson = require("csvtojson");
const { Client } = require("whatsapp-web.js");
const { MessageMedia } = require("whatsapp-web.js");
const client = new Client();
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
let msg;
let wait_time = "";
let rcpnt = "";
let set_rcpnt = "";
let msg_string = "";
let msg_json = "";
client.on("message", (message) => {
  // sample format for basic message schedule in minutes
  if (message.body.includes("@basic_MIN@")) {
    msg_string = message.body.replace("@basic_MIN@", "");
    msg_json = JSON.parse(msg_string);
    let basicSendMin = async function () {
      await sleep(msg_json["wait_time"] * 1000 * 60);
      client.sendMessage(`91${msg_json["rec"]}@c.us`, msg_json["msg"]);
    };
    basicSendMin();
  }
  // sample format for loop message schedule with fixed wait time in minutes
  if (message.body.includes("@loopF_MIN@")) {
    msg_string = message.body.replace("@loopF_MIN@", "");
    msg_json = JSON.parse(msg_string);
    let loopFSendMin = async function () {
      await sleep(msg_json["start_time"] * 1000 * 60);
      for (
        let loopRepeat = 0;
        loopRepeat < msg_json["loop_count"];
        loopRepeat++
      ) {
        client.sendMessage(`91${msg_json["rec"]}@c.us`, msg_json["msg"]);
        await sleep(msg_json["loop_wait_time"] * 1000 * 60);
      }
    };
    loopFSendMin();
  }
  // sample format for loop message schedule with random wait time in minutes
  if (message.body.includes("@loopR_MIN@")) {
    msg_string = message.body.replace("@loopR_MIN@", "");
    msg_json = JSON.parse(msg_string);
    let loopRSendMin = async function () {
      await sleep(msg_json["start_time"] * 1000 * 60);
      for (
        let loopRepeat = 0;
        loopRepeat < msg_json["loop_count"];
        loopRepeat++
      ) {
        client.sendMessage(`91${msg_json["rec"]}@c.us`, msg_json["msg"]);
        await sleep(
          between(
            msg_json["loop_wait_time"][0],
            msg_json["loop_wait_time"][1]
          ) *
            1000 *
            60
        );
      }
    };
    loopRSendMin();
  }
  // sample format for basic message schedule in seconds
  if (message.body.includes("@basic_SEC@")) {
    msg_string = message.body.replace("@basic_SEC@", "");
    msg_json = JSON.parse(msg_string);
    let basicSendSec = async function () {
      await sleep(msg_json["wait_time"] * 1000);
      client.sendMessage(`91${msg_json["rec"]}@c.us`, msg_json["msg"]);
    };
    basicSendSec();
  }
  // sample format for loop message schedule with fixed wait time in seconds
  if (message.body.includes("@loopF_SEC@")) {
    msg_string = message.body.replace("@loopF_SEC@", "");
    msg_json = JSON.parse(msg_string);
    let loopFSendSec = async function () {
      await sleep(msg_json["start_time"] * 1000);
      for (
        let loopRepeat = 0;
        loopRepeat < msg_json["loop_count"];
        loopRepeat++
      ) {
        client.sendMessage(`91${msg_json["rec"]}@c.us`, msg_json["msg"]);
        await sleep(msg_json["loop_wait_time"] * 1000);
      }
    };
    loopFSendSec();
  }
  // sample format for loop message schedule with random wait time in seconds
  if (message.body.includes("@loopR_SEC@")) {
    msg_string = message.body.replace("@loopR_SEC@", "");
    msg_json = JSON.parse(msg_string);
    let loopRSendSec = async function () {
      await sleep(msg_json["start_time"] * 1000);
      for (
        let loopRepeat = 0;
        loopRepeat < msg_json["loop_count"];
        loopRepeat++
      ) {
        client.sendMessage(`91${msg_json["rec"]}@c.us`, msg_json["msg"]);
        await sleep(
          between(
            msg_json["loop_wait_time"][0],
            msg_json["loop_wait_time"][1]
          ) * 1000
        );
      }
    };
    loopRSendSec();
  }
});
client.initialize();

// sample format for basic message schedule
// {
//     "msg": "hey abbas",
//     "wait_time": 15,
//     "rec": "6264582721"
// }

// sample format for loop message schedule with fixed wait time
// {
//     "msg": "hey abbas",
//     "start_time": 15,
//     "rec": "6264582721",
//     "loop_count":10,
//     "loop_wait_time":50
// }

// sample format for loop message schedule with random wait time
// {
//   "msg": "hey abbas",
//   "start_time": 15,
//   "rec": "6264582721",
//   "loop_count":10,
//   "loop_wait_time": [10,20]
// }
