//static var
var TL_TIMER_INTERVAL_DEFAULT	= 5000;
var TL_TIMER_INTERVAL_LONG		= 15000;
var TL_TIMER_THUMB_UPDATE_INTERVAL = 4000;

var _cxt = null;
var _tl_thumbTimer = null;
var tl_TaskExpand = null;
var _tl_runcxt_StatusUpdate = null;
var g_ImportDialog = null;

var TL_STATE_LOCK_TIME_OUT = 2000;
/**{id,Date}*/
var _tl_lock_state = new Array();
var _taskListTimer = null;
var _taskCount = 0;

function RefreshRnd(){
	var d = new Date();
	return ''+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDay()+'_'+d.getHours();
}

function _GetTaskId(taskDIV){
	return taskDIV.getAttribute("id");
}

function _GetTaskDIVArray()
{
	var tasklistDIV = document.getElementById("taskListContainer");
	var tasklist = new Array();
	uFindNodeArray(tasklist, tasklistDIV, function(n) {
		return uIsContainCssClass(n, 'Task');
	}, true);
	return tasklist;
}

function _GetTaskDIV(taskId){
	var tasklist = _GetTaskDIVArray();
	for(var i=0;i<tasklist.length;i++){
		if(_GetTaskId(tasklist[i])==taskId)
			return tasklist[i];
	}
	return null;
}

/**
 * get task id array
 * @param arrSel		TL_GetSelections()
 * @returns {Array}		[id1,id2,...]
 */
function _GetIdArr(arrSel){
	var arrId = new Array();
	for(var i=0;i<arrSel.length;i++){
		arrId[arrId.length]= arrSel[i].id;
	}
	return arrId;
}

function _FmtProgress(progress){
	if(progress==0||progress==101) 
		return _cxt.TaskStatusDesc.TL_STATUS_LABEL_STARTED;
	if(progress.length<3 || progress=='100') 
		return progress+'%';	
	//var t = parseInt(progress);
	//return Math.floor(t/1000) + 's';
	return uFormatTime(progress);
}

function _GetStatusDesc(status){
	if (status == _cxt.TaskStatus.PENDING) {
		return _cxt.TaskStatusDesc.TL_STATUS_LABEL_PENDING;
	} else if (status == _cxt.TaskStatus.WAITING) {
		return _cxt.TaskStatusDesc.TL_STATUS_LABEL_WAITING;
	} else if (status == _cxt.TaskStatus.RUNNING) {
		return _cxt.TaskStatusDesc.TL_STATUS_LABEL_RUNNING;
	} else if (status == _cxt.TaskStatus.CANCELLED) {
		return _cxt.TaskStatusDesc.TL_STATUS_LABEL_CANCELLED;
	} else if (status == _cxt.TaskStatus.ERROR) {
		return _cxt.TaskStatusDesc.TL_STATUS_LABEL_ERROR;
	} else if (status == _cxt.TaskStatus.COMPLETED) {
		return _cxt.TaskStatusDesc.TL_STATUS_LABEL_COMPLETED;
	} else if (status == _cxt.TaskStatus.STOPPING) {
		return _cxt.TaskStatusDesc.TL_STATUS_LABEL_STOPPING;
	}else{
		return status;
	}
}

function uiInitTaskBody(taskDIV) {
	var id = _GetTaskId(taskDIV);
	
	var taskDtlUrl = 'viewTask?taskId=' + id + '&rnd=' + Math.random();

	$.ajax({ url: taskDtlUrl, 
	 success: function(data){
		 	if(!uiIsTaskExpand(taskDIV)) return;
			var tbc = uFindFirstNodeById(taskDIV, "TaskBodyContainer");
			tbc.innerHTML=data;		
			var tasks = _GetTaskDIVArray();
			for(var i=0;i<tasks.length;i++){
				if(tasks[i]==taskDIV){
					tbc.style.backgroundColor = i%2==0 ? TABLE_ROW2_BG : "transparent";
					break;
				}
			}	
			var tb = uFindFirstNodeById(tbc,"TaskBody");
			_TB_Init(id, tb);
			uiSetTaskStatusDesc(taskDIV, uiGetTaskStatus(taskDIV));
			$(taskDIV).find('#ExpandIcon').attr('src', _cxt.iconDownWSrc);
			TL_ShowMediaInfo(taskDIV);
		},
		error:function(data){	
			if(!uiIsTaskExpand(taskDIV)) return;
			var tbc = uFindFirstNodeById(taskDIV, "TaskBodyContainer");
			tbc.innerHTML='<div>request timeout.</div>';
			$(taskDIV).find('#ExpandIcon').attr('src', _cxt.iconDownSrc);
		}
	});
}

function uiEnableActions(arrSels, actionPanel){
	if(arrSels==undefined || arrSels==null)
		arrSels = TL_GetSelections();
	
	if(actionPanel==undefined || actionPanel==null)
		actionPanel = document.getElementById('TaskActionPanel');
	
	var bStart= true;
	var bStop = true;
	var bEdit = true;
	var bView = false;
	var bCopy = true;
	var bExport = true;
	var bDel  = true;
	var bRtSetting = true;
			
	if(arrSels.length==1)
	{
		var taskDIV = arrSels[0].div;
		var status = uiGetTaskStatus(taskDIV);
		
		var canStop = (status==_cxt.TaskStatus.RUNNING 
						|| status==_cxt.TaskStatus.STOPPING
						|| status==_cxt.TaskStatus.WAITING
						|| status==_cxt.TaskStatus.DOWNLOADING);
		
		var canEdit = (status != _cxt.TaskStatus.RUNNING 
						&& status != _cxt.TaskStatus.WAITING 
						&& status != _cxt.TaskStatus.DOWNLOADING
						&& status != _cxt.TaskStatus.STOPPING);
		bView = !canEdit;
		bStart = !canStop;
		bStop = canStop;
		bEdit = canEdit;
		bDel = canEdit;
	}
	else
	{
		bEdit = false;
		bCopy = false;	
		bRtSetting = false;
	}
	
	var n;
	
	n=uFindFirstNodeById(actionPanel, 'start');if(n!=null)n.style.display = bStart ? 'inline-block' : 'none';
	n=uFindFirstNodeById(actionPanel, 'stop');if(n!=null) n.style.display = bStop ? 'inline-block' : 'none';
	n=uFindFirstNodeById(actionPanel, 'edit');if(n!=null) n.style.display = bEdit ? 'inline-block' : 'none';
	n=uFindFirstNodeById(actionPanel, 'view');if(n!=null) n.style.display = bView ? 'inline-block' : 'none';
	n=uFindFirstNodeById(actionPanel, 'copy');if(n!=null) n.style.display = bCopy ? 'inline-block' : 'none';
	n=uFindFirstNodeById(actionPanel, 'delete');if(n!=null) n.style.display = bDel ? 'inline-block' : 'none';
	n=uFindFirstNodeById(actionPanel, 'export');if(n!=null) n.style.display = bExport ? 'inline-block' : 'none';
	n=uFindFirstNodeById(actionPanel, 'rtsetting');if(n!=null) n.style.display = bRtSetting ? 'inline-block' : 'none';
}

function uiUpdateActionBar(){	
	var sels = TL_GetSelections();	
	var s;
	if(sels.length==0){
		s = '';
	}else if(sels.length==1){
		s = uFindFirstNodeById(sels[0].div, 'TaskName').value;
	}else{
		s = _cxt.msg.count_task_select.replace('%s', new String(sels.length));
	}
	var actionPanel = document.getElementById('TaskActionPanel');
	var hint = uFindFirstNodeById(actionPanel, 'ActionBarHint');
	
	uiEnableActions(sels,actionPanel);	
	
	//hint text
	$(hint).text(s);
}

function uiIsTaskExpand(taskDIV){
	return tl_TaskExpand!=null && tl_TaskExpand.get(0) == taskDIV;
}

function uiGetExpandTaskDIV(){
	return tl_TaskExpand==null? null : tl_TaskExpand.get(0);
}

/**
 * update progress and status
 * @param {Element}taskDIV
 * @param {dom}data 		xml
 */
function uiUpdateTaskProgress(taskDIV, data) {	
	var $task 		= $(taskDIV);
	var id 			= _GetTaskId(taskDIV);	
	var $xmlData 	= $(data).find( "result[id="+id+"]" );	
	
	if($xmlData.length == 0) {
		return;
	}
	
	var status = $xmlData.find('status').text();
	
	if( _tl_lock_state[id] != undefined && _tl_lock_state[id] != null ){
		var oldStatus = uiGetTaskStatus(taskDIV);
		if(oldStatus == _cxt.TaskStatus.WAITING) {
			var n = new Date();
			if(n.getTime() - _tl_lock_state[id].getTime() < TL_STATE_LOCK_TIME_OUT){
				return;
			}
			_tl_lock_state[id] = null;
		}
	}
		
	//set status
	uiSetTaskStatus(taskDIV, status);
	
	//set progress
	var $xmlInput = $xmlData.find('input');
	var progress = $xmlInput.text();
	//progress='50001';//debug
	if(progress.length != 0 && status=='RUNNING' && _cxt.showTranscodingTime == "true") {
		PB_SetProgress(uFindFirstNodeById(taskDIV, "M"), progress);
		$task.find(".TaskStatusDesc").html('<span style="color:#000000">' + _FmtProgress(progress) +'</span>');
	}
	
	var duration = $xmlInput.attr('time');
	if(duration != undefined && duration != null) {
		if(duration.length != 0) {
			$task.find(".TaskDuration").text(duration);
		}
	}
	
	var power = $xmlInput.attr('power');
	if(power != undefined && power != null) {
		if(power.length != 0 && (status=='RUNNING'||status=='COMPLETED')) {
			$task.find(".TaskPowerVal").text(power);
		}
	}
	
	//set startAt
	var startAt = $xmlData.find('startAt').text();
	if(startAt != null) {
		var st = $task.find(".TaskStartAt");
		st.attr('title', startAt);
		st.text(startAt);
		//st.text(startAt.substr(startAt.indexOf(' ')+1));
	}
	//set startAt
	var endAt = $xmlData.find('completeAt').text();
	if(endAt != null) {
		var et = $task.find(".TaskEndAt");
		et.attr('title',endAt);
		et.text(endAt.substr(endAt.indexOf(' ') +1));
	}
	// set source signal information
	var $signal = $xmlData.find('signal');
	var $switchMode = $task.find("#SignalSwitchMode");
	var $signalState = $task.find("#SignalState");
	var modeText = $switchMode.text();
	if ($signal != null && $signal.length > 0) {
		var mode = parseInt($signal.find('mode').text());
		switch(mode) {
		case 0: modeText = _cxt.SignalModes.SIGNAL_MODE_0; break;
		case 1: modeText = _cxt.SignalModes.SIGNAL_MODE_1; break;
		case 2: modeText = _cxt.SignalModes.SIGNAL_MODE_2; break;
		case 3: modeText = _cxt.SignalModes.SIGNAL_MODE_3; break;
		}
		
		$switchMode.text(modeText);
		
		var current = $signal.find('current').text();
		
		var master = _SignalStatusDesc( $signal.find('master').text() ); /*STATUS_NORMAL=1*/
		var backup = _SignalStatusDesc( $signal.find('backup').text() );
		var pad    = _SignalStatusDesc( $signal.find('pad').text()    );
		
		if (current == 0) { /*SIGNAL_MASTER=0*/
			master = "[" + master + "]";
		} else if (current == 1) { /*SIGNAL_BACKUP=1*/
			backup = "[" + backup + "]";
		} else if (current == 2) { /*SIGNAL_PAD=2*/
			pad = "[" + pad + "]";
		}
		$signalState.text(master + " " + backup + " " + pad);
	} else {
		if (modeText != null && modeText.length > 0)
			$signalState.text("- - -");
	}
	
	//set server ip
	var serverIp = $xmlData.find('server').text();
	if(serverIp != undefined && serverIp) {
		var ip = $task.find("#TaskServer");
		ip.attr('title', serverIp);
		ip.text(serverIp.length > 26 ? (serverIp.substring(0, 26) + "...") : serverIp);
	}else{
		$task.find("#TaskServer").text("");
	}

	// set task output connection state
	var $connectState = $xmlData.find('OutputState');
	var $taskOutputState = $task.find("#TaskOutputStat");
	var outputState = null;
	if ($connectState != null && $connectState.length > 0) {
		outputState = $connectState.attr('connected');
	}
	setConnectionState($taskOutputState[0], outputState);

	// set task output connection state for each groups
	var expandDIV = uiGetExpandTaskDIV();
	var groupOutputPrefix = "OutputURI_";
	if (expandDIV != null && expandDIV == taskDIV) {
		var $groups = $(expandDIV).find("[id^='" + groupOutputPrefix + "']");
		$groups.each(function(index, element) {
			// FIXME: transcoder1.7, the group index is used.
			// var groupId = $(element).attr("id").substring(groupOutputPrefix.length);
			var groupId = index;
			outputState = null;
			if ($connectState != null && $connectState.length > 0) {
				$groupState = $connectState.find("OutputGroup[id=" + groupId + "]");
				if ($groupState != null) {
					outputState = $groupState.attr("connected");
				}
			}
			setConnectionState(element, outputState);
		});
	}
}

function setConnectionState(object, state) {
	if ("0" == state) {
		uReplaceStyle(object, 'OutputConnectedNA', 'OutputConnectedNo');
		uReplaceStyle(object, 'OutputConnectedYes', 'OutputConnectedNo');
	} else if ("1" == state) {
		uReplaceStyle(object, 'OutputConnectedNA', 'OutputConnectedYes');
		uReplaceStyle(object, 'OutputConnectedNo', 'OutputConnectedYes');
	} else {
		uReplaceStyle(object, 'OutputConnectedYes', 'OutputConnectedNA');
		uReplaceStyle(object, 'OutputConnectedNo', 'OutputConnectedNA');
	}
}

function _SignalStatusDesc(t){
	return t=='1' ? 'Y' : (t=='255'||t=='-1'||t==-1 ? '-' : 'N');
}


function uiSyncTaskProgressWithStatus(){
	var $tasks = $('.Task');
	$tasks.each(function(index, taskDIV) {	
		uiRedrawTaskBg(taskDIV, index+1);
		var status=uiGetTaskStatus(taskDIV);
		PB_ReSetStatus(uFindFirstNodeById(taskDIV, "M"), status);		
	});
}


function uiSetTaskStatus(taskDIV, status){
	var h = uFindFirstNodeById(taskDIV, "TaskStatus");
	var s = h.getAttribute("value");
	
	//status value
	if(s!=status){		
		h.setAttribute("value", status);
		if(uiIsTaskSelected(taskDIV)){
			uiEnableActions();
		}
	}
	
	//status progress bar
	PB_ReSetStatus(uFindFirstNodeById(taskDIV, "M"), status);	
	
	//status desc
	uiSetTaskStatusDesc(taskDIV, status);
}

function uiSetTaskStatusDesc(taskDIV, status){	
	var $task = $(taskDIV);
	$task.find("#TaskStatusDesc").text(_GetStatusDesc(status));
	$task.find("#TaskErrorDetailDrop").css({display: (status==_cxt.TaskStatus.ERROR? 'inline-block':'none') });
}

function uiGetTaskStatus(taskDIV){
	var h = uFindFirstNodeById(taskDIV, "TaskStatus");
	return h.getAttribute("value");
}

function uiIsTaskSelected(taskDIV){
	var chk = uFindFirstNodeById(taskDIV, 'taskChk');
	return chk.checked;
}

function uiSetTaskSelected(taskDIV, isSelected){
	var row = uFindFirstNodeById(taskDIV, "TaskTitleRow");
	//highlight
	row.style.backgroundColor = isSelected ? TL_COLOR_ROW_SELECTED : "transparent";
	//invert color
	if(isSelected){
		if(!uIsContainCssClass(row, "TableItemTextSelected"))
			uReplaceStyle(row, 'TableItemText',"TableItemTextSelected");
	}else{
		uReplaceStyle(row, 'TableItemTextSelected',"TableItemText");
	}
	var img = uFindFirstNodeById(taskDIV, "ExpandIcon");
	if(isSelected){
		if(img.getAttribute("src").indexOf("arrow_white")==-1)
			img.src = img.getAttribute("src").replace("arrow","arrow_white");		
	}else{
		if(img.getAttribute("src").indexOf("arrow_white")!=-1)
			img.src = img.getAttribute("src").replace("arrow_white", "arrow");
	}
	//checkbox
	var chk = uFindFirstNodeByName(taskDIV, "input", "taskChk"); 
	if(chk!=null) 
		chk.checked = isSelected;
}

function uiRedrawTaskBg(taskDIV, index){
	uPaintTableRowBg(taskDIV,index,"TaskTitleRow");
}

function uiSetAllTaskSelected(taskListContainerDIV, isSelected){
	var taskDIVs = new Array();	
	uFindNodeArray(taskDIVs,
			taskListContainerDIV,
			function(n){
				return uIsContainCssClass(n, "Task");
			}, 
			true);	
	for(var i=0; i<taskDIVs.length; i++){
		var taskDIV = taskDIVs[i];
		uiSetTaskSelected(taskDIV,isSelected);
		if(!isSelected)
			uiRedrawTaskBg(taskDIV, i+1);
	}
}

function uiUpdateTaskStatusProc(arrId, runCxt){
	var tasks = _GetTaskDIVArray();
	var tasksLen=tasks.length;
	if(tasksLen==0)
		return;
	
	if(arrId==null){
		arrId = new Array();
		for(var i=0;i<tasksLen;i++){
			arrId[arrId.length] = _GetTaskId(tasks[i]);
		}
	}
	
	var param = "taskId=" + arrId.join(",");
	param += '&progressType=infos&rnd=' + Math.random();
	
	$.post("getTaskProgress", 
			param,
			function(data){				
				for(var i=0;i<tasksLen;i++){	
					var id=_GetTaskId(tasks[i]);
					if(!uArrContains(arrId,id))
						continue;
					//console.time('updateProgress');
					uiUpdateTaskProgress(tasks[i], data);
					//console.timeEnd('updateProgress');					
				}
				
				if(runCxt!=undefined && runCxt!=null)
					runCxt.run();				
			}
	);	
	

}

function TL_StartTaskListUpdate() {
	_taskCount = parseInt($("#TaskCount").val());
	_taskListTimer = setInterval(TL_TaskListTimer, 5000);
}

function TL_TaskListTimer() {
	var url = "getAllTaskCount";
	var param = {random: Math.random()};
	$.post(url, param, function(data) {
		var count = $(data).text();
		count = parseInt(count);
		if(isNaN(count)) return;
		if(_taskCount != count) {
			_taskCount = count;
			$("#UpdateTaskListTrigger").show();
		}
	});
}

function TLTimer_QuickUpdate(runCxt,intimeout, arrId, loopCount,timeout){
	if(runCxt.timer!=null){
		clearTimeout(runCxt.timer);
		runCxt.timer = window.setTimeout(runCxt.updateTask, intimeout*loopCount+runCxt.currTimeout);
	}
	TLTimer_UpdateStatus(intimeout, arrId, loopCount,timeout);
}

function TLTimer_UpdateStatus(initTimeout, arrId, loopCount, timeout) {	
	var runCxt = new Object();
	//runCxt.id = Math.random()*10000;
	runCxt.initTimeout 	= initTimeout;
	runCxt.timeout 		= timeout==undefined ? initTimeout : timeout;
	runCxt.currTimeout 	= initTimeout;
	runCxt.arrId 		= arrId==undefined ? null : arrId;
	runCxt.loopCount 	= loopCount==undefined ? 1 : loopCount;
	runCxt.timer 		= null;
	
	runCxt.updateTask = function(){	
		//console.log("id="+runCxt.id +" count=" + runCxt.loopCount);
		uiUpdateTaskStatusProc(runCxt.arrId,runCxt);
		runCxt.currTimeout = runCxt.timeout;
		if(runCxt.loopCount>0)
			runCxt.loopCount --;
		runCxt.timer = null;
	};
	
	runCxt.run = function(){
		if(runCxt.loopCount==-1||runCxt.loopCount>0)		
			runCxt.timer = window.setTimeout(runCxt.updateTask, runCxt.currTimeout);
	};	

	runCxt.run();
	
	return runCxt;
}

function uiPreviewProgressThumb(taskDIV) {
	var id = _GetTaskId(taskDIV);
	var img = uFindFirstNodeById(taskDIV, "TaskImg");
	if(img!=null){	
		var url = 'getTaskProgressThumb?';
		url += 'taskId=' + id + '&width=120' + '&rnd=' + Math.random();
		
		var bgImg = new Image();
		bgImg.onload=function(){		
			img.src = url;
		};
		bgImg.src = url;
	}
}

function uiThumbUpdateProc(){
	var tasks = _GetTaskDIVArray();
	for(var i=0;i<tasks.length;i++){
		if( uiGetTaskStatus(tasks[i]) == _cxt.TaskStatus.RUNNING && uiIsTaskExpand(tasks[i]) ){
			uiPreviewProgressThumb(tasks[i]);
		}
	}
	return window.setTimeout(uiThumbUpdateProc, TL_TIMER_THUMB_UPDATE_INTERVAL);
}

function _TL_TimerThumb(){
	if(_tl_thumbTimer==null)
		_tl_thumbTimer = uiThumbUpdateProc();	
}

function TL_ShowMediaInfo(taskSubElem) {
	var taskDIV = uGetContainer(taskSubElem, function(n){return uIsContainCssClass(n,'Task');});

	var curServerId = $(taskDIV).find("#taskServerId").text();
	var groupId = $(taskDIV).find("#taskGroupId").text();
	var taskType = $(taskDIV).find("#taskType").text();

	// load image
	var tStatus = $(taskDIV).find("#TaskStatus").val();
	if (tStatus != _cxt.TaskStatus.RUNNING) {
		var mediainfo = $(taskDIV).find(".media_info:first");
		var uri = mediainfo.find(".media_url").text();
		var eth = mediainfo.find(".media_eth").text();

		var params = {
				curServerID: curServerId,
				groupID: groupId,
				type: taskType,
				uri: uri,
				eth: eth,
				width: 120,
				rnd: RefreshRnd()
			};

		var taskImgBack = new Image();
		$(taskImgBack).load(function() {
			var tStatus = $(taskDIV).find("#TaskStatus").val();
			if (tStatus != _cxt.TaskStatus.RUNNING) {
				$(taskDIV).find("#TaskImg").each(function() {
					this.src = taskImgBack.src;
				});
			}
		});

		var queryString = $.param(params);
		taskImgBack.src = 'getMediaFileThumb?' + queryString;
	}

	// load media info.
	$(taskDIV).find(".media_info").each(function(index, object) {
		var uri = $(this).find(".media_url").text();
		var eth = $(this).find(".media_eth").text();
		var programId = $(this).find(".media_program_id").text();
		var audioId = $(this).find(".media_audio_id").text();
		var subtitleId = $(this).find(".media_subtitle_id").text();
		var params = {
				curServerID: curServerId,
				groupID: groupId,
				type: taskType,
				uri: uri,
				eth: eth,
				programId: programId,
				audioId: audioId,
				subtitleId: subtitleId
			};
		var thiz = this;
		$.post("getMediaFileInfoEx", params, function(data) {
			var row_names = $(thiz).next();
			row_names.find(".val").html($(data).find('#proginfo').text());
			var row_details = row_names.next();
			row_details.find(".val").html($(data).find('#minfo').text());
		});
	});
}

function TL_DeleteTasks() {
	var sels = TL_GetSelections();
	if(sels.length==0){
		alert(_cxt.msg.select_a_task);
		return;
	}
	var arrId = _GetIdArr(sels);
	var ids = arrId.join(",");
	if(!window.confirm(_cxt.msg.is_del_task + "\n" ))
		return;
	var url = 'frameDeleteTask';
	var param = 'taskId='+ ids;
	$.post(url, param,
		function(data){
			refreshPage();
		}
	);
}

function TL_EditTask(){
	var tasks = TL_GetSelections();
	if(tasks.length !=1 ){
		alert(_cxt.msg.select_a_task);
		return;
	}
	window.location.href = 'editTask?taskId=' + tasks[0].id;	
}

function TL_ViewTask(){
	var tasks = TL_GetSelections();
	if(tasks.length !=1 ){
		alert(_cxt.msg.select_a_task);
		return;
	}
	window.location.href = 'editTask?editflag=view&taskId=' + tasks[0].id;	
}

function TL_CopyTask(){
	var tasks = TL_GetSelections();
	if(tasks.length !=1 ){
		alert(_cxt.msg.select_a_task);
		return;
	}
	window.location.href = 'newTask?taskId=' + tasks[0].id;
}

function TL_RtSetting(){
	var tasks = TL_GetSelections();
	if (tasks.length != 1) {
		alert(_cxt.msg.select_a_task);
		return;
	}
	showRuntimeSetting(tasks[0].id);
}

function TL_ImportTasks() {
	if(g_ImportDialog == null) {
		g_ImportDialog = new ImportContent();
		var body = document.getElementsByTagName("body");
		g_ImportDialog.Init("importTasks", body);
		g_ImportDialog.SetTitle(_cxt.msg.import_tasks);
	}
	g_ImportDialog.Show();
}

function TL_ExportTasks() {
	var sels = TL_GetSelections();
//	if(sels.length==0){
//		alert(_cxt.msg.select_a_task);
//		return;
//	}
	if(!window.confirm(_cxt.msg.is_export_tasks + "\n" ))
		return;
	
	var url = 'exportTasks';
	if(sels.length>0){
		var arrId = _GetIdArr(sels);
		url += '?taskId='+ arrId.join(",");
	}
	window.location.href = url;
}

function TL_TranscodeInfo(){
//	var tasks = TL_GetSelections();
//	if(tasks.length !=1 ){
//		alert(_cxt.msg.select_a_task);
//		return;
//	}
//	window.open('getTranscodeStatInfo?taskId=' + tasks[0].id);
	window.location.href='taskStatReport';
}

function TL_StartTasks(priority) {
	var sels = TL_GetSelections();
	if(sels.length==0){
		alert(_cxt.msg.select_a_task);
		return;
	}
	if(priority==2){
//		if(sels.length!=1){	
//			alert(_cxt.msg.only_one_super_task_allowed);
//			return;
//		}
		if(!window.confirm(_cxt.msg.start_super_task_warning)){
			return;
		}
	}
	
	var param = 'taskId=' + _GetIdArr(sels).join(",")
					+'&cmd=start&priority=' + (priority==undefined ? 0 : priority);
	
	$.post('frameTaskCtrl', param,
			function(data){
				if(data && data.actionErrors != null && data.actionErrors.length > 0){
					var msg = "";
					for(var i = 0; i < data.actionErrors.length; i++){
						msg += (data.actionErrors[i] + "\n");
					}
					alert(msg);
				}
			}
		);	
	
	for(var i=0;i<sels.length;i++){
		var taskDIV = sels[i].div; 
		var id = _GetTaskId(taskDIV);
		//TL_StartTask($(taskDIV),priority);
		uiSetTaskStatus(taskDIV, _cxt.TaskStatus.WAITING);	
		_tl_lock_state[id] = new Date();
	}	
	
	uiEnableActions(sels);
	TLTimer_QuickUpdate(_tl_runcxt_StatusUpdate, 500, _GetIdArr(sels), 10,1500);
}

//function TL_StartTask($task,priority) {
//	var id = GetObjectId($task);
//	var url = 'taskCtrl';
//	var param = 'taskId='+id+'&cmd=start&priority=' + (priority==undefined?0:priority);
//	$.post(url, param,
//		function(data){
//		}
//	);		
//}

function TL_StopTasks() {
	var sels = TL_GetSelections();
	if(sels.length==0){
		alert(_cxt.msg.select_a_task);
		return;
	}
	if(!window.confirm(_cxt.msg.is_stop_task + "\n" ))
		return;
	for(var i=0;i<sels.length;i++){
		var taskDIV = sels[i].div; 
		TL_StopTask(taskDIV);
	}
	uiEnableActions(sels);
	TLTimer_QuickUpdate(_tl_runcxt_StatusUpdate, 1000, _GetIdArr(sels), 8,1500);
}

function TL_StopTask(task) {
	var status = uiGetTaskStatus(task);
	if(status == _cxt.TaskStatus.PENDING || status==_cxt.TaskStatus.COMPLETED || status==_cxt.TaskStatus.ERROR){		
		return;
	}
	var id = _GetTaskId(task);
	var url = 'frameTaskCtrl';
	var param = 'taskId='+id+'&cmd=stop';
	$.post(url, param,
		function(data){
			if(data && data.actionErrors != null  && data.actionErrors.length > 0){
				var msg = "";
				for(var i = 0; i < data.actionErrors.length; i++){
					msg += (data.actionErrors[i] + "\n");
				}
				// alert(msg);
			}
		}
	);	
	uiSetTaskStatus(task,_cxt.TaskStatus.STOPPING);
}


function TL_SwitchTasksSourceSignalMode(mode) {
	var sels = TL_GetSelections();
	if(sels.length==0){
		alert(_cxt.msg.select_a_task);
		return;
	}

	var param = 'taskId=' + _GetIdArr(sels).join(",")
					+'&cmd=switchsourcesignalmode&sourceSignalMode=' + mode;
	
	$.post('taskCtrl', param,
			function(data){
				refreshPage();
			}
		);
}

function TL_ToggleTask($task) {	
	if($task==null)
		return;
	if(tl_TaskExpand!=null){
		tl_TaskExpand.find('#ExpandIcon').attr('src',  _cxt.iconRightSrc);
		var $taskBody = tl_TaskExpand.find('.TaskBody');
		if($taskBody.length>0) 
			$taskBody.remove();
	}
	
	function showWaiting(){
		var $icon = $task.find('#ExpandIcon');
		if(($icon.attr('src')==_cxt.iconRightSrc||$icon.attr('src')==_cxt.iconRightWSrc) && uiIsTaskExpand($task.get(0)))
			$icon.attr('src', _cxt.waittingIconSrc);
	}
	
	if(tl_TaskExpand != $task){
		tl_TaskExpand = $task;
		uiInitTaskBody($task.get(0));
		//$task.find('#ExpandIcon').attr('src', _cxt.waittingIconSrc);	
		setTimeout(showWaiting,400);
	}else{
		tl_TaskExpand = null;
	}	
			
	TL_OnSelectRow($task.get(0));
}

/**
 * @param {Element}tableHeadContainer	document.getElementById('TableHeadContainer')
 * @param {boolean}isVisible
 */
function TL_ShowCtrlPanel(isVisible){	
	if(1) return; //always show
	var tableHeadContainer = document.getElementById('TableHeadContainer');
	var a = uFindFirstNodeById(tableHeadContainer, "TaskActionPanel");
	var h = uFindFirstNodeById(tableHeadContainer, "TaskListTableHead");
	
//	a.style.display= isVisible ? 'inline-block' : 'none';
//	h.style.display= isVisible ? 'none' :'inline-block';
	
	if(isVisible)
		uAnim_SwitchDisplay(h, a,'inline-block');
	else
		uAnim_SwitchDisplay(a, h,'inline-block');
}
/**
 * on select a single row
 * @param elem
 */
function TL_OnSelectRow(elem){
	if(elem==null)
		return;
	//show control panel
	TL_ShowCtrlPanel(true);
	
	//select current row
	
	var taskDIV;
	if(uIsContainCssClass(elem, "Task")){
		taskDIV = elem;
	}else{
		taskDIV = uGetContainer(elem,
								function(n){
									return uIsContainCssClass(n, "Task");
								});
	}
	
	var taskListContainerDIV = uGetContainer(taskDIV,
											function(n){
												return n.getAttribute("id")=="taskListContainer";
											});
	
	if(taskDIV==null||taskListContainerDIV==null)
		return;
	
	uiSetAllTaskSelected(taskListContainerDIV, false);
	uiSetTaskSelected(taskDIV, true);
	uiUpdateActionBar();
}

function TL_CHK_OnSelect(chk){
	if(chk==null)
		return;
	
	var taskDIV = uGetContainer(chk,
							function(n){
								return uIsContainCssClass(n, "Task");
							});
	
	uiSetTaskSelected(taskDIV, chk.checked);
	
	var chkCount = 0;
	var chks = document.getElementsByName("taskChk");
	var len = chks.length;	
	for(var i=0;i<len;i++){
		if(chks[i].checked){
			chkCount++;
		}
	}
	TL_ShowCtrlPanel(chkCount>0);
	uiUpdateActionBar();
}

function TL_SelectAll(isSelected){
	TL_ShowCtrlPanel(isSelected);		
	uiSetAllTaskSelected(document.getElementById('taskListContainer'), isSelected);
	uiUpdateActionBar();
}

function _TL_BindTaskEvents($task) {
	$task.find('.TaskToggleTrigger').unbind('click').click(function() {
		TL_ToggleTask($task);
	});
	
	$task.find('.TaskMenuTrigger').unbind('click').click(function(e) {	
		TL_OnSelectRow(this);
	});
	uiUpdateActionBar();
}

function TL_Init(cxtTL) {
	_cxt = cxtTL;
	
	$('.Task').each(function(i) {
		_TL_BindTaskEvents($(this));
	});

	uiSyncTaskProgressWithStatus();
	_tl_runcxt_StatusUpdate = TLTimer_UpdateStatus(300, null,-1,TL_TIMER_INTERVAL_DEFAULT);	
	setTimeout(_TL_TimerThumb,1000);
	
	TL_StartTaskListUpdate();
}

/**
 * struct Sel{id, div} : id, task id; div: div dom element
 * @return {Array} task{id, div}
 */
function TL_GetSelections(){
	var tasks = new Array();
	var len;
	var taskDIVs = _GetTaskDIVArray();
	
	len = taskDIVs.length;
	for(var i=0;i<len;i++){
		var taskDIV = taskDIVs[i];
		if(uiIsTaskSelected(taskDIV)){
			var task = new Object();
			task.id = _GetTaskId(taskDIV);
			task.div = taskDIV;
			tasks[tasks.length] = task;
		}
	}
	
	return tasks;
}

function PB_ReSetStatus(divPB, tStatus){
	var m = divPB;	
	var mc = m.getAttribute("class");

	var clz;
	
	if (tStatus == _cxt.TaskStatus.PENDING) {
		clz = "ProgressBarP";
		if(mc!=clz)
			m.setAttribute("class", clz);	
	} else if (tStatus == _cxt.TaskStatus.WAITING) {
		clz = "ProgressBarW";
		if(mc!=clz)
			m.setAttribute("class", clz);	
	} else if (tStatus == _cxt.TaskStatus.ERROR || tStatus == _cxt.TaskStatus.CANCELLED || tStatus == _cxt.TaskStatus.STOPPING) {
		clz = "ProgressBarE";
		if(mc!=clz)
			m.setAttribute("class", clz);	
	} else if (tStatus == _cxt.TaskStatus.COMPLETED) {
		clz = "ProgressBarC";
		if(mc!=clz)
			m.setAttribute("class", clz);		
	} else if (tStatus == _cxt.TaskStatus.RUNNING) {
		clz = "ProgressBarR";
		if(mc!=clz)
			m.setAttribute("class", clz);
	}else{
		clz = "ProgressBarN";
		if(mc!=clz)
			m.setAttribute("class", clz);	
	}
	
	if(tStatus != _cxt.TaskStatus.RUNNING){
		uFindFirstNodeById(divPB, 'O').style.width='0px';
	}
}
/**
 * 
 * @param {Element}divPB
 * @param {String}value
 */
function PB_SetProgress(divPB, value){	
	if(value.length>1 && value.charAt(value.length-1)=='%')
		value = value.substr(0, value.length-1);
	
	var iVal = parseInt(value);
	
	if(iVal>100){
		PB_SetProgress(divPB,'0');
		if(iVal==101)
			return;
		var o = uFindFirstNodeById(divPB, 'O');
		if( o.getAttribute('class') != 'ProgressBarStreaming' )
			o.setAttribute('class','ProgressBarStreaming');
		return;
	}else{
		var o = uFindFirstNodeById(divPB, 'O');
		o.style.width = '' + iVal +'%';//iVal*70/100 + 'px';	
	}
}

function _TB_Init(taskId, tbElem){
	var oGroupArr = new Array();
	var IdOutputGroupClzPattern = /[\s]*IdOutputGroup[\s]*/;
	uFindNodeArray(oGroupArr, tbElem, 	function(n){
											return IdOutputGroupClzPattern.test(n.getAttribute("class"));
										}, true);
	
	var count = oGroupArr.length;//parseInt(uFindFirstNodeById(tbElem, "OutputGroupCount").getAttribute("value"));
	if(count==0)
		return;
	
	var g_OutputGroupTab = new MultiLineTab();
	var domTab = g_OutputGroupTab.Init(count, MLT_MODE_FIXED);
	uFindFirstNodeById(tbElem, "OutputTab").appendChild(domTab);
	var tabIconArr = new Array();
	for(var i=0;i<count;i++){
		var container = uFindFirstNodeById(oGroupArr[i], "OutputGroupContainer").value;
		tabIconArr[i] = Container2Icon(container);
	}
	
	g_OutputGroupTab.SetOnChange(_TB_OnTabChange);	
	g_OutputGroupTab.SetUserData(taskId);
	g_OutputGroupTab.SetIconByArray(tabIconArr);
	
	_cxt.taskOutTabs[taskId] = g_OutputGroupTab;
	
	_TB_OnTabChange(taskId);
}

function _TB_OnTabChange(taskId){	
	var IdOutputGroupClzPattern = /[\s]*IdOutputGroup[\s]*/;
	
	var tasDIV = _GetTaskDIV(taskId);
	var idx = _cxt.taskOutTabs[taskId].GetActiveIndex();
	
	var oGroupArr = new Array();
	uFindNodeArray(oGroupArr, tasDIV, 	function(n){
											return IdOutputGroupClzPattern.test(n.getAttribute("class"));
										}, true);
	
	for(var i=0;i<oGroupArr.length;i++){
		if(i==idx){
			oGroupArr[i].style.display = "block";
		}else{
			if(oGroupArr[i].style.display != "none"){
				oGroupArr[i].style.display = "none";
			}
		}
	}
}

function openTaskDeteailErrorDlg(taskId){
	$.post('listLastAlert?taskId='+taskId,function(data){
		var cnt = data + '<div style="position:absolute;bottom:10px;text-align:center;width:100%;"><input type="button" value="OK" onclick="closeTaskDeteailErrorDlg()" /></div>';
		var divDlg = document.getElementById('TaskErrorDlg');
		uOpenDlg(divDlg, cnt, 400,200);
	});	
}


function closeTaskDeteailErrorDlg(){
	var divDlg = document.getElementById('TaskErrorDlg');
	uCloseDlg(divDlg);
}
