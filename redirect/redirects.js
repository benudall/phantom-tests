tests={};

phantom.injectJs("from.js");
phantom.injectJs("to.js");

console.log("Start");

function step(x){
	tests[x]={};
	tests[x].page=require('webpage').create();
	tests[x].page.open("https://uat-bikes.suzuki.co.uk"+from[x] , function(status){
		tests[x].newpage = tests[x].page.evaluate(function(){
			return location.href
		});
		if(tests[x].newpage==to[x].replace("bikes.","uat-bikes.")){
			console.log("PASS "+from[x]+" redirected to "+to[x]);
		}
		else{
			console.log("FAIL "+from[x]+" redirected to "+tests[x].newpage);
		}
		if(x==from.length){
			phantom.exit();
		}
		else{
			step(x+1);
		}
	});
}
step(0);