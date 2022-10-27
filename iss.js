const request = require('request');


/**
   
  *makes a single API request to retrieve the users IP address

  *Input:

  *     - A callback (to pass back an error or the IP string)


  * Returns (via callback)
  *      -An error, if any (nullable)
  *      - The IP address as a string (null if error). Example: "162.245.144.188"

  */

const fetchMyIP = function(callback) {
  
  request("https://api.ipify.org?format=json", (error, response, body) => {

    //error can be set if invalid domain, user is offline, etc.
    if (error) return callback(error, null);

    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });

};

module.exports = { fetchMyIP };