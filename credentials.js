var seneca = require('seneca')()

seneca.add( {cmd:'credentials'}, function(args,callback){
  var credentials = {
    consumer_key : ugIsgrrcvVucOTAqhidt3IiZ4,
    consumer_secret : C0uEYDzKcTZPu46MxEeafzDX1tiz1z4pWTtti19FGHT16tGZeu,
    access_token : 754994-mwFhDi8DHGgelezcfuPqNueMYljYizRH8nVUqHf92kp,
    access_token_secret : m0tsbtGkxBSEu3YAvLmeBxOUpyyYsHBcixudGMpXx9dYc
  }
  var value = credentials[args.prop]
  callback(null,{value:value})
})

seneca.listen()
