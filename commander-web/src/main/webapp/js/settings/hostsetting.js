function HostSetting() {
	var id = $("#id").val();
	var isLocal = $("#isLocal").val();

	function deleteServer() {
		var url = 'deleteServer.action';
		var param = 'id=' + id;
		var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
		loading.show();
		$.ajaxSetup({
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	loading.close();
            	showErrorMessage(errorThrown);
                return false;
            }
        });
		$.post(url, param, function(json) {
			loading.close();
			if (json.code == 0)
				window.parent.location.href = "listServer.action";
			else
				showErrorMessage(json.description);
		});
	}

	function reboot() {
		var params = {};
		params["id"] = id;
		params["isLocal"] = isLocal;
		var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
		loading.show();
		$.ajaxSetup({
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	loading.close();
            	showErrorMessage(errorThrown);
                return false;
            }
        });
		$.post("reboot.action", params, function(data) {
			loading.close();
			if (data.actionErrors && data.actionErrors.length > 0) {
				showErrorMessage(data.actionErrors[0]);
			}
		});
	}

	function shutdown() {
		var params = {};
		params["id"] = id;
		params["isLocal"] = isLocal;
		var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
		loading.show();
		$.ajaxSetup({
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	loading.close();
            	showErrorMessage(errorThrown);
                return false;
            }
        });
		$.post("shutdown.action", params, function(data) {
			loading.close();
			if (data.actionErrors && data.actionErrors.length > 0) {
				showErrorMessage(data.actionErrors[0]);
			}
		});
	}

	function switchRole() {
		var params = {};
		params["group.id"] = $("#groupId").val();
		var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
		loading.show();
		$.ajaxSetup({
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	loading.close();
            	showErrorMessage(errorThrown);
                return false;
            }
        });
		$.post("switchRole.action", params, function(data) {
			loading.close();
			if (data.actionErrors && data.actionErrors.length > 0) {
				showErrorMessage(data.actionErrors[0]);
			} else {
				window.parent.location.reload();
			}
		});
	}

	function showRenameDialog() {
		var dialog = new window.top.TemplateDialog($("#dialog_rename"));
		var textbox = dialog.find("input[type=text]");
		var errorinfo = dialog.find(".alert");
		dialog.click("#btnOk", function() {
			var $form = dialog.find("#rename_form");
			var err = 0;
			// validate input
			errorinfo.hide();
			var data = textbox.val();
			if (data == "") {
				errorinfo.text(msgRenameRequired).show();
				err++;
			} else if (data.length > 32) {
				errorinfo.text(msgRenameTooLong).show();
				err++;
			}
			if (err > 0) {
				textbox.focus();
				return;
			}
			var data = $form.serialize();
			var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
			loading.show();
			$.ajaxSetup({
	            error:function(XMLHttpRequest, textStatus, errorThrown){
	            	loading.close();
	            	errorinfo.text(errorThrown).show();
	                return false;
	            }
	        });
			$.post("renameServer.action", data, function(json) {
				loading.close();
				if (json.code == 0) {
					dialog.close();
					window.parent.updateServerName(id, json.newName);
				} else {
					errorinfo.text(json.description).show();
					textbox.focus();
				}
			});
		});
		dialog.click("#btnCancel", function() {
			this.dialog.close();
		});
		dialog.setSize(400, 200);
		dialog.show();
		textbox.focus();
	}

	function showSwitchServerDialog() {
		var dialog = new window.top.TemplateDialog($("#dialog_switchserver"));
		var errorinfo = dialog.find(".alert");
		dialog.click("#btnOk", function() {
			var $form = dialog.find("#switchserver_form");
			// validate input
			var err = 0;
			errorinfo.hide();
			//var params = textbox.val();
			// post
			var params = $form.serialize();
			var loading = createLoading(host.currentPageName(), getText("common.operation.executing"));
			loading.show();
			$.ajaxSetup({
	            error:function(XMLHttpRequest, textStatus, errorThrown){
	            	loading.close();
	            	errorinfo.text(errorThrown).show();
	                return false;
	            }
	        });
			$.post("switchServer.action", params, function(data) {
				loading.close();
				if (data.actionErrors && data.actionErrors.length > 0) {
					showErrorMessage(data.actionErrors[0]);
				} else {
					dialog.close();
					window.parent.location.reload();
				}
			});
		});
		dialog.click("#btnCancel", function() {
			this.dialog.close();
		});
		dialog.setSize(400, 200);
		dialog.show();
	}

	this.init = function() {
		// hidden when local machine
		if (isLocal == "true") {
			$(".onlyInRemote").hide();
		}

		// delete
		$("#btnDelete").click(function() {
			showConfirmDialog(host.currentPageName(), msgDeleteConfirm, deleteServer, this);
		});

		// rename
		$("#btnRename").click(showRenameDialog);

		// reboot
		$("#btnReboot").click(function() {
			showConfirmDialog(host.currentPageName(), msgRebootConfirm, reboot, this);
		});

		// shutdown
		$("#btnShutdown").click(function() {
			showConfirmDialog(host.currentPageName(), msgShutdownConfirm, shutdown, this);
		});

		// switch role
		$("#btnSwitchRole").click(function() {
			showConfirmDialog(host.currentPageName(), msgSwitchRoleConfirm, switchRole, this);
		});
		
		// switch server
		$("#btnSwitchServer").click(showSwitchServerDialog);
	};
}
