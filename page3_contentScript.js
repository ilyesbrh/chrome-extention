
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

        if (document.body.contains(document.getElementById('app_time'))) {

            console.log(document.getElementById('app_time').value + 'app_time available 3B');

            chrome.storage.sync.get(['firstName', 'lastName', 'birth', 'passNumber', 'issueDate', 'expiryDate', 'issuePlace'], function (storage) {

                console.log(storage);

                location.href = `javascript:
                console.log('setting values');
                document.getElementById('first_name').value = '${storage.firstName}';
                document.getElementById('last_name').value =' ${storage.lastName}';
                document.getElementById('passport_no').value = '${storage.passNumber}';
                $('#dateOfBirth').datepicker("update", '${storage.birth}');
                $('#pptIssueDate').datepicker("update", '${storage.issueDate}');
                $('#pptExpiryDate').datepicker("update", '${storage.expiryDate}');
                document.getElementById('pptIssuePalace').value = '${storage.issuePlace}';
                document.getElementById('VisaTypeId').selectedIndex = 1;
                var indexMax = document.getElementById('app_time').length - 1;
                var ei = Math.floor((Math.random() * indexMax) + 0);
                document.getElementById('app_time').selectedIndex = ei;
                $('#terms').prop('checked', true);

                document.getElementById('applicantBooking2').onsubmit = function () { return true };
                
                var page3Interval = setInterval(() => {
                    var g =grecaptcha.getResponse();
                    if(g != ''){
                        $("#applicantBooking2").append('<input type="hidden" name="save" value="Submit" />');
                        document.getElementById('applicantBooking2').submit();
                        console.log("redirecting");
                        clearInterval(page3Interval);
                    }else{
                        console.log('not checked yet');
                    }
                }, 500);
                `;
            });

        } else {
            var re = /var available_dates = \[(.*?)\];/g;
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
            if (available_dates.length > 1) {
                document.getElementById('app_date').value = formatDate(available_dates[available_dates.length - 2]);    
            } else {
                document.getElementById('app_date').value = formatDate(available_dates[available_dates.length - 1]);    
            }
            
            document.getElementById('applicantBooking2').onsubmit = function () { return true };
            document.getElementById('applicantBooking2').submit();
        }
    }
};


function formatDate(rawDate) {
    var arry = rawDate.split("-");
    return arry[2] + "-" + arry[1] + "-" + arry[0];
}