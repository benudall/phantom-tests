phantom.injectJs("core.js");

test("Test0","https://google.com",function(){
	this.step("click","a[href*=imghp]");
	this.step("renderelement","#hplogo","googleimg logo.png");
});
/*
test("Test1","https://google.com",function(){
	this.renderelement("#hplogo","google logo.png");
	this.render("google.png");
	this.end("Pass");
});

test("Test2","https://wikipedia.org",function(){
	this.renderelement(".central-featured-logo","wiki logo.png");
	this.render("wiki.png");
	this.end("Pass");
});

test("Test3","https://uk.yahoo.com",function(){
	this.renderelement("#uh-logo","yahoo logo.png");
	this.render("yahoo.png");
	this.end("Pass");
});
*/