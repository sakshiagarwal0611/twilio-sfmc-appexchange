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

console.log("Save function is executed successfully");
app.post('/journeybuilder/save/', activity.save );
console.log("Save function is executed successfully");
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
console.log("Publish function is executed successfully");
app.post('/journeybuilder/execute/', activity.execute );
console.log("Execute function is executed successfully");




//----------------------------------------API for authentication and fetching the assets--------------------------------------------------------------------------------------------------
  app.post("/imagesContent", (req, res) => {
  console.log('this is the function called on button click. This function is present in app.js file');
  console.log("trying to fetch the  values");

  //API
  const https = require('https');  
  var request = require('request');
  request.post({
  headers: {'content-type' : 'application/json'},
  url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
  body:    {
        "client_id": "4nfraga57ld98tn00rmrhbn9",
        "client_secret":"qlm3OG67VzLC6nekeeGo1XY2" , 
        "grant_type": "client_credentials"
},
     json: true
}, function(error, response, body){
    var access_token = body.access_token;
    console.log("Access token after assigning it to a variable------------------>"+ access_token);
    console.log("Response---------------------->"+ response);
        var request = require('request');
        request.post({
        headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
        url:'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/asset/v1/content/assets/query',
        body:{
              "query":
                                                                                {
                                                                                  "leftOperand":
                                                                                      {
                                                                                      "property":"assetType.displayName",
                                                                                      "simpleOperator":"equal",
                                                                                      "value": 'image'
                                                                                    },
                                                                                    "logicalOperator":"OR",
                                                                                    "rightOperand":
                                                                                    {
                                                                                        "property":"assetType.displayName",
                                                                                        "simpleOperator":"equal",
                                                                                        "value":"document"
                                                                                    }
                                                                                },
                                                                   "fields": [
                                                                   "name",
                                                                   "assetType",
                                                                   "fileProperties"
                                                                   ]
                                                            },
                                                    json: true
                                        }, function(error, response, body){
                                          //console.log(" JSON.stringify(response.body)--------------------->" + JSON.stringify(response.body));   
                                          //console.log("body--------->"+body);
                                          //console.log("response--------->"+response);
                                          console.log("error-------->"+error);
                                          var arr =[];
                                          var urlmap=new Map();  
 
 
                                          var URLarr = response.body.items;
                                          console.log("Array of URL---------------------------->>>>>>>>>>>>>>>>>" + URLarr);
                                          console.log("Stringify array of response----->" + JSON.stringify(URLarr));
                                          //console.log("Array of URL---------------------------->>>>>>>>>>>>>>>" + URLarr.fileProperties);
                                          for(var jsonArr in  URLarr)
                                          {
                                          var url =  URLarr[jsonArr].fileProperties.publishedURL;
                                          var fileType =  URLarr[jsonArr].assetType.displayName;
                                          console.log("url of image------------->   " + url);
                                          arr.push(url);
                                          map.set(url,fileType); 
                                          }
                                          console.log("url of image------------->   " + arr);
                                          console.log("map with values" + urlmap.get('https://image.s11.sfmc-content.com/lib/fe3811717164047a751476/m/1/49a978ba-5cb5-4d25-b8cf-a763f4db157b.pdf'));
                                          console.log(urlmap.keys());
                                          console.log(urlmap.values());                                       
                                          res.json({urlmap:urlmap});
                                          //var resp= response.toString();
                                          //console.log(" published url list --------------------------------------------------------->" + JSON.stringify(response.body.items.fileproperties.publishedUrl);
                                          //var asset = Platform.Function.ParseJSON(resp);
                                          //var publishedUrl = asset.fileProperties.publishedURL;
                                          //console.log("publishedUrl------------------>" + publishedUrl);
                                          });
  });       
  }); 






  app.post("/messagingID", (req, res) => {

    console.log('Retrieve Messaging service ID');
    var url = require('url');
    var address = req.url;
    var q = url.parse(address, true);
    var qdata = q.query; // returns an object: { type: page, action: 'update',id='5221' }
    var accountsid = qdata.accountsid;
    var authToken = qdata.authToken;


    // const client = require('twilio')(accountsid,authToken);
    // client.messaging.services
    //             .list({limit: 20})
    //             .then(services => services.forEach(s => console.log(s.sid))
    // );
   // res.json({services:services});
        
  });
 
  
http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});


