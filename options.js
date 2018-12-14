/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

$(function(){
    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit': limit},function(){
               close(); 
            });
        }
    });

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total': 0},function(){
            let notification = {
                type: 'basic',
                iconUrl: 'images/get_started128.png',
                title: 'Total reset!',
                message: 'total has been reset :('
            }
            chrome.notifications.create('limitNotif',notification);
        });
    });
});