"use strict"
//include all modules
let usersModel = require('../models/users.js');
let apiAuth = require('../models/authentication.js');

// Export functions
module.exports = function (response) {
  return {
    // add a user
    sign_up: function (postData, api_key) {
      console.log(postData);
      //console.log(api_key);
      // check that the post data is not null nor undefined
      if (postData.phone != undefined || postData.phone != null || postData.username != null || postData.username != undefined) {
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
              //console.log(postData.username);
              usersModel.add_user(postData, function (err, result) {
                if (err) {
                  response.end(JSON.stringify({ "status": 203, "success": false, "message": "User add failure! Make sure you are not registered." }));
                } else {
                  response.end(JSON.stringify({ "status": 200, "success": true, "message": "User added successfully." }));
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

    // login 
    sign_in: function (userData, api_key, callback) {
      //console.log(api_key);
      // check that the post data is not null nor undefined
      if (userData.username != undefined || userData.username != null || userData.password != null || userData.password != undefined) {
        //check for valid api authentication
        apiAuth.api_authentication(api_key, function (err, result) {
          if (err) {
            console.log(err)
            //console.log("Internal server error.");
            response.end(JSON.stringify({ "status": 500, "success": false, "message": "Internal server error" }));
          } else {
            if (result == false) {
              //console.log("Not authorised.");
              response.end(JSON.stringify({ "status": 401, "success": false, "message": "Not authorized" }));
            } else {
              //if api_key is valid and no serevr error proceed to login
              //console.log(userData.username);
              usersModel.signin(userData, function (err, result) {
                if (err) {
                  //console.log("Invalid server error.");
                  callback(1, err);
                  //response.end(JSON.stringify({"status":203, "success":false, "message":"Invalid login credentials."}));
                } else {
                  //console.log("Logged in.");
                  var data = { "status": 200, "success": true, "message": "Success", "phone": result.phone, "email": result.email, "First Name": result.f_name, "Last Name": result.l_name, "session_id": "", "token": result.auth_token };
                  callback(0, data);
                  //sess.loggedIn = true;
                  //response.end(JSON.stringify({"status":200, "success":true, "data":result}));
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
