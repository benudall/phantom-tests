var page = require('webpage').create();
start=Date.now();
searchmachines=[];
fadmachines=[];
function search(){
	page.open("https://cars.suzuki.co.uk/search/?searchSuzuki=ignis",function(status){
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
			console.log("");
			console.log("Searching Find a Dealer for 'WC1X8HN'");
			console.log("");
			findadealer();
		}
		else{
			search();
		}
	});
}
function findadealer(){
	page.open("https://cars.suzuki.co.uk/find-a-dealer?PostcodeForDealers=WC1X8HN",function(status){
		setTimeout(function(){
			var machine = page.evaluate(function(){
					comments=document.head.childNodes;
					for(x=0;x<comments.length;x++){
						if(comments[x].nodeType==Node.COMMENT_NODE && comments[x].data.indexOf("Machine")>-1){
							if(document.querySelector(".address__header")){
								return comments[x].data+"returns "+document.querySelector(".address__header").innerText;
							}
							else{
								return comments[x].data+"returned nothing";
							}
						}
					}
				});
				if(fadmachines.indexOf(machine)==-1){
					fadmachines.push(machine);
					console.log(machine);
				}
				if(fadmachines.length==4){
					end();
				}
				else{
					findadealer();
				}
		},2000);
	});
}
function end(){
	searchresults=[];
	fadresults=[];
	for(x=0;x<4;x++){
		searchresults.push(searchmachines[x].split(" returns")[1]);
		fadresults.push(fadmachines[x].split(" returns")[1]);
	}
	var uniquesearches = [];
	for(i = 0;i < 4;i++){
		if(uniquesearches.indexOf(searchresults[i])==-1){
			uniquesearches.push(searchresults[i]);
		}
	}
	var uniquedealers = [];
	for(i = 0;i < 4;i++){
		if(uniquedealers.indexOf(fadresults[i])==-1){
			uniquedealers.push(fadresults[i]);
		}
	}
	console.log("");
	console.log("DONE");
	if(uniquesearches.length!=1){
		console.log("");
		console.log("!----------MACHINES' SEARCH INDEXES ARE OUT OF SYNC----------!");
	}
	if(uniquedealers.length!=1){
		console.log("");
		console.log("!----------MACHINES' DEALER INDEXES ARE OUT OF SYNC----------!");
	}
	phantom.exit()
}
console.log("");
console.log("Searching site for 'Ignis'");
console.log("");
search();
