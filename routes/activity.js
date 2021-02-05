'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');



exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function(req, res) {

    console.log("5 -- For Edit");
    console.log("4");
    console.log("3");
    console.log("2");
    console.log("1");
    //console.log("Edited: "+req.body.inArguments[0]);    

    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function(req, res) {

    console.log("5 -- For Save");
    console.log("4");
    console.log("3");
    console.log("2");
    console.log("1");
    console.log("Save Update");
    //console.log("Saved: "+req.body.inArguments[0]);

    // Data from the req and put it in an array accessible to the main app.
    console.log(req.body);
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function(req, res) {

    console.log("5 -- For Execute");
    console.log("4");
    console.log("3");
    console.log("2");
    console.log("1");
    console.log("Executed: " + req.body.inArguments[0]);

    var requestBody = req.body.inArguments[0];

    const accountSid = requestBody.accountSid;
    const authToken = requestBody.authToken;
    const to = requestBody.to;
   // const from = requestBody.messagingService;
    const sms =   requestBody.SMS;
    const whatsapp = requestBody.WhatsApp;
    const messagebody = requestBody.MessageBody;
    const smsMessage = requestBody.SmsMessage;
    const wPmessage  = requestBody.WPmessage;
    const imageURL = requestBody.insertedImage ; 
    console.log("RequestBody"+JSON.stringify(requestBody));
    const email = requestBody.email; 
    const entrySource = requestBody.entrySource;
    
    var sms_Ek;
    var whatsapp_Ek;
    
    console.log(sms_Ek);
    console.log(whatsapp_Ek);

   // console.log({{Contact.Attribute.TwilioV1.TwilioNumber}});
   // console.log({{Contact.Attribute.TwilioV1.EmailAddress}});
    
    
    
    console.log("Entry source--------->" + entrySource);
   // console.log("imageurl---------------------------------------------------------------------------------->" + imageURL);
    console.log("Original message body with html formatting--------->" + messagebody);
    console.log("Whatsapp message--------------->" + wPmessage);
    console.log("SMS message--------------->" + smsMessage);
    
    
    if(whatsapp == true)
    {
        
        console.log("<---------------------------------------------------This message is sent on whatsApp number of the user--------------------------------------------------->");
        console.log("Whatsapp message----------->" + wPmessage);
        
        
       /* const client = require('twilio')(accountSid, authToken);
        console.log(to);
        client.messages
        .create({
            mediaurl: ImageURL,
            body: "hello there, this is my first whatsapp message",
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+91' + to
        },
        function(err, responseData){
        if(!err) {
        console.log(responseData);
        console.log(responseData.accountSid); 
        console.log(responseData.apiVersion);
        console.log(responseData.body); 
        console.log(responseData.from); 
        console.log(responseData.sid);
        console.log(responseData.status);
        console.log(responseData.to);
        console.log(responseData.direction); 
        console.log(responseData.errorCode); 
        console.log(responseData.errorMessage);
            
            
        var accountSid = responseData.accountSid;
        var apiVersion = responseData.apiVersion;
        var body = responseData.body;
        var from = responseData.from;
        var sid = responseData.sid;
        var status = responseData.status;
        var to = responseData.to;
        var direction = responseData.direction;
        var errorCode = responseData.errorCode;
        var errorMessage = responseData.errorMessage;
        
            
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
     
   //const https = require('https');
    console.log("we are calling out the api to insert row in DE");
   //var request = require('request');
  request.post({
  headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
  url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:36B87A1F-3606-46F2-BDB8-58DF209F1EDF/rows',
  body:    {
   "items":
[
    {
       // 'accountSid':accountSid,
       // 'apiVersion':apiVersion,
       // 'body':body,
       // 'from': from,
          'sid':sid
      //  'status': status,
     //   'to': to
       // 'direction' : direction,
       // 'errorCode' : errorCode,
       // 'errorMessage' : errorMessage
}]
},
     json: true
}, function(error, response, body){
    console.log("requestId---------->"+body.requestId);
    console.log("body--------->"+body);
    console.log("response--------->"+response);
    console.log("error-------->"+error);
   
       
});
});
//console.log("we have inserted the tracking data in to the DE");
                    
        } } ); */
        
       
    
    }
   
    
    
    if(sms == true)
    {
        console.log("<---------------------------------------------------This message is sent as SMS-------------------------------------------------->");
    const client = require('twilio')(accountSid, authToken);
    console.log(to);
    client.messages
        .create({
            body: smsMessage,
            statusCallback: "https://encwq9bqo98l04z.m.pipedream.net/",
            from: '+12058914350',
            to: '+91' + to
        },
          function(err, responseData){
        if(!err) {
        console.log(responseData);
        console.log(responseData.accountSid); 
        console.log(responseData.apiVersion);
        console.log(responseData.body); 
        console.log(responseData.from); 
        console.log(responseData.sid);
        console.log(responseData.status);
        console.log(responseData.to);
        console.log(responseData.direction); 
        console.log(responseData.errorCode); 
        console.log(responseData.errorMessage);
            
            
        var accountSid = responseData.accountSid;
        var apiVersion = responseData.apiVersion;
        var body = responseData.body;
        var from = responseData.from;
        var sid = responseData.sid;
        var status = responseData.status;
        var to = responseData.to;
        var direction = responseData.direction;
        var errorCode = responseData.errorCode;
        var errorMessage = responseData.errorMessage;
        
            
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
     
   //const https = require('https');
    console.log("we are calling out the api to insert row in DE");
   //var request = require('request');
  request.post({
  headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
  url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:'+ sms_Ek +'/rows',
  body:    {
   "items":
[
    {
        'sid':sid,
       // 'accountSid':accountSid,
       // 'apiVersion':apiVersion,
       // 'body':body,
        'from': from,
        'status': status,
        'to': to,
        'direction' : direction,
        'errorCode' : errorCode,
        'errorMessage' : errorMessage
}]
},
     json: true
}, function(error, response, body){
    console.log("requestId---------->"+body.requestId);
    console.log("body--------->"+body);
    console.log("response--------->"+response);
    console.log("error-------->"+error);
   
       
});
});
//console.log("we have inserted the tracking data in to the DE");
                    
        } } );
        
    }
        
    logData(req);
    res.send(200, 'Execute');
};


    // Used to decode JWT
    // JWT(req.body, process.env.jwtSecret, (err, decoded) => {

    //     // verification error -> unauthorized request
    //     if (err) {
    //         console.error(err);
    //         return res.status(401).end();
    //     }

    //     if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {

    //         // decoded in arguments
    //         var decodedArgs = decoded.inArguments[0];

    //         logData(req);
    //         res.send(200, 'Execute');
    //     } else {
    //         console.error('inArguments invalid.');
    //         return res.status(400).end();
    //     }
    // });



/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function(req, res) {

    console.log("5 -- For Publish");
    console.log("4");
    console.log("3");
    console.log("2");
    console.log("1");
    console.log("Publish Update 3");
    //console.log("Published: "+req.body.inArguments[0]);   
    
    
    
   //var requestBody1 = req.body.inArguments[0];
        //console.log("RequestBody"+JSON.stringify(requestBody1));

   //const sms =   requestBody1.SMS;
    //const whatsapp = requestBody1.WhatsApp;
    const sms =   true;
    const whatsapp =   true;
    console.log("SMS----->" + sms );
    console.log("WhatsApp------>" + whatsapp );
    
    if(sms == true)
    {
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
   
     var currentdate = new Date();
     var datetime = currentdate.getDay() + "-" + currentdate.getMonth() + 1 + "-" + currentdate.getFullYear() +""+ currentdate.getHours() + "" + currentdate.getMinutes() + "" + currentdate.getSeconds();       
     
    
            var DE_name = 'SMS tracking data - ' + datetime;
            console.log(DE_name);
     
            var EK_name = 'SmsTrackingData' + datetime;
            console.log(EK_name);
            sms_Ek = EK_name;
            console.log(sms_Ek);
            
             
     var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
  'headers': {
    'Content-Type': 'text/xml',
    'SoapAction': 'Create'
  },
  body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">          \r\n<soapenv:Header>  <fueloauth>' + access_token + '</fueloauth> </soapenv:Header>   \r\n\r\n<soapenv:Body>    \r\n<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">      \r\n<Options/>\r\n<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">     \r\n      \r\n<CustomerKey>' + EK_name + '</CustomerKey>            \r\n<Name>' + DE_name + '</Name>            \r\n<Description>Stores the SMS tracking data.</Description><IsSendable>true</IsSendable>         \r\n<IsTestable>false</IsTestable>         \r\n\r\n<Fields>\r\n<Field xsi:type="ns2:DataExtensionField">                  \r\n<CustomerKey>Sid</CustomerKey>                   \r\n<Name>Sid</Name>                 \r\n<Label>Sid</Label>                  \r\n <IsRequired>true</IsRequired>                  \r\n <IsPrimaryKey>true</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                  \r\n<MaxLength>100</MaxLength>               \r\n</Field>             \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                    <CustomerKey>From</CustomerKey>                \r\n <Name>From</Name>               \r\n<Label>froFromm</Label>                 \r\n <IsRequired>true</IsRequired>                  \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n<FieldType>Text</FieldType>                  \r\n<MaxLength>100</MaxLength>              \r\n</Field>             \r\n\r\n\r\n <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Status</CustomerKey>                    <Name>Status</Name>                 \r\n <Label>Status</Label>                   \r\n <IsRequired>true</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>To</CustomerKey>                    <Name>to</Name>                 \r\n <Label>to</Label>                   \r\n <IsRequired>true</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Direction</CustomerKey>                    <Name>Direction</Name>                 \r\n <Label>Direction</Label>                   \r\n <IsRequired>true</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ErrorCode</CustomerKey>                    <Name>ErrorCode</Name>                 \r\n <Label>ErrorCode</Label>                   \r\n <IsRequired>true</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>errorMessage</CustomerKey>                    <Name>errorMessage</Name>                 \r\n <Label>errorMessage</Label>                   \r\n <IsRequired>true</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n         \r\n</Fields>\r\n<SendableDataExtensionField>\r\n               \r\n               <Name>Sid</Name>\r\n            </SendableDataExtensionField>\r\n            <SendableSubscriberField>\r\n               <Name>Subscriber Key</Name>\r\n            </SendableSubscriberField>     \r\n</Objects>\r\n</CreateRequest>\r\n</soapenv:Body></soapenv:Envelope>\r\n'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
})      
}
    if(whatsapp == true)
    {
        console.log(" This is where we will create a DE for whatsapp tracking data");
          whatsapp_Ek = 'This is the extrenal key for whatsapp';
        
    } 
    
    
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    console.log("Request------------->>>><<<<<<<<<<<<---------------" + req + "------------->>>><<<<<<<<<<<<---------------" );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function(req, res) {

    console.log("5 -- For Validate");
    console.log("4");
    console.log("3");
    console.log("2");
    console.log("1");
    //console.log("Validated: "+req.body.inArguments[0]);       

    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};
