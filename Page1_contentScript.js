/**
 *
 * this work is done by ILIES bourouh :') help me to find a work .i.
 *
 */

/* variables */

var time = 100;//time to refresh if page had error

//intervals

var jurid; // this one for setting jurisdiction id
var popUp; // this one to close popup

/* this section for error's that occur when loading pages */
(function () {
    if (document.title == '502 Bad Gateway') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == '403 Forbidden') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == '504 Gateway Time-out') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Problem loading page') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == '503 Service Temporarily Unavailable') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Service Unavailable') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == '500 Internal Server Error') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Database error') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'FastCGI Error') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'The connection has timed out') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Problemas al cargar la página') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Error 502 (Server Error)!!1') { setTimeout(function () { window.location.reload(true); }, time); }
})();

// code listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('[CODE] ' + request.PhoneCode);
    if (request.message == 'SetCode') {
        location.href = `javascript: 
        $('#otpvr').val('${request.PhoneCode}');
        document.getElementsByName('save')[0].click();
        `;
    }
});

/* this is the main event that trigger myMain function */
// he only start when page fully loaded 
window.addEventListener("load", myMain, false);

/**
 * @description the main function barely all logic is here
 * @param {*} evt 
 */
function myMain(evt) {

    console.log('[Start] application started');

    if (document.getElementsByClassName('row fontweightNone marginBottomNone').length != 0) {
        location.reload();
    } else {

        /* if page 1 B (Term and conditions page ) */
        if (document.getElementsByName('agree')[0])
            document.getElementsByName('agree')[0].click();
        /* if page 1 A */
        else
            //chrome.runtime.sendMessage({ message: 'startAlarm' });
            /* loading info's */
            chrome.storage.sync.get(['phone', 'juridiction', 'mail', 'code'], function (storage) {

                /* if 'otpvr' exist then page 1 A is open */
                if (!!document.getElementById('otpvr')) {
                    initialize(storage);
                    var regexpP1 = /Please used last sent verification code.|Verification code sent to your phone./g;
                    var isSended = document.body.innerText.search(regexpP1);
                    if (isSended != -1 && storage.code != '') {
                        location.href = 'javascript: $(\'#otpvr\').val(' + storage.code + ');';
                        document.getElementsByName('save')[0].click();
                    }
                    else if (isSended == -1)
                        document.getElementsByName('verification_code')[0].click();

                }
                else
                    location.reload();

            });

    }

}

/**
 * @description initializing all needed input's when website opened
 * @param storage The event.
 * @returns null
 */
function initialize(storage) {
    /* show question */
    location.href = "javascript:showQuestion(); void 0";
    /* setup input's */
    document.getElementById('phone').value = storage.phone;
    document.getElementById('email').value = storage.mail;
    document.getElementById('juridiction').selectedIndex = storage.juridiction; // 04 alger  31 Oran

    document.getElementsByClassName("popup-appCloseIcon")[0].click();

    console.log('[CODE] ' + storage.code);
}

/**
 * too risky to use in first version 
 */
function waitForCode() {
    location.href = `javascript:
                    var intrval = setInterval(() => {
                        if($('#otpvr').val() != "" ){
                            document.getElementsByName('save')[0].click();
                            console.log("[REDIRECT]");
                            clearInterval(intrval);
                        }else{
                            console.log('[WAITING] recaptcha or code not filled yet');
                        }
                    }, 250);`;
}
/**
 * useless function not working anymore
 * @param {*} storage 
 */
function StartRequestInterval(storage) {

    // '15#Algiers#10' or '14#Oran#9' is special for the jurid select in the website

    // set dafault to alger
    let jur = '15#Algiers#10';
    // if juridiction equal to 31 then set value to oran
    if (storage.juridiction == '31')
        jur = '14#Oran#9';


    location.href =
        `javascript: var inter = setInterval(
        function () {
            $().ready(
                function () {
                    $.ajax({
                        type: "GET",
                        url: 'https://algeria.blsspainvisa.com/book_appointment.php',
                        crossDomain: true,
                        success: function (data) {
                            var html = $(data);
                            var newTokken = $('#csrftokenvalue', html).val();
                            console.clear();
                            console.log('[TOKEN] ' +newTokken); 
                            var email = '${storage.mail}';
                            var jurisId = '${jur}'.split('#');
                            var phoneCode = '213'; 
                            var mobileNo = '${storage.phone}';
                            var visa = '';
                            console.log('[MAIL] '+ email);
                            console.log('[NUMBER] '+ mobileNo);
                            console.log('[JURIS] '+ jurisId[1]);
                            $.ajax({
                                type: "POST",
                                data: "gofor=send_mail&email=" + email + "&phone_code=" + phoneCode + "&phone_no=" + mobileNo + "&center_id=" + jurisId[2] + "&visa=" + visa + "&token=" + newTokken, 
                                url: "ajax.php",
                                success: function (response) {
                                    console.log('[RESPONSE] '+response.trim());
                                    if (response.trim() == "full") {
                                        $("#reponse_div").html("full :3");
                                    } else if (response.trim() == "fail") {
                                    } else if (response.trim() == "same") {
                                        clearInterval(inter);
                                        $("#reponse_div").html("code sended");
                                        $(".row.fontweightNone.marginBottomNone").html("same SMS");
                                    } else if (response.trim() == "error") {
                                    } else if (response.trim() == "CSRF Token validation Failed") {
                                    } else if (response.trim() == "pass") {
                                        clearInterval(inter);
                                        $("#reponse_div").html("true");
                                        $(".row.fontweightNone.marginBottomNone").html("SMS sent");
                                    } else {
                                    }
                                }
                            });
                        }, error: function (xhr, ajaxOptions, thrownError) { 
                            console.log('xHR: ' + xhr); 
                            console.log('ajaxOption: ' + ajaxOptions); 
                            console.log('thrownError: ' + thrownError);
                            $("#reponse_div").html("changed");
                        }
                    });
                });
        }, 3000);`;


    setInterval(() => {
        chrome.runtime.sendMessage({ message: 'GetCode', mobileno: storage.phone });
    }, 6000);

    chrome.runtime.sendMessage({ message: 'GetCode', mobileno: storage.phone });
    console.log('starting server');
}


