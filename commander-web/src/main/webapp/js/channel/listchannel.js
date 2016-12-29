var pageControl = null;

function channel_init() {
	$("#addChannel").click(showAddPage);
	$("#btnDelete").click(confirmDelete);
	$("#btnEdit").click(showEditPage);
	$("#btnQuery").click(onQueryList);
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
			"channel.id": queryForm.find("input[name='channel.id']").val(),
			"channel.name": queryForm.find("input[name='channel.name']").val(),
			"channel.uri": queryForm.find("input[name='channel.uri']").val(),
			"channel.programId": queryForm.find("input[name='channel.programId']").val(),
			"channel.videoId": queryForm.find("input[name='channel.videoId']").val(),
			"channel.audioId": queryForm.find("input[name='channel.audioId']").val(),
		}
	});
}

function refreshPage() {
	if (pageControl != null) {
		pageControl.refresh();
	}
}

function onToggleSelection() {
	var checkedCount = $(".tab_content").find("input[type=checkbox]:checked").length;
	if (checkedCount == 0) {
		$("#btnDelete").hide();
		$("#btnEdit").hide();
		$("#statusText").show();
	} else {
		if (checkedCount > 1) {
			$("#btnEdit").hide();
		} else {
			$("#btnEdit").show();
		}
		$("#btnDelete").show();
		$("#statusText").hide();
	}
}

function onQueryList() {
	if (!checkNumFields([ "id", "programId", "videoId", "audioId" ])) {
		$("#queryForm").submit();
	}
}

function checkNumFields(fieldNames) {
	var hasError = false;
	var queryForm = $("#queryForm");
	for (var i = 0; i < fieldNames.length; i++) {
		var field = queryForm.find("input[name='channel." + fieldNames[i] + "']");
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

function showAddPage() {
	createTemplateDialogByUri("addChannel.action", {}, "add_channel_content", onAddDialogCreated);
}

function onAddDialogCreated(dialog) {
	var profiles = dialog.find("select[name='channel.group.id'] option");
	if (profiles.length == 2) {
		profiles[1].selected=true;
		dialog.find("select[name='channel.group.id']").trigger("change");
	}

	dialog.find(".tab_header input[type='checkbox']").click(function() {
		var checked = this.checked;
		dialog.find(".tab_content input[type='checkbox']").each(function() {
			this.checked = checked;
		});
	});
	dialog.find("#btnScan").click(function() {
		loadingPrograms(dialog);
	});
	dialog.click("#btnOk", function() {
		saveChannel(dialog);
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});

	dialog.find("#sourceinputtype").change(function() {
		var  tmp = $(this).children('option:selected').val();
		if(tmp == "Network"){
			dialog.find("#sdiinputtypearea").hide();
			dialog.find("#channeluriarea").show();
			dialog.find("#asiinputtypearea").hide();
		}else if(tmp == "SDI"){
			dialog.find("#sdiinputtypearea").show();
			dialog.find("#channeluriarea").hide();
			dialog.find("#asiinputtypearea").hide();
			updatePort(dialog);
			dialog.find("select[name='channel.group.id']").trigger("change");
		}else if(tmp == "ASI"){
			dialog.find("#sdiinputtypearea").hide();
			dialog.find("#channeluriarea").hide();
			dialog.find("#asiinputtypearea").show();
			updatePort(dialog);
			dialog.find("select[name='channel.group.id']").trigger("change");
		}
	});

	dialog.find("select[name='channel.group.id']").change(function(){
		var groupId = $(this).val();
		$.post("getServers", {"group.id" : groupId}, function(data){
			var test = dialog.find("select[name='channel.group.id']").val();
			if(data){
				if(data.actionErrors != null && data.actionErrors.length > 0){
					alert(data.actionErrors[0]);
				}else{
					appendToSelect(data.serverIdNamePair, dialog);
				}
			}
		});
	});

	dialog.setSize(600, 400);
	dialog.find("#sdiinputtypearea").hide();
	dialog.find("#asiinputtypearea").hide();
	dialog.show();
}

function appendToSelect(jsonObj, dialog){
	var selectObj = dialog.find("select[name='server']");
	selectObj.empty();//clear child option first
	if(jsonObj != null){
		$.each(jsonObj, function(k, v){
			selectObj.append("<option value='"+ k +"'>"+v+"</option>");
		});
	}
}

function loadingPrograms(dialog) {
	var inputType = dialog.find("select[name='sourceinputtype']").val();
	var groupId,serverId;
	var data;
	if(inputType == "Network"){
		groupId = dialog.find("select[name='channel.group.id']").val();
		if (groupId == "") {
			return;
		}
		var uri = dialog.find("input[name=channelUri]").val();
		if (uri == "") {
			return;
		}

		var ss = uri.indexOf("m3u8");
		if(uri.indexOf("m3u8")>0){
			var reg = new RegExp("^(http:(//)?)?(.*)$");
			data = "uri=" + uri.replace(reg, "http://$3") + "&groupId=" + groupId;
		}else{
			var reg = new RegExp("^(udp:(//)?)?(.*)$");
			data = "uri=" + uri.replace(reg, "udp://$3") + "&groupId=" + groupId;
		}


	}else if(inputType == "SDI"){
		serverId = dialog.find("select[name='server']").val();
		if (serverId == "") {
			return;
		}
		var inputPort = dialog.find("select[name='source.input.sdi.port']").val();
		data = "uri=sdi:" + inputPort + "&serverId=" + serverId;
	}else if(inputType == "ASI"){
		serverId = dialog.find("select[name='server']").val();
		if (serverId == "") {
			return;
		}
		var inputPort = dialog.find("select[name='source.input.asi.port']").val();
		data = "uri=asi:" + inputPort + "&serverId=" + serverId;
	}

	var loading = createLoading("", getText("common.operation.executing"));
	loading.show();
	$.post("showChannels.action", data, function(result) {
		loading.close();
		dialog.find("#programList").html(result);
		var gid = dialog.find("input[id='groupId']").val();
		dialog.find("select[name=channel.group.id']").val(gid);
	}).error(function() {
		loading.close();
	});
}

function saveChannel(dialog) {
	var form = dialog.find("#channelForm");
	var scanUri = form.find("#scanUri").val();
	var groupId = form.find("#groupId").val();
	var inputType = "N/A";
	if(scanUri.indexOf("udp")>=0){
		inputType = "UDP";
	}else if(scanUri.indexOf("sdi")>=0){
		inputType = "SDI";
	}else if(scanUri.indexOf("asi")>=0){
		inputType = "ASI";
	}else if(scanUri.indexOf("http")>=0){
		inputType = "HTTP";
	}
	var params = {};
	var hasError = false;
	form.find(".tab_content input[type=checkbox]:checked").each(function(index, object) {
		params["channels[" + index + "].type"] = inputType;
		params["channels[" + index + "].uri"] = scanUri;
		params["channels[" + index + "].group.id"] = groupId;
		params["channels[" + index + "].programId"] = (inputType == "SDI") ? 0 :$(object).val();
		var tr = $(object).parent().parent();
		var programField = tr.find("#programName");
		var name = programField.val();
		if (name == "") {
			programField.addClass("field_input_error");
			hasError = true;
		} else {
			programField.removeClass("field_input_error");
		}
		params["channels[" + index + "].name"] = name;
		params["channels[" + index + "].videoId"] = (inputType == "SDI") ? 0 : tr.find("#videoId").val();
		params["channels[" + index + "].audioId"] = (inputType == "SDI") ? 0 : tr.find("#audioId").val();
		params["channels[" + index + "].videoInfo"] =  tr.find("#videoInfo").text();
		params["channels[" + index + "].audioInfo"] =  tr.find("#audioInfo").text();
		var audioIds = "";
		var isChked = dialog.find("#btnAudioSelAll").is(':checked');
		if(dialog.find("#btnAudioSelAll").is(':checked')){
			tr.find("#audioId option").each(function(i,o){
				audioIds += o.value + " ";
			});
		}
		params["channels[" + index + "].audioAll"] = audioIds ;
	});
	if (hasError) {
		return;
	}
	if ($.isEmptyObject(params)) {
		dialog.close();
		return;
	}
	$.post('saveChannel.action', params, function(data) {
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

function showEditPage() {
	var checkboxes = $(".tab_content").find("input[type=checkbox]:checked");
	if (checkboxes.length != 1) {
		return;
	}
	var params = {};
	params["channel.id"] = checkboxes.val();
	createTemplateDialogByUri("editChannel.action", params, "edit_channel_content", onEditDialogCreated);
}

function onEditDialogCreated(dialog) {
	dialog.click("#btnOk", function() {
		updateChannel(dialog);
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(400, 200);
	dialog.show();
}

function updateChannel(dialog) {
	var channelForm = dialog.find("#channelForm");
	var channelName = channelForm.find("input[name='channel.name']");
	channelName.removeClass("field_input_error");
	if (channelName.val() == "") {
		channelName.addClass("field_input_error");
		return;
	}
	var params = channelForm.serialize();
	$.post('updateChannel.action', params, function(data) {
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

function confirmDelete() {
	var ids = new Array();
	$(".tab_content").find("input[type=checkbox]:checked").each(function() {
		ids += "&ids=" + $(this).val();
	});
	if (ids == "") {
		return;
	}
	ids = ids.substring(1);
	showConfirmDialog(getText("msg.dialog.title.warning"), CONFIRM_DELETE_MESSAGE, function() {
		deleteChannel(ids);
	});
};

function deleteChannel(ids) {
	$.post('deleteChannel.action', ids, function(data) {
		if (data.result.success) {
			refreshPage();
		} else {
			showErrorMessage(data.result.message);
		}
	}, 'json').error(function() {
		showErrorMessage(getText("common.error.unknown"));
	});
};

function updatePort(dialog) {
	var context = dialog;
	var inputType = dialog.find("select[name='sourceinputtype']").val();
	if(inputType != "SDI" && inputType != "ASI") return;
	
	var url ="getMediaFileInfo";
	var uri = "";
	if(inputType == "SDI") {
		uri = "sdiport:0";
	}
	else if(inputType == "ASI") {
		uri = "asiport:0";
	}
	else if(inputType == INPUT_TYPE_AES_EBU) {
		uri = "aesport:0";
	}
	
	var param = { 'uri': uri, 'rnd': Math.random() };
	$.post(url, param, function(data) {
		onPortResponse(dialog,data);
	}, "xml");
};

function onPortResponse(dialog, data) {
	if(data == null) return;
	var portParser = new MediaPortParser();
	portParser.Init(data);
	var type = portParser.GetType();
	var pa = portParser.GetPortArray();
	if(type == "SDI"){
		uUpdateSelect(dialog.find("select[name='source.input.sdi.port']", this.dom).get(0), pa);
	}else if(type == "ASI"){
		uUpdateSelect(dialog.find("select[name='source.input.asi.port']", this.dom).get(0), pa);
	}
};