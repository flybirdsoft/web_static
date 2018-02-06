App.GlyjDetailPage = {
	defaults:{
		name:"",
		index:'',
	},
	init : function(arge){
		App.GlyjDetailPage.defaults.name = arge.name;
		App.GlyjDetailPage.defaults.index = arge.index;
		$(".glyjContentBox > div").css("display","none");
		if(arge.name == "1.1总权责界面"){
			$(".glyjContentBox_div1").css("display","block");
			// this.imgClickHandle("glyjContentBox_div1");
		}else if(arge.name == "1.2.1计划管理职责"){
			$(".glyjContentBox_div2").css("display","block");
			// this.imgClickHandle("glyjContentBox_div2");
		}else if(arge.name == "1.2.2设计管理职责"){
			$(".glyjContentBox_div3").css("display","block");
			// this.imgClickHandle("glyjContentBox_div3");
		}else if(arge.name == "1.2.3成本管理职责"){
			$(".glyjContentBox_div4").css("display","block");
			// this.imgClickHandle("glyjContentBox_div4");
		}else if(arge.name == "1.2.4质量管理职责"){
			$(".glyjContentBox_div5").css("display","block");
			// this.imgClickHandle("glyjContentBox_div5");
		}
		this.initHandle();//初始化页面事件方法
	},
	initHandle:function(){//初始化页面事件方法
		$("h2#titleBox").html(App.GlyjDetailPage.defaults.name);
		App.TitleBar.setTitle("详情");//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.showHomeBtn() //显示home图片
		App.TitleBar.returnCallback("#/glyjPage/"+App.GlyjDetailPage.defaults.name+"/"+App.GlyjDetailPage.defaults.index+"");
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
		if(!$("#footerBox > div").eq(2).hasClass("footer-box-select")){//底部导航的定位
			$("#footerBox > div").eq(2).click();
		}
		App.UI.ImgDialog.showImgDialog($(".imgBox"));
	},
	imgClickHandle:function(ele){
		var imgs = $("."+ele).find("img");
		imgs.on("click",function(evt){
			var target = $(evt.target);
			var bgBox = $('<div class="flowImgBg" id="flowImgBgBtn"><img src="'+$(this).attr("src")+'"></div>');
			$("body").append(bgBox);
			$("#flowImgBgBtn").on("click",function(){
				$(this).fadeOut().remove();

			})
		})
	}
}