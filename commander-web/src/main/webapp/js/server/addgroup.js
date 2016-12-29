/**
 * Server Object
 * 
 * @param {String}  id - the server id
 * @param {String}  name - the server name
 * @param {Integer} type - the server type
 * @param {String}  ip - the server ip
 * @param {Integer} port - the server port
 * @param {Boolean} added - indicate the server is already added or not
 */
function Server(id, name, type, ip, port, added) {
	this.id = id;
	this.type = type;
	this.ip = ip;
	this.port = port;
	this.added = (added ? added : false);
	this.name = name;
	this.backup = false;
	this.selected = false;
}

/**
 * Server Group Object.
 */
function ServerGroup() {
	/**
	 * private variables.
	 */
	var $step = 0;
	var $backup = false;
	var $servers = new Array();
	var $saveGroupForm = null;
	var $summaryList = null;
	var $serverList = null;
	var $editMode = false;
	var $isLiveGroup = false;
	var $workerRequired = true;

	/**
	 * Update button state.
	 */
	function updateButtonState() {
		if ($step == 1) {
			var groupName = $("#step_name input").val();
			var groupType = $("#step_name select option:selected").val();
			var errorText = "";
			var disabled = false;
			if (groupName.length <= 0) {
				disabled = true;
			} else if (groupName.length > MAX_NAME_LEN) {
				errorText = $("#nameTooLongText").text();
				disabled = true;
			}
			$("#groupNameError").text(errorText);
			$("#btnNextStep").attr("disabled", disabled || groupType == "");
		} else if ($step == 2) {
			var selected = false;
			$.each($servers, function(index, server) {
				if (server.selected) {
					if (server.name != null && server.name.length > MAX_NAME_LEN) {
						selected = false;
						return false;
					} else {
						selected = true;
					}
				}
			});
			$("#btnNextStep").attr("disabled", !selected);
		} else if ($step == 3) {
			var selected = false;
			$.each($servers, function(index, server) {
				if (server.backup && server.selected) {
					if (server.name != null && server.name.length > MAX_NAME_LEN) {
						selected = false;
						return false;
					} else {
						selected = true;
					}
				}
			});
			$("#btnNextStep").attr("disabled", !selected);
		}
	}

	/**
	 * Change the text .
	 */
	function updateStepSelectTitle() {
		var title = $($backup ? "#backupTextTemplate" : "#workTextTemplate").html();
		title = title.replace(/\$count\$/g, $servers.length);
		$("#serverListTitle").html(title);
	};

	/**
	 * Set the node is selected or not.
	 */
	function setNodeSelected(node, selected) {
		node.server.selected = selected;
		node.server.backup = $backup && selected;
		if (selected) {
			$(node).find("input[type='text']").show();
		} else {
			$(node).find("input[type='text']").hide();
		}
		if ($backup) {
			setNodeIcon(node, selected ? "backupIcon" : "normalIcon");
		}
	}

	/**
	 * Set the radio name of the node.
	 */
	function setNodeRadioName(node, name) {
		$(node).find("input[type=radio]").attr("name", name);
	}

	/**
	 * Set the server icon of the node.
	 */
	function setNodeIcon(node, icon) {
		$(node).find("#select_server_icon").attr("class", icon);
	}

	/**
	 * Reset node.
	 */
	function resetNode(node) {
		node.server.backup = false;
		node.server.selected = false;
		$(node).find("input[type=checkbox]").attr("checked", false);
		$(node).find("input[type=radio]").attr("checked", false);
		$(node).find("input[type=text]").hide();
		$(node).find("#select_server_icon").attr("class", "normalIcon");
	}

	/**
	 * Change the specified node to read only or not.
	 */
	function setNodeReadOnly(node, readOnly) {
		$(node).find("input[type=radio]").attr("disabled", readOnly);
		$(node).find("input[type=checkbox]").attr("disabled", readOnly);
		$(node).find("#select_server_icon").attr("class", readOnly ? "normalReadOnlyIcon" : "normalIcon");
		$(node).find("input[type=text]").attr("readOnly", readOnly);
		if (readOnly) {
			$(node).find("#select_server_ip").addClass("readOnlyText");
			$(node).find("input[type=text]").addClass("readOnlyText");
		} else {
			$(node).find("#select_server_ip").removeClass("readOnlyText");
			$(node).find("input[type=text]").removeClass("readOnlyText");
		}
	}

	/**
	 * Set select backup device or not.
	 */
	function setBackup(backup) {
		// switch backup mode.
		$backup = backup;

		if ($backup) {
			// only not selected nodes are displayed.
			$.each($($serverList).children(), function(index, node) {
				// skip added node
				if (node.server.added)
					return;
				if (!node.server.selected || node.server.backup) {
					setNodeRadioName(node, "group2");
				} else {
					setNodeReadOnly(node, true);
				}
			});
		} else {
			// all nodes are displayed, the backup nodes will be reset.
			$.each($($serverList).children(), function(index, node) {
				// skip added node
				if (node.server.added)
					return;
				// reset the node
				if (node.server.backup) {
					resetNode(node);
				} else {
					setNodeReadOnly(node, false);
				}
				setNodeRadioName(node, "group1");
			});
		}

		// update the text.
		updateStepSelectTitle();
	};

	/**
	 * Display summary and create hide fields for submit.
	 */
	function summary() {
		// get the template string.
		var template = $("#summaryTemplate").html();
		var template2 = $("#submitFieldsTemplate").html();

		// set group name
		var groupName = $("input[name='group.name']").val();
		$('#summaryGroupName').html(groupName.replaceHTML());
		$('#summaryGroupName').attr("title", groupName);

		// clear the summary first.
		$($summaryList).html("");
		$("#hideFormFields").html("");

		// add selected servers to the summary list in UI.
		var index = 0;
		$.each($servers, function() {
			// only display selected servers.
			if (!this.selected) return;

			// add to summary list.
			var isUnnamed = (this.name == null || this.name == "");
			var serverName = isUnnamed ? "" : this.name.replaceHTML();
			var newRow = document.createElement("div");
			var childHTML = template.replace(/\$name\$/g, serverName);
			childHTML = childHTML.replace(/\$ip\$/g, this.ip);
			$(newRow).html(childHTML);
			if (isUnnamed) $(newRow).find("#unnamed").show();
			if (this.backup) $(newRow).find("#backup").show();
			var icon = this.backup ? "backupIcon" : "normalIcon";
			$(newRow).find("#summary_server_icon").addClass(icon);
			$($summaryList).append(newRow);

			// add fields to submit form.
			var hasQuot = template2.indexOf("\"") != -1;
			var isBackup = this.backup ? "true" : "false";
			var fields = template2.replace(/\$index\$/g, index++);
			fields = fields.replace(/\$id\$/g, hasQuot ? this.id : "\"" + this.id + "\"");
			fields = fields.replace(/\$type\$/g, hasQuot ? this.type : "\"" + this.type + "\"");
			fields = fields.replace(/\$ip\$/g, hasQuot ? this.ip : "\"" + this.ip + "\"");
			fields = fields.replace(/\$port\$/g, hasQuot ? this.port : "\"" + this.port + "\"");
			fields = fields.replace(/\$name\$/g, hasQuot ? serverName : "\"" + serverName + "\"");
			fields = fields.replace(/\$backup\$/g, hasQuot ? isBackup : "\"" + isBackup + "\"");
			$("#hideFormFields").append(fields);
		});
	};

	/**
	 * Go to step.
	 * 
	 * @param {int} stepIndex
	 */
	function gotoStep(stepIndex) {
		$step = stepIndex;
		switch(stepIndex) {
		case 1:
			$("#step_summary").hide();
			$("#step_select").hide();
			$("#step_name").show();
			$("#btnPrevStep").hide();
			$("#btnSkip").hide();
			$("#btnNextStep").show();
			$("#btnDone").hide();
			break;
		case 2:
			$("#step_name").hide();
			$("#step_summary").hide();
			$("#step_select").show();
			if ($editMode) {
				$("#btnPrevStep").hide();
				if ($workerRequired) {
					$("#btnSkip").hide();
				} else {
					$("#btnSkip").show();
				}
			} else {
				$("#btnPrevStep").show();
				$("#btnSkip").hide();
			}
			$("#btnNextStep").show();
			$("#btnDone").hide();
			setBackup(false);
			break;
		case 3:
			$("#step_name").hide();
			$("#step_summary").hide();
			$("#step_select").show();
			$("#btnPrevStep").show();
			if ($editMode && $isLiveGroup && !$workerRequired) {
				$("#btnPrevStep").hide();
			} else {
				$("#btnPrevStep").show();
			}
			$("#btnSkip").show();
			$("#btnNextStep").show();
			$("#btnDone").hide();
			setBackup(true);
			break;
		case 4:
			$("#step_name").hide();
			$("#step_select").hide();
			$("#step_summary").show();
			$("#btnPrevStep").show();
			$("#btnSkip").hide();
			$("#btnNextStep").hide();
			$("#btnDone").show();
			summary();
			break;
		}
		updateButtonState();
	};

	/**
	 * Goto previous step.
	 */
	function previous() {
		if ($step > 1) {
			$step--;
			gotoStep($step);
		}
	};

	/**
	 * Goto next step.
	 */
	function next() {
		if ($step < 4) {
			$step++;
			gotoStep($step);
		}
	};

	/**
	 * Submit form.
	 */
	function submit() {
		$saveGroupForm.submit();
	};

	/**
	 * Skip to next.
	 */
	function skip() {
		// clear the selection of current page.
		$.each($($serverList).children(), function(index, node) {
			if (node.server.added)
				return;
			if ($backup == node.server.backup) {
				resetNode(node);
			}
		});

		// go to next step.
		next();
	}

	/**
	 * Initialize this object.
	 */
	this.init = function(editMode) {
		$editMode = editMode;
		$saveGroupForm = $("#saveGroupForm")[0];
		$summaryList = $("#summaryList")[0];
		$serverList = $("#serverList")[0];
		$isLiveGroup = ($("#step_name select").val() == 1);

		// Focus window when iframe document is ready, otherwise call jQuery
		// focus/blur may cause exception in IE9.
		window.focus();

		if ($editMode) {
			if ($isLiveGroup) {
				$workerRequired = $("#liveServerSize").val() == 0;
				gotoStep($workerRequired ? 2 : 3);
			} else {
				$workerRequired = false;
				gotoStep(2);
			}
		} else {
			$workerRequired = true;
			gotoStep(1);
		}

		if ($editMode == false) {
			// focus on input text box.
			$("#step_name input").focus();
		}

		$("#step_name input").change(function() {
			updateButtonState();
		});
		$("#step_name input").keyup(function() {
			updateButtonState();
		});
		$("#step_name select").change(function() {
			updateButtonState();
			// all nodes are reset and displayed.
			$.each($($serverList).children(), function(index, node) {
				if (!node.server.added) {
					resetNode(node);
				}
				setNodeRadioName(node, "group1");
			});
			// display checkbox or radio according to the group type.
			var groupType = $(this).val();
			if (groupType == 0) {
				$("#serverList input[type='radio']").hide();
				$("#serverList input[type='checkbox']").show();
			} else if (groupType == 1){
				$("#serverList input[type='checkbox']").hide();
				$("#serverList input[type='radio']").show();
			}
		});

		$("#btnPrevStep").click(previous);
		$("#btnSkip").click(skip);
		$("#btnNextStep").click(next);
		$("#btnDone").click(submit);
	};

	/**
	 * Add server when new server is found.
	 * 
	 * @param {Server} server - the serve to be added
	 */
	this.add = function(server) {
		// save in servers array.
		var index = $servers.length;
		$servers[index] = server;

		// add to server list in UI
		var rootNode = document.createElement("div");
		var template = $("#selectTemplate").html();
		template = template.replace(/\$index\$/g, index);
		template = template.replace(/\$id\$/g, server.id);
		template = template.replace(/\$ip\$/g, server.ip);
		$(rootNode).html(template);
		$($serverList).append(rootNode);

		// find the input elements.
		var textNode = $(rootNode).find("input[type='text']")[0];
		$(textNode).hide();
		var checkbox = $(rootNode).find("input[type='checkbox']")[0];
		checkbox.checked = false;
		var radiobox = $(rootNode).find("input[type='radio']")[0];
		radiobox.checked = false;
		rootNode.server = server;
		textNode.rootNode = rootNode;
		checkbox.rootNode = rootNode;
		radiobox.rootNode = rootNode;

		// if the server is added, change the UX.
		if (server.added) {
			$(textNode).val(server.name);
			$(textNode).show();
		}
		setNodeReadOnly(rootNode, server.added);

		var groupType = $("#step_name select").val();
		if (groupType == 0) {
			$(radiobox).hide();
		} else if (groupType == 1){
			$(checkbox).hide();
		}

		// change the server name
		var onTextChange = function() {
			var serverName = this.value.trim();
			this.rootNode.server.name = serverName;
			var errorText = "";
			if (serverName.length > MAX_NAME_LEN)
				errorText = $("#nameTooLongText").text();
			$(rootNode).find("#serverNameError").text(errorText);
			updateButtonState();
		};
		$(textNode).change(onTextChange);
		$(textNode).keyup(onTextChange);

		// indicate the server is selected or not.
		$(checkbox).change(function() {
			setNodeSelected(this.rootNode, this.checked);
			updateButtonState();
			$(this.rootNode).find("input[type='text']").focus();
		});

		// indicate the server is selected or not.
		$(radiobox).change(function() {
			var thizName = $(this).attr("name");
			$.each($($serverList).find("input[type='radio']"), function(index, radio) {
				var server = radio.rootNode.server;
				if (thizName == $(radio).attr("name") && !server.added) {
					setNodeSelected(radio.rootNode, radio.checked);
				}
			});
			updateButtonState();
			$(this.rootNode).find("input[type='text']").focus();
		});

		// update the text.
		updateStepSelectTitle();
	};

}

