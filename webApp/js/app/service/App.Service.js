App.Service = {
	init : function(arge){
		this.initHandle();//初始化服务页面
	},
	initHandle:function(){//初始化服务页面
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.hideHomeBtn();//隐藏顶部返回首页
		App.TitleBar.showClose();// 显示顶部关闭按钮
		if(!$("#footerBox > div").eq(4).hasClass("footer-box-select")){//底部导航的定位
			$("#footerBox > div").eq(4).click();
		}
	},
}