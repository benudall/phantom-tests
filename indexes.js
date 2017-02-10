var page=require('webpage').create();
var system=require('system');

if(system.args[1]){var q=system.args[1]}
else{var q="Ignis"}
if(system.args[2]){var postcode=system.args[2]}
else{var postcode="TS4 2ET"}

function timecheck(){
	if((new Date().getMinutes())%5==0 && new Date().getMinutes() != new Date(start).getMinutes()){
		search(true);
    }
	else{
		console.log(new Date().getMinutes());
		setTimeout(function(){timecheck()},30000)
    }
}
page.onError = function(msg, trace) {}
function search(first){
	if(first){
		start=Date.now();
		console.log("");
		console.log(Date());
		console.log("");
		console.log("Searching site for "+q);
		console.log("");
		searchmachines=[];
	}
	page.open("https://cars.suzuki.co.uk/search/?searchSuzuki="+q,function(status){
		var machine = page.evaluate(function(){
			comments=document.head.childNodes;
			for(x=0;x<comments.length;x++){
				if(comments[x].nodeType==Node.COMMENT_NODE && comments[x].data.indexOf("Machine")>-1){
					return comments[x].data+"returns "+document.querySelector(".search-counter").innerText.split(" for")[0];
				}
			}
		});
		if(searchmachines.indexOf(machine)==-1){
			searchmachines.push(machine);
			console.log(machine);
		}
		if(searchmachines.length==4){
			findadealer(true);
		}
		else{
			search(false);
		}
	});
}
function findadealer(first){
	if(first){
		console.log("");
		console.log("Searching Find a Dealer for "+postcode);
		console.log("");
		fadmachines=[];
		fadresults=[];
	}
	page.open("https://cars.suzuki.co.uk/find-a-dealer?PostcodeForDealers="+postcode,function(status){
		var machine = page.evaluate(function(){
			return Array.prototype.slice.call(document.head.childNodes).filter(function(x){return (x.nodeName=='#comment' && x.data.match('Machine'))})[0].data;
		});
		if(fadmachines.indexOf(machine)==-1){
			fadmachines.push(machine);
			setTimeout(function(){
				var result = page.evaluate(function(){
					if(document.querySelector(".address__header")){
						return document.querySelector(".address__header").innerText;
					}
					else{
						return "nothing";
					}
				});
				fadresults.push(machine+"returns "+result);
				console.log(machine+"returns "+result);
				if(fadmachines.length==4){
					end();
				}
				else{
					findadealer(false);
				}
			},10000);
		}
		else{
			findadealer(false);
		}
	});
}
function end(){
	searchresults=[];
	fadresults2=[];
	for(x=0;x<4;x++){
		searchresults.push(searchmachines[x].split(" returns")[1]);
		fadresults2.push(fadmachines[x].split(" returns")[1]);
	}
	var uniquesearches = [];
	for(i = 0;i < 4;i++){
		if(uniquesearches.indexOf(searchresults[i])==-1){
			uniquesearches.push(searchresults[i]);
		}
	}
	var uniquedealers = [];
	for(i = 0;i < 4;i++){
		if(uniquedealers.indexOf(fadresults2[i])==-1){
			uniquedealers.push(fadresults2[i]);
		}
	}
	console.log("");
	console.log("Finished in "+Math.round((Date.now()-start)/1000)+" seconds");
	if(uniquesearches.length!=1){
		console.log("");
		console.log("!----------MACHINES' SEARCH INDEXES ARE OUT OF SYNC----------!");
	}
	if(uniquedealers.length!=1){
		console.log("");
		console.log("!----------MACHINES' DEALER INDEXES ARE OUT OF SYNC----------!");
	}
	timecheck();
}
search(true);
