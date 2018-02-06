App.ServiceRelated = {
	defaults:{
		pageIndex:1,
		pageItemCount:1500,
	},
	init : function(arge){
		this.initHandle();//初始化服务页面
		this.loadData();//加载列表数据方法
	},
	initHandle:function(){//初始化服务页面
		var osStr = navigator.userAgent;
		var isAndroid = osStr.indexOf('Android') > -1 || osStr.indexOf('Adr') > -1; //android终端
		var isiOS = !!osStr.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		App.TitleBar.setTitle("相关资源");//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.returnCallback("#/service");
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
		var listBox = $("#listBox");
		listBox.on("click","li",function(){
			if(!isAndroid && isiOS){
				cordova.exec(null, null, "WDNaviPlugin", "hiddenNavi",  ["0"]);
			}
		})
	},
	loadData:function(){//加载列表数据方法
		var _this = this;
		var data = {
			'keyString':'',
			'start':'',
			'end':'',
			'pageIndex':App.ServiceRelated.defaults.pageIndex,
			'pageItemCount':App.ServiceRelated.defaults.pageItemCount,
		}
		var listBox = $("#listBox");
		var lodingDom = $('<div class="loading">加载中...</div>');
		var listComponent=$('<li id="listComponent" style="display: none;"><a href="{{href}}" class="{{noBorder}}"><i>{{imgSrc}}</i><h2>{{name}}</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">{{size}}</span></p></a></li>');
		var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>");
		listBox.html("");
		listBox.append(lodingDom);
		listBox.append(listComponent);
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.getResourcesData,
			data:data,
			dataType:"json",
			success:function(data){
				if(data.code == 0){
					listBox.find(".loading").remove();
					if(data.data.items.length>0){
						_this.viewPage(data.data.items);
					}else{
						listBox.html(nullData);
					}
				}else{
					alert(data.message);
				}
			}
		})
	},
	viewPage : function(data){
		/*渲染数据*/
		template.repeat({
			repeatElement : $("#listComponent")[0], /*页面的DOM元素*/
			data : data,
			process : function(itemObject){
				var item = itemObject.item;
				var key = itemObject.index;
				var nameStr = item.name;
				var type = nameStr.substr(nameStr.lastIndexOf("."));
				var imgSrc = "";
				switch(type){
					case ".doc":
					imgSrc = '<img src=images/comm/word.png>';
					break;
					case ".docx":
					imgSrc = '<img src=images/comm/word.png>';
					break;
					case ".ppt":
					imgSrc = '<img src=images/comm/ppt.png>';
					break;
					case ".pptx":
					imgSrc = '<img src=images/comm/ppt.png>';
					break;
					case ".xls":
					imgSrc = '<img src=images/comm/excel.png>';
					break;
					case ".xlsx":
					imgSrc = '<img src=images/comm/excel.png>';
					break;
					case ".pdf":
					imgSrc = '<img src=images/comm/pdf.png>';
					break;
					case ".dwg":
					imgSrc = '<img src=images/comm/dwg_icon.png>';
					break;
					case ".rvt":
					imgSrc = '<img src=images/comm/rvt_icon.png>';
					break;
					default:
					imgSrc = '<img src=images/comm/default_icon.png>';
					break;
				}
				return {
					"name":item.name,
					"imgSrc":imgSrc,
					"href":'/platform/related/resources/download/'+item.id,
					"createTime":Assister.Date.getDateFromHMLong(item.createTime),
					"size":Assister.Size.formatSize(item.size),
					"noBorder":key==data.length-1?"border-no-color":"border-bottom-color"
				}
			}
		});
	}
}