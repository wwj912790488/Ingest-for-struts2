function isNullOrEmpty(strVal) {
	if (strVal == '' || strVal == null || strVal == undefined) {
		return true;
	} else {
		return false;
	}
}

function FirewallDAO() {

}

FirewallDAO.prototype.init = function() {
	$("#add_button").click(FirewallDAO.prototype.add);
	$("a.deleteBtn").click(FirewallDAO.prototype.del);
	$("#firewall_on").click(FirewallDAO.prototype.start);
	$("#firewall_off").click(FirewallDAO.prototype.stop);
};

FirewallDAO.prototype.start = function() {
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("startFirewall.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgStartFailed : data.actionErrors[0]);
		} 
		
		$.post("getFirewall.action", params, function(data) {
			$("#main").html(data);
		});
	
	});
};

FirewallDAO.prototype.stop = function() {
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("stopFirewall.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgStopFailed : data.actionErrors[0]);
		} 

		$.post("getFirewall.action", params, function(data) {
			$("#main").html(data);
		});
	
	});
};

FirewallDAO.prototype.del = function() {
	var index = $(this).attr("index");
	var protocol = $("#protocol_" + index).text();
	var dport = $("#dport_" + index).text();
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	params["rule.protocol"] = protocol;
	params["rule.dport"] = dport;
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("deleteFirewall.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgDeleteFailed : data.actionErrors[0]);
		} else if (data.fieldErrors) {
			var strFieldErrors = "";
			for ( var p in data.fieldErrors) {
				strFieldErrors += data.fieldErrors[p];
			}
			showErrorMessage(strFieldErrors);
		} else {
			var params2 = {};
			params2["id"] = id;
			params2["isLocal"] = isLocal;
			$.post("getFirewall.action", params2, function(data) {
				$("#main").html(data);
			});
		}
	});
};

FirewallDAO.prototype.add = function() {
	//clear UI;
	if ($("#tr_error").length > 0){
		$("#error_protocol").text("");
		$("#error_dport").text("");
	}
	
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	params["rule.protocol"] = $("select[name=port_type] option:selected").attr("value");
	params["rule.dport"] = $("#input_dport").val();
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("addFirewall.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgAddFailed : data.actionErrors[0]);
		} else if (data.fieldErrors) {
			var show = "<tr id='tr_error'><td class='td_error' id='error_protocol'></td><td class='td_error' id='error_dport'></td><td></td></tr>";
			if ($("#tr_error").length == 0)
				$("#table_add_firewall").append(show);
			for ( var p in data.fieldErrors) {
				if (p == "rule.protocol"){
					$("#error_protocol").text(data.fieldErrors[p]);
				}else if (p == "rule.dport"){
					$("#error_dport").text(data.fieldErrors[p]);
				}	
			}
		} else {
			var params2 = {};
			params2["id"] = id;
			params2["isLocal"] = isLocal;
			$.post("getFirewall.action", params2, function(data) {
				$("#main").html(data);
			});
		}
	});
};