
/*
basis is like express
write by wuweiwei
*/

var basis = require("node-basis");

basis.setRouter({
	"interface":"/restful/json" /*you can send ajax to request url*/
});

basis.controller("interface",function(req,res,argv){
	res.writeHead(200,{'content-type':'application/json'});
	res.write('{"code":0,"data":[{"status":1,"title":"测试项目工艺深化图纸","planStartDate":"2018.1.12","planFinishDate":"2018-2-2"}]}');
	res.end();
});

//basis.run(80); /*listener 80 port*/
basis.start(80); /*listener 80 port*/
/*
注意：在浏览器中输入 localhost/index.html
*/

