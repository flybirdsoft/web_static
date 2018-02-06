App.XiaoWanPage = {
	init : function(){
		this.initHandle();//初始化服务页面
	},
	initHandle:function(){//初始化服务页面
		App.TitleBar.setTitle("小万智能机器人");//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.returnCallback("#/service");
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
	},
}