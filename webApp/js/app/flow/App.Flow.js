App.Flow = {
	defaults:{
		searchName:'',
		searchCan:true,
		pageIndex:1,
		pageItemCount:1500,
	},
	init : function(){
		this.initHandle();//初始化页面事件方法
		this.loadData();//获取业务流程的列表
	},
	initHandle:function(){//初始化页面事件方法
		var _this = this;
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.hideHomeBtn();//隐藏顶部返回首页
		App.TitleBar.showClose();//隐藏顶部返回首页
		if(!$("#footerBox > div").eq(2).hasClass("footer-box-select")){//底部导航的定位
			$("#footerBox > div").eq(2).click();
		}
		this.searchInit();//搜索初始化方法
	},
	searchInit:function(){//搜索初始化方法
		var _this = this;
		$("#searchBtn").on("click",function(){
			var searchVal = $("#searchInput").val().trim();
			App.Flow.defaults.searchName = searchVal;
			if(searchVal.length<=0){
				return;
			}
			if(App.Flow.defaults.searchCan){
				$("#searchCommonBox").css("display","block");
				_this.searchData();//公用搜索方法
			}
		})
		$("#searchInput").on("keyup",function(evt){
		 	var targetVal = $(evt.target).val().trim();
		 	if(targetVal.length>0){
		 		$("#clearSearchVal").css("display","block");
		 	}
		})
		$("#clearSearchVal").on("click",function(){
			App.Flow.defaults.searchName = "";
			$(this).hide();
			$("#searchInput").val("");
		})
		$("#clearSearchBtn").on("click",function(){
			$("#searchCommonBox").css("display","none");
			$("#clearSearchVal").css("display","none");
			$("#searchListBox").html("");
			$("#searchInput").val("");
			App.Flow.defaults.searchName="";
		})
	},
	searchData:function(){//公用搜索方法
		var _this = this;
		var searchListBox = $("#searchListBox");
		var lodingDom = $('<div class="loading">加载中...</div>');
		searchListBox.html('');
		searchListBox.append(lodingDom);
		App.Flow.defaults.searchCan = false;
		var data = {
			name:App.Flow.defaults.searchName,
			pageIndex:App.Flow.defaults.pageIndex,
			pageItemCount:App.Flow.defaults.pageItemCount,
		}
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.flowSearchData,
			data:data,
			dataType:"json",
			success:function(data){
				searchListBox.find(".loading").hide();
				if(data.code == 0){
					App.Flow.defaults.searchCan = true;
					$("#resultNum").html(data.data.totalItemCount);
					if(data.data.items.length>0){
						var listComponent = '<li id="searchListComponent"><a href="#/flowDetailPage/{{topName}}/{{topId}}/{{folderName}}/{{openName}}" class="{{noBorder}}"><h2>{{name}}</h2><p>{{pathName}}</p></a></li>';
						searchListBox.html(listComponent);
						_this.searchDataPage(data.data.items);//渲染搜索数据
					}else{
						var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>")
						searchListBox.append(nullData);
					}
				}else{
					alert(data.message);
				}
			}
		});
	},
	searchDataPage:function(data){//渲染搜索数据
		template.repeat({
			repeatElement : $("#searchListComponent")[0], /*页面的DOM元素*/
			data : data,
			process : function(itemObject){
				var key = itemObject.index;
				var item = itemObject.item;
				var nameStr = item.itemName+(item.isPlan?"<span>[模块化]</span>":"");
				var name = nameStr.replace(App.Flow.defaults.searchName,'<span>'+App.Flow.defaults.searchName+'</span>');
				var pathNameStr = item.phaseName+' > '+item.categoryName;
				return {
					"name":name,
					"topName":item.phaseName,
					"topId":item.phaseId,
					"folderName":item.categoryName,
					"openName":item.itemName,
					"pathName":pathNameStr,
					"noBorder":key==data.length-1?"border-no-color":"border-bottom-color"
				}
			}
		});
	},
	loadData:function(){//获取业务流程的列表
		var _this = this;
		var flowTopListBox = $("#flowTopListBox");
		var lodingDom = $('<div class="loading">加载中...</div>');
		flowTopListBox.html('');
		flowTopListBox.append(lodingDom);
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.flowList,
			dataType:"json",
			success:function(data){
				flowTopListBox.find(".loading").hide();
				if(data.code == 0){
					if(data.data.length>0){
						var listComponent = '<li id="listComponent"><a href="#/flowList/{{itemName}}/{{id}}"><div class="{{noBorder}}"><i class="iLogo"><img src="images/flow/{{iconImg}}.png"></i><h2>{{name}}</h2><i class="iRightImg"></i></div></a></li>';
						flowTopListBox.html(listComponent);
						_this.viewPage(data.data);
					}else{
						var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>")
						flowTopListBox.append(nullData);
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
				var name="",
					iconImg="";
				switch(item.order){
					case 1:
					iconImg="lxgh_img";
					name="Ⅰ."+item.name;
					break;
					case 2:
					iconImg="sjbj_img";
					name="Ⅱ."+item.name;
					break;
					case 3:
					iconImg="gcjs_img";
					name="Ⅲ."+item.name;
					break;
					case 4:
					iconImg="yjyy_img";
					name="Ⅳ."+item.name;
					break;
				}
				return {
					"id":item.id,
					"name":name,
					"itemName":item.name,
					"iconImg":iconImg,
					"noBorder":key==data.length-1?"border-no-color":"border-bottom-color"
				}
			}
		});
	}
}