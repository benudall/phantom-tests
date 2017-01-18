var page = require('webpage').create();

machines=[];
function check(){
	page.open("https://cars.suzuki.co.uk/search/?searchSuzuki=ignis", function(status) {
			var machine = page.evaluate(function() {
				comments=document.head.childNodes;
				for(x=0;x<comments.length;x++){
					if(comments[x].nodeType==Node.COMMENT_NODE && comments[x].data.indexOf("Machine")>-1){
						return comments[x].data+" has "+document.querySelector(".search-counter").innerText.split(" for")[0];
					}
				}
			});
			if(machines.indexOf(machine)==-1){
				machines.push(machine);
				console.log(machine);
			}
			if(machines.length==4){
				phantom.exit();
			}
			else{
				check();
			}
	});
}
check();
