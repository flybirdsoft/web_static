App.TodoList = {
	defaults:{
		flag:true,
		title:'',
		status:1,
		pageIndex:1,
		searchCan:false,
		timeout:"",
		searchBool:false,
	},
	init : function(){
		App.TitleBar.setTitle("待办");
		App.TodoList.defaults.title = "";
		App.TodoList.defaults.searchBool = false;
		this.loadToDoData();//获取代办和已办的列表
		this.initHandle();//初始化方法
		this.setToDoRead();//设置代办是否已读
		this.searchInit();//初始化搜索方法
	},
	searchInit:function(){//搜索初始化方法
		var _this = this;
		$("#searchBtn").on("click",function(){
			var searchVal = $("#searchInput").val().trim();
			App.TodoList.defaults.title = searchVal;
			if(searchVal.length<=0){
				return;
			}
			if(App.TodoList.defaults.searchCan){
				$("#searchCommonBox").css("padding-top","2.906rem").css("display","block");
				App.TodoList.defaults.searchBool = true;
				_this.loadToDoData();//执行搜索获取数据
			}
		})
		$("#searchInput").on("keyup",function(evt){
		 	var targetVal = $(evt.target).val().trim();
		 	if(targetVal.length>0){
		 		$("#clearSearchVal").css("display","block");
		 	}
		})
		$("#clearSearchVal").on("click",function(){//清空输入框的文字
			App.TodoList.defaults.title = "";
			$(this).hide();
			$("#searchInput").val("");
		})
		$("#clearSearchBtn").on("click",function(){//点击清空搜索的文字
			$("#searchCommonBox").css("display","none");
			$("#clearSearchVal").css("display","none");
			$("#searchListBox").html("");
			$("#searchInput").val("");
			App.TodoList.defaults.title="";
			App.TodoList.defaults.searchBool = false;
		})
	},
	setToDoRead:function(){//设置代办是否已读
		var _this = this;
		$("#todoList").on("click",function(evt){
			var target = $(evt.target).closest("li");
			var todoId = target.data("id");
			var openUrl = target.data("url");
			var data = {
				todoId:todoId
			}
			App.Comm.ajax({
				type:"PUT",
				url: App.Restful.urls.todoRead,
				param:data,
				success:function(data){
					var jsonData = $.parseJSON(data);
					if(jsonData.code == 0){
						_this.loadToDoData();//获取代办和已办的列表
					}
				}
			});
			window.open(openUrl,"_blank");
		})
		$("#searchListBox").on("click","li",function(evt){
			var target = $(evt.target).closest("li");
			var todoId = target.data("id");
			var openUrl = target.data("url");
			var data = {
				todoId:todoId
			}
			App.Comm.ajax({
				type:"PUT",
				url: App.Restful.urls.todoRead,
				param:data,
				success:function(data){
					var jsonData = $.parseJSON(data);
					if(jsonData.code == 0){
						_this.loadToDoData();//获取代办和已办的列表
					}
				}
			});
			window.open(openUrl,"_blank");
		})
	},
	initHandle:function(){//初始化方法
		var _this = this;
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.returnCallback("#/index");
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
		$("#tabDom").on("click","li",function(event){
			var target = $(event.target).closest("li");
			var type = target.data("type");
			if(!target.hasClass("selectLi")){
				App.TodoList.defaults.title = "";
				App.TodoList.defaults.pageIndex=1;
				App.TodoList.defaults.flag=true;
				App.TodoList.defaults.status= type;
				if(App.TodoList.defaults.searchBool){
					$("#searchCommonBox").css("display","block");
				}
				$("#clearSearchVal").css("display","none");
				$("#searchInput").val("");
				target.addClass('selectLi').siblings().removeClass("selectLi");
				_this.loadToDoData();//获取代办和已办的列表
			}
		})
	},
	loadToDoData:function(){//获取待办和已办数据方法
		if(!App.TodoList.defaults.flag){
			return;
		}
		App.TodoList.defaults.flag=false;
		var th = this;
		var data = {
			title:App.TodoList.defaults.title,
			status:App.TodoList.defaults.status,//代办或者已办 
			pageIndex:App.TodoList.defaults.pageIndex,
			pageItemCount:"1000",
		}
		var todoList = $("ul#todoList");
		var searchListBox = $("#searchListBox");
		var lodingDom = $('<div class="loading">加载中...</div>');
		if(!App.defaults.outer){
			var listComponent = $('<li id="todoComponent" data-id="{{id}}" data-url="{{pcUrl}}" style="display:none"><i class="{{noRead}}">&nbsp;</i><p>[{{status}}级]{{title}}</p><div class="info {{noBorder}}">{{planStartDate}}{{planFinishDate}}</div></li>');
			var listSearchComponent = $('<li id="todoSearchComponent" data-id="{{id}}" data-url="{{pcUrl}}" style="display:none"><i class="{{noRead}}">&nbsp;</i><p>[{{status}}级]{{name}}</p><div class="info {{noBorder}}">{{planStartDate}}{{planFinishDate}}</div></li>');
		}else{
			var listComponent = $('<li id="todoComponent" data-id="{{id}}" data-url="{{pcUrl}}" style="display:none"><i class="{{noRead}}">&nbsp;</i><p>[{{sysFromName}}]{{title}}</p><div class="info {{noBorder}}">{{planStartDate}}{{planFinishDate}}</div></li>');
			var listSearchComponent = $('<li id="todoSearchComponent" data-id="{{id}}" data-url="{{pcUrl}}" style="display:none"><i class="{{noRead}}">&nbsp;</i><p>[{{sysFromName}}]{{name}}</p><div class="info {{noBorder}}">{{planStartDate}}{{planFinishDate}}</div></li>');
		}
		if(App.defaults.searchBool){
			searchListBox.html("");
			searchListBox.append(lodingDom);
			searchListBox.append(listSearchComponent);
		}else{
			todoList.html("");
			todoList.append(lodingDom);
			todoList.append(listComponent);
		}
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.todo,
			param:data,
			dataType:"json",
			success:function(data){
				App.TodoList.defaults.flag=true;
				App.TodoList.defaults.searchCan=true;
				if(data.code==0){
					if(App.TodoList.defaults.searchBool){
						searchListBox.find(".loading").remove();
					}else{
						todoList.find(".loading").remove();
					}
					$("#resultNum").html(data.data.totalItemCount);
					if(data.data.items.length==0){
						var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>")
						if(App.TodoList.defaults.searchBool){
							searchListBox.append(nullData);
							return;
						}
						todoList.html(nullData);
					}else{
						if(App.TodoList.defaults.searchBool){
							th.viewSearchProjectsPage(data.data.items);//搜索渲染的页面
							return;
						}
						th.viewTodo(data.data.items);
					}
				}
			}
		});
	},
	viewSearchProjectsPage : function(data){
		/*渲染数据*/
		template.repeat({
			repeatElement : $("#todoSearchComponent")[0], /*页面的DOM元素*/
			data : data,
			process : function(itemObject){
				var item = itemObject.item;
				var key = itemObject.index;
				var nameStr = item.title;
				var name = nameStr.replace(App.TodoList.defaults.title,'<span>'+App.TodoList.defaults.title+'</span>');
				if(item.planStartDate==null&&item.planFinishDate==null){
					return {
						"id":item.id,
						"name":name,
						"pcUrl":item.mobileUrl,
						"sysFromName":item.sysFromName,
						"planStartDate" : '<span class="fl">'+Assister.Date.getDateFromLong(item.receiveTime)+'</span>',
						"planFinishDate":'<span class="fl infoEndTime noIcon">'+item.initiatorName+'</span>',
						"noBorder":key==data.length-1?"border-no-color":"border-bottom-color",
						"noRead":item.read==true?"noRead":"",
					}
				}else{
					return {
						"id":item.id,
						"name":name,
						"pcUrl":item.mobileUrl,
						"sysFromName":item.sysFromName,
						"planStartDate" : '<span class="fl">开始：'+Assister.Date.getDateFromLong(item.planStartDate)+'</span>',
						"planFinishDate":'<span class="fl infoEndTime noIcon">完成：'+Assister.Date.getDateFromLong(item.planFinishDate)+'</span>',
						"noBorder":key==data.length-1?"border-no-color":"border-bottom-color",
						"noRead":item.read==true?"noRead":"",
					}
				}
			}
		});
	},
	viewTodo : function(data){
		/*渲染数据*/
		template.repeat({
			repeatElement : $("#todoComponent")[0], /*页面的DOM元素*/
			data : data,
			process : function(itemObject){
				var item = itemObject.item;
				var key = itemObject.index;
				if(item.planStartDate==null&&item.planFinishDate==null){
					return {
						"id":item.id,
						"pcUrl":item.mobileUrl,
						"sysFromName":item.sysFromName,
						"planStartDate" : '<span class="fl">'+Assister.Date.getDateFromLong(item.receiveTime)+'</span>',
						"planFinishDate":'<span class="fl infoEndTime noIcon">'+item.initiatorName+'</span>',
						"noBorder":key==data.length-1?"border-no-color":"border-bottom-color",
						"noRead":item.read==true?"noRead":"",
					}
				}else{
					return {
						"id":item.id,
						"pcUrl":item.mobileUrl,
						"sysFromName":item.sysFromName,
						"planStartDate" : '<span class="fl">开始：'+Assister.Date.getDateFromLong(item.planStartDate)+'</span>',
						"planFinishDate":'<span class="fl infoEndTime noIcon">完成：'+Assister.Date.getDateFromLong(item.planFinishDate)+'</span>',
						"noBorder":key==data.length-1?"border-no-color":"border-bottom-color",
						"noRead":item.read==true?"noRead":"",
					}
				}
			}
		});
	}
};
