/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

"use strict"

console.log("recaptcha exe");

var sid;
sid = setInterval(
    function () {
        if (window.location.href.match(/https:\/\/www.google.com\/recaptcha\/api\d\/anchor/) && $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").length
            && $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").is(':visible') && isScrolledIntoView($("#recaptcha-anchor div.recaptcha-checkbox-checkmark").get(0))) {

            console.log("recaptcha exe");
            $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").click();

            setTimeout(() => {
                try{
                    var script = document.createElement('script');
                    script.innerHTML = 'eval("document.getElementById("otp").value = '+'test'+';")';
                    document.getElementById('body').appendChild(script);
                  
                  }catch(a){}
                console.log("redirecting");
                clearInterval(sid);
            }, 10000);
            
            clearInterval(sid);
        }
    },
    3000);

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
/* if (grecaptcha && grecaptcha.getResponse().length !== 0) {
    document.getElementsByName('ex-b')[0].value = grecaptcha.getResponse();
} */