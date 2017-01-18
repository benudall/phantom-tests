//Init
var	page = require('webpage').create(),
	system = require('system'),

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