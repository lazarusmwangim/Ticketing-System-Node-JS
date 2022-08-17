"use strict"
//load modules
let db = require('../config/database.js');
let enc = require('../config/encrypti.js');

//Export functions
module.exports = {
  /**
   * [signUp for event managers registration ]
   * @param  {[object]}   userData [user data]
   * @param  {Function} callback [callback function for user controller sign_up method]
   * @return {[object]}            [User information]
   */
  add_user: function (postData, callback) {
    //insert
    let auth_token = module.exports.generate_auth_token();
    postData.auth_token = auth_token;
    //console.log("Auth token is : " + postData.auth_token);

    var pwdh = "";
    //console.log("Password b4 is : " + pwdh);
    enc.cryptPassword(postData.password, function (err, results) {
      if (err) {
        //console.log("Password is : impossible");
        callback(1, err);
      } else {

        pwdh = results;
        //console.log("Password is : " + pwdh);
        var sql = "INSERT INTO `event_managers`(`username`, `phone`, `f_name`, `m_name`, `l_name`, `email`, `password`, `auth_token`, `create_date`) VALUES (?)";
        var values = [postData.username, postData.phone, postData.f_name, postData.m_name, postData.l_name, postData.email, pwdh, postData.auth_token, new Date()];
        db.query(sql, [values], function (error, result) {
          //console.log(result);  
          if (!error) {
            //console.log("No add user Error.");
            let data = {
              username: postData.username,
              eid: postData.employee_id,
              etype: postData.usertype
            };
            //callback to controllers
            callback(0, data);
          } else {
            //console.log(error);
            callback(1, error);
          }

        });
      }
    });
  },

  /**
      function for creating auth api
  */
  createApi: function (data, callback) {
    //insert user detain into databse
    db.query('INSERT INTO api_auth SET ?', data, function (error, result) {
      if (!error) {
        //callback to controllers
        callback(0, result);
      } else
        callback(error);
    });
  },

  /**
   * [signin function to login user]
   * @param  {[object]}   userData [username , password]
   * @param  {Function} callback [controller's sign_in method]
   * @return {[object]}            [User information]
   */
  signin: function (userData, callback) {
    //console.log(userData);
    // decrypt
    //var pwdh = "$2b$10$X0EQIqy94lEglYFvY.Ie9.iw6ehhimmWo4kNgpkasD.c1MD7TsFLS";

    //get user's information
    var sql = "SELECT `username`, `phone`, `f_name`, `m_name`, `l_name`, `email`, `password`, `auth_token` FROM `event_managers` WHERE `username` = ?";
    db.query(sql, [userData.username], function (error, result) {
      //console.log("signin modell called");  
      if (!error) {
        //console.log(result);
        if (result.length > 0) {
          //console.log("signin modell yes");
          var j = JSON.stringify(result);
          j = JSON.parse(j);
          var hashp = j[0].password;
          //console.log(j[0].password);

          enc.comparePassword(userData.password, hashp, function (err, yes) {
            if (err) {
              callback(1, err);
            } else {
              if (!yes) {
                //console.log("Password no match");
                callback(1, err);
              } else {

                //var pwdhs = result;
                //console.log("Password match" + pwdhs);
                callback(0, j[0]);
              }
            }
          });

        } else {
          //console.log("signin modell no");
          callback(1, result);
        }

      } else {
        console.log("signin modell error");
        console.log(error);
        callback(error);
      }

    });
  },
  /**
   * [generate_auth_token generate user's auth token]
   * @return {[auth_token]} [description]
   */
  generate_auth_token: function () {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&'
    let result = '';
    for (let i = 32; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },

  // update user details
  updateUsers: function (userData, callback) {
    //console.log(userData);
    //get user's information
    var sql = "UPDATE `staff` SET `username`= ?, `phone`= ?, `f_name`= ?, `m_name`= ?, `l_name`= ?, `email`= ? WHERE `id` = ?";
    var values = [userData.username, userData.phone, userData.f_name, userData.m_name, userData.l_name, userData.email, userData.id];
    db.query(sql, values, function (error, result) {
      //console.log("Update staff called");  
      if (!error) {
        //console.log(result[0].number);
        callback(0, "Updated successfully!");

      } else {
        //console.log(error);
        //console.log("Load emps error");
        callback(1, error);
      }

    });
  },

  // change password
  update_Password: function (userData, callback) {
    //console.log(userData.password);
    //get user's information
    var pwdh = "";
    enc.cryptPassword(userData.password, function (err, results) {
      if (err) {
        //console.log("Password is : impossible");
        callback(1, err);
      } else {

        pwdh = results;
        //console.log("Password is : " + pwdh);
        var sql = "UPDATE `event_managers` SET `password` = ? WHERE `username` = ?";
        var values = [pwdh, userData.username];
        db.query(sql, values, function (error, result) {
          //console.log("Update staff called");  
          if (!error) {
            //console.log(result[0].number);
            callback(0, "Updated successfully!");

          } else {
            console.log(error);
            //console.log("Load emps error");
            callback(1, error);
          }

        });

      }
    });

  }
};
