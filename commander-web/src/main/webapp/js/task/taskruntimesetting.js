function showRuntimeSetting(taskId) {
	var params = {
		"taskId" : taskId
	};
	$.post("showRuntimeSetting.action", params, function(data) {
		if ($("#task_rtsetting_content").size() == 0)
			$(document.body).append("<div id=\"task_rtsetting_content\" style=\"display: none\"></div>");
		$("#task_rtsetting_content").html(data);
		showRuntimeSettingDialog();
	});
}

function showRuntimeSettingDialog() {
	var dialog = createTemplateDialog($("#task_rtsetting_content"));
	$("#task_rtsetting_content").empty();
	dialog.click("#btnSave", function() {
		saveRuntimeSetting(dialog);
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(600, 300);
	dialog.show();
}

function saveRuntimeSetting(dialog) {
	var title = dialog.find(".message_dialog_title").text();
	var loading = createLoading(title, getText("common.operation.executing"));
	loading.show();
	var $form = dialog.find("#task_runtimesetting_form");
	var data = $form.serialize();
	$.post("saveRuntimeSetting.action", data, function(json) {
		loading.close();
		if (json.result.success) {
			showMessage(title, getText("common.execute.success"), 400, 200, function() {
				dialog.close();
			});
		} else {
			showErrorMessage(json.result.message, 400, 200, function() {
				dialog.close();
			});
		}
	}).error(function() {
		loading.close();
	});
}
