var DRM_TYPE_TIANYU = "TIANYU";
var DRM_TYPE_ARC = "ARC";

var drmData = {};
drmData.license = {};

drmData.type = [
	{key: DRM_TYPE_TIANYU, value: "TIANYU"},
	{key: DRM_TYPE_ARC, value: "ARC"}
	];

drmData.license.type = [
	{key: DRM_TYPE_ARC, value: license.ARCDRM},
	{key: DRM_TYPE_TIANYU, value: license.TIANYUDRM}
	];

drmData.type = uLicenseFilterKey(drmData.type, drmData.license.type);

drmData.getType = function() {
	return drmData.type;
};

function DRMOptions() {
	var defaultData = {
	};
	
	/*static var*/	
	var fieldMap = [
		{key: FIELD_DRM_DESCRIPTION_TYPE, value: JS_DRM_DESCRIPTION_TYPE},
		{key: FIELD_DRM_DESCRIPTION_ENABLE, value: JS_DRM_DESCRIPTION_ENABLE},
		{key: FIELD_DRM_SETTING_TYPE, value: JS_DRM_SETTING_TYPE},
		{key: FIELD_DRM_CONTENT_ID, value: JS_DRM_CONTENT_ID},
		{key: FIELD_DRM_CUSTOMER_ID, value: JS_DRM_CUSTOMER_ID},
		{key: FIELD_DRM_SERVER_IP, value: JS_DRM_SERVER_IP},
		{key: FIELD_DRM_SERVER_PORT, value: JS_DRM_SERVER_PORT}
	];
	
	var tianYuTagMap = [
		{key: TAG_DRM_DESCRIPTION_TYPE, value: JS_DRM_DESCRIPTION_TYPE},
		{key: TAG_DRM_DESCRIPTION_ENABLE, value: JS_DRM_DESCRIPTION_ENABLE},
		{key: TAG_DRM_SERVER_IP, value: JS_DRM_SERVER_IP},
		{key: TAG_DRM_SERVER_PORT, value: JS_DRM_SERVER_PORT},
		{key: TAG_DRM_CONTENT_ID, value: JS_DRM_CONTENT_ID}
	];
	
	var arcTagMap = [
  		{key: TAG_DRM_DESCRIPTION_TYPE, value: JS_DRM_DESCRIPTION_TYPE},
  		{key: TAG_DRM_DESCRIPTION_ENABLE, value: JS_DRM_DESCRIPTION_ENABLE},
  		{key: TAG_DRM_CONTENT_ID, value: JS_DRM_CONTENT_ID},
  		{key: TAG_DRM_CUSTOMER_ID, value: JS_DRM_CUSTOMER_ID}
  	];
	
	var validatorMap = [
		{selector: JS_DRM_SERVER_IP, type: VALIDATOR_TYPE_IP, param: {} },
		{selector: JS_DRM_SERVER_PORT, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 65535, recommend: 0} }
		];
	
	this.dom = null;
	this.myTag = TAG_DRM_DESCRIPTION;
	
	this.prefixField = "";
	this.myField = FIELD_DRM_DESCRIPTION;
	this.fieldIndex = null;

	this.Init = function(dom) {
		if(this.dom == dom) return;
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitType();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.EX_DRM) != license.ENABLED) {
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
		
		if(this.dom == null) return;
		ValidatorBindArray(this.dom, validatorMap);
		
		var arr = drmData.getType();
		uUpdateSelect($(JS_DRM_DESCRIPTION_TYPE, this.dom).get(0), arr);
		
		$(".DrmExpandTrigger", this.dom).click(function() {
			var target = $(".DrmExpandTarget", context.dom);
			var icon = $(".DrmExpandIcon", context.dom);
			if(target.hasClass("Hide")) {
				target.removeClass("Hide");
				icon.removeClass("ICON_ArrowRight").addClass("ICON_ArrowDown");
			}
			else {
				target.addClass("Hide");
				icon.removeClass("ICON_ArrowDown").addClass("ICON_ArrowRight");
			}
		});

		$("input[name='DRMEnable']", this.dom).click(function(){
			var type = $(JS_DRM_DESCRIPTION_TYPE, context.dom).val();
			if(type == DRM_TYPE_ARC) {
				var checked = $(this).is(":checked");
				if(checked) {
					$("input[name='DRMContentId']", context.dom).val(uGetRandomString());
					$("input[name='DRMCustomerId']", context.dom).val(uGetRandomString());
				} else {
					$("input[name='DRMContentId']", context.dom).val('');
					$("input[name='DRMCustomerId']", context.dom).val('');
				}				
			}
		});
		
		$(JS_DRM_DESCRIPTION_TYPE, this.dom).change(function() {
			context.UpdateType();
		});
	};
	
	this.UpdateType = function() {
		if(this.dom == null) return;
		var type = $(JS_DRM_DESCRIPTION_TYPE, this.dom).val();
		var $tmp = null;
		if(type == DRM_TYPE_TIANYU) {
			$tmp = $(JS_DRM_TIANYU_TMPL).clone();
		}
		else if(type == DRM_TYPE_ARC) {
			$tmp = $(JS_DRM_ARC_TMPL).clone();
		}
		
		var $setting = $(JS_DRM_SETTING_CONTAINER, this.dom);
		$setting.empty();
		$setting.append($tmp.get(0));
	};
	
	this.InitType = function() {
		if(this.dom == null) return;
		var $setting = $(JS_DRM_SETTING, this.dom);
		if($setting.length != 0 
				&& $(JS_DRM_SETTING_TYPE, $setting).val() == $(JS_DRM_DESCRIPTION_TYPE, this.dom).val()) return;
		
		this.UpdateType();
	};
	
	this.GetInfo = function() {
		var o = {};
		return o;
	};
	
	this.SetInfo = function(o) {
	};
	
	this.RestoreInfo = function() {
		this.SetInfo(defaultData);
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
	
	this.Display = function(bDisplay) {
		if(this.dom == null) return;
		var $dom =$(this.dom);
		if(bDisplay) {
			$dom.show();
		} else {
			$dom.hide();
		}
		
	};
	
	/* xml generator */
	this.XML = function(xml) {
		if(this.dom == null) return;

		var tagMap = null;
		var type = $(JS_DRM_DESCRIPTION_TYPE, this.dom).val();
		if(type == DRM_TYPE_TIANYU) {
			tagMap = tianYuTagMap;
		}
		else if(type == DRM_TYPE_ARC) {
			tagMap = arcTagMap;
		}
		else {
			return;
		}
		
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
