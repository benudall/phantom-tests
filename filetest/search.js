var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

if(system.args[1]){var q = system.args[1]}
else{var q="Ignis"}

function timecheck(){
	if((new Date().getMinutes())%5 == 0 && new Date().getMinutes() != new Date(start).getMinutes()){
		search(true);
    }
	else{
		console.log(new Date().getHours() + ":" + new Date().getMinutes());
		setTimeout(function(){timecheck()},30000)
    }
}
page.onError = function(msg, trace){}
function search(first){
	if(first){
		start=Date.now()
		res={start:Date(),search:{machines:[]}};
		console.log("");
		console.log(Date());
		console.log("");
		console.log("Searching site for " + q);
		console.log("");
	}
	page.open("https://cars.suzuki.co.uk/search/?searchSuzuki="+q , function(status){
		var machine = page.evaluate(function(){
			return Array.prototype.slice.call(document.head.childNodes).filter(function(x){return (x.nodeName=='#comment' && x.data.match('Machine'))})[0].data;
		});
		var result = page.evaluate(function(){
			return document.querySelector(".search-counter").innerText.split(" for")[0];
		});
		if(res.search.machines.toString().indexOf(machine) == -1){
			res.search.machines.push({machine:machine,result:result});
			console.log(machine + " returns " + result);
		}
		if(res.search.machines.length == 4){
			end();
		}
		else{
			search(false);
		}
	});
}
function end(){
	fs.write("res.js","res="+JSON.stringify(res));

	var uniquesearches = [];
	for(i = 0;i < 4;i++){
		if(uniquesearches.indexOf(res.search.machines[i].result)==-1){
			uniquesearches.push(res.search.machines[i].result);
		}
	}
	console.log("");
	console.log("Finished in "+Math.round((Date.now()-start)/1000)+" seconds");
	if(uniquesearches.length!=1){
		console.log("");
		console.log("!----------MACHINES' SEARCH INDEXES ARE OUT OF SYNC----------!");
	}
	timecheck();
}
search(true);
