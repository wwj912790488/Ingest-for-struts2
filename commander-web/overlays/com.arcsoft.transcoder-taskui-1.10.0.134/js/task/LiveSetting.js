var LS_TIMER_INTERVAL_DEFAULT = 1000;
var _ls_runcxt_StatusUpdate = null;

function LS_Init() {
	_ls_runcxt_StatusUpdate = LSTimer_UpdateStatus(300, null, -1, LS_TIMER_INTERVAL_DEFAULT);
}

function LSTimer_UpdateStatus(initTimeout, arrId, loopCount, timeout) {
	var runCxt = new Object();
	runCxt.initTimeout = initTimeout;
	runCxt.timeout = timeout == undefined ? initTimeout : timeout;
	runCxt.currTimeout = initTimeout;
	runCxt.arrId = arrId == undefined ? null : arrId;
	runCxt.loopCount = loopCount == undefined ? 1 : loopCount;
	runCxt.timer = null;
	runCxt.tasklist = _GetTaskDIVArray();
	runCxt.curtask = 0;

	runCxt.updateTask = function() {
		uiUpdateTaskLiveStateProc(runCxt);
		runCxt.currTimeout = runCxt.timeout;
		if (runCxt.loopCount > 0)
			runCxt.loopCount--;
		runCxt.timer = null;
	};

	runCxt.run = function() {
		if (runCxt.loopCount == -1 || runCxt.loopCount > 0)
			runCxt.timer = window.setTimeout(runCxt.updateTask, runCxt.currTimeout);
	};

	runCxt.run();
	return runCxt;
}

function uiUpdateTaskLiveStateProc(runCxt) {
	if (runCxt.curtask >= runCxt.tasklist.length)
		runCxt.curtask = 0;

	for (;;) {
		if (runCxt.curtask >= runCxt.tasklist.length)
			break;

		var taskDIV = runCxt.tasklist[runCxt.curtask];
		if (taskDIV != undefined && taskDIV != null && taskDIV.getAttribute("running") == '1') {
			var params = {};
			params["taskId"] = _GetTaskId(taskDIV);
			var motionIconlist =_GetMotionIconDIVArray(taskDIV);
			for (var i = 0; i < motionIconlist.length; i++) {
				params["motionIcons[" + _GetMotionIconId(motionIconlist[i]) + "]"] = false;
			}	
			var dynamicTextlist =_GetDynamicTextDIVArray(taskDIV);
			for (var j = 0; j < dynamicTextlist.length; j++) {
				params["dynamicTexts[" + _GetDynamicTextId(dynamicTextlist[j]) + "]"] = false;
			}	
			$.post("getTaskLiveState", params, function(data) {
				uiUpdateTaskLiveState(taskDIV, data);
		
				if (runCxt != undefined && runCxt != null) {
					runCxt.curtask++;
					runCxt.run();
				}
			});
			break;
		}
		runCxt.curtask++;
	}
}

function uiUpdateTaskLiveState(taskDIV, data) {
	var taskId		= _GetTaskId(taskDIV);	
	var $xmlData 	= $(data).find("liveState[id="+taskId+"]");	
	
	if($xmlData.length == 0) {
		return;
	}

	var $motionIcons = $(taskDIV).find(".MotionIcon");
	$motionIcons.each(function(index, element) {
		var id = $(element).attr("id");
		var state = $xmlData.find('motionIcon[id="'+id+'"]').text();
		if (state != undefined && state != null) {
			var stateElm = $(element).find(".MotionIconOn, .MotionIconOff");
			if (stateElm != undefined && stateElm != null) {
				$(stateElm).removeClass();
				if (state == "true")
					$(stateElm).addClass("MotionIconOn");
				else
					$(stateElm).addClass("MotionIconOff");
			}
		}
	});

	var $dynamicTexts = $(taskDIV).find(".DyText");
	$dynamicTexts.each(function(index, element) {
		var id = $(element).attr("id");
		var state = $xmlData.find('dynamicText[id="'+id+'"]').text();
		if (state != undefined && state != null) {
			var stateElm = $(element).find(".MotionIconOn, .MotionIconOff");
			if (stateElm != undefined && stateElm != null) {
				$(stateElm).removeClass();
				if (state == "true")
					$(stateElm).addClass("MotionIconOn");
				else
					$(stateElm).addClass("MotionIconOff");
			}
		}
	});
	
	var $paddingImage = $(taskDIV).find(".paddingImage");
	if ($paddingImage != undefined && $paddingImage != null) {
		var state = $xmlData.find('signal').text();
		if (state != undefined && state != null) {
			var stateElm = $($paddingImage).find(".MotionIconOn, .MotionIconOff");
			if (stateElm != undefined && stateElm != null) {
				$(stateElm).removeClass();
				if (state == "2")
					$(stateElm).addClass("MotionIconOn");
				else
					$(stateElm).addClass("MotionIconOff");
			}
		}
	}
	
}

function _GetTaskId(taskDIV) {
	return taskDIV.getAttribute("id");
}

function _GetTaskDIVArray() {
	var tasklistDIV = document.getElementById("TaskListContainer");
	var tasklist = new Array();
	uFindNodeArray(tasklist, tasklistDIV, function(n) {
		return uIsContainCssClass(n, 'TaskEntry');
	}, true);
	return tasklist;
}

function _GetMotionIconId(motionIconDIV) {
	return motionIconDIV.getAttribute("id");
}

function _GetMotionIconDIVArray(taskDIV) {
	var motionIconlist = new Array();
	uFindNodeArray(motionIconlist, taskDIV, function(n) {
		return uIsContainCssClass(n, 'MotionIcon');
	}, true);
	return motionIconlist;
}

function _GetDynamicTextId(dynamicTextDIV) {
	return dynamicTextDIV.getAttribute("id");
}

function _GetDynamicTextDIVArray(taskDIV) {
	var dynamicTextlist = new Array();
	uFindNodeArray(dynamicTextlist, taskDIV, function(n) {
		return uIsContainCssClass(n, 'DyText');
	}, true);
	return dynamicTextlist;
}

function saveMotionIcon(domTaskEntry) {
	var taskId = $(domTaskEntry).attr("id");
	var motionIcons = [];
	$(".MotionIcon", domTaskEntry).each(function() {
		var o = {};
		o.markId = this.id;
		var $check = $("input[name='motionIconId']", this);
		if($check.get(0).checked) {
			o.runtimeVisible = "1";
		}
		else {
			o.runtimeVisible = "0";
		}
		motionIcons.push(o);
	});
	
	if(motionIcons.length == 0) return;
	
	var xml = new XMLWriter();
	xml.BeginNode("motionicons");
	
	xml.Node("taskid", taskId);
	
	for(var i = 0; i < motionIcons.length; i++) {
		xml.BeginNode("motionicon");
		
		xml.Node("markid", motionIcons[i].markId);
		xml.Node("runtimevisible", motionIcons[i].runtimeVisible);
		
		xml.EndNode();
	}
	
	xml.EndNode();
	xml.Close();
	
	var url = "api/motion_icon_visible";
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
    xmlhttp.send(xml.ToString());
}

function LS_SaveMotionIcon(){
	$(".TaskEntry").each(function() {
		saveMotionIcon(this);
	});
}


function saveDynamicText(domTaskEntry) {
	var taskId = $(domTaskEntry).attr("id");
	var dynamicTexts = [];
	$(".DyText", domTaskEntry).each(function() {
		var o = {};
		o.markId = this.id;
		var $check = $("input[name='dyTextId']", this);
		if($check.get(0).checked) {
			o.runtimeVisible = "1";
		}
		else {
			o.runtimeVisible = "0";
		}
		dynamicTexts.push(o);
	});
	
	if(dynamicTexts.length == 0) return;
	
	var xml = new XMLWriter();
	xml.BeginNode("dynamictexts");
	
	xml.Node("taskid", taskId);
	
	for(var i = 0; i < dynamicTexts.length; i++) {
		xml.BeginNode("dynamictext");
		
		xml.Node("markid", dynamicTexts[i].markId);
		xml.Node("runtimevisible", dynamicTexts[i].runtimeVisible);
		
		xml.EndNode();
	}
	
	xml.EndNode();
	xml.Close();
	
	var url = "api/dynamic_text_visible";
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
    xmlhttp.send(xml.ToString());
}

function LS_SaveDyText(){
	$(".TaskEntry").each(function() {
		saveDynamicText(this);
	});
}

function LS_SavePadding(){
	document.frm.flag.value="savePadding";
	//document.frm.submit();
	var param = $("form").serialize();
	$.post("liveSetting", param, function (result) {
		location.reload();
	});
}


function LS_DelGroup(id,name){
	if(confirm('Do you want to delete ' + name + "?")){
		location.href="deleteTaskGroup?groupId=" + id;
	}
}

function GetTaskSelected(){
	var arr = new Array();
	uFindNodeArray(arr,document.frm, function(n){
		return n.getAttribute('name')=='taskId' && n.checked;
	},true);
	var ids = new Array();
	for(var i=0;i<arr.length;i++){
		ids[ids.length]=arr[i].value;
	}
	return ids.join(',');
}

function LS_GroupRemoveTask(groupId){
	location.href="taskGroupRemoveTask?groupId=" + groupId + '&taskId=' + GetTaskSelected();
}

function LS_GroupAddTask(groupId){
	var ids = GetTaskSelected();
	if(ids=='')
		return;
	location.href="taskGroupAddTask?groupId=" + groupId + '&taskId=' + ids;
}

function LS_SelectAll(isSelectAll, name){
	var arr = new Array();
	uFindNodeArray(arr,document.frm, function(n){
		return n.getAttribute('name')==name && n.getAttribute('disabled')==null;
	},true);

	for(var i=0;i<arr.length;i++){
		arr[i].checked = isSelectAll;
	}
}

