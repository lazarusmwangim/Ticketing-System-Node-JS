
const router = require('express').Router();
let events = require('../controllers/events_controller.js');

router.get('/', function (req, res) {
	var out = {
		"status": 200,
		"success": true,
		"message": "Welcome to the ticketing system."
	};
	res.json(out);
});

// add staff
router.post('/add/event', function (req, res) {
	var x = {
		"id": 1,
		"name": "First Last",
		"venue": "Serena H",
		"description": "Graduation party celebration",
		"organiser": "Lazarus",
		"capacity": 100,
		"celebs": "The One, Chosen Two",
		"offers": "Come one come all",
		"eventDateTime": "2022-08-16 18:03:41"
	}
	//console.log("add-event called");
	console.log(req.body);
	var eventsContoller = events(res);
	let postData = req.body;

	eventsContoller.addEvent(postData, req.headers.api_key);
});

router.post('/update/event', function (req, res) {
	var x = {
		"id": 1,
		"name": "First Last",
		"venue": "Serena H",
		"description": "Graduation party celebration",
		"organiser": "Lazarus",
		"capacity": 100,
		"celebs": "The One, Chosen Two",
		"offers": "Come one come all",
		"eventDateTime": "2022-08-16 18:03:41"
	}
	//console.log("add-event called");
	console.log(req.body);
	var eventsContoller = events(res);
	let postData = req.body;

	eventsContoller.updateEvent(postData, req.headers.api_key);
});

/* router.post('/login', controllers.main.loginPost);
router.get('/logout', controllers.main.logout);
router.post('/forgotpass', controllers.main.forgotPass); */


// EVent Managers

// add event
router.post('/add-event', function (req, res) {

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
router.post('/add-ticket-type', function (req, res) {

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
router.get('/view-events-summary', function (req, res) {
	var out = {
		"status": 200,
		"success": true,
		"message": "All events"
	};
	res.json(out);
});

// Attendees

// Purchase a ticket
router.post('/purchase-ticket', function (req, res) {

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
router.post('/view-ticket', function (req, res) {

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

router.post('/', function (req, res) {

	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;

	res.send("The username is: " + username + " and the password is: " + password);

});

module.exports = router;