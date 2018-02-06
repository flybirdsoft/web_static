/*

design: wuweiwei
write by wuweiwei
www.github.com/flybirdsoft

*/
var App = {
	version : "1.0.0",
	stateObject : {
		
	},
	defaults:{
		outer:undefined,
	},
	hideNativeTitleBar : function(bool){
		function myDeviceReadyListener(){
		    cordova.exec(null, null, "WDNaviPlugin","hiddenNavi",["1"]);
		    $("#mainHeader").css("display","block");
		}
		if(bool)
		{
			document.addEventListener("deviceready", myDeviceReadyListener, false);
		}
		else
		{
			$("#mainHeader").show();
		}
	},
	hideMainMenu : function(){
		//隐藏主菜单(页面底部)
		var footer = document.getElementsByTagName("footer")[0];
		footer.style.display = "none";
	},
	showMainMenu : function(){
		//显示主菜单(页面底部)
		var footer = document.getElementsByTagName("footer")[0];
		footer.style.display = "block";
	},

	/*********************/
	Switch : {
		useLocalJson : true, /*使用本地JSON文件*/
		useNoCache   : true,  /*动态加载js不缓存*/
		publishObject: "publish_config" /*打包配置文件的变量名,此变量名在publish_config.js里配置*/
	},
	/*********************/

	setTemplateSymbol:function(){
		/*设置模板引擎的符号 即 {{XXX}}格式*/
		template.startSymbol("{{");
		template.endSymbol("}}");
	},


	setViewBox : function(node){
		var body = document.getElementsByTagName("body")[0];
		node.style.width = window.screen.width+"px";
		node.style.height = window.screen.height+"px";
	},
	setModelStyle : function(){
		//未使用
		$("footer").css("display","none");
		$("#mainContainer").css("margin-bottom","0");
		$("#mainContainer").css("bottom","0");
	},
	resetFrameStyle : function(){
		$("footer").css("display","block");
		$("#mainContainer").css("overflow","auto");
		$("#mainContainer").css("padding-bottom","1.656rem");
	},
	getRootElement : function(){
		this.rootDom = {};
		this.rootDom.$mainHeader = $("#mainHeader");
		this.rootDom.$mainContainer = $("#mainContainer");
		this.rootDom.$footer = $("footer");
	},
	footerNav:function(){
		$("#footerBox").on("click","div.footer-box",function(evt){
			var target = $(evt.target).closest("div.footer-box");
			target.addClass("footer-box-select").siblings().removeClass("footer-box-select");
		})
	},
	init : function(){
		this.getOS();
		this.setTemplateSymbol();
		this.getRootElement();
		this.footerNav();
	},
	getOS : function(){
		var ua = window.navigator.userAgent;
		var mainContainer = $("#mainContainer");
		if(ua.indexOf("Android")>0)
		{
			$("#mainHeader").find(".mobileBar").css("display","none");
			var mainHeader = $("#mainHeader");
			var mainHeaderH = mainHeader.height();
			mainContainer.css("padding-top",mainHeaderH+"px");
		}
		else
		{
			var mainHeader = $("#mainHeader");
			var mainHeaderH = mainHeader.height();
			mainContainer.css("padding-top",mainHeaderH+"px");
		}
	},
	getUserInfo:function(){//获取用户id

	}
};

App.init(); /**程序启动**/

App.UI = {
	Dialog : {
		initCommDialog : function(){
			this.commDlg = new wMobileDialog({
				className:"wMobileDialog",
				isClickClose:false,
				opacity:0.3,
				maskColor:"#000",
				titleBar:{
					caption:""
				}
			});
		},
		showCommDialog : function(options){
			var th = this;
			this.options = options;
			this.commDlg.show({
				container : $(".common_commDialog")[0],
				mask : true,
				title : options.title
			});
			if(options.hideTitleBar!=undefined&&options.hideTitleBar)
			{
				$(this.commDlg.dialog).find(".wMobileDialog-titleBar").hide();
			}
			else
			{
				$(this.commDlg.dialog).find(".wMobileDialog-titleBar").show();
			}
			options.element.style.display = "block";
			this.commDlg.dialog.style.marginTop = "0";
			var parentNode = this.parentNode = options.element.parentNode;
			console.log(parentNode);
			if(options.titleColor!=undefined)
			{
				$(this.commDlg.dialog).find(".wMobileDialog-title").css("color",options.titleColor);
			}
			else
			{
				$(this.commDlg.dialog).find(".wMobileDialog-title").css("color","#000");
			}
			$(".common_commDialog .commDialogContainer").html("");
			$(".common_commDialog .commDialogContainer")[0].appendChild(options.element);
			if(options.cancelText!=undefined)
			{
				$(this.commDlg.dialog).find(".commDialogCancel").html(options.cancelText);
			}
			else
			{
				$(this.commDlg.dialog).find(".commDialogCancel").html("取消");
			}
			if(options.okText!=undefined)
			{
				$(this.commDlg.dialog).find(".commDialogOk").html(options.okText);
			}
			else
			{
				$(this.commDlg.dialog).find(".commDialogOk").html("确定");
			}
			$(".common_commDialog .commDialogButtons .commDialogCancel")[0].onclick = function(e){
				if(options.oncancel!=undefined)
				{
					var r = options.oncancel(e);
					if(r!=undefined&&!r)
					{
						return;
					}
					parentNode.appendChild(options.element);
					th.commDlg.hide();					
				}
				else
				{
					parentNode.appendChild(options.element);
					th.commDlg.hide();
				}
			};
			$(".common_commDialog .commDialogButtons .commDialogOk")[0].onclick = function(e){
				if(options.onok!=undefined)
				{
					var r = options.onok(e);
					if(r!=undefined&&!r)
					{
						return;
					}
					parentNode.appendChild(options.element);
					th.commDlg.hide();
				}
				else
				{
					parentNode.appendChild(options.element);
					th.commDlg.hide();
				}

			};
			$(this.commDlg.dialog).find(".commDialogCancel").css("width","50%");
			$(this.commDlg.dialog).find(".commDialogOk").css("display","block");
			return this.commDlg;
		},
		hideCommDialog : function(){
			this.parentNode.appendChild(this.options.element);
			this.commDlg.hide();
		},
		showMsgDialog : function(options){
			var th = this;
			this.options = options;
			this.commDlg.show({
				container : $(".common_commDialog")[0],
				mask : true,
				title : options.title
			});
			$(this.commDlg.dialog).find(".wMobileDialog-titleBar").show();
			$(".common_commDialog .commDialogContainer").html(options.text);
			if(options.titleColor!=undefined)
			{
				$(this.commDlg.dialog).find(".wMobileDialog-title").css("color",options.titleColor);
			}
			else
			{
				$(this.commDlg.dialog).find(".wMobileDialog-title").css("color","#000");
			}
			if(options.css!=undefined)
			{
				var v;
				for(v in options.css)
				{
					$(".common_commDialog .commDialogContainer").css(v,options.css[v]);
				}
			}
			if(options.cancelText!=undefined)
			{
				$(this.commDlg.dialog).find(".commDialogCancel").html(options.cancelText);
			}
			else
			{
				$(this.commDlg.dialog).find(".commDialogCancel").html("取消");
			}
			if(options.okText!=undefined)
			{
				$(this.commDlg.dialog).find(".commDialogOk").html(options.okText);
			}
			else
			{
				$(this.commDlg.dialog).find(".commDialogOk").html("确定");
			}
			$(".common_commDialog .commDialogButtons .commDialogCancel")[0].onclick = function(e){
				if(options.oncancel!=undefined)
				{
					var r = options.oncancel(e);
					if(r!=undefined&&!r)
					{
						return;
					}
				}
				th.commDlg.hide();
			};
			$(".common_commDialog .commDialogButtons .commDialogOk")[0].onclick = function(e){
				if(options.onok!=undefined)
				{
					var r = options.onok(e);
					if(r!=undefined&&!r)
					{
						return;
					}
				}
				th.commDlg.hide();
			};
			$(this.commDlg.dialog).find(".commDialogCancel").css("width","50%");
			$(this.commDlg.dialog).find(".commDialogOk").css("display","block");
			return this.commDlg;
		},
		showTip : function(options){
			/*
			options.text
			options.timeout
			*/
			var node,body;
			node = document.getElementById("commonTip");
			if(node == null)
			{
				node = document.createElement("div");
				node.id="commonTip";
				node.innerHTML = options.text;
				body = document.getElementsByTagName("body")[0];
				body.appendChild(node);				
			}
			else
			{
				node.innerHTML = options.text;
				node.style.display="block";
			}
			setTimeout(function(){
				node.style.display="none";
			},options.timeout||2000);
		}
	},
	ImgDialog:{
		showImgDialog:function(ele,showEle,callback){//点击图片 弹出弹出层的方法
			var _this = this;
			var imgBg = $('<div class="imgCommBg"></div>');
			var imgCommContent = $('<div class="imgCommContentBg"><div class="imgCommContent"><div class="imgCommShowBox" id="imgCommShowBox"></div><div class="imgCommDeleteBtn">删除</div></div></div>');
			var key="",
				target="",
				targetName="",
				targetParent="",
				imgType="",
				imgHtmls="",
				showImgUrl="";
			if(showEle){//如果是添加图片的功能
				ele.on("click","li",function(evt){
					key = $(this).index();
					target = $(evt.target);
					targetName = target[0].tagName;
					if(targetName == "IMG"){
						showImgUrl = target.parent("li").attr("data-picurl");
					}
					if(key==0) return;
					imgHtmls='<span><img id="imgScaleZoom" src="/'+showImgUrl+'"></span>';
					imgCommContent.find(".imgCommShowBox").html(imgHtmls);
					$("body").append(imgBg);
					$("body").append(imgCommContent);
					$(".imgCommDeleteBtn").show();
					_this.bindDeleteBtnHandle("imgCommDeleteBtn",callback,key-1);//删除按钮执行的方法
					_this.imgDialogBindEvent("imgCommBg","imgCommContentBg");//绑定事件//
				})
			}else{
				ele.on("click",function(evt){
					target = $(evt.target);
					targetName = target[0].tagName;
					targetParent = target.parent("p");
					imgType = target.data("imgtype");
					if(targetParent.length>0 && !imgType){
						if(targetName == "IMG"){
							showImgUrl = target.attr("src");
						}
						imgHtmls='<span><img id="imgScaleZoom" src="'+showImgUrl+'"></span>';
						imgCommContent.find(".imgCommShowBox").html(imgHtmls);
						$("body").append(imgBg);
						$("body").append(imgCommContent);
						$(".imgCommDeleteBtn").hide();
						_this.bindDeleteBtnHandle("imgCommDeleteBtn");//删除按钮执行的方法
						_this.imgDialogBindEvent("imgCommBg","imgCommContentBg");//绑定事件//
					}else{
						if(!imgType) return;
						if(targetName == "IMG"){
							showImgUrl = target.attr("src");
						}
						imgHtmls='<span><img id="imgScaleZoom" src="'+showImgUrl+'"></span>';
						imgCommContent.find(".imgCommShowBox").html(imgHtmls);
						$("body").append(imgBg);
						$("body").append(imgCommContent);
						var bodyH = $(".imgCommBg").height();
						var imgH = $("#imgScaleZoom").height();
						if(imgH>bodyH){
							$("#imgScaleZoom").height(bodyH);
						}
						$(".imgCommDeleteBtn").hide();
						_this.bindDeleteBtnHandle("imgCommDeleteBtn");//删除按钮执行的方法
						_this.imgDialogBindEvent("imgCommBg","imgCommContentBg");//绑定事件
					}
					_this.bindScaleZoom();//缩放方法
				})
			}
		},
		bindScaleZoom:function(){//图片缩放功能方法
			var hammerBox = new Hammer(document.getElementById("imgScaleZoom"));
			var pinchscale = 1.0,
				pinchstartscale=1.0,
				maxX=0,
				maxY=0,
				startPosX=0,
				startPosY=0,
				PosX=0,
				PosY=0,
				baseScale=1,
				minScale=0.5,
				maxScale=3,
				movePosX=0,
				movePosY=0;
			var imgScaleZoom = $("#imgScaleZoom");
			hammerBox.get('pinch').set({
			    enable: true
			});
			hammerBox.get('pan').set({ 
				direction: Hammer.DIRECTION_ALL 
			})
			hammerBox.on("pinchstart",function(ev) {
				imgScaleZoom.css("max-width","auto");
			    pinchstartscale = pinchscale;
			    imgScaleZoom.css("left","auto");
			    imgScaleZoom.css("top","auto");
			});
			hammerBox.on("pinchmove",function(ev) {
				if(pinchstartscale*ev.scale>=minScale&&pinchstartscale*ev.scale<=maxScale){
					imgScaleZoom.css("transform","scale("+pinchstartscale*ev.scale,pinchstartscale*ev.scale+")");
				}
			});
			hammerBox.on("pinchend",function(ev) {
				if(pinchstartscale*ev.scale<baseScale){
					imgScaleZoom.css("transform","scale("+baseScale+","+baseScale+")");
					pinchscale=baseScale;
				}else if(pinchstartscale*ev.scale>maxScale){
					pinchscale=maxScale;
				}else if(pinchstartscale*ev.scale>=baseScale&&pinchstartscale*ev.scale<=maxScale){
					pinchscale = pinchstartscale*ev.scale;
				}
				maxX = imgScaleZoom.offset().left;
				maxY = imgScaleZoom.offset().top;
			});
			hammerBox.on("panstart",function(ev){
				if(pinchscale>1){
					movePosX = PosX;
					movePosY = PosY;
				}
			})
			hammerBox.on("panmove",function(ev){
				if(pinchscale>1){
					var dX = movePosX + ev.deltaX;
					var dY = movePosY + ev.deltaY;
					if(ev.additionalEvent == "pandown"){
						if(Math.abs(dY)>=Math.abs(maxY)){
							imgScaleZoom.css("top",(-maxY)+"px");
						}else{
							imgScaleZoom.css("top",dY+"px");
						}
					}else if(ev.additionalEvent == "panup"){
						if(Math.abs(dY)>=Math.abs(maxY)){
							imgScaleZoom.css("top",maxY+"px");
						}else{
							imgScaleZoom.css("top",dY+"px");
						}
					}else if(ev.additionalEvent == "panleft"){
						if(Math.abs(dX)>=Math.abs(maxX)){
							imgScaleZoom.css("left",maxX+"px");
						}else{
							imgScaleZoom.css("left",dX+"px");
						}
					}else if(ev.additionalEvent == "panright"){
						if(Math.abs(dX)>=Math.abs(maxX)){
							imgScaleZoom.css("left",(-maxX)+"px");
						}else{
							imgScaleZoom.css("left",dX+"px");
						}
					}
				}
			})
			hammerBox.on("panend",function(ev){
				if(ev.additionalEvent == "pandown"){
					if(Math.abs(movePosY + ev.deltaY)>=Math.abs(maxY)){
						PosY = -maxY;
					}else{
						PosY = movePosY + ev.deltaY;
					}
					PosX = movePosX + ev.deltaX
				}else if(ev.additionalEvent == "panup"){
					if(Math.abs(movePosY + ev.deltaY)>=Math.abs(maxY)){
						PosY = maxY;
					}else{
						PosY = movePosY + ev.deltaY;
					}
					PosX = movePosX + ev.deltaX
				}else if(ev.additionalEvent == "panleft"){
					if(Math.abs(movePosX + ev.deltaX)>=Math.abs(maxX)){
						PosX = maxX;
					}else{
						PosX = movePosX + ev.deltaX;
					}
					PosY = movePosY + ev.deltaY;
				}else if(ev.additionalEvent == "panright"){
					if(Math.abs(movePosX + ev.deltaX)>=Math.abs(maxX)){
						PosX = -maxX;
					}else{
						PosX = movePosX + ev.deltaX;
					}
					PosY = movePosY + ev.deltaY;
				}
			})
		},
		bindDeleteBtnHandle:function(ele,callback,index){//删除按钮执行的方法
			var $ele = $("."+ele);
			$ele.on("click",function(evt){
				callback(index);
			})
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
		}
	}
};

App.UI.Dialog.initCommDialog();


App.TitleBar = {
	PopMenu : {
		/*所有弹出式菜单*/
		callback : undefined,
		menuList : {
			model : [
				{
					name : "commentList",
					value : "批注列表"					
				},
				{
					name : "gotoHome",
					value : "返回首页"
				}			
			],
			modelNotesImg : [
				{
					name : "downloadImg",
					value : "下载图片"					
				},
				{
					name : "lookModel",
					value : "查看模型"					
				},
				{
					name : "gotoHome",
					value : "返回首页"
				}			
			],
		},
		createMenu : function(menuName,f){
			var htmltpl = '<div class="popMenuItem" name={name}>{caption}</div>';
			var html,htmls="";
			var i;
			var menuList = this.menuList[menuName];
			for(i=0;i<menuList.length;i++)
			{
				html = htmltpl;
				html = html.replace("{name}",menuList[i].name);
				html = html.replace("{caption}",menuList[i].value);
				htmls += html;
			}
			var $menuContainer = $("#headerPopMenu .popMenuContent");
			$menuContainer.html(htmls);
			this.callback = f;
			$("#mainHeader .header-popMenu")[0].onclick = function(e){
				var $headerPopMenu = $("#headerPopMenu");
				if($headerPopMenu.css("display")=="block")
				{
					$headerPopMenu.css("display","none");
				}
				else
				{
					$headerPopMenu.css("display","block");
				}
			}
		},
		bindEvent : function(){
			var th =this;
			var $menuContainer = $("#headerPopMenu .popMenuContent");
			$menuContainer.on("click",".popMenuItem",function(e){
				if(th.callback!=undefined)
				{
					th.callback.call(this,e);
					$("#headerPopMenu").css("display","none");
				}
			});
		}
	},
	setTitle : function(title){
		if(title==undefined)
		{
			$("#mainHeaderTitle").html("XXXX管理平台");
		}
		else
		{
			$("#mainHeaderTitle").html(title);
		}
		
	},
	returnCallback : function(f,callback){
		/*
		f=function(){}
		f="#/abc/def"
		*/
		var $headerReturn = App.rootDom.$mainHeader.find("header").find(".header-return");
		if(typeof(f)=="string")
		{
			$headerReturn[0].onclick = null;
			$headerReturn.find("a").attr("href",f);
		}
		else
		{
			$headerReturn.find("a").attr("href","javaScript:;");

			$headerReturn[0].onclick = function(){
				f();
				setTimeout(function(){
					callback&&callback();
				},1000);
			}
		}
		
	},

	hideAllPopMenu : function(){
		document.addEventListener("click",function(e){
			var target = e.target||e.srcElement;
			if(target.className == "headerPopMenu"||target.contains())
			{

			}
		},false);
	},
	initPopMenu : function(menuName){
		// var popMenu = this.PopMenu[menuName];
		// var i,menuItemTpl,menuItem;
		// menuItemTpl = '<div class="popMenuItem"><i class="{icon}"></i>{caption}</div>';

		// for(i=0;i<popMenu.length;i++)
		// {
		// 	menuItem = menuItemTpl.replace("{icon}",popMenu[i].icon).replace("{caption}",popMenu[i].caption);
		// 	$("#headerPopMenu .popMenuContent").append(menuItem);
		// }
	},
	showClose : function(){
		$("#mainHeader .header-return").hide();
		$("#mainHeader .header-close").show();
	},
	showReturn : function(){
		$("#mainHeader .header-close").hide();
		$("#mainHeader .header-return").show();
	},
	showPopMenuBtn : function(menuName,f){
		$("#mainHeader .header-popMenu").show();
		$("#mainHeader .header-popMenu-home").hide();
		if(arguments.length!=0)
		{
			this.PopMenu.createMenu(menuName,f);
		}		
	},
	hidePopMenuBtn : function(){
		$("#mainHeader .header-popMenu").hide();
	},
	showHomeBtn : function(){
		$("#mainHeader .header-popMenu").hide();
		$("#mainHeader .header-popMenu-home").show();
	},
	hideHomeBtn : function(){
		$("#mainHeader .header-popMenu").hide();
		$("#mainHeader .header-popMenu-home").hide();
	}

};

App.TitleBar.PopMenu.bindEvent();

App.Comm = {
	requireCache : [], /*缓存js文件路径,用于判断js文件是否加载*/
	ajax : function(options){
		/*
		options 与$.ajax()相同
		增加的参数：
		options.param = {key:value} ; 匹配URL(options.url)里的参数
		*/
		var th = this;
		var url = options.url;
		var v;
		for(v in options.param)
		{
			url = url.replace("{"+v+"}",options.param[v]);
		}

		$.ajax({
			url : url,
			type : options.type||"get",
			dataType : options.dataType||"html",
			data : options.data||{},
			success : function(data){
				var _data;
				_data = th.ajaxHandle(data);
				if(options.success!=undefined)
				{
					options.success.call(th,_data);
				}
			},
			error : function(e){
				if(options.error!=undefined)
				{
					options.error.call(th,e);
				}
			}
		});
	},
	ajaxHandle : function(data){
		
		return data;
	},

	require : function(url){
		var index = url.lastIndexOf(".");
		var type = url.substring(index + 1);
		var time = "";
		var i,isFail=false;/*isFail*/
		if(App.Switch.useNoCache)
		{
			time = "?time=" + (new Date()).getTime();
		}

		if(App.Switch.publishObject!=undefined)
		{
			var publishObject = eval(App.Switch.publishObject);
			var urls = publishObject.pkg[url];
			if(publishObject.pkg[url]!=undefined)
			{
				for(i=0;i<urls.length;i++)
				{
					if (App.Comm.requireCache.indexOf(urls[i]) == -1) /*加载过不再加载*/
					{
						App.Comm.requireCache.push(urls[i]);
					}
					else
					{
						continue;
					}

					if (type == "js") 
					{
						$("head").append('<script type="text/javascript" src="' + urls[i] + time + '"></script>');
					}
					else if (type = "css")
					{
						$("head").append('<link rel="styleSheet" href="' + urls[i] + time +  '" />');
					}					
				}
			}
			else
			{
				isFail = true;
			}
		}/*end if config*/

		//加载过不再加载,加载实际路径
		if (isFail && App.Comm.requireCache.indexOf(url) == -1)
		{
			App.Comm.requireCache.push(url);
		}
		else
		{
			return;
		}
		if (type == "js") 
		{
			$("head").append('<script type="text/javascript" src="' + url + time + '"></script>');
		}
		else if (type = "css") 
		{
			$("head").append('<link rel="styleSheet" href="' + url + time +  '" />');
		}
	},

	preLoadImages : function(arr){/*arr is url list*/
		var i,img;
		img = new Image();
		img.onload = function(e){
			console.log("image:",e);
		}

		for(i=0;i<arr.length;i++)
		{
			img.src = arr[i];
		}
	}
};
