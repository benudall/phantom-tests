var page = require('webpage').create();

page.onError = function(msg, trace){}
page.viewportSize={width:1680,height:720};
start=Date.now();
machines=[];
console.log("");
console.log(Date());
console.log("");
		
function search(){
	page.open("https://cars.suzuki.co.uk/dealers/progress-suzuki-milton-keynes/?distance=6" , function(status){
		var machine = page.evaluate(function(){
			document.body.className+=" no-animate";
			return Array.prototype.slice.call(document.head.childNodes).filter(function(x){return (x.nodeName=='#comment' && x.data.match('Machine'))})[0].data;
		});
		if(machines.indexOf(machine) == -1){
			machines.push(machine);
			page.render(machine.split(" ")[2]+".png");
			console.log(machine);
		}
		if(machines.length == 4){
			console.log("");
			console.log("Finished in "+Math.round((Date.now()-start)/1000)+" seconds");
			phantom.exit()
		}
		else{
			search();
		}
	});
}
search();