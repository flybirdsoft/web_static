/*

write by wuweiwei

*/

App.Restful = {
	urls :{
		/*获取用户是外部换是内部用户*/
		"current":"/platform/user/current",
		/*外部用户登录接口*/
		"outerLogin":"/platform/login",
		/*首页代办*/
		"todo" : "/platform/todo?status={status}&pageIndex={pageIndex}&pageItemCount={pageItemCount}&title={title}",
		"todoRead" : "/platform/todo/{todoId}/read",
		/*首页公告*/
		"notice" : "/platform/announce/list?title={title}&status={status}&pageIndex={pageIndex}&pageItemCount={pageItemCount}",
		"noticeDetail":"/platform/announce/toEdit?id={id}",
		/*公告是否已读*/
		"noticeRead" : "/platform/announce/read?id={id}",
		/*项目列表*/
		"projectsList" : "/platform/project?type={type}&name={projectName}&pageIndex={pageIndex}&pageItemCount={pageItemCount}",
		/*获取版本名字的接口*/
		"versionName" : "/platform/project/{projectId}/version/{projectVersionId}",
		/*项目文件夹*/
		"projectFolderList" : "/doc/{projectId}/{projectVersionId}/file/children?parentId={parentId}",
		"projectSearchFolderList" : "/doc/{projectId}/{projectVersionId}/file/query/list?key={folderName}&parentId={parentId}",
		/*加载项目版本屑接口*/
		"projectVersionList" : "/platform/project/{projectId}/version/groupBy",
		/*加载批注接口*/
		"projectNotesList" : "/sixD/viewPoint/list",
		/*编辑批注简介之后保存接口*/
		"updateViewPoint" : "/sixD/{projectId}/viewPoint/{viewPointId}",
		/*加载批注详情接口*/
		"projectNotesDetails" : "/sixD/{projectId}/viewPoint/{viewPointId}",
		/*删除批注接口*/
		"deleteNotesList" : "/sixD/{projectId}/viewPoint/{viewPointId}",
		/*加载批注个数接口*/
		"projectNotesNumber" : "/sixD/viewPoint/list/count",
		/*加载批注详情使用的modelId*/
		"getModelId" : "/doc/{projectId}/{projectVersionId}/queryGFile",
		/*加载批注评论列表接口*/
		"loadNotesComment" : "/sixD/viewPoint/comment/list",
		/*添加批注评论接口*/
		"addNotesComment" : "/sixD/{projectId}/viewPoint/{viewPointId}/comment",
		/*添加批注评论接口*/
		"deleteNotesComment" : "/sixD/{projectId}/viewPoint/{viewPointId}/comment/{commentId}",
		/*加载面包屑接口*/
		"projectCrumbsList" : "/doc/{projectId}/{projectVersionId}/file/bread/thread?parentId={parentId}",
		/*加载资源列表接口*/
		"resourceList" : "/platform/project?type={type}&pageIndex={pageIndex}&pageItemCount={pageItemCount}",
		/*加载资源版本列表接口*/
		"resourceVersionList" : "/platform/project/{projectId}/version",
		/*加载业务流程列表接口*/
		"flowList" : "/platform/workflow/phase",
		/*加载业务流程列表接口*/
		"flowFolderList" : "/platform/workflow/{id}/category",
		/*加载业务流程列表子列表接口*/
		"flowItemsNameList" : "/platform/workflow/{phaseId}/{categoryName}",
		/*加载业务流程详细接口*/
		"flowDetailData" : "/platform/workflow/items/info",
		/*搜索加载业务流程接口*/
		"flowSearchData" : "/platform/workflow/query",
		/*获取相关资源列表接口*/
		"getResourcesData" : "/platform/related/resources/list",
		/*获取建议反馈列表接口*/
		"getFeebackData" : "/platform/advice/feedback/query/page",
		/*添加建议反馈列表接口*/
		"addFeebackData" : "/platform/advice/feedback/write",
		/*项目高级搜索的接口*/
		"getProjectsData" : "/platform/project",
		/*获取项目省份的接口*/
		"getProjectsProvinceData" : "/platform/project/province",
	},
	localUrls:{
		"projectsList" : "/jsonData/projectsList.json",
		"todo" : "/jsonData/todo.json",
		"notice":"/jsonData/notice.json"
	},
	changeLocalUrls : function(){
		if(App.Switch.useLocalJson)
		{
			this.urls = this.localUrls;
		}
	}
}
App.Restful.changeLocalUrls();

