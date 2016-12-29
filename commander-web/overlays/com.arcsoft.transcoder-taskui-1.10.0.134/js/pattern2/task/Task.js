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
		{key: FIELD_FILL_ON_STREAM_LOST, value: JS_FILL_ON_STREAM_LOST},
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
	this.streamTab = new StreamTab();
	this.outputGroupTab = new StreamTab();
	this.outputGroupDescIndex = 0;
	this.nameEdited = false;
	
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
		dom = g_SubtitleFileView.Init("SubtitleFileView");
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
		title = str_common.save_as_scene;
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

		$(JS_OUTPUT_GROUP, this.dom).each(function(i) {
			var outputGroupSupport = new OutputGroupSupport();
			outputGroupSupport.Init(this);
			var desc = outputGroupSupport.getDescription();
			if(desc == null || desc.length == 0) {
				desc = context.getOutputGroupDescription();
				outputGroupSupport.setDescription(desc);
			}
			context.outputGroupArray[i] = outputGroupSupport;
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
		
		this.UpdateNewOutputGroupTrigger();
		this.SortInput();
		
		var tmpl = JS_STREAM_TAB_ITEM_TMPL;
		if(this.getActionType() == "runtime") {
			tmpl = JS_STREAM_TAB_ITEM_TMPL2;
		}
		this.streamTab.init($(".StreamTab", this.dom).get(0), tmpl);
		this.streamTab.setOnTabSelected(function(streamTab, index) {
			context.onStreamTabSelected(streamTab, index);
		});
		this.streamTab.setOnTabTrigger(function(streamTab, index, triggerId) {
			context.onStreamTabTrigger(streamTab, index, triggerId);
		});
		this.UpdateStreamTab(0);
		
		tmpl = JS_STREAM_TAB_ITEM_TMPL3;
		if(this.getActionType() == "runtime") {
			tmpl = JS_STREAM_TAB_ITEM_TMPL4;
		}
		this.outputGroupTab.init($(".OutputGroupTab", this.dom).get(0), tmpl);
		this.outputGroupTab.setOnTabSelected(function(tab, index) {
			context.onOutputGroupTabSelected(tab, index);
		});
		this.outputGroupTab.setOnTabChecked(function(tab, index, bChecked) {
			context.onOutputGroupTabChecked(tab, index, bChecked);
		});
		this.outputGroupTab.setOnTabTrigger(function(tab, index, triggerId) {
			context.onOutputGroupTabTrigger(tab, index, triggerId);
		});
		this.UpdateOutputGroupTab(0);
		
		this.RequestGpuCount();
		this.RequestPresetList();
		this.updateByActionType();
		
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
		
		if(GetLicense(license.FILL_ON_STREAM_LOST) != license.ENABLED) {
			$(JS_LICENSE_FILL_ON_STREAM_LOST, this.dom).hide();
		}
		
		if(GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_MAL) {
			$(".LicenseDescription", this.dom).hide();
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
			var fromUri = $(".FromUri", context.dom).val();
			if(fromUri != null && fromUri.length > 0) {
				window.location.href = fromUri;
			}
			else {
				history.back();
			}
		});
		
		$(JS_SAVE_AS_PROFILE).click(function() {
			g_SaveAsProfile.Show();
		});
		
		$(JS_NEW_OUTPUT_GROUP_TRIGGER, this.dom).click(function() {
			//g_OutputGroupTab.SetUserData(JS_NEW_OUTPUT_GROUP_TRIGGER);
			//g_OutputGroupTab.AddItem();
			context.NewOutputGroup();
		});
		
		$(JS_COPY_OUTPUT_GROUP_TRIGGER, this.dom).click(function() {
			//g_OutputGroupTab.SetUserData(JS_COPY_OUTPUT_GROUP_TRIGGER);
			//g_OutputGroupTab.AddItem();
			var index = context.outputGroupTab.getSelected();
			if(index == null) {
				context.NewOutputGroup();
			}
			else {
				context.CloneOutputGroup(index);
			}
		});
		
		$(".DeleteOutputGroupTrigger", this.dom).click(function() {
			var index = context.outputGroupTab.getSelected();
			if(index != null) {
				context.DeleteOutputGroup(index);
			}
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
		
		$(".TaskTabItem", this.dom).click(function() {
			context.OnTaskTabClick(this);
		});
		$("#TaskTabBaseInfo", this.dom).click();	//high light tab;
		
		$(".DeleteStreamTrigger", this.dom).click(function() {
			context.DeleteActiveStream();
		});
		
		$(".OutptutPreviewTrigger", this.dom).click(function() {
			context.OutputPreview();
		});
		
		$(".ApplyTaskTrigger", this.dom).click(function() {
			context.ApplyTask();
		});
		
		$(JS_NAME, this.dom).change(function() {
			context.nameEdited = true; 
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

	/*used in OutputGroup.js for cloud transcoder, cannot delete*/
	this.UpdateNewOutputTrigger = function(){
	}
	
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
		var name = input.getUriAsName();
		var $name = $(JS_NAME, this.dom);
		var taskAction = this.getActionType();
		if(taskAction == "save" && !this.nameEdited) {
			$name.val(name);
		}
		
		var len = this.streamArray.length;
		for(var i = 0; i < len; i++) {
			var streamSupport = this.streamArray[i];
			streamSupport.OnInputChanged(input);
		}
	};
	
	this.GetPageName = function() {
		return $(JS_PAGE_NAME, this.dom).val();
	};
	
	this.GetGUID = function() {
		return $(JS_GUID, this.dom).val();
	};
	
	this.GetValueByJS = function(selector) {
		var value = null;
		var $sel = $(selector, this.dom);
		if($sel.attr('type') == "checkbox") {
			var checkVal = $sel.val();
			if(checkVal == "on") {
				if($sel.get(0).checked) {
					value = ENABLE_TRUE;
				} else {
					value = ENABLE_FALSE;
				}
			}
			else {
				if($sel.get(0).checked) {
					value = checkVal;
				} else {
					value = null;
				}
			}
		}
		else {
			value = $sel.val();
		}
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
		this.UpdateStreamList(streamSupport);
		
		if(this.streamArray.length == 1) {
			this.UpdateStreamTab(0);
		}
		else {
			this.UpdateStreamTab();
		}
		
		return streamSupport;
	};
	
	this.NewStream = function() {
		var streamSupport = new StreamSupport();
		var streamId = this.GenerateStreamId();
		streamSupport.Create(this.dom, streamId);
		streamSupport.SetPresetList(this.presetList);
		this.streamArray[this.streamArray.length] = streamSupport;
		this.SortStream();
		this.UpdateStreamList(streamSupport);
		
		if(this.streamArray.length == 1) {
			this.UpdateStreamTab(0);
		}
		else {
			this.UpdateStreamTab();
		}
		
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
	
	this.UpdateStreamList = function(activeItem) {
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
		this.UpdateStreamList(this.streamArray[0]);
		this.UpdateStreamTab(0);
	};
	
	this.DeleteStreamByIndex = function(index) {
		if(index >=  this.streamArray.length) {
			return;
		}
		
		var stream = this.streamArray[index];
		var id = stream.GetId();
		
		if(this.IsUsedStream(id)) {
			alert(str_stream.stream_is_used);
			return;
		}
		
		stream.Delete();
		this.streamArray.splice(index, 1);

		this.SortStream();
		
		if(index < this.streamArray.length) {
			this.UpdateStreamList(this.streamArray[index]);
		}
		else {
			this.UpdateStreamList();
		}
		
		this.UpdateStreamTab(0);
	};
	
	this.CloneStream = function(streamId) {
		var streamSupport = this.GetStream(streamId);
		var newStreamSupport = streamSupport.Clone();
		this.RestoreStream(newStreamSupport.dom);
		var streamId = this.GenerateStreamId();
		newStreamSupport.SetId(streamId);
		this.streamArray[this.streamArray.length] = newStreamSupport;
		this.SortStream();
		this.UpdateStreamList(newStreamSupport);
		this.UpdateStreamTab();
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
			//o.value= str_stream.stream + "-" + index;
			o.value = stream.FormatText();
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
		
		var desc = this.getOutputGroupDescription();
		outputGroupSupport.setDescription(desc);
		
		this.outputGroupArray.push(outputGroupSupport);
		this.UpdateNewOutputGroupTrigger();
		
		if(this.outputGroupArray.length == 1) {
			this.UpdateOutputGroupTab(0);
		}
		else {
			this.UpdateOutputGroupTab();
		}
		
		return outputGroupSupport;
	};
	
	this.CloneOutputGroup = function(index) {
		var outputGroup = this.outputGroupArray[index];
		var newOutputGroup = outputGroup.Clone();
		this.outputGroupArray.push(newOutputGroup);
		$(JS_OUTPUT_GROUP_FLOCK, this.dom).append(newOutputGroup.dom);
		
		this.UpdateNewOutputGroupTrigger();
		
		this.UpdateOutputGroupTab();
		
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
		this.UpdateNewOutputGroupTrigger();
		
		if(index < this.outputGroupArray.length) {
			this.UpdateOutputGroupTab();
		}
		else {
			this.UpdateOutputGroupTab(0);
		}
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
		this.UpdateOutputGroupTab();
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
	
	this.ParseGpuId = function(data) {
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
	
	this.RequestGpuCount = function() {
		var _url = "getGpuCount";
		var param = {};
		
		var context = this;
		if(g_params_getMediaFileInfo != null) {
			$.extend(param, param, g_params_getMediaFileInfo);
		}
		$.post(_url, param, function(data) {
			context.ParseGpuId(data);
		}, "html");
	};

	this.UpdatePresetList = function(data) {
		var $presetListData = $(JS_PRESET_LIST_DATA);
		$presetListData.after(data);
		$presetListData.remove();
		
		this.presetList = ParsePresetList(data);
		var o = {};
		o.key = LINKED_PRESET_ID_NONE;
		o.value = str_output.custom;
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
			g_LineSelector.setTitle(str_common.import_scene);
			g_LineSelector.setOnSelected(OnNewStreamFromPreset);
			g_LineSelector.show();
		});
	};
	
	this.XML = function(xml) {
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

		value = this.GetValueByJS(JS_FILL_ON_STREAM_LOST);
		xml.BeginNode(TAG_GLOBAL_CODEC_SETTING);
		if(value != null) {
			xml.Node(TAG_FILL_ON_STREAM_LOST, value);
		}
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
	}

	/**
	 * @param o - {name: , description: }
	 */
	this.XMLProfile = function(o) {
		var xml = new XMLWriter();
		xml.BeginNode(TAG_PROFILE);
		
		xml.Node(TAG_NAME, o.name);
		xml.Node(TAG_DESCRIPTION, o.description);
		
		this.XML(xml);
		
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
	OnTaskTabClick : function(dom) {
		$(".TaskTabItem", this.dom).each(function() {
			if(this == dom) {
				$(this).addClass("task_tab_item_active");
			}
			else {
				$(this).removeClass("task_tab_item_active");
			}
		});
		
		$(".TaskTabGap", this.dom).each(function() {
			var $prev = $(this).prev();
			var $next = $(this).next();
			
			var img = "task_tab_img3";
			if($prev.hasClass("task_tab_item_active")) {
				img = "task_tab_img2";
			}
			else if($next.hasClass("task_tab_item_active")) {
				img = "task_tab_img1";
			}
			
			$(this).removeClass("task_tab_img1").removeClass("task_tab_img2").removeClass("task_tab_img3").addClass(img);
		})
		
		var id = dom.id;
		$(".TaskTabContent", this.dom).each(function() {
			if($(this).hasClass(id)) {
				$(this).show();
			}
			else {
				$(this).hide();
			}
		});
	},

	UpdateStreamTab : function(selectedIndex) {
		var oldSelected = this.streamTab.getSelected();
		this.streamTab.clear();
		
		for(var i = 0; i < this.streamArray.length; i++) {
			var stream = this.streamArray[i];
			var info = {};
			info.userdata = stream;
			info.label = stream.FormatText();
			this.streamTab.addItem(info);
		}
		
		if(selectedIndex == null) {
			selectedIndex = oldSelected;
		}
		
		this.streamTab.select(selectedIndex);
	},

	onStreamTabSelected : function(streamTab, index) {
		var info = streamTab.getInfo(index);
		
		for(var i = 0; i < this.streamArray.length; i++) {
			var stream = this.streamArray[i];
			if(stream == info.userdata) {
				stream.show();
			}
			else {
				stream.hide();
			}
		}
	},
	
	onStreamTabTrigger : function(streamTab, index, triggerId) {
		if(triggerId == "DeleteTrigger") {
			this.DeleteStreamByIndex(index);
		}
		else if(triggerId == "PlayTrigger") {
			this.OutputPreview();
		}
	},
	
	UpdateStreamSummary : function(stream, text) {
		this.UpdateStreamList();
		this.UpdateStreamTab();
	},
	
	
	UpdateOutputGroupDescription : function(outputGroupSupport) {
		for(var i = 0; i < this.outputGroupArray.length; i++) {
			var pilot = this.outputGroupArray[i];
			if(outputGroupSupport == pilot) {
				var tabInfo = this.outputGroupTab.getInfo(i);
				var desc = outputGroupSupport.getDescription();
				if(desc == null || desc.length == 0) {
					desc = this.getOutputGroupDescription();
					outputGroupSupport.setDescription(desc);
				}
				tabInfo.label = desc;
				this.outputGroupTab.setInfo(i, tabInfo);
				break;
			}
		}
	},
	
	DeleteActiveStream : function() {
		var index = this.streamTab.getSelected();
		this.DeleteStreamByIndex(index);
	},
	
	OutputPreview : function() {
		var index = this.streamTab.getSelected();
		var stream = this.streamArray[index];
		if(stream != null) {
			stream.ShowPreview();
		}
	},
	
	UpdateOutputGroupTab : function(selected) {
		var oldSelected = this.outputGroupTab.getSelected();
		
		this.outputGroupTab.clear();
		
		for(var i = 0; i < this.outputGroupArray.length; i++) {
			var item = this.outputGroupArray[i];
			var info = {};
			info.userdata = item;
			var desc = item.getDescription();
			if(desc != null && desc.length > 0) {
				info.label = desc;
			}
			else {
				info.label = str_output.outputgroup_setting;
			}
			
			var active = item.GetActive();
			if(active == "0") {
				info.checkbox_checked = false;
			}
			else {
				info.checkbox_checked = true;
			}
			
			var outputGroup = item.GetGroupType();
			var support = outputGroupData.getRuntimeSupport(outputGroup);
			if(support) {
				info.checkbox_disabled = false;
			}
			else {
				info.checkbox_disabled = true;
			}
			
			this.outputGroupTab.addItem(info);
		}
		
		if(selected == null) {
			selected = oldSelected;
		}
		
		this.outputGroupTab.select(selected);
	},
	
	onOutputGroupTabSelected : function(tab, index) {
		var info = tab.getInfo(index);
		
		for(var i = 0; i < this.outputGroupArray.length; i++) {
			var outputGroup = this.outputGroupArray[i];
			if(outputGroup == info.userdata) {
				outputGroup.show();
			}
			else {
				outputGroup.hide();
			}
		}
	},
	
	onOutputGroupTabChecked : function(tab, index, bChecked) {
		var outputGroup = this.outputGroupArray[index];
		var active = "1";
		if(!bChecked) {
			active = "0";
		}
		outputGroup.SetActive(active);
	},
	
	onOutputGroupTabTrigger : function(tab, index, triggerId) {
		if(triggerId == "DeleteTrigger") {
			this.DeleteOutputGroup(index);
		}
	},
	
	ApplyTask : function() {
		var context = this;
		var o = {};
		var xmlString = this.XMLTask();
		
		var xmlDocument = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		xmlDocument += xmlString;
	
		var id = $(JS_ID, this.dom).val();
		
		var url = "setRuntimeTask";
		var param = {"taskId" : id, "xml" : xmlDocument};
		
		if(g_params_setRuntimeTask != null) {
			$.extend(param, param, g_params_setRuntimeTask);
		}
		
		$.post(url, param, function(data) {
			var $data = $(data);
			if($data.length > 0 && $data.text() == "success") {
				alert(str_common.apply_success);
			}
			else {
				alert(str_common.apply_failed);
			}
		});
	},
	
	responseApply : function(xml) {
		var a = xml;
	},
	
	getOutputGroupDescription : function() {
		if(this.outputGroupDescIndex > 0) {
			this.outputGroupDescIndex++;
		}
		else {
			var index = 0;
			for(var i = 0; i < this.outputGroupArray.length; i++) {
				var desc = this.outputGroupArray[i].getDescription();
				var regExp = new RegExp("^" + str_output.outputgroup_setting + "\\d+$");
				var matchArr = desc.match(regExp);
				if(matchArr != null && matchArr.length == 1) {
					var num = parseInt(matchArr[0].replace(str_output.outputgroup_setting, ""));
					if(!isNaN(num) && index < num) {
						index = num;
					}
				}
			}
			
			index++;
			this.outputGroupDescIndex = index;
		}
		
		return str_output.outputgroup_setting + this.outputGroupDescIndex.toString();
	},
	
	onTotalBitrateChange : function() {
		for(var i = 0; i < this.outputGroupArray.length; i++) {
			this.outputGroupArray[i].onTotalBitrateChange();
		}
	},
	
	XMLTask : function()  {
		var xml = new XMLWriter();
		xml.BeginNode(TAG_TASK);
		
		var id = $(JS_ID, this.dom).val();
		xml.Attrib(TAG_ID, id);
		
		var taskFlag = "124";
		xml.Node(TAG_TASK_FLAG, taskFlag);
		
		var name = $(JS_NAME, this.dom).val();
		xml.Node(TAG_NAME, name);
		var description = $(JS_DESCRIPTION, this.dom).val();
		xml.Node(TAG_DESCRIPTION, description);
		
		this.XML(xml);
		
		xml.EndNode();
		
		xml.Close();
		return xml.ToString();
	},
	
	getActionType : function() {
		return $(JS_ACTION_TYPE, this.dom).val();
	},
	
	updateByActionType : function() {
		var $importProfileTrigger = $(JS_IMPORT_PROFILE, this.dom);
		var $profileTrigger = $(JS_SAVE_AS_PROFILE, this.dom);
		var $submitTrigger = $(JS_SUBMIT_TRIGGER, this.dom);
		var $applyTrigger = $(".ApplyTaskTrigger", this.dom);
		
		var pageName = this.GetPageName();
		var taskAction = this.getActionType();
		
		if(pageName == PAGE_NAME_TASK) {
			if(taskAction == "runtime") {
				$profileTrigger.hide();
				$submitTrigger.hide();
				$importProfileTrigger.hide();
				$(".TaskTitle", this.dom).text(str_task.runtime_setting);
			}
			else if(taskAction == "update") {
				$applyTrigger.hide();
				$importProfileTrigger.hide();
				$(".TaskTitle", this.dom).text(str_task.edit_task);
			}
			else if(taskAction == "save") {
				$applyTrigger.hide();
				$(".TaskTitle", this.dom).text(str_task.new_task);
			}
		}
		else if(pageName == PAGE_NAME_PROFILE) {
			if(taskAction == "update") {
				$applyTrigger.hide();
				$profileTrigger.hide();
				$importProfileTrigger.hide();
				$(".TaskTitle", this.dom).text(str_profile.edit_profile);
			}
			else if(taskAction == "save") {
				$applyTrigger.hide();
				$profileTrigger.hide();
				$importProfileTrigger.hide();
				$(".TaskTitle", this.dom).text(str_profile.new_profile);
			}
		} else if(pageName == PAGE_NAME_SCHEDULE) {
			
		}
	}
};