myobj={}
function instance(testname,starturl,func){
	myobj[testname]={};
	console.log("test built");
	myobj[testname].page=require('webpage').create();
	console.log("test page built");
	myobj[testname].page.open(starturl,func);
	console.log("test ran");
}
console.log("Instance defined");

instance("Test1","https://google.com",function(){
	this.render('google.png');
	console.log("google.png");
});

instance("Test2","https://wikipedia.org",function(){
	this.render('wiki.png');
	console.log("wiki.png");
});


console.log("END")