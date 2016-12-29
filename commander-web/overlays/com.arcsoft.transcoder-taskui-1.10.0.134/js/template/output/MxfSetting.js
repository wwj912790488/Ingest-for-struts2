var JS_MXF_SETTING	=".MxfSetting";

var MXF_SETTING_OP1A = "0";
var MXF_SETTING_OP_ATOM = "1";
var MXF_SETTING_OP_ATOM_AVID = "2";

mxfSettingData = new Object();
mxfSettingData.operationalPattern = [
	{key: MXF_SETTING_OP1A, value:"OP1A"},
	{key: MXF_SETTING_OP_ATOM, value:"OP-ATOM"},
	{key: MXF_SETTING_OP_ATOM_AVID, value:"AVID OP-ATOM"}
	];

mxfSettingData.wrapMode = [
	{key: "1", value:"BWF Frame"},
	//{key: "2", value:"BWF Clip"},
	//{key: "4", value:"AES Clip"},
	{key: "3", value:"AES Frame"}
	];

mxfSettingData.getOperationalPattern = function() {
	return mxfSettingData.operationalPattern;
};

mxfSettingData.getWrapMode = function() {
	return mxfSettingData.wrapMode;
};

var JS_AUDIO_PROCESS_MODE = "select[name='AudioProcessMode']";
var JS_OPERATIONAL_PATTERN = "select[name='OperationalPattern']";
var JS_MXF_WRAP_MODE = "select[name='MxfWrapMode']";
var JS_AUDIO_TRACK_FOLLOW_SOURCE = "input[name='AudioTrackFollowSource']";
var JS_AUDIO_CHANNEL_SPLIT = "input[name='AudioChannelSplit']";
var JS_MXF_TARGET_PATH = "input[name='MxfTargetPath']";
var JS_MXF_TARGET_NAME = "input[name='MxfTargetName']";
var JS_MXF_TARGET_EXT = "input[name='MxfTargetExt']";
var JS_MXF_OP_ATOM = ".MxfOpAtom";
var JS_OPEN_MXF_FILE_TRIGGER = ".OpenMxfFileTrigger";

function MxfSetting() {	
	var TAG_MXF_SETTING = "mxfsetting";
	var TAG_OPERATIONAL_PATTERN = "operationalpattern";
	var TAG_AUDIO_TRACK_FOLLOW_SOURCE = "audiotrackfollowsource";
	var TAG_AUDIO_CHANNEL_SPLIT = "audiochannelsplit";
	var TAG_MXF_TARGET_PATH = "targetpath";
	var TAG_MXF_TARGET_NAME = "targetname";
	var TAG_MXF_TARGET_EXT = "extension";
	var TAG_MXF_WRAP_MODE = "wrapmode";
	
	var FIELD_OPERATIONAL_PATTERN = "operationalPattern";
	var FIELD_AUDIO_TRACK_FOLLOW_SOURCE = "audioTrackFollowSource";
	var FIELD_AUDIO_CHANNEL_SPLIT = "audioChannelSplit";
	var FIELD_MXF_TARGET_PATH = "targetPath";
	var FIELD_MXF_TARGET_NAME = "targetName";
	var FIELD_MXF_TARGET_EXT = "targetExt";
	var FIELD_MXF_WRAP_MODE = "wrapMode";
	
	/*static var*/
	var tagMap = [
		{key: TAG_OPERATIONAL_PATTERN, value: JS_OPERATIONAL_PATTERN},
		{key: TAG_AUDIO_TRACK_FOLLOW_SOURCE, value: JS_AUDIO_TRACK_FOLLOW_SOURCE},
		{key: TAG_AUDIO_CHANNEL_SPLIT, value: JS_AUDIO_CHANNEL_SPLIT},
		{key: TAG_MXF_TARGET_PATH, value: JS_MXF_TARGET_PATH},
		{key: TAG_MXF_TARGET_NAME, value: JS_MXF_TARGET_NAME},
		{key: TAG_MXF_TARGET_EXT, value: JS_MXF_TARGET_EXT},
		{key: TAG_MXF_WRAP_MODE, value: JS_MXF_WRAP_MODE}
		];
	
	var fieldMap = [
		{key: FIELD_OPERATIONAL_PATTERN, value: JS_OPERATIONAL_PATTERN},
		{key: FIELD_AUDIO_TRACK_FOLLOW_SOURCE, value: JS_AUDIO_TRACK_FOLLOW_SOURCE},
		{key: FIELD_AUDIO_CHANNEL_SPLIT, value: JS_AUDIO_CHANNEL_SPLIT},
		{key: FIELD_MXF_TARGET_PATH, value: JS_MXF_TARGET_PATH},
		{key: FIELD_MXF_TARGET_NAME, value: JS_MXF_TARGET_NAME},
		{key: FIELD_MXF_TARGET_EXT, value: JS_MXF_TARGET_EXT},
		{key: FIELD_MXF_WRAP_MODE, value: JS_MXF_WRAP_MODE}
		];
	
	this.dom = null;
	this.myTag = TAG_MXF_SETTING;
	
	this.prefixField = "";
	this.myField = FIELD_CONTAINER_SETTING;
	this.fieldIndex = null;

	this.Init = function(dom) {
		if(this.dom == dom) return;
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.updateAudioProcessMode();
		this.UpdateOpAtom();
		//this.UpdateExt();
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
		var arr = mxfSettingData.getOperationalPattern();
		uUpdateSelect($(JS_OPERATIONAL_PATTERN, this.dom).get(0), arr);
		
		arr = mxfSettingData.getWrapMode();
		uUpdateSelect($(JS_MXF_WRAP_MODE, this.dom).get(0), arr);
		
		$(JS_OPERATIONAL_PATTERN, this.dom).change(function() {
			context.UpdateOpAtom();
			context.UpdateWrapMode();
		});
		
		$(JS_OPEN_MXF_FILE_TRIGGER, this.dom).click(function() {
			g_OutputFileView.Show();
			g_OutputFileView.SetOnOK(function(key) {
				$(JS_MXF_TARGET_PATH, context.dom).val(key);
			});
		});
	
		
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
	
	this.UpdateOpAtom = function() {
		var opType = $(JS_OPERATIONAL_PATTERN, this.dom).val();
		if(opType == MXF_SETTING_OP_ATOM || opType == MXF_SETTING_OP_ATOM_AVID) {
			$(JS_MXF_OP_ATOM, this.dom).show();
		} else {
			$(JS_MXF_OP_ATOM, this.dom).hide();
		}
	};

	this.UpdateWrapMode = function(){
		var opType = $(JS_OPERATIONAL_PATTERN, this.dom).val();
			if(opType == MXF_SETTING_OP1A) {
				setSelect($(JS_MXF_WRAP_MODE, this.dom).get(0), "3" );
			} else {
				setSelect($(JS_MXF_WRAP_MODE, this.dom).get(0), "1" );
			}
	};
	
	this.UpdateExt = function() {
		var ext = $(JS_MXF_TARGET_EXT, this.dom).val();
		if(ext == null || ext.length == 0) {
			$(JS_MXF_TARGET_EXT, this.dom).val("mxf");
		}
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

MxfSetting.prototype = {
	showExpand: function(bShow) {
		if(bShow) {
			$(".ExpandTarget", this.dom).removeClass("Hide");
		}
		else {
			$(".ExpandTarget", this.dom).addClass("Hide");
		}
	},

	updateAudioProcessMode:function(){
		var context = this;
		var $audioMode = $(JS_AUDIO_PROCESS_MODE, this.dom);
		var arr = outputGroupData.getAudioProcessMode(CONTAINER_MXF);
		uUpdateSelect($audioMode[0], arr);

		var audioFollowSource = GetValueByJS($(JS_AUDIO_TRACK_FOLLOW_SOURCE, this.dom));
		var audioSplitChannel =GetValueByJS( $(JS_AUDIO_CHANNEL_SPLIT, this.dom));

		if(audioFollowSource && audioSplitChannel){
			setSelect($(JS_AUDIO_PROCESS_MODE, this.dom).get(0), "1" );
		} else {
			setSelect($(JS_AUDIO_PROCESS_MODE, this.dom).get(0), "0");
		}

		$(JS_AUDIO_PROCESS_MODE, this.dom).change(function(){
			var audioProcessMode =GetValueByJS($(JS_AUDIO_PROCESS_MODE, context.dom)); 
			if(audioProcessMode == "1") {
				setCheckBox($(JS_AUDIO_TRACK_FOLLOW_SOURCE, context.dom).get(0), true);
				setCheckBox($(JS_AUDIO_CHANNEL_SPLIT, context.dom).get(0), true);
			} else {
				setCheckBox($(JS_AUDIO_TRACK_FOLLOW_SOURCE, context.dom).get(0), false);
				setCheckBox($(JS_AUDIO_CHANNEL_SPLIT, context.dom).get(0), false);
			}
		});
	},
	
	updateAudioPath:function(path){
		$(JS_MXF_TARGET_PATH, this.dom).val(path);
	},
}
