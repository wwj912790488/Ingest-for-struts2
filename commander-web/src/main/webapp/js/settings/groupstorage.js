function GroupStorage() {
}

GroupStorage.prototype.init = function(){
	$("#btnAddStorage").click(GroupStorage.prototype.add);
	$(".btnMountStroage").click(GroupStorage.prototype.mount);
	$(".btnUnmountStorage").click(GroupStorage.prototype.umount);
	$(".btnRemoveStroage").click(function() {
		showConfirmDialog(groupSetting.currentPageName(), STORAGE_DELETE_CONFIRM, GroupStorage.prototype.remove, this);
	});
};

GroupStorage.prototype.add = function() {
	var dialog = new createTemplateDialog($("#dialog_add_storage"));
	var path = dialog.find("input[name='storage.path']");
	var name = dialog.find("input[name='storage.name']");
	var user = dialog.find("input[name='storage.user']");
	var password = dialog.find("input[name='storage.pwd']");
	var error = dialog.find(".error");
	dialog.click("#btnOk", function() {
		error.text("");
		var params = {};
		params["action"] = "add";
		params["group.id"] = groupSetting.groupId;
		params["storage.type"] = dialog.find("select[name='storage.type'] option:selected").text();
		params["storage.path"] = path.val();
		params["storage.name"] = name.val();
		params["storage.user"] = user.val();
		params["storage.pwd"] = password.val();
		$.post("groupStorageManage.action", params, function(data) {
			dialog.close();
			groupSetting.showExecuteResult(data);
		});
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(745, 423);
	dialog.show();
	path.focus();
};

GroupStorage.prototype.mount = function() {
	var loading = createLoading(groupSetting.currentPageName(), getText("common.operation.executing"));
	loading.show();
	var params = {};
	params["action"] = "mount";
	params["group.id"] = groupSetting.groupId;
	params["storage.path"] = $(this).parent().find("input[name='storage.path']").val();
	params["storage.name"] = $(this).parent().find("input[name='storage.name']").val();
	$.post("groupStorageManage.action", params, function(data) {
		loading.close();
		groupSetting.showExecuteResult(data);
	});
};

GroupStorage.prototype.umount = function() {
	var loading = createLoading(groupSetting.currentPageName(), getText("common.operation.executing"));
	loading.show();
	var params = {};
	params["action"] = "unmount";
	params["group.id"] = groupSetting.groupId;
	params["storage.path"] = $(this).parent().find("input[name='storage.path']").val();
	params["storage.name"] = $(this).parent().find("input[name='storage.name']").val();
	$.post("groupStorageManage.action", params, function(data) {
		loading.close();
		groupSetting.showExecuteResult(data);
	});
};

GroupStorage.prototype.remove = function() {
	var loading = createLoading(groupSetting.currentPageName(), getText("common.operation.executing"));
	loading.show();
	var params = {};
	params["action"] = "remove";
	params["group.id"] = groupSetting.groupId;
	params["storage.path"] = $(this).parent().find("input[name='storage.path']").val();
	params["storage.name"] = $(this).parent().find("input[name='storage.name']").val();
	$.post("groupStorageManage.action", params, function(data) {
		loading.close();
		groupSetting.showExecuteResult(data);
	});
};
