function ASLogManager() {}

ASLogManager.prototype.init = function() {
	$("#btnUpdateASLog").click(ASLogManager.prototype.update);
};

ASLogManager.prototype.update = function() {
	var serverId=$("input[id=id]").val();
	var isLocal=$("input[id=isLocal]").val();
	var loading = createLoading(logging.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.ajaxFileUpload({
		url: 'updateASLog.action?id='+serverId+'&isLocal='+isLocal,
		secureuri: false,
		fileElementId: 'aslogFile',
		dataType: 'json',
		success: function(data, status) {
			loading.close();
			if (data.success) {
				// if update success, show success
				showMessage(logging.currentPageName(), getText("common.execute.success"));
			} else {
				// if update failed, show error message.
				var error = "";
				if (data.actionErrors != undefined) {
					for ( var i = 0; i < data.actionErrors.length; i++)
						error += data.actionErrors[0];
				}
				if (data.fieldErrors != undefined) {
					for ( var p in data.fieldErrors)
						error += data.fieldErrors[p];
				}
				showErrorMessage(error);
			}
		},
		error: function(data, status, e) {
			loading.close();
			showErrorMessage(ASLOG_UPDATE_FAILED);
		}
	});
};
