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
		document.getElementById('importObj').onclick = importObj;
		INI();
		loadRDV();
	}
};
function loadRDV() {

	var x = document.getElementById("selectRDV");

	x.onchange = function (params) {
		loadRdvInfo(x.value);
	};

	for (let index = 0; index < RDV.length; index++) {
		const element = RDV[index];
		var option = document.createElement("option");
		option.text = element.name;
		option.value = index;
		x.add(option);
	}

	loadRdvInfo(x.value);

}
function loadRdvInfo(index) {
	const element = RDV[index];

	document.getElementById('Dphone').innerText = element.phone;
	document.getElementById('Dmail').innerText = element.mail;
	document.getElementById('Djuridiction').innerText = element.juridiction;

	document.getElementById('DfirstName').innerText = element.firstName;
	document.getElementById('DlastName').innerText = element.lastName;
	document.getElementById('Dbirth').innerText = element.birth;
	document.getElementById('DpassNumber').innerText = element.passNumber;
	document.getElementById('DissueDate').innerText = element.issueDate;
	document.getElementById('DexpiryDate').innerText = element.expiryDate;
	document.getElementById('DissuePlace').innerText = element.issuePlace;
}

function INI() {
	chrome.storage.sync.get(['name', 'phone', 'juridiction', 'mail', 'code'], function (storage) {
		console.log(storage);
		document.getElementById('name').value = storage.name;
		document.getElementById('phone').value = storage.phone;
		if (storage.juridiction == '04')
			document.getElementById('color-3').checked = true;
		else
			document.getElementById('color-2').checked = true;

		document.getElementById('mail').value = storage.mail;

		document.getElementById('code').value = storage.code;

	});
	chrome.storage.sync.get(['firstName', 'lastName', 'birth', 'passNumber', 'issueDate', 'expiryDate', 'issuePlace'], function (storage) {
		console.log(storage);

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
		code: document.getElementById('code').value,
		name: document.getElementById('name').value,
		phone: document.getElementById('phone').value,
		mail: document.getElementById('mail').value
	}, function (params) {
		console.log(params);
	});

	if (document.getElementById('color-3').checked == true)
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
function importObj() {

	try {
		var x = document.getElementById("selectRDV");
		var objt = RDV[x.value];
		console.log(objt);
		console.log('saving');

		chrome.storage.sync.set({
			firstName: objt.firstName,
			lastName: objt.lastName,
			birth: objt.birth,
			passNumber: objt.passNumber,
			issueDate: objt.issueDate,
			expiryDate: objt.expiryDate,
			issuePlace: objt.issuePlace,
			code: objt.code,
			name: objt.name,
			phone: objt.phone,
			mail: objt.mail
		}, function (params) {
		});

		if (objt.juridiction == "Alger")
			chrome.storage.sync.set({ juridiction: "04" });
		else
			chrome.storage.sync.set({ juridiction: "31" });

		Alert(true);

		console.log('saved');

	} catch (error) {
		Alert(false);
	}
}
function Alert(params) {
	var x = document.getElementById("Alert");
	if (params) {
		document.getElementById("alert-msg").innerHTML = "Imported Successfuly!";
	} else {
		document.getElementById("alert-msg").innerHTML = "Fail to Import Data!";
	}
	x.style.display = "block";

	setTimeout(() => {
		x.style.display = "none";
	}, 6000);
}

