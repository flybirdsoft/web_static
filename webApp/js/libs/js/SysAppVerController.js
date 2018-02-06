/**
 * Created by imobile on 15/12/13.
 */
function getAppInfo(){
    //设备类型  0 :iPhone 1:安卓
    var devicetype = $.cookie('devicetype');
    //app版本
    var appversion = $.cookie('appVersion');
    //系统版本
    var sysversion =  $.cookie('sysversion');

    if( devicetype == 0 && appversion >= '3.6.2' ) {
        return true;
    }
    if( devicetype == 0 && appversion > '3.0' && appversion < '3.6.2' && sysversion < '9.0' ) {
        return true;
    }
    if( devicetype == null  && appversion > '3.0' ) {
        return true;
    }
    return false;
}