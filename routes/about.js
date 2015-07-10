var express = require('express');
var router = express.Router();

/* GET the about page. */
router.get('/', function(req, res, next) {
	res.render('about', { title: 'About', desc: 'Who we are' });
});

module.exports = router;
