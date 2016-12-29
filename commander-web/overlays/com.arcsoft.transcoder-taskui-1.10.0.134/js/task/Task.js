window.onunload = function() {
	if(g_InputPreview != null) {
		g_InputPreview.Close();
	}
	
	if(g_OutputPreview != null) {
		g_OutputPreview.Close();
	}
};

function OnPageReady() {
	g_taskSupport = new TaskSupport();
	g_taskSupport.Create();
}

function TaskSupport() {
	var JS_FIELD_ERROR_TEXT = ".FieldErrorText";
	
	var maxOutputGroupCount = parseInt(GetLicense(license.THROUGHTPUT_1_IN_N_OUT));
	if(isNaN(maxOutputGroupCount)) maxOutputGroupCount = 8;

	var tagMap = [
		{key: TAG_ENCODING_OPTION,	value: JS_ENCODING_OPTION},
		{key: TAG_PRIORITY,	value: JS_PRIORITY},
		{key: TAG_GPUID,	value: JS_GPUID},
		{key: TAG_VIDEO_DECODING,	value: JS_VIDEO_DECODING}
		];
	
	var fieldMap = [
		{key: FIELD_ID, value: JS_ID},
		{key: FIELD_GUID, value: JS_GUID},
		{key: FIELD_NAME, value: JS_NAME},
		{key: FIELD_ENCODING_OPTION, value: JS_ENCODING_OPTION},
		{key: FIELD_PRIORITY, value: JS_PRIORITY},
		{key: FIELD_GPUID, value: JS_GPUID},
		{key: FIELD_VIDEO_DECODING,	value: JS_VIDEO_DECODING},
		{key: FIELD_SCRIPT_URI, value: JS_SCRIPT_URI},
		{key: FIELD_DESCRIPTION, value: JS_DESCRIPTION}
		];
	
	this.prefixField = "";
	this.myField = FIELD_MODEL;
	this.fieldIndex = null;
	
	this.dom = null;
	this.inputArray = [];
	this.streamArray = [];
	this.outputGroupArray = [];
	this.submitted = false;
	this.presetList = null;
	this.outputGroupActiveIndex = 0;
	this.extensionArray = [];
	
	this.Create = function() {
		installTMPlayer();
		
		this.dom = $(JS_TASK).get(0);
		if(this.dom == null) return;
		
		var dom = null;
		var title = "";
		
		$("body").keydown(function(event) {
			OnKeyDown(event);
		});
		
		g_PopBackground = new BackgroundControl();
		g_PopBackground.Init();

		//input open file
		g_ScriptFileView = new FileView();
		dom = g_ScriptFileView.Init();
		$('body').append(dom);
		
		//input open file
		g_InputFileView = new FileView();
		dom = g_InputFileView.Init();
		$('body').append(dom);
		title = str_common.selectInputPath;
		g_InputFileView.SetTitle(title);
		
		//input open BD file
		g_InputBDSelector = new FileView();
		dom = g_InputBDSelector.Init("BDSelector", true);
		$('body').append(dom);
		title = str_common.selectInputPath;
		g_InputBDSelector.SetTitle(title);
		
		//output open file
		g_OutputFileView = new FileView();
		dom = g_OutputFileView.Init("", true);
		$('body').append(dom);
		g_OutputFileView.SetOnOK(OnOutputFileView);
		title = str_common.selectOutputPath;
		g_OutputFileView.SetTitle(title);
		
		//select logo file
		g_LogoFileView = new FileView();
		dom = g_LogoFileView.Init();
		$('body').append(dom);
		g_LogoFileView.SetShowBG(false);
		//title = str_output.logoFileViewTitle;
		//g_LogoFileView.SetTitle(title);
		
		//select subtitle file
		g_SubtitleFileView = new FileView();
		dom = g_SubtitleFileView.Init();
		$('body').append(dom);
		g_SubtitleFileView.SetShowBG(false);
		title = str_output.subtitleFileViewTitle;
		g_SubtitleFileView.SetTitle(title);
		
		//select advertisement file
		g_AdvertisementFileView = new FileView();
		dom = g_AdvertisementFileView.Init();
		$('body').append(dom);
		g_AdvertisementFileView.SetShowBG(false);
		title = str_output.AdvertisementFileViewTitle;
		g_AdvertisementFileView.SetTitle(title);
		
		//save as profile
		g_SaveAsProfile = new NameDialog();
		dom = g_SaveAsProfile.Init("saveAsProfileDialog");
		$('body').append(dom);
		g_SaveAsProfile.SetOnOK(OnSaveAsProfile);
		title = str_common.saveAsProfile;
		g_SaveAsProfile.SetTitle(title);
		g_SaveAsProfile.DisplayCategory(false);
		
		//save as preset
		g_SaveAsPreset = new NameDialog();
		dom = g_SaveAsPreset.Init("saveAsPresetDialog");
		$('body').append(dom);
		title = str_common.saveAsPreset;
		g_SaveAsPreset.SetTitle(title);
		
		//palette
		CreatePalette();
		
		//input preview
		g_InputPreview = new InputPreview();
		dom = g_InputPreview.Init();
		$('body').append(dom);
		
		//program preview
		g_ProgramPreview = new ProgramPreview();
		dom = g_ProgramPreview.Init();
		$('body').append(dom);
		
		//SDI preview
		g_SDIPreview = new SDIPreview();
		dom = g_SDIPreview.Init();
		$('body').append(dom);
		
		//output preview
		g_OutputPreview = new OutputPreview();
		dom = g_OutputPreview.Init();
		$('body').append(dom);
		
		g_LineSelector = CreateLineSelector("LineSelector", $('body').get(0));
		
		this.Init();
		
		return this.dom;
	};
	
	this.InitOutputGroupTab = function() {
		var $task = $(this.dom);
		var $outputGroupArr = $task.find(JS_OUTPUT_GROUP);
		$outputGroupArr.hide();
		$outputGroupArr.first().show();
		var count = $outputGroupArr.length;
		g_OutputGroupTab = new MultiLineTab();
		var domTab = g_OutputGroupTab.Init(count);
		$task.find(JS_OUTPUT_GROUP_TAB).append(domTab);
		g_OutputGroupTab.SetOnChange(OnTabChange);
		g_OutputGroupTab.SetOnAdd(OnTabAdd);
		g_OutputGroupTab.SetOnRemove(OnTabRemove);
	};
	
	/** method **/
	this.Init = function() {
		var context = this;
		
		this.LicenseControl();

		var $inputArr = $(JS_INPUT, this.dom);
		$inputArr.each(function(i) {
			var inputSupport = new InputSupport();
			inputSupport.Init(this);
			inputSupport.SetOnRemove(OnInputRemove);
			inputSupport.SetOnReorder(OnInputReorder);
			context.inputArray[i] = inputSupport;
		});
		
		$(JS_STREAM, this.dom).each(function(i){
			var streamSupport = new StreamSupport();
			streamSupport.Init(this);
			context.streamArray[i] = streamSupport;
		});
		this.SortStream();
		this.UpdateStreamIdGenerator();

		var tabIconArr = [];
		$(JS_OUTPUT_GROUP, this.dom).each(function(i) {
			var outputGroupSupport = new OutputGroupSupport();
			outputGroupSupport.Init(this);
			var container = outputGroupSupport.GetContainerType();
			tabIconArr[i] = Container2Icon(container);
			context.outputGroupArray[i] = outputGroupSupport;
			tabIconArr[i] = null;
		});
		
		var $priority = $(JS_PRIORITY, this.dom);
		var arr = taskData.getPriority();
		uUpdateSelect($priority[0], arr);
		
		var $encodingPolicy = $(JS_ENCODING_OPTION, this.dom);
		arr = taskData.getEncodingPolicy();
		uUpdateSelect($encodingPolicy[0], arr);
		
		arr = taskData.getVideoDecoding();
		uUpdateSelect($(JS_VIDEO_DECODING, this.dom)[0], arr);
		
		arr = taskData.getGpuId();
		uUpdateSelect($(JS_GPUID, this.dom)[0], arr);
		
		this.InitOutputGroupTab();
		//g_OutputGroupTab.SetIconByArray(tabIconArr);
		
		this.UpdateNewOutputGroupTrigger();
		this.SortInput();
		
		this.RequestGpuCount();
		this.RequestPresetList();
		
		this.Bind();
	};
	
	this.AddExtension = function(extension) {
		this.extensionArray.push(extension);
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.PRIORITY) != license.ENABLED) {
			$(JS_TASK_PRIORITY_MODULE, this.dom).remove();
		}
		
		if(GetLicense(license.POST_PROCESS) != license.ENABLED) {
			$(JS_LICENSE_POST_PROCESS, this.dom).remove();
		}
		
		if(GetLicense(license.TRANS_GPU_ID) != license.ENABLED) {
			$(JS_LICENSE_TRANS_GPU_ID, this.dom).remove();
		}
		
		if(GetLicense(license.TRANS_VIDEO_DECODING) != license.ENABLED) {
			$(JS_LICENSE_TRANS_VIDEO_DECODING, this.dom).remove();
		}
		
		if(GetLicense(license.ENCODINGPOLICY) != license.ENABLED) {
			$(JS_LICENSE_ENCODING_POLICY, this.dom).hide();
		}
	};
	
	this.Bind = function() {
		var $task = $(this.dom);
		var context = this;
		
		$(JS_OPEN_SCRIPT_TRIGGER, this.dom).click(function() {
			g_ScriptFileView.SetOnOK(function(key) {
				$(JS_SCRIPT_URI, context.dom).val(key);
			});
			g_ScriptFileView.Show();
		});
		
		var $newInputTrigger = $task.find(JS_NEW_INPUT_TRIGGER);
		$newInputTrigger.click(function() {
			var inputSupport = new InputSupport();
			inputSupport.Create($task.get(0));
			inputSupport.SetOnRemove(OnInputRemove);
			inputSupport.SetOnReorder(OnInputReorder);
			context.SortInput();
			$newInputTrigger.hide();
		});
		
		$(JS_SUBMIT_TRIGGER).click(function() {
			context.ConfirmSubmit();
		});
		
		$(JS_BACK_TRIGGER).click(function() {
			/*var value = context.GetPageName();
			if(value == PAGE_NAME_TASK) {
				var url = PAGE_LIST_TASK;
				var taskId = $(JS_ID, this.dom).val();
				if(taskId > 0) {
					url = PAGE_LIST_TASK + "?locateTaskId=" + taskId;
				}
				window.location.href = url;
			} else if(value == PAGE_NAME_PROFILE) {
				window.location.href = PAGE_LIST_PROFILE;
			} else if(value == PAGE_NAME_SCHEDULE) {
				window.location.href = PAGE_LIST_SCHEDULE;
			}*/
			history.back();
		});
		
		$(JS_SAVE_AS_PROFILE).click(function() {
			g_SaveAsProfile.Show();
		});
		
		$(JS_NEW_OUTPUT_GROUP_TRIGGER, this.dom).click(function() {
			g_OutputGroupTab.SetUserData(JS_NEW_OUTPUT_GROUP_TRIGGER);
			g_OutputGroupTab.AddItem();
		});
		
		$(JS_COPY_OUTPUT_GROUP_TRIGGER, this.dom).click(function() {
			g_OutputGroupTab.SetUserData(JS_COPY_OUTPUT_GROUP_TRIGGER);
			g_OutputGroupTab.AddItem();
		});
		
		$(JS_IMPORT_PROFILE, this.dom).click(function() {
			context.ImportProfile();
		});
		
		$(JS_ENCODING_OPTION, this.dom).change(function() {
			if(this.value == ENCODINGPOLICY_CUSTOM) { 
				context.ActiveVideoPolicy(true);
			} else {
				context.ActiveVideoPolicy(false);
			}
		});
		
		$(JS_NEW_STREAM_TRIGGER, this.dom).click(function() {
			if(context.streamArray.length == 0) {
				context.NewStream();
			} else {
				var stream = context.streamArray[context.streamArray.length - 1];
				context.CloneStream(stream.GetId());
			}
		});
		
		$(JS_IMPORT_PRESET_TRIGGER, this.dom).click(function() {
			context.ImportPreset();
		});
	};
	
	this.ActiveVideoPolicy = function(bActive) {
		if(this.streamArray == null) return;
		for(var i = 0; i < this.streamArray.length; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.ActiveVideoPolicy(bActive);
		}
	};
	
	this.GetEncodePolicy = function() {
		return $(JS_ENCODING_OPTION, this.dom).val();
	};
	
	this.UpdateNewOutputGroupTrigger = function() {
		var $task = $(this.dom);
		var $outputGroupArr = $task.find(JS_OUTPUT_GROUP);
		if($outputGroupArr.length >= maxOutputGroupCount) {
			$task.find(JS_NEW_OUTPUT_GROUP_TRIGGER).hide();
			$task.find(JS_COPY_OUTPUT_GROUP_TRIGGER).hide();
		} else {
			$task.find(JS_NEW_OUTPUT_GROUP_TRIGGER).show();
			$task.find(JS_COPY_OUTPUT_GROUP_TRIGGER).show();
		}
	};
	
	this.isCopy = function() {
		if($(JS_ACTION_TYPE, this.dom).val() == ACTION_TYPE_SAVE
				&& $(JS_ID, this.dom).val() != "0") {
			return true;
		} else {
			return false;
		}
	};
	
	this.isNew = function() {
		if($(JS_ACTION_TYPE, this.dom).val() == ACTION_TYPE_SAVE
			&& $(JS_ID, this.dom).val() == "0"
			&& $(JS_FIELD_ERROR_TEXT, this.dom).length == 0) {
			return true;
		} else {
			return false;
		}
	};
	
	this.SetName = function(name) {
		$(JS_NAME, this.dom).val(name);
	};
	
	this.OnInputChanged = function(input) {
		var name = input.GetURI();
		var $name = $(JS_NAME, this.dom);
		if($name.val().length == 0 || $name.val() == input.GetOldURI()) {
			$(JS_NAME, this.dom).val(name);
		}
		
		var len = this.streamArray.length;
		for(var i = 0; i < len; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.OnInputChanged(input);
		}
	};
	
	this.GetPageName = function() {
		return $(this.dom).find(JS_PAGE_NAME).val();
	};
	
	this.GetGUID = function() {
		return $(JS_GUID, this.dom).val();
	};
	
	this.GetValueByJS = function(selector) {
		var value = $(this.dom).find(selector).val();
		return value;
	};
	
	this.ConfirmSubmit = function() {
		var context = this;
		if(g_MediaInfoRequestList.getCount() > 0) {
			alertMsg(str_warning.save_task_with_media_info_loading, 1, function(ret) {
				if(ret) {
					context.Submit();
				}
			});
		} else {
			context.Submit();
		}
	};
	
	this.Submit = function() {
		if(this.submitted) return;
		this.submitted = true;
		
		var value = this.GetPageName();
		if(value == PAGE_NAME_TASK) {
			this.SubmitTask();
		} else if(value == PAGE_NAME_PROFILE) {
			this.SubmitProfile();
		} else if(value == PAGE_NAME_SCHEDULE) {
			this.SubmitSchedule();
		}
	};
	
	this.SubmitTask = function() {
		this.UpdateElementName();
		var form = $(this.dom).find("form").get(0);
		var ymdebug = $(form).serialize();
		form.submit();
	};
	
	this.SubmitProfile = function() {
		this.myField = FIELD_PROFILE;
		this.UpdateElementName();
		var form = $(this.dom).find("form").get(0);
		var ymdebug = $(form).serialize();
		form.submit();
	};
	
	this.SubmitSchedule = function() {
		this.myField = FIELD_SCHEDULE;
		this.UpdateElementName();
		var form = $(this.dom).find("form").get(0);
		var ymdebug = $(form).serialize();
		form.submit();
	};
	
	this.UpdateStreamIdGenerator = function() {
		var $streamId = $(JS_STREAM_ID, this.dom);
		var min = -1;
		for(var i = 0; i < $streamId.length; i++) {
			var id = $streamId.get(i).value;
			var iid = parseInt(id);
			if(isNaN(iid)) continue;
			if( min > iid) {
				min = iid;
			}
		}
		 $(JS_STREAM_ID_GENERATOR, this.dom).text(min);
	};
	
	this.GenerateStreamId = function() {
		var $gen = $(JS_STREAM_ID_GENERATOR, this.dom).first();
		var id = $gen.text();
		id--;
		$gen.text(id);
		return id;
	};
	
	this.SortStream = function() {
		for(var i = 0; i < this.streamArray.length; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.SetIndex(i+1);
		}
	};

	this.AddStream = function(domStream) {
		this.RestoreStream(domStream);
		var streamSupport = new StreamSupport();
		streamSupport.Init(domStream);
		this.streamArray[this.streamArray.length] = streamSupport;
		this.SortStream();
		this.UpdateStreamList();
		return streamSupport;
	};
	
	this.NewStream = function() {
		var streamSupport = new StreamSupport();
		var streamId = this.GenerateStreamId();
		streamSupport.Create(this.dom, streamId);
		streamSupport.SetPresetList(this.presetList);
		this.streamArray[this.streamArray.length] = streamSupport;
		this.SortStream();
		this.UpdateStreamList();
		return streamSupport;
	};

	this.GetStream = function(id) {
		var domStream = null;
		var len = this.streamArray.length;
		for(var i = 0; i < len; i++) {
			var streamSupport = this.streamArray[i];
			if(streamSupport.GetId() == id) {
				domStream = streamSupport;
			};
		}
		return domStream;
	};
	
	this.GetStreamByIndex = function(index) {
		if(index == null) index = 0;
		return this.streamArray[index];
	};
	
	this.IsUsedStream = function(streamId) {
		for(var i = 0; i < this.outputGroupArray.length; i++) {
			var outputGroup = this.outputGroupArray[i];
			if(outputGroup.IsUsedStream(streamId)) {
				return true;
			}
		}
		return false;
	};
	
	this.UpdateStreamList = function() {
		for(var i = 0; i < this.outputGroupArray.length; i++) {
			var outputGroup = this.outputGroupArray[i];
			outputGroup.UpdateStreamList();
		}
	};
	
	this.DeleteStream = function(id) {
		if(this.IsUsedStream(id)) {
			alert(str_stream.stream_is_used);
			return;
		}
		var bFound = false;
		var len = this.streamArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.streamArray[i-1] = this.streamArray[i];				
			} else {
				var streamSupport = this.streamArray[i];
				if(streamSupport.GetId() == id) {
					streamSupport.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) this.streamArray.length--;
		this.SortStream();
		this.UpdateStreamList();
	};
	
	this.CloneStream = function(streamId) {
		var streamSupport = this.GetStream(streamId);
		var newStreamSupport = streamSupport.Clone();
		this.RestoreStream(newStreamSupport.dom);
		var streamId = this.GenerateStreamId();
		newStreamSupport.SetId(streamId);
		this.streamArray[this.streamArray.length] = newStreamSupport;
		this.SortStream();
		this.UpdateStreamList();
		return newStreamSupport;
	};
	
	this.GetStreamList = function() {
		var array = [];
		for(var i = 0; i < this.streamArray.length; i++) {
			var stream = this.streamArray[i];
			var id = stream.GetId();
			var index = stream.GetIndex();
			
			var o = {};
			o.key = id;
			o.value= str_stream.stream + "-" + index;
			array.push(o);
		}
		return array;
	};
	
	this.RestoreStream = function(domStream) {
		$(JS_STREAM_FLOCK, this.dom).append(domStream);
	};
	
	this.ReplaceStream = function(oldStream, presetId) {
		var osid = oldStream.GetId();
		var url = "getPreset";
		var param = "presetId=" + presetId + "&preferStreamId=" + osid;
		
		var context = this;
		$.post(url, param, function(data) {
			var domStream = $(data).filter(JS_STREAM).get(0);
			$(oldStream.dom).after(domStream);
			oldStream.Clean();
			oldStream.Init(domStream);
			oldStream.SetPresetList(context.presetList);
			oldStream.SetLinkedPresetId(presetId);
			context.SortStream();
		});
	};
	
	this.UpdateAudioJoinedList = function(list) {
		if(list == null) {
			list = this.GetAudioJoinedList();
		}
		
		for(var i = 0; i < this.streamArray.length; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.UpdateAudioJoinedList(list);
		}
	};
	
	this.GetAudioJoinedList = function() {
		if(this.inputArray == null || this.inputArray.length == 0) return null;
		
		var input = this.inputArray[0];
		return input.GetAudioJoinedList();
	};
	
	this.NewOutputGroup = function() {
		var outputGroupSupport = new OutputGroupSupport();
		outputGroupSupport.Create(this.dom);
		this.outputGroupArray.push(outputGroupSupport);
		
		var container = outputGroupSupport.GetContainerType();
		var icon = Container2Icon(container);
		//g_OutputGroupTab.SetIconByIndex(g_OutputGroupTab.GetCount()-1, icon);
		this.UpdateNewOutputGroupTrigger();
		
		return outputGroupSupport;
	};
	
	this.CloneOutputGroup = function(index) {
		var outputGroup = this.outputGroupArray[index];
		var newOutputGroup = outputGroup.Clone();
		this.outputGroupArray.push(newOutputGroup);
		$(JS_OUTPUT_GROUP_FLOCK, this.dom).append(newOutputGroup.dom);
		
		var container = newOutputGroup.GetContainerType();
		var icon = Container2Icon(container);
		//g_OutputGroupTab.SetIconByIndex(g_OutputGroupTab.GetCount()-1, icon);
		this.UpdateNewOutputGroupTrigger();
		
		return newOutputGroup;
	};
	
	this.UpdateOutputGroup = function(index) {
		var len = this.outputGroupArray.length;
		for(var i = 0; i < len; i++) {
			var outputGroupSupport = this.outputGroupArray[i];
			if(i == index) {
				outputGroupSupport.Display(true);
			} else {
				outputGroupSupport.Display(false);
			}
		}
	};
	
	this.DeleteOutputGroup = function(index) {
		var iconIndex = 0;
		var tabIconArr = [];
		var len = this.outputGroupArray.length;
		var bFound = false;
		for(var i = 0; i < len; i++) {
			var outputGroupSupport = this.outputGroupArray[i];
			if(i == index) {
				outputGroupSupport.Delete();
				bFound = true;
			} else {
				var container = outputGroupSupport.GetContainerType();
				tabIconArr[iconIndex] = Container2Icon(container);
				iconIndex++;
			}
			if(i > index) {
				this.outputGroupArray[i-1] = this.outputGroupArray[i];
			}
		}
		if(bFound) this.outputGroupArray.length--;
		//g_OutputGroupTab.SetIconByArray(tabIconArr);
		this.UpdateNewOutputGroupTrigger();
	};
	
	this.GetOutputGroupIndex = function(outputGroupSupport) {
		var len = this.outputGroupArray.length;
		var index = null;
		for(var i = 0; i < len; i++) {
			if(outputGroupSupport == this.outputGroupArray[i]) {
				index = i;
				break;
			}
		}
		return index;
	};
	
	this.OnOutputGroupChange = function(outputGroupSupport) {
		var index = this.GetOutputGroupIndex(outputGroupSupport);
		if(index == null) return;
		var container = outputGroupSupport.GetContainerType();
		var icon = Container2Icon(container);
		//g_OutputGroupTab.SetIconByIndex(index, icon);
	};
	
	this.GetOutputByStream = function(streamId) {
		var outputSupport = null;
		var len = this.outputGroupArray.length;
		for(var i = 0; i < len; i++) {
			var outputGroupSupport = this.outputGroupArray[i];
			outputSupport = outputGroupSupport.GetOutputByStream(streamId);
			if(outputSupport != null) {
				break;
			}
		}
		return outputSupport;
	};
	
	this.SortInput = function() {
	};
	
	this.GetInputSupport = function() {
		var inputSupport = this.inputArray[0];
		return inputSupport;
	};
	
	this.RequestGpuCount = function() {
		function ParseData(data) {
			var $data = $(data);
			var gpuCountString = $("#GpuCount", $data).text();
			var gpuCount = parseInt(gpuCountString);
			var gpuArr = [];
			var o = {key: -1, value: "AUTO"};
			gpuArr.push(o);
			for(var i = 0; i < gpuCount; i++) {
				var o = {};
				o.key = i;
				o.value = i;
				gpuArr.push(o);
			}
			
			uUpdateSelect($(JS_GPUID, this.dom)[0], gpuArr);
		}
		
		var _url = "getGpuCount";
		var param = "";
		
		$.post(_url, param, function(data) {
			ParseData(data);
		}, "html");
	};

	this.UpdatePresetList = function(data) {
		var $presetListData = $(JS_PRESET_LIST_DATA);
		$presetListData.after(data);
		$presetListData.remove();
		
		this.presetList = ParsePresetList(data);
		var o = {};
		o.key = LINKED_PRESET_ID_NONE;
		o.value = str_stream.linkedNone;
		this.presetList.unshift(o);
		this.UpdateStreamPresetList(this.presetList);
	};
	
	this.RequestPresetList = function() {
		var _url = "listPresetMenu";
		var param = "";
		
		var context = this;
		$.post(_url, param, function(data) {
			context.UpdatePresetList(data);
		});
	};
	
	this.UpdateStreamPresetList = function(presetList) {
		for(var i = 0; i < this.streamArray.length; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.SetPresetList(presetList);
		}
	};
	
	this.OnMediaInfoChanged = function(mediaInfo) {
		var len = this.streamArray.length;
		for(var i = 0; i < len; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.OnMediaInfoChanged(mediaInfo);
		}
	};
	
	this.UpdateInputMediaInfo = function() {
		for(var i = 0; i < this.inputArray.length; i++) {
			this.inputArray[i].UpdateMediaInfo();
		}
	};
	
	this.ImportProfile = function() {
		var _url = "listProfileMenu";
		var param = "";
		
		$.post(_url, param, function(data) {
			var map = parseProfile(data);
			g_LineSelector.setContent(map);
			g_LineSelector.setTitle(str_common.importProfile);
			g_LineSelector.setOnSelected(OnProflieMenuClick);
			g_LineSelector.show();
		});
	};
	
	this.ImportPreset = function() {
		var _url = "listPresetMenu";
		var param = "";
		
		$.post(_url, param, function(data) {
			var map = ParsePresetList(data);
			g_LineSelector.setContent(map);
			g_LineSelector.setTitle(str_common.importPreset);
			g_LineSelector.setOnSelected(OnNewStreamFromPreset);
			g_LineSelector.show();
		});
	};

	/**
	 * @param o - {name: , description: }
	 */
	this.XMLProfile = function(o) {
		var xml = new XMLWriter();
		xml.BeginNode(TAG_PROFILE);
		
		xml.Node(TAG_NAME, o.name);
		xml.Node(TAG_DESCRIPTION, o.description);
		
		var value = "";
		for(var i = 0; i < tagMap.length; i++) {
			value = this.GetValueByJS(tagMap[i].value);
			if(value == null) continue;
			xml.Node(tagMap[i].key, value);
		}
		
		value = this.GetValueByJS(JS_SCRIPT_URI);
		xml.BeginNode(TAG_POST_PROCESS);
		xml.Node(TAG_URI, value);
		xml.EndNode();

		//stream
		xml.BeginNode(TAG_STREAMS);
		len = this.streamArray.length;
		for(var i = 0; i < len; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.XML(xml);
		}
		xml.EndNode();
		
		//input
		xml.BeginNode(TAG_INPUTS);
		len = this.inputArray.length;
		for(var i = 0; i < len; i++) {
			var inputSupport = this.inputArray[i];
			inputSupport.XML(xml);
		}
		xml.EndNode();
		
		//output groups
		xml.BeginNode(TAG_OUTPUT_GROUPS);
		len = this.outputGroupArray.length;
		for(var i = 0; i < len; i++) {
			var outputGroupSupport = this.outputGroupArray[i];
			outputGroupSupport.XML(xml);
		}
		xml.EndNode();
		
		xml.EndNode();
		
		xml.Close();
		return xml.ToString();
	};
	
	/* Field operate */
	this.SetPrefixField = function(prefix) {
		this.prefixField = prefix;
	};
	
	this.SetFieldIndex = function(i) {
		this.fieldIndex = i;
	};
	
	this.GetFullField = function() {
		var field = "";
		if(this.fieldIndex == null) {
			field = this.prefixField + this.myField + ".";
		} else {
			field = this.prefixField + this.myField + "[" + this.fieldIndex + "].";
		}
		return field;
	};
	
	this.UpdateElementName = function() {
		var len = fieldMap.length;
		var fullField = this.GetFullField();
		for(var i = 0; i < len; i++) {
			var $sel = $(fieldMap[i].value, this.dom);
			var elName = fullField + fieldMap[i].key;
			$sel.attr("name", elName);
		};
		this.UpdateSubElement();
	};
	
	this.UpdateSubElement = function() {
		var fullField = this.GetFullField();
		//input
		var i = 0;
		var len = this.inputArray.length;
		for(i = 0;i < len; i++) {
			var inputSupport = this.inputArray[i];
			inputSupport.SetPrefixField(fullField);
			inputSupport.SetFieldIndex(i);
			inputSupport.UpdateElementName();
		}
		
		//output group
		len = this.outputGroupArray.length;
		for(i = 0; i < len; i++) {
			var outputGroupSupport = this.outputGroupArray[i];
			outputGroupSupport.SetPrefixField(fullField);
			outputGroupSupport.SetFieldIndex(i);
			outputGroupSupport.UpdateElementName();
		};
		
		//stream 
		len = this.streamArray.length;
		for(i = 0; i < len; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.SetPrefixField(fullField);
			streamSupport.SetFieldIndex(i);
			streamSupport.UpdateElementName();
		}
		
		for(var i = 0; i < this.extensionArray.length; i++) {
			var extension = this.extensionArray[i];
			
			if($.isFunction(extension.SetPrefixField)) {
				extension.SetPrefixField(fullField);
			}
			
			if($.isFunction(extension.UpdateElementName)) {
				extension.UpdateElementName();
			}
		}
	};
	/* Field operate end */
	
	/* static function */

	/* Callback function */
	function OnProflieMenuClick(key) {
		if(key == null) return;
		
		var url = "newTask";
		var value = g_taskSupport.GetPageName();
		if(value == PAGE_NAME_TASK) {
			url = "newTask";
		} else if(value == PAGE_NAME_PROFILE) {
		} else if(value == PAGE_NAME_SCHEDULE) {
			url = "newSchedule";
		}
		
		var param = "profileId="+key;
		window.location.href = url+"?"+param;
	}
	
	function OnTabChange(userData, index) {
		g_taskSupport.outputGroupActiveIndex = index;
		g_taskSupport.UpdateOutputGroup(index);
	}

	function OnTabAdd(userData) {
		if(userData == JS_NEW_OUTPUT_GROUP_TRIGGER) {
			g_taskSupport.NewOutputGroup();
		} else if(userData == JS_COPY_OUTPUT_GROUP_TRIGGER) {
			if(g_taskSupport.outputGroupActiveIndex < 0) {
				g_taskSupport.NewOutputGroup();
			} else {
				g_taskSupport.CloneOutputGroup(g_taskSupport.outputGroupActiveIndex);
			}
		}
		
	}

	function OnTabRemove(userData, index) {
		g_taskSupport.DeleteOutputGroup(index);
	}

	function OnOutputFileView(key) {
		$(g_OutputFileViewOwner).find(JS_OUTPUT_GROUP_URI).val(key);
	}

	function OnSaveAsProfile() {
		var o = {};
		o.name = g_SaveAsProfile.GetName();
		if(o.name == null || o.name.length == 0) {
			o.name = g_taskSupport.GetValueByJS(JS_NAME);
		} 
		o.description = g_SaveAsProfile.GetDescription();
		var xmlString = g_taskSupport.XMLProfile(o);
		
		var xmlDocument = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		xmlDocument += xmlString;
	
		var _requestURL = location.href.substring(0, location.href.lastIndexOf("/")+1);
		var _restURL = "api/profile";
		var _url = _requestURL + _restURL;
		httpPost(_url, xmlDocument, OnRestResponse);
	}
	
	function OnRestResponse() {
	}

	function OnNewStreamFromPreset(key) {
		if(key == null) return;
		
		var _url = "getPreset";
		var streamId = g_taskSupport.GenerateStreamId();
		var param = "presetId=" + key + "&preferStreamId=" + streamId;
		
		$.post(_url, param, function(data) {
			var domStream = $(data).filter(JS_STREAM).get(0);
			var streamSupport = g_taskSupport.AddStream(domStream);
			streamSupport.SetPresetList(g_taskSupport.presetList);
			streamSupport.SetLinkedPresetId(key);
		});
	}
	
	function ParsePresetList(data) {
		if(data == null) return null;
		var $data = $(data);
		var list = [];
		$(".Category", $data).each(function(j) {
			var cat = $("div", this).get(0).innerText;
			$(".Preset", this).each(function(i) {
				var o = {};
				o.key = $(".PresetId", this).text();
				o.value = cat + ": " + $(".PresetName", this).text();
				list.push(o);
			});
		});
		return list;
	};

	function OnInputReorder(domInput, mode) {
	};

	function OnInputRemove(domInput) {
	};
	
	function parseProfile(data) {
		var $data = $(parseDom(data));
		var arr = [];
		$("li", $data).each(function() {
			var o = {};
			o.value = $("div", this).get(0).innerText;
			o.key = $("div", this).get(1).innerText;
			arr.push(o);
		});
		return arr;
	};

	/* Callback function end */
}

TaskSupport.prototype = {
	getActionType : function() {
		return $(JS_ACTION_TYPE, this.dom).val();
	}
};