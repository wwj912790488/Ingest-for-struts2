function EditorTrim() {
	var defaultData = {
		enable: ENABLE_FALSE,
		x: "0",
		y: "0",
		width: "0",
		height: "0"
		};
	
	var fieldMap = [
		{key: FIELD_TRIM_ENABLE, value: JS_TRIM_ENABLE},
		{key: FIELD_TRIM_X, value: JS_TRIM_X},
		{key: FIELD_TRIM_Y, value: JS_TRIM_Y},
		{key: FIELD_TRIM_WIDTH, value: JS_TRIM_WIDTH},
		{key: FIELD_TRIM_HEIGHT, value: JS_TRIM_HEIGHT}
		];
	
	var validatorMap = [
		{selector: JS_TRIM_X, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: MAX_INTEGER, recommend: 0} },
		{selector: JS_TRIM_Y, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: MAX_INTEGER, recommend: 0} },
		{selector: JS_TRIM_WIDTH, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: MAX_INTEGER, recommend: 0} },
		{selector: JS_TRIM_HEIGHT, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: MAX_INTEGER, recommend: 0} }
		];
	
	this.prefixField = "";
	this.myField = FIELD_TRIM;
	this.fieldIndex = null;
	
	this.dom = null;

	this.Init = function(dom) {
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_CROPPING) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var $trim = $(this.dom);
		$trim.find(JS_VALUE_CHANGER).each(function() {
			uValueChanger(this);
		});
		
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.GetTrimInfo = function() {
		if(this.dom == null) return null;
		var o = {};
		o.enable = this.GetValueByJS(JS_TRIM_ENABLE);
		o.x = parseInt($(JS_TRIM_X, this.dom).val());
		if(isNaN(o.x)) o.x = 0;
		o.y = parseInt($(JS_TRIM_Y, this.dom).val());
		if(isNaN(o.y)) o.y = 0;
		o.width = parseInt($(JS_TRIM_WIDTH, this.dom).val());
		if(isNaN(o.width)) o.width = 0;
		o.height = parseInt($(JS_TRIM_HEIGHT, this.dom).val());
		if(isNaN(o.height)) o.height = 0;
		return o;
	};
	
	this.RestoreTrimInfo = function() {
		if(this.dom == null) return;
		this.SetTrimInfo(defaultData);
	};
	
	this.SetTrimInfo = function(o) {
		if(this.dom == null) return;
		var $trim = $(this.dom);
		if(o.enable == ENABLE_TRUE) {
			$trim.find(JS_TRIM_ENABLE).get(0).checked = true;
		} else {
			$trim.find(JS_TRIM_ENABLE).get(0).checked = false;
		}
		$(JS_TRIM_X, this.dom).val(o.x);
		$(JS_TRIM_Y, this.dom).val(o.y);
		$(JS_TRIM_WIDTH, this.dom).val(o.width);
		$(JS_TRIM_HEIGHT, this.dom).val(o.height);
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
		xml.BeginNode(TAG_CROPPING);
		var trim = this.GetTrimInfo();
		xml.Node(TAG_ENABLED, trim.enable);
		xml.Node(TAG_TOP, String(trim.y));
		xml.Node(TAG_LEFT, String(trim.x));
		xml.Node(TAG_WIDTH, String(trim.width));
		xml.Node(TAG_HEIGHT, String(trim.height));
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
