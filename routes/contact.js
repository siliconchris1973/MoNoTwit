var express = require('express');
var router = express.Router();

/* GET users overview page. */
router.get('/', function(req, res, next) {
	res.render('contact', { title: 'Contact us', desc: 'get in touch' });
});


/* GET contact page. */
router.post('/contactform', function(req, res, next) {
	res.render('contactform', { title: 'Contact us', desc: 'get in touch' });
	
	// Set our internal DB variable
	var db = req.db;
	
	// Get our form values. These rely on the "name" attributes
	var contactName = req.body.contactname;
	var contactEmail = req.body.contactemail;
	var contactText = req.body.contacttext;
	
	// Set our collection
	var collection = db.get('contactcollection');
	
	// Submit to the DB
	collection.insert({
		"contactname" : contactName,
		"contactemail" : contactEmail,
		"contacttext" : contactText
	}, function (err, doc) {
		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to success page
			res.redirect("/index");
		}
	});
});

module.exports = router;
