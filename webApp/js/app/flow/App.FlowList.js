App.FlowList = {
	defaults:{
		id:"",//获取列表的id
		name:"",//当前模块的名字
		bgStyle:'',//默认logo的背景
	},
	init : function(arge){
		App.FlowList.defaults.name = arge.name;
		App.FlowList.defaults.id = arge.id;
		switch(arge.name){
			case "立项规划":
			App.FlowList.defaults.bgStyle="lxgh_color";
			break;
			case "设计报建":
			App.FlowList.defaults.bgStyle="sjbj_color";
			break;
			case "工程建设":
			App.FlowList.defaults.bgStyle="gcjs_color";
			break;
			case "移交运营":
			App.FlowList.defaults.bgStyle="yjyy_color";
			break;
			case "管理依据":
			App.FlowList.defaults.bgStyle="glyj_color";
			break;
		}
		this.initHandle();//初始化页面事件方法
		this.loadDataHandle();//获取列表的方法
	},
	initHandle:function(){//初始化页面事件方法
		App.TitleBar.setTitle(App.FlowList.defaults.name);//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.showHomeBtn() //显示home图片
		App.TitleBar.returnCallback("#/flow");
		App.hideMainMenu();//隐藏底部导航栏
		if(!$("#footerBox > div").eq(2).hasClass("footer-box-select")){//底部导航的定位
			$("#footerBox > div").eq(2).click();
		}
		$("#mainContainer").css("padding-bottom",0);
	},
	loadDataHandle:function(){//获取列表的方法
		var _this = this;
		var listDomBox = $("#listDomBox");
		var lodingDom = $('<div class="loading">加载中...</div>');
		listDomBox.html('');
		listDomBox.append(lodingDom);
		var data = {
			id:App.FlowList.defaults.id
		}
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.flowFolderList,
			param:data,
			dataType:"json",
			success:function(data){
				listDomBox.find(".loading").hide();
				if(data.code == 0){
					if(data.data.length>0){
						var repeatData = [];
						var listComponent = '<li id="listComponent"><a href="#/flowTextList/'+App.FlowList.defaults.name+'/'+App.FlowList.defaults.id+'/{{name}}"><div class="{{noBorder}}"><i class="iLogo '+App.FlowList.defaults.bgStyle+'"><img src="images/flow/{{iconImg}}.png"></i><h2>{{name}}</h2><i class="iRightImg"></i></div></a></li>';
						var result = data.data;
						listDomBox.html(listComponent);
						for(var i=0,len=data.data.length;i<len;i++){
							if(result[i].itemNames.length !==0){
								repeatData.push(result[i]);
							}
						}
						_this.viewPage(repeatData);
					}else{
						var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>")
						listDomBox.append(nullData);
					}
				}else{
					alert(data.message);
				}
			}
		});
	},
	viewPage:function(data){
		template.repeat({
			repeatElement : $("#listComponent")[0], /*页面的DOM元素*/
			data : data,
			process : function(itemObject){
				var key = itemObject.index;
				var item = itemObject.item;
				var iconImg="";
				var itemNames = item.itemNames;
				switch(item.categoryName){
					case "设计管理":
					iconImg="sjgl_icon";
					break;
					case "计划管理":
					iconImg="jhgl_icon";
					break;
					case "成本管理":
					iconImg="cbgl_icon";
					break;
					case "质量管理":
					iconImg="zlgl_icon";
					break;
					case "招商管理":
					iconImg="zsgl_icon";
					break;
					case "商管工程":
					iconImg="sggc_icon";
					break;
					case "发展管理":
					iconImg="fzgl_icon";
					break;
					case "经营管理":
					iconImg="fzgl_icon";
					break;
				}
				return {
					"name":item.categoryName,
					"iconImg":iconImg,
					"noBorder":key==data.length-1?"border-no-color":"border-bottom-color"
				}
			}
		});
	}
}