function isNullOrEmpty(strVal) {
	if (strVal == '' || strVal == null || strVal == undefined) {
		return true;
	} else {
		return false;
	}
}

function Ipmi() {

}

Ipmi.prototype.init = function() {
	$("#resetIpmiBtn").click(Ipmi.prototype.reset);
	$("#saveIpmiBtn").click(Ipmi.prototype.save);
};

Ipmi.prototype.validate = function(form){
	var err = 0;
	var $form = form;
	$form.find("input[type=text], input[type=password]").each(function(){
		var data = $(this).val();
		var type = $(this).parents("tr").attr("id");
		var text;
		if(type =="input_ip")
			text = msgInvalidIp;
		else if(type == "input_user")
			text = msgInvalidUser;
		else
			text = msgInvalidPassword;		
		if(data=="" && type != "input_password"){			
			$(this).parents("tr").find(".alert").text(text).show();				
			err++;						
		}		
		else if(data != "" && type == "input_ip" && (!isValidIp(data))){
			$(this).parents("tr").find(".alert").text(text).show();
			err++;			
		}
	});
	if(err > 0)
		return false;
	return true;
};

Ipmi.prototype.reset = function() {
	var params = {};
	params["id"] = id;
	var loading = createLoading(fault.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("resetIpmi.action", params, function(data) {
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
			var params1 = {};
			params1["id"] = id;
			params1["isLocal"] = isLocal;
			$.post("getIpmi.action", params1, function(data) {
				$("#main").html(data);
			});
		}
	});
};

Ipmi.prototype.save = function() {
	// validate
	var $form = $(this).parents("form");		
	$form.find("span[class='alert']").each(function(){
		$(this).hide();
	});
	
	if((!Ipmi.prototype.validate($form)))
		return;
	
	// process
	var ip = $("#ipmi_ip").val();
	var user = $("#ipmi_user").val();
	var password = $("#ipmi_password").val();
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	params["ipmi.id"] = id;
	params["ipmi.ip"] = ip;
	params["ipmi.user"] = user;
	params["ipmi.password"] = password;
	var loading = createLoading(fault.currentPageName(), getText("common.operation.executing"));
	loading.show();
	$.post("saveIpmi.action", params, function(data) {
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
			var params1 = {};
			params1["id"] = id;
			params1["isLocal"] = isLocal;
			$.post("getIpmi.action", params1, function(data) {
				$("#main").html(data);
			});
		}
	});
};