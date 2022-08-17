"use strict"
//load modules
let db = require('../config/database.js');

//Export functions
module.exports = {
  purchase_ticket: function (data, callback) {
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
  purchaseTicket: function (data, callback) {
    //get max tickets and reserved tickets
    var to_reserve = 0;
    if (data.category === "Single" || data.category === "VIP") {
      to_reserve = 1;
    }
    else if (data.category === "Couple") {
      to_reserve = 2;
    }
    else if (data.category === "Mbogi") {
      to_reserve = 10;
    }

    var sql = "SELECT SUM(t.`reserved`) AS 'reserved', e.`capacity` FROM `tickets` t, `events` e WHERE t.`event_id` = ? AND e.`id` = t.`event_id`";
    var values = [data.event_id];
    db.query(sql, values, function (error, result) {
      if (!error) {
        console.log(JSON.stringify(result));
        if (result.length > 0) {

          // Get the number of available tickets
          var max_tickets = result[0].capacity;
          var reserved_tickets = result[0].reserved;
          var av = Number(max_tickets) - Number(reserved_tickets);

          console.log("Reserved tickets " + reserved_tickets);
          console.log("Available tickets " + av);
          console.log("Max tickets " + max_tickets);

          if ((av - to_reserve) < 0) {
            callback(1, "Tickets for the above seem to be exhausted.");
          }
          else {
            // insert the payment details, then ticket details and later 
            data.transaction_id = "MPESA123456";
            data.date = new Date();
            var sql = "INSERT INTO `payments`(`transaction_id`, `phone`, `amount`, `date`) VALUES (?)";
            var values = [data.transaction_id, data.phone, data.price, data.date];
            db.query(sql, [values], function (error, result) {
              //console.log(result);  
              if (!error) {
                // insert into the ticket details
                var sql = "INSERT INTO `ticket_details`(`attendee_name`, `phone`, `ticket_id`, `amount`, `transaction_id`, `purchase_date`)  VALUES (?)";
                var values = [data.name, data.phone, data.ticket_id, data.price, data.transaction_id, data.date];
                db.query(sql, [values], function (error, result) {
                  //console.log(result);  
                  if (!error) {
                    //callback to controllers
                    callback(0, "Success");
                  } else {
                    //console.log(error);
                    callback(1, "Transaction cannot happen. Make sure you pay.");
                  }

                });
              } else {
                //console.log(error);
                callback(1, "Transaction cannot happen. Make sure you pay.");
              }

            });
          }


          var sql = "SELECT SUM(`reserved`) AS 'reserved' FROM `tickets` WHERE `event_id` = ?";
          var values = [data.event_id];
          db.query(sql, values, function (error, result) {
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
