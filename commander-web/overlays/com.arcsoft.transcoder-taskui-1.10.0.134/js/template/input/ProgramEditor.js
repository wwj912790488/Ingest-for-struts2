var RESPONSE_SUCCESS = "success";
var RESPONSE_REQUEST_FAILED = "request_failed";

var JS_PROGRAM_ITEM = ".ProgramItem";
var JS_NEW_PROGRAM_ITEM_TRIGGER = ".NewProgramItemTrigger";
var JS_DELETE_PROGRAM_ITEM_TRIGGER = ".DeleteProgramItemTrigger";
var JS_PROGRAM_ITEM_LIST = ".ProgramItemList";
var JS_PROGRAM_LINE = ".ProgramLine";
var JS_PROGRAM_MOVE_UP = ".ProgramMoveUp";
var JS_PROGRAM_MOVE_DOWN = ".ProgramMoveDown";
var JS_PROGRAM_PREVIEW_TRIGGER = ".ProgramPreviewTrigger";
var JS_PROGRAM_ANGLE_ITEM = ".ProgramAngleItem";

var TAG_TITLE = "title";

var FIELD_PROGRAM = "candidateLocations";
var FIELD_PROGRAM_PROGRAM_ID	="programId";
var FIELD_PROGRAM_AUDIO_TRACK_ID	="audioTrackId";
var FIELD_PROGRAM_SUBTITLE_ID	="subtitleId";
var FIELD_PROGRAM_ANGLE_ID	="angleId";
var FIELD_PROGRAM_AUDIO_CHANNEL_ID	="audioChannelId";

function ProgramItem() {
	this.dom = null;
	this.mediaInfoControl = new MediaInfoControl();
	this.timerId = null;
	this.controlDom = {};
	this.parent = null;
	this.inputInfo = null;
	this.preview = null;
	
	var tagMap = [
  		{key: TAG_INPUT_PROGRAM_ID, value: JS_INPUT_PROGRAM_ID},
  		{key: TAG_INPUT_AUDIO_TRACK_ID, value: JS_INPUT_AUDIO_TRACK_ID},
  		{key: TAG_INPUT_SUBTITLE_ID, value: JS_INPUT_SUBTITLE_ID},
  		{key: TAG_INPUT_ANGLE_ID, value: JS_INPUT_ANGLE_ID},
  		{key: TAG_INPUT_AUDIO_CHANNEL_ID, value: JS_INPUT_AUDIO_CHANNEL_ID}
  		];
  	
  	var fieldMap = [
  		{key: FIELD_PROGRAM_PROGRAM_ID, value: JS_INPUT_PROGRAM_ID},
  		{key: FIELD_PROGRAM_AUDIO_TRACK_ID, value: JS_INPUT_AUDIO_TRACK_ID},
  		{key: FIELD_PROGRAM_SUBTITLE_ID, value: JS_INPUT_SUBTITLE_ID},
  		{key: FIELD_PROGRAM_ANGLE_ID, value: JS_INPUT_ANGLE_ID},
  		{key: FIELD_PROGRAM_AUDIO_CHANNEL_ID, value: JS_INPUT_AUDIO_CHANNEL_ID}
  		];
  	
  	this.prefixField = "";
  	this.myField = FIELD_PROGRAM;
  	this.fieldIndex = null;
	
	this.Create = function(domParent) {
		var $tmp = $(JS_PROGRAM_ITEM_TMPL);
		if($tmp.length == 0) return null;
		
		var $clone = $tmp.clone();
		$clone.attr("id", "");
		$(domParent).append($clone.get(0));
		
		this.Init($clone.get(0));
		return this.dom;
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.SetPreview = function(preview) {
		this.preview = preview;
	};
	
	this.Init = function(dom) {
		var context = this;
		this.SetDOM(dom);
		this.licenseControl();
		this.Bind();
		
		this.controlDom.program = $(JS_INPUT_PROGRAM_ID, this.dom).get(0);
		this.controlDom.audio = $(JS_INPUT_AUDIO_TRACK_ID, this.dom).get(0);
		this.controlDom.subtitle = $(JS_INPUT_SUBTITLE_ID, this.dom).get(0);
		this.controlDom.angle = $(JS_INPUT_ANGLE_ID, this.dom).get(0);
		this.controlDom.audioChannel = $(JS_INPUT_AUDIO_CHANNEL_ID, this.dom).get(0);
		this.controlDom.brief = $(JS_INPUT_MEDIA_INFO, this.dom).get(0);
		this.mediaInfoControl.SetControlDom(this.controlDom);
		
		this.mediaInfoControl.SetOnMediaInfoChanged(function(mediaInfo) {
			if(context.parent == null) return;
			mediaInfo = context.ExtendMediaInfo(mediaInfo);
			context.parent.OnMediaInfoChanged(context, mediaInfo);
		});
	};
	
	this.licenseControl = function() {
		if(GetLicense(license.INPUT_AUDIO_CHANNEL) != license.ENABLED) {
			$(".ProgramAudioChannelItem", this.dom).remove();
		}
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_DELETE_PROGRAM_ITEM_TRIGGER, this.dom).click(function() {
			if(context.parent == null) return;
			context.parent.DeleteItem(context);
		});
		
		$(JS_PROGRAM_MOVE_UP, this.dom).click(function() {
			if(context.parent == null) return;
			context.parent.MoveUpItem(context);
		});
		
		$(JS_PROGRAM_MOVE_DOWN, this.dom).click(function() {
			if(context.parent == null) return;
			context.parent.MoveDownItem(context);
		});
		
		$(JS_PROGRAM_PREVIEW_TRIGGER, this.dom).click(function() {
			context.Preview();
		});
	};
	
	this.Preview = function() {
		if(this.inputInfo == null) return;
		
		var	preview = (this.preview != null) ? this.preview : g_ProgramPreview;
		
		var mediaInfo = this.GetMediaInfo();
		
		preview.SetMediaInfo(mediaInfo);
		preview.Show();
		preview.Play();
	};
	
	this.ShowPreviewIcon = function(bShow) {
		if(bShow) {
			$(JS_PROGRAM_PREVIEW_TRIGGER, this.dom).show();
		} else {
			$(JS_PROGRAM_PREVIEW_TRIGGER, this.dom).hide();
		}
	};
	
	this.ShowDeleteIcon = function(bShow) {
		if(bShow) {
			$(JS_DELETE_PROGRAM_ITEM_TRIGGER, this.dom).show();
		} else {
			$(JS_DELETE_PROGRAM_ITEM_TRIGGER, this.dom).hide();
		}
	};
	
	this.ShowMoveUpIcon = function(bShow) {
		if(bShow) {
			$(JS_PROGRAM_MOVE_UP, this.dom).show();
		} else {
			$(JS_PROGRAM_MOVE_UP, this.dom).hide();
		}
	};
	
	this.ShowMoveDownIcon = function(bShow) {
		if(bShow) {
			$(JS_PROGRAM_MOVE_DOWN, this.dom).show();
		} else {
			$(JS_PROGRAM_MOVE_DOWN, this.dom).hide();
		}
	};
	
	this.ShowProgramLine = function(bShow) {
		if(bShow) {
			$(JS_PROGRAM_LINE, this.dom).show();
		} else {
			$(JS_PROGRAM_LINE, this.dom).hide();
		}
	};
	
	this.ShowAngle = function(bShow) {
		if(bShow) {
			$(JS_PROGRAM_ANGLE_ITEM, this.dom).show();
		} else {
			$(JS_PROGRAM_ANGLE_ITEM, this.dom).hide();
		}
	};
	
	this.Delete = function() {
		if(this.dom == null) return;
		
		$(this.dom).remove();
		this.dom = null;
	};
	
	this.SetParent = function(parent) {
		this.parent = parent;
	};
	
	this.SetInputInfo = function(inputInfo) {
		this.inputInfo = inputInfo;
	};
	
	this.SetMediaInfoData = function(data, programInfo) {
		if(programInfo == null) {
			programInfo = {};
			programInfo.programId = parseInt($(JS_INPUT_PROGRAM_ID_DOWN, this.dom).val());
			programInfo.audioTrackId = parseInt($(JS_INPUT_AUDIO_TRACK_ID_DOWN, this.dom).val());
			programInfo.subtitleId = parseInt($(JS_INPUT_SUBTITLE_ID_DOWN, this.dom).val());
			programInfo.angleId = parseInt($(JS_INPUT_ANGLE_ID_DOWN, this.dom).val());
			programInfo.audioChannelId = parseInt($(JS_INPUT_AUDIO_CHANNEL_ID_DOWN, this.dom).val());
		}
		
		if(data == null) {
			this.SyncProgram(programInfo);			
		} else {
			this.mediaInfoControl.UpdateControl(data, programInfo);
		}
	};
	
	this.SyncProgram = function(programInfo) {
		var domProgram = this.controlDom.program;
		var domAudioTrack = this.controlDom.audio;
		var domSubtitle = this.controlDom.subtitle;
		var domAngle = this.controlDom.angle;
		var domAudioChannel = this.controlDom.audioChannel;
		
		if(programInfo == null || isNaN(programInfo.programId) || programInfo.programId == null|| programInfo.programId == -1) {				
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
		
		if(programInfo == null || isNaN(programInfo.subtitleId) || programInfo.subtitleId == null || programInfo.subtitleId == -2) {
		} else {
			$(domSubtitle).removeAttr("disabled");
			if(!uSelectItem(domSubtitle, programInfo.subtitleId)){
				var arr = [{key: programInfo.subtitleId, value: programInfo.audioTrackId}];
				uUpdateSelect(domSubtitle, arr);
			}
		}

		if(domAngle != null) {
			if(programInfo == null || isNaN(programInfo.angleId) || programInfo.angleId == null ) {
			} else {
				$(domAngle).removeAttr("disabled");
				if(!uSelectItem(domAngle, programInfo.angleId)){
					var arr = [{key: programInfo.angleId, value: programInfo.angleId}];
					uUpdateSelect(domAngle, arr);
				}
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
	
	/* o:{programId: xxx, audioTrackId: xxx, subtitleId: xxx} */
	this.SetProgram = function(o) {
		this.mediaInfoControl.SetProgram(o);
	};
	
	this.GetProgramCount = function() {
		var $program = $(JS_INPUT_PROGRAM_ID, this.dom);
		if($program.length > 0)
			return $program.get(0).options.length;
		return 0;
	};
	
	this.ClearSelected = function() {
		this.controlDom.program.options.length = 0;
		this.controlDom.program.disabled = true;
		
		this.controlDom.audio.options.length = 0;
		this.controlDom.audio.disabled = true;
		
		this.controlDom.subtitle.options.length = 0;
		this.controlDom.subtitle.disabled = true;
		
		if(this.controlDom.angle != null) {
			this.controlDom.angle.options.length = 0;
			this.controlDom.angle.disabled = true;
		}
		
		if(this.controlDom.audioChannel != null) {
			this.controlDom.audioChannel.options.length = 0;
			this.controlDom.audioChannel.disabled = true;
		}
		
		var $mediaInfo = $(JS_INPUT_MEDIA_INFO, this.dom); 
		$mediaInfo.text("");
	};
	
	this.ClearBrief = function() {
		$(this.controlDom.brief).text("");
	};
	
	this.StartWaiting = function() {
		var $mediaInfo = $(JS_INPUT_MEDIA_INFO, this.dom); 
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
	
	this.ExtendMediaInfo = function(mediaInfo) {
		if(mediaInfo == null) {
			mediaInfo = {};
		};
		
		if(this.inputInfo != null) {
			mediaInfo.inputType = this.inputInfo.type;
			mediaInfo.uri = this.inputInfo.uri;
			mediaInfo.userdata = this.inputInfo.userdata;
		}
		return mediaInfo;
	};
	
	this.GetMediaInfo = function() {
		var mediaInfo = this.mediaInfoControl.GetMediaInfo();
		if(mediaInfo == null) {
			mediaInfo = {};
		};
		
		var exmediaInfo = this.ExtendMediaInfo(mediaInfo);
		
		return exmediaInfo;
	};
	
	this.GetValueByJS = function(jsSelect) {
		var value = null;
		var $sel = $(jsSelect, this.dom);
		if($sel.length == 0 || $sel.get(0).disabled) {
			if(jsSelect == JS_INPUT_PROGRAM_ID) {
				value = "-1";
			} else if(jsSelect == JS_INPUT_AUDIO_TRACK_ID) {
				value = "-1";
			} else if(jsSelect == JS_INPUT_SUBTITLE_ID) {
				value = "-2";
			} else if(jsSelect == JS_INPUT_ANGLE_ID) {
				value = "0";
			} else if(jsSelect == JS_INPUT_AUDIO_CHANNEL_ID) {
				value = "-1";
			}
		} else {
			value = $sel.val();
		}
		
		return value;
	};
	
  	/** xml : XMLWriter object**/
  	this.XML = function(xml) {
  		if(this.dom == null) return;
  		
  		var value = "";
  		
  		xml.BeginNode(TAG_TITLE);
  	
  		for(var i = 0; i < tagMap.length; i++) {
  			value = this.GetValueByJS(tagMap[i].value);
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
  		
  		var fullField = this.GetFullField();
  		for(var i = 0; i < fieldMap.length; i++) {
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

ProgramItem.prototype = {
	showAudioChannel: function(bShow) {
		if(bShow) {
			$(".ProgramAudioChannelItem", this.dom).show();
		} else {
			$(".ProgramAudioChannelItem", this.dom).hide();
		}
	}
};

function ProgramEditor() {
  	this.prefixField = "";
  	this.myField = FIELD_INPUT_BODY;
  	this.fieldIndex = null;
	
	/* inputInfo:{type: xxx, uri: xxx} */
	this.inputInfo = null;
	
	this.dom = null;
	this.itemArray = [];
	this.mediaInfoData = null;
	this.showAngle = false;
	this.bShowAudioChannel = false;
	this.fnOnMediaInfoChanged = null;
	this.preview = null;
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Init = function(dom, preview) {
		this.SetDOM(dom);
		this.SetPreview(preview);
		this.LicenseControl();
		this.Bind();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.INPUT_DISC_MULTITITLES) != license.ENABLED) {
			$(".ProgramEditorBar", this.dom).remove();
		}
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_NEW_PROGRAM_ITEM_TRIGGER, this.dom).click(function() {
			context.NewItem();
		});
	};
	
	this.InitSub = function() {
		var context = this;
		
		$(JS_PROGRAM_ITEM, this.dom).each(function(i) {
			var item = new ProgramItem();
			item.Init(this);			
			item.SetParent(context);
			item.SetPreview(context.preview);
			context.itemArray.push(item);
		});
		
		this.SortItems();
	};
	
	this.NewItem = function() {
  		var item = new ProgramItem();
  		item.Create($(JS_PROGRAM_ITEM_LIST, this.dom).get(0));
  		
  		item.SetInputInfo(this.inputInfo);
  		
  		var data = this.mediaInfoData;
  		item.SetMediaInfoData(data);  		
  		item.SetParent(this);
  		item.SetPreview(this.preview);
  		this.itemArray.push(item);
  		this.SortItems();
	};
	
  	this.DeleteItem = function(item) {
		var bFound = false;
		for(var i = 0; i < this.itemArray.length; i++) {
			if(bFound) {
				this.itemArray[i-1] = this.itemArray[i];
			} else {
				if(this.itemArray[i] == item) {
					item.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.itemArray.length--;
		}
		this.SortItems();
  	};
  	
  	this.MoveUpItem = function(item) {
  		var bFound = false;
		for(var i = 0; i < this.itemArray.length; i++) {
			if(this.itemArray[i] == item) {
				bFound = true;
				break;
			}
		}
		
		if(!bFound) return;
		if(i == 0) return;
		
		this.itemArray[i] = this.itemArray[i-1];
		this.itemArray[i-1] = item;
		$(item.dom).after(this.itemArray[i].dom);
		
		this.SortItems();
  	};
  	
  	this.MoveDownItem = function(item) {
  		var bFound = false;
		for(var i = 0; i < this.itemArray.length; i++) {
			if(this.itemArray[i] == item) {
				bFound = true;
				break;
			}
		}
		
		if(!bFound) return;
		if(i == this.itemArray.length - 1) return;
		
		this.itemArray[i] = this.itemArray[i+1];
		this.itemArray[i+1] = item;
		$(item.dom).before(this.itemArray[i].dom);
		
		this.SortItems();
  	};
	
	this.SortItems = function() {
		if(this.itemArray == null || this.itemArray.length == 0 ) {
			return;
		}
		if(this.itemArray.length == 1) {
			this.itemArray[0].ShowDeleteIcon(false);
			this.itemArray[0].ShowPreviewIcon(false);
			this.itemArray[0].ShowMoveDownIcon(false);
			this.itemArray[0].ShowMoveUpIcon(false);
		} else {
			for(var i = 0; i < this.itemArray.length; i++) {
				if(i == 0) {
					this.itemArray[i].ShowDeleteIcon(false);
				} else {
					this.itemArray[i].ShowDeleteIcon(true);
				}
				this.itemArray[i].ShowPreviewIcon(true);
				this.itemArray[i].ShowMoveDownIcon(true);
				this.itemArray[i].ShowMoveUpIcon(true);
			}
		}	
		
		var programCount = this.itemArray[0].GetProgramCount();
		if(this.itemArray.length >= programCount || this.inputInfo == null 
			|| (this.inputInfo.type != INPUT_TYPE_DVD && this.inputInfo.type != INPUT_TYPE_BD)){
			$(".ProgramEditorBar", this.dom).hide();
		} else {
			$(".ProgramEditorBar", this.dom).show();
		}		
		
		this.ShowAngle(this.showAngle);
		this.showAudioChannel(this.bShowAudioChannel);
	};
	
	this.UpdateProgramItems = function(data) {
		var length = this.itemArray.length;
		for(var i = 0; i < length; i++) {
			var item = this.itemArray[i];
			item.SetInputInfo(this.inputInfo);
			item.SetMediaInfoData(data);
		}
		this.SortItems();
	};
	
	this.ClearExProgramList = function() {
		this.ClearProgramList();
		this.NewItem();
	};
	
	this.ClearProgramList = function() {
		for(var i = 0; i < this.itemArray.length; i++) {
			this.itemArray[i].Delete();
		}
		this.itemArray.length = 0;
		$(".ProgramEditorBar", this.dom).hide();
	};
	
	/* itemList: [{programId: xxx, audioTrackId: xxx, subtitleId: xxx}] */
	this.SetProgramList = function(itemList) {
		this.ClearProgramList();
		
		var data = this.mediaInfoData;
		for(var i = 0; i < itemList.length; i++) {
	  		var item = new ProgramItem();
	  		item.Create($(JS_PROGRAM_ITEM_LIST, this.dom).get(0));
	  		
	  		item.SetInputInfo(this.inputInfo);
	  		item.SetMediaInfoData(data, itemList[i]);	  		
	  		item.SetParent(this);
	  		item.SetPreview(this.preview);
	  		this.itemArray.push(item);
		}
		
		this.SortItems();
	};
	
	this.StartRequest = function() {
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.ClearSelected();
			item.StartWaiting();
		}
		g_MediaInfoRequestList.add(this);
	};
	
	this.EndRequest = function() {
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.EndWaiting();
			item.ClearBrief();
		}
		g_MediaInfoRequestList.remove(this);
	};
	
	/* inputInfo:{type: xxx, uri: xxx} */
	this.SetInputInfo = function(inputInfo) {
		this.inputInfo = inputInfo;
	};
	
	this.ShowProgramLine = function(bShow) {
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.ShowProgramLine(bShow);
		}
	};
	
	this.ShowAngle = function(bShow) {
		this.showAngle = bShow;
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.ShowAngle(bShow);
		}
	};
	
	this.RequestMediaInfo = function(inputInfo, onResponse) {
		var context = this;
		this.inputInfo = inputInfo;
		
		this.StartRequest();
		var ret = g_MediaInfoAjax.RequestMediaInfo(inputInfo, function(data, userData) {
			if(context.inputInfo === userData) {
				context.mediaInfoData = data;
				context.EndRequest();
				context.UpdateProgramItems(data);
				
				if($.isFunction(onResponse)) {
					onResponse(RESPONSE_SUCCESS);
				}
			}
		}, 
		inputInfo);
		
		if(!ret) {
			this.EndRequest();
			this.SortItems();
			
			if($.isFunction(onResponse)) {
				onResponse(RESPONSE_REQUEST_FAILED);
			}
		}
	};
	
	this.OnMediaInfoChanged = function(item, mediaInfo) {
		if(this.itemArray[0] == item) {
			//mediaInfo.inputType = this.inputInfo.type;
			//mediaInfo.uri = this.inputInfo.uri;
			
			//g_taskSupport.OnMediaInfoChanged(mediaInfo);
			
			if($.isFunction(this.fnOnMediaInfoChanged)){
				this.fnOnMediaInfoChanged(mediaInfo);
			}
		}
	};
	
	this.SetOnMediaInfoChanged = function(fn){
		this.fnOnMediaInfoChanged = fn;
	};
	
	//add for cloud transcoder
	this.SetPreview = function(preview) {
		this.preview = preview;
	};
	
	this.GetMediaInfo = function(index) {
		if(this.itemArray == null || this.itemArray.length == 0) return {};
		
		var item = this.itemArray[index];
		if(item == null) return {};;
		
		var mediaInfo =  item.GetMediaInfo();
		//mediaInfo.inputType = this.inputInfo.type;
		//mediaInfo.uri = this.inputInfo.uri;
		return mediaInfo;
	};
	
	/* return: [{programId: xxx, videoId: xxx, audioTrackId: xxx, subtitleId: xxx}, ...] */
	this.GetProgramList = function() {
		var array = [];
		for(var i = 0; i < this.itemArray.length; i++) {
			var mediaInfo = this.itemArray[i].GetMediaInfo();
			if(mediaInfo == null || mediaInfo.program == null) continue;
			
			var o = {};
			o.programId = mediaInfo.program.programId;
			o.videoId = mediaInfo.program.videoId;
			o.audioTrackId = mediaInfo.program.audioId;
			o.subtitleId = mediaInfo.program.subtitleId;
			o.angleId = mediaInfo.program.angleId;
			o.audioChannelId = mediaInfo.program.audioChannelId;
			array.push(o);
		}
		
		return array;
	};
	
	/** xml : XMLWriter object**/
  	this.XML = function(xml) {
  		for(var i = 0; i < this.itemArray.length; i++) {
  			var item = this.itemArray[i];
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
  		this.UpdateSubElement();
  	};
  	
  	this.UpdateSubElement = function() {
  		var field = this.GetFullField();
  		for(var i = 0; i < this.itemArray.length; i++) {
  			var item = this.itemArray[i];
  			item.SetPrefixField(field);
  			item.SetFieldIndex(i);
  			item.UpdateElementName();
  		}
  	};
  	/* Field operate end */
}

ProgramEditor.prototype = {
	showAudioChannel: function(bShow) {
		this.bShowAudioChannel = bShow;
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.showAudioChannel(bShow);
		}
	}
};