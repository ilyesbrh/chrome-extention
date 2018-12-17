/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.runtime.onInstalled.addListener(function (details) {

    chrome.storage.sync.set({ phone: "659078581", juridiction: " # #10", mail: "ilies.bourouh@univ-bba.dz", code: "" });
    console.log('chrome extention added');
});


