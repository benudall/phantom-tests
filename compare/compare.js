page=require('webpage').create();
fs = require('fs');
before="1.jpg";
after="2.jpg";
page.open("compare.html",function(){
	log=page.evaluate(function(beforesrc,aftersrc){
		before = document.querySelector(".before");
		before.src=beforesrc;
		after = document.querySelector(".after");
		after.src=aftersrc;
		beforecanvas = document.querySelector(".beforecanvas");
		aftercanvas = document.querySelector(".aftercanvas");
		beforectx = beforecanvas.getContext("2d");
		afterctx = aftercanvas.getContext("2d");
		setTimeout(function(){
			beforecanvas.width=before.width;
			beforecanvas.height=before.height;
			aftercanvas.width=after.width;
			aftercanvas.height=after.height;
			beforectx.drawImage(before, 0, 0);
			afterctx.drawImage(after, 0, 0);
		},1000);
	},before,after);
	console.log(log);
	setTimeout(function(){
		page.render("compare.png");
		phantom.exit();
	},2000);
});

