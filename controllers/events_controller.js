"use strict"
//include all modules
let eventsModel = require('../models/events.js');
let apiAuth = require('../models/authentication.js');
//var session;

// Export functions
module.exports = function (response) {
  return {
    addEvent: function (eventsData, api_key) {
      //console.log(billData.username);
      //console.log(api_key);
      // check that the post data is not null nor undefined
      if (eventsData.name != undefined || eventsData.name != null || eventsData.venue != null || eventsData.venue != undefined) {
        //check for valid api authentication
        apiAuth.api_authentication(api_key, function (err, result) {
          if (err) {
            //console.log("Internal server error.");
            response.end(JSON.stringify({ "status": 500, "success": false, "message": "Internal server error" }));
          } else {
            if (result == false) {
              //console.log("Not authorised.");
              response.end(JSON.stringify({ "status": 401, "success": false, "message": "Not authorized" }));
            } else {
              //if api_key is valid and no serevr error process to login
              //console.log(eventsData.username);
              eventsModel.add_event(eventsData, function (err, result) {
                if (err) {
                  //console.log("Invalid server error.");
                  response.end(JSON.stringify({ "status": 203, "success": false, "message": "NOT added successfully!" }));
                } else {
                  //console.log("Logged in.");

                  response.end(JSON.stringify({ "status": 200, "success": true, "message": "Added successfully." }));
                }
              });
            }
          }
        });
      } else {
        //console.log("Null data");
        response.end(JSON.stringify({ "status": 500, "success": false, "message": "Null data" }));
      }
    },
    updateEvent: function (eventsData, api_key) {
      //console.log("Controller");
      console.log(eventsData);
      // check that the post data is not null nor undefined
      if (eventsData.id != undefined || eventsData.id != null || eventsData.capacity != null || eventsData.capacity != undefined) {
        //check for valid api authentication
        apiAuth.api_authentication(api_key, function (err, result) {
          if (err) {
            //console.log("Internal server error.");
            response.end(JSON.stringify({ "status": 500, "success": false, "message": "Internal server error" }));
          } else {
            if (result == false) {
              //console.log("Not authorised.");
              response.end(JSON.stringify({ "status": 401, "success": false, "message": "Not authorized" }));
            } else {
              //if api_key is valid and no serevr error process to login
              //console.log(eventsData.username);
              eventsModel.update_event(eventsData, function (err, result) {
                if (err) {
                  //console.log("Invalid server error.");
                  response.end(JSON.stringify({ "status": 203, "success": false, "message": "Update failed! Try again later!" }));
                  //callback(1, err);
                  //response.end(JSON.stringify({"status":203, "success":false, "message":"Invalid login credentials."}));
                } else {
                  var data = { "success": true, "message": "Update Success!" };
                  //callback(0, data);
                  response.end(JSON.stringify(data));
                }
              });
            }
          }
        });
      } else {
        //console.log("Null data");
        response.end(JSON.stringify({ "status": 500, "success": false, "message": "Null data" }));
      }
    },


  }
};
