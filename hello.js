var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
	console.log('Returned ' + msg);
};
page.open("http://google.com", function(status) {
	page.evaluate(function() {
		document.querySelector("input[name=q]").value=50;
		console.log(document.querySelector("input[name=q]").value);
	});
	page.render('screenshot.png');
	phantom.exit();
});
