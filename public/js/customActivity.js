define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var payload = {};
    var payload1 = {};
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
    var phoneArray = [];
    var selectedPhone; 
    var phoneArray2 = [];
    
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
            var phoneValue = attributeArray[attArray].type;
            if(phoneValue == 'Phone')
            {
              phoneArray.push(key1);  
            }
            keyArray.push(key1);
           
        }
       // console.log("Data schema   "+data['schema'].key);
        
        
         console.log("Key Array----------->" + keyArray);
         console.log("Phone Array----------->" + phoneArray);
        
        
        console.log(document.getElementById('recipient').innerHTML);
        console.log(document.getElementById('ps').innerHTML);
        
        keyArray.forEach(editSelect);
        phoneArray.forEach(editPhone);
        function editPhone(item, index)
        {
            var phone = item;
            var res1 = phone.split(".");
            document.getElementById('recipient').innerHTML +=  '<option value = "{{' + phone + '}}">'+ res1[2] +'</option>' ; 
        }
        function editSelect(item, index)
        {
           var keyValue = item ;  
         
            var res = keyValue.split(".");
            document.getElementById('ps').innerHTML +=  '<option value = "{{' + keyValue + '}}">'+ res[2] +'</option>' ; 
            var keyValue2 = '{{' + keyValue + '}}';
            phoneArray2.push(keyValue2);
        }
         console.log(document.getElementById('ps').innerHTML);
        //document.getElementById("recipient").value = selectedPhone;
        if(phoneArray2.includes(selectedPhone) == true)
        {
          document.getElementById("recipient").value = selectedPhone;
        }

        
            console.log("Message aarha hai customactivity me");
            var value = $("#messageType").val();
            console.log("#messageType value   : " + value);
            //if(value == "Transactional Message")
            if(value == "Sessional Message")
                {
                    console.log("Sessional message -- . ");
                    $('#template').attr('disabled',true);
                //	$('#template').attr("editable", true);
                document.getElementById("myBtn").style.display  = 'block' ;
               }
            else
                {		
                    console.log("Transactional message -- . ");
                    $('#template').attr('disabled',false);
                //    $("#myBtn").remove();  
                document.getElementById("myBtn").style.display =  'none';	
                
                }
            
            var whatsappsms = $("#WhatsApp").is(":checked");  
            if(whatsappsms == false)
            {
                document.getElementById("wholeDiv").style.display = "none";
            }
            else
            {
                document.getElementById("wholeDiv").style.display = "block";
            }
        


        
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
                if (key === 'MessageBody'){
                    
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
                  var whatsappsms = $("#WhatsApp").is(":checked");  
		        //var url = 'url';
		        if(whatsappsms == true)
                       
                    {
			    var x = document.getElementById('imageinserted') ;
			    x.style.display = "block";

			    //summaryImage.style.display = "block";
                           document.getElementById('imageinserted').innerHTML ='<img style="margin:3px;" src="' + val + '" width="100" height="120"></img>';
                    }
                }
                   
                }
                if(key === 'to')
                {
                    //var phone = val.split(".");
                    //document.getElementById("recipient").value = phone ;
                   // var ph1 = phone[2];
                    //console.log("set value of phone--->   " + phone[2]);
                    //ph1 = ph1.replaceAll("}", "");
                    //console.log("set value of phone--->   " + phone[2]);
                    //var phone = val.replaceAll("}", "")
                    selectedPhone = val; 
                    //document.getElementById("recipient").value = "phone";
                }
		        if(key === 'smsDEcheck')
                {
		            if(val == true)
                    {
                     $("#smsDEcheckbox").attr("checked", true);
                         console.log(" sms de created is checked");   
                    }else {
			        $("#smsDEcheckbox").attr("checked", false);
                         console.log(" sms de created is not checked");  
		            }	
		            }
		        if (key === 'wpMessageType') 
                {
                    console.log("Whatsapp message type------------------------>" + val);
		            document.getElementById("messageType").value = val;  
                }
		        if (key === 'template') {
                    console.log("Template selected------->" + val);
		            document.getElementById("template").value = val;
                }
                if(key === 'charCount'){
                    console.log("character count------------>" + val);
                    document.getElementById("char-count").textContent = val;
                    if (val > 160 && val<1600){
                        document.getElementById("limitsms").style.display = "block";
                        document.getElementById("limitWhatsapp").style.display = "none";
                       }
                       else if(val > 1600)
                       {
                       document.getElementById("limitsms").style.display = "block";
                       document.getElementById("limitWhatsapp").style.display = "block";
                       }
                       else
                       {
                        document.getElementById("limitsms").style.display = "none";
                        document.getElementById("limitWhatsapp").style.display = "none";
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
        var errorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please fill Account SID and Auth Token </h2> </div>';
        var checkboxerrorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please select atleast one checkbox</h2> </div>';
        var recipienterrorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please select a recipient.</h2> </div>';
        var messageBodyerrorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Message body is empty.</h2></div>';

        if((currentStep.key) === 'step1')
        {
            
          var accountSid = $('#accountSID').val();
          var authToken = $('#authToken').val();
              
              if(!accountSid || !authToken )
              { 
                document.getElementById("error").innerHTML= errorSlds;
                connection.trigger('prevStep');
              }
              else
              {
                document.getElementById("error").innerHTML= "";
                connection.trigger('nextStep');
              }

        }
        else if ( currentStep.key === 'step2')
        {
            var WatsappCheck = $("#WhatsApp").is(":checked");  
            var SmsCheck =  $("#SMS").is(":checked");
            var recipient = $("#recipient").val();
            console.log("Recipient ---- " + recipient);
            console.log("sms-----" +SmsCheck);
            console.log("watsapp------" + WatsappCheck);
            if(WatsappCheck == false && SmsCheck == false)
            {
                document.getElementById("checkboxcheck").innerHTML= checkboxerrorSlds;
                connection.trigger('ready');
            }
            else if(recipient == "None")
            {
                document.getElementById("checkboxcheck").innerHTML= recipienterrorSlds;
                connection.trigger('ready');
            }

            else 
            {
                document.getElementById("checkboxcheck").innerHTML= "";
                document.getElementById("checkboxcheck").innerHTML= "";
                connection.trigger('nextStep');
            }
            
        }
        else if(currentStep.key === 'step3')
        {
            var messagebody1 = document.getElementById('RichTextEditor').innerHTML;
            var smsMsg = messagebody1;
            smsMsg = smsMsg.replaceAll("<b>", "");
            smsMsg = smsMsg.replaceAll("</b>", "");
            
            smsMsg = smsMsg.replaceAll("<i>", "");
            smsMsg = smsMsg.replaceAll("</i>", "");
            smsMsg = smsMsg.replaceAll("<strike>", "");
            smsMsg = smsMsg.replaceAll("</strike>", "");
            smsMsg = smsMsg.replaceAll("<u>", "");
            smsMsg = smsMsg.replaceAll("</u>", "");
            if(messagebody1 == "")
            { 
            document.getElementById("messageBodyNull").innerHTML = messageBodyerrorSlds;
            connection.trigger('ready');
            }else
            {
                document.getElementById("messageBodyNull").innerHTML= "";
                document.getElementById("smsPreview").innerHTML = smsMsg;
                document.getElementById("whatsappPreview").innerHTML = document.getElementById('RichTextEditor').innerHTML;
                connection.trigger('nextStep');
            }

        }
        else if (currentStep.key === 'step4') 
        {
            save();
        }
        

    //    else if ((currentStep.key) === 'step1')
    //    {
    //        console.log( "Account SID KE ANDAR HA" ); 
        //    var accountSid = $('#accountSID').val();
        //    console.log(accountSid);
        //    if(accountSid == null)
        //    {
        //        alert("AccountSid is empty");
        //    }
         //   alert ("Step 1 Next clicked") ;
    //    }
        else {
            
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
                console.log("------------------------------------------------------------------------------------>This is step 3");
		
		
			
                var wpsms = $("#WhatsApp").is(":checked"); 
                var sms = $("#SMS").is(":checked");
                var value1 = $("#messageType").val();
                if(sms == true){
                    document.getElementById('smscol').style.display = "block";
                }else{
                    document.getElementById('smscol').style.display = "none";
                }
                if(wpsms != true || value1 == "Transactional Message")
                { 
                    document.getElementById('myBtn').style.display = "none";
                    document.getElementById('selected').style.display = "none";
                    document.getElementById('image').style.display = "none";
                    document.getElementById('imageinserted').style.display = "none";
                    document.getElementById('wpCol').style.display = "none";
                    
                }else{
                     document.getElementById('myBtn').style.display = "inline";
                    document.getElementById('selected').style.display = "inline";
                    document.getElementById('image').style.display = "block";
                    document.getElementById('imageinserted').style.display = "block";
                    document.getElementById('wpCol').style.display = "block";
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
                  //
                   document.getElementById('selectedPhone').innerHTML = $("#recipient").val();
                
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
        var to = $("#recipient").val();
        //var to =  "{{Contact.Attribute.TwilioDE.TwilioNumber}}"
	    var wpMessageType  = $("#messageType").val(); 
	    var template = $("#template").val();
        var charCount = document.getElementById("char-count").textContent;

        console.log("charCount------>" + charCount);
	    console.log(wpMessageType + template);    
	    console.log("selected phone number attribute---->"+ to);
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
         smsMessageBody = smsMessageBody.replaceAll("&nbsp;", " ");
         smsMessageBody = smsMessageBody.replaceAll("<br>",'\n');
         smsMessageBody = smsMessageBody.replaceAll("<div>",'\n');
        var plainText = $('<div>').html(smsMessageBody).text();
        console.log("plain text------------------------->" + plainText);
        smsMessageBody = plainText;
        console.log("SMS Message body-------------------------------------------------------------------->" + smsMessageBody);
     
        
        //convert html formatted message body to whatsapp formatted text
        console.log("WhatsApp message------------------->" + wPmessage);
        wPmessage = wPmessage.replaceAll("<b>", "*");
        wPmessage = wPmessage.replaceAll("</b>", "*");
        wPmessage = wPmessage.replaceAll("&nbsp;", " ");
        wPmessage = wPmessage.replaceAll("<i>", "_");
        wPmessage = wPmessage.replaceAll("</i>", "_");
        wPmessage = wPmessage.replaceAll("<strike>", "~");
        wPmessage = wPmessage.replaceAll("</strike>", "~");
        wPmessage = wPmessage.replaceAll("<u>", "");
        wPmessage = wPmessage.replaceAll("</u>", "");

        wPmessage = wPmessage.replaceAll("<div>", '\n');
        wPmessage = wPmessage.replaceAll("</div>",'');
        wPmessage = wPmessage.replaceAll("<br>",'\n');
        console.log("WhatsApp message------------------->" + wPmessage);
      
	
	    
        payload['arguments'].execute.inArguments = [{
            "accountSid": accountSid,
            "authToken": authToken,
            "messagingService": messagingService,
            "to": to,
            "SMS": sms,
            "email":"{{Event." + eventDefinitionKey + ".EmailAddress}}",
            "WhatsApp": whatsappsms,
            "MessageBody": messagebody,
            "SmsMessage" : smsMessageBody,
            "WPmessage" : wPmessage,
            "insertedImage": insertedImage,
            "isimage": isimage,
            "wpMessageType" : wpMessageType,
	        "template" : template,
            "charCount":charCount  
        }];

        payload['metaData'].isConfigured = true;

        console.log("Payload on SAVE function Update--------------------------------------------------->: " + JSON.stringify(payload));
	    
        connection.trigger('updateActivity', payload);

    }

});
