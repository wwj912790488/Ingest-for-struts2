function EditorAudioProcess() {
	var JS_AUDIO_DELAY = "input[name='AudioDelay']";
	
	var FIELD_AUDIO_DELAY = "audioDelay";
	
	var TAG_AUDIO_DELAY = "audiodelay";
	
	var validatorMap = [
		{selector: JS_AUDIO_DELAY, type: VALIDATOR_TYPE_INTEGER, param: {min: null, max: null, recommend: 0} }
		];
	
	var fieldMap = [
		{key: FIELD_AUDIO_DELAY, value: JS_AUDIO_DELAY}
		];
	
	this.prefixField = "";
	this.myField = null;
	this.fieldIndex = null;
	
	this.dom = null;

	this.Init = function(dom) {
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_AUDIO_DELAY) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.SetSupport = function(bSupport) {
		if(this.dom == null) return;
		if(bSupport) {
			$(JS_SUPPORT, this.dom).show();
			$(JS_UNSUPPORT, this.dom).hide();
		} else {
			$(JS_SUPPORT, this.dom).hide();
			$(JS_UNSUPPORT, this.dom).show();
		}
		this.support = bSupport;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.GetValueByJS = function(jsSelect) {
		var value = null;
		var $sel = $(this.dom).find(jsSelect);
		if($sel.attr('type') == "checkbox") {
			if($sel.get(0).checked) {
				value = ENABLE_TRUE;
			} 
			else {
				value = ENABLE_FALSE;
			}
		} else if($sel.attr('type') == "radio") {
			$sel.each(function(){
				if(this.checked) {
					value = this.value;
				}
			});
		}
		else {
			value = $sel.val();
		}
		return value;
	};
	
	this.XML = function(xml) {
		if(this.dom == null) return;
		if(!this.support) return;

		var value = this.GetValueByJS(JS_AUDIO_DELAY);
		
		xml.Node(TAG_AUDIO_DELAY, value);
	};
	
	/* Field operate */
	this.SetPrefixField = function(prefix) {
		this.prefixField = prefix;
	};
	
	this.SetFieldIndex = function(i) {
		this.fieldIndex = i;
	};
	
	this.GetFullField = function() {
		return this.prefixField;
	};
	
	this.UpdateElementName = function() {
		if(this.dom == null) return;
		if(!this.support) return;
		
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
