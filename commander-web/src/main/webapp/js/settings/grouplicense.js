function GroupLicense() {
}

GroupLicense.prototype.init = function(){
	$("#btnUpdateLicense").click(GroupLicense.prototype.update);
};

GroupLicense.prototype.update = function() {
	var loading = createLoading(groupSetting.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.ajaxFileUpload({
		url: 'groupLicenseUpdate.action?group.id=' + groupSetting.groupId,
		secureuri: false,
		fileElementId: 'licenseFile',
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
