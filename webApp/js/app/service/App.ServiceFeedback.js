App.ServiceFeedback = {
	defaults:{
		pageIndex:1,
		pageItemCount:1500,
	},
	init:function(arge){
		var _this = this;
		this.initHandle();//初始化页面的方法
		if(!App.defaults.userData){
			App.Comm.ajax({
				url: App.Restful.urls.current,
				success:function(data){
					var jsonData = $.parseJSON(data);
					if(jsonData.code==0){
						App.defaults.userData = jsonData.data;
						_this.loadData();//获取建议反馈列表的方法
					}else{
						alert(data.message);
					}
				}
			});
		}else{
			this.loadData();//获取建议反馈列表的方法
		}
		
	},
	initHandle:function(){//初始化页面的方法
		App.TitleBar.setTitle("建议反馈");//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.returnCallback("#/service");
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
		App.UI.ImgDialog.showImgDialog($("#listContentBox"));
	},
	imgDialogBindEvent:function(ele1,ele2){//绑定事件
		var $ele1 =$("."+ele1);
		var $ele2 =$("."+ele2);
		$ele1.on("click",function(){
			$(this).remove()
			$(".imgCommContentBg").remove()
		})
		$ele2.on("click",function(){
			$(this).remove()
			$(".imgCommBg").remove()
		})
	},
	loadData:function(){
		var _this = this;
		var data = {
			query:'all',
			title:'',
			createId:App.defaults.userData.userId,
			content:'',
			createName:'',
			opTimeStart:'',
			opTimeEnd:'',
			haveReply:"",
			pageIndex:App.ServiceFeedback.defaults.pageIndex,
			pageItemCount:App.ServiceFeedback.defaults.pageItemCount,
		};
		var listContentBox = $("#listContentBox");
		var lodingDom = $('<div class="loading">加载中...</div>');
		var nullData = $("<div class='nullData'><div class='nullDataImg'></div><p>暂时还没有任何内容哦～</p></div>");
		listContentBox.append(lodingDom);
		listContentBox.find('dl[templateitem="templateItem"]').remove();
		App.Comm.ajax({
			type:"post",
			url:App.Restful.urls.getFeebackData,
			data:JSON.stringify(data),
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				if(data.code == 0){
					listContentBox.find(".loading").remove();
					if(data.data.items.length>0){
						_this.viewPage(data.data.items);
					}else{
						listContentBox.html(nullData);
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
				var userLogo = '<img src="/platform/user/'+item.createId+'/photo">';
				var imgHtml = "",
					attachmentHtml = "",
					replyText = "";
				if(item.havaAttachment && item.attachmentList.length>0){
					for(var i=0,len=item.attachmentList.length;i<len;i++){
						var attachmentName = item.attachmentList[i].attachmentName;
						var attachmentSize = Assister.Size.formatSize(item.attachmentList[i].attachmentSize);
						var type = attachmentName.substr(attachmentName.lastIndexOf("."));
						var typeStr = type.toLowerCase();
						var imgSrc = '/platform/advice/feedback/downloads?attachmentIds='+item.attachmentList[i].id;
						var downSrc = '/platform/advice/feedback/downloads?attachmentIds='+item.attachmentList[i].id;
						switch(typeStr){
							case ".jpg":
							imgHtml+='<li><img data-imgtype="true" src='+imgSrc+'></li>';
							break;
							case ".gif":
							imgHtml+='<li><img data-imgtype="true" src='+imgSrc+'></li>';
							break;
							case ".png":
							imgHtml+='<li><img data-imgtype="true" src='+imgSrc+'></li>';
							break;
							case ".doc":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/word.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							case ".docx":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/word.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							case ".ppt":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/ppt.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							case ".pptx":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/ppt.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							case ".xls":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/excel.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							case ".xlsx":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/excel.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							case ".pdf":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/pdf.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							case ".dwg":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/dwg_icon.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							case ".rvt":
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/rvt_icon.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
							default:
							attachmentHtml+='<li><a href="'+downSrc+'"><i><img src=images/comm/default_icon.png></i><h2>'+attachmentName+'</h2><p><span class="fl service_date">{{createTime}}</span><span class="fr service_size">'+attachmentSize+'</span></p></a></li>';
							break;
						}
					}
				}
				if(item.haveReply){
					replyText = item.adviceReplys[0].content;
				}
				return {
					"title":item.title,
					"userLogo":userLogo,
					"content":item.content.length>0?item.content:"",
					"contentBool":item.content.length>0?"":"noContent",
					"imgComponent":imgHtml,
					"attachmentComponent":attachmentHtml,
					"replyText":replyText,
					"showReply":item.haveReply?"haveReplyTrue":"",
					"showUpload":item.havaAttachment?"showUploadTrue":"",
					"createTime":Assister.Date.getDateFromHMLong(item.createTime),
					"noBorder":key==data.length-1?"border-no-color":"border-bottom-color"
				}
			}
		});
	}
}