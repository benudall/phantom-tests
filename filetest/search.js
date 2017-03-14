var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
//url = "https://uat-cms.suzuki.co.uk";
//url = "https://prod-suzuki-staging.azurewebsites.net";
//url = "https://cars.suzuki.co.uk";

if(system.args[1]){
	if(system.args[1]=="live"){url = "https://cars.suzuki.co.uk";maxmachines=4}
	else if(system.args[1]=="staging"){url = "https://prod-suzuki-staging.azurewebsites.net";maxmachines=4}
	else if(system.args[1]=="uat"){url = "https://uat-cars.suzuki.co.uk";maxmachines=2}
}
else{
	url = "https://cars.suzuki.co.uk";
	maxmachines=4;
}

q="Ignis";

function timecheck(){
	if((new Date().getMinutes())%5 == 0 && new Date().getMinutes() != new Date(start).getMinutes()){
		search(true);
    }
	else{
		console.log(new Date());
		setTimeout(function(){timecheck()},30000)
    }
}
page.onError = function(msg, trace){}
function search(first){
	if(first){
		start=Date.now()
		res={start:Date(),url:url,search:{machines:[]}};
		console.log("");
		console.log(Date());
		console.log("");
		console.log("Searching "+url+" for " + q);
		console.log("");
	}
	page.open(url+"/search/?searchSuzuki="+q , function(status){
		var machine = page.evaluate(function(){
			return Array.prototype.slice.call(document.head.childNodes).filter(function(x){return (x.nodeName=='#comment' && x.data.match('Machine'))})[0].data;
		});
		if(machine!=null){
			var result = page.evaluate(function(){
				return document.querySelector(".search-counter").innerText.split(" for")[0];
			});
			if(JSON.stringify(res.search.machines).indexOf(machine) == -1){
				res.search.machines.push({machine:machine,result:result});
				console.log(machine + " returns " + result);
			}
			if(res.search.machines.length == maxmachines){
				end();
			}
			else{
				search(false);
			}
		}
		else{
			search(false);
		}
	});
}
function end(){
	for(x=0;x<res.search.machines.length;x++){
		var regex=new RegExp(res.search.machines[x].result,"g")
		res.search.machines[x].uniqueness="u"+JSON.stringify(res.search.machines).match(regex).length
	}	
	fs.write("res.js","res="+JSON.stringify(res));

	var uniquesearches = [];
	for(i = 0;i < maxmachines;i++){
		if(uniquesearches.indexOf(res.search.machines[i].result)==-1){
			uniquesearches.push(res.search.machines[i].result);
		}
	}
	console.log("");
	console.log("Finished in "+Math.round((Date.now()-start)/1000)+" seconds");
	console.log("");
	if(uniquesearches.length!=1){
		console.log("");
		console.log("!----------MACHINES' SEARCH INDEXES ARE OUT OF SYNC----------!");
	}
	timecheck();
}
search(true);