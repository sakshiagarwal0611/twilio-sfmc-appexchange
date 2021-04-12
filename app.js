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
const { json } = require('body-parser');
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

                                          var urlmap={};  
                                          var URLarr = response.body.items;                                        
                                          console.log("Stringify array of response----->" + JSON.stringify(URLarr));                                         
                                          for(var jsonArr in  URLarr)
                                          {
                                            var json = {
                                            type:URLarr[jsonArr].assetType.displayName,
                                            filename:URLarr[jsonArr].fileProperties.fileName
                                          }
                                            urlmap[URLarr[jsonArr].fileProperties.publishedURL] = json;            
                                          }
                                          console.log("url map" + JSON.stringify(urlmap));                                 
                                          res.json({urlmap:urlmap});
                                         
                                          });
  });       
  }); 






  app.post("/messagingID", (req, res) => {

   console.log('Retrieve Messaging service ID');
   console.log("accountSID----------------->" +   req.body.accountSID);
   console.log("authToken----------------->" +   req.body.authToken);
   var map = {} ;

    const client = require('twilio')(req.body.accountSID,req.body.authToken);
    client.messaging.services
                .list({limit: 20})
                .then((services)=>
                  { 
                    console.log(services);
                    for(var i in  services){
                      console.log(services[i].sid);
                      console.log(services[i].friendlyName);
                      map[services[i].sid] = services[i].friendlyName ;

                    }
                    console.log(JSON.stringify(map));
                  //   services.forEach(createMap);
                  //   function createMap(s){
                  //   var id = s.sid;
                  //   var name = s.friendlyName;

                  //   map[id] = name ;
                  // }
                  // console.log("MSID map" + JSON.stringify(map));
                  // console.log("this is a map");
                  });
               

                
    console.log("call to twilio complete");
    res.json({map:map});
        
  });
 
  
http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});


