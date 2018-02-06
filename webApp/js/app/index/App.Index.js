App.Index = {
	init : function(){
		this.loading();//加载中
		this.loadData();
		this.bindEvent();
		App.TitleBar.initPopMenu("projectPopMenu");
	},
	loading:function(){
		$("#toBox").find(".nullData").remove();
		$("#broadcastBox").find(".nullData").remove();
	},
	loadData : function(){
		var th = this;

		this.loadToDoData();//获取代办数据方法
		this.loadNoticeData();//获取公告数据方法
		
	},
	loadToDoData:function(){//获取代办数据方法
		var th = this;

		App.Comm.ajax({
			type:"get",
			url:"/jsonData/todo.json",
			dataType:"html",
			success:function(_data){
				var data = JSON.parse(_data);
				if(data.code==0){
					th.viewTodo(data.data);   /***渲染数据***/
				}
			},
			error:function(e){
				console.log(e);
			}
		});
	},
	loadNoticeData:function(){//获取公告数据方法
		var th = this;
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.notice,
			dataType:"html",
			success:function(_data){
				var data = JSON.parse(_data);
				if(data.code==0){
					th.viewBroadcast(data.data);  /***渲染数据***/
				}
			}
		});
	},
	
	bindEvent : function(){
	},

	viewTodo : function(data){   /*输出代办的页面*/
		/*渲染数据*/
		template.repeat({
			repeatElement : $("#todo")[0], /*页面的DOM元素（数据渲染模板）*/
			data : data,
			count: 5,
			process : function(itemObject){
				var item = itemObject.item;
				var index = itemObject.index;
				return {
					"id":item.id,
					"pcUrl":item.mobileUrl,
					"planStartDate" : Assister.Date.getDateFromLong(item.planStartDate),
					"planFinishDate": Assister.Date.getDateFromLong(item.planFinishDate),
					"noBorder": index==data.length-1?"border-no-color":"border-bottom-color",
					"noRead": item.read==true?"noRead":"",
				}
			}
		});
	},
	viewBroadcast : function(data){
		/*渲染数据*/
		console.log(data);
		template.repeat({
			repeatElement : $("#broadcast")[0], /*页面的DOM元素*/
			data : data
		});
	}
};
