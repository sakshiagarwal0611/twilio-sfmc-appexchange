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
//var sms ;
//var whatsapp;

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
 app.post("/imagesContent", (req, res) => {
  console.log('this is the function called on button click. This function is present in app.js file');
  console.log("trying to fetch the  values");
  //console.log("request body---->" + req.body);
  //console.log("request body---->" + JSON.stringify(req.body));
  //sms = true;
   //whatsapp = true;
   //console.log(sms);
   //console.log(whatsapp);
    
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
    console.log("Access token------------------>"+ body.access_token);
    console.log("Response---------------------->"+ response);
    
                                        var request = require('request');
                                        request.post({
                                                    headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
                                                    url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/asset/v1/content/assets/query',
                                                    body:    {
                                                               "query":
                                                                                {
                                                                                      "property":"assetType.displayName",
                                                                                      "simpleOperator":"equal",
                                                                                      "value": 'image'
                                                                                },
                                                                   "fields": [
                                                                   "name",
                                                                   "assetType",
                                                                   "fileProperties"
                                                                   ]
                                                            },
                                                    json: true
                                        }, function(error, response, body){
                                       

                                           console.log(" JSON.stringify(response.body)------------------------------------------------------->" + JSON.stringify(response.body));   
                                            console.log("body--------->"+body);
                                            console.log("response--------->"+response);
                                            console.log("error-------->"+error);
                                          var arr =[];
                                          var URLarr = response.body.items;
                                          console.log("Array of URL---------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>." + URLarr);
                                            console.log("Array of URL---------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>." + URLarr.fileProperties);
                                          for(var jsonArr in  URLarr)
                                          {
                                           var url =  URLarr[jsonArr].fileProperties.publishedURL ; 
                                            console.log("url of image------------->   " + url);
                                           arr.push(url);
                                          }
                                          
                                          console.log("url of image------------->   " + arr);
                                          
                                          
                                          res.json({arr:arr});
                                             //var resp= response.toString();
                                             //console.log(" published url list --------------------------------------------------------->" + JSON.stringify(response.body.items.fileproperties.publishedUrl);
                                          //var asset = Platform.Function.ParseJSON(resp);
                                          //var publishedUrl = asset.fileProperties.publishedURL;
                                           //console.log("publishedUrl------------------>" + publishedUrl);
                                          });
    
    
  });
   
  
        
  }); 

//----------------------------------------Dynamic DE creation--------------------------------------------------------------------------------------------------
app.post("/createDE", (req, res) => {
  console.log('This is the function called to create DE dynamically');
    var currentdate = new Date();
     var datetime = currentdate.getDate() + "-" + currentdate.getMonth()+ "-" + currentdate.getFullYear() +"-"+ currentdate.getHours() + "-" + currentdate.getMinutes() + "-" + currentdate.getSeconds();       
     
     var DE_name = 'SMS tracking data - ' + datetime;
            console.log(DE_name);
     
            var EK_name = 'SmsTrackingData' + datetime;
            console.log(EK_name);
  
  
         const https = require('https');
        console.log("we are trying to get the authorization token here");
        var request = require('request');
        request.post({
        headers: {'content-type' : 'application/json'},
        url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
        body:    {
                    'client_id': '4nfraga57ld98tn00rmrhbn9',
                    'client_secret': 'qlm3OG67VzLC6nekeeGo1XY2',
                    'grant_type': 'client_credentials'
    },
        json: true
}, function(error, response, body){
     var access_token = body.access_token;
     console.log("Access------>"+body.access_token);
     console.log("access_token------>" + access_token);
     console.log("Response------->"+response);
     console.log("Error----->"+error);
   
     
    
           
            
             
     var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
  'headers': {
    'Content-Type': 'text/xml',
    'SoapAction': 'Create'
  },
  body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">          \r\n<soapenv:Header>  <fueloauth>' + access_token + '</fueloauth> </soapenv:Header>   \r\n\r\n<soapenv:Body>    \r\n<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">      \r\n<Options/>\r\n<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">     \r\n      \r\n<CustomerKey>' + EK_name + '</CustomerKey>            \r\n<Name>' + DE_name + '</Name>            \r\n<Description>Stores the SMS tracking data.</Description><IsSendable>true</IsSendable>         \r\n<IsTestable>false</IsTestable>         \r\n\r\n<Fields>\r\n<Field xsi:type="ns2:DataExtensionField">                  \r\n<CustomerKey>Sid</CustomerKey>                   \r\n<Name>Sid</Name>                 \r\n<Label>Sid</Label>                  \r\n <IsRequired>true</IsRequired>                  \r\n <IsPrimaryKey>true</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                  \r\n<MaxLength>200</MaxLength>               \r\n</Field>             \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                    <CustomerKey>From</CustomerKey>                \r\n <Name>From</Name>               \r\n<Label>From</Label>                 \r\n <IsRequired>false</IsRequired>                  \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n<FieldType>Text</FieldType>                  \r\n<MaxLength>100</MaxLength>              \r\n</Field>             \r\n\r\n\r\n <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Status</CustomerKey>                    <Name>Status</Name>                 \r\n <Label>Status</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>To</CustomerKey>                    <Name>to</Name>                 \r\n <Label>to</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Direction</CustomerKey>                    <Name>Direction</Name>                 \r\n <Label>Direction</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ErrorCode</CustomerKey>                    <Name>ErrorCode</Name>                 \r\n <Label>ErrorCode</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>errorMessage</CustomerKey>                    <Name>errorMessage</Name>                 \r\n <Label>errorMessage</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n         \r\n</Fields>\r\n<SendableDataExtensionField>\r\n               \r\n               <Name>Sid</Name>\r\n            </SendableDataExtensionField>\r\n            <SendableSubscriberField>\r\n               <Name>Subscriber Key</Name>\r\n            </SendableSubscriberField>     \r\n</Objects>\r\n</CreateRequest>\r\n</soapenv:Body></soapenv:Envelope>\r\n'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
})      

  
  res.json({EK_name:EK_name});
  
});

  
  
  http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


