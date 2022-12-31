const Vonage = require('@vonage/server-sdk');
const config = require("./config");

const vonage = new Vonage({
  apiKey: "7637a924",
  apiSecret: "wc4iBetVTdJvTfrR"
});


const sendOTP = (mobileNumber) => {
    vonage.verify.start({
        number: "91"+mobileNumber,
        brand: "Angirs  BoB AA"
    })
        .then(resp => console.log(resp.request_id))
        .catch(err => console.error(err))
}

vonage.verify.check(REQUEST_ID, CODE)
  .then(resp => console.log(resp))
  .catch(err => console.error(err));
  
module.exports = {sendOTP};
