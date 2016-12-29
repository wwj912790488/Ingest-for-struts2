var DRM_TYPE_ARC = "ARC";

var videoDrmData = {};
var JS_VIDEO_DRM = ".VideoDrm";

videoDrmData.license = {};

videoDrmData.type = [
	{key: DRM_TYPE_ARC, value: "ARC"}
	];

videoDrmData.license.type = [
	{key: DRM_TYPE_ARC, value: license.ARCDRM}
	];

videoDrmData.type = uLicenseFilterKey(videoDrmData.type, videoDrmData.license.type);

videoDrmData.getType = function() {
	return videoDrmData.type;
};

function VideoDrm() {
	var JS_VIDEO_DRM_ITEM = ".VideoDrmItem";
	var JS_NEW_VIDEO_DRM_TRIGGER = ".NewVideoDrmTrigger";
	var JS_VIDEO_DRM_ITEM_CONTAINER = ".VideoDrmItemContainer";
	var JS_VIDEO_DRM_ITEM_INDEX = ".VideoDrmItemIndex";
	
	var MAX_COUNT_VIDEO_DRM_ITEM = 1;
	
	this.dom = null;
	this.itemTmpl = JS_VIDEO_DRM_ITEM_TMPL;	//default value
	this.itemArray = [];
	this.fnNew = null;
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_DRM_DESCRIPTION;
	this.fieldIndex = null;

	this.Init = function(dom, itemTmpl) {
		if(dom == null) return;
		if(itemTmpl != null) {
			this.itemTmpl = itemTmpl;
		}
		
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.ARCDRM) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_VIDEO_DRM_ITEM, this.dom).each(function() {
			var sub = new VideoDrmItem();
			sub.Init(this);
			sub.SetParent(context);
			context.itemArray.push(sub);
		});
		this.SortItem();
	};
	
	this.Delete = function() {
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_NEW_VIDEO_DRM_TRIGGER, this.dom).click(function() {
			context.NewItem();
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.NewItem = function() {
		var item = new VideoDrmItem();
		item.Create($(JS_VIDEO_DRM_ITEM_CONTAINER, this.dom).get(0), this.itemTmpl);
		item.SetParent(this);
		this.itemArray.push(item);
		this.SortItem();
		if($.isFunction(this.fnNew)) {
			this.fnNew(item.dom);
		}
		
		this.OnInfoChange();
	};
	
	this.DeleteItem = function(item) {
		var bFound = false;
		var len = this.itemArray.length;
		for(var i = 0; i < len; i++) {
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
		this.SortItem();
		this.OnInfoChange();
	};

	this.SortItem = function() {
		var $arr = $(JS_VIDEO_DRM_ITEM_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_VIDEO_DRM_ITEM) {
			$(JS_NEW_VIDEO_DRM_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_VIDEO_DRM_TRIGGER, this.dom).show();
		}
	};

	this.ClearList = function() {
		if(this.dom == null) return;
		
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.Delete();
		}
		this.itemArray.length = 0;
		this.SortItem();
	};
	
	this.SetParent = function(parent) {
		this.parent = parent;
	};
	
	this.OnInfoChange = function() {
		if(this.parent == null) return;
		this.parent.OnInfoChange();
	};
	
	/* XML submit */
	this.GetValueByJS = function(jsSelect) {
		var value = null;
		var $sel = $(jsSelect, this.dom);
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
	
	this.XML = function(xml) {
		if(this.dom == null) return;
		
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
		return this.prefixField;
	};
	
	this.UpdateElementName = function() {
		if(this.dom == null) return;

		this.UpdateSubElement();
	};
	
	this.UpdateSubElement = function() {
		var fullField = this.GetFullField();
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.SetPrefixField(fullField);
			item.SetFieldIndex(i);
			item.UpdateElementName();
		}
	};
	/* Field operate end */
}

function VideoDrmItem() {
	var JS_DELETE_VIDEO_DRM_TRIGGER = ".DeleteVideoDrmTrigger";
	
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
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_DRM_DESCRIPTION;
	this.fieldIndex = null;
	
	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_VIDEO_DRM_ITEM_TMPL;
		}
		var $tmp = $(tmpl);
		if($tmp.length == 0) return null;
		
		var $dom = $tmp.clone();
		$dom.attr("id", "");
		$(domParent).append($dom.get(0));
		
		this.Init($dom.get(0));
		return this.dom;
	};

	this.Init = function(dom) {
		if(this.dom == dom) return;
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitType();
	};
	
	this.LicenseControl = function() {
	};
	
	this.Delete = function() {
		if(this.dom == null) return;
		$(this.dom).remove();
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.SetParent = function(parent) {
		this.parent = parent;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		if(this.dom == null) return;
		ValidatorBindArray(this.dom, validatorMap);
		
		var arr = videoDrmData.getType();
		uUpdateSelect($(JS_DRM_DESCRIPTION_TYPE, this.dom).get(0), arr);
		
		$(JS_DRM_DESCRIPTION_TYPE, this.dom).change(function() {
			context.UpdateType();
		});
		
		$(JS_DELETE_VIDEO_DRM_TRIGGER, this.dom).click(function() {
			context.parent.DeleteItem(context);
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
	
	this.SyncDrmType = function() {
		var drmType = $(JS_DRM_DESCRIPTION_TYPE, this.dom).val();
		$(JS_DRM_SETTING_TYPE, this.dom).val(drmType);
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
		/*if(this.fieldIndex == null) {
			field = this.prefixField + this.myField + ".";
		} else {
			field = this.prefixField + this.myField + "[" + this.fieldIndex + "].";
		}*/
		//only one DrmDescription in VideoDescription.java
		field = this.prefixField + this.myField + ".";
		return field;
	};
	
	this.UpdateElementName = function() {
		if(this.dom == null) return;
		this.SyncDrmType();

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
