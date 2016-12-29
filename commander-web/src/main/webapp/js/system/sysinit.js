function SysInitAction() {

}

SysInitAction.prototype.init = function() {
	$("#sysinit_saveButton").click(SysInitAction.prototype.save);
};

SysInitAction.prototype.save = function() {
	$(".cm_fieldError").text("");
	$("#sysinit_saveButton").attr("disabled", true);

	var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
	loading.show();
	var params = {};
	params = $("#sysinit_form").serialize();
	$.post("syssave.action", params, function(result) {
		loading.close();
		$("#sysinit_saveButton").attr("disabled", false);
		if (!result.success) {
			showErrorMessage(SYSINIT_SAVE_FAILED);
			if (result.fieldErrors) {
				$("#sysinit_clusterType").text(result.fieldErrors["settings.clusterType"]);
				$("#sysinit_clusterIp").text(result.fieldErrors["settings.clusterIp"]);
				$("#sysinit_clusterPort").text(result.fieldErrors["settings.clusterPort"]);
				$("#sysinit_bindAddr").text(result.fieldErrors["settings.bindAddr"]);
				$("#sysinit_timeToLive").text(result.fieldErrors["settings.timeToLive"]);
				$("#sysinit_clusterSearchType").text(result.fieldErrors["settings.clusterSearchType"]);
				$("#sysinit_heartbeatInterval").text(result.fieldErrors["settings.heartbeatInterval"]);
				$("#sysinit_heartbeatTimeout").text(result.fieldErrors["settings.heartbeatTimeout"]);
			}
		} else {
			showMessage(host.currentPageName(), SYSINIT_SAVE_SUCCESS);
		}
	});
};
