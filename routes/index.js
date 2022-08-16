
const router = require('express').Router();
const apiRouter = require('./attendees.js');

router.get('/', function(req, res){
    var out = {
        "status": 200,
        "success": true,
        "message": "Welcome to the ticketing system."
    };
	res.json(out);
});

// EVent Managers

// add event
router.post('/add-event', function(req, res){

	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;

	var out = {
        "status": 200,
        "success": true,
        "message": "Event added successfully."
    };
	res.json(out);

});

// create ticket type
router.post('/add-ticket-type', function(req, res){

	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;

	var out = {
        "status": 200,
        "success": true,
        "message": "Ticket type added successfully."
    };
	res.json(out);

});

// view events summary
router.get('/view-events-summary', function(req, res){
	var out = {
        "status": 200,
        "success": true,
        "message": "All events"
    };
	res.json(out);
});

// Attendees

// Purchase a ticket
router.post('/purchase-ticket', function(req, res){

	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;

	var out = {
        "status": 200,
        "success": true,
        "message": "Ticket type added successfully."
    };
	res.json(out);

});

// View ticket information
router.post('/view-ticket', function(req, res){

	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;

	var out = {
        "status": 200,
        "success": true,
        "message": "Ticket type added successfully."
    };
	res.json(out);

});

router.post('/', function(req, res){

	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;

	res.send("The username is: " + username + " and the password is: " + password);

});

module.exports = router;