App.GlyjPage = {
	defaults:{
		name:"",
	},
	init : function(arge){
		App.GlyjPage.defaults.name = arge.name;
		App.GlyjPage.defaults.index = arge.index?arge.index:0;
		this.initHandle();//初始化页面事件方法
	},
	initHandle:function(){//初始化页面事件方法
		App.TitleBar.setTitle("管理依据");//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.showHomeBtn() //显示home图片
		App.TitleBar.returnCallback("#/flow");
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
		if(!$("#footerBox > div").eq(2).hasClass("footer-box-select")){//底部导航的定位
			$("#footerBox > div").eq(2).click();
		}
		var tabContent = $("#tabContent");
		var tabNav = $("#tabNav");
		var glyj_dialog = $("#glyj_dialog");
		tabNav.find("span").eq(App.GlyjPage.defaults.index).addClass('selectSpan');
		tabNav.on("click","span",function(evt){
			var target = $(evt.target);
			target.siblings().removeClass("selectSpan").end().addClass('selectSpan');
			tabContent.find("div.contentListBox").siblings().css("display","none").end().eq(target.index()).css("display","block");
		})
		tabNav.find("span").eq(App.GlyjPage.defaults.index).click();
		glyj_dialog.on("click","li",function(evt){
			var dialogText = "";
			if($(this).index() == 0){
				dialogText = "请至集团app“制度”功能模块中查阅";
			}else if($(this).index() == 1){
				dialogText = "制度详情，请联系万达人员获取";
			}
			var Dlg = App.UI.Dialog.showMsgDialog({
				title:'温馨提示',
				text:dialogText,
				titleColor:"#333",
				css:{
					"line-height":"0.5333rem",
					"font-size":"0.3733rem",
					"text-align":"center"
				},
				okText:'我知道了',
				onok:function(){
					
				},
			})
			$(Dlg.dialog).find(".commDialogCancel").css("display","none");
			$(Dlg.dialog).find(".commDialogOk").css("width","100%");
			console.log($(this).index());
		})
	},
}