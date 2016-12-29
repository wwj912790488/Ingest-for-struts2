var JS_MP4_SETTING	=".Mp4Setting";
var JS_MP4_AUDIO_PROCESS = ".Mp4AudioProcess";
var JS_FILE_HEAD_FOREMOST = "input[name='FileHeadForemost']";
var JS_AUDIO_PROCESS_MODE = "select[name='AudioProcessMode']";
var JS_MP4_SPLIT_AUDIO = "input[name='Mp4SplitAudio']";
var JS_MP4_TARGET_PATH = "input[name='Mp4TargetPath']";
var JS_MP4_TARGET_NAME = "input[name='Mp4TargetName']";
var JS_MP4_TARGET_EXT = "input[name='Mp4TargetExt']";
var JS_OPEN_MP4_FILE_TRIGGER = ".OpenMp4FileTrigger";	
	
function Mp4Setting() {	
	var TAG_MP4_SETTING = "mp4setting";
	var TAG_FILE_HEAD_FOREMOST = "fileheadforemost";
	var TAG_AUDIO_PROCESS_MODE = "audioprocessmode";
	var TAG_MP4_SPLIT_AUDIO = "splitaudiofile";
	var TAG_MP4_TARGET_PATH = "targetpath";
	var TAG_MP4_TARGET_NAME = "targetname";
	var TAG_MP4_TARGET_EXT = "targetext";
	
	var FIELD_FILE_HEAD_FOREMOST = "fileHeadForemost";
	var FIELD_AUDIO_PROCESS_MODE = "audioProcessMode";
	var FIELD_MP4_SPLIT_AUDIO = "splitAudioFile";
	var FIELD_MP4_TARGET_PATH = "targetPath";
	var FIELD_MP4_TARGET_NAME = "targetName";
	var FIELD_MP4_TARGET_EXT = "targetExt";
	
	/*static var*/
	var tagMap = [
		{key: TAG_FILE_HEAD_FOREMOST, value: JS_FILE_HEAD_FOREMOST},
		{key: TAG_AUDIO_PROCESS_MODE, value: JS_AUDIO_PROCESS_MODE},
		{key: TAG_MP4_SPLIT_AUDIO, value: JS_MP4_SPLIT_AUDIO},
		{key: TAG_MP4_TARGET_PATH, value: JS_MP4_TARGET_PATH},
		{key: TAG_MP4_TARGET_NAME, value: JS_MP4_TARGET_NAME},
		{key: TAG_MP4_TARGET_EXT, value: JS_MP4_TARGET_EXT}
		];
	
	var fieldMap = [
		{key: FIELD_FILE_HEAD_FOREMOST, value: JS_FILE_HEAD_FOREMOST},
		{key: FIELD_AUDIO_PROCESS_MODE, value: JS_AUDIO_PROCESS_MODE},
		{key: FIELD_MP4_SPLIT_AUDIO, value: JS_MP4_SPLIT_AUDIO},
		{key: FIELD_MP4_TARGET_PATH, value: JS_MP4_TARGET_PATH},
		{key: FIELD_MP4_TARGET_NAME, value: JS_MP4_TARGET_NAME},
		{key: FIELD_MP4_TARGET_EXT, value: JS_MP4_TARGET_EXT}
		];
	
	this.dom = null;
	this.myTag = TAG_MP4_SETTING;
	
	this.prefixField = "";
	this.myField = FIELD_CONTAINER_SETTING;
	this.fieldIndex = null;

	this.Init = function(dom, container) {
		if(this.dom == dom) return;
		this.SetDOM(dom);		
		this.LicenseControl();
		this.Bind();
		this.updateAudioProcessMode(container);
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.ENABLED) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.Delete = function() {
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		
		var context = this;

		/*$(".ExpandTrigger", this.dom).click(function() {
			var target = $(".ExpandTarget", context.dom);
			var icon = $(".ExpandIcon", context.dom);
			if(target.hasClass("Hide")) {
				target.removeClass("Hide");
				icon.removeClass("ICON_ArrowRight").addClass("ICON_ArrowDown");
			}
			else {
				target.addClass("Hide");
				icon.removeClass("ICON_ArrowDown").addClass("ICON_ArrowRight");
			}
		});*/
	};
	
	this.GetValueByJS = function(jsSelector) {
		if(this.dom == null) return;
		var value = null;
		var $sel = $(jsSelector, this.dom);
		if($sel.attr('type') == "checkbox") {
			if($sel.get(0).checked) {
				value = $sel.val();
			} 
			else {
				value = null;
			}
		} else {
			value = $sel.val();
		}
		
		return value;
	};
	
	this.Show = function() {
		if(this.dom == null) return;
		var $dom =$(this.dom);
		$dom.show();
		$(JS_CONTAINER_SETTING, this.dom).get(0).disabled = false;
	};
	
	this.Hide = function() {
		if(this.dom == null) return;
		var $dom =$(this.dom);
		$dom.hide();
		$(JS_CONTAINER_SETTING, this.dom).get(0).disabled = true;
	};
	
	this.SetContainer = function(container) {
		$(JS_CONTAINER_SETTING, this.dom).val(container);
	};
	
	/* xml generator */
	this.XML = function(xml) {
		if(this.dom == null) return;
		xml.BeginNode(this.myTag);
		var len = tagMap.length;
		var value = "";
		for(var i = 0; i < len; i++) {
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
		var domSetting = $(JS_CONTAINER_SETTING, this.dom).get(0); 
		if(domSetting.disabled) return;
		
		var $my = $(JS_CONTAINER_SETTING, this.dom);
		var myName = this.prefixField + this.myField;
		$my.attr("name", myName);
		
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

Mp4Setting.prototype = {
	showExpand: function(bShow) {
		if(bShow) {
			$(".ExpandTarget", this.dom).removeClass("Hide");
		}
		else {
			$(".ExpandTarget", this.dom).addClass("Hide");
		}
	},

	updateAudioProcessMode:function(container){
		if(container == CONTAINER_MOV || container == CONTAINER_MP4) {
			var $audioMode = $(JS_AUDIO_PROCESS_MODE, this.dom);
			var arr = outputGroupData.getAudioProcessMode(container);
			uUpdateSelect($audioMode[0], arr);
		
			$(JS_MP4_AUDIO_PROCESS, this.dom).show();
		}
	},
}