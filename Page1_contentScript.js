
/* if Page 2 */

window.addEventListener("load", myMain, false);

function myMain(evt) {
    console.log('im here');
    
    if (document.getElementsByName('agree')) {
        document.getElementsByName('agree')[0].click();
    }
    else if (document.getElementById('otpvr')) {

        chrome.storage.sync.get(['phone', 'juridiction', 'mail', 'code'], function (storage) {

            Fill(storage);
            if (storage.code == '') {
                //RequestBLS();
                StartRequestInterval();

            } else {
                document.getElementById('otpvr').value = storage.code;
                location.href = `javascript:
                    var intrval = setInterval(() => {
                        var g =grecaptcha.getResponse();
                        if(g != ''){
                            document.getElementsByName('save')[0].click();
                            console.log("redirecting");
                            clearInterval(intrval);
                        }else{
                            console.log('not checked yet');
                        }
                    }, 500);`;

            }
        });
    }
    else {
        location.reload();
    }
}

//intervals
var CodeRequest;
var blsRequest;
var jurid;
var popUp;

//UI
var btn = null;


function StartRequestInterval() {
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
                            console.log(newTokken); 
                            $('#csrftokenvalue').val(newTokken);
                            var email = $('#email').val();
                            var jurisId = $('#juridiction').val().split('#');
                            var phoneCode = $("#phone_code").val(); 
                            var mobileNo = $("#phone").val();
                            var visa = $("#visa_no").val();
                            $.ajax({
                                type: "POST",
                                data: "gofor=send_mail&email=" + email + "&phone_code=" + phoneCode + "&phone_no=" + mobileNo + "&center_id=" + jurisId[2] + "&visa=" + visa + "&token=" + newTokken, 
                                url: "ajax.php",
                                success: function (response) {
                                    console.log(response.trim());
                                    if (response.trim() == "full") {
                                    } else if (response.trim() == "fail") {
                                    } else if (response.trim() == "same") {
                                        $("#reponse_div").html("true");
                                        clearInterval(inter);
                                    } else if (response.trim() == "error") {
                                    } else if (response.trim() == "CSRF Token validation Failed") {
                                    } else if (response.trim() == "pass") {
                                        $("#reponse_div").html("true");
                                        clearInterval(inter);
                                    } else {
                                    }
                                }
                            });
                        }, error: function (xhr, ajaxOptions, thrownError) { 
                            console.log('xHR: ' + xhr); 
                            console.log('ajaxOption: ' + ajaxOptions); 
                            console.log('thrownError: ' + thrownError); 
                        }
                    });
                });
        }, 7000);`;
    waitForCode($("#phone").val());
}

function Fill(storage) {
    location.href = "javascript:showQuestion(); void 0";
    document.getElementById('phone').value = storage.phone;
    document.getElementById('email').value = storage.mail;
    document.getElementById('juridiction').value = storage.juridiction; // alger 15#Algiers#10 Oran 14#Oran#9 
    jurid = setInterval(function () {
        if (document.getElementById('juridiction') != null) {
            document.getElementById('juridiction').selectedIndex = storage.juridiction; // 04 alger  31 Oran
            clearInterval(jurid);
        }
    }, 200);
    popUp = setInterval(function () {
        if (document.getElementsByClassName("popup-appCloseIcon")[0] != null) {
            document.getElementsByClassName("popup-appCloseIcon")[0].click();
            clearInterval(popUp);
        }
    }, 200);
    console.log(storage.code);
}


function waitForCode(mobileNo) {

    blsRequest = setInterval(() => {
        if ($("#reponse_div").html() == 'true') {

            console.log('stop blsRequest');
            chrome.runtime.sendMessage({ message: 'GetCode', mobileno: mobileNo });
            if (blsRequest != null) {
                clearInterval(blsRequest);
            }
        }
    }, 200);
    //sendToAnother();   
}

// code listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log(request);
    if (request.message == 'SetCode') {

        console.log(request.PhoneCode);

        /* location.reload(); */
        document.getElementById('otpvr').value = request.PhoneCode;
        location.href = `javascript:
            var intrval = setInterval(() => {
                var g =grecaptcha.getResponse();
                if(g != ''){
                    document.getElementsByName('save')[0].click();
                    console.log("redirecting");
                    clearInterval(intrval);
                }else{
                    console.log('not checked yet');
                }
            }, 500);`;
    }

});


// usless function, just i cant delete it :')
function sendToAnother() {
    $().ready(function () {
        $.ajax({
            type: "GET",
            url: 'https://algeria.blsspainvisa.com/book_appointment.php',
            crossDomain: true,
            success: function (data) {
                var html = $(data);
                var newTokken = $('#csrftokenvalue', html).val();
                console.log("new tokken:" + newTokken);
                try {
                    var email = "brhilyes3@gmail.com";
                    var jurisId = $('#juridiction').val().split('#');
                    var phoneCode = "213";
                    var mobileNo = "659078581";
                    var visa = "";
                    console.log('values success');
                }
                catch (error) {
                    console.log('values faills');
                }
                $.ajax({
                    type: "POST",
                    data: "gofor=send_mail&email=" + email + "&phone_code=" + phoneCode + "&phone_no=" + mobileNo + "&center_id=" + jurisId[2] + "&visa=" + visa + "&token=" + newTokken,
                    url: "ajax.php",
                    success: function (response) {
                        console.log("send to 7atba");
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    });
}
// old function to request bls token (problem : CORS)
function RequestBLS() {
    blsRequest = setInterval(function () {
        $().ready(function () {
            $.ajax({
                type: "GET",
                url: 'https://algeria.blsspainvisa.com/book_appointment.php',
                crossDomain: true,
                success: function (data) {
                    var html = $(data);
                    var newTokken = $('#csrftokenvalue', html).val();
                    console.log("new tokken:" + newTokken);
                    try {
                        $('#csrftokenvalue').val(newTokken);
                        var email = $('#email').val();
                        var jurisId = $('#juridiction').val().split('#');
                        var phoneCode = $("#phone_code").val();
                        var mobileNo = $("#phone").val();
                        var visa = $("#visa_no").val();
                        console.log('values success');

                    } catch (error) {
                        console.log('values faills');
                    }
                    $.ajax({
                        type: "POST",
                        data: "gofor=send_mail&email=" + email + "&phone_code=" + phoneCode + "&phone_no=" + mobileNo + "&center_id=" + jurisId[2] + "&visa=" + visa + "&token=" + newTokken,
                        url: "ajax.php",
                        crossDomain: true,
                        success: function (response) {
                            console.log(response.trim());

                            if (response.trim() == "full") {
                                $("#reponse_div").html("Appointment dates are not available.");
                            }
                            else if (response.trim() == "fail") {
                                $("#reponse_div").html("You have already booked appointment with this phone. Please try with another number.");
                            }
                            else if (response.trim() == "same") {
                                $("#reponse_div").html("Please used last sent verification code.");
                                waitForCode(mobileNo);
                            }
                            else if (response.trim() == "error") {
                                $("#reponse_div").html("Please check your phone number and country code for phone.");
                            }
                            else if (response.trim() == "CSRF Token validation Failed") {
                                $("#reponse_div").html("Token validation Failed! Please refresh your page.");
                            }
                            else if (response.trim() == "pass") {
                                $("#reponse_div").html("Verification code sent to your phone.");
                                waitForCode(mobileNo);
                            }
                            else {
                                $("#reponse_div").html("Authentication Failed.");
                            }
                        }
                    });
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('xHR: ' + xhr);
                    console.log('ajaxOption: ' + ajaxOptions);
                    console.log('thrownError: ' + thrownError);
                }
            });
        });
    }, 10000);
}
