page = require('webpage').create();

function renderelement(pageref,element,filename){
	var oldclip = pageref.clipRect
	pageref.clipRect = pageref.evaluate(function(element){
		return document.querySelector(element).getBoundingClientRect();
	},element);
	pageref.render(filename);
	pageref.clipRect = oldclip;
};

page.open("http://google.com", function(status){
	renderelement(this,"img","logo.png");
	phantom.exit();
});