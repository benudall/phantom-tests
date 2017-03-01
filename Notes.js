//Create page (can create multiple with different names)
var page = require('webpage').create();
var system = require('system');

//Get URL from system arguments
url = system.args[1];

//Load page
page.open(url, function(status) {
	//do stuff here
});
//Change window size (can be done on opened page)
page.viewportSize={width:1680,height:720};

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

//or

function script1(){ /*do stuff here*/ };
page.open("http://google.com", function(status) {
	page.evaluateJavaScript(script1.toString());
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
	page.render("screenshot.png");
});

//Change screenshot target
page.clipRect = {
	top:    0,
	left:   0,
	width:  200,
	height: 200
};

//Script to screenshot a specific element
function renderelement(pageref,element,filename){
	var oldclip = pageref.clipRect
	pageref.clipRect = pageref.evaluate(function(element){
		return document.querySelector(element).getBoundingClientRect();
	},element);
	pageref.render(filename);
	pageref.clipRect = oldclip;
};
page.open("http://google.com", function(status){
	renderelement(this,"img","snapshot.png");
});

//Finish script
phantom.exit();