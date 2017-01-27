tests=[];
function newtest(testname,starturl,func){
	this.name=testname;
	this.page=require('webpage').create();
	this.page.end=function(result){
		this.result=result;
		if(tests.length==tests.filter(function(x){return(x.page.result!=undefined? true: false)}).length){
			console.log("All tests done");
			for(x in tests){
				console.log(tests[x].name+" "+tests[x].page.result);
			}
			phantom.exit();
		}
	}
	this.page.open(starturl,func);
}
function instance(testname,starturl,func){
	tests.push(new newtest(testname,starturl,func));
}

instance("Test1","https://google.com",function(){
	this.render('google.png');
	this.end("Pass");
});

instance("Test2","https://wikipedia.org",function(){
	this.render('wiki.png');
	this.end("Pass");
});

instance("Test3","https://yahoo.com",function(){
	this.render('yahoo.png');
	this.end("Pass");
});

/*
Alternative method storing everything in an array of objects instead of an object containing objects
Pros:
+supposedly faster
Cons:
-result has to be stored under page
-tests not retrievable by name
-requires extra level of function nesting
*/