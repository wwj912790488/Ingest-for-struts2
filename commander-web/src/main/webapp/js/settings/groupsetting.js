function GroupSetting(groupId) {
	this.tabPage = null;
	this.groupId = groupId;
}

GroupSetting.prototype.init = function(){
	$this = this;
	$("#firstNavigationPanel .firstClassNav").click(function(){
		$this.tabPage = $(this);
		$("#group_setting_content").html("");
		$(this).siblings(".firstClassNavActive").removeClass("firstClassNavActive");
		$(this).addClass("firstClassNavActive");
		var url = $(this).find(".tab_url").text() + "?group.id=" + $this.groupId;
		var name = $(this).find(".tab_name").text();
		var loading = createLoading(name, getText("common.page.loading"));
		$.ajaxSetup({
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	loading.close();
                $("#group_setting_content").html(XMLHttpRequest.responseText);
                $this.initPage();
                return false;
            }
        });
		loading.show();
		top.$.get(url, function(data) {
			
			$("#group_setting_content").html(data);
			loading.close();
			$this.initPage();
		});
	});
	$("#firstNavigationPanel .firstClassNav:first").click();
};

GroupSetting.prototype.currentPageName = function() {
	if (this.tabPage != null)
		return this.tabPage.find(".tab_name").text();
	return "";
};

GroupSetting.prototype.reload = function() {
	if (this.tabPage != null)
		this.tabPage.click();
};

GroupSetting.prototype.initPage = function() {
	$("#group_setting_content .group_title .left").click(function(){
		$(this).parent().nextUntil(".group_title").filter(".group_detail").toggle();
		$(this).parent().find(".group_icon").toggleClass("icon_detail_open icon_detail_close");
	});
};

GroupSetting.prototype.showExecuteResult = function(data) {
	if (data.result.success) {
		if (data.results.length > 0) {
			var message = "<table style='width: 100%; text-align: center; margin-top: 10px;'>";
			var count = 0;
			for (var i=0; i<data.results.length; i++) {
				if (data.results[i].data) {
					message += "<tr><td>";
					message += ++count;
					message += "</td><td>";
					message += data.results[i].server.name;
					message += "(" + data.results[i].server.ip + ")";
					message += "</td><td>";
					if (data.results[i].data.success)
						message += getText("common.execute.success");
					else
						message += data.results[i].data.message;
					message += "</td></tr>";
				}
			}
			message += "</table>";
			var dialog = createTemplateDialog($("#execute_result_template"));
			dialog.find("#dialog_title").text(this.currentPageName());
			dialog.find("#dialog_content").html(message);
			dialog.find(".message_dialog_msg").css("padding", "0px");
			dialog.click("#btnResultOk", function() {
				this.dialog.close();
				groupSetting.reload();
			});
			var height = 120 + 18 * count;
			if (height < 200) height = 200;
			if (height > 480) height = 480;
			dialog.setSize(400, height);
			dialog.show();
		}
	} else {
		showErrorMessage(data.result.message);
	}
};

