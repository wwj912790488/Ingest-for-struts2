function EditorMosaicItem() {
	var tagMap = [
		{key: TAG_TOP, value: JS_MOSAIC_Y},
		{key: TAG_LEFT, value: JS_MOSAIC_X},
		{key: TAG_WIDTH, value: JS_MOSAIC_WIDTH},
		{key: TAG_HEIGHT, value: JS_MOSAIC_HEIGHT},
		{key: TAG_MOSAIC_BLUR, value: JS_MOSAIC_BLUR},
		{key: TAG_MOSAIC_TYPE, value: JS_MOSAIC_TYPE},
		{key: TAG_MOSAIC_ACTIVE_TIME, value: JS_MOSAIC_ACTIVE_TIME},
		{key: TAG_MOSAIC_START, value: JS_MOSAIC_START},
		{key: TAG_MOSAIC_END, value: JS_MOSAIC_END}
		];
	
	var fieldMap = [
		{key: FIELD_MOSAIC_X, value: JS_MOSAIC_X},
		{key: FIELD_MOSAIC_Y, value: JS_MOSAIC_Y},
		{key: FIELD_MOSAIC_WIDTH, value: JS_MOSAIC_WIDTH},
		{key: FIELD_MOSAIC_HEIGHT, value: JS_MOSAIC_HEIGHT},
		{key: FIELD_MOSAIC_BLUR, value: JS_MOSAIC_BLUR},
		{key: FIELD_MOSAIC_ACTIVE_TIME, value: JS_MOSAIC_ACTIVE_TIME},
		{key: FIELD_MOSAIC_START, value: JS_MOSAIC_START},
		{key: FIELD_MOSAIC_END, value: JS_MOSAIC_END},
		{key: FIELD_MOSAIC_TYPE, value: JS_MOSAIC_TYPE}
		];
	
	var validatorMap = [
		{selector: JS_MOSAIC_X, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: null, recommend: 0} },
		{selector: JS_MOSAIC_Y, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: null, recommend: 0} },
		{selector: JS_MOSAIC_WIDTH, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: null, recommend: 0} },
		{selector: JS_MOSAIC_HEIGHT, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: null, recommend: 0} },
		{selector: JS_MOSAIC_START, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} },
		{selector: JS_MOSAIC_END, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} }
		];

	this.prefixField = "";
	this.myField = FIELD_MOSAICS;
	this.fieldIndex = null;
	
	this.dom = null;
	this.editorMosaic = null;
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};

	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_MOSIAC_ITEM_TMPL;
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
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_MOSAIC_TIME) != license.ENABLED) {
			$(".LicenseMosaicTime", this.dom).hide();
		}
	};
	
	this.Delete = function() {
		$(this.dom).remove();
		this.dom = null;
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_DELETE_MOSAIC_TRIGGER, this.dom).click(function() {
			if(context.editorMosaic != null) {
				context.editorMosaic.DeleteMosaicItem(context);
			}
		});
		
		var arr = editorMosaicData.getBlur();
		var $sel = $(JS_MOSAIC_BLUR, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = editorMosaicData.getType();
		$sel = $(JS_MOSAIC_TYPE, this.dom);
		uUpdateSelect($sel[0], arr);
		
		$('input', this.dom).focus(function() {
			g_Focus = this;
		});
		
		$('input', this.dom).blur(function() {
			g_Focus = null;
		});
		
		$('select', this.dom).focus(function() {
			g_Focus = this;
		});
		
		$('select', this.dom).blur(function() {
			g_Focus = null;
		});
		
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.SetEditorMosaic = function(m) {
		this.editorMosaic = m;
	};
	
	this.GetMosaicItemInfo = function() {
		var o = {};
		var value = null;
		
		value = this.GetValueByJS(JS_MOSAIC_X);
		o.x = parseInt(value);
		if(isNaN(o.x)) o.x = 0;
		
		value = this.GetValueByJS(JS_MOSAIC_Y);
		o.y = parseInt(value);
		if(isNaN(o.y)) o.y = 0;
		
		value = this.GetValueByJS(JS_MOSAIC_WIDTH);
		o.width = parseInt(value);
		if(isNaN(o.width)) o.width = 0;
		
		value = this.GetValueByJS(JS_MOSAIC_HEIGHT);
		o.height = parseInt(value);
		if(isNaN(o.height)) o.height = 0;
		
		o.blur = this.GetValueByJS(JS_MOSAIC_BLUR);
		
		o.mosaicType = this.GetValueByJS(JS_MOSAIC_TYPE);
		o.activeTime = this.GetValueByJS(JS_MOSAIC_ACTIVE_TIME);
		o.start = this.GetValueByJS(JS_MOSAIC_START);
		o.end = this.GetValueByJS(JS_MOSAIC_END);
		
		return o;
	};
	
	this.SetMosaicItemInfo = function(o) {
		$(JS_MOSAIC_X, this.dom).val(o.x);
		$(JS_MOSAIC_Y, this.dom).val(o.y);
		$(JS_MOSAIC_WIDTH, this.dom).val(o.width);
		$(JS_MOSAIC_HEIGHT, this.dom).val(o.height);
		$(JS_MOSAIC_BLUR, this.dom).val(o.blur);
		$(JS_MOSAIC_TYPE, this.dom).val(o.mosaicType);
		$(JS_MOSAIC_START, this.dom).val(o.start);
		$(JS_MOSAIC_END, this.dom).val(o.end);
		if(o.activeTime == ENABLE_TRUE) {
			$(JS_MOSAIC_ACTIVE_TIME, this.dom).get(0).checked = true;
		} else {
			$(JS_MOSAIC_ACTIVE_TIME, this.dom).get(0).checked = false;
		}
	};
	
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
		xml.BeginNode(TAG_MOSAIC);
		
		var value = null;
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

function EditorMosaic() {
	this.prefixField = "";
	this.myField = FIELD_MOSAIC;
	this.fieldIndex = null;
	
	this.dom = null;
	this.mosaicItemTmpl = JS_MOSIAC_ITEM_TMPL;	//default value
	this.mosaicItemArray = [];
	this.fnNew = null;

	this.Init = function(dom, mosaicItemTmpl) {
		if(mosaicItemTmpl != null) {
			this.mosaicItemTmpl = mosaicItemTmpl;
		}
		
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_MOSAIC_INSERTION) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		var context = this;
		$(JS_MOSAIC_ITEM, this.dom).each(function() {
			var sub = new EditorMosaicItem();
			sub.Init(this);
			sub.SetEditorMosaic(context);
			context.mosaicItemArray.push(sub);
		});
		this.SortMosaicItem();
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_NEW_MOSAIC_TRIGGER, this.dom).click(function() {
			context.NewMosaicItem();
		});
	};
	
	this.NewMosaicItem = function() {
		var item = new EditorMosaicItem();
		item.Create($(JS_MOSAIC_ITEM_CONTAINER, this.dom).get(0), this.mosaicItemTmpl);
		item.SetEditorMosaic(this);
		this.mosaicItemArray.push(item);
		this.SortMosaicItem();
		if($.isFunction(this.fnNew)) {
			this.fnNew(item.dom);
		}
	};
	
	this.DeleteMosaicItem = function(item) {
		var bFound = false;
		var len = this.mosaicItemArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.mosaicItemArray[i-1] = this.mosaicItemArray[i];
			} else {
				if(this.mosaicItemArray[i] == item) {
					item.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.mosaicItemArray.length--;
		}
		this.SortMosaicItem();
	};
	
	this.SortMosaicItem = function() {
		var $dom = $(this.dom);
		var $arr = $dom.find(JS_MOSAIC_ITEM_INDEX);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_MOSAIC_ITEM) {
			$dom.find(JS_NEW_MOSAIC_TRIGGER).hide();
		} else {
			$dom.find(JS_NEW_MOSAIC_TRIGGER).show();
		}
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.GetMosaicInfo = function() {
		if(this.dom == null) return null;
		var o = {};
		o.enable = this.GetValueByJS(JS_MOSAIC_ENABLE);
		return o;
	};

	this.SetMosaicInfo = function(o) {
		if(this.dom == null) return;
		var $mosaic = $(this.dom);
		if(o.enable == ENABLE_TRUE) {
			$mosaic.find(JS_MOSAIC_ENABLE).get(0).checked = true;
		} else {
			$mosaic.find(JS_MOSAIC_ENABLE).get(0).checked = false;
		}
	};
	
	this.ClearMosaicList = function() {
		if(this.dom == null) return;
		for(var i = 0; i < this.mosaicItemArray.length; i++) {
			var item = this.mosaicItemArray[i];
			item.Delete();
		}
		this.mosaicItemArray.length = 0;
		this.SortMosaicItem();
	};
	
	this.SetMosaicList = function(o) {
		if(this.dom == null) return;
		this.ClearMosaicList();
		if(o == null) return;
		for(var i = 0; i < o.length; i++) {
			var item = new EditorMosaicItem();
			item.Create($(JS_MOSAIC_ITEM_CONTAINER, this.dom).get(0), this.mosaicItemTmpl);
			item.SetEditorMosaic(this);
			item.SetMosaicItemInfo(o[i]);
			this.mosaicItemArray.push(item);
			if($.isFunction(this.fnNew)) {
				this.fnNew(item.dom);
			}
		}
		this.SortMosaicItem();
	};
	
	this.GetMosaicList = function() {
		if(this.dom == null) return null;
		var o = [];
		for(var i = 0; i < this.mosaicItemArray.length; i++) {
			var item = this.mosaicItemArray[i];
			var info = item.GetMosaicItemInfo();
			o.push(info);
		}
		return o;
	};
	
	this.RestoreMosaicInfo = function() {
		if(this.dom == null) return;
		this.ClearMosaicList();
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
		for(var i = 0; i < this.mosaicItemArray.length; i++) {
			var item = this.mosaicItemArray[i];
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
		/*var field = "";
		if(this.fieldIndex == null) {
			field = this.prefixField + this.myField + ".";
		} else {
			field = this.prefixField + this.myField + "[" + this.fieldIndex + "].";
		}
		return field;*/
		return this.prefixField;
	};
	
	this.UpdateElementName = function() {
		if(this.dom == null) return;
		this.UpdateSubElement();
	};
	
	this.UpdateSubElement = function() {
		var fullField = this.GetFullField();
		for(var i = 0; i < this.mosaicItemArray.length; i++) {
			var item = this.mosaicItemArray[i];
			item.SetPrefixField(fullField);
			item.SetFieldIndex(i);
			item.UpdateElementName();
		}
	};
	/* Field operate end */
}
