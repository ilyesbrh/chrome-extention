/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('ac31c0012dc8ff3814c8', {
    cluster: 'eu',
    forceTLS: true
});

var channel = pusher.subscribe('sms');

var BASE_URL = 'https://iliesbourouh.000webhostapp.com/';

chrome.runtime.onInstalled.addListener(function (details) {

    chrome.storage.sync.set({ code: "" });
    //chrome.storage.sync.set({ phone: "", juridiction: "04", mail: "", code: "" });
    //chrome.storage.sync.set({ firstName: "", lastName: "", birth: "", passNumber: "",issueDate: "",expiryDate :"",issuePlace:"" });
    console.log('chrome extention added');

    checkExtension();

});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {


    console.log('[MESSAGE]' + request.message);
    var xhr = new XMLHttpRequest();
    switch (request.message) {
        case 'GetCode':
            getcode(request);
            break;
        case 'GetServerStats':
            GetServerStats(xhr);
            break;
        case 'GetServerCode':
            GetServerCode(xhr, request);
            break;
        case 'ClearServerCode':
            ClearServerCode(xhr, request);
            break;
        default:
            break;
    }

});

function checkExtension() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", BASE_URL + 'checkExtention.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // WARNING! Might be injecting a malicious script!
            if (xhr.responseText == '0') {
                alert('nombre instalation depassé ');
                //chrome.management.uninstallSelf({ showConfirmDialog: false }, () => { });
            }
        }
    };
    xhr.onerror = function () {
        try {
            alert.open('error');
        }
        catch (error) { }
        //chrome.management.uninstallSelf({ showConfirmDialog: false }, () => { });
    };
    xhr.send();
}

function ClearServerCode(xhr, request) {
    xhr.open("GET", BASE_URL + 'Delete.php?Phone=' + request.phone, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // WARNING! Might be injecting a malicious script!
            chrome.runtime.sendMessage({
                msg: "cleared",
                data: xhr.responseText
            });
        }
    };
    xhr.send();
}

function GetServerCode(xhr, request) {
    xhr.open("GET", BASE_URL + 'check.php?Phone=' + request.phone, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // WARNING! Might be injecting a malicious script!
            console.log('server Live');
            chrome.runtime.sendMessage({
                msg: "code",
                data: xhr.responseText
            });
        }
    };
    xhr.send();
}

function GetServerStats(xhr) {
    xhr.open("GET", BASE_URL + 'check.php?Phone=123', true);
    xhr.onreadystatechange = function () {
        console.log('state changed');
        if (xhr.readyState == 4 && xhr.status == 200) {
            // WARNING! Might be injecting a malicious script!
            console.log('server Live');
            chrome.runtime.sendMessage({
                msg: "Stats",
                data: true
            });
        }
        else {
            chrome.runtime.sendMessage({
                msg: "Stats",
                data: false
            });
        }
    };
    xhr.send();
}

function getcode(request) {
    channel.unbind();
    channel.bind(request.mobileno + '', function (code) {
        console.log('[CODE] ' + ' ' + code);
        chrome.storage.sync.set({ code: code });
        chrome.tabs.query({}, function (tabs) {
            //Send Code to all tabs in browser (bah tadmon bli kamel wsalhom code)
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, { message: 'SetCode', PhoneCode: code });
            });
            //start alert
            var typeWriter = new Audio("http://soundbible.com/mp3/Police-TheCristi95-214716303.mp3");
            typeWriter.play();
        });
    });
}

