App.FlowTextList = {
	defaults:{
		id:'',
		name:'',
		folderName:'',
	},
	init : function(arge){
		App.FlowTextList.defaults.folderName = arge.folderName;
		App.FlowTextList.defaults.name = arge.name;
		App.FlowTextList.defaults.id = arge.id;
		this.initHandle();//初始化页面事件方法
		this.loadList();//加载列表方法
	},
	initHandle:function(){//初始化页面事件方法
		App.TitleBar.setTitle(App.FlowTextList.defaults.folderName);//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.showHomeBtn() //显示home图片
		App.TitleBar.returnCallback("#/flowList/"+App.FlowTextList.defaults.name+"/"+App.FlowTextList.defaults.id);
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
		if(!$("#footerBox > div").eq(2).hasClass("footer-box-select")){//底部导航的定位
			$("#footerBox > div").eq(2).click();
		}
	},
	loadList:function(){//加载列表方法
		var _this = this;
		var flowListBox = $("#flowListBox");
		var lodingDom = $('<div class="loading">加载中...</div>');
		flowListBox.html('');
		flowListBox.append(lodingDom);
		var data = {
			phaseId:App.FlowTextList.defaults.id,
			categoryName:App.FlowTextList.defaults.folderName
		}
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.flowItemsNameList,
			param:data,
			dataType:"json",
			success:function(data){
				flowListBox.find(".loading").hide();
				if(data.code == 0){
					if(data.data.itemNames.length>0){
						var listComponent = '<li id="listComponent"><a href="#/flowDetailPage/'+App.FlowTextList.defaults.name+'/'+App.FlowTextList.defaults.id+'/'+App.FlowTextList.defaults.folderName+'/{{openName}}" class="{{noBorder}}">{{name}}</a></li>'
						flowListBox.html(listComponent);
						_this.viewPage(data.data.itemNames);
					}else{
						var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>")
						flowListBox.append(nullData);
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
				var name = item.name+(item.suffix?"<span>"+item.suffix+"</span>":"");
				return {
					"openName":item.name.replace("/","."),
					"name":name,
					"noBorder":key==data.length-1?"border-no-color":"border-bottom-color"
				}
			}
		});
	}
}