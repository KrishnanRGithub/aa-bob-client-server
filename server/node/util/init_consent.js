const config = require("../config");
const { v4: uuidv4 } = require('uuid');


//TODO STORE TRACKING ID IN MONGODB
const initConsent = (mobileNumber) => {
  var data = JSON.stringify({
    vuaId: mobileNumber + "@" + config.aa_id,
    templateType: "PERIODIC",
    trackingId: uuidv4(),
    redirectionUrl: "http://"+config.fiu_url + "/Complete",
  });   
  // console.log(data);
  return data;
};

module.exports = initConsent;
