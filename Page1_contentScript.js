
/* if Page 2 */
try {
    document.getElementsByName('agree')[0].click();
} catch (error) {
}

//intervals
var CodeRequest;
var blsRequest;
var jurid;
var popUp;
var blsRequest;

//UI
var btn = null;

chrome.storage.sync.get(['phone', 'juridiction', 'mail', 'code'], function (storage) {

    Fill(storage);
    if (storage.code == '') {
        RequestBLS();
    }else{
        setTimeout(() => {
            document.getElementById('otp').value = storage.code;
            document.getElementsByName('save')[0].click();
            console.log("redirecting");
        }, 10000);
        
    }
});

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
                                $("#reponse_div").html("Appointment dates are not available.");
                                waitForCode(mobileNo);
                            }
                            else if (response.trim() == "fail") {
                                $("#reponse_div").html("You have already booked appointment with this phone. Please try with another number.");
                            }
                            else if (response.trim() == "same") {
                                $("#reponse_div").html("Please used last sent verification code.");
                            }
                            else if (response.trim() == "error") {
                                $("#reponse_div").html("Please check your phone number and country code for phone.");
                            }
                            else if (response.trim() == "CSRF Token validation Failed") {
                                $("#reponse_div").html("Token validation Failed! Please refresh your page.");
                            }
                            else if (response.trim() == "pass") {
                                $("#reponse_div").html("Verification code sent to your phone.");
                               
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
    }, 5000);
    btn = document.createElement("BUTTON");
    btn.innerHTML = "Arrêter l'interval";
    btn.style.zIndex = "999999";
    btn.style.top = "150px";
    btn.style.left = "0";
    document.getElementsByClassName('row white')[0].appendChild(btn);
    btn.setAttribute('id', 'btnBridj');
    document.getElementById('btnBridj').onclick = function () { clearInterval(blsRequest); };
}
function waitForCode(mobileNo) {

    if (blsRequest != null) {

        clearInterval(blsRequest);
    }

    CodeRequest = setInterval(() => {
        $.ajax({
            type: "GET",
            url: 'http://embratorie-live.online/check.php?Phone=' + mobileNo,
            crossDomain: true,
            success: function (data) {
                if (data != '0') {
                    clearInterval(CodeRequest);
                    chrome.storage.sync.set({ code: data }, function () {
                        console.log('code is set to ' + data);
                    });
                    location.reload();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('xHR: ' + xhr);
                console.log('ajaxOption: ' + ajaxOptions);
                console.log('thrownError: ' + thrownError);
            }
        });
    }, 500);
}

