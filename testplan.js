tests={};
function instance(testname,starturl,func){
	tests[testname]={};
	tests[testname].page=require('webpage').create();
	tests[testname].page.end=function(result){
		tests[testname].result=result;
		if(Object.keys(tests).length==Object.keys(tests).filter(function(x){return(tests[x].result!=undefined? true: false)}).length){
			console.log("All tests done");
			for(x in tests){
				console.log(x+" "+tests[x].result);
			}
			phantom.exit();
		}
	}
	tests[testname].page.open(starturl,func);
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