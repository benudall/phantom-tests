fs = require('fs');
tests={}; //Defining wrapper for test data
function instance(testname,starturl,func){ //Container function for creating a test
	tests[testname]={}; //Creates test
	tests[testname].starturl=starturl; //Records starting url
	tests[testname].page=require('webpage').create(); //Creates page for test
	tests[testname].page.viewportSize={width:1680,height:720}; //Sets page size
	tests[testname].page.testname=testname; //Sets testname within page for easier access later
	tests[testname].page.renderelement=function(element,filename){ //Function to screenshot an element
		var oldclip = this.clipRect //Saves original screenshot boundries
		this.clipRect = this.evaluate(function(element){ //Gets boundries of element
			return document.querySelector(element).getBoundingClientRect();
		},element);
		this.render(filename); //Screenshots element
		this.clipRect = oldclip; //Reverts screenshot boundries to original
	};
	tests[testname].page.end=function(result){
		this.close(); //Closes the page to save memory
		delete tests[testname].page; //Removes page data from JSON to save space
		tests[testname].result=result; //Records result to JSON
		if(Object.keys(tests).length==Object.keys(tests).filter(function(x){return(tests[x].result!=undefined? true: false)}).length){ //If number of results matches number of tests
			console.log("All tests done");
			for(x in tests){
				console.log(x+" "+tests[x].result);
			}
			fs.write("results.json", JSON.stringify(tests));
			phantom.exit();
		}
	}
	tests[testname].page.open(starturl,func);
}
//Shared functions to reuse amongst tests with this.evaluateJavaScript(funcname.toString());
function getmachine(){
	return Array.prototype.slice.call(document.head.childNodes).filter(function(x){return (x.nodeName=='#comment' && x.data.match('Machine'))})[0].data
};

//Tests
instance("Test1","https://google.com",function(){
	this.renderelement("#hplogo","google logo.png");
	this.render("google.png");
	this.end("Pass");
});

instance("Test2","https://wikipedia.org",function(){
	this.renderelement(".central-featured-logo","wiki logo.png");
	this.render("wiki.png");
	this.end("Pass");
});

instance("Test3","https://uk.yahoo.com",function(){
	this.renderelement("#uh-logo","yahoo logo.png");
	this.render("yahoo.png");
	this.end("Pass");
});