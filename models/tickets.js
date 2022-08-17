"use strict"
//load modules
let db = require('../config/database.js');

//Export functions
module.exports = {
  add_ticket: function (data, callback) {
    //insert ticket into db
    var sql = "INSERT INTO `tickets`(`event_id`, `category`, `desc`, `price`, `reserved`, `expiry`, `createdon`, `update_date`) VALUES (?)";
    var values = [data.event_id, data.category, data.description, data.price, data.reserved, data.expiry, new Date(), data.update_date];
    db.query(sql, [values], function (error, result) {
      //console.log(result);  
      if (!error) {
        //callback to controllers
        callback(0, "Success");
      } else {
        //console.log(error);
        callback(1, error);
      }

    });
  },
  update_ticket: function (data, callback) {
    // You can only update capacity
    var sql = "UPDATE `tickets` SET `capacity` = ? WHERE `id` = ?";
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
  loadTickets: function (callback) {
    //console.log(data.name);
    //get user's information
    var sql = "SELECT * FROM `tickets`";
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
