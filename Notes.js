//Init
var page = require('webpage').create();
var system = require('system');

//Get URL from system arguments
url = system.args[1];

//Load page
page.open(url, function(status) {
	//do stuff here
});

//Perform actions
page.open("http://google.com", function(status) {
	page.evaluate(function() {
		//do stuff here
	});
});

//Perform preset actions to be shared across tests
script1="function(){ /*do stuff here*/ }";
page.open("http://google.com", function(status) {
	page.evaluateJavaScript(script1);
});

//To return value from page:
page.onConsoleMessage = function(msg) {
	console.log('Page title is ' + msg);
};
page.open(url, function(status) {
	page.evaluate(function() {
		console.log(document.title);
	});
});

//or

var title = page.evaluate(function() {
	return document.title;
});
console.log('Page title is ' + title);

//Take screenshot
page.open("http://google.com", function(status) {
	page.render('screenshot.png');
});


//Finish script
phantom.exit();