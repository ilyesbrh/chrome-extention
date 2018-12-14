/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

function
    isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (message == "runContentScript") {
        chrome.activeTab.executeScript({
            file: 'rechapcha.js'
        });
    }
    else if (request == 'test') {
        sendResponse({ PhoneNumber: "test123" });
    }
    else {
        
    }
});

