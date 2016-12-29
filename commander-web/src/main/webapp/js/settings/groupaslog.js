function GroupASLog() {
}

GroupASLog.prototype.init = function(){
	$("#btnUpdateASLog").click(GroupASLog.prototype.update);
};

GroupASLog.prototype.update = function() {
	var loading = createLoading(groupSetting.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.ajaxFileUpload({
		url: 'groupASLogUpdate.action?group.id=' + groupSetting.groupId,
		secureuri: false,
		fileElementId: 'aslogFile',
		dataType: 'json',
		success: function(data, status) {
			loading.close();
			groupSetting.showExecuteResult(data);
		},
		error: function(data, status, e) {
			loading.close();
			showErrorMessage("error!");
		}
	});
};
