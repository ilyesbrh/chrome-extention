/**
 *
 * this work is done by ILIES bourouh :') help me to find a work .i.
 *
 */
var BASE_URL = 'https://iliesbourouh.000webhostapp.com/';

document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
		// document ready
		document.getElementById('SettingsPage1').onclick = page1Fill;
		document.getElementById('SettingsPage3').onclick = page3Fill;
		document.getElementById('load').onclick = loadCode;
		document.getElementById('clear').onclick = clearDB;
		document.getElementById('importObj').onclick = importObj;
		document.getElementById('loadRDV').onclick = loadRDV;
		INI();
		loadRDV();
		loadServerStat();
	}
};

function loadCode() {
	chrome.runtime.sendMessage({ message: 'GetServerCode', phone: document.getElementById('phone').value });
}
function clearDB() {
	chrome.runtime.sendMessage({ message: 'ClearServerCode', phone: document.getElementById('phone').value });
}
function loadServerStat() {
	chrome.runtime.sendMessage({ message: 'GetServerStats' });
}

function loadRDV() {

	var client = document.getElementById("client").value;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", BASE_URL + 'rdv.php?' + 'client=' + client, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			// WARNING! Might be injecting a malicious script!
			if (xhr.response) {
				console.log(JSON.parse(xhr.response)[0]);
				RDV = JSON.parse(xhr.response)[0];
				
				var select = document.getElementById("selectRDV");
				select.onchange = function (params) {
					loadRdvInfo(select.value);
				};
				
				removeAllOptions(select);

				for (let index = 0; index < RDV.length; index++) {
					const element = RDV[index];
					addOption(select,element.rdvName,index);
				}
				
				loadRdvInfo(select.value);

				Alert(true);
			}
		}
	};
	xhr.onerror = function () {
		Alert(false);
	};
	xhr.send();

}

function addOption(select,name,index){
	select.options[select.options.length] = new Option(name, index);
}

function removeOption(){
	var select = document.getElementById("dynamic-select");
	select.options[select.options.length - 1] = null;
}

function removeAllOptions(select){
	select.options.length = 0;
}

function loadRdvInfo(index) {
	const element = RDV[index];

	document.getElementById('name').innerText = element.rdvName;
	document.getElementById('Dphone').innerText = element.phone;
	document.getElementById('Dmail').innerText = element.email;
	document.getElementById('Djuridiction').innerText = element.juridiction;

	document.getElementById('DfirstName').innerText = element.firstName;
	document.getElementById('DlastName').innerText = element.lastName;
	document.getElementById('Dbirth').innerText = element.birth;
	document.getElementById('DpassNumber').innerText = element.passNumber;
	document.getElementById('DissueDate').innerText = element.issueDate;
	document.getElementById('DexpiryDate').innerText = element.expiryDate;
	document.getElementById('DissuePlace').innerText = element.issuePlace;
	document.getElementById('Dvisatype').innerText = type[element.visaType];
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
	chrome.storage.sync.get(['firstName', 'lastName', 'birth', 'passNumber', 'issueDate', 'expiryDate', 'visatype', 'issuePlace'], function (storage) {
		console.log(storage);

		document.getElementById('firstName').value = storage.firstName;
		document.getElementById('lastName').value = storage.lastName;
		document.getElementById('birth').value = storage.birth;
		document.getElementById('passNumber').value = storage.passNumber;
		document.getElementById('issueDate').value = storage.issueDate;
		document.getElementById('expiryDate').value = storage.expiryDate;
		document.getElementById('issuePlace').value = storage.issuePlace;
		document.getElementById('visatype').value = storage.visatype;
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
			visatype: document.getElementById('visatype').value,
			passNumber: document.getElementById('passNumber').value,
			issueDate: document.getElementById('issueDate').value,
			expiryDate: document.getElementById('expiryDate').value,
			issuePlace: document.getElementById('issuePlace').value,
			cphone: document.getElementById('Cphone').value
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
			visatype: objt.visatype,
			expiryDate: objt.expiryDate,
			issuePlace: objt.issuePlace,
			code: objt.code,
			name: objt.rdvName,
			phone: objt.phone,
			mail: objt.mail
		}, function (params) {
		});

		if (objt.juridiction == "Alger")
			chrome.storage.sync.set({ juridiction: '04' });
		else
			chrome.storage.sync.set({ juridiction: '31' });

		INI();

		Alert(true);

		console.log('saved');

	} catch (error) {
		Alert(false);
	}
}

// server response listener 

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.msg === "Stats") {
			// set status to live
			StatsAlert(request.data);
		}
		if (request.msg === "cleared") {
			// set status to live
			document.getElementById('code').value = '';
			bottomAlert('Database cleared');
			page1Fill();//save cleared code
		}
		if (request.msg === "code") {
			if (request.data != null && request.data != '0' && request.data != '') {
				document.getElementById('code').value = request.data;
				page1Fill();
				console.log("if");
			} else {
				bottomAlert('No Code in database');
			}
		}
	}
);

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

function bottomAlert(msg) {
	var x = document.getElementById("BottomAlert");
	x.innerText = msg;
	x.style.display = "block";
	setTimeout(() => {
		x.style.display = "none";
	}, 1000);
}

function StatsAlert(params) {
	var x = document.getElementById("Stats");
	if (params) {
		document.getElementById("Stats-msg").innerHTML = "Server is Live!";
	} else {
		document.getElementById("Stats-msg").innerHTML = "Server is Down!";
	}
	x.style.display = "block";

	setTimeout(() => {
		x.style.display = "none";
	}, 6000);
}