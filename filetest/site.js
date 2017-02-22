page=require('webpage').create();
fs = require('fs');
json={test1:"pass",test2:"fail"};
fs.write("pass.js","json="+JSON.stringify(json));
phantom.exit();