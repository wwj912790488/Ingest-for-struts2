/**
 * Toggle checkbox selections.
 * NOTE: the master checkbox and contolled checkboxes must in same form.
 * 
 * @param obj - the checkbox object of select all/none.
 * @param name - the name of checkboxes to be controlled.
 */
function toggleSelection(obj, name) {
	$('input[type=checkbox][name=' + name + ']', obj.form).attr('checked', obj.checked);
}

/**
 * Get selected checkboxes count with the name in the specified form.
 * 
 * @param objForm - the form which checkboxes belongs to.
 * @param name - the name the checkbox.
 * @returns Returns the count of checked checkboxes.
 */
function getCheckedCount(objForm, name) {
	return $("input[type=checkbox][name=" + name + "]:checked", listForm).length;
}

/**
 * Get the IframeDialog binding with the caller window.
 */
function thisDialog() {
	return window.top.dialogs[window.name];
}

/**
 * Get the translated text.
 */
function getText(key) {
	return window.top.getText(key);
}

/**
 * Create loading dialog.
 * 
 * @param title - the dialog title
 * @param message - the dialog message
 * @returns dialog.
 */
function createLoading(title, message) {
	return window.top.createLoading(title, message);
}

/**
 * Show message dialog.
 * 
 * @param title - the dialog title
 * @param message - the dialog message
 * @param width - the dialog width
 * @param height - the dialog height
 * @param callback - click callback
 * @param thiz - click callback context
 */
function showMessage(title, message, width, height, callback, thiz) {
	window.top.showMessage(title, message, width, height, callback, thiz);
}

/**
 * Show error message dialog.
 * 
 * @param message - the dialog message
 * @param width - the dialog width
 * @param height - the dialog height
 * @param callback - click callback
 * @param thiz - click callback context
 */
function showErrorMessage(message, width, height, callback, thiz) {
	window.top.showErrorMessage(message, width, height, callback, thiz);
}

/**
 * Show warn dialog.
 * 
 * @param message - the dialog message
 * @param width - the dialog width
 * @param height - the dialog height
 * @param callback - click callback
 * @param thiz - click callback context
 */
function showWarnMessage(message, width, height, callback, thiz) {
	window.top.showWarnMessage(message, width, height, callback, thiz);
}

/**
 * Show confirm dialog.
 * 
 * @param title - the dialog title
 * @param message - the dialog message
 * @param callback - confirm callback
 * @param thiz - confirm callback context
 */
function showConfirmDialog(title, message, callback, thiz) {
	window.top.showConfirmDialog(title, message, callback, thiz);
}

/**
 * Create template dialog.
 * 
 * @param template - jQuery object
 * @returns {TemplateDialog} the new template dialog.
 */
function createTemplateDialog(template) {
	return new window.top.TemplateDialog(template);
}

/**
 * Create template dialog from the specified uri.
 * 
 * @param uri - the template uri
 * @param params - the params for uri
 * @param dialogId - the dialog id
 */
function createTemplateDialogByUri(uri, params, dialogId, callback) {
	if (!(typeof(callback) === 'function')) {
		return;
	}
	var loading = createLoading("", getText("common.operation.executing"));
	loading.show();
	$.post(uri, params, function(data) {
		loading.close();
		var layerId = "dialog_template_for_" + dialogId;
		if ($("#" + layerId).size() == 0) {
			$(document.body).append("<div id=\"" + layerId + "\" style=\"display: none\"></div>");
		}
		var layer = $("#" + layerId);
		layer.html(data);
		var dialog = createTemplateDialog(layer);
		layer.empty();
		callback.call(dialog, dialog);
	}).error(function() {
		loading.close();
		showErrorMessage(getText("common.error.unknown"));
	});
}

/**
 * Returns string with trimmed left and right string spaces.
 */
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");  
};

/**
 * Converter the HTML characters.
 */
String.prototype.replaceHTML = function() {
	str = this;
	if (str.length > 0) {
		if (str.indexOf("&") != -1)
			str = str.replace(/&/g, "&amp;");
		if (str.indexOf("\"") != -1)
			str = str.replace(/\"/g, "&quot;");
		if (str.indexOf(">") != -1)
			str = str.replace(/>/g, "&gt;");
		if (str.indexOf("<") != -1)
			str = str.replace(/</g, "&lt;");
	}
	return str;
};

function isValidIp(ip){
	var ptn= /^\s*(\d+)\.(\d+)\.(\d+)\.(\d+)\s*$/;
	var r = ptn.exec(ip);	
	return r!=null && r[1]<256 && r[2]<256 & r[3]<256 & r[4]<256;
};

/**
 * Fix the input text box cannot get focus in iframe on IE.
 */
$(function() {
	if (window.ActiveXObject) {
		$("body").mousedown(function(event) {
			if (event.target) {
				if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')
					event.target.focus();
			}
		});
	}
});
