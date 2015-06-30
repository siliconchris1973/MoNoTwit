/**
 * 
 */

var twitter = require('ntwitter');
var credentials = require('./credentials.js');
 
var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});
 
var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    assert = require('assert')
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('twitterstream', server);
// open db
db.open(function(err, db) {
	assert.equal(null, err);
	console.log("db-open function called")

	
	
});
