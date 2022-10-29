function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}
let a  = JSON.parse(`{
  "msg": "hey abbas",
  "start_time": 15,
  "rec": "6264582721",
  "loop_count":10,
  "loop_wait_time": [10,20]
 }`)
for (let index = 0; index < 20; index++) {
    console.log(between(a["loop_wait_time"][0],a["loop_wait_time"][1])*1000*60);
}