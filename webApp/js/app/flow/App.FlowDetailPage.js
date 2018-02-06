App.FlowDetailPage = {
	defaults:{
		id:'',
		name:'',
		folderName:'',
		parName:'',
	},
	init : function(arge){
		App.FlowDetailPage.defaults.folderName = arge.folderName;
		App.FlowDetailPage.defaults.name = arge.name;
		App.FlowDetailPage.defaults.id = arge.id;
		App.FlowDetailPage.defaults.parName = arge.parName.replace(".","/");
		this.initHandle();//初始化页面事件方法
		this.loadFlowDetail();//通过名字获取详细内容
	},
	initHandle:function(){//初始化页面事件方法
		App.TitleBar.setTitle("详情");//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.showHomeBtn() //显示home图片
		App.TitleBar.returnCallback("#/flowTextList/"+App.FlowDetailPage.defaults.name+"/"+App.FlowDetailPage.defaults.id+'/'+App.FlowDetailPage.defaults.folderName);
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
		if(!$("#footerBox > div").eq(2).hasClass("footer-box-select")){//底部导航的定位
			$("#footerBox > div").eq(2).click();
		}
	},
	loadFlowDetail:function(){//通过名字获取详细内容
		var _this = this;
		var data = {
			itemName:App.FlowDetailPage.defaults.parName,
			simpleMode:false
		}
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.flowDetailData,
			data:data,
			dataType:"json",
			success:function(data){
				if(data.code == 0){
					$("#flowDetailTile").html(App.FlowDetailPage.defaults.parName);
					// $("#flowDetailTile").html(data.data.isPlan?App.FlowDetailPage.defaults.parName+"[模块化]":App.FlowDetailPage.defaults.parName);
					_this.viewPage(data.data);
				}else{
					alert(data.message);
				}
			}
		});
	},
	viewPage:function(data){
		template.repeat({
			repeatElement : $("#flowDetailContent")[0], /*页面的DOM元素*/
			data : data,
			process : function(itemObject){
				var key = itemObject.index;
				var item = itemObject.item;
				return {
					"mainOrg":item.mainOrg,
					"subOrg":item.subOrg,
					"receiveOrg":item.receiveOrg,
					"beginTime":item.beginTime,
					"endTime":item.endTime,
					"period":item.period,
					"result":item.result,
					"deatilRule":item.deatilRule,
					"standard":item.standard?item.standard:"暂无",
				}
			}
		});
	}
}