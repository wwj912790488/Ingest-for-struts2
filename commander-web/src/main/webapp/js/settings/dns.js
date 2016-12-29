function isNullOrEmpty(strVal) {
	if (strVal == '' || strVal == null || strVal == undefined) {
		return true;
	} else {
		return false;
	}
}

function DnsDAO() {

}

DnsDAO.prototype.init = function() {
	$("#add_button").click(DnsDAO.prototype.add);
	$("a.deleteBtn").click(DnsDAO.prototype.del);
};

DnsDAO.prototype.del = function() {
	var index = $(this).attr("index");
	var ip = $("#ip_" + index).text();
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	params["dns.ip"] = ip;
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("deleteDns.action", params, function(data) {
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
			$.post("getDns.action", params2, function(data) {
				$("#main").html(data);
			});
		}
	});
};

DnsDAO.prototype.add = function() {
	//clear UI;
	if ($("#tr_error").length > 0){
		$("#error_ip").text("");
	}
	
	var ip = $("#dns_add").val();
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	params["dns.ip"] = ip;
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("addDns.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgAddFailed : data.actionErrors[0]);
		} else if (data.fieldErrors) {
			var show = "<tr id='tr_error'><td></td><td class='td_error' id='error_ip'></td><td></td></tr>";
			if ($("#tr_error").length == 0)
				$("#table_add_dns").append(show);
			for ( var p in data.fieldErrors) {
				if (p == "dns.ip"){
					$("#error_ip").text(data.fieldErrors[p]);
				}
			}
		} else {
			var params2 = {};
			params2["id"] = id;
			params2["isLocal"] = isLocal;
			$.post("getDns.action", params2, function(data) {
				$("#main").html(data);
			});
		}
	});
};