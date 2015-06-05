
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  ;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.post('/', function(request, response){
  var url = "mongodb://localhost:27015/avoider";
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to MongoDB");
    db.close();
  });


  console.log(request.body);
  response.send(request.body);
});


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
