function isNullOrEmpty(strVal) {
	if (strVal == '' || strVal == null || strVal == undefined) {
		return true;
	} else {
		return false;
	}
}

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function RouteDAO() {

}

RouteDAO.prototype.init = function() {
	$("#add_button").click(RouteDAO.prototype.add);
	$("a.deleteBtn").click(RouteDAO.prototype.del);
};

RouteDAO.prototype.del = function() {
	var index = $(this).attr("index");
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	params["route.dest"] = $("#dest_" + index).text();
	params["route.gateway"] = trim($("#gateway_" + index).text());
	params["route.mask"] = $("#mask_" + index).text();
	params["route.flags"] = $("#flags_" + index).text();
	params["route.metric"] = $("#metric_" + index).text();
	params["route.ref"] = $("#ref_" + index).text();
	params["route.use"] = $("#use_" + index).text();
	params["route.iface"] = $("#iface_" + index).text();
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("deleteRoute.action", params, function(data) {
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
			$.post("getRoute.action", params2, function(data) {
				$("#main").html(data);
			});
		}
	});
};

RouteDAO.prototype.add = function() {
	//clear UI;
	if ($("#tr_error").length > 0){
		$("#error_dest").text("");
		$("#error_gateway").text("");
		$("#error_mask").text("");
		$("#error_iface").text("");
	}
	
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	params["route.dest"] = $("input[name=dest]").val();
	params["route.gateway"] = trim($("input[name=gateway]").val());
	params["route.mask"] = $("input[name=mask]").val();
	params["route.flags"] = "0";
	params["route.metric"] = "0";
	params["route.ref"] = "0";
	params["route.use"] = "0";
	params["route.iface"] = $("select[name=iface] option:selected").text();
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("addRoute.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgAddFailed : data.actionErrors[0]);
		} else if (data.fieldErrors) {
			var show = "<tr id='tr_error'><td class='td_error' id='error_dest'></td><td class='td_error' id='error_gateway'></td>"+
			"<td class='td_error' id='error_mask'></td><td class='td_error' id='error_iface'></td><td></td></tr>";
			if ($("#tr_error").length == 0)
				$("#table_add_route").append(show);
			for ( var p in data.fieldErrors) {
				if (p == "route.dest"){
					$("#error_dest").text(data.fieldErrors[p]);
				}else if (p == "route.gateway"){
					$("#error_gateway").text(data.fieldErrors[p]);
				}else if (p == "route.mask"){
					$("#error_mask").text(data.fieldErrors[p]);
				}else if (p == "route.iface"){
					$("#error_iface").text(data.fieldErrors[p]);
				}
			}
		} else {
			var params2 = {};
			params2["id"] = id;
			params2["isLocal"] = isLocal;
			$.post("getRoute.action", params2, function(data) {
				$("#main").html(data);
			});
		}
	});
};