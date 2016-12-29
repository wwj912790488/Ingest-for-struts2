var JS_AVI_SETTING	=".AviSetting";
var JS_AVI_SPLIT_AUDIO = "select[name='AviSplitAudio']";
var JS_AVI_AUDIO_PATH = "input[name='AviAudioPath']";
var JS_AVI_AUDIO_NAME = "input[name='AviAudioName']";
var JS_AVI_AUDIO_EXT = "input[name='AviAudioExt']";
var JS_OPEN_AVI_FILE_TRIGGER = ".OpenAviFileTrigger";

function AviSetting() {	
	var TAG_AVI_SETTING = "avisetting";
	var TAG_AVI_SPLIT_AUDIO = "splitaudio";
	var TAG_AVI_AUDIO_PATH = "audiopath";
	var TAG_AVI_AUDIO_NAME = "audioname";
	var TAG_AVI_AUDIO_EXT = "audioext";
	
	var FIELD_AVI_SPLIT_AUDIO = "splitAudio";
	var FIELD_AVI_AUDIO_PATH = "audioPath";
	var FIELD_AVI_AUDIO_NAME = "audioName";
	var FIELD_AVI_AUDIO_EXT = "audioExt";
	
	/*static var*/
	var tagMap = [
		{key: TAG_AVI_SPLIT_AUDIO, value: JS_AVI_SPLIT_AUDIO},
		{key: TAG_AVI_AUDIO_PATH, value: JS_AVI_AUDIO_PATH},
		{key: TAG_AVI_AUDIO_NAME, value: JS_AVI_AUDIO_NAME},
		{key: TAG_AVI_AUDIO_EXT, value: JS_AVI_AUDIO_EXT}
		];
	
	var fieldMap = [
		{key: FIELD_AVI_SPLIT_AUDIO, value: JS_AVI_SPLIT_AUDIO},
		{key: FIELD_AVI_AUDIO_PATH, value: JS_AVI_AUDIO_PATH},
		{key: FIELD_AVI_AUDIO_NAME, value: JS_AVI_AUDIO_NAME},
		{key: FIELD_AVI_AUDIO_EXT, value: JS_AVI_AUDIO_EXT}
		];
	
	this.dom = null;
	this.myTag = TAG_AVI_SETTING;
	
	this.prefixField = "";
	this.myField = FIELD_CONTAINER_SETTING;
	this.fieldIndex = null;

	this.Init = function(dom) {
		if(this.dom == dom) return;
		this.SetDOM(dom);
		this.LicenseControl();
		
		this.Bind();
		this.updateAudioProcessMode();
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
		
		$(JS_OPEN_AVI_FILE_TRIGGER, this.dom).click(function() {
			g_OutputFileView.Show();
			g_OutputFileView.SetOnOK(function(key) {
				$(JS_AVI_AUDIO_PATH, context.dom).val(key);
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
		
	this.UpdateExt = function() {
		var ext = $(JS_AVI_AUDIO_EXT, this.dom).val();
		if(ext == null || ext.length == 0) {
			$(JS_AVI_AUDIO_EXT, this.dom).val("wav");
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

AviSetting.prototype = {
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
		var $audioMode = $(JS_AVI_SPLIT_AUDIO, this.dom);
		var arr = outputGroupData.getAudioProcessMode(CONTAINER_AVI);
		uUpdateSelect($audioMode[0], arr);

		this.updateAudioNameUI();

		$(JS_AVI_SPLIT_AUDIO, this.dom).change(function(){
			context.updateAudioNameUI();
		});
	},

	updateAudioNameUI : function(){
		var audioProcessMode = $(JS_AVI_SPLIT_AUDIO, this.dom).val();
		if(audioProcessMode == "1") {
			$(".AudioFileName", this.dom).show();
		} else {
			$(".AudioFileName", this.dom).hide();
		}
	},

	updateAudioPath:function(path){
		$(JS_AVI_AUDIO_PATH, this.dom).val(path);
	},
}