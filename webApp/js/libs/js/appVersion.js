/**
 * Created by imobile on 15/6/9.
 */

function appVersionUpdate(appVersionNew){
    var appversion =  $.cookie('appVersion');
    //alert("当前版本："+appVerion);
    if(appversion < appVersionNew){
    	window.location.href="http://app.wanda.cn/wanda3v/jsdk2/jssdk/tanchuang.jsp";
    }
}

