/**
 * database for connection with database
 */
"use strict"
// Retrive connection
const mysql = require('mysql');
require('dotenv').config();

let db_config = {
  host     : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  port     : process.env.DB_PORT
};
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  
  connection.connect(function(err) {
    if(err) {     
      //console.log(err)
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

//Function exports
module.exports = connection;
