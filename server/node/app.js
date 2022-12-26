// create an express app
const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config");
var axios = require("axios");
const localStorage = require("localStorage");

// UTILS
const createData = require("./util/consent_detail");
const dataFlow = require("./util/request_data");
const initFlow = require("./util/init_consent");

// use the express-static middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// app.use(bodyParser.text({ defaultCharset: "utf-8" }));

app.use(express.static("public"));

// define the first route
app.get("/", function (req, res) {
  res.send("Server Running");
});

///// CREATE INIT CALL
app.get("/init/:mobileNumber", (req, res) => {
  console.log("Serve Consent");
  let body = initFlow(req.params.mobileNumber);
  var requestConfig = {
    method: "post",
    url: config.api_url + "/init/redirection",
    headers: {
      "Content-Type" : "application/json",
      "API_KEY" : config.api_key,
    },
    data: body,
  };
  axios(requestConfig)
    .then(function (response) {
      console.log(response.data.redirectionUrl);
      let url = response.data.redirectionUrl;
      res.send(url);
    })
    .catch(function (error) {
      console.log(error);
      console.log("Error");
    });
});

//CONSENT CALL UNUSED
// app.get("/consent/:mobileNumber", (req, res) => {
//   console.log("Serve COnsent");
//   let body = createData(req.params.mobileNumber);
//   console.log(body);
//   var requestConfig = {
//     method: "post",
//     url: config.api_url + "/consents",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: config.api_key,
//     },
//     data: body,
//   };

//   axios(requestConfig)
//     .then(function (response) {
//       let url = response.data.url;
//       res.send(url);
//     })
//     .catch(function (error) {
//       console.log(error);
//       console.log("Error");
//     });
// });

////// CONSENT NOTIFICATION

app.post("/notification", (req, res) => {
  var body = req.body;
  if (body.type === "CONSENT_STATUS_UPDATE") {
    if (body.data.status === "ACTIVE") {
      console.log("In Consent notification");
      fi_data_request(body.consentId);
    } else {
      localStorage.setItem("jsonData", "Rejected");
    }
  }
  if (body.type === "SESSION_STATUS_UPDATE") {
    if (body.data.status === "COMPLETED") {
      console.log("In FI notification");
      fi_data_fetch(body.dataSessionId);
    } else {
      localStorage.setItem("jsonData", "PENDING");
    }
  }

  res.send("OK");
});

////// FI DATA REQUEST

const fi_data_request = async (consent_id) => {
  console.log("In FI data request");
  let request_body = dataFlow.requestData(consent_id);
  var requestConfig = {
    method: "post",
    url: config.api_url + "/sessions",
    headers: {
      "Content-Type": "application/json",
      Authorization: config.api_key,
    },
    data: request_body,
  };

  axios(requestConfig)
    .then(function (response) {
      console.log("Data request sent");
    })
    .catch(function (error) {
      console.log(error);
      console.log("Error");
    });
};

////// FETCH DATA REQUEST

const fi_data_fetch = (session_id) => {
  console.log("In FI data fetch");
  var requestConfig = {
    method: "get",
    url: config.api_url + "/sessions/" + session_id,
    headers: {
      "Content-Type": "application/json",
      Authorization: config.api_key,
    },
  };
  axios(requestConfig)
    .then(function (response) {
      localStorage.setItem("jsonData", JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      console.log("Error");
    });
};

app.post("/redirect", (req, res) => {
  console.log("In redirect");
  console.log(req);
  res.send(localStorage.getItem("consent"));
});

///// GET DATA

app.get("/get-data", (req, res) => {
  res.send(JSON.parse(localStorage.getItem("jsonData")));
});
// start the server listening for requests
app.listen(config.port || 3000, () => console.log("Server is running... on "+config.port));
