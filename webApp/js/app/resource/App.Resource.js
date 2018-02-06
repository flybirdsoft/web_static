App.Resource = {
	init : function(){
		this.initHandle();//初始化资源首页
		this.loadData();
	},
	initHandle:function(){//初始化资源首页
		App.TitleBar.hideHomeBtn();//隐藏顶部三个点按钮
		App.TitleBar.showClose();//隐藏顶部返回首页
		if(!$("#footerBox > div").eq(3).hasClass("footer-box-select")){
			$("#footerBox > div").eq(3).click();
		}
	},
	loadData : function(){
		/* this is your ajax request*/
		var data = [
			{
				"image":"images/resource/model_icon.png",
				"text" :"标准库"
			},
			{
				"image":"images/resource/family_icon.png",
				"text" :"不告诉你的库"
			}
		];
		this.viewData(data);
	},
	viewData : function(data){
		template.repeat({
			repeatElement:$(".resourceList")[0],
			data : data
		});
	}
}