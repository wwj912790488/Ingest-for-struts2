function isNullOrEmpty(strVal) {
	if (strVal == null || strVal == undefined || strVal == '' || $.trim(strVal) == '') {
		return true;
	} else {
		return false;
	}
};

function MD5(str){
	if (isNullOrEmpty(str))
		return "";
	return $.md5(str);
};

function navigate(pageNumber, keySearch, data) {
	var action = "listUsers.action";
	var params = {};
	params["pager.pageIndex"] = pageNumber;
	params["keyword"] = keySearch;
	$.post(action, params, data);
};


function showUnregisterUserDialog(id) {
	var dialog = new window.top.MessageDialog(msg_warning, msg_unRegisterUser);
	dialog.addButton(msg_Ok, function() {
		var params = {};
		params["user.id"] = id;
		$.post("unRegisterUser.action", params, function(data) {
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
					$("#security_content").html(data);
				});
				dialog.close();
			}
		});
	});
	dialog.addButton(msg_Cancel);
	dialog.setSize(400, 200);
	dialog.show();
};

function showAddUserDialog() {
	var dialog = new window.top.TemplateDialog($("#dialog_add_user"));
	var loginName = dialog.find("input[name='loginName']");
	var realName = dialog.find("input[name='realName']");
	var loginPassword = dialog.find("input[name='loginPassword']");
	var remarks = dialog.find("textarea[name='remarks']");
	var error = dialog.find(".error");

	error.text("");
	dialog.click("#btnOk", function() {
		error.text("");
		var params = {};
		params["user.name"] = loginName.val();
		params["user.realName"] = realName.val();
		params["user.password"] = MD5(loginPassword.val());
		params["user.remarks"] = remarks.val();
		params["user.role.id"] = dialog.find("input[type='radio'][name='role']:checked").val();
		$.post("addUser.action", params, function(data) {
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
					$("#security_content").html(data);
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
	loginName.focus();
};

function showEditUserDialog(old_id, old_realName, old_remarks, old_role) {
	var dialog = new window.top.TemplateDialog($("#dialog_edit_user"));
	var realName = dialog.find("input[name='realName']");
	var remarks = dialog.find("textarea[name='remarks']");
	var error = dialog.find(".error");

	realName.val(old_realName);
	remarks.val(old_remarks);
	dialog.find("input[type='radio'][name='role'][value=" + old_role + "]")
			.attr("checked", "true");
	error.text("");
	dialog.click("#btnOk", function() {
		error.text("");
		var params = {};
		params["user.id"] = old_id;
		params["user.realName"] = realName.val();
		params["user.remarks"] = remarks.val();
		params["user.role.id"] = dialog.find(
				"input[type='radio'][name='role']:checked").val();
		$.post("updateUser.action", params, function(data) {
			if (data.actionErrors && data.actionErrors.length > 0) {
				dialog.find("div[name='actionError']").Message(
						isNullOrEmpty(data.actionErrors[0]) ? msg_editFail
								: data.actionErrors[0]);
			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					dialog.find("td[name='" + p + "']").text(
							data.fieldErrors[p]);
				}
			} else {
				navigate(pageNumber, keySearch, function(data) {
					$("#security_content").html(data);
				});
				dialog.close();
			}

		});
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(438, 310);
	dialog.show();
	realName.focus();
};

function showChangePasswordDialog(userId){
	var dialog = new window.top.TemplateDialog($("#dialog_change_pwd"));
	var oldPasswordText = dialog.find("input[name='old_password']");
	var newPasswordText = dialog.find("input[name='new_password']");
	var newPasswordConfirmText = dialog.find("input[name='new_password_confirm']");
	var error = dialog.find(".error");
	var isAdmin = userId != null;
	var actionName = "changePassword.action";
	//changed by admin
	if (isAdmin){
		var tr_oldPassword = dialog.find("tr[name='old_password']");
		tr_oldPassword.hide();
		actionName = "changePasswordByAdmin.action";
	}
		
	error.text("");
	dialog.click("#btnOk", function() {
		error.text("");
		var params = {};
		if (isAdmin)
			params["user.id"] = userId;
		else
			params["oldPassword"] = MD5(oldPasswordText.val());
		params["newPassword"] = MD5(newPasswordText.val());
		params["newPasswordConfirm"] = MD5(newPasswordConfirmText.val());
		$.post(actionName, params, function(data){
			if (data.actionErrors && data.actionErrors.length > 0) {
				dialog.find("div[name='actionError']").text(isNullOrEmpty(data.actionErrors[0]) ? msg_changePwdFail : data.actionErrors[0]);
			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					dialog.find("td[name='"+ p +"']").text(data.fieldErrors[p]);
				}
			} else {
				dialog.switchTemplate($("#dialog_change_pwd_success"));
				dialog.click("#btnOk", function(){
					dialog.close();
				});
			}
		});
	});
	dialog.click("#btnCancel", function() {
		this.dialog.close();
	});
	dialog.setSize(438, isAdmin ? 260: 296);
	dialog.show();
	if (isAdmin)
		newPasswordText.focus();
	else
		oldPasswordText.focus();
};

function Security() {

};

Security.prototype.init = function() {
	$(".tab_content").find(".ellipsis").each(function() {
		if (this.scrollWidth > $(this).width()) {
			$(this).attr("title", $(this).text().trim());
		}
	});
	$("#disabledText").hide();

	$(".tab_content").click(function(){
		/*state change */
		$(".cm_actionbar").attr("uid", $(this).attr("uid"));
		isEnabled=$(this).attr("isEnabled");
		if (isEnabled=="true"){
			$("#unRegister").removeAttr("style");
			$("#edit").removeAttr("style");
			$("#change_pwd").removeAttr("style");
			$("#disabledText").hide();
		}else{
			$("#unRegister").css("display", "none");
			$("#edit").css("display", "none");
			$("#change_pwd").css("display", "none");
			$("#disabledText").show();
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
			$("#security_content").html(data);
		});
	});

	/*
	 * addUser
	 */
	$("#addBtn").click(Security.prototype.addUser);
	$("#edit").click(Security.prototype.editUser);
	$("#unRegister").click(Security.prototype.unRegisterUser);
	$("#change_pwd").click(Security.prototype.changePasswordUser);
	
	$.pagination({
		"data" : {"pager.keySearch" : $("#key_search").val()},
		"success" : function(data){
			$("#security_content").empty().append(data);
		}
	});
};

Security.prototype.addUser = function() {
	showAddUserDialog();
};

Security.prototype.editUser = function() {
	var uid = $(".cm_actionbar").attr("uid");
	if (isNullOrEmpty(uid)){
		alert(msg_chooseUser);
		return;
	}
	
	var realName = $("#realName_"+uid).text().trim();
	var remarks = $("#remarks_"+uid).text().trim();
	var role_id = $("#role_"+uid).attr("role_id");
	showEditUserDialog(uid, realName, remarks, role_id);
};

Security.prototype.unRegisterUser = function() {
	var uid = $(".cm_actionbar").attr("uid");
	if (isNullOrEmpty(uid)){
		alert(msg_chooseUser);
		return;
	}
	showUnregisterUserDialog(uid);
};
Security.prototype.changePasswordUser = function() {
	var uid = $(".cm_actionbar").attr("uid");
	if (isNullOrEmpty(uid)){
		alert(msg_chooseUser);
		return;
	}
	showChangePasswordDialog(uid);
};