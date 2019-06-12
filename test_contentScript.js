
/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */



if (false) {
    
    //activate captcha script remotly
    
    setTimeout(function () {
        chrome.runtime.sendMessage('runContentScript');
        //$("#recaptcha-anchor div.recaptcha-checkbox-checkmark").click();
    }, 5000);
    
    //push chrome extentions notification whene action accure
    
    $('#spendAmount').click(function () {
        let notification = {
            type: 'basic',
            iconUrl: 'images/get_started128.png',
            title: 'limit reached!',
            message: 'you passed your limits!'
        }
        chrome.notifications.create('limitNotif', notification);
    });

    var contextMenuItem = {
        "id": "spendMoney",
        "title": "spendMoney",
        "contexts": ["selection"]
    };
    chrome.contextMenus.create(contextMenuItem);
    
    
    /* send message And hanld response in callBack */

    chrome.runtime.sendMessage('test2', function (response) {
        //Alert the message
        //var PhoneCode = response.PhoneNumber;
    });
    
    console.log('work test');
    
    
    /* reload Page every 60 secends */
    
    
    var reload = setInterval(function () {
        
        chrome.runtime.sendMessage('GetPhoneNumber', function (response) {
            //Alert the message
            var PhoneCode = response;
            if (PhoneCode != "") {
                console.log(PhoneCode);
                location.reload();
            }
            else
            reload.clearInterval();
        });
        

    }, 60000);
    
    
    /* on click modifie localDatabase values */

    
    chrome.contextMenus.onClicked.addListener(function (clickData) {
        if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
            if (isInt(clickData.selectionText)) {
                chrome.storage.sync.get(['total', 'limit'], function (budget) {
                    if (budget.total) {
                        let newTotal = parseInt(budget.total) + parseInt(clickData.selectionText);
                        if (newTotal > budget.limit) {
                            let notification = {
                                type: 'basic',
                                iconUrl: 'images/get_started128.png',
                                title: 'limit reached!',
                                message: 'you passed your limits!'
                            }
                            chrome.notifications.create('limitNotif', notification);
                            return;
                        }
                        chrome.storage.sync.set({ 'total': newTotal });
                    } else {
                        chrome.storage.sync.set({ 'total': 0 });
                    }
                });
            }
        }
    });

} else {
    waitForCode('659078581');
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log(request);
    if (request.message == 'SetCode') {

        console.log(request.PhoneCode);
        alert(request.PhoneCode);
        location.reload();

    }

});
function waitForCode(mobileNo) {
    
    console.log('pending server for COde')
    chrome.runtime.sendMessage({ message: 'GetCode', mobileno: mobileNo });
}


var script = document.createElement("script"); script.src = "https://www.google.com/recaptcha/api.js?hl=fr";
document.head.appendChild(script); 
var div = document.createElement("div"); 
div.className = "g-recaptcha"; 
div.setAttribute("data-sitekey", "6LdZfFoUAAAAAPOdnRgCXX22tU0RLOb5kgCyT2Bn"); 
document.getElementById("reponse_div").appendChild(div);