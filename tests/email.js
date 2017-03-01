var page = require('webpage').create();


var url='https://api.mailgun.net/v3/sandbox83e192ffeb734937b984ff1d6f64ac4e.mailgun.org/messages';
var data="from=ben@aqueduct.co.uk&to=ben@aqueduct.co.uk&subject=Suzuki Indexes&text=Body";
page.customHeaders = {'Authorization': 'Basic ' + btoa('api:key-52da57b373d77958a79552e2baca5740')};
page.open(url, 'post', data, function(status){
    if(status != 'success') {
        console.log('Could not send email');
        console.log(status);
    }
	else{
		console.log('Email sent');
		phantom.exit();
    }
});