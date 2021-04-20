'use strict';

// Deps
var activity = require('./activity');

/*
 * GET home page.
 */
exports.index = function(req, res){
    if( !req.session.token ) {
        res.render( 'index', {
            title: 'Unauthenticated',
            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
        });
    } else {
        res.render( 'index', {
            title: 'Journey Builder Activity',
            results: activity.logExecuteData,
        });
    }
};

exports.messageresponse=function(req,res)
{
    console.log(req);
    console.log("messageresponseres"+res);
    console.log("body----->"+res.body);
    console.log("body------>"+req.url);

    var url = require('url');
    var address =  req.url;
    var q = url.parse(address, true);
    console.log(q);
console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/index.php'
console.log(q.search); //returns '?type=page&action=update&id=5221'
var qdata = q.query; // returns an object: { type: page, action: 'update',id='5221' }
 //returns 'page'
var Body = qdata.Body; //returns 'update'
var Tonumber = qdata.To; //returns '5221
  var SmsMessageSid=qdata.SmsMessageSid;
   // var ToCountry=qdata.ToCountry;
   var SmsSid=qdata.SmsSid;

    console.log("Data" +Body +  Tonumber + SmsMessageSid + SmsSid);

    res.send(200, 'ok');
};


exports.login = function( req, res ) {
    console.log( 'req.body: ', req.body ); 
    res.redirect( '/' );
};

exports.logout = function( req, res ) {
    req.session.token = '';
};