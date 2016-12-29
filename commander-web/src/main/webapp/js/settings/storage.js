function isNullOrEmpty(strVal) {
	if (strVal == '' || strVal == null || strVal == undefined) {
		return true;
	} else {
		return false;
	}
}

function showDeleteDialog(id) {
	var dialog = new window.top.MessageDialog(msg_warning, msg_deleteStorage);
	dialog.addButton(msg_Ok, function() {
		var params = {};
		params["storage.id"] = id;
		params["storage.path"] = $("#" + id + "_path").text();
		params["id"] = serviceId;
		params["isLocal"] = isLocal;
		$.post("deleteStorage.action", params, function(data) {
			if (data.actionErrors && data.actionErrors.length > 0) {
				alert(isNullOrEmpty(data.actionErrors[0]) ? msg_deleteFail
								: data.actionErrors[0]);
			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					$("td[name='" + p + "']").text(data.fieldErrors[p]);
				}
			} else {
				$.post("setStorage.action", {
					"id" : serviceId,
					"isLocal" : isLocal
				}, function(data) {
					$("#content").html(data);
				});
				dialog.close();
			}
		});
	});
	dialog.addButton(msg_Cancel);
	dialog.show();
};

function showAddDialog() {
	var dialog = new window.top.TemplateDialog($("#dialog_add_storage"));
	var path = dialog.find("input[name='storage.path']");
	var name = dialog.find("input[name='storage.name']");
	var user = dialog.find("input[name='storage.user']");
	var password = dialog.find("input[name='storage.pwd']");

	dialog.click("#btnOk", function() {
		var params = {};
		params["id"] = serviceId;
		params["isLocal"] = isLocal;
		params["storage.type"] = dialog.find(
				"select[name='storage.type'] option:selected").text();
		params["storage.path"] = path.val();
		params["storage.name"] = name.val();
		params["storage.user"] = user.val();
		params["storage.pwd"] = password.val();
		$.post("addStorage.action", params, function(data) {
			if (data.actionErrors && data.actionErrors.length > 0) {
				dialog.find("div[name='actionError']").text(
						isNullOrEmpty(data.actionErrors[0]) ? msg_addFail
								: data.actionErrors[0]);

			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					dialog.find("td[name='" + p + "']").text(
							data.fieldErrors[p]);
				}
			} else {
				params["storage.id"] = data.storage.id;
				params["id"] = serviceId;
				params["isLocal"] = isLocal;
				$.post("mountStorage.action", params, function(data) {
					dialog.close();
					if (data.actionErrors && data.actionErrors.length > 0) {
						alert(isNullOrEmpty(data.actionErrors[0]) ? msg_mountFail
								: data.actionErrors[0]);
					}
					$.post("setStorage.action", {
						"id" : serviceId,
						"isLocal" : isLocal
					}, function(data) {
						$("#content").html(data);
					});
					
				});
			}

		});
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(745, 423);
	dialog.show();
	path.focus();
};

function showEditDialog(id) {
	var dialog = new window.top.TemplateDialog($("#dialog_edit_storage"));
	var path = dialog.find("input[name='storage.path']");
	var name = dialog.find("input[name='storage.name']");
	var user = dialog.find("input[name='storage.user']");
	var password = dialog.find("input[name='storage.pwd']");

	path.val($("#" + id + "_path").text());
	name.val($("#" + id + "_name").text());
	user.val($("#" + id + "_user").text());
	password.val($("#" + id + "_pwd").text());
	var type = dialog.find("select[name='storage.type']");
	var count = type.find("option").length;
	for ( var i = 0; i < count; i++) {
		if (type.get(0).options[i].text == $("#" + id + "_type").text()) {
			type.get(0).options[i].selected = true;
			break;
		}
	}

	dialog.click("#btnOk", function() {
		var params = {};
		params["id"] = serviceId;
		params["isLocal"] = isLocal;
		params["storage.id"] = id;
		params["storage.type"] = dialog.find(
				"select[name='storage.type'] option:selected").text();
		params["storage.path"] = path.val();
		params["storage.name"] = name.val();
		params["storage.user"] = user.val();
		params["storage.pwd"] = password.val();
		$.post("updateStorage.action", params, function(data) {
			if (data.actionErrors && data.actionErrors.length > 0) {
				dialog.find("div[name='actionError']").text(
						isNullOrEmpty(data.actionErrors[0]) ? msg_editFail
								: data.actionErrors[0]);

			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					dialog.find("td[name='" + p + "']").text(
							data.fieldErrors[p]);
				}
			} else {
				params["storage.id"] = id;
				params["id"] = serviceId;
				params["isLocal"] = isLocal;
				$.post("mountStorage.action", params, function(data) {
					dialog.close();
					if (data.actionErrors && data.actionErrors.length > 0) {
						alert(isNullOrEmpty(data.actionErrors[0]) ? msg_mountFail
								: data.actionErrors[0]);
					}
					$.post("setStorage.action", {
						"id" : serviceId,
						"isLocal" : isLocal
					}, function(data) {
						$("#content").html(data);
					});
					
				});
			}

		});
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(745, 423);
	dialog.show();
	path.focus();
};

function Storage() {

}

Storage.prototype.init = function() {
	$("#add_button").click(Storage.prototype.add);
	$("a.del_button").click(Storage.prototype.del);
	$("a.edit_button").click(Storage.prototype.edit);
	$("a.mount").click(Storage.prototype.mount);
	$("a.unmount").click(Storage.prototype.unMount);
};

Storage.prototype.mount = function() {
	var index = $(this).attr("index");
	var params = {};
	params["storage.id"] = index;
	params["id"] = serviceId;
	params["isLocal"] = isLocal;
	$.post("mountStorage.action", params, function(data) {
		if (data.actionErrors && data.actionErrors.length > 0) {
			alert(isNullOrEmpty(data.actionErrors[0]) ? msg_mountFail
					: data.actionErrors[0]);
		} else {
			$.post("setStorage.action", {
				"id" : serviceId,
				"isLocal" : isLocal
			}, function(data) {
				$("#content").html(data);
			});
		}
	});
};

Storage.prototype.unMount = function() {
	var index = $(this).attr("index");
	var params = {};
	params["storage.id"] = index;
	params["id"] = serviceId;
	params["isLocal"] = isLocal;
	$.post("unmountStorage.action", params, function(data) {
		if (data.actionErrors && data.actionErrors.length > 0) {
			alert(isNullOrEmpty(data.actionErrors[0]) ? msg_unmountFail
					: data.actionErrors[0]);
		} else {
			$.post("setStorage.action", {
				"id" : serviceId,
				"isLocal" : isLocal
			}, function(data) {
				$("#content").html(data);
			});
		}
	});
};

Storage.prototype.add = function() {
	showAddDialog();
};

Storage.prototype.edit = function() {
	var index = $(this).attr("index");
	var isMount = $(this).attr("isMount") == 'true';
	if (isMount){
		alert(msg_unmountBeforeEdit);
		return;
	}
	showEditDialog(index);
};

Storage.prototype.del = function() {
	var index = $(this).attr("index");
	showDeleteDialog(index);
};
