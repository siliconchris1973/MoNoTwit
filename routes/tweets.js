var express = require('express');
var router = express.Router();

/* GET tweet overview page. */
router.get('/', function(req, res, next) {
	res.render('tweets', { title: 'Tweets overview', desc: 'Tweets streaming in' });
});


/* GET Tweetlist page. */
router.get('/gettweetlist', function(req, res) {
	var db = req.db;
	var collection = db.get('twittercollection');
	collection.find({},{},function(e,docs){
		res.render('tweetlist', {
			title: 'List of Tweets', 
			"tweetlist" : docs
		});
	});
});


/* START THE STREAMING */
router.get('/starttwitterstreaming', function(req, res) {
	var twitter = require('ntwitter');
	var credentials = require('../conf/twitter_credentials.js');

	var t = new twitter({
	    consumer_key: credentials.consumer_key,
	    consumer_secret: credentials.consumer_secret,
	    access_token_key: credentials.access_token_key,
	    access_token_secret: credentials.access_token_secret
	});

	var watchlist = ['raspberrypi', 'rpi', 'PiBotter'];


	t.stream('statuses/filter', {track: watchlist}, function (stream) {
		stream.on('data', function (data) {
			db.tweets.findAndModify({
				query: {'id': 'data.id'},
				update: { $set: data},
				upsert: true
		        //new: true
			})
			
			console.log(data.user.screen_name + ': ' + data.text);
			/*
			if(error)  {
				console.log("Error", error.message);
			} else {
				console.log(data.user.screen_name + ': ' + data.text);
			}
			*/
		});
	});
});


/* STOP THE STREAMING */

module.exports = router;
