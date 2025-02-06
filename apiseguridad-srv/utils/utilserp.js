const xsenv = require("@sap/xsenv");
const axios = require("axios");
const qs    = require("qs");

const DEST_IAS = "IAS_SCIM_API_DEPRECATED";

if (!process.env.PORT) {
  xsenv.loadEnv(__dirname + "/../default-env.json");
}

const dest_service = xsenv.getServices({ dest: { tag: "destination" } }).dest;
const uaa_service = xsenv.getServices({ uaa: { tag: "xsuaa" } }).uaa;

var fnGetDestination = function (destinationName) {
  return new Promise(function (resolve, reject) {
    const data = {
      client_id: dest_service.clientid,
      client_secret: dest_service.clientsecret,
      grant_type: 'client_credentials'
    };
    axios({
      method: "post",
      url: `${uaa_service.url}/oauth/token`,
      data: qs.stringify(data),
      headers: { "Content-Type": 'application/x-www-form-urlencoded' }
    })
      .then(function (resultToken) {
        return axios({
          method: "get",
          url: `${dest_service.uri}/destination-configuration/v1/subaccountDestinations`,
          headers: { Authorization: `Bearer ${resultToken.data.access_token}` }
        });
      })
      .then(function (resultDest) {
        const result = resultDest.data.filter(x => x["Name"] == destinationName);
        if (result.length == 0) {
          reject(Error(`Destination with name '${destinationName}' not found`));
        } else {
          resolve(result[0]);
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

exports.getDestinationIAS = async function () {
  return await fnGetDestination(DEST_IAS);
};
