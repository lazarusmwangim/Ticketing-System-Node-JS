"use strict"
//include all modules
let ticketsModel = require('../models/tickets.js');
let apiAuth = require('../models/authentication.js');

// Export functions
module.exports = function (response) {
  return {
    addTicket: function (ticketsData, api_key) {
      // check that the post data is not null nor undefined
      if (ticketsData.event_id != undefined || ticketsData.event_id != null || ticketsData.category != null || ticketsData.category != undefined) {
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
              ticketsModel.add_ticket(ticketsData, function (err, result) {
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
    updateTicket: function (ticketsData, api_key) {
      //console.log("Controller");
      console.log(ticketsData);
      // check that the post data is not null nor undefined
      if (ticketsData.id != undefined || ticketsData.id != null || ticketsData.capacity != null || ticketsData.capacity != undefined) {
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
              ticketsModel.update_ticket(ticketsData, function (err, result) {
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

    // fetch tickets
    loadTickets: function (api_key) {
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
              ticketsModel.loadTickets(function (err, result) {
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
