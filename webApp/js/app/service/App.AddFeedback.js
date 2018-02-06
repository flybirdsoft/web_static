App.AddFeedback = {
	defaults:{
		imgListData:[],
		title:"",
		addDesc:"",
		uploadUrl:"",
		canAdd:false,
		userDataBool:false,
	},
	init : function(arge){
		App.AddFeedback.defaults.canAdd = false;
		App.AddFeedback.defaults.userDataBool = false;
		App.AddFeedback.defaults.imgListData = [];
		App.AddFeedback.defaults.title = "";
		App.AddFeedback.defaults.addDesc = "";
		App.AddFeedback.defaults.uploadUrl = "http://"+window.location.host+":"+(window.location.port==""?80:window.location.port)+'/platform/advice/feedback/upload';
		this.initHandle();//初始化服务页面
		App.getUserInfo();
	},
	initHandle:function(){//初始化服务页面
		var _this = this;
		App.TitleBar.setTitle("建议反馈");//设置顶部标题
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.returnCallback("#/serviceFeedback");
		App.hideMainMenu();//隐藏底部导航栏
		if(!App.defaults.userData){
			App.Comm.ajax({
				url: App.Restful.urls.current,
				success:function(data){
					var jsonData = $.parseJSON(data);
					if(jsonData.code==0){
						App.defaults.userData = jsonData.data;
						App.AddFeedback.defaults.userDataBool = true;
					}else{
						alert(data.message);
					}
				}
			});
		}else{
			App.AddFeedback.defaults.userDataBool = true;
		}
		$("#addImgBtn").on("click",function(){//点击添加图片按钮执行的方法
			cordova.exec(_this.onSuccessMoreUplaod, _this.onFail, "WDImagePlugin", "multipleImage", [{ "maxNumber": "10", "urlType": "1","quality": "100","maxSize":"300"}]);
		})
		$("#addFeedbackBtn").on("click",function(){
			var addFeedbackTitle = $("#addFeedbackTitle").val().trim();
			var textareaVal = $("#textareaVal").val().trim();
			if(addFeedbackTitle.length>0&&textareaVal.length>0){
				App.AddFeedback.defaults.title = addFeedbackTitle;
				App.AddFeedback.defaults.addDesc = textareaVal;
				_this.ajaxSubmitHandle();//点击提交按钮执行的方法
			}else{
				var Dlg = App.UI.Dialog.showMsgDialog({
					text : "请输入标题和反馈内容！",
					css:{
						"text-align":"center"
					},
					okText : "确定",
					cancelText : "取消",
				});
				$(Dlg.dialog).find(".commDialogContainer").css("padding-top","20px");
				$(Dlg.dialog).find(".commDialogCancel").css("display","none");
				$(Dlg.dialog).find(".wMobileDialog-titleBar").css("display","none");
				$(Dlg.dialog).find(".commDialogOk").css("width","100%");
				return;
			}
			return false;
		})
		App.UI.ImgDialog.showImgDialog($("#addImgList"),true,function(index){
			$(".addImgBox").eq(index).remove();
			App.AddFeedback.defaults.imgListData.splice(index,1);
		});
		$("#mainContainer").css("padding-bottom",0);
	},
	uploadmoreimage:function(imageBigUrl){//上传图片的方法
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = imageBigUrl.substr(imageBigUrl.lastIndexOf('/') + 1);
		var headers = { 
			"p": "upload"
		};
		options.params = headers;
		var ft = new FileTransfer();
		ft.onprogress = function (progressEvent) {
			if (progressEvent.lengthComputable) {
				var p = Math.round(progressEvent.loaded / progressEvent.total * 100);
				$("#addImgList").find("span").html("正在上传"+ options.fileName+"(" + p + "%)");
			}
		}
		ft.upload(imageBigUrl,App.AddFeedback.defaults.uploadUrl , App.AddFeedback.win, App.AddFeedback.fail, options);
	},
	win:function(result){
		var res = JSON.parse(result.response);
		var data = res.data;
		var fileName = data.attachmentName;
		var fileId = data.attachmentId;
		var url = 'platform/advice/feedback/download/'+fileId;
		$("li[name='"+fileName+"']").attr("data-picurl",url);
		$("span[name='"+fileName+"']").remove();
		App.AddFeedback.defaults.imgListData.push({'id':fileId});
	},
	fail:function(error) {
		alert("上传失败=="+JSON.stringify(error));
	},
	onSuccessMoreUplaod:function(imageurl){
		App.hideNativeTitleBar(true);
		if(imageurl == undefined || imageurl == "undefined" || imageurl == null || imageurl == "null" || imageurl == "" || imageurl.length == 0 || imageurl=="用户取消操作"){
			// alert("用户取消操作");
			return false;
		}
		for(var i = 0;i < imageurl.length; i++){
			var fileName = imageurl[i]["imageUrl"].substr(imageurl[i]["imageUrl"].lastIndexOf('/') + 1);
			$("#addImgList").append('<li class="addImgBox" name="'+fileName+'"><img src="data:image/jpeg;base64,'+imageurl[i]["imageData"]+'"><span name="'+fileName+'">上传中...</span></li>');
			App.AddFeedback.uploadmoreimage(imageurl[i]["imageUrl"]);
		}
	},
	onFail:function(message){//取消选取照片之后
		alert(message);
	},
	ajaxSubmitHandle:function(){//点击提交按钮执行的方法
		var _this = this;
		var data = {
			"createId":App.defaults.userData.userId,
			"createName":App.defaults.userData.name,
			"loginName":App.defaults.userData.loginName,
			"title":App.AddFeedback.defaults.title,
			"content":App.AddFeedback.defaults.addDesc,
			"attachmentList":App.AddFeedback.defaults.imgListData,
		};
		var addFeedbackBtn = $("#addFeedbackBtn").find("button");
		addFeedbackBtn.html("上传中...");
		App.Comm.ajax({
			type:"POST",
			url:App.Restful.urls.addFeebackData,
			data:JSON.stringify(data),
			dataType:"json",
			contentType: "application/json",
			success:function(response){
				addFeedbackBtn.html("提交");
				if(response.code == 0){
					window.location.href = "#/serviceFeedback";
				}else{
					alert(response.message);
				}
			}
		});
	},
}