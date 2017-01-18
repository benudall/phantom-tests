var page = require('webpage').create();

searchmachines=[];
fadmachines=[];
page.onError=function(msg,trace){}
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
			console.log("Searching Find a Dealer for 'WC1X8HN'");
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
								return "not found"+Date.now();
							}
						}
					}
				});
				if(fadmachines.indexOf(machine)==-1){
					fadmachines.push(machine);
					console.log(machine);
				}
				if(fadmachines.length==4){
					phantom.exit();
				}
				else{
					findadealer();
				}
		},3000);
	});
}
console.log("Searching site for 'Ignis'");
search();
