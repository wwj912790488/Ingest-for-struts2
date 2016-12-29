function showExportTasks() {
	var params = {};
	$.post("exportTasksView.action", params, function(data) {
		if ($("#export_task_content").size() == 0)
			$(document.body).append("<div id=\"export_task_content\" style=\"display: none\"></div>");
		$("#export_task_content").html(data);
		showExportDialog();
	});
}

function showExportDialog() {
	var dialog = createTemplateDialog($("#export_task_content"));
	$("#export_task_content").empty();
	dialog.click("#btnExport", function() {
		var notSelected = dialog.find('input[name=selectedServers]:checked').length == 0;
		dialog.find('#exportTitle').css("color", notSelected ? "red":"black");
		if (notSelected)
			return;
		var $form = dialog.find("#export_task_form");
		$form.attr("method", "post");
		$form.attr("action", "exportTasks.action");
		$form.submit();
		this.dialog.close();
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(600, 400);
	dialog.show();
}
