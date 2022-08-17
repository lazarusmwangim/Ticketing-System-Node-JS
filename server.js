"use strict"
require('dotenv').config();

var express = require("express");
var app = express();
const routes = require('./routes');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');

var { graphqlHTTP } = require('express-graphql');
var { buildSchema, GraphQLScalarType } = require('graphql');



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

const sessionStore = new MySQLStore(options, pool);

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
    maxAge: 100 * 60 * 1000, // 100 minute
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

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// graphql read
app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  req.mysqlDb.connect();
  next();
});

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  })
};

// Construct a schema, using GraphQL schema language
/* var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
}; */

// 
var schema = buildSchema(`
scalar Date
type Ticket{
  ticket_id: Int
  event_id: Int
  category: String
  desc: String
  price: String
  reserved: String
  expiry: Date
  createdon: String
  update_date: String
}
type Event{
  id: Int
  name: String
  venue: String
  desc: String
  organiser: String
  capacity: Int
  celebs: String
  offers: String
  eventdate: Date
  createddate: Date
  update_date: Date
}
type Attendee{
  attendee_name: String
  transaction_id: String
  phone: String
  category: String
  name: String
  venue: String
  desc: String
  organiser: String
  eventdate: Date
  celebs: String
  offers: String
}
  type Query {
    hello: String
    getTickets: [Ticket],
    getTicketDetails(ticket_id: Int): Ticket,
    getEvents: [Event],
    getEventDetails(id: Int): Event,
    getAttendeeTicket(phone: String, ticket_id: Int): Attendee
  }
`);


const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
  req.mysqlDb.query(sql, args, (err, rows) => {
    if (err)
      return reject(err);
    rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
  });
});

var sql = "SELECT e.`name`, e.`desc`, e.`organiser`, e.`eventdate`, e.`celebs`, td.`attendee_name`, td.`amount`, td.`phone`, td.`transaction_id`, td.`purchase_date`, t.`category`, t.`expiry` FROM `events` e, `ticket_details` td, `tickets` t WHERE t.`event_id` = e.`id` AND td.`ticket_id` = t.`ticket_id` AND td.`phone` = ?";
var root = {
  hello: () => {
    return 'Hello Ticketing system!';
  },
  getTickets: (args, req) => queryDB(req, "SELECT * FROM `tickets`").then(data => data),
  getTicketDetails: (args, req) => queryDB(req, "SELECT * FROM `tickets` WHERE `ticket_id` = ?", [args.ticket_id]).then(data => data[0]),
  getEvents: (args, req) => queryDB(req, "SELECT * FROM `events`").then(data => data),
  getEventDetails: (args, req) => queryDB(req, "SELECT * FROM `events` WHERE `id` = ?", [args.id]).then(data => data[0]),
  getAttendeeTicket: (args, req) => queryDB(req, "SELECT e.`name`, e.`desc`, e.`organiser`, e.`eventdate`, e.`celebs`, e.`offers`, td.`attendee_name`, td.`amount`, td.`phone`, td.`transaction_id`, td.`purchase_date`, t.`category`, t.`expiry` FROM `events` e, `ticket_details` td, `tickets` t WHERE t.`event_id` = e.`id` AND td.`ticket_id` = t.`ticket_id` AND td.`phone` = ? AND td.`ticket_id` = ?", [args.phone, args.ticket_id]).then(data => data[0]),
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use('/', routes);

//handle not found pages
app.use((req, res) => {
  res.end(JSON.stringify({ "status": 405, "message": "Page not found" }));
});
// setup http server to listen on HTTP_PORT but after data is loaded
app.listen(HTTP_PORT, onHttpStart);

