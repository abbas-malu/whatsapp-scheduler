let msg_string = '{"msg":"hey abbas","wait_time":15,"rec":"6264582721"}';
let msg_json = '';
console.log('hello')
// console.log(msg_string);
msg_json = JSON.parse(msg_string);
console.log(msg_json);
console.log(msg_json["wait_time"]);
console.log(msg_json["rec"])
console.log(msg_json["msg"])