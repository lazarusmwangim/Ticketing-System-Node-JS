"use strict"
//load module
let db = require('../config/database.js');

//Export functions

module.exports = {
  /**
   * [api_authentication check for valid call for api using token]
   * @param  {[string]}   api_key  [api_token]
   * @param  {Function} callback [callback to function]
   * @return {[boolean]}            [true or false]
   */
  api_authentication: function(api_key, callback) {
    //check if header api_key is in database or not for security purpose
    //console.log("Auth called");
    db.query('SELECT * FROM api_auth WHERE api_token = ?', api_key, function(error, rows) {
        if (!error) {
          if(rows.length > 0){
            callback(0, true);
          }else{
            callback(0, false);
            // response.end(JSON.stringify({"status":401,"sucsess":false,"message":"Not authorized"}));
          }
        } else
        //console.log(error)
        callback(0, error);
    });
  },
};
