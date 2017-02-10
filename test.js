page=require('webpage').create();

page.open("http://google.com",function(){
	page.render("defaultsize.png");
	page.viewportSize={width:1680,height:720};
	page.render("1680x720.png");
	phantom.exit();
})