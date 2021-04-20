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
    console.log(req.body);

    var url = require('url');
    var address =  req.url;
    var q = url.parse(address, true);
    console.log(q);
console.log(q.host); 
console.log(q.pathname); 
console.log(q.search);
var qdata = q.query; 
var Body = qdata.Body; 
var Tonumber = qdata.To; 
var SmsMessageSid=qdata.SmsMessageSid;
var SmsSid=qdata.SmsSid;

    console.log("Data" +Body +  Tonumber + SmsMessageSid + SmsSid);

};


exports.login = function( req, res ) {
    console.log( 'req.body: ', req.body ); 
    res.redirect( '/' );
};

exports.logout = function( req, res ) {
    req.session.token = '';
};