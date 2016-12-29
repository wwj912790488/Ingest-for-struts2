function GroupTime() {
	this.ntpPreselId = null;
	this.ntpServerId = 0;
}

GroupTime.prototype.init = function() {
	ntpPreselId = null;
	ntpServerId = 0;
	
	$('input[name="timeUpdateMode"]').change(function() {
		$("#ntpsyncPanel").toggle();
		$("#datetimePanel").toggle();
	});
	$("#btnSaveTime").click(GroupTime.prototype.save);
	$("#btnAddNtpServer").click(GroupTime.prototype.add);
	$("#btnRemoveNtpServer").click(GroupTime.prototype.remove);
};

GroupTime.prototype.isValidNtpServer = function(server) {
	if (isValidIp(server))
		return true;
	var urlreg=/^([\w-]+\.)+((com)|(net)|(org)|(gov.cn)|(info)|(cc)|(com.cn)|(net.cn)|(org.cn)|(name)|(biz)|(tv)|(cn)|(la))$/;
	if (urlreg.test(server))
		return true;
	return false;
};

GroupTime.prototype.select = function() {
	if (ntpPreselId != null) {
		$("tr#"+ntpPreselId).css({"background-color":""});
	}
	var idn = $(this).attr("id");
	if (idn == ntpPreselId){
		ntpPreselId = null;
		return ;
	}
	$(this).css({"background-color":"lightgrey"});
	ntpPreselId = idn;
};

GroupTime.prototype.add = function() {
	var server = $("#ntpServerInput").val().trim();
	if (server == "")
		return;
	if (!GroupTime.prototype.isValidNtpServer(server)) {
		showWarnMessage(msgInvalidServer);
		return;
	}
	var exist = false;
	$.each($("#ntpServerList tr"), function(i) {
		$(this).children("td").each(function(j) {
			if (j == 0 && $(this).text() == server) {
				exist = true;
				return;
			}
		});
	});
	if (!exist) {
		var html = "<tr id='ntpServerId" + ntpServerId + "'><td class='ntpServerName'>" + server + "</td><td class='ntpServerPrefer'><input type='radio' name='ntpPrefer'></td></tr>";
		ntpServerId++;
		$("#ntpServerList").append(html);
	}
	$("#ntpServerList tr").unbind("click");
	$("#ntpServerList tr").click(GroupTime.prototype.select);

	$("#ntpServerInput").val("");
};

GroupTime.prototype.remove = function() {
	$("tr#"+ ntpPreselId).remove();
};

GroupTime.prototype.save = function() {
	var isNtpMode = $('input[name="timeUpdateMode"]:checked').val();
	var params = {};
	params["group.id"] = groupSetting.groupId;
	params["ntpStatus.isServiceOn"] = isNtpMode;
	if (isNtpMode == "true") {
		var ntps = {};
		$.each($("#ntpServerList tr"), function(i) {
			var server =  $(this).children('td').eq(0).text();
			if ($(this).find("input[name='ntpPrefer']")[0].checked) {
				server += " prefer";
			}
			ntps[i] = server;
		});
		if ($.isEmptyObject(ntps)) {
			showWarnMessage(msgEmptyServer);
			return;
		}
		params["ntpStatus.ntpServers"] = ntps;
	} else {
		params["date"] = $("#calander").val();
		if (params["date"].length == 0) {
			showWarnMessage(msgEmptyDate);
			return;
		};
	}
	var loading = createLoading(groupSetting.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("groupTimeSync.action", params, function(data) {
		loading.close();
		groupSetting.showExecuteResult(data);
	});
};
