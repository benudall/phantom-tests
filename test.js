page=require('webpage').create();
function step(){
	page.open("https://uat-bikes.suzuki.co.uk/generalcontent/",function(){
		res=page.evaluate(function(){
			return Array.prototype.slice.call(document.head.childNodes).filter(function(x){return (x.nodeName=='#comment' && x.data.match('Machine'))})[0].data+document.querySelector(".heading-set__main").innerText
		})
		console.log(res);
		step();
	})
}
step();