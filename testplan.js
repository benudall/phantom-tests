myobj={tests:{},results:{}};
function instance(testname,starturl,func){
	myobj.tests[testname]={};
	myobj.tests[testname].page=require('webpage').create();
	myobj.tests[testname].page.open(starturl,func);
	myobj.tests[testname].page.end=function(result){
		this.close();
		myobj.results[testname]={};
		myobj.results[testname].result=result;
		if(Object.keys(myobj.results).length==Object.keys(myobj.tests).length){
			console.log("All tests done");
		}
		
	}
}

instance("Test1","https://google.com",function(){
	this.render('google.png');
	console.log("google.png");
	this.end("Pass");
});

instance("Test2","https://wikipedia.org",function(){
	this.render('wiki.png');
	console.log("wiki.png");
	this.end("Pass");
});

instance("Test3","https://yahoo.com",function(){
	this.render('yahoo.png');
	console.log("yahoo.png");
	this.end("Pass");
});