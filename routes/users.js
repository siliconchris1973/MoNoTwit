var express = require('express');
var router = express.Router();

/* GET users overview page. */
router.get('/', function(req, res, next) {
	res.render('users', { title: 'Users overview', desc: 'All user functions' });
});


/* GET Userlist page. */
router.get('/getuserlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
        	title: 'List of users',
            "userlist" : docs
        });
    });
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


/* POST to Add User Service */
router.post('/adduser', function(req, res) {
	
	// Set our internal DB variable
	var db = req.db;
	
	// Get our form values. These rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	
	// Set our collection
	var collection = db.get('usercollection');
	
	// Submit to the DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to success page
			res.redirect("/users/getuserlist");
		}
	});
});

module.exports = router;
