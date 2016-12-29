var JS_NEW_AUDIO_TRIGGER =".NewAudioTrigger";
var JS_NEW_VIDEO_TRIGGER =".NewVideoTrigger";
var JS_STREAM_ID ="input[name='StreamId']";
var JS_LINKED_PRESET = "select[name='LinkedPreset']";
var JS_STREAM_EXPAND_TRIGGER = ".StreamExpandTrigger";
var JS_STREAM_EXPAND_TARGET = ".StreamExpandTarget";
var JS_STREAM_EXPAND_ICON = ".StreamExpandIcon";
var JS_DELETE_STREAM_TRIGGER = ".DeleteStreamTrigger";
var JS_PREVIEW_TRIGGER = ".PreviewTrigger";

function StreamSupport() {
	var FIELD_PRESET_ID = "presetId";
	
	var SUBMIT_TYPE_TASK ="task";
	var SUBMIT_TYPE_PRESET ="preset";
	var MAX_COUNT_VIDEOS = 1;
	
	this.dom = null;
	this.submitType = SUBMIT_TYPE_TASK;
	this.videoArray = [];
	this.audioArray = [];
	
	var fieldMap = [
		{key: FIELD_ID, value: JS_STREAM_ID},
		{key: FIELD_PRESET_ID, value: JS_LINKED_PRESET}
	];
	
	this.prefixField = "";
	this.myField = FIELD_STREAM;
	this.fieldIndex = null;
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Create = function(domTask, id, container) {
		this.container = container;
		var $template = $(JS_STREAM_TEMPLATE);
		if($template.length == 0) return null;
		
		var $task = $(domTask);
		var	pilot = $(JS_STREAM_FLOCK, $task).last();
		if(pilot.length == 0) return null;
		
		var $stream = $template.clone();
		$stream.show();
		$(JS_STREAM_ID, $stream).val(id);
		pilot.append($stream.get(0));
		
		this.dom = $stream.get(0);
		
		var videoSupport = new VideoSupport();
		videoSupport.Create(this.dom, this.container);
		videoSupport.SetStream(this);
		this.videoArray.push(videoSupport);
		
		var audioSupport = new AudioSupport();
		audioSupport.Create(this.dom, this.container);
		audioSupport.SetStream(this);
		var list = g_taskSupport.GetAudioJoinedList();
		audioSupport.SetJoinedList(list);
		this.audioArray.push(audioSupport);

		this.UpdateVideoAudioUI();
		
		this.ReorderVideo();
		this.ReorderAudio();
		
		this.UpdateStreamSummary();
		this.updateByActionType();
		this.Bind();
		
		return this.dom;
	};
	
	this.Init = function(dom, container) {
		var context = this;
		this.container = container;
		this.SetDOM(dom);
		this.LicenseControl();
		
		//initialize video
		$(JS_VIDEO_DESCRIPTION, this.dom).each(function(i){
			var videoSupport = new VideoSupport();
			videoSupport.Init(this, context.container);
			videoSupport.SetStream(context);
			context.videoArray.push(videoSupport);
		});
		
		//initialize audio
		$(JS_AUDIO_DESCRIPTION, this.dom).each(function(i){
			var audioSupport = new AudioSupport();
			audioSupport.Init(this, context.container);
			audioSupport.SetStream(context);
			
			var list = g_taskSupport.GetAudioJoinedList();
			audioSupport.SetJoinedList(list);
			
			context.audioArray.push(audioSupport);
		});

		this.UpdateVideoAudioUI();
		
		this.ReorderVideo();
		this.ReorderAudio();
		
		this.UpdateStreamSummary();
		this.updateByActionType();
		this.Bind();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.OUTPUT_PREVIEW) != license.ENABLED) {
			$(JS_PREVIEW_TRIGGER, this.dom).remove();
		}
	};

	this.Clean = function() {
		this.videoArray = [];
		this.audioArray = [];
		$(this.dom).remove();
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_SAVE_AS_PRESET, this.dom).click(function() {
			g_SaveAsPreset.Show();
			g_SaveAsPresetStream = context;
			g_SaveAsPreset.SetOnOK(OnSaveAsPreset);
		});
		
		$(JS_NEW_AUDIO_TRIGGER, this.dom).click(function() {
			context.NewAudio();
		});
		
		$(JS_NEW_VIDEO_TRIGGER, this.dom).click(function() {
			context.NewVideo();
		});
		
		$(JS_LINKED_PRESET, this.dom).change(function() {
			context.OnLinkedPresetChange();
		});
		
		$(JS_DELETE_STREAM_TRIGGER, this.dom).click(function() {
			g_taskSupport.DeleteStream(context.GetId());
		});
		
		$(JS_PREVIEW_TRIGGER, this.dom).click(function() {
			context.ShowPreview();
		});
		
		//this.BindExpand();
		$(".VideoAudioTabItem", this.dom).click(function() {
			context.clickVideoAudioTab(this);
		});
		
		//$("#VideoFlock", this.dom).click();
		
	};
	
	this.BindExpand = function() {
		var $dom = $(this.dom);
		
		var o2 = {};
		o2.$trigger = $dom.find(JS_STREAM_EXPAND_TRIGGER);
		o2.$icon = $dom.find(JS_STREAM_EXPAND_ICON);
		o2.$target = $dom.find(JS_STREAM_EXPAND_TARGET);
		o2.expand = false;
		uBindExpand(o2);
	};
	
	this.SetIndex = function(index) {
		$(JS_STREAM_INDEX, this.dom).text(index);
	};
	
	this.GetIndex = function() {
		var index = $(JS_STREAM_INDEX, this.dom).text();
		index = parseInt(index);
		return index;
	};
	
	this.ActiveVideoPolicy = function(bActive) {
		if(this.videoArray != null) {
			for(var i = 0; i < this.videoArray.length; i++) {
				var video = this.videoArray[i];
				video.ActivePolicy(bActive);
			}
		}
	};
	
	this.HasPassThrough = function() {
		for(var i = 0; i < this.videoArray.length; i++) {
			var video = this.videoArray[i];
			if(video.GetPassThrough()) {
				return true;
			}
		}
		
		for(var i = 0; i < this.audioArray.length; i++) {
			var audio = this.audioArray[i];
			if(audio.GetPassThrough()) {
				return true;
			}
		}
		
		return false;
	};
	
	this.OnLinkedPresetChange = function() {
		var presetId = $(JS_LINKED_PRESET, this.dom).val();
		if(presetId == null || presetId == LINKED_PRESET_ID_NONE) return;
		
		g_taskSupport.ReplaceStream(this, presetId);
	};
	
	this.Clone = function(container) {
		var $stream = $(this.dom);
		var $newStream = $stream.clone();
		var $selectArr = $stream.find('select');
		var $newSelectArr = $newStream.find('select');
		var len = $selectArr.length;
		
		for(var i = 0; i < len; i++) {
			var value = $selectArr.eq(i).val();
			$newSelectArr.eq(i).val(value);
		}
		
		var newStreamSupport = new StreamSupport();
		newStreamSupport.Init($newStream[0], container);
		
		return newStreamSupport;
	};
	
	this.ShowPreview = function() {
		if(this.videoArray.length == 0) return;
		var videoSupport = this.videoArray[0];
		videoSupport.ShowPreview();
	};
	
	this.GetId = function() {
		var id = $(JS_STREAM_ID, this.dom).val();
		return id;
	};
	
	this.SetId = function(id) {
		$(JS_STREAM_ID, this.dom).val(id);
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.IsMatchConainer = function(container) {
		for(var i = 0; i < this.videoArray.length; i++) {
			var codec = this.videoArray[i].GetCodec();
			var supportList = outputGroupData.GetContainerVideo(container);
			if(!supportList.contains(codec)){
				return false;
			}
		} 
		for(var i = 0; i < this.audioArray.length; i++) {
			var codec = this.audioArray[i].GetCodec();
			var supportList = outputGroupData.GetContainerAudio(container);
			if(!supportList.contains(codec)){
				return false;
			}
		} 
		return true;		
	};

	/*used in cloud transcoder, cannot delete*/	
	this.UpdateContainer = function(container) {
		this.container = container;
		for(var i = 0; i < this.videoArray.length; i++) {
			this.videoArray[i].UpdateContainer(this.container);
		} 
		for(var i = 0; i < this.audioArray.length; i++) {
			this.audioArray[i].UpdateContainer(this.container);
		} 	

		this.UpdateVideoAudioUI();
		this.ReorderVideo();
		
	};

	this.UpdateVideoAudioUI = function() {
		$("#VideoFlock.VideoAudioTabItem", this.dom).parent().show();
		$("#VideoFlock.VideoAudioTabItem", this.dom).addClass("UnderLineTab_Active");
		$(".VideoFlock.VideoAudioTabContent", this.dom).show();
		$("#AudioFlock.VideoAudioTabItem", this.dom).removeClass("UnderLineTab_Active");
		$(".AudioFlock.VideoAudioTabContent", this.dom).hide();

		if(this.container != undefined) {	
			var szVideoArray = outputGroupData.GetContainerVideo(this.container);
			if(szVideoArray.length == 0) {
				var len = this.videoArray.length;
				for(var i = 0; i < len; i++) {
					this.videoArray[i].Delete();
				}
				this.videoArray.length = 0;		
				$("#VideoFlock.VideoAudioTabItem", this.dom).removeClass("UnderLineTab_Active");
				$(".VideoFlock.VideoAudioTabContent", this.dom).hide();
				$("#VideoFlock.VideoAudioTabItem", this.dom).parent().hide();
				
				$("#AudioFlock.VideoAudioTabItem", this.dom).addClass("UnderLineTab_Active");
				$(".AudioFlock.VideoAudioTabContent", this.dom).show();
			} else{
				if(this.videoArray.length == 0){
					this.NewVideo();
				}	
			}
		} 		
	};
	//end
	this.NewVideo = function() {
		var videoSupport = new VideoSupport();
		videoSupport.Create(this.dom, this.container);
		videoSupport.SetStream(this);
		this.videoArray[this.videoArray.length] = videoSupport;
		this.ReorderVideo();
		this.UpdateSummary();
		this.OnInfoChange();
		
		//active video tab
		$("#VideoFlock", this.dom).click();
	};
	
	this.DeleteVideo = function(videoSupport) {
		var bFound = false;
		var len = this.videoArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.videoArray[i-1] = this.videoArray[i]; 
			} else {
				var pilot = this.videoArray[i];
				if(videoSupport == pilot) {
					videoSupport.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.videoArray.length--;
		}
		
		this.ReorderVideo();
		this.UpdateSummary();
		this.OnInfoChange();
	};
	
	this.ReorderVideo = function() {
		if(this.container != undefined &&  outputGroupData.GetContainerVideo(this.container).length == 0) {
			$(this.dom).find(JS_NEW_VIDEO_TRIGGER).hide();			
		} else{
			if(this.videoArray.length >= MAX_COUNT_VIDEOS) {
				$(this.dom).find(JS_NEW_VIDEO_TRIGGER).hide();
			} else {
				$(this.dom).find(JS_NEW_VIDEO_TRIGGER).show();
			}
		}
	};
	
	this.GetVideo = function() {
		return this.videoArray[0];
	};
	
	this.GetAudio = function(index) {
		if(index == null) index = 0;
		return this.audioArray[index];
	};
	
	this.NewAudio = function() {
		var audioSupport = new AudioSupport();
		audioSupport.Create(this.dom, this.container);
		audioSupport.SetStream(this);
		var list = g_taskSupport.GetAudioJoinedList();
		audioSupport.SetJoinedList(list);
		
		this.audioArray.push(audioSupport);
		this.ReorderAudio();
		this.UpdateSummary();
		this.UpdateExpandId();
		this.OnInfoChange();
		
		//active audio tab
		$("#AudioFlock", this.dom).click();
	};
	
	this.UpdateAudioJoinedList = function(list) {
		for(var i = 0; i < this.audioArray.length; i++) {
			var audio = this.audioArray[i];
			audio.SetJoinedList(list);
		}
	};
	
	/**
	 * Set expandDiv's id and outputExpand_Trigger's target 
	 */
	this.UpdateExpandId = function(){
		var $dom = $(this.dom);
		var lastAudioDescription =  $dom.find(".AudioDescription").last();
		var triggerNode = lastAudioDescription.find(".outputExpand_Trigger");
		var expandNode = lastAudioDescription.children("div").last();
		var curTarget = triggerNode.attr('target');
		var id = curTarget + "_" + this.audioArray.length;
		triggerNode.attr('target', id);
		expandNode.attr('id', id);
		
	};
	
	this.DeleteAudio = function(audioSupport) {
		var bFound = false;
		var len = this.audioArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.audioArray[i-1] = this.audioArray[i]; 
			} else {
				var pilot = this.audioArray[i];
				if(audioSupport == pilot) {
					audioSupport.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.audioArray.length--;
		}
		
		this.ReorderAudio();
		this.UpdateSummary();
		this.OnInfoChange();
	};
	
	this.ReorderAudio = function() {
		var len = this.audioArray.length;
		for(var i = 0; i < len; i++) {
			var audioSupport = this.audioArray[i];
			audioSupport.SetIndex(i);
		}
		
		if(len >= MAX_COUNT_AUDIO) {
			$(JS_NEW_AUDIO_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_AUDIO_TRIGGER, this.dom).show();
		}
	};
	
	this.Delete = function() {
		var i = 0;
		
		var len = this.videoArray.length;
		for(i = 0; i < len ; i++) {
			var videoSupport = this.videoArray[i];
			videoSupport.Delete();
		}
		this.videoArray.length = 0;
		
		len = this.audioArray.length; 
		for(i = 0; i < len ; i++) {
			var audioSupport = this.audioArray[i];
			audioSupport.Delete();
		}
		this.audioArray.length = 0;
		
		$(this.dom).remove();
	};
	
	this.SetPresetList = function(presetList) {
		var domPL = $(JS_LINKED_PRESET, this.dom).get(0);
		uUpdateSelect(domPL, presetList);
	};
	
	this.SetLinkedPresetId = function(linkedPresetId) {
		if(this.HasPassThrough()) {
			linkedPresetId = LINKED_PRESET_ID_NONE;
		}
		$(JS_LINKED_PRESET, this.dom).val(linkedPresetId);
	};
	
	this.FormatText = function() {
		var text = "";
		var videoText = null;
		var audioText = null;
		
		var videoSupport = this.videoArray[0];
		if(videoSupport != null) {
			videoText = videoSupport.FormatText();
		}
		if(videoText != null && videoText.length > 0) {
			text += videoText;
		}
		
		//audio
		var audioSupport = this.audioArray[0];
		if(audioSupport != null) {
			audioText = audioSupport.FormatText();
		}
		if(audioText != null && audioText.length > 0) {
			if(text.length > 0) {
				text += " | ";
			}
			text += audioText;
		}
		
		if(text.length == 0) {
			text = str_warning.streamEmpty;
		}
		
		return text;
	};
	
	this.UpdateStreamSummary = function() {
		var summary = this.FormatText();
		$(JS_SUMMARY, this.dom).text(summary);
		g_taskSupport.UpdateStreamSummary(this, summary);
	};
	
	this.UpdateSummary = function() {
		this.UpdateStreamSummary();
	};
	
	this.OnMediaInfoChanged = function(mediaInfo) {
		for(var i = 0; i < this.videoArray.length; i++) {
			var videoSupport = this.videoArray[i];
			videoSupport.OnMediaInfoChanged(mediaInfo);
		}
		
		for(var i = 0; i < this.audioArray.length; i++) {
			var audioSupport = this.audioArray[i];
			audioSupport.OnMediaInfoChanged(mediaInfo);
		}
	};
	
	this.OnInputChanged = function(input) {
		for(var i = 0; i < this.videoArray.length; i++) {
			var videoSupport = this.videoArray[i];
			videoSupport.OnInputChanged(input);
		}
		
		for(var i = 0; i < this.audioArray.length; i++) {
			var audioSupport = this.audioArray[i];
			audioSupport.OnInputChanged(input);
		}
	};
	
	this.OnInfoChange = function() {
		$(JS_LINKED_PRESET, this.dom).val(LINKED_PRESET_ID_NONE);
	};
	
	/* XML submit */
	this.GetValueByJS = function(selector) {
		return $(selector, this.dom).val();
	};
	
	this.XML = function(xml) {
		var value = null;
		
		xml.BeginNode(TAG_STREAM);
		
		if(this.submitType == SUBMIT_TYPE_TASK) {
			value = this.GetValueByJS(JS_STREAM_ID);
			xml.Attrib(TAG_ID, value);
			
			value = this.GetValueByJS(JS_LINKED_PRESET);
			xml.Attrib(TAG_PRESET_ID, value);
		}
		
		//video
		var i = 0;
		var len = this.videoArray.length;
		for(i = 0; i < len; i++) {
			var videoSupport = this.videoArray[i];
			videoSupport.XML(xml);
		}
		
		//audio
		len = this.audioArray.length;
		for(i = 0; i < len; i++) {
			var audioSupport = this.audioArray[i];
			audioSupport.XML(xml);
		}
		
		xml.EndNode();
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
		
		//video
		var len = this.videoArray.length;
		for(var i = 0; i < len; i++) {
			var videoSupport = this.videoArray[i];
			videoSupport.SetPrefixField(fullField);
			videoSupport.UpdateElementName();
		}
		
		//audio
		len = this.audioArray.length;
		for(var i = 0; i < len; i++) {
			var audioSupport = this.audioArray[i];
			audioSupport.SetPrefixField(fullField);
			audioSupport.SetFieldIndex(i);
			audioSupport.UpdateElementName();
		}
	};
	/* Field operate end */
	
	/*static function*/
	function OnSaveAsPreset() {
		var name = g_SaveAsPreset.GetName();
		var description = g_SaveAsPreset.GetDescription();
		var category = g_SaveAsPreset.GetCategory();
		
		var xml = new XMLWriter();
		xml.BeginNode(TAG_PRESET);
		xml.Node(TAG_NAME, name);
		xml.Node(TAG_DESCRIPTION, description);
		xml.Node(TAG_CATEGORY, category);
		
		//stream
		var streamSupport = g_SaveAsPresetStream;
		streamSupport.submitType = SUBMIT_TYPE_PRESET;
		streamSupport.XML(xml);
		streamSupport.submitType = SUBMIT_TYPE_TASK;
		
		xml.EndNode();
		xml.Close();
		
		var xmlDocument = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
		xmlDocument += xml.ToString();
	
		var _requestURL = location.href.substring(0, location.href.lastIndexOf("/")+1);
		var _restURL = "api/preset";
		var _url = _requestURL + _restURL;
		httpPost(_url, xmlDocument, function() {
			g_taskSupport.RequestPresetList();
		});
	}
};

StreamSupport.prototype = {
	show : function() {
		$(this.dom).show();
	},
	
	hide : function() {
		$(this.dom).hide();
	},
	
	updateByActionType : function() {
		var arr = [];
		arr[0] = $(JS_SAVE_AS_PRESET, this.dom);
		arr[1] = $(JS_NEW_AUDIO_TRIGGER, this.dom);
		if(g_taskSupport != null) {
			var taskAction = g_taskSupport.getActionType();
			if(taskAction == "runtime") {
				for(var i = 0; i < arr.length; i++) {
					arr[i].hide();
				}
			}
		}
	},
	
	getTotalBitrate : function() {
		var totalBitrate = 0;
		
		if(this.videoArray.length > 0) {
			totalBitrate += parseFloat(this.videoArray[0].getBitrate());
		}
		
		for(var i = 0; i < this.audioArray.length; i++) {
			totalBitrate += parseFloat(this.audioArray[i].getBitrate());
		}
		
		return totalBitrate;
	},
	
	clickVideoAudioTab : function(clickedDom) {
		$(".VideoAudioTabItem", this.dom).each(function() {
			if(clickedDom == this) {
				$(this).addClass("UnderLineTab_Active");
			}
			else {
				$(this).removeClass("UnderLineTab_Active");
			}
		});
		
		$(".VideoAudioTabContent", this.dom).each(function() {
			if($(this).hasClass(clickedDom.id)) {
				$(this).show();
			}
			else {
				$(this).hide();
			}
		});
	},
};

/*used in cloud transcoder, cannot delete*/
Array.prototype.contains = function(item){
    for(var i = 0; i < this.length; i++){
        if(this[i] == item){return true;}
    }
    return false;
};