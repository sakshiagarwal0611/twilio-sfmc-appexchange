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
        { "label": "Enter twilio authentication fields", "key": "step1" },
        { "label": "Select channel", "key": "step2" },
        { "label": "Create Message", "key": "step3" },
        { "label": "Step 4", "key": "step4", "active": false }
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
        
        // Disable the next button if a value isn't selected
      /* $('#select1').change(function() {
            var message = getMessage();
           connection.trigger('updateButton', { button: 'next', enabled: Boolean(message) });

            $('#message').html(message);
     });*/
        
        // Toggle step 4 active/inactive
        // If inactive, wizard hides it and skips over it during navigation
        $('#toggleLastStep').click(function() {
            lastStepEnabled = !lastStepEnabled; // toggle status
            steps[3].active = !steps[3].active; // toggle active

            connection.trigger('updateSteps', steps);
        });

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

                if (key === 'body') {
                    $('#messageBody').val(val);
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
                break;
        }
    }

    function save() {

        var accountSid = $('#accountSID').val();
        var authToken = $('#authToken').val();
        var messagingService = $('#messagingService').val();
        var body = $('#messageBody').val();

        payload['arguments'].execute.inArguments = [{
            "accountSid": accountSid,
            "authToken": authToken,
            "messagingService": messagingService,
            "body": body,
            "to": "{{Contact.Attribute.TwilioV1.TwilioNumber}}" //<----This should map to your data extension name and phone number column
        }];

        payload['metaData'].isConfigured = true;

        console.log("Payload on SAVE function--------------------------------------------------->: " + JSON.stringify(payload));
        connection.trigger('updateActivity', payload);

    }

});
