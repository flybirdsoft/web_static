# web_static
* 架构设计&文档编写：邬畏畏<br><br>
* 单页面应用（SPA）项目源码 ，架构设计文档参见 【前端架构设计】.pptx 
<br><br><br>
### 项目启动
* 1.命令行进入webApp目录
* 2.npm install             //安装依赖包 node-basis ,node-basis是一个类似express的插件
* 3.npm start 或 node app.js  
  //注意：如果80端口冲突，请打开app.js文件修改监听端口号basis.run(80)。新版的Node-basis已经改为basis.start(端口号)
* 4.localhost/index.html
* 5.此应用示例是手机端适配,建议打开浏览器适配手机设备方式查看
### 项目说明
* 1.本项目功能代码有删减，有些功能不能完全展示
* 2.本项目主要提供框架设计代码及设计理念，删减了业务功能
* 3.可查看 webApp/tpls/resource/resourceList.html 和 webApp\js\app\resource\App.Resource.js 了解数据绑定的应用
