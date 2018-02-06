
/*
对话框组件
write by wuweiwei
*/


(function(win){
	var wMobileDialog = function(options){

		this.body = document.getElementsByTagName("body")[0];
		this.options = options;
		if(this.options==undefined)
		{
			this.options = {};
		}
		this.create();
		this.bindEvent();
	};

	wMobileDialog.prototype.create = function(){
		var th = this;
		var mask = document.createElement("div");
		mask.id = "wMobile_mask";
		mask.style.position = "fixed";
		mask.style.top = "0";
		mask.style.left = "0";
		mask.style.width = "100%";
		mask.style.height = "100%";
		mask.style.backgroundColor = this.options.maskColor || "#000";
		mask.style.opacity = this.options.opacity || 0.5;
		mask.style.display = "none";

		mask.style.zIndex = this.options.zIndex || 2000;
		this.body.appendChild(mask);
		this.mask = mask;

		var dialog = document.createElement("div");
		this.dialog = dialog;
		dialog.id = this.options.id || "wMobileDialog";
		dialog.style.position = "fixed";
		dialog.style.top = "50%";
		dialog.style.left = "50%";

		dialog.style.overflow = "hidden";
		
		if(this.options.width!=undefined)
		{
			dialog.style.width = this.options.width + "px";
		}
		if(this.options.height!=undefined)
		{
			dialog.style.height = this.options.height + "px";
		}
		dialog.style.display = "none";
		dialog.style.zIndex = this.options.zIndex == undefined ? 2010 : this.options.zIndex+10;

		if(this.options.className != undefined)
		{
			this.dialog.className = this.options.className;
		}
		else
		{
			this.dialog.className = "wMobileDialog";
		}

		if(this.options.titleBar!=undefined)
		{
			var BarHtml = '<span class="wMobileDialog-title" style="display:block;float:left;">{caption}</span><i style="font-style:normal;display:block;float:right;cursor:pointer">{closeText}</i>';
			this.titleBar = document.createElement("div");
			this.titleBar.className = this.dialog.className + "-titleBar";
			this.titleBar.style.overflow = "hidden";

			if(this.options.titleBar.caption!=undefined)
			{
				BarHtml = BarHtml.replace("{caption}",this.options.titleBar.caption);
			}
			else
			{
				BarHtml = BarHtml.replace("{caption}","标题栏");
			}
			if(this.options.titleBar.closeText!=undefined)
			{
				BarHtml = BarHtml.replace("{closeText}",this.options.titleBar.closeText);
			}
			else
			{
				BarHtml = BarHtml.replace("{closeText}","X");
			}
			this.titleBar.innerHTML = BarHtml;
			this.titleBar.getElementsByTagName("i")[0].onclick = function(e){
				if(th.options.titleBar.onclose!=undefined)
				{
					var r = th.options.titleBar.onclose.call(th,e);
					if(!r)
					{
						return;
					}
				}
				th.hide();
			}
			this.dialog.appendChild(this.titleBar);
		}
		this.body.appendChild(dialog);
	}

	wMobileDialog.prototype.bindEvent = function(){
		var th = this;
		if(this.options.isClickClose!=undefined&&this.options.isClickClose)
		{
			this.mask.onclick = this.dialog.onclick = function(e){
				th.hide();
			}
		}
	}

	wMobileDialog.prototype.show = function(options){

		var th = this;
		var offsetWidth=0  , offsetHeight=0;
		if(options==undefined)
		{
			options = {};
		}
		if(options.text!=undefined)
		{
			this.dialog.innerHTML = options.text || "";
		}
		if(options.container!=undefined)
		{
			this.dialog.appendChild(options.container);
			this.container = options.container;
			this.container.style.display = "block";
		}
		if(options.title!=undefined)
		{
			this.titleBar.getElementsByTagName("span")[0].innerHTML = options.title;
		}
		if(options.mask!=undefined && options.mask)
		{
			this.mask.style.display = "block";
		}
		this.dialog.style.display = "block";
		if(options.timeout!=undefined)
		{
			setTimeout(function(){
				th.dialog.style.display = "none";
			},options.timeout);
		}
		offsetWidth = this.dialog.offsetWidth;
		offsetHeight = this.dialog.offsetHeight;
		this.dialog.style.marginLeft = "-" + offsetWidth/2 + "px";
		this.dialog.style.marginTop = "-" + offsetHeight/2 + "px";
	}

	wMobileDialog.prototype.hide = function(){
		this.dialog.style.display = "none";
		this.mask.style.display = "none";
		if(this.container!=undefined)
		{
			this.container.style.display = "none";
			this.body.appendChild(this.container);
		}
	}


	win["wMobileDialog"] = wMobileDialog;
})(window);

