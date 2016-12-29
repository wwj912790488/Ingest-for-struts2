function getText(key) {
	return textMap[key];
}

function showMessage(title, message, width, height, callback, thiz) {
	var button = getText("msg.ok");
	var dialog = new window.top.MessageDialog(title, message);
	if (callback != undefined && typeof(callback) === 'function') {
		dialog.addButton(button, function() {
			callback.apply(thiz != undefined ? thiz : this.dialog);
		});
	} else {
		dialog.addButton(button);
	}
	if (width == undefined)
		width = 400;
	if (height == undefined)
		height = 200;
	dialog.setSize(width, height);
	dialog.show();
}

function showErrorMessage(message, width, height, callback, thiz) {
	var title = getText("msg.dialog.title.error");
	showMessage(title, message, width, height, callback, thiz);
}

function showWarnMessage(message, width, height, callback, thiz) {
	var title = getText("msg.dialog.title.warning");
	showMessage(title, message, width, height, callback, thiz);
}

function showConfirmDialog(title, message, callback, thiz) {
	var dialog = new window.top.MessageDialog(title, message);
	dialog.addButton(getText("msg.ok"), function() {
		callback.apply(thiz);
	});
	dialog.addButton(getText("msg.cancel"));
	dialog.setSize(400, 200);
	dialog.show();
}

function createLoading(title, message) {
	var dialog = new TemplateDialog($("#dialog_loading_template"));
	dialog.find("#loading_title").html(title);
	dialog.find("#loading_message").html(message);
	dialog.setSize(400, 200);
	dialog.maskAnimation = false;
	dialog.maskTransparent = true;
	return dialog;
}
