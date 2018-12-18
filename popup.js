/**
 *
 * this work is by ILIES bourouh :') help me to find a work .i.
 *
 */

document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
		// document ready
		document.getElementById('SettingsPage1').onclick = page1Fill;
		document.getElementById('SettingsPage3').onclick = page3Fill;
		INI();
	}
};

function INI() {
	chrome.storage.sync.get(['name', 'phone', 'juridiction', 'mail'], function (storage) {
		console.log(storage);
		document.getElementById('name').value = storage.name;
		document.getElementById('phone').value = storage.phone;
		if (storage.juridiction == '04')
			document.getElementById('color-3').checked = true;
		else
			document.getElementById('color-2').checked = true;

		document.getElementById('mail').value = storage.mail;
	});
	chrome.storage.sync.get(['firstName', 'lastName', 'birth', 'passNumber', 'issueDate', 'expiryDate', 'issuePlace'], function (storage) {
		console.log(storage);
		console.log("this is element" + document.getElementById('firstName'));

		document.getElementById('firstName').value = storage.firstName;
		document.getElementById('lastName').value = storage.lastName;
		document.getElementById('birth').value = storage.birth;
		document.getElementById('passNumber').value = storage.passNumber;
		document.getElementById('issueDate').value = storage.issueDate;
		document.getElementById('expiryDate').value = storage.expiryDate;
		document.getElementById('issuePlace').value = storage.issuePlace;
	});
}

function page1Fill() {

	console.log('saving');
	chrome.storage.sync.set({
		code: "",
		name: document.getElementById('name').value,
		phone: document.getElementById('phone').value,
		mail: document.getElementById('mail').value
	}, function (params) {
		console.log(params);
	});

	if (document.getElementById('color-3').checked == true )
		chrome.storage.sync.set({ juridiction: "04" });
	else
		chrome.storage.sync.set({ juridiction: "31" });

	console.log('saved');
}

function page3Fill() {

	console.log('saving');

	chrome.storage.sync.set(
		{
			firstName: document.getElementById('firstName').value,
			lastName: document.getElementById('lastName').value,
			birth: document.getElementById('birth').value,
			passNumber: document.getElementById('passNumber').value,
			issueDate: document.getElementById('issueDate').value,
			expiryDate: document.getElementById('expiryDate').value,
			issuePlace: document.getElementById('issuePlace').value
		}, function (params) {
			console.log(params);
		});

	console.log('saved');
}