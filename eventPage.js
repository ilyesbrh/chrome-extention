/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.runtime.onInstalled.addListener(function (details) {

    chrome.storage.sync.set({ phone: "", juridiction: "04", mail: "", code: "" });
    //chrome.storage.sync.set({ firstName: "", lastName: "", birth: "", passNumber: "",issueDate: "",expiryDate :"",issuePlace:"" });
    console.log('chrome extention added');
});


