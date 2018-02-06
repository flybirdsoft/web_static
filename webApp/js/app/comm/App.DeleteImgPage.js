App.DeleteImgPage = {
	defaults:{
		imgSrc:'',
		returnPage:'',
	},
	init:function(arge){
		App.DeleteImgPage.defaults.imgSrc = arge.imgUrl;
		App.DeleteImgPage.defaults.returnPage = arge.actionName;
		this.initHandle();//初始化页面需要的事件
	},
	initHandle:function(){//初始化服务页面
		var _this = this;
		App.TitleBar.setTitle("图片");//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.returnCallback("#/"+App.DeleteImgPage.defaults.returnPage);
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
	},
}