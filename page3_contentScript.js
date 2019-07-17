/**
 *
 * this work is done by ILIES bourouh :') help me to find a work .i.
 *
 */
var time = 500;

(function () {
    if (document.title == '502 Bad Gateway') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == '403 Forbidden') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == '504 Gateway Time-out') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Problem loading page') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == '503 Service Temporarily Unavailable') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Service Unavailable') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == '500 Internal Server Error') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Database error') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'FastCGI Error') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'The connection has timed out') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Problemas al cargar la página') { setTimeout(function () { window.location.reload(true); }, time); }
    else if (document.title == 'Error 502 (Server Error)!!1') { setTimeout(function () { window.location.reload(true); }, time); }
})();

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

        if (document.getElementById('app_date')) {
            var dataR = function (index) {
                return function () {
                    let rdv = RDV[index];
                    document.getElementById('first_name').value = rdv.firstName;
                    document.getElementById('last_name').value = rdv.lastName;
                    document.getElementById('passport_no').value = rdv.passNumber;
                    document.getElementById('dateOfBirth').value = rdv.birth;
                    document.getElementById('pptIssueDate').value = rdv.issueDate;
                    document.getElementById('pptExpiryDate').value = rdv.expiryDate;
                    document.getElementById('pptIssuePalace').value = rdv.issuePlace;
                    document.getElementById('VisaTypeId').selectedIndex = rdv.visatype;

                    var indexMax = document.getElementById('app_time').length - 1;
                    var ei = Math.floor((Math.random() * indexMax) + 0);
                    document.getElementById('app_time').selectedIndex = ei;
                    $('#terms').prop('checked', true);
                }
            };

            const divC = document.getElementsByTagName('tbody')[0].parentNode;
            console.log("entred to buttons");
            console.log(RDV.toString());

            for (var i = 0; i < RDV.length; i++) {
                var button = document.createElement('button');
                button.id = 'rdv' + i;
                button.innerHTML = RDV[i].name;
                divC.insertBefore(button, document.getElementsByTagName('tbody')[0]);
                button.onclick = dataR(i);

                button.style = "cursor: pointer; border:1,5px solid #000;float: center; font-size: 12px; padding: 6px; width: 120px; margin-bottom: 4px;"
            }

            if (document.getElementById('app_time')) {

                console.log(document.getElementById('app_time').value + 'app_time available 3B');

                chrome.storage.sync.get(['firstName', 'lastName', 'birth', 'passNumber', 'issueDate', 'expiryDate', 'visatype', 'issuePlace'], function (storage) {

                    location.href = `javascript:
                    console.log('setting values');
                    document.getElementById('first_name').value = '${storage.firstName}';
                    document.getElementById('last_name').value = '${storage.lastName}';
                    document.getElementById('passport_no').value = '${storage.passNumber}';
                    $('#dateOfBirth').datepicker("update", '${storage.birth}');
                    $('#pptIssueDate').datepicker("update", '${storage.issueDate}');
                    $('#pptExpiryDate').datepicker("update", '${storage.expiryDate}');
                    document.getElementById('pptIssuePalace').value = '${storage.issuePlace}';
                    document.getElementById('VisaTypeId').selectedIndex = ${storage.visatype};
                    var indexMax = document.getElementById('app_time').length - 1;
                    var ei = Math.floor((Math.random() * indexMax) + 0);
                    document.getElementById('app_time').selectedIndex = ei;
                    $('#terms').prop('checked', true);
                    document.getElementById('applicantBooking2').onsubmit = function () { return true };
                    $("#applicantBooking2").append('<input type="hidden" name="save" value="Submit" />');
                    document.getElementById('applicantBooking2').submit();
                    console.log("redirecting");
                    `;
                });

            } else {
                var re = /var available_dates = \[(.*?)\];/g;
                var full = /var fullCapicity_dates  = \[(.*?)\];/g;
                var data;

                try {
                    data = document.getElementsByTagName('script')[10].innerText;
                    var result = re.exec(data);
                    eval(result[0]);
                } catch (error) {

                    try {
                        data = document.getElementsByTagName('script')[9].innerText;
                        var result = re.exec(data);
                        eval(result[0]);
                    } catch (error) {
                        data = document.getElementsByTagName('script')[8].innerText;
                        var result = re.exec(data);
                        eval(result[0]);
                    }
                }

                console.log(available_dates);
                if (available_dates.length > 2) {
                    document.getElementById('app_date').value = formatDate(available_dates[available_dates.length - 2]);
                } else if(available_dates.length > 0 ) {
                    document.getElementById('app_date').value = formatDate(available_dates[available_dates.length - 1]);
                }else{
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }

                document.getElementById('applicantBooking2').onsubmit = function () { return true };
                document.getElementById('applicantBooking2').submit();
            }
        } else
            location.reload();
    }
};


function formatDate(rawDate) {
    var arry = rawDate.split("-");
    return arry[2] + "-" + arry[1] + "-" + arry[0];
}