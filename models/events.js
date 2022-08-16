"use strict"
//load modules
let db = require('../config/database.js');

//Export functions
module.exports = {
  /**
   * [add_event for events registration ]
   * @param  {[object]}   data [event data]
   * @param  {Function} callback [callback function for event controller add_event method]
   * @return {[object]}            [linme information]
   */
  add_event: function (data, callback) {
    //insert event into databse
    var sql = "INSERT INTO `events`(`name`, `venue`, `desc`, `organiser`, `capacity`, `celebs`, `offers`, `eventdate`, `createddate`) VALUES (?)";
    var values = [data.name, data.venue, data.description, data.organiser, data.capacity, data.celebs, data.offers, data.eventDateTime, new Date()];
    db.query(sql, [values], function (error, result) {
      //console.log(result);  
      if (!error) {
        //console.log("No Add events Error.");
        //callback to controllers
        callback(0, "Success");
      } else {
        //console.log(error);
        callback(1, error);
      }

    });
  },
  update_event: function (data, callback) {
    // You can only update capacity
    var sql = "UPDATE `events` SET `capacity` = ? WHERE `id` = ?";
    var values = [data.capacity, data.id];
    db.query(sql, values, function (error, result) {
      //console.log("Update events called");  
      if (!error) {
        callback(0, "Updated successfully!");
      } else {
        console.log(error);
        //console.log("Load emps error");
        callback(1, error);
      }

    });
  },
  loadEvents: function (callback) {
    //console.log(data.name);
    //get user's information
    var sql = "SELECT * FROM `events`";
    db.query(sql, function (error, result) {
      //console.log("Load bills called");  
      if (!error) {
        //console.log(JSON.stringify(result));
        if (result.length > 0) {
          callback(0, JSON.stringify(result));
        } else {
          //console.log("Load bills no");
          callback(1, result);
        }

      } else {
        //console.log("Load bills error");
        //console.log(error);
        callback(1, error);
      }

    });
  },
};
