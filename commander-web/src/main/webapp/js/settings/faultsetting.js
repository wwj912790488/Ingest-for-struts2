function FaultSetting() {
	this.id = $("#id").val();
	this.isLocal = $("#isLocal").val();

	function updateFaultDisabled(disable) {
		var params = {};
		params["id"] = id;
		params["isLocal"] = isLocal;
		params["faultDisabled"] = disable;
		var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
		loading.show();
		$.ajaxSetup({
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        	loading.close();
	        	showErrorMessage(errorThrown);
	            return false;
	        }
	    });
		$.post("setMonitorSetting.action", params, function(data) {
			loading.close();
			if (data.actionErrors && data.actionErrors.length > 0) {
				showErrorMessage(data.actionErrors[0]);
			}
			var params1 = {};
			params1["id"] = id;
			params1["isLocal"] = isLocal;
			$.post("getMonitorSetting.action", params1, function(data) {
				$("#main").html(data);
			});				
		});
	}

	this.init = function init() {
		// fault process
		$("#faultDisabledtrue").click(function() {
			updateFaultDisabled(true);
		});
		$("#faultDisabledfalse").click(function() {
			updateFaultDisabled(false);
		});		
	};
}