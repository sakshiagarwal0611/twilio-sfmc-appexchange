define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [ // initialize to the same value as what's set in config.json for consistency
        { "label": "Twilio Authentication", "key": "step1" },
        { "label": "Select Channel", "key": "step2" },
        { "label": "Create Message", "key": "step3" },
        { "label": "Summary", "key": "step4" }
    ];
    var currentStep = steps[0].key;

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    function initialize(data) {
        console.log("Initializing data data: " + JSON.stringify(data));
        if (data) {
            payload = data;
        }

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log('Has In arguments: ' + JSON.stringify(inArguments));

        $.each(inArguments, function(index, inArgument) {
            $.each(inArgument, function(key, val) {

                if (key === 'accountSid') {
                    $('#accountSID').val(val);
                }

                if (key === 'authToken') {
                    $('#authToken').val(val);
                }

                if (key === 'messagingService') {
                    $('#messagingService').val(val);
                }
                if (key === 'SMS') {
                    console.log("sms---------------->" + val);
                    const boolval = val;
                    console.log("boolval-------------------->" + boolval);
                    if(boolval == true)
                    {
                     $("#SMS").attr("checked", true);
                        console.log("sms is checked");
                    } else{ 
                        $("#SMS").attr("checked", false);
                         console.log("sms is unchecked");
                    }
                   //$('#SMS').val(val);
                }
                if (key === 'WhatsApp') {
                    console.log("WhatsApp---------------->" + val);
                    const boolval = val;
                    console.log("boolval-------------------->" + boolval);
                    if(boolval == true)
                    {
                     $("#WhatsApp").attr("checked", true);
                         console.log(" WA is checked");
                        
                    } else{ 
                        $("#WhatsApp").attr("checked", false);
                        console.log(" WA is unchecked");
                    }

                }
                if (key === 'MessageBody') {
                    
                    console.log("Message body------------------------>" + val);
                    document.getElementById('RichTextEditor').innerHTML = val;
                   
                }
                if (key === 'insertedImage') {
                    
                    console.log("Selected image------------------------>" + val);
                    //document.getElementById('image').innerHTML += '<img style="margin:3px;" src="' + val + '" width="100" height="120">';
                   
                }
            })
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'next',
            visible: true
        });

    }

    function onGetTokens(tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        console.log("Tokens function-------------------------------------------------------------->: " + JSON.stringify(tokens));
        //authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
        console.log("Get End Points function------------------------------------------------------>: " + JSON.stringify(endpoints));
    }
    
    function onClickedNext () {
        if (
            (currentStep.key === 'step3' && steps[3].active === false) ||
            currentStep.key === 'step4'
        ) {
            save();
        } else {
            connection.trigger('nextStep');
        }
    }

    function onClickedBack () {
        connection.trigger('prevStep');
    }

    function onGotoStep (step) {
        showStep(step);
        connection.trigger('ready');
    }

    function showStep(step, stepIndex) {
        if (stepIndex && !step) {
            step = steps[stepIndex-1];
        }

        currentStep = step;

        $('.step').hide();

        switch(currentStep.key) {
            case 'step1':
                $('#step1').show();
                console.log("---------------------------------------------------------------------------------------------------------------->This is step 1");
                 connection.trigger('updateButton', {
                  button: 'next',
                     text: 'next',
                  visible: true
                    //enabled: Boolean(getMessage())
                });
               /* connection.trigger('updateButton', {
                    button: 'back',
                    visible: false
                });*/
                break;
            case 'step2':
                $('#step2').show();
                console.log("---------------------------------------------------------------------------------------------------------------->This is step 2");
              /*  connection.trigger('updateButton', {
                    button: 'back',
                    visible: true
                });*/
               connection.trigger('updateButton', {
                    button: 'next',
                    text: 'next',
                    visible: true
                });
                break;
            case 'step3':
                $('#step3').show();
                console.log("---------------------------------------------------------------------------------------------------------------->This is step 3");
               connection.trigger('updateButton', {
                     button: 'back',
                     visible: true
                });
                if (lastStepEnabled) {
                    connection.trigger('updateButton', {
                        button: 'next',
                        text: 'next',
                        visible: true
                    });
                } else {
                    connection.trigger('updateButton', {
                        button: 'next',
                        text: 'Done',
                        visible: true
                    });
                }
                break;
            case 'step4':
                $('#step4').show();
                 console.log("---------------------------------------------------------------------------------------------------------------->This is step 4");
                 var WPtrue = $("#WhatsApp").is(":checked");
                  if(WPtrue == true){
                  document.getElementById('channel').innerHTML = 'WhatsApp, ';   
                  }
                  var SMStrue = $("#SMS").is(":checked");
                  if(SMStrue == true){
                  document.getElementById('channel').innerHTML = document.getElementById('channel').innerHTML + 'SMS';
                  }
                   
                  document.getElementById('Message').innerHTML = document.getElementById('RichTextEditor').innerHTML;
                break;
        }
    }
    
    

    function save() {

        var accountSid = $('#accountSID').val();
        var authToken = $('#authToken').val();
        var messagingService = $('#messagingService').val();
        var body = $('#messageBody').val();
        var sms = $("#SMS").is(":checked");
        var whatsappsms = $("#WhatsApp").is(":checked");   
        var messagebody = document.getElementById('RichTextEditor').innerHTML;
        var SmsMessageBody = document.getElementById('RichTextEditor').innerHTML;
        var WPmessage = document.getElementById('RichTextEditor').innerHTML;
        var base64 = document.getElementById('64base').innerHTML ;
        var selectedImage = document.getElementById("myImg").src;
        
        console.log("this is base 64 of inserted image" + base64);
        console.log("Messagebody-------------------------------------------------------------------->" + messagebody);
        
        //convert html formatted message body to plain text
        var plainText = $('<div>').html(SmsMessageBody).text();
        console.log("plain text------------------------->" + plainText);
        SmsMessageBody = plainText;
        console.log("SMS Message body-------------------------------------------------------------------->" + SmsMessageBody);
        
        
        //convert html formatted message body to whatsapp formatted text
        console.log("WhatsApp message------------------->" + WPmessage);
        WPmessage = WPmessage.replaceAll("<b>", "*");
        WPmessage = WPmessage.replaceAll("</b>", "*");
        WPmessage = WPmessage.replaceAll("&nbsp;", " ");
        WPmessage = WPmessage.replaceAll("<div>", "");
        WPmessage = WPmessage.replaceAll("</div>", "");
        WPmessage = WPmessage.replaceAll("<br>", " ");
        WPmessage = WPmessage.replaceAll("<i>", "_");
        WPmessage = WPmessage.replaceAll("</i>", "_");
        WPmessage = WPmessage.replaceAll("<strike>", "~");
        WPmessage = WPmessage.replaceAll("</strike>", "~");
        console.log("WhatsApp message------------------->" + WPmessage);
        
        
        

        payload['arguments'].execute.inArguments = [{
            "accountSid": accountSid,
            "authToken": authToken,
            "messagingService": messagingService,
            "to": "{{Contact.Attribute.TwilioV1.TwilioNumber}}",//<----This should map to your data extension name and phone number column
            "SMS": sms,
            "WhatsApp": whatsappsms,
            "MessageBody": messagebody,
            "SmsMessage" : SmsMessageBody,
            "WPmessage" : WPmessage,
            "insertedImage": base64,
            "selectedImage" : selectedImage
        }];

        payload['metaData'].isConfigured = true;

        console.log("Payload on SAVE function--------------------------------------------------->: " + JSON.stringify(payload));
        connection.trigger('updateActivity', payload);

    }

});
