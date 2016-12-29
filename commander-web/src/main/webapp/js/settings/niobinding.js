function NioBinding() {
}

NioBinding.prototype.init = function() {
	$("#apply_button").click(NioBinding.prototype.apply);
};

NioBinding.prototype.apply = function() {
	var $form = $(this).parents("form");
	
	// check
	$(".error").hide();
	
	// save
	var params = $form.serialize();
	params += ("&id=" + id); //add server id

	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("nioBindingUpdate.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgBindingFailed : data.actionErrors[0]);
		} else if (data.fieldErrors) {
			var strFieldErrors = "";
			for ( var p in data.fieldErrors) {
				strFieldErrors += data.fieldErrors[p];
			}
			showErrorMessage(strFieldErrors);
		}
		else {
			showMessage(msgTitle, msgSaveSuccess);
		}
		var params1 = {};
		params1["id"] = id;
		params1["isLocal"] = isLocal;
		$.post("nioBindingView.action", params1, function(data) {
			$("#main").html(data);
		});
	});	
};

