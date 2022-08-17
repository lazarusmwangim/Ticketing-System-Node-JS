
const router = require('express').Router();

let users = require('../controllers/users_controller.js');
let events = require('../controllers/events_controller.js');
let tickets = require('../controllers/tickets_controller.js');
let attendees = require('../controllers/attendees_controller.js');

router.get('/', function (req, res) {
	var out = {
		"status": 200,
		"success": true,
		"message": "Welcome to the ticketing system."
	};
	res.json(out);
});

// add event
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

	if (req.session.user) {
		postData.organiser = req.session.user;
		eventsContoller.addEvent(postData, req.headers.api_key);
	}
	else {
		var out = {
			"status": 401,
			"success": false,
			"message": "Login to continue."
		};
		res.json(out);
	}



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

	if (req.session.user) {
		eventsContoller.updateEvent(postData, req.headers.api_key);
	}
	else {
		var out = {
			"status": 401,
			"success": false,
			"message": "Login to continue."
		};
		res.json(out);
	}
});

//fetch events
router.get("/events", function (req, res) {
	//console.log("Session variables: " + req.session.user);// session auth token for the logged in user
	var eventsContoller = events(res);

	if (req.session.user) {
		eventsContoller.loadEvents(req.headers.api_key);
	}
	else {
		var out = {
			"status": 401,
			"success": false,
			"message": "Login to continue."
		};
		res.json(out);
	}
});


// add ticket
router.post('/add/ticket', function (req, res) {
	var x = {
		"ticket_id": 1,
		"event_id": 3,
		"category": "Serena H",
		"description": "Graduation party celebration",
		"price": 350.00,
		"reserved": 0,
		"expiry": "2022-08-19 18:00:00",
		"created_on": "2022-08-16 08:03:41",
		"update_date": "2022-08-16 08:03:41"
	}
	console.log(req.body);
	var ticketsContoller = tickets(res);
	let postData = req.body;

	if (req.session.user) {
		ticketsContoller.addTicket(postData, req.headers.api_key);
	}
	else {
		var out = {
			"status": 401,
			"success": false,
			"message": "Login to continue."
		};
		res.json(out);
	}
});

// purchase ticket
router.post('/purchase/ticket', function (req, res) {
	var x = {
		"ticket_id": 3,
		"event_id": 3,
		"category": "Single",
		"price": 350,
		"name": "Attender Person",
		"phone": "+254705934323"
	}
	console.log(req.body);
	var attendeesContoller = attendees(res);
	let postData = req.body;

	attendeesContoller.purchaseTicket(postData, req.headers.api_key);
});

//fetch tickets
router.get("/tickets", function (req, res) {
	var ticketsContoller = tickets(res);

	if (req.session.user) {
		ticketsContoller.loadTickets(req.headers.api_key);
	}
	else {
		var out = {
			"status": 401,
			"success": false,
			"message": "Login to continue."
		};
		res.json(out);
	}
});

// EVent Managers
//add user
router.post("/add/event_manager", function (req, res) {
	var x = {
		"id": 1,
		"username": "swan",
		"phone": "+254705934323",
		"f_name": "Test",
		"m_name": "First",
		"l_name": "User",
		"email": "swan@tickets.net",
		"password": "admin",
		"created_on": "2022-08-16 08:03:41",
		"update_date": "2022-08-16 08:03:41"
	};
	//console.log(req.body);
	var userContoller = users(res);
	let postData = req.body;

	if (req.session.user) {
		userContoller.sign_up(postData, req.headers.api_key);
	}
	else {
		var out = {
			"status": 401,
			"success": false,
			"message": "Login to continue."
		};
		res.json(out);
	}
});

//login user
router.post("/login", function (req, res) {
	var userContoller = users(res);
	let postData = req.body;

	userContoller.sign_in(postData, req.headers.api_key, function (err, results) {
		if (err) {
			res.send(JSON.stringify({ "status": 203, "success": false, "message": "Username and/or password do not match." }));
		} else {
			results.session_id = req.session_id;
			req.session.user = results.token;
			res.send(results);
		}
	});
});


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