/**
 * Toggle checkbox selections.
 * NOTE: the master checkbox and contolled checkboxes must in same form.
 * 
 * @param obj - the checkbox object of select all/none.
 * @param name - the name of checkboxes to be controlled.
 */
var dialogZOrder = 100;

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
	return window.dialogs[window.name];
}

/**
 * Get the translated text.
 */
function getText(key) {
	return window.getText(key);
}

/**
 * Create loading dialog.
 * 
 * @param title - the dialog title
 * @param message - the dialog message
 * @returns dialog.
 */
function createLoading(title, message) {
	return window.createLoading(title, message);
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
	window.showMessage(title, message, width, height, callback, thiz);
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
	window.showErrorMessage(message, width, height, callback, thiz);
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
	window.showWarnMessage(message, width, height, callback, thiz);
}

/**
 * Show confirm dialog.
 * 
 * @param title - the dialog title
 * @param message - the dialog message
 * @param callback - confirm callback
 * @param thiz - confirm callback context
 */
//function showConfirmDialog(title, message, callback, thiz) {
//	window.showConfirmDialog(title, message, callback, thiz);
//}

/**
 * Create template dialog.
 * 
 * @param template - jQuery object
 * @returns {TemplateDialog} the new template dialog.
 */
function createTemplateDialog(template) {
	return new window.TemplateDialog(template);
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
	//var loading = createLoading("", getText("common.operation.executing"));
	//loading.show();
	$.post(uri, params, function(data) {
		//loading.close();
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
		//loading.close();
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

function TemplateDialog(template) {
	/* public variables */
	this.maskAnimation = true;
	this.maskTransparent = false;

	/* private variables */
	var $root = null;
	var $mask = null;
	var $this = this;
	var $width = 400;
	var $height = 300;
	var $contentCell = null;
	var $animation = false;
	var $template = null;
	var $buttons = null;
	var $content = null;
	var $buttonPanel = null;

	// create mask layer.
	$mask = window.document.createElement("div");
	$(window.document.body).append($mask);

	// create dialog box.
	var frame = window.document.createElement("table");
	$(frame).addClass("message_dialog_box");
	$(frame).attr("cellpadding", 0);
	$(frame).attr("cellspacing", 0);
	$(frame).attr("display", "none");
	$(window.document.body).append(frame);
	$root = frame;

	// create dialog frame
	var row = frame.insertRow(frame.rows.length);
	$(row.insertCell(0)).addClass("message_dialog_lt1");
	$(row.insertCell(1)).addClass("message_dialog_lt2");
	$(row.insertCell(2)).addClass("message_dialog_tc");
	$(row.insertCell(3)).addClass("message_dialog_rt1");
	$(row.insertCell(4)).addClass("message_dialog_rt2");
	row = frame.insertRow(frame.rows.length);
	$(row.insertCell(0)).addClass("message_dialog_lt3");
	$(row.insertCell(1)).addClass("message_dialog_main");
	$(row.insertCell(2)).addClass("message_dialog_rt3");
	row = frame.insertRow(frame.rows.length);
	$(row.insertCell(0)).addClass("message_dialog_lc");
	$(row.insertCell(1)).addClass("message_dialog_rc");
	row = frame.insertRow(frame.rows.length);
	$(row.insertCell(0)).addClass("message_dialog_lb3");
	$(row.insertCell(1)).addClass("message_dialog_rb3");
	row = frame.insertRow(frame.rows.length);
	$(row.insertCell(0)).addClass("message_dialog_lb1");
	$(row.insertCell(1)).addClass("message_dialog_lb2");
	$(row.insertCell(2)).addClass("message_dialog_bc");
	$(row.insertCell(3)).addClass("message_dialog_rb1");
	$(row.insertCell(4)).addClass("message_dialog_rb2");

	// get the content cell.
	$contentCell = $root.rows[1].cells[1];
	$($contentCell).attr("rowspan", 3);
	$($contentCell).attr("colspan", 3);
	$($contentCell).attr("display", 'block');

	// create dialog box.
	var table = window.document.createElement("table");
	$(table).css("width", "100%");
	$(table).css("height", "100%");
	$(table).attr("cellpadding", 0);
	$(table).attr("cellspacing", 0);
	$($contentCell).append(table);
	$content = table;
	switchTemplate(template);

	function switchTemplate(template){
		if ($template != null){
			$($content).html("");
		}

		$template = template;
		$buttons = $template.find(".template_button");
		// add dialog title.
		cell = table.insertRow(table.rows.length).insertCell(0);
		$(cell).addClass("message_dialog_title");
		$(cell).html($template.find(".template_title").html());

		// add dialog message.
		cell = table.insertRow(table.rows.length).insertCell(0);
		$(cell).addClass("message_dialog_msg");
		var template_content = $template.find(".template_content");
		var parent_align = template_content.attr("parent_align");
		if (parent_align != null){
			$(cell).attr("align", parent_align);
		}
		$(cell).html(template_content.html());

		// add dialog buttons.
		if ($buttons.length > 0) {
			cell = table.insertRow(table.rows.length).insertCell(0);
			$buttonPanel = cell;
			$(cell).addClass("message_dialog_buttons");
			for (var i = 0; i<$buttons.length; i++) {
				$(cell).append($($buttons[i]).html());
			}
		}
	}

	/**
	 * Resize the dialog.
	 */
	function resize() {
		if ($root != null) {
			$($root).width($width + 28);
			$($root).height($height + 30);
			//$($root).css("margin", "-" + ($height+28) / 2 + "px 0 0 -" + ($width+30)/2 + "px");
			$($contentCell).width($width);
			$($contentCell).height($height);
			$($root.rows[0].cells[2]).width($width-20);
			$($root.rows[2].cells[0]).height($height-20);
			// resize dialog message area height.
			var msgHeight = $height;
			var titleHeight = $($contentCell).find(".message_dialog_title").height();
			msgHeight -= titleHeight;
			if ($buttons.length > 0) {
				var buttonsHeight = $($contentCell).find(".message_dialog_buttons").height();
				msgHeight -= buttonsHeight;
			}
			$($contentCell).find(".message_dialog_msg").height(msgHeight);
		}
	}

	/**
	 * switch page
	 */
	this.switchTemplate = function(template){
		switchTemplate(template);
	};

	/**
	 * Find the specified elements in this dialog.
	 *
	 * @param {String} str - jQuery selection expression
	 */
	this.find = function(str) {
		return $($content).find(str);
	};

	/**
	 * Binding click event for the specified button id.
	 *
	 * @param {String} id - jQuery selection expression
	 * @param {Function} callback - the click callback
	 */
	this.click = function(id, callback) {
		if ($buttonPanel != null) {
			var button = $($buttonPanel).find(id);
			if (button && button.length > 0) {
				button.get(0).dialog = $this;
				button.click(callback);
			}
		}
	};

	/**
	 * Set the size of message dialog.
	 *
	 * @param {int} width
	 * @param {int} height
	 */
	this.setSize = function(width, height) {
		$width = width;
		$height = height;
		resize();
	};

	/**
	 * Show this dialog.
	 */
	this.show = function() {
		if ($this.maskTransparent) {
			$($mask).addClass("message_dialog_mask_layer_empty");
		} else {
			$($mask).addClass("message_dialog_mask_layer");
		}

		// set the dialog z-index.
		var zorder = dialogZOrder;
		dialogZOrder += 5;
		$($mask).css("z-index", zorder++);
		$($root).css("z-index", zorder++);

		// resize the message box.
		resize();

		// show dialog.
		if ($this.maskAnimation)
			$($mask).fadeIn();
		else
			$($mask).show();
		if ($animation)
			$($root).fadeIn();
		else
			$($root).show();
	};

	/**
	 * Hide this dialog
	 */
	this.hide = function() {
		$($mask).hide();
		$($root).hide();
	};

	/**
	 * Close this dialog.
	 */
	this.close = function() {
		if ($mask != null) {
			if ($this.maskAnimation) {
				$($mask).fadeOut(300, function() {
					$($mask).remove();
				});
			} else {
				$($mask).remove();
			}
			$mask = null;
		}
		if ($root != null) {
			if ($animation) {
				$($root).fadeOut(300, function() {
					$($root).remove();
				});
			} else {
				$($root).remove();
			}
			$root = null;
		}
	};

}
