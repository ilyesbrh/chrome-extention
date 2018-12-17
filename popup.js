/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

var form = document.forms[0].elements;

for (let index = 0; index < form.length; index++) {
	console.log(form[index]+'\n');
}

$(function(){

	chrome.storage.sync.get(['total','limit'],function(budget){

		$('#total').text(budget.total);
		$('#limit').text(budget.limit);

	});

	$('#spendAmount').click(function(){
		chrome.storage.sync.get(['total','limit'],function(budget){
			var newTotal = 0;
			var limit ;
			if (budget.total){
				newTotal += parseInt(budget.total);
			}
			if (budget.limit){
				limit = parseInt(budget.limit);
			}


			var amount = $('#amount').val();
			if(amount){
				
				if(limit != null && newTotal + parseInt(amount) > limit) {
					
					let notification = {
						type: 'basic',
						iconUrl: 'images/get_started128.png',
						title: 'limit reached!',
						message: 'you passed your limits!'
					}
					chrome.notifications.create('limitNotif',notification);
					return;
				}
				newTotal += parseInt(amount);
				
				chrome.storage.sync.set({'total': newTotal});

				$('#total').text(newTotal);
			}

			$('#amount').val('');
		});
	});
});