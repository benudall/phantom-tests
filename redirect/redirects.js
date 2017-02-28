fs = require('fs');
tests={};
res={};
csv="RESULT,FROM,TO,ACTUAL\n";
start=0;
phantom.injectJs("from.js");
phantom.injectJs("to.js");

console.log("Start");

function step(x){
	tests[x]={};
	tests[x].page=require('webpage').create();
	if(from[x].indexOf(":")==-1){
		tests[x].page.open("https://bikes.suzuki.co.uk"+from[x] , function(status){
			tests[x].newpage = tests[x].page.evaluate(function(){
				return location.href
			});
			res[x]={};
			res[x].from=from[x];
			res[x].to=to[x];
			res[x].result=tests[x].newpage;
			if(tests[x].newpage==to[x] || (tests[x].newpage==to[x]+"/") || (tests[x].newpage==to[x].replace(/\/$/,""))){
				console.log(x+" PASS "+from[x]+" redirected to "+to[x]);
				csv+="PASS,"+from[x]+","+to[x]+","+tests[x].newpage+"\n";
				fs.write("csvcolon"+start+".js","res="+JSON.stringify(res));
				fs.write("csvcolon"+start+".csv",csv);
			}
			else{
				console.log(x+" FAIL "+from[x]+" redirected to "+tests[x].newpage+" instead of "+to[x]);
				csv+="FAIL,"+from[x]+","+to[x]+","+tests[x].newpage+"\n";
				fs.write("csvcolon"+start+".js","res="+JSON.stringify(res));
				fs.write("csvcolon"+start+".csv",csv);
			}
			if(x==from.length){
				phantom.exit();
			}
			else{
				tests[x].page.close();
				step(x+1);
			}
		});
	}
	else{
		step(x+1);
	}
}
step(start);