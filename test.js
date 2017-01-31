page=require('webpage').create();

function script1(){
	document.body.style.background='red'
};

page.open("http://google.com",function(){
	page.evaluateJavaScript(script1.toString());
	page.render("google.png");
	phantom.exit();
})