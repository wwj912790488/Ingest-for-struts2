function ESSetting() {
	var JS_OPEN_SDP_PATH_TRIGGER = ".OpenSdpPathTrigger";
	var JS_ES_VIDEO_PORT = "input[name='ESVideoPort']";
	var JS_ES_AUDIO_PORT = "input[name='ESAudioPort']";
	var JS_ES_TARGET_PATH = "input[name='ESTargetPath']";
	var JS_ES_TARGET_NAME = "input[name='ESTargetName']";
	var JS_ES_EXTENSION = "input[name='ESExtension']";
	
	var TAG_ES_SETTING = "esoverrtpsetting";
	var TAG_ES_VIDEO_PORT = "videoport";
	var TAG_ES_AUDIO_PORT = "audioport";
	var TAG_ES_TARGET_PATH = "targetpath";
	var TAG_ES_TARGET_NAME = "targetname";
	var TAG_ES_EXTENSION = "extension";
	
	var FIELD_CONTAINER_SETTING = "containerSetting";
	var FIELD_ES_VIDEO_PORT = "videoPort";
	var FIELD_ES_AUDIO_PORT = "audioPort";
	var FIELD_ES_TARGET_PATH = "targetPath";
	var FIELD_ES_TARGET_NAME = "targetName";
	var FIELD_ES_EXTENSION = "extension";
	
	/*static var*/
	var tagMap = [
   		{key: TAG_ES_VIDEO_PORT, value: JS_ES_VIDEO_PORT},
	    {key: TAG_ES_AUDIO_PORT, value: JS_ES_AUDIO_PORT},
	    {key: TAG_ES_TARGET_PATH, value: JS_ES_TARGET_PATH},
		{key: TAG_ES_TARGET_NAME, value: JS_ES_TARGET_NAME},
		{key: TAG_ES_EXTENSION, value: JS_ES_EXTENSION}
   		];
	
	var fieldMap = [
		{key: FIELD_ES_VIDEO_PORT, value: JS_ES_VIDEO_PORT},
		{key: FIELD_ES_AUDIO_PORT, value: JS_ES_AUDIO_PORT},
		{key: FIELD_ES_TARGET_PATH, value: JS_ES_TARGET_PATH},
		{key: FIELD_ES_TARGET_NAME, value: JS_ES_TARGET_NAME},
		{key: FIELD_ES_EXTENSION, value: JS_ES_EXTENSION}
		];
	
	var validatorMap = [
		{selector: JS_ES_VIDEO_PORT, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 65535, recommend: 5540} },
		{selector: JS_ES_AUDIO_PORT, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 65535, recommend: 5541} }
		];
	
	this.dom = null;
	this.myTag = TAG_ES_SETTING;
	
	this.prefixField = "";
	this.myField = FIELD_CONTAINER_SETTING;
	this.fieldIndex = null;

	this.Init = function(dom) {
		if(this.dom == dom) return;
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
	};
	
	this.LicenseControl = function() {
	};
	
	this.Delete = function() {
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		ValidatorBindArray(this.dom, validatorMap);
		
		$(JS_OPEN_SDP_PATH_TRIGGER, this.dom).click(function() {
			g_OutputFileView.Show();
			g_OutputFileView.SetOnOK(function(key) {
				$(JS_ES_TARGET_PATH, context.dom).val(key);
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

	this.GetValueByJS = function(jsSelector) {
		if(this.dom == null) return;
		var value = null;
		var $sel = $(this.dom).find(jsSelector);
		if($sel.attr('type') == "checkbox") {
			if($sel.get(0).checked) {
				value = ENABLE_TRUE;
			} 
			else {
				value = ENABLE_FALSE;
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
		$dom.find(JS_CONTAINER_SETTING).get(0).disabled = false;
	};
	
	this.Hide = function() {
		if(this.dom == null) return;
		var $dom =$(this.dom);
		$dom.hide();
		$dom.find(JS_CONTAINER_SETTING).get(0).disabled = true;
	};
	
	this.SetContainer = function(container) {
		$(this.dom).find(JS_CONTAINER_SETTING).val(container);
	};
	
	/* xml generator */
	this.XML = function(xml) {
		if(this.dom == null) return;
		xml.BeginNode(this.myTag);
		var len = tagMap.length;
		var value = "";
		for(var i = 0; i < len; i++) {
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
		var domSetting = $(this.dom).find(JS_CONTAINER_SETTING).get(0); 
		if(domSetting.disabled) return;
		
		var $my = $(this.dom).find(JS_CONTAINER_SETTING);
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

ESSetting.prototype = {
	showExpand: function(bShow) {
		if(bShow) {
			$(".ExpandTarget", this.dom).removeClass("Hide");
		}
		else {
			$(".ExpandTarget", this.dom).addClass("Hide");
		}
	}
}