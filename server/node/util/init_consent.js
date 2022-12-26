const config = require("../config");

const initConsent = (mobileNumber) => {
  const dateNow = new Date();
  const expiry = new Date(dateNow.getTime() + 600000);
  var data = JSON.stringify({
    vuaId: mobileNumber + "@" + config.aa_id,
    templateType: "ONETIME",
    trackingId: "f35ed",
    redirectionUrl: config.hosted_url + "/redirect",
  });

  return data;
};

module.exports = initConsent;
