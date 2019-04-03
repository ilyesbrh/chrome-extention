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

    console.log(request.message);

    if (request.message == 'GetCode') {

        clearInterval(CodeRequest);
        CodeRequest = null;
        CodeRequest = setInterval(function () {

            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'https://whispered-student.000webhostapp.com/check.php?Phone=' + request.mobileno, true);
            xhr.onreadystatechange = function () {
                console.log('state changed');
                if (xhr.readyState == 4) {
                    // WARNING! Might be injecting a malicious script!
                    console.log('code Getted' + ' ' + xhr.responseText);
                    if (xhr.responseText != '0' && xhr.responseText != '') {
                        chrome.storage.sync.set({ code: xhr.responseText }, function () {
                            console.log('code is set to ' + xhr.responseText);
                        });
                        chrome.tabs.query({}, function (tabs) {
                            //Send Code to all tabs in browser (bah tadmon bli kamel wsalhom code)
                            tabs.forEach(tab => {
                                chrome.tabs.sendMessage(tab.id, { message: 'SetCode', PhoneCode: xhr.responseText });
                            });
                        });
                        clearInterval(CodeRequest);
                        CodeRequest = null;
                    }
                }
            };
            xhr.send();
        }, 1000);

    }
    else if (request.message == 'GetServerStats') {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://whispered-student.000webhostapp.com/check.php?Phone=123', true);
        xhr.onreadystatechange = function () {
            console.log('state changed');
            if (xhr.readyState == 4 && xhr.status == 200) {
                // WARNING! Might be injecting a malicious script!
                console.log('server Live');
                chrome.runtime.sendMessage({
                    msg: "Stats",
                    data: true
                });
            } else {
                chrome.runtime.sendMessage({
                    msg: "Stats",
                    data: false
                });
            }
        };
        xhr.send();

    } else if (request.message == 'GetServerCode') {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://whispered-student.000webhostapp.com/check.php?Phone=' + request.phone, true);
        xhr.onreadystatechange = function () {
            console.log('state changed');
            if (xhr.readyState == 4 && xhr.status == 200) {
                // WARNING! Might be injecting a malicious script!
                console.log('server Live');
                chrome.runtime.sendMessage({
                    msg: "code",
                    data: xhr.responseText
                });
            } else {
                chrome.runtime.sendMessage({
                    msg: "code",
                    data: null
                });
            }
        };
        xhr.send();

    }

});

