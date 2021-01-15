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
    var eventDefinitionKey;
   
    var keyArray = [];
    
    
    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);
    
    connection.on('requestedInteraction', function(settings){
    eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
        console.log( " eventDefinitionKey----->" + eventDefinitionKey);
});
    connection.on('requestedSchema', function (data) {
   // save schema
   console.log('*** Schema ***', JSON.stringify(data['schema']));
        var attributeArray = data.schema ;
         console.log("Data schema2   " + data.schema);
        console.log("Array of arrtibutes" +  attributeArray);
        for(var attArray in attributeArray)
        {
            
            console.log(attArray);
            var key1 = attributeArray[attArray].key;
            keyArray.push(key1);
           
        }
       // console.log("Data schema   "+data['schema'].key);
        
       
         console.log("Key Array----------->" + keyArray);
       
        
        
        
        console.log(document.getElementById('ps').innerHTML);
        keyArray.forEach(editSelect);
        function editSelect(item, index)
        {
           var keyValue = item ;  
         //var keyValue = 'Event.DEAudience-5d757f2a-5eb5-3833-c1b4-b5504bf6f693.EmailAddress';
            var res = keyValue.split(".");
         document.getElementById('ps').innerHTML +=  '<option value = "{{' + keyValue + '}}">'+ res[2] +'</option>' ; 
        }
         console.log(document.getElementById('ps').innerHTML);
});

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestInteraction');
        connection.trigger('requestSchema');
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
               if (key === 'isimage') {
                    
                    
                    console.log("is there an image inserted?------------------------>" + val);
                    var isimage = val;
                    
                   
                }
                if (key === 'insertedImage') {
                    if(val != 'null'){
                    console.log("insertedImage------------------------>" + val);
                    document.getElementById('image').innerHTML = '<img id= "' + 'insertedSerialNo' + '" style="margin:3px;" src="' + val + '" width="100" height="120"><span class="close" style="float:right;" onclick = "removeimage();">&times;</span></img>';
                    document.getElementById("isInserted").checked = true;
                }
                   
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
                var wpsms = $("#WhatsApp").is(":checked"); 
                if(wpsms != true)
                { 
                    document.getElementById('myBtn').style.display = "none";
                }else{
                     document.getElementById('myBtn').style.display = "inline";
                }
             
                
               connection.trigger('updateButton', {
                     button: 'back',
                     visible: true
                });
            /*    if (lastStepEnabled) {
                    connection.trigger('updateButton', {
                        button: 'next',
                        text: 'next',
                        visible: true
                    });
                } else {*/
                    connection.trigger('updateButton', {
                        button: 'next',
                        text: 'Done',
                        visible: true
                    });
                
                break;
            case 'step4':
                $('#step4').show();
                 console.log("---------------------------------------------------------------------------------------------------------------->This is step 4");
                 var WPtrue = $("#WhatsApp").is(":checked");
                document.getElementById('channel').innerHTML = ' ';
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
        var smsMessageBody = document.getElementById('RichTextEditor').innerHTML;
        var wPmessage = document.getElementById('RichTextEditor').innerHTML;
        var insertedImage ; 
        var entry = "{{Event." + eventDefinitionKey + ".EmailAddress}}";
        
        
        console.log("Entry source--------->" + eventDefinitionKey);
        console.log("Entry source--------->" + entry);
        console.log("Content of division image" + document.getElementById('image').innerHTML);
        var isimage = $("#isInserted").is(":checked");
        if(isimage == true){
           insertedImage = document.getElementById('insertedSerialNo').src ; 
           }
        else
        { 
            insertedImage = 'null';
        }
        
        console.log("" + insertedImage);
        console.log("Messagebody-------------------------------------------------------------------->" + messagebody);
        
        //convert html formatted message body to plain text
        var plainText = $('<div>').html(smsMessageBody).text();
        console.log("plain text------------------------->" + plainText);
        smsMessageBody = plainText;
        console.log("SMS Message body-------------------------------------------------------------------->" + smsMessageBody);
        
        
        //convert html formatted message body to whatsapp formatted text
        console.log("WhatsApp message------------------->" + wPmessage);
        wPmessage = wPmessage.replaceAll("<b>", "*");
        wPmessage = wPmessage.replaceAll("</b>", "*");
        wPmessage = wPmessage.replaceAll("&nbsp;", " ");
        wPmessage = wPmessage.replaceAll("<div>", "");
        wPmessage = wPmessage.replaceAll("</div>", "");
        wPmessage = wPmessage.replaceAll("<br>", " ");
        wPmessage = wPmessage.replaceAll("<i>", "_");
        wPmessage = wPmessage.replaceAll("</i>", "_");
        wPmessage = wPmessage.replaceAll("<strike>", "~");
        wPmessage = wPmessage.replaceAll("</strike>", "~");
        console.log("WhatsApp message------------------->" + wPmessage);
        
        

        payload['arguments'].execute.inArguments = [{
            "accountSid": accountSid,
            "authToken": authToken,
            "messagingService": messagingService,
            "to": "{{Event." + eventDefinitionKey + ".TwilioNumber}}",//<----This should map to your data extension name and phone number column
            "SMS": sms,
            "email":"{{Event." + eventDefinitionKey + ".EmailAddress}}",
            "WhatsApp": whatsappsms,
            "MessageBody": messagebody,
            "SmsMessage" : smsMessageBody,
            "WPmessage" : wPmessage,
            "insertedImage": insertedImage,
            "isimage": isimage,
            "entrySource" : entry
         
           
        }];

        payload['metaData'].isConfigured = true;

        console.log("Payload on SAVE function Update--------------------------------------------------->: " + JSON.stringify(payload));
        connection.trigger('updateActivity', payload);

    }

});
