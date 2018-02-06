App.SearchHeightPage = {
	defaults:{
		groupVal:'all',//字母组
		singleVal:'',//单字母组
		partitionVal:'',//分区
		typeVal:'',//类型
		provinceVal:'',//省份
		practiceDate:'',//开业
		delistDate:'',//摘牌
		currentZhaiPaiYear:'',
		currentZhaiPaiMonth:'',
		currentZhaiPaiDay:'',
		currentKaiYeYear:'',
		currentKaiYeMonth:'',
		currentKaiYeDay:'',
		pageIndex:1,
		pageItemCount:1000,
		projectProvince:[],
		singleValArr : {
			groupAG:['A','B','C','D','E','F','G'],
			groupHN:['H','I','J','K','L','M','N'],
			groupOT:['O','P','Q','R','S','T'],
			groupUZ:['U','V','W','X','Y','Z'],
		}
	},
	init:function(args){
		App.SearchHeightPage.defaults.currentZhaiPaiYear="";
		App.SearchHeightPage.defaults.currentZhaiPaiMonth="";
		App.SearchHeightPage.defaults.currentZhaiPaiDay="";
		App.SearchHeightPage.defaults.currentKaiYeYear="";
		App.SearchHeightPage.defaults.currentKaiYeMonth="";
		App.SearchHeightPage.defaults.currentKaiYeDay="";
		this.bindClearBtnHandle();//重置按钮的方法
		this.initHandle(args);//初始化方法
	},
	initHandle:function(){//初始化方法
		App.TitleBar.setTitle("高级搜索");
		App.TitleBar.hidePopMenuBtn();//隐藏顶部三个点按钮
		App.TitleBar.hideHomeBtn() //显示home图片
		App.TitleBar.returnCallback("#/Projects");
		App.hideMainMenu();//隐藏底部导航栏
		$("#mainContainer").css("padding-bottom",0);
		this.getProjectProvince();//获取项目身份
		this.getProjectsData();//默认获取项目列表
		this.bindTabEventGroupHandle("itemsGroupBtnBox","span","selectBtnBox");//首字母组的事件 
		this.bindTabEventSingleHandle("itemSingleBtnBox","span","selectBtnBox");//初始化绑定点击切换背景的方法
		this.bindTabEventHandle("itemsPartitionBtnBox","span","selectBtnBox");//初始化绑定点击切换背景的方法
		this.bindTabEventHandle("itemsTypeBtnBox","span","selectBtnBox");//初始化绑定点击切换背景的方法
		this.bindSelectMapHandle("selectMap");//绑定选择省份点击弹出层方法
		this.bindSelectDateHandle("selectZhaiPaiDate","摘牌");//绑定选择日期点击弹出层方法
		this.bindSelectDateHandle("selectKaiYeDate","开业");//绑定选择日期点击弹出层方法
		this.bindClearBtnHandle("clearBtn");//重置按钮的方法
		this.bindSubmitBtnHandle("submitBtn");//提交按钮的方法
		this.bindShowMoreBtnHandle("showMoreBtn");//展示更多方法
	},
	bindShowMoreBtnHandle:function(eleBox){//展示更多方法
		var $elementBox = $("#"+eleBox);
		var projectItemsList = $("#projectItemsList");
		$elementBox.on("click",function(){
			if(!projectItemsList.hasClass('showMoreList')){
				projectItemsList.addClass('showMoreList');
				$elementBox.html("收起全部列表");
			}else{
				projectItemsList.scrollTop(0);
				projectItemsList.removeClass('showMoreList');
				$elementBox.html("显示全部项目");
			}
		})
	},
	getProjectProvince:function(){
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.getProjectsProvinceData,
			dataType:"json",
			success:function(data){
				if(data.code == 0){
					App.SearchHeightPage.defaults.projectProvince=data.data;
				}else{
					alert(data.message);
				}
			}
		});
	},
	getProjectsData:function(param){//默认获取项目列表
		var projectItemsList = $("#projectItemsList");
		var liHtml = '';
		var defaultData = {
			initialRange:"",//首字母范围
			initial:"",//首字母
			pageIndex:App.SearchHeightPage.defaults.pageIndex,
			pageItemCount:App.SearchHeightPage.defaults.pageItemCount,
			type:3,
		}
		var data = $.extend({}, defaultData, param);
		projectItemsList.html('');
		projectItemsList.html('<li>加载中...</li>');
		App.Comm.ajax({
			type:"get",
			url:App.Restful.urls.getProjectsData,
			data:data,
			dataType:"json",
			success:function(data){
				if(data.code == 0){
					if(data.data.items.length>0){
						if(data.data.items.length>3){
							$("#showMoreBtn").show();
							$(".searchHeight_projectsListBox").css("padding-bottom","0.853rem");
						}else{
							$("#showMoreBtn").hide();
							$(".searchHeight_projectsListBox").css("padding-bottom","0");
						}
						for(var i=0,len=data.data.items.length;i<len;i++){
							var id = data.data.items[i].id;
							var name = data.data.items[i].name;
							var openUrl = "#/project/"+id+"/"+id+"/"+name;
							liHtml += '<li><a href='+openUrl+'>'+name+'</a></li>';
						}
					}else{
						liHtml += '<li>暂无数据!</li>';
					}
					projectItemsList.html(liHtml);
				}else{
					alert(data.message);
				}
			}
		});
	},
	bindTabEventSingleHandle:function(eleBox,ele,tabClass){//初始化绑定点击切换背景的方法
		var _this = this;
		var $elementBox = $("#"+eleBox);
		$elementBox.on("click",ele,function(){
			if($(this).hasClass(tabClass)) return;
			_this.getProjectsData({initialRange:"",initial:$(this).html()});//默认获取项目列
			$(this).siblings().removeClass(tabClass).end().addClass(tabClass);
		})
	},
	bindTabEventGroupHandle:function(eleBox,ele,tabClass){//首字母组的事件 
		var _this = this;
		var itemSingleBtnBox = $("#itemSingleBtnBox");
		var $elementBox = $("#"+eleBox);
		$elementBox.on("click",ele,function(){
			if($(this).hasClass(tabClass)) return;
			$(this).siblings().removeClass(tabClass).end().addClass(tabClass);
			if($(this).html() == "全部"){
				_this.getProjectsData({initialRange:""});//默认获取项目列表
			}else{
				_this.getProjectsData({initialRange:$(this).html()});//默认获取项目列
			}
			var singleValArr = App.SearchHeightPage.defaults.singleValArr['group'+$(this).data("value")];
			var singleHtml = '';
			if(singleValArr&&singleValArr.length>0){
				for(var i=0,len=singleValArr.length;i<len;i++){
					singleHtml+='<span>'+singleValArr[i]+'</span>';
				}
				itemSingleBtnBox.html(singleHtml).css("display","-webkit-flex").css("display","flex");
			}else{
				itemSingleBtnBox.html("").css("display","none");
			}
		})
	},
	bindSubmitDateBtnHandle:function(eleDom,type){
		var _this = this;
		var $eleDom = $("#"+eleDom);
		$eleDom.off("click");
		$eleDom.on("click",function(){
			var currentYear = type=="摘牌"?App.SearchHeightPage.defaults.currentZhaiPaiYear:App.SearchHeightPage.defaults.currentKaiYeYear;
			var currentMonth = type=="摘牌"?App.SearchHeightPage.defaults.currentZhaiPaiMonth:App.SearchHeightPage.defaults.currentKaiYeMonth;
			var currentDay = type=="摘牌"?App.SearchHeightPage.defaults.currentZhaiPaiDay:App.SearchHeightPage.defaults.currentKaiYeDay;
			if(type=="摘牌"){
				$("#selectZhaiPaiDate").val(currentYear+"-"+currentMonth+"-"+currentDay);
			}else if(type=="开业"){
				$("#selectKaiYeDate").val(currentYear+"-"+currentMonth+"-"+currentDay);
			}
			_this.hideDialog("selectDateBg","selectDateBox");//隐藏弹出层
		})
	},
	clearHandle:function(){//清空方法
		App.SearchHeightPage.defaults.groupVal="all";
		App.SearchHeightPage.defaults.singleVal="";
		App.SearchHeightPage.defaults.partitionVal="";
		App.SearchHeightPage.defaults.typeVal="";
		App.SearchHeightPage.defaults.provinceVal="";
		App.SearchHeightPage.defaults.practiceDate="";
		App.SearchHeightPage.defaults.delistDate="";
		$("#itemsGroupBtnBox > span").removeClass("selectBtnBox").eq(0).addClass("selectBtnBox");
		$("#itemSingleBtnBox > span").removeClass("selectBtnBox");
		$("#itemsPartitionBtnBox > span").removeClass("selectBtnBox");
		$("#itemsTypeBtnBox > span").removeClass("selectBtnBox");
		$("#selectMap").val("");
		$("#selectZhaiPaiDate").val("");
		$("#selectKaiYeDate").val("");
		$("#itemSingleBtnBox").html("").css("display","none");
	},
	bindClearBtnHandle:function(eleBox) {//重置按钮的方法
		var _this = this;
		if(eleBox){
			var $elementBox = $("#"+eleBox);
			$elementBox.on("click",function(){
				_this.clearHandle();//清空方法
			})
		}else{
			_this.clearHandle();//清空方法
		}
	},
	bindSubmitBtnHandle:function(eleBox) {//提交按钮的方法
		var $elementBox = $("#"+eleBox);
		$elementBox.on("click",function(){
			var itemSingleBtnBoxVal,itemsPartitionBtnBoxVal,itemsTypeBtnBoxVal,selectMapVal,selectZhaiPaiDateVal,selectKaiYeDateVal;
			var itemsGroupBtnBoxVal = $("#itemsGroupBtnBox span.selectBtnBox").html().trim();
			var itemSingleBtnBox = $("#itemSingleBtnBox span.selectBtnBox");
			var itemsPartitionBtnBox = $("#itemsPartitionBtnBox span.selectBtnBox");
			var itemsTypeBtnBox = $("#itemsTypeBtnBox span.selectBtnBox");
			selectMapVal = $("#selectMap").val().trim();//所属省份
			selectZhaiPaiDateVal = $("#selectZhaiPaiDate").val().trim();//摘牌日值 
			selectKaiYeDateVal = $("#selectKaiYeDate").val().trim();//开业日值 
			if(itemsGroupBtnBoxVal == "全部"){//首字母
				itemsGroupBtnBoxVal = "";
			}
			if(itemSingleBtnBox.length>0){//首字母
				itemSingleBtnBoxVal = itemSingleBtnBox.html().trim();
			}else{
				itemSingleBtnBoxVal = "";
			}
			if(itemsPartitionBtnBox.length>0){//分区
				itemsPartitionBtnBoxVal = itemsPartitionBtnBox.html().trim();
			}else{
				itemsPartitionBtnBoxVal = "";
			}
			if(itemsTypeBtnBox.length>0){//类型
				itemsTypeBtnBoxVal = itemsTypeBtnBox.data("id");
			}else{
				itemsTypeBtnBoxVal = "";
			}
			var initialRangeVal = (itemSingleBtnBoxVal=="")?itemsGroupBtnBoxVal:"";

			var data = {
				initialRange:initialRangeVal,//首字母范围
				initial:itemSingleBtnBoxVal,//首字母
				region:itemsPartitionBtnBoxVal,//分区
				subType:itemsTypeBtnBoxVal,//项目类型
				province:selectMapVal,//所属省份
				delistingDate:selectZhaiPaiDateVal,//摘牌日
				openTimeStart:selectKaiYeDateVal,//开业日
				pageIndex:App.SearchHeightPage.defaults.pageIndex,
				pageItemCount:App.SearchHeightPage.defaults.pageItemCount,
				type:3,
			}
			App.Comm.ajax({
				type:"get",
				url:App.Restful.urls.getProjectsData,
				data:data,
				dataType:"json",
				success:function(data){
					if(data.code == 0){
						App.defaults.SearchHeightData = data.data.items;
						window.location.href = "#/Projects";
					}else{
						alert(data.message);
					}
				}
			})
		})
	},
	bindTabEventHandle:function(eleBox,ele,tabClass){//初始化绑定点击切换背景的方法
		var $elementBox = $("#"+eleBox);
		$elementBox.on("click",ele,function(){
			if($(this).hasClass(tabClass)) return;
			$(this).siblings().removeClass(tabClass).end().addClass(tabClass);
		})
	},
	bindSelectMapHandle:function(eleBox){//绑定选择省份点击弹出层方法
		var _this = this;
		var $elementBox = $("#"+eleBox);
		$elementBox.mousedown(function(e){
			e.preventDefault();
		})
		$elementBox.on("click",function(e){
			var selectProvinceBg = $('<div class="selectProvinceBg"></div>');
			var selectProvinceBox = $('<div class="selectProvinceBox"><div class="selectProvinceTitleBox">请选择省份</div><div class="selectProvinceContentBox"><div class="selectProvinceScrollBox"></div></div></div>');
			var componentDom = $('');
			var arrData = App.SearchHeightPage.defaults.projectProvince;
			var preovinceDom = '';
			$("body").append(selectProvinceBg);
			$("body").append(selectProvinceBox);
			var selectProvinceScrollBox = $(".selectProvinceScrollBox");
			for(var i=0,len=arrData.length;i<len;i++){
				preovinceDom+='<span data-val="'+arrData[i].province+'">'+arrData[i].province+'</span>';
			}
			selectProvinceScrollBox.html(preovinceDom);
			selectProvinceBg.on("click",function(){
				_this.hideDialog("selectProvinceBg","selectProvinceBox");//隐藏弹出层
			});
			selectProvinceScrollBox.on("click","span",function(){
				App.SearchHeightPage.defaults.provinceVal = $(this).data("val");
				$elementBox.val($(this).data("val"));
				_this.hideDialog("selectProvinceBg","selectProvinceBox");//隐藏弹出层
			})
			return false
		})
	},
	bindSelectDateHandle:function(eleBox,type){//绑定日期点击弹出层方法
		var _this = this;
		var $elementBox = $("#"+eleBox);
		var dateTimePlugin = $("#dateTimePlugin");
		$elementBox.mousedown(function(e){
			e.preventDefault();
		})
		$elementBox.on("click",function(e){
			var currentDate = new Date();
			var selectDateBg = $('<div class="selectDateBg"></div>');
			var selectDateBox = $('<div class="selectDateBox"><div class="selectDateTitleBox">请选择日期</div><div class="selectDateContentBox"></div></div>');
			$("body").append(selectDateBg);
			$("body").append(selectDateBox);
			var selectDateContentBox = $(".selectDateContentBox");
			selectDateContentBox.html(dateTimePlugin);
			dateTimePlugin.css("display","block");
			$("#dateYear ul").html(_this.creatYearUl());//拼接年的dom
			$("#dateMonth ul").html(_this.creatMonthUl());//拼接月的dom
			$("#dateDay ul").html(_this.creatDayUl());//拼接天的dom
			_this.bindScrollHandle(type);//绑定滚动效果
			_this.refreshDate(type);//刷新时间滚动
			_this.bindSubmitDateBtnHandle("submitDateBtn",type);//提交选择日期按钮的方法
			selectDateBg.on("click",function(){
				_this.hideDialog("selectDateBg","selectDateBox");//隐藏弹出层
			});
			return false
		})
	},
	refreshDate:function(type){
		var currentDate,yearText,monthText,dayText;
		var yearLiDom = $("#dateYear").find("li");
		var monthLiDom = $("#dateMonth").find("li");
		var dayLiDom = $("#dateDay").find("li");
		var pageHenght = yearLiDom.height();
		if(type == "摘牌"){
			if(!App.SearchHeightPage.defaults.currentZhaiPaiYear){
				currentDate = new Date();
				yearText = currentDate.getFullYear();
				monthText = currentDate.getMonth()+1;
				dayText = currentDate.getDate();
			}else{
				yearText = App.SearchHeightPage.defaults.currentZhaiPaiYear;
				monthText = App.SearchHeightPage.defaults.currentZhaiPaiMonth;
				dayText = App.SearchHeightPage.defaults.currentZhaiPaiDay;
			}
		}else if(type == "开业"){
			if(!App.SearchHeightPage.defaults.currentKaiYeYear){
				currentDate = new Date();
				yearText = currentDate.getFullYear();
				monthText = currentDate.getMonth()+1;
				dayText = currentDate.getDate();
			}else{
				yearText = App.SearchHeightPage.defaults.currentKaiYeYear;
				monthText = App.SearchHeightPage.defaults.currentKaiYeMonth;
				dayText = App.SearchHeightPage.defaults.currentKaiYeDay;
			}
		}
		for(var i=0,len=yearLiDom.length;i<len;i++){
			if($(yearLiDom[i]).html() == yearText){
				App.SearchHeightPage.defaults.yearScroll.scrollTo(0, (i-1)*pageHenght, 100, true);
				break;
			}
		}
		for(var i=0,len=monthLiDom.length;i<len;i++){
			if($(monthLiDom[i]).html() == monthText){
				App.SearchHeightPage.defaults.monthScroll.scrollTo(0, (i-1)*pageHenght, 100, true);
				break;
			}
		}
		for(var i=0,len=dayLiDom.length;i<len;i++){
			if($(dayLiDom[i]).html() == dayText){
				App.SearchHeightPage.defaults.dayScroll.scrollTo(0, (i-1)*pageHenght, 100, true);
				break;
			}
		}
	},
	creatYearUl:function(){
		var yearObj = {
			startYear:1950,//开始年
			endYear:2100,//结束年
		}
		var str="<li>&nbsp;</li>";
		for(var i=yearObj.startYear; i<=yearObj.endYear;i++){
			str+='<li>'+i+'</li>'
		}
		return str+"<li>&nbsp;</li>";
	},
	creatMonthUl:function(){
		var monthObj = {
			startMonth:1,//开始年
			endMonth:12,//结束年
		}
		var str="<li>&nbsp;</li>";
		for(var i=monthObj.startMonth;i<=monthObj.endMonth;i++){
			if(i<10){
				i="0"+i
			}
			str+='<li>'+i+'</li>'
		}
		return str+"<li>&nbsp;</li>";
	},
	creatDayUl:function(){
		var dayObj = {
			startDay:1,//开始年
			endDay:31,//结束年
		}
		$("#dateDay ul").html("");
		var str="<li>&nbsp;</li>";
		for(var i=dayObj.startDay;i<=dayObj.endDay;i++){
			if(i<10){
				i="0"+i
			}
			str+='<li>'+i+'</li>'
		}
		return str+"<li>&nbsp;</li>";
	},
	bindScrollHandle:function(type){//绑定滚动效果
		var _this = this;
		App.SearchHeightPage.defaults.yearScroll = new iScroll("dateYear",{
			snap:"li",
			vScrollbar:false,
			onScrollEnd:function () {
				var pageHenght = $("#dateYear").find("li").height();
				var pageIndex = Math.abs(Math.round(this.y/pageHenght))+1;
				var dateYear = $("#dateYear ul").find("li").eq(pageIndex).html();
				if(type=="摘牌"){
					App.SearchHeightPage.defaults.currentZhaiPaiYear = dateYear;
				}else if(type=="开业"){
					App.SearchHeightPage.defaults.currentKaiYeYear = dateYear;
				}
				/*indexY = (this.y/40)*(-1)+1;
				opts.endday = checkdays(strY,strM);
				$("#daywrapper ul").html(createDAY_UL());
				dayScroll.refresh();*/
			}
		});
		App.SearchHeightPage.defaults.monthScroll = new iScroll("dateMonth",{
			snap:"li",
			vScrollbar:false,
			onScrollEnd:function (){
				var pageHenght = $("#dateYear").find("li").height();
				var pageIndex = Math.abs(Math.round(this.y/pageHenght))+1;
				var dateMonth = $("#dateMonth ul").find("li").eq(pageIndex).html();
				if(type=="摘牌"){
					App.SearchHeightPage.defaults.currentZhaiPaiMonth = dateMonth;
				}else if(type=="开业"){
					App.SearchHeightPage.defaults.currentKaiYeMonth = dateMonth;
				}
				/*indexM = (this.y/40)*(-1)+1;
				opts.endday = checkdays(strY,strM);
				$("#daywrapper ul").html(createDAY_UL());
				dayScroll.refresh();*/
			}
		});
		App.SearchHeightPage.defaults.dayScroll = new iScroll("dateDay",{
			snap:"li",
			vScrollbar:false,
			onScrollEnd:function () {
				var pageHenght = $("#dateYear").find("li").height();
				var pageIndex = Math.abs(Math.round(this.y/pageHenght))+1;
				var dateDay = $("#dateDay ul").find("li").eq(pageIndex).html();
				if(type=="摘牌"){
					App.SearchHeightPage.defaults.currentZhaiPaiDay = dateDay;
				}else if(type=="开业"){
					App.SearchHeightPage.defaults.currentKaiYeDay = dateDay;
				}
				// indexD = (this.y/40)*(-1)+1;
			}
		});
	},
	hideDialog:function(hideBg,hideBox){//隐藏弹出层
		$("."+hideBg).hide().remove();
		$("."+hideBox).hide().remove();
	},

}	