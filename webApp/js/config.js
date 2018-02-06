/*

write by wuweiwei
www.github.com/flybirdsoft

core code , config route and controller handle

注意：配置路由后，用户在浏览器中输入URL时，不能包含这些符号：空格、百分号、问号

*/

/*配置路由*/
wRouter.config({
	container:$("#mainContainer")[0],             /*指定载入templateUrl的容器DOM*/
	routes:[
		{
			url:"/index",                         /*页面路由*/
			controller:"index",                   /*路由的名称,根据含义起名*/
			templateUrl:"tpls/index/index.html"   /*载入的页面,当在浏览器执行"#/index"后,会自动载入此页面*/
		},
		{
			url:"/Projects",
			controller:"projects",
			templateUrl:"tpls/projects/projectsList.html"
		},
		{
			url:"/searchHeightPage",
			controller:"searchHeightPage",
			templateUrl:"tpls/projects/searchHeightPage.html"
		},
		{
			url:"/project/:projectId/:versionId/:projectName/:folderId",
			controller:"project",
			templateUrl:"tpls/projects/projectFileList.html"
		},
		{
			url:"/flow",
			controller:"flow",
			templateUrl:"tpls/flow/flow.html"
		},
		{
			url:"/flowList/:name/:id",
			controller:"flowList",
			templateUrl:"tpls/flow/flowList.html"
		},
		{
			url:"/flowTextList/:name/:id/:folderName",
			controller:"flowTextList",
			templateUrl:"tpls/flow/flowTextList.html"
		},
		{
			url:"/flowDetailPage/:name/:id/:folderName/:parName",
			controller:"flowDetailPage",
			templateUrl:"tpls/flow/flowDetailPage.html"
		},
		{
			url:"/glyjPage/:name/:index",
			controller:"glyjPage",
			templateUrl:"tpls/flow/glyjPage.html"
		},
		{
			url:"/glyjDetailPage/:name/:index",
			controller:"glyjDetailPage",
			templateUrl:"tpls/flow/glyjDetailPage.html"
		},
		{
			url:"/resource",
			controller:"resource",
			templateUrl:"tpls/resource/resourceList.html"
		},
		{
			url:"/service",
			controller:"service",
			templateUrl:"tpls/service/serviceList.html"
		},
		{
			url:"/serviceRelated",
			controller:"serviceRelated",
			templateUrl:"tpls/service/serviceRelated.html"
		},
		{
			url:"/serviceFeedback",
			controller:"serviceFeedback",
			templateUrl:"tpls/service/serviceFeedback.html"
		},
		{
			url:"/addFeedback",
			controller:"addFeedback",
			templateUrl:"tpls/service/addFeedback.html"
		},
		{
			url:"/noticeList",
			controller:"noticeList",
			templateUrl:"tpls/notice/noticeList.html"
		},
		{
			url:"/noticeDetail/:id/:backName",
			controller:"noticeDetail",
			templateUrl:"tpls/notice/noticeDetail.html"
		},
		{
			url:"/todoList",
			controller:"todoList",
			templateUrl:"tpls/todo/todoList.html"
		},
		{
			url:"/deleteImgPage/:imgUrl/:actionName",
			controller:"deleteImgPage",
			templateUrl:"tpls/comm/deleteImgPage.html"			
		},
		{
			url:"/xiaowan",
			controller:"xiaowan",
			templateUrl:"tpls/service/xiaowan.html"			
		}
	],
	otherwise:{
		redirectTo:"/index"
	}
});

/*通用controller处理函数*/
wRouter.commonController(function(isFirst){
	/*isFirst is Boolean ,true is first laod or refresh*/
	// $("#mainContainer").css("overflow","auto");
	App.TitleBar.setTitle();
	$("#mainContainer").css("overflow","hidden");
	App.resetFrameStyle();
	App.showMainMenu();
	App.TitleBar.showReturn();
	if(isFirst)
	{
		App.hideNativeTitleBar(true);
	}
});


/*
下面是每个controller对应的业务处理函数
wRouter.controller("",function(){})
第一个参数对应wRouter.config({})里的controller
*/

wRouter.controller("index",function(args){
	App.TitleBar.showClose();
	App.Comm.require("js/app/index/App.Index.js");
	App.Index.init();
});

wRouter.controller("projects",function(args){//第一级的项目列表
	App.Comm.require("css/projects.css");
	App.Comm.require("js/app/projects/App.Projects.js");
	App.Projects.init();
});
wRouter.controller("searchHeightPage",function(args){//第一级的项目列表
	App.Comm.require("css/projects.css");
	App.Comm.require("js/app/projects/App.SearchHeightPage.js");
	App.SearchHeightPage.init(args);
});

wRouter.controller("project",function(args){//项目底下的文件列表
	App.Comm.require("css/projects.css");
	App.Comm.require("js/app/projects/App.Projects.ProjectFileList.js");
	App.Projects.ProjectFileList.init(args);
});

wRouter.controller("flow",function(args){
	App.Comm.require("css/flow.css");
	App.Comm.require("js/app/flow/App.Flow.js");
	App.Flow.init();
});
wRouter.controller("flowList",function(args){
	App.Comm.require("css/flow.css");
	App.Comm.require("js/app/flow/App.FlowList.js");
	App.FlowList.init(args);
});
wRouter.controller("flowTextList",function(args){
	App.Comm.require("css/flow.css");
	App.Comm.require("js/app/flow/App.FlowTextList.js");
	App.FlowTextList.init(args);
});
wRouter.controller("flowDetailPage",function(args){
	App.Comm.require("css/flow.css");
	App.Comm.require("js/app/flow/App.FlowDetailPage.js");
	App.FlowDetailPage.init(args);
});
wRouter.controller("glyjPage",function(args){
	App.Comm.require("css/flow.css");
	App.Comm.require("js/app/flow/App.GlyjPage.js");
	App.GlyjPage.init(args);
});
wRouter.controller("glyjDetailPage",function(args){
	App.Comm.require("css/flow.css");
	App.Comm.require("js/app/flow/App.GlyjDetailPage.js");
	App.GlyjDetailPage.init(args);
});

wRouter.controller("resource",function(args){
	App.Comm.require("css/resource.css");
	App.Comm.require("js/app/resource/App.Resource.js");
	App.Resource.init();
});

wRouter.controller("service",function(args){
	App.Comm.require("css/service.css");
	App.Comm.require("js/app/service/App.Service.js");
	App.Service.init(args);
});
wRouter.controller("serviceRelated",function(args){
	App.Comm.require("css/service.css");
	App.Comm.require("js/app/service/App.ServiceRelated.js");
	App.ServiceRelated.init(args);
});
wRouter.controller("serviceFeedback",function(args){
	App.Comm.require("css/service.css");
	App.Comm.require("js/app/service/App.ServiceFeedback.js");
	App.ServiceFeedback.init(args);
});
wRouter.controller("addFeedback",function(args){
	App.Comm.require("css/service.css");
	App.Comm.require("js/app/service/App.AddFeedback.js");
	App.AddFeedback.init(args);
});

wRouter.controller("todoList",function(args){//待办列表页面
	App.Comm.require("css/todoList.css");
	App.Comm.require("js/app/todo/App.TodoList.js");
	App.TodoList.init();
});

wRouter.controller("xiaowan",function(){//族库模型渲染
	App.Comm.require("js/app/service/App.XiaoWanPage.js");
	App.XiaoWanPage.init();
});
wRouter.endController(function(controllerName){
	/*通过controllerName判断，来清理对应的controller*/

});

