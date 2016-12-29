var SERVER_COLOR_ROW_SELECTED = "#21A4D1";//"url('images/servergroup/focus.png')";
function ServerGroupList(){
	// clear selection status of servers and groups.
	function clearSelection() {
		$("#rootPanel").css("background","url('images/servergroup/commander bg.png')");
		$("#rootPanel").find("div").css("color", "#000000");
		$("#rootPanel").find("img.focus").hide();
		$(".server").css("background", "#ffffff");
		$(".server").find("div").css("color", "#000000");
		$(".server").find("img.focus").hide();
		$(".group").css("background", "url('images/servergroup/group bg.png')");
		$(".group").find("div").css("color", "#000000");
		$(".group").find(".groupIcon").removeClass("groupIconFocus");
		$(".group").find(".groupToggleIconFocus").hide();
		$(".group").find(".groupToggleIcon").show();
	}

	// show setting page.
	function showPage(url) {
		$("#defaultPanel").hide();
		$("#detailFrame").show();
		window.frames["detailFrame"].location.href = url;
	}

	// select group item and display group setting page.
	function selectGroup(obj, id){
		clearSelection();
		$(obj).css("background", SERVER_COLOR_ROW_SELECTED);		
		$(obj).find("div").css("color", "#ffffff");
		$(obj).find(".groupIcon").addClass("groupIconFocus");
		$(obj).find(".groupToggleIcon").hide();
		$(obj).find(".groupToggleIconFocus").show();
		showPage("groupSetting.action?group.id=" + id);
	}

	// show the server detail information
	function selectServer(obj, id, isLocal){
		clearSelection();
		$(obj).css("background", SERVER_COLOR_ROW_SELECTED);		
		$(obj).find("div").css("color", "#ffffff");
		$(obj).find("img.focus").show();
		showPage("setting.action?id=" + id + "&isLocal=" + isLocal);
	}

	// rename server or group
	function renameGroupOrServer(obj, deviceType, id){	
		var text = $(obj).val();	
		
		// validate the input
		if(text == ""){
			// if input empty
			$(obj).next().text(msgRenameRequired).show();
			setTimeout(function(){
				$(obj).focus();	
			});
			return;
		}else if(text.length > 32){
			$(obj).next().text(msgRenameTooLong).show();
			setTimeout(function(){
				$(obj).focus();	
			});
			return;
		}else if(text == $(obj).prev().text()){
			// if input the old name
			$(obj).hide();
			$(obj).prev().show();
			$(obj).parent().find(".nameComment").show();
			$(obj).next().hide();
			return;		
		} 
		
		if(deviceType == 1/* group */){
			url = 'renameGroup.action';
		}else{
			url = 'renameServer.action';
		}

		var param = {};
		param.id = id;
		param.newName = text;

		// send the request
		$.post(url, param,
			function(json){
				if(json.code == 0){
					$(obj).hide();	
					$(obj).prev().text(json.newName).show();
					$(obj).parent().find(".nameComment").show();
					$(obj).next().hide();
					$(obj).prev().attr("title", json.newName);
				}else if (json.code >= 1001 && json.code <= 1005){
					$(obj).next().text(json.description).show();
					// setTimeout(function(){
						$(obj).focus();	
					// });
				}else {
					showErrorMessage(json.description);
				}
			}
		);		
	}

	// delete group
	function deleteGroup(id){
		var url = 'deleteGroup.action';
		var param = 'id='+ id;
		var loading = createLoading(msgDeviceManage, getText("common.operation.executing"));
		loading.show();
		$.post(url, param,
			function(json){
				loading.close();
				if(json.code == 0)
					window.location.href='listServer.action';		
				else
					showErrorMessage(json.description);
			}
		);	
	}

	// delete server
	function deleteServer(id){
		var url = 'deleteServer.action';
		var param = 'id='+ id;
		var loading = createLoading(msgDeviceManage, getText("common.operation.executing"));
		loading.show();
		$.post(url, param,
			function(json){
				loading.close();
				if(json.code == 0)
					window.location.href='listServer.action';		
				else
					showErrorMessage(json.description);
			}
		);	
	}

	// add server
	function showAddServerDialog(groupId) {
		var url = "addServer.action?group.id=" + groupId;
		var dialog = new window.top.IframeDialog(url, function(result, args) {
			if (result == 0) {
				window.location.href='listServer.action';
			}
		});
		dialog.setSize(750, 450);
		dialog.show();
	}

	// add group
	//function showAddGroupDialog() {
	this.showAddGroupDialog = function(){
		var dialog = new window.top.IframeDialog("addGroup.action", function(result, argss) {
			// success
			if(result == 0){
				window.location.href='listServer.action';				
			}
		});
		dialog.setSize(750, 450);
		dialog.show();
	};

	// delete confirm
	//function showDeleteConfirmDialog(deviceType, id){
	this.showDeleteConfirmDialog = function(deviceType, id){
		var msg = "";
		var dialog = new window.top.MessageDialog(msgTitle, msg);	
		if(deviceType == 1/* group */){
			dialog.message = msgDeleteGroupConfirm;		
			dialog.addButton(msgOk, deleteGroup, id);
		}else{
			dialog.message = msgDeleteServerConfirm;		
			dialog.addButton(msgOk, deleteServer, id);
		}
		dialog.addButton(msgCancel);	
		dialog.setSize(400, 200);
		dialog.show();
	};

	this.init = function() {
		// toggle the server list
		$(".expIco").click(function(){
			$(this).parentsUntil(".groupList").children(".serverList").toggle();
			$(this).find(".groupToggleIcon").toggleClass("groupToggleIconOpen");
			$(this).find(".groupToggleIconFocus").toggleClass("groupToggleIconFocusOpen");
		});	
		if (canOperate){
			// double click to change the name
			$(".nameText").dblclick(function(){
				// to resolve conflict dblclick and click.
				var type = $(this).attr("type");
				if($(this).next().attr("id") == type){
					clearTimeout($(this).attr("timeout"));
					$(this).hide();
					$(this).parent().find(".nameComment").hide();
					var text = $(this).text();
					$(this).next().val(text).show().focus().select();
				}
				
			});	

			$("tr.group .nameText").click(function(){
				// to resolve conflict dblclick and click.
				clearTimeout($(this).attr("timeout"));
				var group = $(this).parents("tr.group");
				var groupId = group.attr("id");
				var timeout = setTimeout(function() {
					selectGroup(group[0], groupId);
				}, 300);
				$(this).attr("timeout", timeout);
			});

			$("tr.server .nameText").click(function(){
				// to resolve conflict dblclick and click.
				clearTimeout($(this).attr("timeout"));
				var server = $(this).parents("tr.server");
				var serverId = server.attr("id");
				var timeout = setTimeout(function() {
					selectServer(server[0], serverId, false);
				}, 300);
				$(this).attr("timeout", timeout);
			});

			// keyboard event
			$(".nameInput").keydown(function(e){
				var keyEvent = e||event;
				 if (keyEvent.keyCode == 13) {
					 $(this).blur();
				 }
			});
			
			$("tr.group .nameInput").blur(function(){
				var groupId = $(this).parents("tr.group").attr("id");
				renameGroupOrServer($(this)[0], 1, groupId);
			});
	
			$("tr.server .nameInput").blur(function(){
				var serverId = $(this).parents("tr.server").attr("id");
				renameGroupOrServer($(this)[0], 2, serverId);
			});
			
			// togger the delete button on group row
			$("tr.group").mouseover(function(){
				$(this).find(".deleteBtn").css("display","block");
			}).mouseout(function(){
				$(this).find(".deleteBtn").hide();
			}).click(function(event){
				var className = event.target.className;
				if (className != null && (
						className.indexOf("groupToggleIcon") != -1 ||
						className.indexOf("nameInput") != -1 ||
						className.indexOf("nameText") != -1 ||
						className.indexOf("deleteBtn") != -1))
					return;
				var id = $(this).attr("id");
				selectGroup($(this)[0], id);
			});
			
			//show the detail information
			$(".server").click(function(event){
				var className = event.target.className;
				if (className != null && (
						className.indexOf("nameInput") != -1 ||
						className.indexOf("nameText") != -1))
					return;
				var id = $(this).attr("id");
				selectServer($(this)[0], id, false);			
			});

			$("#rootPanel").click(function(){
				selectServer($(this)[0], 0, true);
			});
			
			//add server
			$(".newServer").click(function(){
				var groupId = $(this).attr("id");
				showAddServerDialog(groupId);
			});
	
			$(".nameText").each(function(index, div) {
				$(div).attr("title", $(div).text());
			});
		}
	};
}
