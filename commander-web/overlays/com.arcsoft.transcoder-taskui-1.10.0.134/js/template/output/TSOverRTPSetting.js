function TSOverRTPSetting() {
	var JS_RTP_PORT = "input[name='RTPPort']";
	
	var TAG_TS_OVER_RTP_SETTING = "tsoverrtpsetting";
	var TAG_RTP_PORT = "port";
	
	var FIELD_CONTAINER_SETTING = "containerSetting";
	var FIELD_RTP_PORT = "port";
	
	/*static var*/
	var tagMap = [
	    {key: TAG_RTP_PORT, value: JS_RTP_PORT}
   		];
	
	var fieldMap = [
		{key: FIELD_RTP_PORT, value: JS_RTP_PORT}
		];
	
	var validatorMap = [
		{selector: JS_RTP_PORT, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 65535, recommend: 5540} }
		];
	
	this.dom = null;
	this.myTag = TAG_TS_OVER_RTP_SETTING;
	
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
		ValidatorBindArray(this.dom, validatorMap);
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
