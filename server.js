"use strict"
require('dotenv').config();

var express = require("express");
var app = express();
const routes = require('./routes');
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');
//const db = require('./db');
var path = require("path");

// Force SSL, redirect http to https
if (process.env.NODE_ENV === "production") {
  app.use(forceSSLMiddleware);
}
const bodyParser = require("body-parser");
const cors = require('cors');

var HTTP_PORT = process.env.PORT || 5000;
const IN_PROD = process.env.NODE_ENV === 'production'



// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on " + HTTP_PORT);
}

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

// checking if the user is authenticated
function ensureLogin(req, res, next) {
	if (!req.session.user) {
		res.redirect("/");
	} else {
		next();
  }
}

var options = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	createDatabaseTable: true
};

const pool = mysql.createPool(options);
 
const  sessionStore = new MySQLStore(options, pool);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(session({
  name: "sess",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  secret: "a",
  cookie: {
    httpOnly: true,
    maxAge: 100 * 60 * 1000, // 1 minute
    sameSite: true,
    secure: IN_PROD
  },
  loggedIn: false
}));

// Enabling CORS
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "api_key, enctype, Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	res.locals.session = req.session;
	next();
});

app.use('/', routes);

//handle not found pages
app.use((req, res) => {
  res.end(JSON.stringify({"status":405, "message":"Page not found"}));
});
// setup http server to listen on HTTP_PORT but after data is loaded
app.listen(HTTP_PORT, onHttpStart);

