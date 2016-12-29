function GroupLoggingSetting() {}

GroupLoggingSetting.prototype.init = function() {
	$("input[name=enableEncrypt]").change(function() {
		var password = $("input[name='setting.compress.password']");
		if (this.checked)
			password.show();
		else
			password.hide();
	});
	var password = $("input[name='setting.compress.password']");
	if ($("input[name=enableEncrypt]")[0].checked)
		password.show();
	else
		password.hide();

	// convert seconds to days
	var keepTime = $("input[name='setting.entires[0].keepTime']").val();
	if (!isNaN(keepTime))
		$("input[name=keepTime]").val(keepTime/24/3600);

	// convert seconds to minutes
	var scanPeriod = $("input[name='setting.entires[0].scanPeriod']").val();
	if (!isNaN(scanPeriod))
		$("input[name=scanPeriod]").val(scanPeriod/60);

	// convert seconds to minutes
	var deletePeriod = $("input[name='setting.entires[0].deletePeriod']").val();
	if (!isNaN(deletePeriod))
		$("input[name=deletePeriod]").val(deletePeriod/60);

	// bind update button
	$("#btnUpdateLogging").click(GroupLoggingSetting.prototype.update);
};

GroupLoggingSetting.prototype.update = function() {
	var sourceField = $("input[name='setting.entires[0].source']");
	var archiveField = $("input[name='setting.entires[0].archive']");
	var keepTimeField = $("input[name=keepTime]");
	var scanPeriodField = $("input[name=scanPeriod]");
	var deletePeriodField = $("input[name=deletePeriod]");
	var hasError = false;

	sourceField.css("border", "");
	archiveField.css("border", "");
	keepTimeField.css("border", "");
	scanPeriodField.css("border", "");
	deletePeriodField.css("border", "");

	// check source path
	if (sourceField.val().trim() == "") {
		sourceField.css("border", "1px solid red");
		hasError = true;
	}

	// check archive path
	if (archiveField.val().trim() == "") {
		archiveField.css("border", "1px solid red");
		hasError = true;
	}

	var keepTime = keepTimeField.val();
	if (isNaN(keepTime) || keepTime <= 0) {
		keepTimeField.css("border", "1px solid red");
		hasError = true;
	}

	var scanPeriod = scanPeriodField.val();
	if (isNaN(scanPeriod) || scanPeriod <= 0) {
		scanPeriodField.css("border", "1px solid red");
		hasError = true;
	}

	var deletePeriod = deletePeriodField.val();
	if (isNaN(deletePeriod) || deletePeriod <= 0) {
		deletePeriodField.css("border", "1px solid red");
		hasError = true;
	}

	if (hasError)
		return true;

	// convert days to seconds
	$("input[name='setting.entires[0].keepTime']").val(keepTime*24*3600);
	// convert minutes to seconds
	$("input[name='setting.entires[0].scanPeriod']").val(scanPeriod*60);
	$("input[name='setting.entires[0].deletePeriod']").val(deletePeriod*60);

	// if password not used
	if (!$("input[name=enableEncrypt]")[0].checked)
		$("input[name='setting.compress.password']").val("");

	// prepare arguments
	var param = $("#loggingFrom").serialize();
	param += ("&group.id=" + groupSetting.groupId);

	// submit
	var loading = createLoading(groupSetting.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("groupLoggingSettingUpdate.action", param, function(data) {
		loading.close();
		groupSetting.showExecuteResult(data);
	});
};
