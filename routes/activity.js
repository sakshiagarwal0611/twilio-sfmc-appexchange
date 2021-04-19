'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');
const axios = require('axios');

var sms_Ek;
var whatsapp_Ek;
var smsCheck;
var whatsappCheck; 
var journeyName;
var DE_name;
var EK_name;
//var checkCondition = true; 

exports.logExecuteData = [];

function logData(req) 
{
    exports.logExecuteData.push
    ({
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

    console.log("Publish: "+ req.body.interactionKey);
    var interactionKey = req.body.interactionKey;
    var versionInt = req.body.interactionVersion;


    var currentdate = new Date();
    console.log("Current date-----" + currentdate);
    var datetime = currentdate.getDate() + "-" + currentdate.getMonth()+ "-" + currentdate.getFullYear() +"-"+ currentdate.getHours() + "-" + currentdate.getMinutes() + "-" + currentdate.getSeconds();      
    console.log("The date time of DE creation is--->" + datetime);


    /*var journeyResponse =  journeydataApi(interactionKey);
    var smsCheck = journeyResponse.smsCheck;
    var whatsappCheck = journeyResponse.whatsappCheck;
    console.log(smsCheck);
    console.log(whatsappCheck);*/

    //API call to get the authorization token and retrieve the journey data using interaction key
    //let response = marketingCloudCallout();

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
        console.log("access_token Publish------>" + access_token);
        console.log("Response Publish------->"+response);
        console.log("Error Publish----->"+error);
        console.log("-----------------we are calling the APi to fetch the journey data-----------------");

        request.get({
        headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
        url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/interaction/v1/interactions/key:' + interactionKey,
        json: true
        },function(error, response, body){
            console.log("requestId---------->"+body.requestId);
            console.log("response--------->"+response);
            console.log("error-------->"+error);  
            smsCheck = body.activities[0].arguments.execute.inArguments[0].SMS;
            whatsappCheck = body.activities[0].arguments.execute.inArguments[0].WhatsApp;
            console.log("smsCheck--------->"+smsCheck);
            console.log("whatsappCheck-------->"+whatsappCheck);
            journeyName = body.name;
            console.log("This is journey name------>" + journeyName);
            DE_name = journeyName + '-Tracking data-' +versionInt;
            console.log("DE_name" +DE_name);
     
            EK_name = journeyName + 'TrackingData' + versionInt;
            sms_Ek = EK_name;
            console.log("EK_name" +  EK_name);


            const https = require('https');
            console.log("we are trying to get the authorization token here for SMS");
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
    
            // var DE_name = journeyName + '-Tracking data-' +versionInt;
             console.log("DE_name" +DE_name);
     
            // var EK_name = journeyName + 'TrackingData' + versionInt;
            // sms_Ek = EK_name;
             console.log("EK_name" +  EK_name);
             console.log("journeyName" +  journeyName);
            
             
            var request = require('request');
            var options = 
            {
            'method': 'POST',
            'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
            'headers': { 'Content-Type': 'text/xml','SoapAction': 'Create'},
body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">          \r\n<soapenv:Header>  <fueloauth>' + access_token + '</fueloauth> </soapenv:Header>   \r\n\r\n<soapenv:Body>    \r\n<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">      \r\n<Options/>\r\n<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">     \r\n      \r\n<CustomerKey>' + EK_name + '</CustomerKey>            \r\n<Name>' + DE_name + '</Name>\r\n<Description>Stores the WhatsApp tracking data.</Description><IsSendable>true</IsSendable>         \r\n<IsTestable>false</IsTestable> \r\n<Fields>\r\n<Field xsi:type="ns2:DataExtensionField">                  \r\n<CustomerKey>Sid</CustomerKey>                   \r\n<Name>Sid</Name>                 \r\n<Label>Sid</Label>                  \r\n <IsRequired>true</IsRequired>                  \r\n <IsPrimaryKey>true</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                  \r\n<MaxLength>200</MaxLength>               \r\n</Field>             \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                    <CustomerKey>From</CustomerKey>                \r\n <Name>From</Name>               \r\n<Label>From</Label>                 \r\n <IsRequired>false</IsRequired>                  \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n<FieldType>Text</FieldType>                  \r\n<MaxLength>100</MaxLength>              \r\n</Field>             \r\n\r\n\r\n <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Status</CustomerKey>                    <Name>Status</Name>                 \r\n <Label>Status</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>To</CustomerKey>                    <Name>to</Name>                 \r\n <Label>to</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Direction</CustomerKey>                    <Name>Direction</Name>                 \r\n <Label>Direction</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ErrorCode</CustomerKey>                    <Name>ErrorCode</Name>                 \r\n <Label>ErrorCode</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>errorMessage</CustomerKey>                    <Name>errorMessage</Name>                 \r\n <Label>errorMessage</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>\r\n <FieldType>Text</FieldType>\r\n <MaxLength>400</MaxLength> \r\n</Field>  <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Channel</CustomerKey>                    <Name>Channel</Name>                 \r\n <Label>Channel</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ActivityID</CustomerKey>                    <Name>ActivityID</Name>                 \r\n <Label>ActivityID</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ActivityName</CustomerKey>                    <Name>ActivityName</Name>                 \r\n <Label>ActivityName</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>numMedia</CustomerKey>                    <Name>numMedia</Name>                 \r\n <Label>numMedia</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>40</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>messagingServiceSid</CustomerKey>                    <Name>messagingServiceSid</Name>                 \r\n <Label>messagingServiceSid</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>100</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>numSegments</CustomerKey>                    <Name>numSegments</Name>                 \r\n <Label>numSegments</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>40</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>price</CustomerKey>                    <Name>price</Name>                 \r\n <Label>price</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>40</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>priceUnit</CustomerKey>                    <Name>priceUnit</Name>                 \r\n <Label>priceUnit</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>40</MaxLength>                \r\n</Field>  \r\n  \r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>body</CustomerKey>                    <Name>body</Name>                 \r\n <Label>body</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>4000</MaxLength>                \r\n</Field>  \r\n   \r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>dateCreated</CustomerKey>                    <Name>dateCreated</Name>                 \r\n <Label>dateCreated</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>40</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>dateUpdated</CustomerKey>                    <Name>dateUpdated</Name>                 \r\n <Label>dateUpdated</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>4000</MaxLength>                \r\n</Field>  \r\n\r\n</Fields>\r\n<SendableDataExtensionField>\r\n  \r\n <Name>Sid</Name>\r\n            </SendableDataExtensionField>\r\n <SendableSubscriberField>\r\n <Name>Subscriber Key</Name>\r\n </SendableSubscriberField> \r\n</Objects>\r\n</CreateRequest>\r\n</soapenv:Body></soapenv:Envelope>\r\n'

            //body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">          \r\n<soapenv:Header>  <fueloauth>' + access_token + '</fueloauth> </soapenv:Header>   \r\n\r\n<soapenv:Body>    \r\n<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">      \r\n<Options/>\r\n<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">     \r\n      \r\n<CustomerKey>' + EK_name + '</CustomerKey>            \r\n<Name>' + DE_name + '</Name>            \r\n<Description>Stores the SMS tracking data.</Description><IsSendable>true</IsSendable>         \r\n<IsTestable>false</IsTestable>         \r\n\r\n<Fields>\r\n<Field xsi:type="ns2:DataExtensionField">                  \r\n<CustomerKey>Sid</CustomerKey>                   \r\n<Name>Sid</Name>                 \r\n<Label>Sid</Label>                  \r\n <IsRequired>true</IsRequired>                  \r\n <IsPrimaryKey>true</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                  \r\n<MaxLength>200</MaxLength>               \r\n</Field>             \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                    <CustomerKey>From</CustomerKey>                \r\n <Name>From</Name>               \r\n<Label>From</Label>                 \r\n <IsRequired>false</IsRequired>                  \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n<FieldType>Text</FieldType>                  \r\n<MaxLength>100</MaxLength>              \r\n</Field>             \r\n\r\n\r\n <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Status</CustomerKey>                    <Name>Status</Name>                 \r\n <Label>Status</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>To</CustomerKey>                    <Name>to</Name>                 \r\n <Label>to</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Direction</CustomerKey>                    <Name>Direction</Name>                 \r\n <Label>Direction</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ErrorCode</CustomerKey>                    <Name>ErrorCode</Name>                 \r\n <Label>ErrorCode</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>errorMessage</CustomerKey>                    <Name>errorMessage</Name>                 \r\n <Label>errorMessage</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n    <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Channel</CustomerKey>                    <Name>Channel</Name>                 \r\n <Label>Channel</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ActivityID</CustomerKey>                    <Name>ActivityID</Name>                 \r\n <Label>ActivityID</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ActivityName</CustomerKey>                    <Name>ActivityName</Name>                 \r\n <Label>ActivityName</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field\r\n</Fields>\r\n<SendableDataExtensionField>\r\n               \r\n               <Name>Sid</Name>\r\n            </SendableDataExtensionField>\r\n            <SendableSubscriberField>\r\n               <Name>Subscriber Key</Name>\r\n            </SendableSubscriberField>     \r\n</Objects>\r\n</CreateRequest>\r\n</soapenv:Body></soapenv:Envelope>\r\n'
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
                console.log("Error in api request" + error);
                console.log("Error in api request" + error);
            }); 
        }) 
        });
    }); 
    


//API to create a DE for SMS if checkbox value is true

        //const https = require('https');
        
     


//API to create a DE for WhatsApp if checkbox value is true
// if(whatsappCheck == true)
// {

//     /*var DeWhatsapp = WpDEcreation(whatsappCheck);
//     console.log(" Output2 DeWhatsapp------->" + DeWhatsapp);*/
//     const https = require('https');
//     console.log("we are trying to get the authorization token here for Whatsapp");
//     var request = require('request');
//     request.post({
//     headers: {'content-type' : 'application/json'},
//     url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
//     body:    {
//                'client_id': '4nfraga57ld98tn00rmrhbn9',
//                'client_secret': 'qlm3OG67VzLC6nekeeGo1XY2',
//                'grant_type': 'client_credentials'
// },
//    json: true
// }, function(error, response, body){
// var access_token = body.access_token;
// console.log("Access------>"+body.access_token);
// console.log("access_token------>" + access_token);
// console.log("Response------->"+response);
// console.log("Error----->"+error);


//         var DE_name2 = 'WhatsApp tracking data - ' + versionInt;
//        console.log("DE_name2" + DE_name2);

//        var EK_name2 = 'WhatsAppTrackingData' + versionInt;
//        whatsapp_Ek = EK_name2;
//        console.log("EK_name2" + EK_name2);
       
        
//         var request = require('request');
//         var options = {
//         'method': 'POST',
//         'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
//         'headers': {
//         'Content-Type': 'text/xml',
//         'SoapAction': 'Create'
//         },
//         body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">          \r\n<soapenv:Header>  <fueloauth>' + access_token + '</fueloauth> </soapenv:Header>   \r\n\r\n<soapenv:Body>    \r\n<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">      \r\n<Options/>\r\n<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">     \r\n      \r\n<CustomerKey>' + EK_name2 + '</CustomerKey>            \r\n<Name>' + DE_name2 + '</Name>\r\n<Description>Stores the WhatsApp tracking data.</Description><IsSendable>true</IsSendable>         \r\n<IsTestable>false</IsTestable>         \r\n\r\n<Fields>\r\n<Field xsi:type="ns2:DataExtensionField">                  \r\n<CustomerKey>Sid</CustomerKey>                   \r\n<Name>Sid</Name>                 \r\n<Label>Sid</Label>                  \r\n <IsRequired>true</IsRequired>                  \r\n <IsPrimaryKey>true</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                  \r\n<MaxLength>200</MaxLength>               \r\n</Field>             \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                    <CustomerKey>From</CustomerKey>                \r\n <Name>From</Name>               \r\n<Label>From</Label>                 \r\n <IsRequired>false</IsRequired>                  \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n<FieldType>Text</FieldType>                  \r\n<MaxLength>100</MaxLength>              \r\n</Field>             \r\n\r\n\r\n <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Status</CustomerKey>                    <Name>Status</Name>                 \r\n <Label>Status</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>To</CustomerKey>                    <Name>to</Name>                 \r\n <Label>to</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Direction</CustomerKey>                    <Name>Direction</Name>                 \r\n <Label>Direction</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ErrorCode</CustomerKey>                    <Name>ErrorCode</Name>                 \r\n <Label>ErrorCode</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>errorMessage</CustomerKey>                    <Name>errorMessage</Name>                 \r\n <Label>errorMessage</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>\r\n <FieldType>Text</FieldType>\r\n <MaxLength>400</MaxLength> \r\n</Field>  <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Channel</CustomerKey>                    <Name>Channel</Name>                 \r\n <Label>Channel</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ActivityID</CustomerKey>                    <Name>ActivityID</Name>                 \r\n <Label>ActivityID</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ActivityName</CustomerKey>                    <Name>ActivityName</Name>                 \r\n <Label>ActivityName</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n</Fields>\r\n<SendableDataExtensionField>\r\n  \r\n <Name>Sid</Name>\r\n            </SendableDataExtensionField>\r\n <SendableSubscriberField>\r\n <Name>Subscriber Key</Name>\r\n </SendableSubscriberField> \r\n</Objects>\r\n</CreateRequest>\r\n</soapenv:Body></soapenv:Envelope>\r\n'

//         };
//         request(options, function (error, response) {
//         if (error) throw new Error(error);
//         console.log(response.body);
//         });
//         })  
// }  
   
// This creates DEs


    logData(req);
    res.send(200, 'Save');
};




/*
 * POST Handler for /message reponse/ route of Activity.
 */
exports.messagestatus = function(req,res)
{
    console.log("5 -- For Message Status");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");
	
    
    var req3=req.body;
    console.log("req3"+JSON.stringify(req3));
    var req4=req.body.To;
    console.log("to"+req4);
    res.send(200, 'messagestatus');

};

exports.messageresponse=function(req,res)
{
    console.log(req);
    console.log("messageresponseres"+res);
    console.log("body"+res.body);

    res.send(200, ok);
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
 

    var requestBody = req.body.inArguments[0];
    console.log("RequestBody"+JSON.stringify(requestBody));
    console.log("interaction key" + JSON.stringify(req.body));
    var activityID = req.body.activityObjectID;
    console.log("activityID" + activityID);
    console.log("ActivityName------>" + req.body.keyValue);
    var ActivityName = req.body.keyValue;


    const accountSid = requestBody.accountSid;
    const authToken = requestBody.authToken;
    const to = requestBody.to;
    // const from = requestBody.messagingService;
    const sms =   requestBody.SMS;
    const whatsapp = requestBody.WhatsApp;
    const messagebody = requestBody.MessageBody;
    var smsMessage = requestBody.SmsMessage;
    var wPmessage  = requestBody.WPmessage;
    const imageURL = requestBody.insertedImage ; 
    const email = requestBody.email; 
    const wpMessageType = requestBody.wpMessageType;
    const MSID = requestBody.MSID;
    const fileUrl = requestBody.fileUrl;
    
    console.log(" This is SMS DE--------------------------------------------------->" + sms_Ek);
    console.log(" This is WhatsApp DE--------------------------------------------------->" + whatsapp_Ek);

   

  
    
//If whatsApp is true then send message
    if(whatsapp == true)
    {
// Send sessional message with image
    if(wpMessageType == 'Sessional Message' && fileUrl != "null")  
    {
        console.log('-------------------------This is sessional---------------------'); 
        const client = require('twilio')(accountSid, authToken);
        client.messages
        .create({
            mediaUrl: [fileUrl],
            from: 'whatsapp:+14155238886',
            body: wPmessage,
            to: 'whatsapp:+917790909761'
        },
        function(err, responseData){
        if(!err) {
        console.log(responseData);
            
            
        var accountSid = responseData.accountSid;
        var apiVersion = responseData.apiVersion;
        var messageBodytracking = responseData.body;
        var from = responseData.from;
        var sid = responseData.sid;
        var status = responseData.status;
        var to = responseData.to;
        var direction = responseData.direction;
        var errorCode = responseData.errorCode;
        var errorMessage = responseData.errorMessage;
        var numMedia = responseData.numMedia;
        var messagingServiceSid= responseData.messagingServiceSid;
        var numSegments = responseData.numSegments;
        var price = responseData.price;
        var priceUnit = responseData.priceUnit;
        var dateCreated = responseData.dateCreated;
        var dateUpdated= responseData. dateUpdated;
        
            
        const https = require('https');
        console.log("we are trying to get the authorization token here for whatsapp sessional");
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
}, function(error, response, body)
{
    var access_token = body.access_token;
    console.log("access_token------>" + access_token);
    console.log("Response------->"+ response);
    console.log("Error----->"+error);
    console.log("we are calling out the api to insert row in DE for whatsapp");
        
  
  request.post({
  headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
  url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:'+ sms_Ek +'/rows',
  body:    {
   "items":
[
    {
       // 'accountSid':accountSid,
       // 'apiVersion':apiVersion,
       
        'from': from,
        'sid':sid,
        'status': status,
        'to': to,
        'direction' : direction,
        'errorCode' : errorCode,
        'errorMessage' : errorMessage,
        'Channel': 'WhatsApp',
        'ActivityID': activityID,
        'ActivityName': ActivityName,
        'numMedia':numMedia,
        'messagingServiceSid':messagingServiceSid,
        'numSegments':numSegments,
        'price':price,
        'priceUnit': priceUnit,
        'body':messageBodytracking,
        'dateCreated': dateCreated,
        'dateUpdated':dateUpdated
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
                    
        }else{
            console.log("This is the error in sms-------------------------->" + err);
        } } ); 
        
    }
    else{

//send transactionl message or sessional message without image
        console.log('-------------------------This is transactional---------------'); 
   
        const client = require('twilio')(accountSid, authToken);
        client.messages
        .create({
            from:'whatsapp:+14155238886',
            body: wPmessage,
            to: 'whatsapp:+917790909761'
        },
        function(err, responseData){
        if(!err) {
        console.log(responseData);
            
        var accountSid = responseData.accountSid;
        var apiVersion = responseData.apiVersion;
        var messageBodytracking = responseData.body;
        var from = responseData.from;
        var sid = responseData.sid;
        var status = responseData.status;
        var to = responseData.to;
        var direction = responseData.direction;
        var errorCode = responseData.errorCode;
        var errorMessage = responseData.errorMessage;
        var numMedia = responseData.numMedia;
        var messagingServiceSid= responseData.messagingServiceSid;
        var numSegments = responseData.numSegments;
        var price = responseData.price;
        var priceUnit = responseData.priceUnit;
        var dateCreated = responseData.dateCreated;
        var dateUpdated= responseData. dateUpdated;
    
        
            
        const https = require('https');
        console.log("we are trying to get the authorization token here for whatsapp transactional");
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
     console.log("Response------->"+ response);
     console.log("Error----->"+error);
    console.log("we are calling out the api to insert row in DE");
        
  
 request.post({
  headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
  url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:' + sms_Ek +'/rows',
  body:    {
   "items":
[
    {
        'from': from,
        'sid':sid,
        'status': status,
        'to': to,
        'direction' : direction,
        'errorCode' : errorCode,
        'errorMessage' : errorMessage,
        'Channel': 'WhatsApp',
        'ActivityID': activityID,
        'ActivityName': ActivityName,
        'numMedia':numMedia,
        'messagingServiceSid':messagingServiceSid,
        'numSegments':numSegments,
        'price':price,
        'priceUnit': priceUnit,
        'body':messageBodytracking,
        'dateCreated': dateCreated,
        'dateUpdated':dateUpdated
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
}else{
    console.log("This is the error in sms-------------------------->" + err);
}
});
}   
}
    
//Send SMS
if(sms == true)
{
    console.log("<---------------------------------------------------This message is sent as SMS-------------------------------------------------->");
    const client = require('twilio')(accountSid, authToken);

    client.messaging.services
                .list({limit: 20})
                .then(services => services.forEach(s => console.log("Service id"+s.sid + "Friendly name" + s.friendlyName)));
        client.messages
        .create({
           //from: '+12058914350',
           messagingServiceSid: MSID,
            body: wPmessage,
            //body: "Please enter your order as such:\n" + "- 3 beers\n - 2 glasses of red wine",
            to: '+918114464775'
        },
        function(err, responseData){
        if(!err) {
        console.log(responseData);
    
        var accountSid = responseData.accountSid;
        var apiVersion = responseData.apiVersion;
        var messageBodytracking = responseData.body;
        var from = responseData.from;
        var sid = responseData.sid;
        var status = responseData.status;
        var to = responseData.to;
        var direction = responseData.direction;
        var errorCode = responseData.errorCode;
        var errorMessage = responseData.errorMessage;
        var numMedia = responseData.numMedia;
        var messagingServiceSid= responseData.messagingServiceSid;
        var numSegments = responseData.numSegments;
        var price = responseData.price;
        var priceUnit = responseData.priceUnit;
        var dateCreated = responseData.dateCreated;
        var dateUpdated= responseData. dateUpdated;
        
            
        const https = require('https');
        console.log("we are trying to get the authorization token here for SMS sessional");
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
}, function(error, response, body)
{
    var access_token = body.access_token;
    console.log("access_token------>" + access_token);
    console.log("Response------->"+ response);
    console.log("Error----->"+error);
    console.log("we are calling out the api to insert row in DE for SMS");
        
  
  request.post({
  headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
  url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:'+ sms_Ek +'/rows',
  body:    {
   "items":
[
    {
        'from': from,
        'sid':sid,
        'status': status,
        'to': to,
        'direction' : direction,
        'errorCode' : errorCode,
        'errorMessage' : errorMessage,
        'Channel': 'SMS',
        'ActivityID': activityID,
        'ActivityName': ActivityName,
        'numMedia':numMedia,
        'messagingServiceSid':messagingServiceSid,
        'numSegments':numSegments,
        'price':price,
        'priceUnit': priceUnit,
        'body':messageBodytracking,
        'dateCreated': dateCreated,
        'dateUpdated':dateUpdated
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
                    
        }else {
            console.log("This is the error in sms-------------------------->" + err);
        } } ); 
}
        
logData(req);
res.send(200, 'Execute');
};




/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function(req, res) 
{
//     console.log("checkCondition1" + checkCondition); 
//    if(checkCondition == true)
//    {

    //console.log("checkCondition2" + checkCondition);
    console.log("5 -- For Publish");
    console.log("4");
    console.log("3");
    console.log("2");
    console.log("1");
    console.log("Publish Update 3");





    
// checkCondition = false;
// console.log("checkCondition3" + checkCondition);
// }

// console.log("checkCondition4" + checkCondition);

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
    logData(req);
    res.send(200, 'Validate');
};

/*function journeydataApi(interactionKey)
{
    return new Promise(function (resolve, reject) {
        //do what ever you want
        
    //API call to get the authorization token and retrieve the journey data using interaction key
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
    console.log("access_token Publish------>" + access_token);
    console.log("Response Publish------->"+response);
    console.log("Error Publish----->"+error);
    console.log("-----------------we are calling the APi to fetch the journey data-----------------");

    request.get({
    headers: {'content-type' : 'application/json','Authorization': 'Bearer ' + access_token},
    url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/interaction/v1/interactions/key:' + interactionKey,
    json: true
    }, function(error, response, body)
    {
    console.log("requestId---------->"+body.requestId);
    //console.log("body--------->"+body);
    //console.log("body--------->"+JSON.stringify(body));
    //console.log("body.activities[0]--------->"+body.activities[0].arguments.execute.inArguments[0].SMS);
    //console.log("body.activities[0]--------->"+body.activities[0].arguments.execute.inArguments[0].WhatsApp);
    console.log("response--------->"+response);
    console.log("error-------->"+error);  
    smsCheck = body.activities[0].arguments.execute.inArguments[0].SMS;
    whatsappCheck = body.activities[0].arguments.execute.inArguments[0].WhatsApp ;
    console.log("smsCheck--------->"+smsCheck);
    console.log("whatsappCheck-------->"+whatsappCheck);
    resolve({"smsCheck":smsCheck,"whatsappCheck": whatsappCheck});
});
});
})
};

function smsDEcreation()
{
    return new Promise(function (resolve, reject) {
        //do what ever you want
        const https = require('https');
        console.log("we are trying to get the authorization token here for SMS");
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
    }, function(error, response, body)
    {
        var access_token = body.access_token;
        console.log("Access------>"+body.access_token);
        console.log("access_token------>" + access_token);
        console.log("Response------->"+response);
        console.log("Error----->"+error);
    
            var DE_name = 'SMS tracking data - ' + datetime;
            console.log("DE_name" +DE_name);
     
            var EK_name = 'SmsTrackingData' + datetime;
            sms_Ek = EK_name;
            console.log("EK_name" +  EK_name);
            
             
    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
    'headers': { 'Content-Type': 'text/xml','SoapAction': 'Create'},
    body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">          \r\n<soapenv:Header>  <fueloauth>' + access_token + '</fueloauth> </soapenv:Header>   \r\n\r\n<soapenv:Body>    \r\n<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">      \r\n<Options/>\r\n<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">     \r\n      \r\n<CustomerKey>' + EK_name + '</CustomerKey>            \r\n<Name>' + DE_name + '</Name>            \r\n<Description>Stores the SMS tracking data.</Description><IsSendable>true</IsSendable>         \r\n<IsTestable>false</IsTestable>         \r\n\r\n<Fields>\r\n<Field xsi:type="ns2:DataExtensionField">                  \r\n<CustomerKey>Sid</CustomerKey>                   \r\n<Name>Sid</Name>                 \r\n<Label>Sid</Label>                  \r\n <IsRequired>true</IsRequired>                  \r\n <IsPrimaryKey>true</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                  \r\n<MaxLength>200</MaxLength>               \r\n</Field>             \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                    <CustomerKey>From</CustomerKey>                \r\n <Name>From</Name>               \r\n<Label>From</Label>                 \r\n <IsRequired>false</IsRequired>                  \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n<FieldType>Text</FieldType>                  \r\n<MaxLength>100</MaxLength>              \r\n</Field>             \r\n\r\n\r\n <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Status</CustomerKey>                    <Name>Status</Name>                 \r\n <Label>Status</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>To</CustomerKey>                    <Name>to</Name>                 \r\n <Label>to</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Direction</CustomerKey>                    <Name>Direction</Name>                 \r\n <Label>Direction</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ErrorCode</CustomerKey>                    <Name>ErrorCode</Name>                 \r\n <Label>ErrorCode</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>errorMessage</CustomerKey>                    <Name>errorMessage</Name>                 \r\n <Label>errorMessage</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n         \r\n</Fields>\r\n<SendableDataExtensionField>\r\n               \r\n               <Name>Sid</Name>\r\n            </SendableDataExtensionField>\r\n            <SendableSubscriberField>\r\n               <Name>Subscriber Key</Name>\r\n            </SendableSubscriberField>     \r\n</Objects>\r\n</CreateRequest>\r\n</soapenv:Body></soapenv:Envelope>\r\n'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  resolve(response.body);
});
})      
})
};

function WpDEcreation()
{
    return new Promise(function (resolve, reject) {
        //do what ever you want
        const https = require('https');
        console.log("we are trying to get the authorization token here for Whatsapp");
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
    
    
            var DE_name2 = 'WhatsApp tracking data - ' + datetime;
           console.log("DE_name2" + DE_name2);
    
           var EK_name2 = 'WhatsAppTrackingData' + datetime;
           whatsapp_Ek = EK_name2;
           console.log("EK_name2" + EK_name2);
           
            
            var request = require('request');
            var options = {
            'method': 'POST',
            'url': 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
            'headers': {
            'Content-Type': 'text/xml',
            'SoapAction': 'Create'
            },
            body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">          \r\n<soapenv:Header>  <fueloauth>' + access_token + '</fueloauth> </soapenv:Header>   \r\n\r\n<soapenv:Body>    \r\n<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">      \r\n<Options/>\r\n<Objects xsi:type="ns2:DataExtension" xmlns:ns2="http://exacttarget.com/wsdl/partnerAPI">     \r\n      \r\n<CustomerKey>' + EK_name2 + '</CustomerKey>            \r\n<Name>' + DE_name2 + '</Name>            \r\n<Description>Stores the SMS tracking data.</Description><IsSendable>true</IsSendable>         \r\n<IsTestable>false</IsTestable>         \r\n\r\n<Fields>\r\n<Field xsi:type="ns2:DataExtensionField">                  \r\n<CustomerKey>Sid</CustomerKey>                   \r\n<Name>Sid</Name>                 \r\n<Label>Sid</Label>                  \r\n <IsRequired>true</IsRequired>                  \r\n <IsPrimaryKey>true</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                  \r\n<MaxLength>200</MaxLength>               \r\n</Field>             \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                    <CustomerKey>From</CustomerKey>                \r\n <Name>From</Name>               \r\n<Label>From</Label>                 \r\n <IsRequired>false</IsRequired>                  \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n<FieldType>Text</FieldType>                  \r\n<MaxLength>100</MaxLength>              \r\n</Field>             \r\n\r\n\r\n <Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Status</CustomerKey>                    <Name>Status</Name>                 \r\n <Label>Status</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>To</CustomerKey>                    <Name>to</Name>                 \r\n <Label>to</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field>  \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>Direction</CustomerKey>                    <Name>Direction</Name>                 \r\n <Label>Direction</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>ErrorCode</CustomerKey>                    <Name>ErrorCode</Name>                 \r\n <Label>ErrorCode</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n\r\n<Field xsi:type="ns2:DataExtensionField">                   <CustomerKey>errorMessage</CustomerKey>                    <Name>errorMessage</Name>                 \r\n <Label>errorMessage</Label>                   \r\n <IsRequired>false</IsRequired>                   \r\n <IsPrimaryKey>false</IsPrimaryKey>                   \r\n <FieldType>Text</FieldType>                   \r\n <MaxLength>400</MaxLength>                \r\n</Field> \r\n         \r\n</Fields>\r\n<SendableDataExtensionField>\r\n               \r\n               <Name>Sid</Name>\r\n            </SendableDataExtensionField>\r\n            <SendableSubscriberField>\r\n               <Name>Subscriber Key</Name>\r\n            </SendableSubscriberField>     \r\n</Objects>\r\n</CreateRequest>\r\n</soapenv:Body></soapenv:Envelope>\r\n'
    
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            });
            })      
    })
};*/

/*const marketingCloudCallout = async () => {
    try {
        const tokenResponse = await axios.post('https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token?Content-Type=application/json', {
            "grant_type" : "client_credentials",
            "client_id" : "4nfraga57ld98tn00rmrhbn9",
            "client_secret" : "qlm3OG67VzLC6nekeeGo1XY2"
        });
        console.log('tokenResponse:',tokenResponse);
        access_token = tokenResponse.body.access_token;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        };
        console.log('config: ',config);
        var response = await axios.get('https://mcvm2tq6mhhdt-mf62ghyvq04vt4.rest.marketingcloudapis.com/messaging/v1/messageDefinitionSends/key:17909/send', config);
        console.log('response:',response);
        return response;
    } catch (error) {
        return error;
    }
}*/

