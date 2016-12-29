function NioSetting() {
	this.cnPrimaryInput = 0;
	this.cnSecondaryInput = 0;
	this.cnPrimaryOutput = 0;
	this.cnSecondaryOutput = 0;
}

NioSetting.prototype.init = function() {
	$("#nio_list_table a.deleteBtn").click(NioSetting.prototype.del);
	$("#nio_list_table a.editBtn").click(NioSetting.prototype.edit);
	$("#add_button").click(NioSetting.prototype.add);
	$("#apply_button").click(NioSetting.prototype.apply);
};

NioSetting.prototype.checkNioList = function() {
	// initial
	cnPrimaryInput = 0;
	cnSecondaryInput = 0;
	cnPrimaryOutput = 0;
	cnSecondaryOutput = 0;
	// check
	$("#nio_list_table tr").each(function(i) {
		if (i != 0) { // ignore title
			$(this).children("td").each(function(j) {
				if (j == 1) {
					if ($(this).attr('value') == PRIMARY_INPUT_TYPE)
						cnPrimaryInput++;
					if ($(this).attr('value') == SECONDARY_INPUT_TYPE)
						cnSecondaryInput++;
					if ($(this).attr('value') == PRIMARY_OUTPUT_TYPE)
						cnPrimaryOutput++;
					if ($(this).attr('value') == SECONDARY_OUTPUT_TYPE)
						cnSecondaryOutput++;
				}
			});
		}
	});
};

NioSetting.prototype.add = function() {
	var nioName = $("input[name='inputNioName']").val();
	var nioType = $("select[name='selectNioType']").val();
	
	if (!nioName || 0 === nioName.length)
		return;

	// check
	$("#errorAdd").hide();
	NioSetting.prototype.checkNioList();
	if (cnPrimaryInput > 0 && nioType == PRIMARY_INPUT_TYPE) {
		$("#errorAdd").text(msgMoreThanOnePrimaryInput).show();
		return;
	}
	if (cnSecondaryInput > 0 && nioType == SECONDARY_INPUT_TYPE) {
		$("#errorAdd").text(msgMoreThanOneSecondaryInput).show();
		return;
	}
	
	// add row
	var nioTable = $("#nio_list_table");
	var row = "<tr>"
			+ "<td class='nioName'>"
			+ nioName
			+ "</td>"
			+ "<td class='nioType' value='" + nioType + "'>"
			+ NIOTYPE[nioType]
			+ "</td>"
			+ "<td class='editBtn' align='center'><a class='editBtn'></a></td>"
			+ "<td class='deleteBtn' align='center'><a class='deleteBtn'></a></td>"
			+ "</tr>";
	nioTable.append(row);

	$("#nio_list_table a.deleteBtn").unbind("click");
	$("#nio_list_table a.deleteBtn").click(NioSetting.prototype.del);
	$("#nio_list_table a.editBtn").unbind("click");
	$("#nio_list_table a.editBtn").click(NioSetting.prototype.edit);
};

NioSetting.prototype.del = function() {
	$(this).parent().parent().remove();
};

NioSetting.prototype.edit = function() {
	var row = $(this).parent().parent();
	
	var dialog = new window.top.TemplateDialog($("#dialog_edit_nio"));
	var nameCtrl = dialog.find("input[name='editNioName']");
	var typeCtrl = dialog.find("select[name='editNioType']");

	var index = row.index(); 
	var oldname = row.children('td').eq(0).text();
	var oldtype = row.children('td').eq(1).attr('value');
	
	nameCtrl.val(oldname);
	var count = typeCtrl.find("option").length;
	for ( var i = 0; i < count; i++) {
		if (typeCtrl.get(0).options[i].value == oldtype) {
			typeCtrl.get(0).options[i].selected = true;
			break;
		}
	}

	dialog.click("#btnOk", function() {
		var name = nameCtrl.val();
		var type = typeCtrl.val();
		
		NioSetting.prototype.checkNioList();
		if (oldtype == PRIMARY_INPUT_TYPE)
			cnPrimaryInput--;
		if (oldtype == SECONDARY_INPUT_TYPE)
			cnSecondaryInput--;
		if (oldtype == PRIMARY_OUTPUT_TYPE)
			cnPrimaryOutput--;
		if (oldtype == SECONDARY_OUTPUT_TYPE)
			cnSecondaryOutput--;
		
		if (cnPrimaryInput > 0 && type == PRIMARY_INPUT_TYPE) {
			dialog.find("td[name='editNioTypeErr']").text(msgMoreThanOnePrimaryInput);
			return;
		}
		
		if (cnSecondaryInput > 0 && type == SECONDARY_INPUT_TYPE) {
			dialog.find("td[name='editNioTypeErr']").text(msgMoreThanOneSecondaryInput);
			return;
		}
		row.children('td').eq(0).text(name);
		row.children('td').eq(1).attr("value", type);
		row.children('td').eq(1).text(NIOTYPE[type]);
		this.dialog.close();
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(450, 300);
	dialog.show();
	nameCtrl.focus();
};

NioSetting.prototype.apply = function() {
	// check
	$("#errorAdd").hide();
	NioSetting.prototype.checkNioList();
	if (cnPrimaryInput == 0) {
		$("#errorAdd").text(msgNoPrimaryInput).show();
		return;
	}
	if (cnPrimaryOutput + cnSecondaryOutput == 0) {
		$("#errorAdd").text(msgNoOutput).show();
		return;
	}
	
	// save
	var params = {};
	$("#nio_list_table tr").each(function(i) {
		if (i != 0) { // ignore title
			var j = i - 1;
			params["nios[" + j + "].id"] = $(this).find('input[name="nioId"]').val();
			params["nios[" + j + "].name"] = $(this).children('td').eq(0).text();
			params["nios[" + j + "].type"] = $(this).children('td').eq(1).attr('value');
		}
	});
	
	var loading = createLoading(network.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("saveNio.action", params, function(data) {
		loading.close();
		if (data.actionErrors && data.actionErrors.length > 0) {
			showErrorMessage(isNullOrEmpty(data.actionErrors[0]) ? msgSaveFailed : data.actionErrors[0]);
		} else if (data.fieldErrors) {
			var strFieldErrors = "";
			for ( var p in data.fieldErrors) {
				strFieldErrors += data.fieldErrors[p];
			}
			showErrorMessage(strFieldErrors);
		}
		else {
			showMessage(msgTitle, msgSaveSuccess);
		}
		
		$.post("getNio.action", null, function(data) {
			$("#main").html(data);
		});
	});	
};
