var pageControl = null;

function getText(key){
	if(key == "common.error.unknown"){
		return "未知错误";
	}else if (key == "msg.dialog.title.warning"){
		return "警告";
	}

	return "";
}

function MessageDialog(title, message) {
	/* private variables */
	var $root = null;
	var $buttons = new Array();
	//var $mask = null;
	var $this = this;
	var $width = 400;
	var $height = 300;
	var $contentCell = null;
	var $animation = false;

	/* public variables */
	this.title = (title === undefined) ? "" : title;
	this.message = (message === undefined) ? "" : message;

	function DialogButton(text, callback, args) {
		this.text = text;
		this.callback = callback;
		this.args = args;
		this.dialog = $this;
	}

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
	 * Add button to this dialog.
	 *
	 * @param {String} text - the button text
	 * @param {Function} callback - the callback when button click
	 * @param {Object} args - the callback arguments
	 */
	this.addButton = function(text, callback, args) {
		var button = new DialogButton(text, callback, args);
		$buttons[$buttons.length] = button;
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
		var zorder = dialogZOrder;
		dialogZOrder += 5;

		// create mask layer.
		//$mask = document.createElement("div");
		//$($mask).addClass("message_dialog_mask_layer");
		//$($mask).css("z-index", zorder++);
		//$(document.body).append($mask);

		// create dialog box.
		var frame = document.createElement("table");
		$(frame).addClass("message_dialog_box");
		$(frame).css("z-index", zorder++);
		$(frame).attr("cellpadding", 0);
		$(frame).attr("cellspacing", 0);
		$(document.body).append(frame);
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
		var table = document.createElement("table");
		$(table).css("width", "100%");
		$(table).css("height", "100%");
		$(table).attr("cellpadding", 0);
		$(table).attr("cellspacing", 0);
		$($contentCell).append(table);

		// add dialog title.
		cell = table.insertRow(table.rows.length).insertCell(0);
		$(cell).addClass("message_dialog_title");
		$(cell).html(this.title);

		// add dialog message.
		cell = table.insertRow(table.rows.length).insertCell(0);
		$(cell).addClass("message_dialog_msg");
		$(cell).html(this.message);

		// add dialog buttons.
		if ($buttons.length > 0) {
			cell = table.insertRow(table.rows.length).insertCell(0);
			$(cell).addClass("message_dialog_buttons");

			for (var i = 0; i<$buttons.length; i++) {
				var dialogButton = $buttons[i];
				var button = document.createElement("a");
				$(cell).append(button);
				$(button).attr("href", "javascript: void(0)");
				$(button).addClass("message_dialog_button");
				$(button).html(dialogButton.text);
				button.button = dialogButton;
				button.onclick = function() {
					$this.close(function(_button_) {
						if (typeof(_button_.callback) === 'function') {
							_button_.callback.call(_button_, _button_.args);
						}
					}, this.button);
				};
			}
		}

		// resize the message box.
		resize();

		// show dialog.
		// $($mask).mousedown(function(){$this.close();});
		//$($mask).fadeIn();
		if ($animation)
			$($root).fadeIn();
		else
			$($root).show();
	};

	/**
	 * Close this dialog.
	 */
	this.close = function(callback, args) {
		//if ($mask != null) {
		//	$($mask).fadeOut(300, function() {
		//		$($mask).remove();
		//	});
		//	$mask = null;
		//}
		if ($root != null) {
			if ($animation) {
				// if dialog is shown, callback after fade out.
				$($root).fadeOut(300, function() {
					$($root).remove();
					if (typeof(callback) === 'function') {
						callback.call($this, args);
					}
				});
			} else {
				$($root).remove();
				if (typeof(callback) === 'function') {
					callback.call($this, args);
				}
			}
			$root = null;
		} else {
			// if dialog is not shown, callback directly.
			if (typeof(callback) === 'function') {
				callback.call($this, args);
			}
		}
	};
}

function record_init() {
	$("#menu_add_record_fulltime_task").click(showAddFulltimeRecordTask);
	$("#menu_add_record_schedule_task").click(showAddScheduleRecordTask);
	$("#menu_add_record_epg_task").click(showUploadEpgFileDialog);
	$("#menu_add_record_weekly_task").click(showUploadWeeklyFileDialog);

	$("#btnDelete").click(confirmDelete);
	$("#btnEdit").click(editRecordTask);
	$("#btnCopy").click(copyRecordTask);
	$("#btnQuery").click(onQueryList);
	$("#btnReschedule").click(confirmReschedule);
	$("#btnSetting").click(showSetting);

	$(".tab_content").find("input[type=checkbox]").change(onToggleSelection);
	onToggleSelection();
	$(".tab_header input[type=checkbox]").change(function() {
		var checked = this.checked;
		$(".tab_content input[type=checkbox]").each(function() {
			if (this.checked != checked) {
				this.checked = checked;
				$(this).trigger("change");
			}
		});
	});

	var queryForm = $("#queryForm");
	pageControl = $.pagination({
		"method" : "get",
		"data" : {
			"task.id": queryForm.find("input[name='task.id']").val(),
			"task.name": queryForm.find("input[name='task.name']").val(),
			"task.recordType": queryForm.find("select[name='task.recordType']").val(),
			"task.channelId": queryForm.find("select[name='task.channelId']").val(),
		}
	});

	$(".button_epgtime").click(showEpgItems);
//	$(".button_weeklytime").click(showWeeklyItems);
}

function refreshPage() {
	if (pageControl != null) {
		pageControl.refresh();
	}
}

function onToggleSelection() {
	var length = $(".tab_content").find("input[type=checkbox]:checked").length;
	if (length == 0) {
		$("#btnDelete").hide();
		$("#statusText").show();
	} else {
		$("#btnDelete").show();
		$("#statusText").hide();
	}
	$("#btnCopy").hide();
	$("#btnReschedule").hide();
	if (length == 1) {
		$("#btnEdit").show();
		var checked = $(".tab_content").find("input[type=checkbox]:checked");
		var type = checked.parentsUntil(".tab_content").find(".tag_recordtype").text();
		if (type != "EPG") {
			$("#btnCopy").show();
			$("#btnReschedule").show();
		}
	} else {
		$("#btnEdit").hide();
	}
}

function onQueryList() {
	if (!checkNumFields([ "id" ])) {
		$("#queryForm").submit();
	}
}

function checkNumFields(fieldNames) {
	var hasError = false;
	var queryForm = $("#queryForm");
	for (var i = 0; i < fieldNames.length; i++) {
		var field = queryForm.find("input[name='task." + fieldNames[i] + "']");
		var value = field.val();
		if (value != "" && isNaN(value)) {
			field.addClass("field_input_error");
			hasError = true;
		} else {
			field.removeClass("field_input_error");
		}
	}
	return hasError;
}

function showConfirmDialog(title, message, callback, thiz) {
	$("#record_content").hide();
	var dialog = new MessageDialog(title, message);
	dialog.addButton("确认", function() {
		callback.apply(thiz);
		$("#record_content").show();
	});
	dialog.addButton("取消");
	dialog.setSize(400, 200);
	dialog.show();
}

function confirmDelete() {
	var ids = new Array();
	$(".tab_content").find("input[type=checkbox]:checked").each(function() {
		ids += "&ids=" + $(this).val();
	});
	if (ids == "") {
		return;
	}
	ids = ids.substring(1);
	if(!window.confirm(CONFIRM_DELETE_MESSAGE + "\n" ))
		return;
	//showConfirmDialog("警告", CONFIRM_DELETE_MESSAGE, function() {
		deleteRecords(ids);
	//});
};

function deleteRecords(ids) {
	//var loading = createLoading("", getText("common.operation.executing"));
	//loading.show();
	$.post('frameDeleteRecord.action', ids, function(data) {
		//loading.hide();
		if (data.result.success) {
			refreshPage();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		//loading.hide();
		showErrorMessage(getText("common.error.unknown"));
	});
};

function confirmReschedule() {
	var id = $(".tab_content").find("input[type=checkbox]:checked:first").val();
	if (id == "") {
		return;
	}
	if(!window.confirm(CONFIRM_RESCHEDULE_MESSAGE + "\n" ))
		return;
	//showConfirmDialog(getText("msg.dialog.title.warning"), CONFIRM_RESCHEDULE_MESSAGE, function() {
		rescheduleRecordTask(id);
	//});
}

function rescheduleRecordTask(id) {
	//var loading = createLoading("", getText("common.operation.executing"));
	//loading.show();
	var params = {};
	params["task.id"] = id;
	$.post('frameRescheduleRecord.action', params, function(data) {
		//loading.hide();
		if (!data.result.success) {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		//loading.hide();
		showErrorMessage(getText("common.error.unknown"));
	});
}

function showSetting() {
	var uri = "editRecordSetting.action";
	var dialogId = "dialog_edit_record_setting";
	createTemplateDialogByUri(uri, {}, dialogId, onEditSettingDialogCreated);
}

function onEditSettingDialogCreated(dialog) {
	// select file view
	dialog.find("#btnFileView1").click(function() {
		showFileDialog(dialog, dialog.find("input[name='setting.fulltimeFilePath']"));
	});
	dialog.find("#btnFileView2").click(function() {
		showFileDialog(dialog, dialog.find("input[name='setting.scheduleFilePath']"));
	});
	dialog.find("#btnFileView3").click(function() {
		showFileDialog(dialog, dialog.find("input[name='setting.epgFilePath']"));
	});

	// thumbnail checkbox changed
	var thumbBox = dialog.find("input[name='setting.enableThumb']");
	thumbBox.change(function() {
		disableField(dialog, "input[name='setting.thumbWidth']", !this.checked);
	});
	disableField(dialog, "input[name='setting.thumbWidth']", !thumbBox[0].checked);

	// temp extension checkbox changed
	var enableTempExtension = dialog.find("input[name='setting.enableTempExtension']");
	enableTempExtension.change(function() {
		disableField(dialog, "input[name='setting.tempExtension']", !this.checked);
	});
	disableField(dialog, "input[name='setting.tempExtension']", !enableTempExtension[0].checked);

	// delete files checkbox changed
	dialog.find("input[name='deleteFiles']").change(function() {
		disableField(dialog, "input[name='keepTimesValue']", !this.checked);
		disableField(dialog, "select[name='keepTimesUnit']", !this.checked);
	});
	var keepTimes = dialog.find("input[name='setting.fulltimeKeepTimes']").val();
	if (keepTimes > 0) {
		if (keepTimes % (24 * 60) == 0) {
			dialog.find("select[name='keepTimesUnit']").val("1");
			dialog.find("input[name='keepTimesValue']").val(keepTimes/60/24);
		} else {
			dialog.find("select[name='keepTimesUnit']").val("2");
			dialog.find("input[name='keepTimesValue']").val(keepTimes/60);
		}
		dialog.find("input[name='deleteFiles']").attr("checked", true).change();
	} else {
		disableField(dialog, "input[name='keepTimesValue']", true);
		disableField(dialog, "select[name='keepTimesUnit']", true);
	}

	// save button
	dialog.click("#btnSave", function() {
		updateRecordSetting(dialog);
		closeFileDialog(dialog);
	});

	// cancel button
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		closeFileDialog(dialog);
	});

	// show dialog
	dialog.setSize(600, 500);
	dialog.show();
}

function updateRecordSetting(dialog) {
	var isVerifyOk = true;
	isVerifyOk &= verifyInputRegExp(dialog, "input[name='setting.startOffsetTime']", /^[0-9]+$/);
	isVerifyOk &= verifyInputRegExp(dialog, "input[name='setting.stopOffsetTime']", /^[0-9]+$/);
	if (dialog.find("input[name='setting.enableTempExtension']:checked").length != 0) {
		isVerifyOk &= verifyInputRegExp(dialog, "input[name='setting.tempExtension']", /^\.[a-zA-Z]+$/);
	}
	if (dialog.find("input[name='setting.enableThumb']:checked").length != 0) {
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='setting.thumbWidth']");
	}
	var deleteFiles = dialog.find("input[name='deleteFiles']:checked").length != 0;
	if (deleteFiles) {
		isVerifyOk &= verifyPositiveNumber(dialog, "input[name='keepTimesValue']");
		isVerifyOk &= verifyInput(dialog, "select[name='keepTimesUnit']");
	}
	if (!isVerifyOk) {
		return;
	}
	var keepTimes = dialog.find("input[name='setting.fulltimeKeepTimes']");
	if (deleteFiles) {
		var times = dialog.find("input[name='keepTimesValue']").val();
		var unit = dialog.find("select[name='keepTimesUnit']").val();
		if (unit == 1) {
			times = times * 24 * 60;
		} else if (unit == 2) {
			times = times * 60;
		}
		keepTimes.val(times);
	} else {
		keepTimes.val("");
	}
	var data = dialog.find("form").serialize();
	$.post('updateRecordSetting.action', data, function(data) {
		if (data.result.success) {
			dialog.close();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		showErrorMessage(getText("common.error.unknown"));
	});
};

/**
 * Create file dialog.
 * 
 * @param template
 * @returns {TemplateDialog} the file dialog.
 */
function createFileDialog(template) {
	var dialog = createTemplateDialog(template);
	var fileView = dialog.find("#fileTreeContent");
	var loadFileTree = function() {
		fileView.fileTree({
			root: '/',
			expandSpeed: -1,
			collapseSpeed: -1,
			onlyFolder: false,
			script: 'getDirFiles?onlyFolder=true'
		}, null);
	};
	loadFileTree();
	dialog.click("#btnRefresh", loadFileTree);
	dialog.click("#btnOk", function() {
		this.dialog.hide();
		this.dialog.target.val(fileView.getFilePath());
	});
	dialog.click("#btnCancel", function() {
		this.dialog.hide();
	});
	dialog.maskTransparent = true;
	dialog.setSize(600, 400);
	return dialog;
}

function showFileDialog(dialog, target) {
	if (dialog.fileDialog == null) {
		dialog.fileDialog = createFileDialog($("#dialg_for_select_folder"));
	}
	dialog.fileDialog.target = target;
	dialog.fileDialog.show();
}

function closeFileDialog(dialog) {
	if (dialog.fileDialog != null) {
		dialog.fileDialog.close();
		dialog.fileDialog = null;
	}
}

function initThumbCheckbox(dialog) {
	var thumbBox = dialog.find("input[name='task.generateThumb']");
	thumbBox.change(function() {
		disableField(dialog, "input[name='task.thumbWidth']", !this.checked);
		disableField(dialog, "input[name='task.thumbHeight']", true);
	});
	disableField(dialog, "input[name='task.thumbWidth']", !thumbBox[0].checked);
	disableField(dialog, "input[name='task.thumbHeight']", true);
}

//------------------------------------------------------------------------------------------
function copyRecordTask() {
	var checked = $(".tab_content").find("input[type=checkbox]:checked");
	var type = checked.parentsUntil(".tab_content").find(".tag_recordtype").text();
	var dialogId = "dialog_add_record_task";
	var params = {};
	params["task.id"] = checked.val();
	$("#record_content").hide();
	if (type == "FULLTIME") {
		createTemplateDialogByUri("frameAddFullTimeRecord.action", params, dialogId, onAddFulltimeRecordTaskDialogCreated);
	} else if (type == "SCHEDULE") {
		createTemplateDialogByUri("frameAddScheduleRecord.action", params, dialogId, onAddScheduleRecordTaskDialogCreated);
	}
}

function loadingFileTree(){
	$("#fileTreeContent").fileTree({
		root: '/',
		expandSpeed: -1,
		collapseSpeed: -1,
		onlyFolder: false,
		script: 'frameGetDirFiles?onlyFolder=true'
	},null);
}

function showAddFulltimeRecordTask() {
	$("#record_content").hide();
	var uri = "frameAddFullTimeRecord.action";
	var dialogId = "dialog_add_record_task";
	try{
		createTemplateDialogByUri(uri, {}, dialogId, onAddFulltimeRecordTaskDialogCreated);
	}catch(e){
		console.log("e:"+ e.message);
	};
}

function onAddFulltimeRecordTaskDialogCreated(dialog) {
	// select the only one profile
	var profiles = dialog.find("select[name='task.profile'] option");
	if (profiles.length == 2) {
		profiles[1].selected=true;
	}

	// set segment length to 1 hour by default
	if (dialog.find("select[name='task.segmentLength']").val() == "") {
		dialog.find("select[name='task.segmentLength']").val("3600");
	}

	new PopupLayer({trigger:"#btnFileView",popupBlk:"#dialg_for_select_folder",
		closeBtn:"#btnOk",closeBtn2:"#btnCancel",useOverlay:true
		,onBeforeStart:function(){
			loadingFileTree();
		}
	});

	$("#btnOk").bind("click", function(){
		$("#task_outputPath").val($("#fileTreeContent").getFilePath());
	});
	$("#btnRefresh").bind("click", function(){
		loadingFileTree();
	});

	dialog.find("select[name='task.channelId']").change(function() {
		var  channelId = $(this).children('option:selected').val();
		dialog.find("select[name='task.channelReocrdPath']").val(channelId);
		var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
		if(path != null && path!=""){
			dialog.find("input[name='task.outputPath']").val(path);
		}
	});

	// start now checkbox changed
	dialog.find("input[name='startNow']").change(function() {
		disableField(dialog, "input[name='task.schedule.startDate']", this.checked);
		disableField(dialog, "input[name='task.schedule.startTime']", this.checked);
	});

	// always loop checkbox changed
	dialog.find("input[name='alwaysLoop']").change(function() {
		disableField(dialog, "input[name='task.schedule.endDate']", this.checked);
		disableField(dialog, "input[name='task.schedule.endTime']", this.checked);
	});
	if (dialog.find("input[name='task.schedule.endType']").val() == "CONTINUOUS") {
		dialog.find("input[name='alwaysLoop']").attr("checked", true).change();
	}

	// thumbnail checkbox changed
	initThumbCheckbox(dialog);

	// delete files checkbox changed
	dialog.find("input[name='deleteFiles']").change(function() {
		disableField(dialog, "input[name='keepTimesValue']", !this.checked);
		disableField(dialog, "select[name='keepTimesUnit']", !this.checked);
	});
	var keepTimes = dialog.find("input[name='task.keepTimes']").val();
	if (keepTimes > 0) {
		if (keepTimes % (24 * 60) == 0) {
			dialog.find("select[name='keepTimesUnit']").val("1");
			dialog.find("input[name='keepTimesValue']").val(keepTimes/60/24);
		} else {
			dialog.find("select[name='keepTimesUnit']").val("2");
			dialog.find("input[name='keepTimesValue']").val(keepTimes/60);
		}
		dialog.find("input[name='deleteFiles']").attr("checked", true).change();
	} else {
		disableField(dialog, "input[name='keepTimesValue']", true);
		disableField(dialog, "select[name='keepTimesUnit']", true);
	}

	// save button
	dialog.click("#btnSave", function() {
		saveFulltimeRecordTask(dialog);
		//closeFileDialog(dialog);
	});

	// cancel button
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		//closeFileDialog(dialog);
		$("#record_content").show();
	});

	// show dialog
	dialog.setSize(600, 400);
	dialog.show();
}

function disableField(dialog, filter, disabled) {
	dialog.find(filter).attr("disabled", disabled);
}

function verifyInput(dialog, filter) {
	var input = dialog.find(filter);
	input.removeClass("field_input_error");
	if (input.val().trim() == "") {
		input.addClass("field_input_error");
		input.focus();
		return false;
	}
	return true;
}

function verifyInputRegExp(dialog, filter, regexp) {
	var input = dialog.find(filter);
	input.removeClass("field_input_error");
	if (!regexp.test(input.val().trim())) {
		input.addClass("field_input_error");
		input.focus();
		return false;
	}
	return true;
}

function verifyPositiveNumber(dialog, filter) {
	var input = dialog.find(filter);
	input.removeClass("field_input_error");
	if (!/^[1-9][0-9]*$/.test(input.val().trim())) {
		input.addClass("field_input_error");
		input.focus();
		return false;
	}
	return true;
}

function verifyThumbNumber(dialog, filter) {
	var input = dialog.find(filter);
	input.removeClass("field_input_error");
	if (!/^(-1)|([1-9][0-9]*)$/.test(input.val().trim())) {
		input.addClass("field_input_error");
		input.focus();
		return false;
	}
	return true;
}

function verifyCheckbox(dialog, filter) {
	var input = dialog.find(filter);
	input.removeClass("field_input_error");
	var hasChecked = false;
	input.each(function() {
		if (this.checked) {
			hasChecked = this.checked;
		}
	});
	if (!hasChecked) {
		input.addClass("field_input_error");
		input.focus();
		return false;
	}
	return true;
}


function saveFulltimeRecordTask(dialog) {
	var isVerifyOk = true;

	isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.segmentLength']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");
	if (dialog.find("input[name='startNow']:checked").length == 0) {
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startDate']");
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startTime']");
	}
	if (dialog.find("input[name='alwaysLoop']:checked").length == 0) {
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endDate']");
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endTime']");
	}
	if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbWidth']");
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbHeight']");
	}
	var deleteFiles = dialog.find("input[name='deleteFiles']:checked").length != 0;
	if (deleteFiles) {
		isVerifyOk &= verifyPositiveNumber(dialog, "input[name='keepTimesValue']");
		isVerifyOk &= verifyInput(dialog, "select[name='keepTimesUnit']");
	}

	if (!isVerifyOk) {
		return;
	}

	var keepTimes = dialog.find("input[name='task.keepTimes']");
	if (deleteFiles) {
		var times = dialog.find("input[name='keepTimesValue']").val();
		var unit = dialog.find("select[name='keepTimesUnit']").val();
		if (unit == 1) {
			times = times * 24 * 60;
		} else if (unit == 2) {
			times = times * 60;
		}
		keepTimes.val(times);
	} else {
		keepTimes.val("");
	}

	var data = dialog.find("form").serialize();
	$.post('frameSaveFullTimeRecord.action', data, function(data) {
		if (data.result.success) {
			dialog.close();
			refreshPage();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		showErrorMessage(getText("common.error.unknown"));
	});
};

function showAddScheduleRecordTask() {
	$("#record_content").hide();
	var uri = "frameAddScheduleRecord.action";
	var dialogId = "dialog_add_record_task";
	try{
		createTemplateDialogByUri(uri, {}, dialogId, onAddScheduleRecordTaskDialogCreated);
	}catch(e){
		console.log("e:"+ e.message);
	};
}

function disableRepeatFields(dialog, disabled) {
	dialog.find("#endDateTr").attr("disabled", disabled);
	dialog.find("#weekdayTr").attr("disabled", disabled);
	dialog.find("#endDateTr input").attr("disabled", disabled);
	dialog.find("#weekdayTr input").attr("disabled", disabled);
}

function changeScheduleMode(dialog) {
	var disabled = dialog.find("input[name='task.schedule.scheduleType']:checked").val() == "ONCE";
	disableRepeatFields(dialog, disabled);
}

function onAddScheduleRecordTaskDialogCreated(dialog) {
	// select the only one profile
	var profiles = dialog.find("select[name='task.profile'] option");
	if (profiles.length == 2) {
		profiles[1].selected = true;
	}

	// select schedule mode
	dialog.find("input[name='task.schedule.scheduleType']").change(function() {
		changeScheduleMode(dialog);
	});
	if (dialog.find("input[name='task.schedule.scheduleType']:checked").length > 0) {
		changeScheduleMode(dialog);
	} else {
		dialog.find("input[name='task.schedule.scheduleType']:first").click();
	}

	var weekday = dialog.find("input[name='task.schedule.days']").val();
	if (weekday > 0) {
		dialog.find("input[name='weekday']").each(function() {
			$(this).attr("checked", (weekday & $(this).val()) != 0);
		});
	}

	// thumbnail checkbox changed
	initThumbCheckbox(dialog);

	//
	dialog.find("select[name='task.channelId']").change(function() {
		var  channelId = $(this).children('option:selected').val();
		dialog.find("select[name='task.channelReocrdPath']").val(channelId);
		var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
		if(path != null && path!=""){
			dialog.find("input[name='task.outputPath']").val(path);
		}
	});

	// select file view
	//dialog.find("#btnFileView").click(function() {
	//	showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
	//});

	new PopupLayer({trigger:"#btnFileView",popupBlk:"#dialg_for_select_folder",
		closeBtn:"#btnOk",closeBtn2:"#btnCancel",useOverlay:true
		,onBeforeStart:function(){
			loadingFileTree();
		}
	});

	$("#btnOk").bind("click", function(){
		$("#task_outputPath").val($("#fileTreeContent").getFilePath());
	});
	$("#btnRefresh").bind("click", function(){
		loadingFileTree();
	});

	// save button
	dialog.click("#btnSave", function() {
		saveScheduleRecordTask(dialog);
		//closeFileDialog(dialog);
	});

	// cancel button
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		//closeFileDialog(dialog);
		$("#record_content").show();
	});

	// show dialog
	dialog.setSize(600, 450);
	dialog.show();
}

function saveScheduleRecordTask(dialog) {
	var isVerifyOk = true;

	isVerifyOk &= verifyInput(dialog, "input[name='task.name']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startTime']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endTime']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startDate']");
	var repeated = "ONCE" != dialog.find("input[name='task.schedule.scheduleType']:checked").val();
	if (repeated) {
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.repeatEndDate']");
		isVerifyOk &= verifyCheckbox(dialog, "input[name='weekday']");
	}
	if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbWidth']");
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbHeight']");
	}
	if (!isVerifyOk) {
		return;
	}

	var taskname = dialog.find("input[name='task.name']").val();
	for (var i=0;i<taskname.length;i++){
		taskname = taskname.replace(":"," ");
		taskname = taskname.replace("?"," ");
		taskname = taskname.replace("*"," ");
		taskname = taskname.replace("\""," ");
	}
	dialog.find("input[name='task.name']").val(taskname);

	var weekday = 0;
	if (repeated) {
		dialog.find("input[name='weekday']:checked").each(function() {
			weekday |= $(this).val();
		});
	}
	dialog.find("input[name='task.schedule.days']").val(weekday);

	var data = dialog.find("form").serialize();
	$.post('frameSaveScheduleRecord.action', data, function(data) {
		if (data.result.success) {
			dialog.close();
			refreshPage();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		showErrorMessage(getText("common.error.unknown"));
	});
};

function showUploadEpgFileDialog() {
	$("#record_content").hide();
	var uri = "frameSelectEpgFile.action";
	var dialogId = "dialog_add_record_task";
	try{
		createTemplateDialogByUri(uri, {}, dialogId, onSelectEpgFileDialogCreated);
	}catch(e){
		console.log("e:"+ e.message);
	};
}

function onSelectEpgFileDialogCreated(dialog) {
	// next button
	dialog.click("#btnNext", function() {
		uploadEpgFile(this.dialog);
	});

	// cancel button
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		$("#record_content").show();
	});

	dialog.find("select[name='task.channelId']").change(function() {
		var  channelId = $(this).children('option:selected').val();
		dialog.find("select[name='task.channelEpgPath']").val(channelId);
		var path = dialog.find("select[name='task.channelEpgPath']").children('option:selected').text();
		if(path != null && path!=""){
			dialog.find("span[name='epgFilePath']").text(path);
		}else{
			dialog.find("span[name='epgFilePath']").text("");
		}
	});
	
	if(GetLicense("PRODUCT_CNTV") == 1){
		dialog.find("#warning_or").show();
		dialog.find("#warning_filepath").show();
	}else{
		dialog.find("#warning_or").hide();
		dialog.find("#warning_filepath").hide();
	}

	// show dialog
	dialog.setSize(600, 300);
	dialog.show();
}

function uploadEpgFile(dialog) {
	var fileNotSelected = dialog.find("#epgFile").val().length == 0;
	dialog.find('#fileTitle').css("color", fileNotSelected ? "red" : "black");

	var filePathNotSelected = dialog.find("#epgFilePath").text().length == 0;
	dialog.find('#filePathTitle').css("color", filePathNotSelected ? "red" : "black");

	if (fileNotSelected && filePathNotSelected){
		return;
	}

	if ($("#dialog_upload_epg").size() == 0)
		$(document.body).append("<div id=\"dialog_upload_epg\" style=\"display: none\"></div>");
	$("#dialog_upload_epg").empty().append(dialog.find("#epgFile"));

	if(filePathNotSelected){
		//var loading = createLoading("", ("common.operation.executing"));
		//loading.show();
		$.ajaxFileUpload({
			url : 'frameAddEpgRecord.action',
			secureuri : false,
			fileElementId : 'epgFile',
			dataType : "text",
			success : function(data, status) {
				//loading.close();
				if (data != undefined && data.indexOf("form") != -1) {
					showAddEpgRecordTask(dialog, data);
				} else {
					dialog.close();
				}
			},
			error : function(data, status, e) {
				//loading.close();
			}
		});
	}else if(fileNotSelected){
		//var loading = createLoading("", getText("common.operation.executing"));
		//loading.show();
		var param = "epgFilePath=" + dialog.find("#epgFilePath").text();
		param += "&selectChannelId=" + dialog.find("select[name='task.channelId']").children('option:selected').val();
		$.post("frameAddEpgFileRecord.action", param, function(data, status) {
			//loading.close();
			if (data != undefined && data.indexOf("form") != -1) {
				showAddEpgRecordTask(dialog, data);
			} else {
				dialog.close();
			}
		}).error(function(data, status, e) {
			//loading.close();
		});
		//$.ajax({
		//	url : 'addEpgFileRecord.action',
		//	type: 'POST',
		//	data : param,
		//	dataType : "text",
		//	success : function(data, status) {
		//		loading.close();
		//		if (data != undefined && data.indexOf("form") != -1) {
		//			showAddEpgRecordTask(dialog, data);
		//		} else {
		//			dialog.close();
		//		}
		//	},
		//	error : function(data, status, e) {
		//		loading.close();
		//	}
		//});
	}
	$("#dialog_upload_epg").empty();
}

function showAddEpgRecordTask(dialog, data) {
	$("#dialog_upload_epg").html(data);
	dialog.switchTemplate($("#dialog_upload_epg"));
	$("#dialog_upload_epg").empty();

	// select the only one profile
	var profiles = dialog.find("select[name='task.profile'] option");
	if (profiles.length == 2) {
		profiles[1].selected=true;
	}

	var selectId = dialog.find("input[name='task.selectChannelId']").val();
	if (selectId != null) {
		dialog.find("select[name='task.channelId']").val(selectId);
		dialog.find("select[name='task.channelReocrdPath']").val(selectId);
		var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
		if(path != null && path!=""){
			dialog.find("input[name='task.outputPath']").val(path);
		}
	}

	dialog.find("select[name='task.channelId']").change(function() {
		var  channelId = $(this).children('option:selected').val();
		dialog.find("select[name='task.channelReocrdPath']").val(channelId);
		var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
		if(path != null && path!=""){
			dialog.find("input[name='task.outputPath']").val(path);
		}
	});

	// thumbnail checkbox changed
	initThumbCheckbox(dialog);

	// select file view
	//dialog.find("#btnFileView").click(function() {
	//	showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
	//});
	new PopupLayer({trigger:"#btnFileView",popupBlk:"#dialg_for_select_folder",
		closeBtn:"#btnOk",closeBtn2:"#btnCancel",useOverlay:true
		,onBeforeStart:function(){
			loadingFileTree();
		}
	});

	$("#btnOk").bind("click", function(){
		$("#task_outputPath").val($("#fileTreeContent").getFilePath());
	});
	$("#btnRefresh").bind("click", function(){
		loadingFileTree();
	});

	// tab page
	dialog.find(".tab_bar").each(function() {
		var bar = $(this);
		var tab = $(this).find(".tab_bar_toggle");
		var checkbox = $(this).find("input[type='checkbox']");
		var content = dialog.find("#tab_content_" + tab.text());
		tab.click(function() {
			dialog.find(".tab_content").hide();
			dialog.find(".tab_bar").css("background-color", "");
			bar.css("background-color", "lightgray");
			content.show();
		});
		checkbox.click(function() {
			tab.click();
			content.find("input[type=checkbox]").each(function() {
				this.checked = checkbox[0].checked;
			});
		});
	});
	dialog.find(".tab_bar_toggle:first").click();

	// toggle all
	dialog.find("#tab_bar_toggle_all").click(function() {
		var checkbox = $(this);
		dialog.find("#epgTable input[type='checkbox']").each(function() {
			this.checked = checkbox[0].checked;
		});
	});

	dialog.click("#btnSave", function() {
		saveEpgRecordTask(dialog);
		//closeFileDialog(dialog);
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		//closeFileDialog(dialog);
		$("#record_content").show();
	});
	dialog.setSize(600, 500);
}

function saveEpgRecordTask(dialog) {
	var isVerifyOk = true;

	isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");

	if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbWidth']");
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbHeight']");
	}

	if (!isVerifyOk) {
		return;
	}

	var param = {};
	param["task.channelId"] = dialog.find("select[name='task.channelId']").val();
	param["task.profile"] = dialog.find("select[name='task.profile']").val();
	param["task.outputPath"] = dialog.find("input[name='task.outputPath']").val();
	param["task.fileName"] = dialog.find("input[name='task.fileName']").val();
	if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
		param["task.generateThumb"] = dialog.find("input[name='task.generateThumb']").val();
		param["task.thumbWidth"] = dialog.find("input[name='task.thumbWidth']").val();
		param["task.thumbHeight"] = dialog.find("input[name='task.thumbHeight']").val();
	}
	var index = 0;
	dialog.find(".epg_record_line").each(function() {
		var tab = $(this);
		if (tab.find("input[type='checkbox']")[0].checked) {
			param["task.epgItemRecordInfos[" + index + "].name"] = tab.find("input[name='programName']").val();
			param["task.epgItemRecordInfos[" + index + "].schedule.startDate"] = tab.find("input[name='startDate']").val();
			param["task.epgItemRecordInfos[" + index + "].schedule.startTime"] = tab.find("input[name='startTime']").val();
			param["task.epgItemRecordInfos[" + index + "].schedule.endTime"] = tab.find("input[name='endTime']").val();
			index++;
		}
	});
	if (index == 0) {
		showErrorMessage(NO_EPG_TIMES_SELECTED);
		return;
	}

	//var loading = createLoading("", getText("common.operation.executing"));
	//loading.show();
	$.post('frameSaveEpgRecord.action', param, function(data) {
		//loading.hide();
		if (data.result.success) {
			dialog.close();
			refreshPage();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		//loading.hide();
		showErrorMessage(getText("common.error.unknown"));
	});
}

function showEpgItems() {
	var id = $(this).parents(".tab_content").find("input[type=checkbox]").val();
	var uri = "frameShowEpgItems.action";
	var dialogId = "dialog_show_epg_items";
	var param = {};
	param["id"] = id;
	createTemplateDialogByUri(uri, param, dialogId, onShowEpgItemsDialogCreated);
}

function onShowEpgItemsDialogCreated(dialog) {
	// tab page
	$("#record_content").hide();
	dialog.find(".tab_bar").each(function() {
		var bar = $(this);
		var tab = $(this).find(".tab_bar_toggle");
		var content = dialog.find("#tab_content_" + tab.text());
		tab.click(function() {
			dialog.find(".tab_content").hide();
			dialog.find(".tab_bar").css("background-color", "");
			bar.css("background-color", "lightgray");
			content.show();
		});
	});
	dialog.find(".tab_bar_toggle:first").click();

	// Ok button
	dialog.click("#btnOk", function() {
		this.dialog.close();
		$("#record_content").show();
	});
	// show dialog
	dialog.setSize(600, 300);
	dialog.show();
}
//------------------------------------------------------------------------------------------
function showUploadWeeklyFileDialog() {
	$("#record_content").hide();
	var uri = "frameSelectWeeklyFile.action";
	var dialogId = "dialog_add_record_task";
	try{
		createTemplateDialogByUri(uri, {}, dialogId, onSelectWeeklyFileDialogCreated);
	}catch(e){
		console.log("e:"+ e.message);
	};
}
function onSelectWeeklyFileDialogCreated(dialog) {
	// next button
	$("#record_content").hide();
	dialog.click("#btnNext", function() {
		uploadWeeklyFile(this.dialog);
	});

	// cancel button
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		$("#record_content").show();
	});

	// show dialog
	dialog.setSize(600, 300);
	dialog.show();
}

function uploadWeeklyFile(dialog) {
	var fileNotSelected = dialog.find("#weeklyFile").val().length == 0;
	dialog.find('#fileTitle').css("color", fileNotSelected ? "red" : "black");

	if (fileNotSelected){
		return;
	}

	if ($("#dialog_upload_weekly").size() == 0)
		$(document.body).append("<div id=\"dialog_upload_weekly\" style=\"display: none\"></div>");
	$("#dialog_upload_weekly").empty().append(dialog.find("#weeklyFile"));

	if(!fileNotSelected){
		//var loading = createLoading("", getText("common.operation.executing"));
		//loading.show();
		$.ajaxFileUpload({
			url : 'frameAddWeeklyRecord.action',
			secureuri : false,
			fileElementId : 'weeklyFile',
			dataType : "text",
			success : function(data, status) {
				//loading.close();
				if (data != undefined && data.indexOf("form") != -1) {
					showAddWeeklyRecordTask(dialog, data);
				} else {
					dialog.close();
				}
			},
			error : function(data, status, e) {
				//loading.close();
			}
		});
	}
	$("#dialog_upload_weekly").empty();
}

function showAddWeeklyRecordTask(dialog, data) {
	$("#dialog_upload_weekly").html(data);
	dialog.switchTemplate($("#dialog_upload_weekly"));
	$("#dialog_upload_weekly").empty();

	// select the only one profile
	var profiles = dialog.find("select[name='task.profile'] option");
	if (profiles.length == 2) {
		profiles[1].selected=true;
	}

	dialog.find("select[name='task.channelId']").change(function() {
		var  channelId = $(this).children('option:selected').val();
		dialog.find("select[name='task.channelReocrdPath']").val(channelId);
		var path = dialog.find("select[name='task.channelReocrdPath']").children('option:selected').text();
		if(path != null && path!=""){
			dialog.find("input[name='task.outputPath']").val(path);
		}
	});

	// thumbnail checkbox changed
	initThumbCheckbox(dialog);

	// select file view
	//dialog.find("#btnFileView").click(function() {
	//	showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
	//});
	new PopupLayer({trigger:"#btnFileView",popupBlk:"#dialg_for_select_folder",
		closeBtn:"#btnOk",closeBtn2:"#btnCancel",useOverlay:true
		,onBeforeStart:function(){
			loadingFileTree();
		}
	});

	$("#btnOk").bind("click", function(){
		$("#task_outputPath").val($("#fileTreeContent").getFilePath());
	});
	$("#btnRefresh").bind("click", function(){
		loadingFileTree();
	});

		// select schedule mode
	dialog.find("input[name='task.schedule.scheduleType']").change(function() {
		changeScheduleMode(dialog);
	});
	if (dialog.find("input[name='task.schedule.scheduleType']:checked").length > 0) {
		changeScheduleMode(dialog);
	} else {
		dialog.find("input[name='task.schedule.scheduleType']:first").click();
	}

	// tab page
	dialog.find(".tab_bar").each(function() {
		var bar = $(this);
		var tab = $(this).find(".tab_bar_toggle");
		var checkbox = $(this).find("input[type='checkbox']");
		var content = dialog.find("#tab_content_" + tab.find("input:first").val());
		tab.click(function() {
			dialog.find(".tab_content").hide();
			dialog.find(".tab_bar").css("background-color", "");
			bar.css("background-color", "lightgray");
			content.show();
		});
		checkbox.click(function() {
			tab.click();
			content.find("input[type=checkbox]").each(function() {
				this.checked = checkbox[0].checked;
			});
		});
	});
	dialog.find(".tab_bar_toggle:first").click();

	// toggle all
	dialog.find("#tab_bar_toggle_all").click(function() {
		var checkbox = $(this);
		dialog.find("#epgTable input[type='checkbox']").each(function() {
			this.checked = checkbox[0].checked;
		});
	});

	dialog.click("#btnSave", function() {
		saveWeeklyRecordTask(dialog);
		//closeFileDialog(dialog);
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		//closeFileDialog(dialog);
		$("#record_content").show();
	});
	dialog.setSize(600, 500);
}

function saveWeeklyRecordTask(dialog) {
	var isVerifyOk = true;

	isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");
	var repeated = "ONCE" != dialog.find("input[name='task.schedule.scheduleType']:checked").val();
	if (repeated) {
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.repeatEndDate']");
	}

	if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbWidth']");
		isVerifyOk &= verifyThumbNumber(dialog, "input[name='task.thumbHeight']");
	}

	if (!isVerifyOk) {
		return;
	}

	var param = {};
	param["task.channelId"] = dialog.find("select[name='task.channelId']").val();
	param["task.profile"] = dialog.find("select[name='task.profile']").val();
	param["task.outputPath"] = dialog.find("input[name='task.outputPath']").val();
	param["task.fileName"] = dialog.find("input[name='task.fileName']").val();
	param["task.weeklyRecord"] = repeated;
	var date = dialog.find("input[name='task.repeatEndDate']").val();
	param["task.repeatEndDate"] = dialog.find("input[name='task.schedule.repeatEndDate']").val();
	if (dialog.find("input[name='task.generateThumb']:checked").length != 0) {
		param["task.generateThumb"] = dialog.find("input[name='task.generateThumb']").val();
		param["task.thumbWidth"] = dialog.find("input[name='task.thumbWidth']").val();
		param["task.thumbHeight"] = dialog.find("input[name='task.thumbHeight']").val();
	}
	var index = 0;
	dialog.find(".epg_record_line").each(function() {
		var tab = $(this);
		if (tab.find("input[type='checkbox']")[0].checked) {
			param["task.weeklyItemRecordInfos[" + index + "].name"] = tab.find("input[name='programName']").val();
			param["task.weeklyItemRecordInfos[" + index + "].schedule.startDate"] = tab.find("input[name='startDate']").val();
			param["task.weeklyItemRecordInfos[" + index + "].schedule.startTime"] = tab.find("input[name='startTime']").val();
			param["task.weeklyItemRecordInfos[" + index + "].schedule.endTime"] = tab.find("input[name='endTime']").val();
			param["task.weeklyItemRecordInfos[" + index + "].schedule.days"] = tab.find("input[name='weeklyday']").val();
			index++;
		}
	});
	if (index == 0) {
		showErrorMessage(NO_EPG_TIMES_SELECTED);
		return;
	}

	//var loading = createLoading("", getText("common.operation.executing"));
	//loading.show();
	$.post('frameSaveWeeklyRecord.action', param, function(data) {
		//loading.hide();
		if (data.result.success) {
			dialog.close();
			refreshPage();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		//loading.hide();
		showErrorMessage(getText("common.error.unknown"));
	});
}

function showWeeklyItems() {
	var id = $(this).parents(".tab_content").find("input[type=checkbox]").val();
	var uri = "showWeeklyItems.action";
	var dialogId = "dialog_show_weekly_items";
	var param = {};
	param["id"] = id;
	createTemplateDialogByUri(uri, param, dialogId, onShowWeeklyItemsDialogCreated);
}

function onShowWeeklyItemsDialogCreated(dialog) {
	// tab page
	dialog.find(".tab_bar").each(function() {
		var bar = $(this);
		var tab = $(this).find(".tab_bar_toggle");
		var content = dialog.find("#tab_content_" + tab.find("input:first").val());
		tab.click(function() {
			dialog.find(".tab_content").hide();
			dialog.find(".tab_bar").css("background-color", "");
			bar.css("background-color", "lightgray");
			content.show();
		});
	});
	dialog.find(".tab_bar_toggle:first").click();

	// Ok button
	dialog.click("#btnOk", function() {
		this.dialog.close();
	});
	// show dialog
	dialog.setSize(600, 300);
	dialog.show();
}

//------------------------------------------------------------------------------------------
function editRecordTask() {
	var checked = $(".list_view_content input[type=checkbox]:checked:first");
	var type = checked.parentsUntil(".tab_content").find(".tag_recordtype").text();
	var dialogId = "dialog_edit_record_task";
	var params = {};
	params["task.id"] = checked.val();
	if (type == "FULLTIME") {
		createTemplateDialogByUri("editFullTimeRecord.action", params, dialogId, oEditFulltimeRecordTaskDialogCreated);
	} else if (type == "SCHEDULE") {
		createTemplateDialogByUri("editScheduleRecord.action", params, dialogId, oEditScheduleRecordTaskDialogCreated);
	}
}

function oEditFulltimeRecordTaskDialogCreated(dialog) {
	// set segment name
	dialog.find("select[name='task.channelId']").change(function() {
		var name = $(this).val() != "" ? $(this).find("option:selected").text() : "";
		name += "-${yyyy}${MM}${dd}-${HH}${mm}";
		dialog.find("input[name='task.fileName']").val(name);
	});

	// select file view
	dialog.find("#btnFileView").click(function() {
		showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
	});

	// start now checkbox changed
	dialog.find("input[name='startNow']").change(function() {
		disableField(dialog, "input[name='task.schedule.startDate']", this.checked);
		disableField(dialog, "input[name='task.schedule.startTime']", this.checked);
	});

	// always loop checkbox changed
	dialog.find("input[name='alwaysLoop']").change(function() {
		disableField(dialog, "input[name='task.schedule.endDate']", this.checked);
		disableField(dialog, "input[name='task.schedule.endTime']", this.checked);
	});
	var checked = dialog.find("input[name='alwaysLoop']:checked").length > 0;
	disableField(dialog, "input[name='task.schedule.endDate']", checked);
	disableField(dialog, "input[name='task.schedule.endTime']", checked);
	

	// save button
	dialog.click("#btnSave", function() {
		updateFulltimeRecordTask(dialog);
		closeFileDialog(dialog);
	});

	// cancel button
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		closeFileDialog(dialog);
	});

	// show dialog
	dialog.setSize(600, 350);
	dialog.show();
}

function updateFulltimeRecordTask(dialog) {
	var isVerifyOk = true;

	isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.segmentLength']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");

	if (dialog.find("input[name='startNow']:checked").length == 0) {
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startDate']");
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startTime']");
	}

	if (dialog.find("input[name='alwaysLoop']:checked").length == 0) {
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endDate']");
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endTime']");
	}

	if (!isVerifyOk) {
		return;
	}

	var data = dialog.find("form").serialize();
	$.post('frameUpdateFullTimeRecord.action', data, function(data) {
		if (data.result.success) {
			dialog.close();
			refreshPage();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		showErrorMessage(getText("common.error.unknown"));
	});
}

function oEditScheduleRecordTaskDialogCreated(dialog) {
	// select the only one profile
	var profiles = dialog.find("select[name='task.profile'] option");
	if (profiles.length == 2) {
		profiles[1].selected = true;
	}

	// select schedule mode
	dialog.find("input[name='task.schedule.scheduleType']").change(function() {
		changeScheduleMode(dialog);
	});
	changeScheduleMode(dialog);

	// task weekdays
	var weekdays = dialog.find("input[name='task.schedule.days']").val();
	dialog.find("input[name='weekday']").each(function() {
		$(this).attr("checked", (weekdays & $(this).val()) != 0);
	});

	// select file view
	dialog.find("#btnFileView").click(function() {
		showFileDialog(dialog, dialog.find("input[name='task.outputPath']"));
	});

	// save button
	dialog.click("#btnSave", function() {
		updateScheduleRecordTask(dialog);
		closeFileDialog(dialog);
	});

	// cancel button
	dialog.click("#btnCancel", function() {
		this.dialog.close();
		closeFileDialog(dialog);
	});

	// show dialog
	dialog.setSize(600, 450);
	dialog.show();
}

function updateScheduleRecordTask(dialog) {
	var isVerifyOk = true;

	isVerifyOk &= verifyInput(dialog, "input[name='task.name']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.channelId']");
	isVerifyOk &= verifyInput(dialog, "select[name='task.profile']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.fileName']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.outputPath']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startTime']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.endTime']");
	isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.startDate']");
	var repeated = "ONCE" != dialog.find("input[name='task.schedule.scheduleType']:checked").val();
	if (repeated) {
		isVerifyOk &= verifyInput(dialog, "input[name='task.schedule.repeatEndDate']");
		isVerifyOk &= verifyCheckbox(dialog, "input[name='weekday']");
	}

	if (!isVerifyOk) {
		return;
	}

	var weekday = 0;
	if (repeated) {
		dialog.find("input[name='weekday']:checked").each(function() {
			weekday |= $(this).val();
		});
	}
	dialog.find("input[name='task.schedule.days']").val(weekday);

	var data = dialog.find("form").serialize();
	$.post('frameUpdateScheduleRecord.action', data, function(data) {
		if (data.result.success) {
			dialog.close();
			refreshPage();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		showErrorMessage(getText("common.error.unknown"));
	});
};
