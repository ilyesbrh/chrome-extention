// ==UserScript==
// @name         page3
// @namespace    http://tampermonkey.net/
// @version      0.141
// @author       misterchou@qq.com
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @include      https://algeria.blsspainvisa.com/appointment.php
// @grant        none
// @run-at document-end
// ==/UserScript==
(function () {
	'use strict';
	console.log("Code start");
	//Preset information
	/*
/* infomation
VisaType:
	28=Tourism
	29=Business
	30=Family Visit
	31=Property Owner
	32=Student
	33=Sports  Cultural  Artistic  Scientific
	34=Mission
	35=Medical Visit
	36=Transit
	37=Residence Permit
	38=Eu Citizens Family Reunification
	39=Family Reunification
	40=Student
	41=Work Permit (Own Account)
	42=Work Permit (Third Party)
passportType：
	Ordinary passport = 01
	Collective passport = 02
	Protection passport = 03
	Diplomatic passport = 04
	Service passport = 05
	Government official on duty =06
	Special passport = 07
	Passport of foreigners = 08
	National laissez-passer = 10
	UN laissez-passer = 11
	Refugee Travel Document (Geneva Convention) = 12
	D. Viaje Apatridas C. New York = 13
	Official passport = 14
	Seaman’s book = 16
	*/
	var
		first_name = "QAMAR",
		last_name = "NAAS ARABAT",
		dateOfBirth = "1994-08-13",
		passportType = "01",
		passport_no = "187467301",
		pptIssueDate = "2018-11-10",
		pptExpiryDate = "2028-11-09",
		PassportIssuePlace = "CHLEF";
	//↑↑↑↑↑↑↑↑↑**************************************↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	var dataTimers = setInterval(bbb, 1000);//Show date box
	var timer = setInterval(aaa, 2000);//Fill in the information
	var submitTimer = setInterval(ccc, 4000);//Application page submission

	function bbb() {
		if ($('#app_date').val() != "") { }
		else {
			$("#app_date").trigger("focus");
			clearInterval(dataTimers);
		}
	}

	//Determine whether a date has been selected

	function aaa() {
		if ($('#app_date').val() == "") {
			clearInterval(dataTimers);
			//Determine if there is an optional date
			if ($(".datepicker-days .day.activeClass").length > 0) {
				//select date
				$(".datepicker-days .day.activeClass")[2].click();
			} else {
				console.log("No available date");
			}
		}

		if ($('#app_date').val() != "") {
			//The date has been booked
			console.log("I have made an appointment and started filling in the information");
			var indexMax = document.getElementById('app_time').length - 5;
			var ei = Math.floor((Math.random() * indexMax) + 0);
			document.getElementById('VisaTypeId').selectedIndex = 1;
			document.getElementById('app_time').selectedIndex = ei;
			document.getElementById('VisaTypeId').value = 44;
			$('#first_name').val(first_name);
			$('#last_name').val(last_name);
			$('#dateOfBirth').val(dateOfBirth);
			$('#passportType').val(passportType);
			$('#passport_no').val(passport_no);
			$('#pptIssueDate').val(pptIssueDate);
			$('#pptExpiryDate').val(pptExpiryDate);
			$('#pptIssuePalace').val(PassportIssuePlace);
			console.log("Information completed");
			clearInterval(timer);
			//clearInterval(dataTimers);
			$(".datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top").hide();
			//submit
		}
	}
	function ccc() {
		$("#new .btn.primary-btn").click();
	}
	console.log("End of code run");
})();

function data() {
	if (document.getElementById("recaptcha") === null) {
		document.getElementsByName('mission_selected')[0].id = 'recaptcha';
		document.getElementsByName('mission_selected')[0].name = 'g-recaptcha-response';
		document.getElementById('phone').id = "phone1";
	}
	var R = document.getElementById('g-recaptcha-response').value;
	var handle = setInterval(
		function () { document.getElementById('g-recaptcha-response').value; }
		, 1000);
	if (R != null) { document.getElementById("recaptcha").value = R; }
}
