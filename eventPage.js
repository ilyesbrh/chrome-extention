/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.runtime.onInstalled.addListener(function (details) {

    chrome.storage.sync.set({ code: "" });
    //chrome.storage.sync.set({ phone: "", juridiction: "04", mail: "", code: "" });
    //chrome.storage.sync.set({ firstName: "", lastName: "", birth: "", passNumber: "",issueDate: "",expiryDate :"",issuePlace:"" });
    console.log('chrome extention added');
});

var CodeRequest;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {


    if (request.message == 'GetCode') {

        CodeRequest = setInterval(function () {

            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'http://embratorie-live.online/check.php?Phone=' + request.mobileno, true);
            xhr.onreadystatechange = function () {
                console.log('state changed');
                if (xhr.readyState == 4) {
                    // WARNING! Might be injecting a malicious script!
                    console.log('code Getted' + ' ' + xhr.responseText);
                    if (xhr.responseText != '0' && xhr.responseText != '') {
                        clearInterval(CodeRequest);
                        chrome.storage.sync.set({ code: xhr.responseText }, function () {
                            console.log('code is set to ' + xhr.responseText);
                        });
                        chrome.tabs.query({ }, function (tabs) {
                            //Send Code to all tabs in browser (bah tadmon bli kamel wsalhom code)
                            tabs.forEach(tab => {
                                chrome.tabs.sendMessage(tab.id, { message: 'SetCode', PhoneCode: xhr.responseText });
                            });
                        });
                    }
                }
            };
            xhr.send();
        }, 500);
    }

});

