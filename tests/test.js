page=require('webpage').create();
page.open("http://google.com",function(){
	console.log(page.open);
	phantom.exit();
});
