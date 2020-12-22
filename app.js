'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');

var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({type: 'application/json'})); 
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );




//----------------------------------------authentication and get asset API--------------------------------------------------------------------------------------------------
  app.post("/images", (req, res) => {
  console.log('this is the function called on button click. This function is present in app.js file');
  var request = require('request');
  request.post({
  headers: {'content-type' : 'application/json'},
  url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v1/token',
  body:    {
        'client_id': '4nfraga57ld98tn00rmrhbn9',
        'client_secret':'qlm3OG67VzLC6nekeeGo1XY2' , 
        'grant_type': 'client_credentials'
},
     json: true
}, function(error, response, body){
    var access_token = body.access_token;
    console.log("Access token after assigning it to a variable------------------>"+ access_token);
    console.log("Access token------------------>"+ body.access_token);
    console.log("Response---------------------->"+ response);
    
  }
  
  
  )});
//----------------------------------------authentication and get asset API--------------------------------------------------------------------------------------------------

  
  
  http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


