/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

"use strict"

var sid;

chrome.storage.sync.get(['code'], function (storage) {

    console.log(storage.code);
    if (storage.code != '' && storage.code != undefined && storage.code != null && storage.code != 'undefined') {

        sid = setInterval(
            function () {
                if (window.location.href.match(/https:\/\/www.google.com\/recaptcha\/api\d\/anchor/) && $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").length
                    && $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").is(':visible') && isScrolledIntoView($("#recaptcha-anchor div.recaptcha-checkbox-checkmark").get(0))) {

                    console.log("recaptcha exe");
                    $("#recaptcha-anchor div.recaptcha-checkbox-checkmark").click();

                }
            },
            4000);
    }
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
