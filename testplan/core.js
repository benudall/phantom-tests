fs = require('fs');
tests={}; //Defining wrapper for test data
function test(testname,starturl,func){ //Container function for creating a test
	tests[testname]={}; //Creates test
	tests[testname].starturl=starturl; //Records starting url
	tests[testname].page=require('webpage').create(); //Creates page for test
	tests[testname].page.viewportSize={width:1680,height:720}; //Sets page size
	tests[testname].page.testname=testname; //Sets testname within page for easier access later
	//Custom page functions
	tests[testname].page.renderelement=function(element,filename){ //Function to screenshot an element
		var oldclip = this.clipRect //Saves original screenshot boundries
		this.clipRect = this.evaluate(function(element){ //Gets boundries of element
			return document.querySelector(element).getBoundingClientRect();
		},element);
		this.render(filename); //Screenshots element
		this.clipRect = oldclip; //Reverts screenshot boundries to original
	};
	tests[testname].page.click=function(element){
		////Write failure case here
		this.evaluate(function(element){
			document.querySelector(element).click();
		},element)
	}
	//Test steps builder
	tests[testname].page.steps=[];
	tests[testname].page.step=function(action,target,filename){
		this.steps.push([action,target,filename]);
	}
	//Function to execute steps
	tests[testname].page.execute=function(progress){
		if(!progress){progress=0}
		console.log("progress "+progress);
		if(this.steps.length>progress){
			console.log("running step "+progress+" of "+this.steps.length)
			console.log(this.steps[progress][0]+" ON "+this.steps[progress][1])
			this[this.steps[progress][0]](this.steps[progress][1],this.steps[progress][2]);
			console.log("ran step")
			progress++;
			var testid=this.testname;
			setTimeout(function(){tests[testid].page.execute(progress)},3000);
		}
		else{
			this.end("Pass");
		}
	}
	//Function to end test
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
	var newfunc = new Function(func.toString().replace(/^function\s*\(\)\s*\{/,"").replace(/(\}$)/g,"this.execute();"));
	tests[testname].page.open(starturl,newfunc);
	
}
//Shared functions to reuse amongst tests with this.evaluateJavaScript(funcname.toString());
function getmachine(){
	return Array.prototype.slice.call(document.head.childNodes).filter(function(x){return (x.nodeName=='#comment' && x.data.match('Machine'))})[0].data
};
//Script to screenshot a specific element
function renderelement(pageref,element,filename){
	var oldclip = pageref.clipRect
	pageref.clipRect = pageref.evaluate(function(element){
		return document.querySelector(element).getBoundingClientRect();
	},element);
	pageref.render(filename);
	pageref.clipRect = oldclip;
};
