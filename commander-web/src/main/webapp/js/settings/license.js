function LicenseManager() {}

LicenseManager.prototype.init = function() {
	$("#btnUpdateLicense").click(LicenseManager.prototype.update);
};

LicenseManager.prototype.update = function() {
	var serverId=$("input[id=id]").val();
	var isLocal=$("input[id=isLocal]").val();
	var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.ajaxFileUpload({
		url: 'updateLicense.action?id='+serverId+'&isLocal='+isLocal,
		secureuri: false,
		fileElementId: 'licenseFile',
		dataType: 'json',
		success: function(data, status) {
			loading.close();
			if (data.success) {
				if ($("#isLicenseOnly").val() == "true") {
					window.top.location.reload();
				} else {
					// if update success, refresh current page.
					$("#hostMenu3").click();
				}
			} else {
				// if update failed, show error message.
				var error = "";
				if (data.actionErrors != undefined) {
					for ( var i = 0; i < data.actionErrors.length; i++)
						error += data.actionErrors[0];
				}
				if (data.fieldErrors != undefined) {
					for ( var p in data.fieldErrors)
						error += data.fieldErrors[p];
				}
				showErrorMessage(error);
			}
		},
		error: function(data, status, e) {
			loading.close();
			showErrorMessage(LICENSE_UPDATE_FAILED);
		}
	});
};
