function showImportTasks() {
	var params = {};
	$.post("importTasksView.action", params, function(data) {
		if ($("#import_task_content").size() == 0)
			$(document.body).append("<div id=\"import_task_content\" style=\"display: none\"></div>");
		$("#import_task_content").html(data);
		showImportDialog();
	});
}

function showImportDialog() {
	var dialog = createTemplateDialog($("#import_task_content"));
	$("#import_task_content").empty();
	dialog.click("#btnOk", function() {
		gotoListImportView(this.dialog);
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(600, 300);
	dialog.show();
}

function gotoListImportView(dialog) {
	var fileNotSelected = dialog.find("#xmlFile").val().length == 0;
	dialog.find('#fileTitle').css("color", fileNotSelected ? "red" : "black");
	if (fileNotSelected)
		return;
	if ($("#import_task_file").size() == 0)
		$(document.body).append("<div id=\"import_task_file\" style=\"display: none\"></div>");
	$("#import_task_file").empty().append(dialog.find("#xmlFile"));
	var loading = createLoading(MSG.import_tasks, getText("common.operation.executing"));
	loading.show();
	$.ajaxFileUpload({
		url : 'listImportTasks.action',
		secureuri : false,
		fileElementId : 'xmlFile',
		dataType : "text",
		success : function(data, status) {
			loading.close();
			if (data != undefined && data.indexOf("dialog_import_task") != -1) {
				showImportListDialog(dialog, data);
			} else {
				dialog.close();
				showImportTasks();
			}
		},
		error : function(data, status, e) {
			loading.close();
		}
	});
	$("#import_task_file").empty();
}

function showImportListDialog(dialog, data) {
	$("#import_task_content").html(data);
	dialog.switchTemplate($("#import_task_content"));
	$("#import_task_content").empty();
	dialog.click("#btnImport", function() {
		importTask(dialog);
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(600, 500);
}

function importTask(dialog) {
	var sourceNotSelected = dialog.find('input[name=sourceServer]:checked').length == 0;
	var targetNotSelected = dialog.find("select[name=targetServer]").val() == "";
	dialog.find('#sourceTitle').css("color", sourceNotSelected ? "red" : "black");
	dialog.find('#targetTitle').css("color", targetNotSelected ? "red" : "black");
	if (sourceNotSelected || targetNotSelected)
		return;
	var loading = createLoading(MSG.import_tasks, getText("common.operation.executing"));
	loading.show();
	var $form = dialog.find("#import_task_form");
	var data = $form.serialize();
	$.post("importTasks.action", data, function(json) {
		loading.close();
		if (json.result.success) {
			showMessage(MSG.import_tasks, json.result.message);
			dialog.close();
			location.href = "listTask.action";
		} else {
			showErrorMessage(json.result.message, 400, 200, function() {
				dialog.close();
				showImportTasks();
			});
		}
	}).error(function() {
		loading.close();
	});
}
