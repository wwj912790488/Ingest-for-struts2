function SnmpManager() {

}

SnmpManager.prototype.init = function() {
	$("#btnSaveSnmp").click(SnmpManager.prototype.save);
};

SnmpManager.prototype.save = function() {
	$(".view_error").text("");
	$("#btnSaveSnmp").attr("disabled", true);

	var params = {};
	params = $("#snmp_form").serialize();
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("saveSnmp.action", params, function(result) {
		$("#btnSaveSnmp").attr("disabled", false);
		loading.close();
		if (!result.success) {
			if (result.fieldErrors) {
				$("#snmp_agent_status_error").text(result.fieldErrors["snmp.snmpRun"]);
				$("#snmp_agent_community_error").text(result.fieldErrors["snmp.community"]);
				$("#snmp_trap_allowed_error").text(result.fieldErrors["snmp.trapAllowed"]);
				$("#snmp_trap_community_error").text(result.fieldErrors["snmp.trapCommunity"]);
				$("#snmp_trap_host_error").text(result.fieldErrors["snmp.trapHost"]);
			}
			var actionError = SNMP_SAVE_FAILED;
			if (result.actionErrors && result.actionErrors.length > 0)
				actionError = result.actionErrors[0];
			showErrorMessage(actionError);
		} else {
			showMessage(SNMP_INFO, SNMP_SAVE_SUCCESS);
		}
	});
};
