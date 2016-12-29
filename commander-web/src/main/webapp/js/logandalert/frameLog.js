function Log(category) {

	function showDeleteConfirmDialog() {
		try{
			var dialog = new window.TemplateDialog($("#dialog_delete"));
			dialog.click("#btnOk", function() {
				this.dialog.close();
				batchDelete();
			});
			dialog.click("#btnCancel", function() {
				this.dialog.close();
			});
			dialog.setSize(436, 300);
			dialog.show();
		}catch(e){};
	}
	
	function showAlertConfigDialog(){
		var dialog = new window.TemplateDialog($("#dialog_setting"));

		dialog.click("#btnSave", function() {
			saveAlertSetting(dialog);
		});
		dialog.click("#btnCancel", function() {
			this.dialog.close();
		});		
		
		top.$.get('frameLoadAlertSetting', function(data){
			var height = 264;
			if(data != null){
				var deleteBeforyDays = data.deleteBeforeDays;
				dialog.find("#deleteBeforeDays").val(deleteBeforyDays);

				var emailAlertEnabled = data.emailAlertEnabled;
				if (emailAlertEnabled == true) {
					if (data.emailSetting != null) {
						var email = data.emailSetting;
						var host = email.smtpHost || "";
						var port = email.smtpPort || "25";
						var user = email.smtpUser || "";
						var password = email.smtpPassword || "";
						//console.log(data);
						var recv = data.recv;
						dialog.find("#host").val(host);
						dialog.find("#port").val(port);
						dialog.find("#user").val(user);
						dialog.find("#password").val(password);
						dialog.find("#recv").val(recv);
					}
					
					dialog.find("#btnSendTestMail").click(function() {
						sendTestEmail(dialog);
					});
					height = 500;
				}
				else {
					dialog.find("#alert_mail_setting").remove();
					height = 264;
				}
			}
			dialog.find("#error_action").text("");
			dialog.find("#error_deleteBeforeDays").text("");
			dialog.find("#error_smtpPort").text("");

			dialog.setSize(528, height);
			dialog.show();
		});
	}

	function batchDelete() {
		var action = "";
		if (category == "log") {
			action = "frameDeleteLog.action";
		} else {
			action = "frameDeleteAlert.action";
		}
		$("#logActionForm").attr("action", action);
		$("#logActionForm").submit();
	}

	function batchExport() {
		var action = "";
		if (category == "log") {
			action = "frameExportLog.action";
		} else {
			action = "frameExportAlert.action";
		}
		$("#logActionForm").attr("action", action);
		$("#logActionForm").submit();
	}
	
	function query(){
		$("#logForm").submit();
	}
	
	function saveAlertSetting(dialog){
		var p = dialog.find("#settingForm").serialize();
		$.post('frameSaveAlertSetting', p, function(data){
			if (data.actionErrors && data.actionErrors.length > 0) {
				dialog.find("#error_action").text(isNullOrEmpty(data.actionErrors[0]) ? msgSaveFailed : data.actionErrors[0]);
			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					if (p == "deleteBeforeDays"){
						dialog.find("#error_deleteBeforeDays").text(data.fieldErrors[p]);
					}else if (p == "emailSetting.smtpPort"){
						dialog.find("#error_smtpPort").text(data.fieldErrors[p]);
					}
				}				
			}
			else {
				dialog.close();
			}
		});
	}

	function sendTestEmail(dialog){
		dialog.find("#error_action").text("");
		dialog.find("#error_deleteBeforeDays").text("");
		dialog.find("#error_smtpPort").text("");

		var p = dialog.find("#settingForm").serialize();
		$.post('sendTestEmail', p, function(data){
			if (data.actionErrors && data.actionErrors.length > 0) {
				dialog.find("#error_action").text(isNullOrEmpty(data.actionErrors[0]) ? msgSaveFailed : data.actionErrors[0]);
			} else if (data.fieldErrors) {
				for ( var p in data.fieldErrors) {
					if (p == "deleteBeforeDays"){
						dialog.find("#error_deleteBeforeDays").text(data.fieldErrors[p]);
					}else if (p == "emailSetting.smtpPort"){
						dialog.find("#error_smtpPort").text(data.fieldErrors[p]);
					}
				}				
			}
		});
	}

	this.init = function() {
		//choose other time duration
		$("select[name='timeDuration']").change(function(){
			var option = $(this).val();
			if (option == '3') {
				$("div#manual").show();
			} else {
				$("div#manual").hide();
			}
		});

		// delete logs
		$("#btnDelete").click(showDeleteConfirmDialog);

		// export log
		$("#btnExport").click(batchExport);	
		
		$("#btnQuery").click(query);
		
		$("#sss").click(showAlertConfigDialog);
		
		$.pagination({"form":"logForm"});
	};
}
