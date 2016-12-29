function OnTaskExtensionPageReady() {
	var $task = $(JS_TASK);
	g_params_getMediaFileInfo["groupID"] = $task.find("#groupId").val();
	g_params_getMediaFileInfo["type"] = $task.find("#type").val();
	g_params_getMediaFileInfo["curServerID"] = $task.find("#curServerId").val();

	g_taskSupport = new TaskSupport();
	g_taskSupport.Create();

	var taskEx = new TaskExtension();
	taskEx.Init();
	g_taskSupport.AddExtension(taskEx);
};

function TaskExtension() {
	var fieldMap = [
		{key: "type",	value: "#type"},
		{key: "groupId", value : "#groupId"},
		{key: "curServerId", value : "#curServerId"}
		];

	this.prefixField = "";

	this.dom = null;

	/** method **/
	this.Init = function() {
		this.dom = $(JS_TASK).get(0);
		var $task = $(this.dom);
		var $type = $task.find("#type");
		var $groupId = $task.find("#groupId");
		var $curServerId = $task.find("#curServerId");
		var thiz = this;

		// Check the target is exist or not.
		var $taskTarget = $task.find("#serverOrGroupId");
		if ($taskTarget.length > 0) {
			$taskTarget.fakeSelect({
				height : "18",
				onSelected : function(val, pVal, text){
					var idAndType = val.split("|");
					if(idAndType[1] == "L" || idAndType[1] == "G"){
						$type.val(idAndType[1] == "L" ? 1 : 0); //live group type is 1 and others is 0
						$groupId.val(idAndType[0]);
						$curServerId.val(""); //clear curServerId when select a group
					}else{
						$type.val(0); // m+n
						$groupId.val(pVal.split("|")[0]);
						$curServerId.val(idAndType[0]);
					}

					// Update media info if device changed.
					thiz.RequestMediaInfo();
				}
			});
		}
	};

	this.RequestMediaInfo = function() {
		var $task = $(this.dom);
		var $type = $task.find("#type");
		var $groupId = $task.find("#groupId");
		var $curServerId = $task.find("#curServerId");

		// update media info.
		g_params_getMediaFileInfo["groupID"] = $groupId.val();
		g_params_getMediaFileInfo["type"] = $type.val();
		g_params_getMediaFileInfo["curServerID"] = $curServerId.val();
		g_taskSupport.GetInputSupport().UpdateProgramEditor();
		g_taskSupport.GetInputSupport().UpdatePort();

		// update backup media info.
		var alternateURIContainer = g_taskSupport.GetInputSupport().alternateURIContainer;
		if (alternateURIContainer != null) {
			var alternatives = alternateURIContainer.alternateURIArray;
			for (var i = 0; i < alternatives.length; i++)
				alternatives[i].RequestMediaInfo();
		}
	};

	this.SetPrefixField = function(prefix) {
		this.prefixField = prefix;
	};

	this.GetFullField = function() {
		return this.prefixField;
	};

	this.UpdateElementName = function() {
		var len = fieldMap.length;
		var fullField = this.GetFullField();
		for(var i = 0; i < len; i++) {
			var $sel = $(fieldMap[i].value, this.dom);
			var elName = fullField + fieldMap[i].key;
			$sel.each(function() {
				$(this).attr("name", elName);
			});
		};
		this.UpdateSubElement();
	};

	this.UpdateSubElement = function() {
		
	};

}
