var FIELD_SUBTITLE_INSERTERS ="subtitleInserters";

function EditorSubtitleItem() {
	var TAG_SUBTITLE ="subtitle";
	var TAG_SUBTITLE_URI ="uri";
	var TAG_SUBTITLE_ENABLE ="enabled";
	var TAG_SUBTITLE_OPACITY ="opacity";
	var TAG_SUBTITLE_COLOR ="color";
	var TAG_SUBTITLE_FONT_FAMILY ="font";
	var TAG_SUBTITLE_FONT_SIZE ="size";
	var TAG_SUBTITLE_SYNC ="sync";
	var TAG_SUBTITLE_VERTICAL_POSITION ="virticalposition";
	var TAG_SUBTITLE_ENGLISH_FONT ="englishfont";
	var TAG_SUBTITLE_ENGLISH_SIZE ="englishsize";
	var TAG_SUBTITLE_POSITION_TYPE = "positiontype";
	var TAG_SUBTITLE_FONT_INFO_TYPE = "fontinfotype";
	
	var FIELD_SUBTITLE ="subtitleInserters";
	var FIELD_SUBTITLE_URI ="location.uri";
	var FIELD_SUBTITLE_ENABLE ="enabled";
	var FIELD_SUBTITLE_OPACITY ="opacity";
	var FIELD_SUBTITLE_COLOR ="color";
	var FIELD_SUBTITLE_FONT_FAMILY ="font";
	var FIELD_SUBTITLE_FONT_SIZE ="size";
	var FIELD_SUBTITLE_ENGLISH_FONT ="englishFont";
	var FIELD_SUBTITLE_ENGLISH_SIZE ="englishSize";
	var FIELD_SUBTITLE_SYNC ="sync";
	var FIELD_SUBTITLE_VERTICAL_POSITION ="virticalPosition";
	var FIELD_SUBTITLE_LEFT="left";
	var FIELD_SUBTITLE_TOP ="top";
	var FIELD_SUBTITLE_WIDTH ="width";
	var FIELD_SUBTITLE_HEIGHT ="height";
	var FIELD_SUBTITLE_POSITION_TYPE ="positionType";
	var FIELD_SUBTITLE_FONT_INFO_TYPE ="fontInfoType";
	
	var defaultData = {
		enable: ENABLE_FALSE,
		uri: "",
		opacity: "100",
		color: "ffffff",
		fontFamily: "Arial",
		fontSize: "10",
		sync: "0"
	};
	
	var tagMap = [
		{key: TAG_SUBTITLE_ENABLE, value: JS_SUBTITLE_ENABLE},
		{key: TAG_SUBTITLE_URI, value: JS_SUBTITLE_URI},
		{key: TAG_SUBTITLE_FONT_FAMILY, value: JS_SUBTITLE_FONT_FAMILY},
		{key: TAG_SUBTITLE_FONT_SIZE, value: JS_SUBTITLE_FONT_SIZE},
		{key: TAG_SUBTITLE_OPACITY, value: JS_SUBTITLE_OPACITY},
		{key: TAG_SUBTITLE_COLOR, value: JS_SUBTITLE_COLOR},
		{key: TAG_SUBTITLE_SYNC, value: JS_SUBTITLE_SYNC},
		{key: TAG_SUBTITLE_VERTICAL_POSITION, value: JS_SUBTITLE_VERTICAL_POSITION},
		{key: TAG_SUBTITLE_ENGLISH_FONT, value: JS_SUBTITLE_ENGLISH_FONT},
		{key: TAG_SUBTITLE_ENGLISH_SIZE, value: JS_SUBTITLE_ENGLISH_SIZE},
		{key: TAG_LEFT, value: JS_SUBTITLE_LEFT},
		{key: TAG_TOP, value: JS_SUBTITLE_TOP},
		{key: TAG_WIDTH, value: JS_SUBTITLE_WIDTH},
		{key: TAG_HEIGHT, value: JS_SUBTITLE_HEIGHT},
		{key: TAG_SUBTITLE_POSITION_TYPE, value: JS_SUBTITLE_POSITION_TYPE},
		{key: TAG_SUBTITLE_FONT_INFO_TYPE, value: JS_SUBTITLE_FONT_INFO_TYPE}
		];
	
	var fieldMap = [
		{key: FIELD_SUBTITLE_ENABLE, value: JS_SUBTITLE_ENABLE},
		{key: FIELD_SUBTITLE_URI, value: JS_SUBTITLE_URI},
		{key: FIELD_SUBTITLE_OPACITY, value: JS_SUBTITLE_OPACITY},
		{key: FIELD_SUBTITLE_COLOR, value: JS_SUBTITLE_COLOR},
		{key: FIELD_SUBTITLE_FONT_FAMILY, value: JS_SUBTITLE_FONT_FAMILY},
		{key: FIELD_SUBTITLE_FONT_SIZE, value: JS_SUBTITLE_FONT_SIZE},
		{key: FIELD_SUBTITLE_ENGLISH_FONT, value: JS_SUBTITLE_ENGLISH_FONT},
		{key: FIELD_SUBTITLE_ENGLISH_SIZE, value: JS_SUBTITLE_ENGLISH_SIZE},
		{key: FIELD_SUBTITLE_SYNC, value: JS_SUBTITLE_SYNC},
		{key: FIELD_SUBTITLE_VERTICAL_POSITION, value: JS_SUBTITLE_VERTICAL_POSITION},
		{key: FIELD_SUBTITLE_LEFT, value: JS_SUBTITLE_LEFT},
		{key: FIELD_SUBTITLE_TOP, value: JS_SUBTITLE_TOP},
		{key: FIELD_SUBTITLE_WIDTH, value: JS_SUBTITLE_WIDTH},
		{key: FIELD_SUBTITLE_HEIGHT, value: JS_SUBTITLE_HEIGHT},
		{key: FIELD_SUBTITLE_POSITION_TYPE, value: JS_SUBTITLE_POSITION_TYPE},
		{key: FIELD_SUBTITLE_FONT_INFO_TYPE, value: JS_SUBTITLE_FONT_INFO_TYPE}
		];
	
	var infoChanger = [
		JS_SUBTITLE_ENABLE,
		JS_SUBTITLE_URI,
		JS_SUBTITLE_OPACITY,
		JS_SUBTITLE_COLOR,
		JS_SUBTITLE_FONT_FAMILY,
		JS_SUBTITLE_FONT_SIZE,
		JS_SUBTITLE_ENGLISH_FONT,
		JS_SUBTITLE_ENGLISH_SIZE,
		JS_SUBTITLE_SYNC,
		JS_SUBTITLE_VERTICAL_POSITION
		];
	
	var validatorMap = [
		//{selector: JS_SUBTITLE_URI, type: VALIDATOR_TYPE_EXTENSION, param: {ext: "srt"} },
		{selector: JS_SUBTITLE_COLOR, type: VALIDATOR_TYPE_COLOR, param: {recommend: "ffffff"} },
		{selector: JS_SUBTITLE_SYNC, type: VALIDATOR_TYPE_INTEGER, param: {min: -60000, max: 60000, recommend: 0} },
		{selector: JS_SUBTITLE_VERTICAL_POSITION, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 100, recommend: 90} },
		{selector: JS_SUBTITLE_FONT_SIZE, type: MODIFICATION_INTEGER, param: {min: 2, max: 500, recommend: 42} },
		{selector: JS_SUBTITLE_ENGLISH_SIZE, type: MODIFICATION_INTEGER, param: {min: 2, max: 500, recommend: 42} },
		{selector: JS_SUBTITLE_OPACITY, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 100, recommend: 100} }
		];
	
	this.dom = null;
	
	this.prefixField = "";
	this.myField = FIELD_SUBTITLE;
	this.fieldIndex = null;
	this.inputFileName = null;
	this.inputFilePath = null;
	this.parent = null;
	
	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_SUBTITLE_ITEM_TMPL;
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
	
	this.Delete = function() {
		$(this.dom).remove();
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		var $dom = $(this.dom);
		
		$(JS_SELECT_SUBTITLE_TRIGGER, this.dom).click(function() {
			g_SubtitleFileView.SetOnOK(function(key) {
				context.OnFileSelected(key);
			});
			g_SubtitleFileView.SetShowBG(true);
			g_SubtitleFileView.Show();
		});
		
		$(JS_DELETE_SUBTITLE_TRIGGER, this.dom).click(function() {
			if(context.parent != null) {
				context.parent.DeleteSubtitleItem(context);
			}
		});
		
		$(JS_SUBTITLE_COLOR, this.dom).click(function() {
			g_Palette.SetOnClose(function() {
				context.OnPaletteClose();
			});
			var $color = $(JS_SUBTITLE_COLOR, context.dom);
			$color.get(0).disabled = true;
			var color = $color.val();
			g_Palette.SetColor(color);
			g_Palette.SetShowBG(true);
			g_Palette.Show();
		});
		
		var arr = editorSubtitleData.getChineseFont();
		var $sel = $dom.find(JS_SUBTITLE_FONT_FAMILY);
		uUpdateSelect($sel[0], arr);
		
		arr = editorSubtitleData.getEnglishFont();
		var $sel = $dom.find(JS_SUBTITLE_ENGLISH_FONT);
		uUpdateSelect($sel[0], arr);
		
		ValidatorBindArray(this.dom, validatorMap);
		
		this.BindInfoChanger();
	};
	
	this.OnFileSelected = function(key) {
		var $uri = $(JS_SUBTITLE_URI, this.dom);
		$uri.val(key);
		$uri.change();
	};
	
	this.OnPaletteClose = function() {
		var color = g_Palette.GetColor();
		var $color = $(JS_SUBTITLE_COLOR, this.dom);
		$color.get(0).disabled = false;
		$color.val(color).change();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.EX_VIDEO_EDITING_EXTERNAL_SUBTITLE) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
			return;
		}
		
		var strings = [];
		if(GetLicense(license.VIDEO_EDITING_SRT_EXTERNAL_SUBTITILE_INSERTION) == license.ENABLED) {
			strings.push(" .srt");
		}
		if(GetLicense(license.VIDEO_EDITING_SSA_EXTERNAL_SUBTITILE_INSERTION) == license.ENABLED) {
			strings.push(" .ssa");
		}
		if(GetLicense(license.VIDEO_EDITING_ASS_EXTERNAL_SUBTITILE_INSERTION) == license.ENABLED) {
			strings.push(" .ass");
		}
		$(JS_SUBTITLE_SUPPORTED, this.dom).text(strings);
	};
	
	this.SetUri = function(uri) {
		$(JS_SUBTITLE_URI, this.dom).val(uri);
	};
	
	this.GetInfo = function() {
		if(this.dom == null) return null;
		var o = {};
		o.enable = this.GetValueByJS(JS_SUBTITLE_ENABLE);
		o.uri = this.GetValueByJS(JS_SUBTITLE_URI);
		o.opacity = this.GetValueByJS(JS_SUBTITLE_OPACITY);
		o.color = this.GetValueByJS(JS_SUBTITLE_COLOR);
		o.fontFamily = this.GetValueByJS(JS_SUBTITLE_FONT_FAMILY);
		o.fontSize = this.GetValueByJS(JS_SUBTITLE_FONT_SIZE);
		o.sync = this.GetValueByJS(JS_SUBTITLE_SYNC);
		o.vPos = this.GetValueByJS(JS_SUBTITLE_VERTICAL_POSITION);
		o.englishFont = $(JS_SUBTITLE_ENGLISH_FONT, this.dom).val();
		o.englishSize = $(JS_SUBTITLE_ENGLISH_SIZE, this.dom).val();
		o.left = $(JS_SUBTITLE_LEFT, this.dom).val();
		o.left = parseInt(o.left);
		o.top = $(JS_SUBTITLE_TOP, this.dom).val();
		o.top = parseInt(o.top);
		o.width = $(JS_SUBTITLE_WIDTH, this.dom).val();
		o.width = parseInt(o.width);
		o.height = $(JS_SUBTITLE_HEIGHT, this.dom).val();
		o.height = parseInt(o.height);
		
		return o;
	};
	
	this.SetInfo = function(o) {
		if(this.dom == null) return;

		if(o.enable == ENABLE_TRUE) {
			$(JS_SUBTITLE_ENABLE, this.dom).get(0).checked = true;
		} else {
			$(JS_SUBTITLE_ENABLE, this.dom).get(0).checked = false;
		}
		$(JS_SUBTITLE_URI, this.dom).val(o.uri);
		$(JS_SUBTITLE_OPACITY, this.dom).val(o.opacity);
		$(JS_SUBTITLE_COLOR, this.dom).val(o.color);
		$(JS_SUBTITLE_FONT_FAMILY, this.dom).val(o.fontFamily);
		$(JS_SUBTITLE_FONT_SIZE, this.dom).val(o.fontSize);
		$(JS_SUBTITLE_SYNC, this.dom).val(o.sync);
		$(JS_SUBTITLE_VERTICAL_POSITION, this.dom).val(o.vPos);
		$(JS_SUBTITLE_ENGLISH_FONT, this.dom).val(o.englishFont);
		$(JS_SUBTITLE_ENGLISH_SIZE, this.dom).val(o.englishSize);
		$(JS_SUBTITLE_LEFT, this.dom).val(o.left);
		$(JS_SUBTITLE_TOP, this.dom).val(o.top);
		$(JS_SUBTITLE_WIDTH, this.dom).val(o.width);
		$(JS_SUBTITLE_HEIGHT, this.dom).val(o.height);
	};
	
	this.RestoreInfo = function() {
		if(this.dom == null) return;
		this.SetInfo(defaultData);
	};
		
	this.SetParent = function(parent) {
		this.parent = parent;
	};
	
	this.OnInfoChange = function() {
		if(this.parent == null) return;
		this.parent.OnInfoChange();
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
	
	/* XML submit */
	this.GetValueByJS = function(jsSelect) {
		var value = null;
		var $sel = $(jsSelect, this.dom);
		if($sel.attr('type') == "checkbox") {
			if($sel.get(0).checked) {
				value = ENABLE_TRUE;
			} else {
				value = ENABLE_FALSE;
			}
		} else {
			value = $sel.val();
		}
		return value;
	};
	
	this.XML = function(xml) {
		if(this.dom == null) return;
		xml.BeginNode(TAG_SUBTITLE);
		
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

function EditorSubtitleInserter() {
	this.dom = null;
	this.subtitleItemTmpl = JS_SUBTITLE_ITEM_TMPL;	//default value
	this.subtitleItemArray = [];
	this.fnNew = null;
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_SUBTITLE_INSERTERS;
	this.fieldIndex = null;

	this.Init = function(dom, subtitleItemTmpl) {
		if(dom == null) return;
		if(subtitleItemTmpl != null) {
			this.subtitleItemTmpl = subtitleItemTmpl;
		}
		
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.EX_VIDEO_EDITING_EXTERNAL_SUBTITLE) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
			return;
		}
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_SUBTITLE_ITEM, this.dom).each(function() {
			var sub = new EditorSubtitleItem();
			sub.Init(this);
			sub.SetParent(context);
			context.subtitleItemArray.push(sub);
		});
		this.SortSubtitleItem();
	};
	
	this.Delete = function() {
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_NEW_SUBTITLE_TRIGGER, this.dom).click(function() {
			context.NewSubtitleItem();
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.NewSubtitleItem = function() {
		var item = new EditorSubtitleItem();
		item.Create($(JS_SUBTITLE_ITEM_CONTAINER, this.dom).get(0), this.subtitleItemTmpl);
		item.SetParent(this);
		this.subtitleItemArray.push(item);
		this.SortSubtitleItem();
		if($.isFunction(this.fnNew)) {
			this.fnNew(item.dom);
		}
		
		this.OnInfoChange();
	};
	
	this.DeleteSubtitleItem = function(item) {
		var bFound = false;
		var len = this.subtitleItemArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.subtitleItemArray[i-1] = this.subtitleItemArray[i];
			} else {
				if(this.subtitleItemArray[i] == item) {
					item.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.subtitleItemArray.length--;
		}
		this.SortSubtitleItem();
		this.OnInfoChange();
	};
	
	this.OnUriChanged = function(changedItem) {
	};
	
	this.SortSubtitleItem = function() {
		var $arr = $(JS_SUBTITLE_ITEM_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_SUBTITLE_ITEM) {
			$(JS_NEW_SUBTITLE_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_SUBTITLE_TRIGGER, this.dom).show();
		}
	};

	this.ClearSubtitleList = function() {
		if(this.dom == null) return;
		for(var i = 0; i < this.subtitleItemArray.length; i++) {
			var item = this.subtitleItemArray[i];
			item.Delete();
		}
		this.subtitleItemArray.length = 0;
		this.SortSubtitleItem();
	};
	
	this.SetSubtitleList = function(o) {
		if(this.dom == null) return;
		
		this.ClearSubtitleList();
		if(o == null) return;
		for(var i = 0; i < o.length; i++) {
			var item = new EditorSubtitleItem();
			item.Create($(JS_SUBTITLE_ITEM_CONTAINER, this.dom).get(0), this.subtitleItemTmpl);
			item.SetParent(this);
			item.SetInfo(o[i]);
			this.subtitleItemArray.push(item);
			if($.isFunction(this.fnNew)) {
				this.fnNew(item.dom);
			}
		}
		this.SortSubtitleItem();
	};
	
	this.GetSubtitleList = function() {
		if(this.dom == null) return null;
		
		var o = [];
		for(var i = 0; i < this.subtitleItemArray.length; i++) {
			var item = this.subtitleItemArray[i];
			var info = item.GetInfo();
			o.push(info);
		}
		return o;
	};
	
	this.SetParent = function(parent) {
		this.parent = parent;
	};
	
	this.OnInfoChange = function() {
		if(this.parent == null) return;
		this.parent.OnInfoChange();
	};
	
	this.OnInputChanged = function(input) {
		if(input == null) return;
		if(input.GetInputType() != INPUT_TYPE_FILE) return;
		
		var uri = input.GetURI();
		if(uri == null) return;
		
		this.RequestFileList(uri);
	};
	
	this.RequestFileList = function(path) {
		var context = this;
		var _uri = "findExternalSubtitle";
		var _param = {filename: encodeURIComponent(path)};
		$.post(_uri, _param, function(data) {
			context.ResponseFileList(data);
		});
	};
	
	this.ResponseFileList = function(data) {
		var $data = $('<div><div>').html(data);
		var $li = $("li", $data);
		if($li.length = 0) return;
		
		var uri = $li.text();
		if(uri == null) return;
		if(uri.length == 0) return;
		
		if(this.subtitleItemArray.length == 0) {
			this.NewSubtitleItem();
		}
		
		for(var i = 0; i < this.subtitleItemArray.length; i++) {
			var item = this.subtitleItemArray[i];
			item.SetUri(uri);
		}
		
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
		for(var i = 0; i < this.subtitleItemArray.length; i++) {
			var item = this.subtitleItemArray[i];
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
		for(var i = 0; i < this.subtitleItemArray.length; i++) {
			var item = this.subtitleItemArray[i];
			item.SetPrefixField(fullField);
			item.SetFieldIndex(i);
			item.UpdateElementName();
		}
	};
	/* Field operate end */
}