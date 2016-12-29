var FIELD_IMAGE_INSERTER ="imageInserters";
var FIELD_IMAGE_INSERTER_URI ="location.uri";
var FIELD_IMAGE_INSERTER_ENABLE ="enabled";
var FIELD_IMAGE_INSERTER_X ="imageX";
var FIELD_IMAGE_INSERTER_Y ="imageY";
var FIELD_IMAGE_INSERTER_OPACITY ="opacity";
var FIELD_IMAGE_INSERTER_RESIZE ="resize";
var FIELD_IMAGE_INSERTER_SOURCETYPE ="sourceType";

var JS_LOGO_SOURCETYPE ="input[name='LogoSourceType']";
var TAG_SOURCETYPE = "sourcetype";


function EditorLogoItem() {
	var tagMap = [
  		{key: TAG_URI, value: JS_LOGO_URI},
  		{key: TAG_TOP, value: JS_LOGO_Y},
  		{key: TAG_LEFT, value: JS_LOGO_X},
  		{key: TAG_OPACITY, value: JS_LOGO_OPACITY},
  		{key: TAG_RESIZE, value: JS_LOGO_RESIZE},
		{key: TAG_SOURCETYPE, value: JS_LOGO_SOURCETYPE}
  		];
  	
  	var fieldMap = [
  		{key: FIELD_IMAGE_INSERTER_URI, value: JS_LOGO_URI},
  		{key: FIELD_IMAGE_INSERTER_X, value: JS_LOGO_X},
  		{key: FIELD_IMAGE_INSERTER_Y, value: JS_LOGO_Y},
  		{key: FIELD_IMAGE_INSERTER_OPACITY, value: JS_LOGO_OPACITY},
  		{key: FIELD_IMAGE_INSERTER_RESIZE, value: JS_LOGO_RESIZE},
		{key: FIELD_IMAGE_INSERTER_SOURCETYPE, value: JS_LOGO_SOURCETYPE}
  		];
  	
	var infoChanger = [
  		JS_LOGO_URI,
  		JS_LOGO_OPACITY,
  		JS_LOGO_X,
  		JS_LOGO_Y,
  		JS_LOGO_RESIZE
  		];
  	
  	var validatorMap = [
  		{selector: JS_LOGO_URI, type: VALIDATOR_TYPE_EXTENSION, param: {ext: "png|bmp"} },
  		{selector: JS_LOGO_X, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: MAX_INTEGER, recommend: 0} },
  		{selector: JS_LOGO_Y, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: MAX_INTEGER, recommend: 0} },
  		{selector: JS_LOGO_OPACITY, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 100, recommend: 100} },
  		{selector: JS_LOGO_RESIZE, type: MODIFICATION_FLOAT, param: {min: 1, max: MAX_INTEGER, recommend: 100} }
  		];
  	
	this.dom = null;
	this.logoInserter = null;
	this.prefixField = "";
	this.myField = FIELD_IMAGE_INSERTER;
	this.fieldIndex = null;
	this.srcWidth = null;
	this.srcHeight = null;
	this.fnGetOffset = null;
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_LOGO_ITEM_TMPL;
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
		
		//this.RequestImageInfo();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.MATERIAL_MANAGEMENT) != license.ENABLED) {
			$(JS_LICENSE_MATERIAL, this.dom).remove();
		};
	}
	
	this.Delete = function() {
		$(this.dom).remove();
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_SELECT_LOGO_TRIGGER, this.dom).click(function() {
			context.ShowFileDialog();
		});
		
		$(".LogoMaterialTrigger", this.dom).click(function() {
			context.RequestMaterial();
		});
		
		$(JS_DELETE_LOGO_TRIGGER, this.dom).click(function() {
			if(context.logoInserter != null) {
				context.logoInserter.DeleteLogoItem(context);
			}
		});
		
		ValidatorBindArray(this.dom, validatorMap);
		
		$(JS_LOGO_URI, this.dom).change(function() {
			context.logoInserter.OnUriChanged(context);
			//context.RequestImageInfo();
		});
		
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
		
		this.BindInfoChanger();
	};
	
	this.SetFnGetOffset = function(fn) {
		this.fnGetOffset = fn;
	}
	
	this.GetUri = function() {
		return this.GetValueByJS(JS_LOGO_URI);
	};
	
	this.SetUri = function(text) {
		$(JS_LOGO_URI, this.dom).val(text);
	};
	
	this.GetInfo = function() {
		var o = new Object();
		
		o.uri = this.GetValueByJS(JS_LOGO_URI);
		
		o.opacity = this.GetValueByJS(JS_LOGO_OPACITY);
		o.opacity = parseInt(o.opacity);
		if(isNaN(o.opacity)) o.opacity = 100;
		
		o.x = this.GetValueByJS(JS_LOGO_X);
		o.x = parseInt(o.x);
		if(isNaN(o.x)) o.x = 0;
		
		o.y = this.GetValueByJS(JS_LOGO_Y);
		o.y = parseInt(o.y);
		if(isNaN(o.y)) o.y = 0;
		
		var val = $(JS_LOGO_RESIZE, this.dom).val();
		o.resize = parseFloat(val);
		if(isNaN(o.resize)) o.resize = 100;
		
		o.sourceType = this.GetValueByJS(JS_LOGO_SOURCETYPE);
		o.sourceType = parseInt(o.sourceType);
		if(isNaN(o.sourceType)) o.sourceType = 0;
		
		o.srcWidth = this.srcWidth;
		o.srcHeight = this.srcHeight;
		
		return o;
	};
	
	this.SetInfo = function(o) {
		$(JS_LOGO_URI, this.dom).val(o.uri);
		$(JS_LOGO_OPACITY, this.dom).val(o.opacity);
		$(JS_LOGO_X, this.dom).val(o.x);
		$(JS_LOGO_Y, this.dom).val(o.y);
		$(JS_LOGO_RESIZE, this.dom).val(o.resize);
		$(JS_LOGO_SOURCETYPE, this.dom).val(o.sourceType);
		this.srcWidth = o.srcWidth;
		this.srcHeight = o.srcHeight;
	};
	
	this.SetSourceType = function(sourceType) {
		$(JS_LOGO_SOURCETYPE, this.dom).val(sourceType);
	}
	
	this.SetLogoInserter = function(logoInserter) {
		this.logoInserter = logoInserter;
	};
	
	this.OnInfoChange = function() {
		if(this.logoInserter == null) return;
		this.logoInserter.OnInfoChange();
	};
	
	this.BindInfoChanger = function() {
		var context = this;
		for(var i = 0; i < infoChanger.length; i++) {
			var sel = infoChanger[i];
			$(sel, this.dom).change(function() {
				context.OnInfoChange();
			});
		}
	};
	
	this.RequestImageInfo = function() {
		var uri = $(JS_LOGO_URI, this.dom).val();
		if(uri == null || uri.length == 0) return;
		
		var url = "getImageInfo";
		var param = {"uri": uri};
		
		var context = this;
		$.post(url, param, function(data) {
			context.parseImageInfo(data);
		});
	};
	
	this.parseImageInfo = function(data) {
		var $dom = $(data);
		
		var width = $dom.find("#width").text();
		this.srcWidth = parseInt(width);
		if(isNaN(this.srcWidth)) this.srcWidth = null;
		
		var height = $dom.find("#height").text();
		this.srcHeight = parseInt(height);
		if(isNaN(this.srcHeight)) this.srcHeight = null;
	};
	
	this.ShowFileDialog = function() {
		var context = this;
		g_LogoFileView.SetOnOK(function(key) {
			$(JS_LOGO_URI, context.dom).val(key).change();
		});
		
		var offset = null;
		if($.isFunction(this.fnGetOffset)) {
			offset = this.fnGetOffset(g_LineSelector);
		}
		if(offset != null) {
			g_LogoFileView.Show(offset.left, offset.top);
		}
		else {
			g_LogoFileView.Show();
		}
	}
	
	this.ShowLineDialog = function(title, map) {
		var context = this;
		g_LineSelector.setContent(map);
		g_LineSelector.setTitle(title);
		g_LineSelector.setOnSelected(function(key) {
			if(key.length == 0) return;
			
			$(JS_LOGO_URI, context.dom).val(key).change();
		});
		
		var offset = null;
		if($.isFunction(this.fnGetOffset)) {
			offset = this.fnGetOffset(g_LineSelector);
		}
		if(offset != null) {
			g_LineSelector.show(offset.left, offset.top);
		}
		else {
			g_LineSelector.show();
		}
	};
	
	this.ListMaterial = function(arr) {
		var context = this;
		var maps = [];
		
		for(var i = 0; i < arr.length; i++) {
			var o = {};
			o.key = arr[i].content;
			o.value = arr[i].name + " - " + arr[i].content;
			maps.push(o);
		};

		this.ShowLineDialog(str_common.material, maps)
	};
	
	this.RequestMaterial = function() {
		var context = this;
		var url = "listMaterialBrief";
		var param = {materialType: MATERIAL_TYPE_LOGO, rand: Math.random()};
		$.post(url, param, function(data) {
			var arr = ParseMaterial(data);
			context.ListMaterial(arr);
		});
	};
	
	/* XML submit */
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
		} else {
			value = $sel.val();
		}
		return value;
	};
	
	this.XML = function(xml) {
		xml.BeginNode(TAG_LOGO);
		
		var len = tagMap.length;
		for(var i = 0; i < len; i++) {
			var value = this.GetValueByJS(tagMap[i].value);
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

function EditorLogoInserter() {
	this.dom = null;
	this.logoItemTmpl = JS_LOGO_ITEM_TMPL;	//default value
	this.logoItemArray = [];
	this.fnNew = null;
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_IMAGE_INSERTER;
	this.fieldIndex = null;

	this.Init = function(dom, logoItemTmpl) {
		if(dom == null) return;
		if(logoItemTmpl != null) {
			this.logoItemTmpl = logoItemTmpl;
		}
		
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_LOGO_INSERTION) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.InitSub = function() {
		var context = this;
		$(JS_LOGO_ITEM, this.dom).each(function() {
			var sub = new EditorLogoItem();
			sub.Init(this);
			sub.SetLogoInserter(context);
			context.logoItemArray.push(sub);
		});
		this.SortLogoItem();
	};
	
	this.Delete = function() {
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_NEW_LOGO_TRIGGER, this.dom).click(function() {
			context.NewLogoItem();
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.NewLogoItem = function() {
		var item = new EditorLogoItem();
		item.Create($(JS_LOGO_ITEM_CONTAINER, this.dom).get(0), this.logoItemTmpl);
		item.SetLogoInserter(this);
		this.logoItemArray.push(item);
		this.SortLogoItem();
		if($.isFunction(this.fnNew)) {
			this.fnNew(item);
		}
		
		this.OnInfoChange();
	};
	
	this.DeleteLogoItem = function(item) {
		var bFound = false;
		var len = this.logoItemArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.logoItemArray[i-1] = this.logoItemArray[i];
			} else {
				if(this.logoItemArray[i] == item) {
					item.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.logoItemArray.length--;
		}
		this.SortLogoItem();
		this.OnInfoChange();
	};
	
	this.OnUriChanged = function(changedItem) {
		var len = this.logoItemArray.length;
		for(var i = 0; i < len; i++) {
			var pilot = this.logoItemArray[i];
			if(pilot != changedItem) {
				if(pilot.GetUri() == changedItem.GetUri()) {
					alert(str_warning.sameLogo);
					changedItem.SetUri("");
					break;
				}
			}
		}
	};
	
	this.SortLogoItem = function() {
		var $dom = $(this.dom);
		var $arr = $dom.find(JS_LOGO_ITEM_INDEX);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_LOGO_ITEM) {
			$dom.find(JS_NEW_LOGO_TRIGGER).hide();
		} else {
			$dom.find(JS_NEW_LOGO_TRIGGER).show();
		}
	};

	this.GetInfo = function() {
		if(this.dom == null) return null;
		var o = new Object();
		o.enable = this.GetValueByJS(JS_LOGO_ENABLE);
		return o;
	};
	
	this.SetInfo = function(o) {
		if(o == null) return;
		if(this.dom == null) return;
		var $dom = $(this.dom);
		if(o.enable == ENABLE_TRUE) {
			$dom.find(JS_LOGO_ENABLE).get(0).checked = true;
		} else {
			$dom.find(JS_LOGO_ENABLE).get(0).checked = false;
		}
	};

	this.ClearLogoList = function() {
		if(this.dom == null) return;
		for(var i = 0; i < this.logoItemArray.length; i++) {
			var item = this.logoItemArray[i];
			item.Delete();
		}
		this.logoItemArray.length = 0;
		this.SortLogoItem();
	};
	
	this.SetLogoList = function(o) {
		if(this.dom == null) return;
		this.ClearLogoList();
		if(o == null) return;
		for(var i = 0; i < o.length; i++) {
			var item = new EditorLogoItem();
			item.Create($(JS_LOGO_ITEM_CONTAINER, this.dom).get(0), this.logoItemTmpl);
			item.SetLogoInserter(this);
			o[i].sourceType = 0;
			item.SetInfo(o[i]);
			this.logoItemArray.push(item);
			if($.isFunction(this.fnNew)) {
				this.fnNew(item);
			}
		}
		this.SortLogoItem();
	};
	
	this.GetLogoList = function() {
		if(this.dom == null) return null;
		var o = [];
		for(var i = 0; i < this.logoItemArray.length; i++) {
			var item = this.logoItemArray[i];
			var info = item.GetInfo();
			if(info.sourceType == 0){
				o.push(info);
			}
		}
		return o;
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.GetInputLogoList = function(){
		if(this.dom == null) return null;
		var o = [];
		for(var i = 0; i < this.logoItemArray.length; i++) {
			var item = this.logoItemArray[i];
			var info = item.GetInfo();
			if(info.sourceType == 1/*Input Logo*/){
				o.push(info);
			}
		}
		return o;		
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.SetInputLogoList = function(o) {
		if(this.dom == null) return;
		for(var i = this.logoItemArray.length -1; i >= 0; i--) {
			var item = this.logoItemArray[i];
			var info = item.GetInfo();
			if(info.sourceType == 1){				
				this.logoItemArray.remove(i);
				item.Delete();
			}
		}
		for(var i = 0; i < o.length; i++) {
			var item = new EditorLogoItem();
			item.Create($(JS_LOGO_ITEM_CONTAINER, this.dom).get(0), this.logoItemTmpl);
			item.SetLogoInserter(this);
			o[i].sourceType = 1;
			item.SetInfo(o[i]);
			this.logoItemArray.push(item);
		}
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
		var $sel = $(this.dom).find(jsSelect);
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
		for(var i = 0; i < this.logoItemArray.length; i++) {
			var item = this.logoItemArray[i];
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
		/*var len = fieldMap.length;
		var fullField = this.GetFullField();
		for(var i = 0; i < len; i++) {
			var $sel = $(fieldMap[i].value, this.dom);
			var elName = fullField + fieldMap[i].key;
			$sel.attr("name", elName);
		};*/
		this.UpdateSubElement();
	};
	
	this.UpdateSubElement = function() {
		var fullField = this.GetFullField();
		for(var i = 0; i < this.logoItemArray.length; i++) {
			var item = this.logoItemArray[i];
			item.SetPrefixField(fullField);
			item.SetFieldIndex(i);
			item.UpdateElementName();
		}
	};
	/* Field operate end */
}
