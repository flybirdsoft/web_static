App.Projects = {
	defaults:{
		searchName:"",
		type:3,
		pageIndex:1,
		pageItemCount:1000,
		flag:true,
		searchBool:false,
		searchCan:false,
	},
	init : function(){
		this.initHandle();//初始化方法
		if(App.defaults.SearchHeightData){
			this.serachHeightDataHandle();//如果存在高级搜索的值
		}else{
			this.loadData(); //加载项目列表方法
		}
	},
	serachHeightDataHandle:function(){//如果存在高级搜索的值
		var searchListBox = $("#searchListBox");
		var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>");
		var projectComponentSearch=$('<li class="{{noBorder}}" id="projectComponentSearch" style="display: none;"><a href="#/project/{{projectId}}/{{versionId}}/{{openName}}"><div class="m_list_logo">{{projectLogo}}</div><dl><dt>{{name}}</dt><dd>{{province}}·{{region}}</dd></dl></a></li>');
		$("#searchCommonBox").css("display","block");
		searchListBox.html("");
		searchListBox.append(projectComponentSearch);
		$("#resultNum").html(App.defaults.SearchHeightData.length);
		if(App.defaults.SearchHeightData.length>0){
			this.viewSearchProjectsPage(App.defaults.SearchHeightData);//搜索渲染的页面
		}else{
			searchListBox.append(nullData);
		}
		
	},
	initHandle : function(){
		App.Projects.defaults.searchName = "";
		App.Projects.defaults.searchBool = false;
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.hideHomeBtn() //显示home图片
		App.TitleBar.showClose();//隐藏顶部三个点按钮
		this.searchInit();//初始化搜索方法
		if(!$("#footerBox > div").eq(1).hasClass("footer-box-select")){
			$("#footerBox > div").eq(1).click();
		}
	},
	searchInit:function(){//搜索初始化方法
		var _this = this;
		$("#searchBtn").on("click",function(){
			var searchVal = $("#searchInput").val().trim();
			App.Projects.defaults.searchName = searchVal;
			if(searchVal.length<=0){
				return;
			}
			if(App.Projects.defaults.searchCan){
				$("#searchCommonBox").css("display","block");
				App.Projects.defaults.searchBool = true;
				_this.loadData();//执行搜索获取数据
			}
		})
		$("#searchInput").on("keyup",function(evt){
		 	var targetVal = $(evt.target).val().trim();
		 	if(targetVal.length>0){
		 		$("#clearSearchVal").css("display","block");
		 	}
		})
		$("#clearSearchVal").on("click",function(){
			App.Projects.defaults.searchName = "";
			$(this).hide();
			$("#searchInput").val("");
		})
		$("#clearSearchBtn").on("click",function(){
			$("#searchCommonBox").css("display","none");
			$("#clearSearchVal").css("display","none");
			$("#searchListBox").html("");
			$("#searchInput").val("");
			App.Projects.defaults.searchName="";
			App.defaults.SearchHeightData = "";
			_this.loadData();//加载项目列表方法
		})
	},
	loadData : function(){//加载项目列表方法
		if(!App.Projects.defaults.flag){
			return;
		}
		App.Projects.defaults.flag=false;
		var th = this;
		var data = {
			type:App.Projects.defaults.type,//项目列表
			projectName:App.Projects.defaults.searchName,//项目名字
			pageIndex:App.Projects.defaults.pageIndex,
			pageItemCount:App.Projects.defaults.pageItemCount,
		}
		var projectList = $("#projectList");
		var searchListBox = $("#searchListBox");
		var lodingDom = $('<div class="loading">加载中...</div>');
		var listComponent=$('<li id="projectComponent" style="display: none;"><a class="{{noBorder}}" href="#/project/{{projectId}}/{{versionId}}/{{name}}"><div class="m_list_logo">{{projectLogo}}</div><dl><dt>{{name}}</dt><dd>{{province}}·{{region}}</dd></dl></a></li>');
		var projectComponentSearch=$('<li class="{{noBorder}}" id="projectComponentSearch" style="display: none;"><a href="#/project/{{projectId}}/{{versionId}}/{{openName}}"><div class="m_list_logo">{{projectLogo}}</div><dl><dt>{{name}}</dt><dd>{{province}}·{{region}}</dd></dl></a></li>');
		if(App.Projects.defaults.searchBool){
			searchListBox.html("");
			searchListBox.append(lodingDom);
			searchListBox.append(projectComponentSearch);
		}else{
			projectList.html("");
			projectList.append(lodingDom);
			projectList.append(listComponent);
		}

		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.projectsList,
			param:data,
			dataType:"html",
			success:function(_data){
				console.log(_data);
				var data = JSON.parse(_data);
				if(App.Projects.defaults.searchBool){
					searchListBox.find(".loading").remove();
				}else{
					projectList.find(".loading").remove();
				}
				App.Projects.defaults.flag=true;
				App.Projects.defaults.searchCan=true;
				$("#resultNum").html(data.data.totalItemCount);
				if(data.data.length==0){
					var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>");
					if(App.Projects.defaults.searchBool){
						searchListBox.append(nullData);
						return;
					}
					projectList.append(nullData);
				}else{
					if(App.Projects.defaults.searchBool){
						th.viewSearchProjectsPage(data.data.items);//搜索渲染的页面
						return;
					}
					th.viewProjectsPage(data.data);
				}
			}
		});
	},
	viewSearchProjectsPage:function(data){//搜索渲染的页面
		/*渲染数据*/
		template.repeat({
			repeatElement : $("#projectComponentSearch")[0], /*页面的DOM元素*/
			data : data,
			process : function(itemObject){
				var item = itemObject.item;
				var key = itemObject.index;
				var nameStr = item.name;
				var name = nameStr.replace(App.Projects.defaults.searchName,'<span>'+App.Projects.defaults.searchName+'</span>');
				return {
					"projectId":item.id,
					"versionId":item.version.id,
					"projectLogo":'<img src="/'+item.logoUrl.middle+'">',
					"name":name,
					"openName":nameStr,
					"province":item.province,
					"region":item.region,
					"noBorder":key==data.length-1?"border-no-color":"border-bottom-color"
				}
			}
		});
	},
	viewProjectsPage : function(data){
		/*渲染数据*/
		template.repeat({
			repeatElement : $("#projectComponent")[0], /*页面的DOM元素*/
			data : data,
			process : function(itemObject){
				var item = itemObject.item;
				var key = itemObject.index;
				return {
					"projectId":item.id,
					"versionId":item.versionId,
					"projectLogo":'<img src="/'+item.logoUrl+'">',
					"name":item.name,
					"province":item.province,
					"region":item.region,
					"noBorder":key==data.length-1?"border-no-color":"border-bottom-color"
				}
			}
		});
	}
};
