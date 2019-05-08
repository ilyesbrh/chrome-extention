window.addEventListener("load", myMain, false);

function myMain(evt) {
    console.log('Start');

    if (document.getElementsByName('agree')[0]) {
        document.getElementsByName('agree')[0].click();
    }
    else {
        chrome.storage.sync.get(['phone', 'juridiction', 'mail', 'code'], function (storage) {

            if (document.getElementById('otpvr')) {

                Fill(storage);
                if (storage.code == '') {
                    StartRequestInterval(storage);

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
            }
            else {
                if (storage.code == '') {
                    StartRequestInterval(storage);
                }
                else {
                    console.log('error shouldnt get here');
                    location.reload();
                }
            }
        });
    }
}

//intervals
var CodeRequest;
var blsRequest;
var jurid;
var popUp;

//UI
var btn = null;

function StartRequestInterval(storage) {

    let jur = '15#Algiers#10';
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

                            /*var jurisId = '15#Algiers#10'.split('#');
                            var jurisId = '14#Oran#9'.split('#');*/

                            var phoneCode = '213'; 
                            var mobileNo = '${storage.phone}';
                            var visa = '';
                            console.log('[info] '+email+' '+jurisId+' '+mobileNo);
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
        }, 5000);`;
    setInterval(() => {
        chrome.runtime.sendMessage({ message: 'GetCode', mobileno: storage.phone });
    }, 6000);
    console.log('starting server');
    console.log('Do not forget to restart extention');
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
    console.log('[CODE] '+storage.code);
}

// code listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.message == 'SetCode') {
        location.reload();
    }
});
