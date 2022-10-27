const request = require('request');


/**
   
  *makes a single API request to retrieve the users IP address

  *Input:

  *     - A callback (to pass back an error or the IP string)


  * Returns (via callback)
  *      -An error, if any (nullable)
  *      - The IP address as a string (null if error). Example: "162.245.144.188"

  */

// const fetchMyIP = function(callback) {
  
//   request("https://api.ipify.org?format=json", (error, response, body) => {

//     //error can be set if invalid domain, user is offline, etc.
//     if (error) return callback(error, null);

//     //if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);

//   });

// };

// const fetchCoordsByIP = function(ip, callback) {

//   request(`http://ipwho.is/${ip}`, (error, response, body) => {

//     //error can be set if invalid domain, user is offline, etc.
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     const parsedBody = JSON.parse(body);
//     if (!parsedBody.success) {
//       const msg = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
//       callback(Error(msg), null);
//       return;
//     }

//     const { latitude, longitude } = parsedBody;

//     callback(null, {latitude, longitude});
//   });
// };

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

module.exports = { fetchISSFlyOverTimes };