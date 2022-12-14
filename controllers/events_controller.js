"use strict"
//include all modules
let eventsModel = require('../models/events.js');
let apiAuth = require('../models/authentication.js');

// Export functions
module.exports = function (response) {
  return {
    addEvent: function (eventsData, api_key) {
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
              //if api_key is valid and no serevr error add event
              eventsModel.add_event(eventsData, function (err, result) {
                if (err) {
                  //console.log("Invalid server error.");
                  response.end(JSON.stringify({ "status": 203, "success": false, "message": "NOT added successfully!" }));
                } else {
                  response.end(JSON.stringify({ "status": 200, "success": true, "message": "Added successfully." }));
                }
              });
            }
          }
        });
      } else {
        //console.log("Null data");
        response.end(JSON.stringify({ "status": 400, "success": false, "message": "Null data" }));
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
              //if api_key is valid and no serevr error update the event
              eventsModel.update_event(eventsData, function (err, result) {
                if (err) {
                  //console.log("Invalid server error.");
                  response.end(JSON.stringify({ "status": 203, "success": false, "message": "Update failed! Try again later!" }));
                } else {
                  var data = { "success": true, "message": "Update Success!" };
                  response.end(JSON.stringify(data));
                }
              });
            }
          }
        });
      } else {
        //console.log("Null data");
        response.end(JSON.stringify({ "status": 400, "success": false, "message": "Null data" }));
      }
    },
    // fetch events
    loadEvents: function (api_key) {
      //console.log(api_key);
      // check that the header data api_key is not null nor undefined
      if (api_key != undefined || api_key != null) {
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
              //if api_key is valid and no serevr error fetch all events
              eventsModel.loadEvents(function (err, result) {
                if (err) {
                  //console.log("Invalid server error.");
                  response.end(JSON.stringify({ "status": 203, "success": false, "message": "No Events data!" }));
                } else {
                  //console.log("Success");
                  //console.log(result);
                  response.end(result);
                }
              });
            }
          }
        });
      } else {
        //console.log("Null data");
        response.end(JSON.stringify({ "status": 400, "success": false, "message": "Null data" }));
      }
    },


  }
};
