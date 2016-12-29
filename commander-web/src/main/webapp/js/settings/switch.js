
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isNullOrEmpty(strVal) {
	if (strVal == '' || strVal == null || strVal == undefined) {
		return true;
	} else {
		return false;
	}
}

function ValidatorIP(ip) {
	if(ip == undefined)
		return false;
	var pattern = "^((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	if(!regExp.test(ip)) {
		return false;
	}
	return true;
}

function ValidatorInteger(ifindex) {
	if(ifindex == undefined)
		return false;

	var pattern = "^-?\\d+$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	if(!regExp.test(ifindex)) {
		return false;
	}
	
	ifindex = parseInt(ifindex);
	if(isNaN(ifindex) || ifindex < 0 || ifindex > 65535) {
		return false;
	}
	return true;
}

function SwitchSetting() {
}

SwitchSetting.prototype.init = function() {
	$("#switch_list_table a.deleteBtn").click(SwitchSetting.prototype.del);
	$("#switch_list_table a.editBtn").click(SwitchSetting.prototype.edit);
	$("#add_button").click(SwitchSetting.prototype.add);
	$("#apply_button").click(SwitchSetting.prototype.apply);
};

SwitchSetting.prototype.checkSwitchSetting = function(community, ip, ifindex) {
	if ((!community || 0 === community.length) || 
		(!ip || 0 === ip.length) ||
		(!ifindex || 0 === ifindex.length))
		return false;

	if (!ValidatorIP(ip) || !ValidatorInteger(ifindex))
		return false;
	return true;
};

SwitchSetting.prototype.checkSwitchList = function() {
	var err = 0;
	$("#switch_list_table tr").each(function(i) {
		if (i != 0) { // ignore title
			var community = trim($(this).children('td').eq(0).text());
			var ip = trim($(this).children('td').eq(1).text());
			var ifindex = trim($(this).children('td').eq(2).text());
			if(!SwitchSetting.prototype.checkSwitchSetting(community, ip, ifindex)) {
				err++;
				return false;
			}
		}
	});
	if (err > 0)
		return false;
	return true;
};


SwitchSetting.prototype.addCheck = function(community, ip, ifindex) {
	var err = 0;
	$("#switch_list_table tr").each(function(i) {
		if (i != 0) { // ignore title
			var ip1 = trim($(this).children('td').eq(1).text());
			var ifindex1 = trim($(this).children('td').eq(2).text());
			if (ip1 == ip && ifindex1 == ifindex) {
				err++;
				return false;
			}
		}
	});
	if (err > 0)
		return false;
	return true;
};

SwitchSetting.prototype.addCheck1 = function(community, ip, ifindex, oldCommunity, oldIp, oldIfindex) {
	var err = 0;
	$("#switch_list_table tr").each(function(i) {
		if (i != 0) { // ignore title
			var community1 = trim($(this).children('td').eq(0).text());
			var ip1 = trim($(this).children('td').eq(1).text());
			var ifindex1 = trim($(this).children('td').eq(2).text());
			if (community1 == oldCommunity && ip1 == oldIp && ifindex1 == oldIfindex) { 
				; // ignore the old item
			}
			else {
				if (ip1 == ip && ifindex1 == ifindex) {
					err++;
					return false;
				}
			}
		}
	});
	if (err > 0)
		return false;
	return true;
};

SwitchSetting.prototype.add = function() {
	var community = trim($("input[name='inputCommunity']").val());
	var ip = trim($("input[name='inputIp']").val());
	var ifindex = trim($("input[name='inputIfindex']").val());

	// check
	$("#errorAdd").hide();
	if (!community || 0 === community.length) {
		$("#errorAdd").text(msgCommunityEmpty).show();
		return;
	} 

	if (!ip || 0 === ip.length) {
		$("#errorAdd").text(msgInvalidIp).show();
		return;
	} 

	if (!ValidatorIP(ip)) {
		$("#errorAdd").text(msgInvalidIp).show();
		return;
	}

	if (!ifindex || 0 === ifindex.length) {
		$("#errorAdd").text(msgInvalidIfindex).show();
		return;
	} 

	if (!ValidatorInteger(ifindex)) {
		$("#errorAdd").text(msgInvalidIfindex).show();
		return;
	}
	
	if (!SwitchSetting.prototype.addCheck(community, ip, ifindex)) {
		$("#errorAdd").text(msgDuplicate).show();
		return;
	}
	
	// add row
	var switchTable = $("#switch_list_table");
	var row = "<tr>"
			+ "<input type='hidden' name='serverId' value='"
			+ serverId
			+ "'/>"
			+ "<td class='community'>"
			+ community
			+ "</td>"
			+ "<td class='ip'>"
			+ ip
			+ "</td>"
			+ "<td class='ifindex'>"
			+ ifindex
			+ "</td>"
			+ "<td class='editBtn' align='center'><a class='editBtn'></a></td>"
			+ "<td class='deleteBtn' align='center'><a class='deleteBtn'></a></td>"
			+ "</tr>";
	switchTable.append(row);

	$("#switch_list_table a.deleteBtn").unbind("click");
	$("#switch_list_table a.deleteBtn").click(SwitchSetting.prototype.del);
	$("#switch_list_table a.editBtn").unbind("click");
	$("#switch_list_table a.editBtn").click(SwitchSetting.prototype.edit);
};

SwitchSetting.prototype.del = function() {
	$(this).parent().parent().remove();
};

SwitchSetting.prototype.edit = function() {
	var row = $(this).parent().parent();
	
	// insert data value to dialog
	var dialog = new window.top.TemplateDialog($("#dialog_edit_switch"));
	var communityCtrl = dialog.find("input[name='community']");
	var ipCtrl = dialog.find("input[name='ip']");
	var ifindexCtrl = dialog.find("input[name='ifindex']");

	var index = row.index(); 
	var oldCommunity = trim(row.children('td').eq(0).text());
	var oldIp = trim(row.children('td').eq(1).text());
	var oldIfindex = trim(row.children('td').eq(2).text());
	
	dialog.find("td[name='communityErr']").text("");
	dialog.find("td[name='ipErr']").text("");
	dialog.find("td[name='ifindexErr']").text("");
	dialog.find("div[name='ifindexErr']").text("").hide();
	
	communityCtrl.val(oldCommunity);
	ipCtrl.val(oldIp);
	ifindexCtrl.val(oldIfindex);

	// binding functions
	dialog.click("#btnOk", function() {
		var community = trim(communityCtrl.val());
		var ip = trim(ipCtrl.val());
		var ifindex = trim(ifindexCtrl.val());
		
		// check
		dialog.find("td[name='communityErr']").text("");
		dialog.find("td[name='ipErr']").text("");
		dialog.find("td[name='ifindexErr']").text("");
		dialog.find("div[name='ifindexErr']").text("").hide();
		
		if (!community || 0 === community.length) {
			dialog.find("td[name='communityErr']").text(msgCommunityEmpty);
			return;
		} 

		if (!ip || 0 === ip.length) {
			dialog.find("td[name='ipErr']").text(msgInvalidIp);
			return;
		} 

		if (!ValidatorIP(ip)) {
			dialog.find("td[name='ipErr']").text(msgInvalidIp);
			return;
		}

		if (!ifindex || 0 === ifindex.length) {
			dialog.find("td[name='ifindexErr']").text(msgInvalidIfindex);
			return;
		} 

		if (!ValidatorInteger(ifindex)) {
			dialog.find("td[name='ifindexErr']").text(msgInvalidIfindex);
			return;
		}
		
		if (community == oldCommunity && ip == oldIp && ifindex == oldIfindex)
		{
			this.dialog.close();
			return;
		}
		
		if (!SwitchSetting.prototype.addCheck1(community, ip, ifindex, oldCommunity, oldIp, oldIfindex)) {
			dialog.find("div[name='actionError']").text(msgDuplicate).show();
			return;
		}

		//set
		row.children('td').eq(0).text(community);
		row.children('td').eq(1).text(ip);
		row.children('td').eq(2).text(ifindex);
		this.dialog.close();
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});

	// show dialog
	dialog.setSize(450, 300);
	dialog.show();
	communityCtrl.focus();
};

SwitchSetting.prototype.apply = function() {
	// check
	$("#errorAdd").hide();
	if (!SwitchSetting.prototype.checkSwitchList()) {
		return;
	}
	
	// save
	var params = {};
	params["id"] = serverId;
	params["isLocal"] = isLocal;
	$("#switch_list_table tr").each(function(i) {
		if (i != 0) { // ignore title
			var j = i - 1;
			params["switchList[" + j + "].id"] = $(this).find('input[name="id"]').val();
			params["switchList[" + j + "].serverId"] = $(this).find('input[name="serverId"]').val();
			params["switchList[" + j + "].community"] = trim($(this).children('td').eq(0).text());
			params["switchList[" + j + "].ip"] = trim($(this).children('td').eq(1).text());
			params["switchList[" + j + "].ifindex"] = trim($(this).children('td').eq(2).text());
		}
	});
	
	var loading = createLoading(fault.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("saveSwitch.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgSaveFailed : data.actionErrors[0]);
		}
		else if (data.fieldErrors) {
			var strFieldErrors = "";
			for ( var p in data.fieldErrors) {
				strFieldErrors += data.fieldErrors[p];
			}
			showErrorMessage(strFieldErrors);
		}
		else {
			showMessage(msgTitle, msgSaveSuccess);
			var params1 = {};
			params1["id"] = id;
			params1["isLocal"] = isLocal;
			$.post("getSwitch.action", params1, function(data) {
				$("#main").html(data);
			});
		}
	});	
};
