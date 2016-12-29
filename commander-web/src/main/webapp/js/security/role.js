function isNullOrEmpty(strVal) {
	if (strVal == null || strVal == undefined || strVal == '' || $.trim(strVal) == '') {
		return true;
	} else {
		return false;
	}
};

function navigate(pageNumber, keySearch, data) {
	var action = "listRoles.action";
	var params = {};
	params["pager.pageIndex"] = pageNumber;
	params["keyword"] = keySearch;
	$.post(action, params, data);
};


function showDeleteRoleDialog(id) {
	var dialog = new window.top.MessageDialog(msg_warning, msg_deleteConfirm);
	dialog.addButton(msg_Ok, function() {
		var params = {};
		params["role.id"] = id;
		$.post("deleteRole.action", params, function(data) {
			if (data.actionErrors && data.actionErrors.length > 0) {
				$("div[name='actionError']").text(
						isNullOrEmpty(data.actionErrors[0]) ? msg_unRegisterFail
								: data.actionErrors[0]);
			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					$("td[name='" + p + "']").text(data.fieldErrors[p]);
				}
			} else {
				navigate(pageNumber, keySearch, function(data) {
					$("#role_content").html(data);
				});
				dialog.close();
			}
		});
	});
	dialog.addButton(msg_Cancel);
	dialog.setSize(400, 200);
	dialog.show();
};

function showAddRoleDialog() {
	var dialog = new window.top.TemplateDialog($("#dialog_add_role"));
	var roleName = dialog.find("input[name='roleName']");
	var error = dialog.find(".error");
	
	dialog.click("#btnOk", function() {
		error.text("");

		var strReses = "";
		var reses = dialog.find("input[type='checkbox'][name='role']:checked");
		for (var i = 0; i < reses.length; i++){
			strReses += reses[i].value;
			if(i != reses.length -1 )
				strReses += ",";
		}

		var params = {};
		params["role.name"] = roleName.val();
		params["selectedResources"] =  strReses;
		params["role.remarks"] = dialog.find("textarea[name='remarks']").val();

		$.post("addRole.action", params, function(data) {
			if (data.actionErrors && data.actionErrors.length > 0) {
				dialog.find("div[name='actionError']").text(
						isNullOrEmpty(data.actionErrors[0]) ? msg_addFail
								: data.actionErrors[0]);

			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					dialog.find("td[name='" + p + "']").text(
							data.fieldErrors[p]);
				}
			} else {
				navigate(pageNumber, keySearch, function(data) {
					$("#role_content").html(data);
				});
				dialog.close();
			}

		});
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(438, 500);
	dialog.show();
	roleName.focus();
};

function showEditRoleDialog(old_id, old_roleName, old_reses, old_remark) {
	var dialog = new window.top.TemplateDialog($("#dialog_edit_role"));
	var roleName = dialog.find("input[name='roleName']");
	var remarks = dialog.find("textarea[name='remarks']");
	var error = dialog.find(".error");
	roleName.val(old_roleName);
	remarks.val(old_remark);

	var allRoles = dialog.find("input[type='checkbox'][name='role']");
	var reses = old_reses.split(",");
	for (var i = 0; i < allRoles.length; i++){
		for(var j = 0; j < reses.length;j++){
			if(reses[j] == allRoles[i].value){
				allRoles[i].checked=true;
				break;
			}
		}
	}
	error.text("");
	dialog.click("#btnOk", function() {
		error.text("");
		var params = {};
		var strReses = "";
		var reses = dialog.find("input[type='checkbox'][name='role']:checked");
		for (var i = 0; i < reses.length; i++){
			strReses += reses[i].value;
			if(i != reses.length -1 )
				strReses += ",";
		}
		params["role.id"] = old_id;
		params["role.name"] = roleName.val();
		params["selectedResources"] =  strReses;
		params["role.remarks"] = remarks.val();
		$.post("updateRole.action", params, function(data) {
			if (data.actionErrors && data.actionErrors.length > 0) {
				dialog.find("div[name='actionError']").text(
						isNullOrEmpty(data.actionErrors[0]) ? msg_editFail
								: data.actionErrors[0]);
			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					dialog.find("td[name='" + p + "']").text(
							data.fieldErrors[p]);
				}
			} else {
				navigate(pageNumber, keySearch, function(data) {
					$("#role_content").html(data);
				});
				dialog.close();
			}

		});
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(438, 448);
	dialog.show();
	roleName.focus();
};

function Role() {

};

Role.prototype.init = function() {
	$(".tab_content").find(".ellipsis").each(function() {
		if (this.scrollWidth > $(this).width()) {
			$(this).attr("title", $(this).text().trim());
		}
	});

	$(".tab_content").click(function(){
		/*state change */
		$(".cm_actionbar").attr("uid", $(this).attr("uid"));
		isEnabled=$(this).attr("isEnabled");
		if (isEnabled=="true"){
			$("#unRegister").removeAttr("style");
			$("#edit").removeAttr("style");
		}else{
			$("#unRegister").css("display", "none");
			$("#edit").css("display", "none");
		}
	});
	
	//init ui.
	var pos = $("label.input_search").position();
	$("#key_search").css("left", pos.left);
	
	if (!isNullOrEmpty(keySearch)) {
		$("input.input_search").val(keySearch);
		$("input.input_search").css("background-color", "#E3E3E3");
	}
	
	$("input.input_search").focusout(function() {
		if (isNullOrEmpty($(this).val())){
			$(this).css("background-color", "transparent");
		}else{
			$(this).css("background-color", "#E3E3E3");
		}
	});

	$("input.input_search").focusin(function() {
		$(this).css("background-color", "white");
	});

	$("input.input_search").keyup(function(e) {
		var keyEvent = e || event;
		if (keyEvent.keyCode == 13) {
			$(".searchBtn").trigger("click");
		}
	});

	/*
	 * List users;
	 */

	$(".searchBtn").click(function() {
		keySearch = $("input.input_search").val();
		navigate(1, keySearch, function(data) {
			$("#role_content").html(data);
		});
	});

	/*
	 * addUser
	 */
	$("#addBtn").click(Role.prototype.addRole);
	$("#edit").click(Role.prototype.editRole);
	$("#deleteRole").click(Role.prototype.deleteRole);
	
	$.pagination({
		"data" : {"pager.keySearch" : $("#key_search").val()},
		"success" : function(data){
			$("#role_content").empty().append(data);
		}
	});
};

Role.prototype.addRole= function() {
	showAddRoleDialog();
};

Role.prototype.editRole = function() {
	var uid = $(".cm_actionbar").attr("uid");
	if (isNullOrEmpty(uid)){
		alert(msg_chooseUser);
		return;
	}

	var roleName = $("#roleName_"+uid).text().trim();
	var reses = $("#roleName_"+uid).attr("reses");
	var remarks = $("#remarks_"+uid).text().trim();
	showEditRoleDialog(uid, roleName, reses, remarks);
};

Role.prototype.deleteRole= function() {
	var uid = $(".cm_actionbar").attr("uid");
	if (isNullOrEmpty(uid)){
		alert(msg_chooseUser);
		return;
	}
	showDeleteRoleDialog(uid);
};