/*
write by wuweiwei
function:常用函数
*/

(function(){
	var Assister = {
		version:"1.0",

		ChineseSort : function(arr){
			var resultArr=[];
			resultArr = array.sort(
			    function compareFunction(param1, param2) {
			        return param1.localeCompare(param2);
			    }
			);
		},

		Date : {
			guid : function(){
			    var date = new Date(),dataid="";
			    dataid = date.getFullYear().toString() + 
			             date.getMonth().toString() + 
			             date.getDate().toString() + 
			             date.getHours().toString() + 
			             date.getMinutes().toString() + 
			             date.getSeconds().toString() +
			             date.getMilliseconds().toString();
			    return dataid;
			},

			getLong : function(stringDate){
				/*
				stringDate is 2017-1-2
				*/
				var date = new Date(stringDate);
			    return date.getTime();
			},
			getDateCommon:function(value){// 当日起格式是一横杠分割的时候调用
				var newStr = value.replace(/-/g, ".");
				return newStr;
			},
			getDateFromHMLong : function(value){//带有时分的日期格式
				/*
				value is "19794234242" is 时间的毫秒格式
				*/
			    var date = new Date(value);
			    var month = (date.getMonth()+1)>=10?date.getMonth()+1:"0"+(date.getMonth()+1);
			    var day = date.getDate()>=10?date.getDate():"0"+date.getDate();
			    var h = date.getHours()>=10?date.getHours():"0"+date.getHours();
			    var m = date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes();
			    return date.getFullYear() + "." + month + "." + day + " " +h+":"+m;
			},
			getDateFromLong : function(value,format){
				/*
				value is "19794234242" is 时间的毫秒格式
				format is "yyyy-dd-mm hh:mm:ss"
				*/
			    var date = new Date(value);
			    var result="";
			    var month = (date.getMonth()+1)>=10?date.getMonth()+1:"0"+(date.getMonth()+1);
			    var day = date.getDate()>=10?date.getDate():"0"+date.getDate();
			    if(format==undefined)
			    {
			    	return date.getFullYear() + "." + month + "." + day;
			    }
			    else
			    {
			    	result = format;
			    	result = result.replace("yyyy",date.getFullYear());
			    	result = result.replace("mm",date.getMonth()+1);
			    	result = result.replace("dd",date.getDate());
			    	result = result.replace("hh",date.getHours());
			    	result = result.replace("mm",date.getMinutes());
			    	result = result.replace("ss",date.getSeconds());
			    }
			    
			}

		},
		Size:{
			formatSize:function(size){
				if (size === undefined || /\D/.test(size)) {
					return '';
				}
				if (size >= 1073741824) {
					return (size / 1073741824).toFixed(2) + 'GB';
				}
				if (size >= 1048576) {
					return (size / 1048576).toFixed(2) + 'MB';
				} else if (size >= 6) {
					return (size / 1024).toFixed(2) + 'KB';
				} else {
					return size + 'b';
				}
			}
		},

		getURLParam : function(key){
	        var search = location.search;
	        search = search.replace("?","");
	        var items = search.split("&");
	        var item,i;
	        for(i=0;i<items.length;i++)
	        {
	            item = items[i].split("=");
	            if(item[0]==key)
	            {
	                return item[1];
	            }
	        }
	        return ""; 
		},

		round : function(value,cn){
			/*
			cn is 保留的小数位数,is number
			*/
			var v = value;
			var i , pow = 1;
			for(i=0;i<cn;i++)
			{
				pow = pow * 10; 
			}
			v = v * pow + 0.5;
			v = parseInt(v);
			return v/pow;
		}
	};

	window.Assister = Assister;
})();

