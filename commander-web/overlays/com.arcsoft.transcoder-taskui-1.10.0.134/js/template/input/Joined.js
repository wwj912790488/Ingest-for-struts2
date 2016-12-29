var JS_JOINED_ITEM =".JoinedItem";
var JS_JOINED_SETTING =".JoinedSetting";
var JS_JOINED_ITEM_LIST =".JoinedItemList";
var JS_NEW_JOINED_ITEM =".NewJoinedItemTrigger";
var JS_DELETE_JOINED_TRIGGER =".DeleteJoinedTrigger";
var JS_JOINED_INDEX =".JoinedIndex";
var JS_JOINED_MEDIA_INFO = ".JoinedMediaInfo";
var JS_OPEN_JOINED_TRIGGER = ".OpenJoinedTrigger";
var JS_PLAY_JOINED_TRIGGER = ".PlayJoinedTrigger";

var JS_JOINED_ID_GENERATOR = "input[name='JoinedIdGenerator']";
var JS_JOINED_ID = "input[name='JoinedId']";
var JS_JOINED_URI ="input[name='JoinedUri']";
var JS_JOINED_PROGRAM_ID = "select[name='JoinedProgramId']";
var JS_JOINED_AUDIO_TRACK_ID = "select[name='JoinedAudioTrackId']";
var JS_JOINED_SUBTITLE_ID = "select[name='JoinedSubtitleId']";
var JS_JOINED_AUDIO_CHANNEL_ID = "select[name='JoinedAudioChannelId']";
var JS_JOINED_PROGRAM_ID_DOWN = "input[name='JoinedProgramIdDown']";
var JS_JOINED_AUDIO_TRACK_ID_DOWN = "input[name='JoinedAudioTrackIdDown']";
var JS_JOINED_SUBTITLE_ID_DOWN = "input[name='JoinedSubtitleIdDown']";
var JS_JOINED_AUDIO_CHANNEL_ID_DOWN = "input[name='JoinedAudioChannelIdDown']";
var JS_JOINED_INPUT_TYPE = "input[name='JoinedInputType']";

var TAG_JOINED = "joined";

var FIELD_INPUT_BODY ="body";
var FIELD_ADDITIONAL_AUDIOS = "additionalAudios";
var FIELD_URI = "uri";
var FIELD_JOINED_INPUT_TYPE = "inputType";

var MAX_COUNT_JOINED_ITEM = 8;

function JoinedItem() {
	this.posting = false;
	this.timerId = null;
	this.mediaInfoParser = new MediaInfoParser();
	this.tsParser = new TSParser();
	this.mediaInfoControl = new MediaInfoControl();
	this.portParser = new MediaPortParser();
	this.controlDom = {};
	
	var tagMap = [
		{key: TAG_JOINED_INPUT_TYPE, value: JS_JOINED_INPUT_TYPE},
		{key: TAG_URI, value: JS_JOINED_URI},
		{key: TAG_INPUT_PROGRAM_ID, value: JS_JOINED_PROGRAM_ID},
  		{key: TAG_INPUT_AUDIO_TRACK_ID, value: JS_JOINED_AUDIO_TRACK_ID},
  		{key: TAG_INPUT_SUBTITLE_ID, value: JS_JOINED_SUBTITLE_ID},
  		{key: TAG_INPUT_AUDIO_CHANNEL_ID, value: JS_JOINED_AUDIO_CHANNEL_ID}
		];
	
	var fieldMap = [
		{key: FIELD_ID, value: JS_JOINED_ID},
		{key: FIELD_JOINED_INPUT_TYPE, value: JS_JOINED_INPUT_TYPE},
		{key: FIELD_URI, value: JS_JOINED_URI},
		{key: FIELD_PROGRAM_PROGRAM_ID, value: JS_JOINED_PROGRAM_ID},
  		{key: FIELD_PROGRAM_AUDIO_TRACK_ID, value: JS_JOINED_AUDIO_TRACK_ID},
  		{key: FIELD_PROGRAM_SUBTITLE_ID, value: JS_JOINED_SUBTITLE_ID},
  		{key: FIELD_PROGRAM_AUDIO_CHANNEL_ID, value: JS_JOINED_AUDIO_CHANNEL_ID}
		];
	
	this.prefixField = "";
	this.myField = FIELD_ADDITIONAL_AUDIOS;
	this.fieldIndex = null;
	
	this.dom = null;
	this.container = null;
	this.preview = null;
	
	this.Create = function(domParent, o) {
		var tmpl = JS_JOINED_ITEM_TMPL;
		if(o != null && o.container != null && o.container.getInputType() == INPUT_TYPE_SDI) {
			tmpl = JS_SDI_JOINED_ITEM_TMPL;
		}
		
		var $tmp = $(tmpl);
		if($tmp.length == 0) return null;
		
		var $clone = $tmp.clone();
		$(domParent).append($clone.get(0));
		
		this.Init($clone.get(0), o);
		return this.dom;
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Init = function(dom, o) {
		if(o != null){
			this.SetId(o.key);			
			this.SetUri(o.uri);
			this.SetContainer(o.container);
		}
		
		this.SetDOM(dom);
		this.licenseControl();
		this.Bind();
		
		this.controlDom.program = $(JS_JOINED_PROGRAM_ID, this.dom).get(0);
		this.controlDom.audio = $(JS_JOINED_AUDIO_TRACK_ID, this.dom).get(0);
		this.controlDom.subtitle = $(JS_JOINED_SUBTITLE_ID, this.dom).get(0);
		this.controlDom.audioChannel = $(JS_JOINED_AUDIO_CHANNEL_ID, this.dom).get(0);
		this.controlDom.brief = $(JS_JOINED_MEDIA_INFO, this.dom).get(0);		
		
		this.ClearSelected();
		this.mediaInfoControl.SetControlDom(this.controlDom);
		
		var inputType = this.getInputType();
		if(inputType == INPUT_TYPE_SDI) {
			$(".JoinedProgramLine", this.dom).hide();
		}
		
		this.RequestMediaInfo();
	};
	
	this.licenseControl = function() {
		if(GetLicense(license.INPUT_AUDIO_CHANNEL) != license.ENABLED) {
			$(".JoinedAudioChannelItem", this.dom).remove();
		}
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		
		var context = this;
		
		$(JS_DELETE_JOINED_TRIGGER, this.dom).click(function() {
			context.container.DeleteItem(context);
		});
		
		$(JS_JOINED_URI, this.dom).change(function() {
			context.RequestMediaInfo();
		});
		
		$(JS_JOINED_URI, this.dom).focus(function() {
			if(context.getInputType() == INPUT_TYPE_SDI) {
				this.blur();
				context.updatePort();
			}
		});
		
		$(JS_OPEN_JOINED_TRIGGER, this.dom).click(function() {
			g_InputFileView.SetOnOK(function(key) {
				$(JS_JOINED_URI, context.dom).val(key).change();
			});
			
			var rect = g_InputFileView.GetRect();			
			var width = $(context.dom).width() < rect.width ? $(context.dom).width() : rect.width;
			
			var pos = uGetCenterPos(width, rect.height);
			var panelPos = $(context.dom).offset();
			var x = pos.x > panelPos.left ? pos.x : panelPos.left;
			
			g_InputFileView.SetWidth(width);
			g_InputFileView.Show(x, pos.y );
		});
		
		$(JS_PLAY_JOINED_TRIGGER, this.dom).click(function() {
			context.Preview();
		});
	};
	
	this.SetId = function(id) {
		$(JS_JOINED_ID, this.dom).val(id);
	};
	
	this.GetId = function() {
		return $(JS_JOINED_ID, this.dom).val();
	};
	
	//add for cloudtransocder
	this.SetUri = function(uri) {
		$(JS_JOINED_URI, this.dom).val(uri);
	};

	this.GetUri = function () {
		return $(JS_JOINED_URI, this.dom).val();
	};
	
	this.SyncProgram = function(programInfo) {
		$(JS_JOINED_PROGRAM_ID_DOWN, this.dom).val(programInfo.programId);
		$(JS_JOINED_AUDIO_TRACK_ID_DOWN, this.dom).val(programInfo.audioTrackId);
		$(JS_JOINED_SUBTITLE_ID_DOWN, this.dom).val(programInfo.subtitleId);
		$(JS_JOINED_AUDIO_CHANNEL_ID_DOWN, this.dom).val(programInfo.audioChannelId);
		
		var domProgram = this.controlDom.program;
		var domAudioTrack = this.controlDom.audio;
		var domSubtitle = this.controlDom.subtitle;
		var domAngle = this.controlDom.angle;
		var domAudioChannel = this.controlDom.audioChannel;
		
		if(programInfo == null || isNaN(programInfo.programId) || programInfo.programId == null || programInfo.programId == -1) {				
		} else {
			$(domProgram).removeAttr("disabled");			
			if(!uSelectItem(domProgram, programInfo.programId)){	
				var arr = [{key: programInfo.programId, value: programInfo.programId}];
				uUpdateSelect(domProgram, arr);
			}
		}
		
		if(programInfo == null || isNaN(programInfo.audioTrackId) || programInfo.audioTrackId == null || programInfo.audioTrackId == -1) {
		} else {			
			$(domAudioTrack).removeAttr("disabled");
			if(!uSelectItem(domAudioTrack, programInfo.audioTrackId)){
				var arr = [{key: programInfo.audioTrackId, value: programInfo.audioTrackId}];
				uUpdateSelect(domAudioTrack, arr);						
			}
		}
		
		if(programInfo == null || isNaN(programInfo.subtitleId) || programInfo.subtitleId == null	|| programInfo.subtitleId == -2) {
		} else {
			$(domSubtitle).removeAttr("disabled");
			if(!uSelectItem(domSubtitle, programInfo.subtitleId)){
				var arr = [{key: programInfo.subtitleId, value: programInfo.audioTrackId}];
				uUpdateSelect(domSubtitle, arr);				
			}
		}
		
		if(programInfo == null || isNaN(programInfo.angleId) || programInfo.angleId == null	|| programInfo.angleId == 0) {
		} else {
			$(domAngle).removeAttr("disabled");
			if(!uSelectItem(domAngle, programInfo.angleId)){
				var arr = [{key: programInfo.angleId, value: programInfo.angleId}];
				uUpdateSelect(domAngle, arr);		
			}
		}
		
		if(domAudioChannel != null) {
			if(programInfo == null || isNaN(programInfo.audioChannelId) || programInfo.audioChannelId == null ) {
			} else {
				$(domAudioChannel).removeAttr("disabled");
				if(!uSelectItem(domAudioChannel, programInfo.audioChannelId)){
					var arr = [{key: "-1", value: str_audio.audio_process_default}];
					uUpdateSelect(domAudioChannel, arr);
				}
			}
		}
	};
	
	this.GetProgram = function() {
		var o = {};
		o.programId = $(JS_JOINED_PROGRAM_ID, this.dom).val();
		o.audioTrackId = $(JS_JOINED_AUDIO_TRACK_ID, this.dom).val();
		o.subtitleId = $(JS_JOINED_SUBTITLE_ID, this.dom).val();
		return o;
	};

	this.SetPreview = function(preview){
		this.preview = preview;
	};
	
	//end add for transcoder
	
	this.GetIndex = function() {
		return $(JS_JOINED_INDEX, this.dom).text();
	};
	
	this.ClearSelected = function() {
		this.controlDom.program.options.length = 0;
		this.controlDom.program.disabled = true;
		
		this.controlDom.audio.options.length = 0;
		this.controlDom.audio.disabled = true;
		
		this.controlDom.subtitle.options.length = 0;
		this.controlDom.subtitle.disabled = true;
		
		if(this.controlDom.audioChannel != null) {
			this.controlDom.audioChannel.options.length = 0;
			this.controlDom.audioChannel.disabled = true;
		}
	};
	
	this.ClearBrief = function() {
		$(this.controlDom.brief).text("");
	};
	
	this.StartWaiting = function() {
		var $mediaInfo = $(JS_JOINED_MEDIA_INFO, this.dom); 
		$mediaInfo.text(".");
		this.timerId = setInterval(function() {
			var text = $mediaInfo.text();
			if(text.match(/^\.+$/gi) != null) {
				if(text.length > 20) text = "";
				text += ".";
				$mediaInfo.text(text);;
			}
		}, 500);
	};
	
	this.EndWaiting = function() {
		clearInterval(this.timerId);
	};
	
	this.StartRequest = function() {
		this.ClearSelected();
		this.StartWaiting();
	};
	
	this.EndRequest = function() {
		this.EndWaiting();
		this.ClearBrief();
	};
	
	this.SetMediaInfoData = function(data, programInfo) {
		if(programInfo == null) {
			programInfo = {};
			programInfo.programId = parseInt($(JS_JOINED_PROGRAM_ID_DOWN, this.dom).val());
			programInfo.audioTrackId = parseInt($(JS_JOINED_AUDIO_TRACK_ID_DOWN, this.dom).val());
			programInfo.subtitleId = parseInt($(JS_JOINED_SUBTITLE_ID_DOWN, this.dom).val());
			programInfo.audioChannelId = parseInt($(JS_JOINED_AUDIO_CHANNEL_ID_DOWN, this.dom).val());
		}
		if(data == null){
			this.SyncProgram(programInfo);		
		} else {
			this.mediaInfoControl.UpdateControl(data, programInfo);
		}		
	};
	
	this.RequestMediaInfo = function() {
		var context = this;
		var inputInfo = {};
		inputInfo.type = this.getInputType();
		inputInfo.uri = this.GetValueByJS(JS_JOINED_URI);
		
		this.StartRequest();
		var ret = g_MediaInfoAjax.RequestMediaInfo(inputInfo, function(data) {
			context.EndRequest();
			context.SetMediaInfoData(data);
		});
		
		if(!ret) {
			this.EndRequest();
		}
	};
	
	this.StartWaiting = function() {
		var $mediaInfo = $(JS_JOINED_MEDIA_INFO, this.dom); 
		$mediaInfo.text(".");
		this.timerId = setInterval(function() {
			var text = $mediaInfo.text();
			if(text.match(/^\.+$/gi) != null) {
				if(text.length > 20) text = "";
				text += ".";
				$mediaInfo.text(text);;
			}
		}, 500);
	};
	
	this.EndWaiting = function() {
		clearInterval(this.timerId);
	};
	
	this.SetContainer = function(container) {
		this.container = container;
	};
	
	this.Delete = function() {
		if(this.dom == null) return;
		
		$(this.dom).remove();
		this.dom = null;
	};

	this.GetMediaInfo = function() {
		var mediaInfo = this.mediaInfoControl.GetMediaInfo();
		if(mediaInfo == null) mediaInfo = {};
		
		mediaInfo.inputType = INPUT_TYPE_FILE;
		mediaInfo.uri = this.GetValueByJS(JS_JOINED_URI);
		
		return mediaInfo;
	};
	
	this.Preview = function() {
		var mediaInfo = this.GetMediaInfo();
		
		var	preview = (this.preview != null) ? this.preview : g_ProgramPreview;
		
		preview.SetMediaInfo(mediaInfo);
		preview.Show();
		preview.Play();
	};
	
	this.GetValueByJS = function(jsSelect) {
		return $(jsSelect, this.dom).val();
	};
	
  	/** xml : XMLWriter object**/
  	this.XML = function(xml) {
  		if(this.dom == null) return;
  		
  		var value = "";
  		
  		xml.BeginNode(TAG_JOINED);
  	
  		value = this.GetValueByJS(JS_JOINED_ID);
		xml.Attrib(TAG_ID, value);
		
  		for(var i = 0; i < tagMap.length; i++) {
  			value = this.GetValueByJS(tagMap[i].value);
  			if(value == null) continue;
  			xml.Node(tagMap[i].key, value);
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
  		if(this.dom == null) return;
  		
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
  	};
  	/* Field operate end */
}

JoinedItem.prototype = {
	showAudioChannel: function(bShow) {
		if(bShow) {
			$(".JoinedAudioChannelItem", this.dom).show();
		} else {
			$(".JoinedAudioChannelItem", this.dom).hide();
		}
	},
	
	getInputType: function() {
		return this.container.getInputType();
	},

	updatePort: function() {
		var context = this;
		var inputType = this.getInputType();
		if(inputType != INPUT_TYPE_SDI
				&& inputType != INPUT_TYPE_CVBS
				&& inputType != INPUT_TYPE_HDMI
				&& inputType != INPUT_TYPE_ASI
				&& inputType != INPUT_TYPE_AES_EBU) return;
		
		var url ="getMediaFileInfo";
		var uri = "";
		if(inputType == INPUT_TYPE_SDI) {
			uri = "sdiport:0";
		}
		else if(inputType == INPUT_TYPE_CVBS) {
			uri = "cvbsport:0";
		}
		else if(inputType == INPUT_TYPE_HDMI) {
			uri = "hdmiport:0";
		}
		else if(inputType == INPUT_TYPE_ASI) {
			uri = "asiport:0";
		}
		else if(inputType == INPUT_TYPE_AES_EBU) {
			uri = "aesport:0";
		}
		
		var param = { 'uri': uri, 'rnd': Math.random() };
		if(g_params_getMediaFileInfo != null) {
			$.extend(param, param, g_params_getMediaFileInfo);
		}
		
		this.posting = true;
		$.post(url, param, function(data) {
			context.OnPortResponse(data);
			context.posting = false;
		}, "xml");
	},
	
	OnPortResponse : function(data) {
		var context = this;
		if(data == null) return;
		this.portParser.Init(data);
		var pa = this.portParser.GetPortArray();
		
		g_LineSelector.setContent(pa);
		g_LineSelector.setTitle(str_input.port_select);
		g_LineSelector.setOnSelected(function(key) {
			context.onPortSelected(key);
		});
		g_LineSelector.show();
	},
	
	onPortSelected: function(key) {
		var old = $(JS_JOINED_URI, this.dom).val();
		if(old != key) {
			$(JS_JOINED_URI, this.dom).val(key).change();
		}
	}
}

function JoinedSetting() {
  	this.prefixField = "";
  	this.myField = FIELD_INPUT_BODY;
  	this.fieldIndex = null;
  	
  	this.dom = null;
  	this.posting = false;
	this.preview = null;
  	this.bShow = true;
  	this.bShowAudioChannel = false;
  	this.joinedItemArray = [];

  	this.SetDOM = function(dom) {
  		this.dom = dom;
  	};
  	
  	this.Init = function(dom, preview) {
  		this.SetDOM(dom);
		this.SetPreview(preview);
  		this.licenseControl();
  		this.Bind();
  		this.InitSub();
  		this.UpdateGenerateId();
  	};
  	
	this.licenseControl = function() {
		if(this.inputType == INPUT_TYPE_SDI) {
			if(GetLicense(license.INPUT_SDI_MULTI_AUDIO) != license.ENABLED) {
				$(this.dom).hide();
			}
		}
	};
  	
  	this.InitSub = function() {
  		if(this.dom == null) return;
		var context = this;
		$(JS_JOINED_ITEM, this.dom).each(function() {
			var item = new JoinedItem();
			item.SetContainer(context);
			item.Init(this);
			item.SetPreview(context.preview);
			context.joinedItemArray.push(item);
		});
		this.SortItems();
  	};
  	
  	this.Bind = function() {
  		if(this.dom == null) return;
  		var context = this;
  		$(JS_NEW_JOINED_ITEM, this.dom).click(function() {
  			context.NewItem();
  		});
  	};
  	
  	this.UpdateGenerateId = function() {
  		var $joinedId = $(JS_JOINED_ID, this.dom);
		var min = -1;
		for(var i = 0; i < $joinedId.length; i++) {
			var id = $joinedId.get(i).value;
			var iid = parseInt(id);
			if(isNaN(iid)) continue;
			if( min > iid) {
				min = iid;
			}
		}
		 $(JS_JOINED_ID_GENERATOR, this.dom).val(min);
  	};
  	
  	this.GenerateId = function() {
  		var id = $(JS_JOINED_ID_GENERATOR, this.dom).val();
  		id--;
  		$(JS_JOINED_ID_GENERATOR, this.dom).val(id);
  		return id;
  	};
  	
  	this.NewItem = function() {
  		var item = new JoinedItem();
  		var o = {};
  		o.id = "-1";
  		o.uri = "";
  		o.container = this;
  		item.Create($(JS_JOINED_ITEM_LIST, this.dom).get(0), o);
		item.SetPreview(this.preview);
  		var id = this.GenerateId();
  		item.SetId(id);
  		this.joinedItemArray.push(item);
  		this.SortItems();
  	};
  	
  	this.DeleteItem = function(item) {
		var bFound = false;
		var len = this.joinedItemArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.joinedItemArray[i-1] = this.joinedItemArray[i];
			} else {
				if(this.joinedItemArray[i] == item) {
					item.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.joinedItemArray.length--;
		}
		this.SortItems();
  	};
  	
  	this.SortItems = function(noSync) {
		var $arr = $(JS_JOINED_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_JOINED_ITEM) {
			$(JS_NEW_JOINED_ITEM, this.dom).hide();
		} else {
			$(JS_NEW_JOINED_ITEM, this.dom).show();
		}
		if(noSync != undefined && noSync == true) return;
		this.UpdateAudioJoinedList();
		
		this.showAudioChannel(this.bShowAudioChannel);
  	};
  	
  	this.UpdateAudioJoinedList = function() {
		g_taskSupport.UpdateAudioJoinedList();
  	};
  	
  	this.Display = function(bShow) {
  		var $dom = $(this.dom);
  		if(bShow) {
  			$dom.show();
  		} else {
  			$dom.hide();
  		}
  		this.bShow = bShow;
  	};
	
	//add for cloud transcoder
	this.SetPreview = function(preview) {
		this.preview = preview;
	};

	this.SetJoinedList = function(joinedList, noSync) {
		for(var i = 0; i < this.joinedItemArray.length; i++) {
			var item = this.joinedItemArray[i];
			item.Delete();
		}
		this.joinedItemArray.length = 0;
		for(var i = 0; i < joinedList.length; i++) {
			var o = joinedList[i];
			
			var item = new JoinedItem();
			o.container = this;
			item.Create($(JS_JOINED_ITEM_LIST, this.dom).get(0), o);
			item.SetMediaInfoData(null, o.program);
			//item.SetContainer(this);	
			item.SetPreview(this.preview);
			this.joinedItemArray.push(item);			
		}
		this.SortItems(noSync);
	}
	//end add for cloudtranscoder
  	
  	this.GetJoinedList = function() {
  		var list = [];
  		for(var i = 0; i < this.joinedItemArray.length; i++) {
  			var item = this.joinedItemArray[i];
  			var o = {};
  			o.key = item.GetId();
  			o.value = item.GetIndex();
			o.uri = item.GetUri();
			o.program = item.GetProgram();
  			list.push(o);
  		}
  		
  		return list;
  	};
  	
  	/** xml : XMLWriter object**/
  	this.XML = function(xml) {
  		for(var i = 0; i < this.joinedItemArray.length; i++) {
  			var item = this.joinedItemArray[i];
  			item.XML(xml);
  		}
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
  		if(!this.bShow) return;
  		this.UpdateSubElement();
  	};
  	
  	this.UpdateSubElement = function() {
  		var field = this.GetFullField();
  		var i = 0;
  		for(i = 0; i < this.joinedItemArray.length; i++) {
  			var item = this.joinedItemArray[i];
  			item.SetPrefixField(field);
  			item.SetFieldIndex(i);
  			item.UpdateElementName();
  		}
  	};
  	/* Field operate end */
}

JoinedSetting.prototype = {
	showAudioChannel: function(bShow) {
		this.bShowAudioChannel = bShow;
		for(var i = 0; i < this.joinedItemArray.length; i++) {
			var item = this.joinedItemArray[i];
			item.showAudioChannel(bShow);
		}
	},
	
	setInputType: function(inputType) {
		this.inputType = inputType;
	},
	
	getInputType: function() {
		var inputType = this.inputType;
		if(inputType == null || inputType.length == 0) {
			inputType = INPUT_TYPE_FILE;
		}
		return inputType;
	},
}