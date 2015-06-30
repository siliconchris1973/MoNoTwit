/**
 * 
 */

 
var mongo = require('mongodb');
var seneca = require('seneca')()

seneca.add( {cmd:'servercon'}, function(args,callback){
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
   
  callback(null,{value:value})
})

seneca.listen()
 
