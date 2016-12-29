var MAX_COUNT_WATERMARKING_ITEM = 2;

var JS_WATERMARKING_ITEM_TMPL ="#TemplateLib #WatermarkingItemTmpl";
var JS_WATERMARKING_ITEM = ".WatermarkingItem";
var JS_NEW_WATERMARKING_TRIGGER = ".NewWatermarkingTrigger";
var JS_WATERMARKING_ITEM_CONTAINER = ".WatermarkingItemContainer";
var JS_WATERMARKING_ITEM_INDEX = ".WatermarkingItemIndex";
var JS_WATERMARKING = ".Watermarking";
var JS_DELETE_WATERMARKING_TRIGGER = ".DeleteWatermarkingTrigger";

var TAG_WATERMARKING ="watermarking";
var TAG_WATERMARKING_LABEL ="label";
var TAG_WATERMARKING_OPACITY ="opacity";
var TAG_WATERMARKING_COLOR ="color";
var TAG_WATERMARKING_FONT ="font";
var TAG_WATERMARKING_SIZE ="size";
var TAG_WATERMARKING_ENGLISH_FONT ="englishfont";
var TAG_WATERMARKING_ENGLISH_SIZE ="englishsize";
var TAG_WATERMARKING_BG_OPACITY = "bgopacity";
var TAG_WATERMARKING_BG_COLOR = "bgcolor";
var TAG_WATERMARKING_TYPE ="type";

var FIELD_WATERMARKING_INSERTERS ="watermarkingInserters";
var FIELD_WATERMARKING_LABEL ="label";
var FIELD_WATERMARKING_OPACITY ="opacity";
var FIELD_WATERMARKING_COLOR ="color";
var FIELD_WATERMARKING_FONT ="font";
var FIELD_WATERMARKING_SIZE ="size";
var FIELD_WATERMARKING_ENGLISH_FONT ="englishFont";
var FIELD_WATERMARKING_ENGLISH_SIZE ="englishSize";
var FIELD_WATERMARKING_POSX="posX";
var FIELD_WATERMARKING_POSY ="posY";
var FIELD_WATERMARKING_WIDTH ="width";
var FIELD_WATERMARKING_HEIGHT ="height";
var FIELD_WATERMARKING_BG_OPACITY ="bgOpacity";
var FIELD_WATERMARKING_BG_COLOR ="bgColor";
var FIELD_WATERMARKING_TYPE ="type";

var JS_WATERMARKING_LABEL ="input[name='WatermarkingLabel']";
var JS_WATERMARKING_OPACITY ="input[name='WatermarkingOpacity']";
var JS_WATERMARKING_COLOR ="input[name='WatermarkingColor']";
var JS_WATERMARKING_FONT ="select[name='WatermarkingFont']";
var JS_WATERMARKING_SIZE ="input[name='WatermarkingSize']";
var JS_WATERMARKING_ENGLISH_FONT ="select[name='WatermarkingEnglishFont']";
var JS_WATERMARKING_ENGLISH_SIZE ="input[name='WatermarkingEnglishSize']";
var JS_WATERMARKING_POSX = "input[name='WatermarkingPosX']";
var JS_WATERMARKING_POSY = "input[name='WatermarkingPosY']";
var JS_WATERMARKING_WIDTH = "input[name='WatermarkingWidth']";
var JS_WATERMARKING_HEIGHT = "input[name='WatermarkingHeight']";
var JS_WATERMARKING_BG_OPACITY = "input[name='WatermarkingBgOpacity']";
var JS_WATERMARKING_BG_COLOR = "input[name='WatermarkingBgColor']";
var JS_WATERMARKING_TYPE ="select[name='WatermarkingType']";
var JS_TYPE_WATERMARK = ".TypeWatermark";

var WATER_MARKING_TYPE_WATERMARK = "0";
var WATER_MARKING_TYPE_SIGNATURE = "1";

var waterMarkingData = {};

waterMarkingData.type = [
	{key: WATER_MARKING_TYPE_WATERMARK, value: str_water_marking.watermark},
	{key: WATER_MARKING_TYPE_SIGNATURE, value: str_water_marking.signature}
	];

waterMarkingData.getType = function() {
	return waterMarkingData.type;
};

function WatermarkingItem() {
	var tagMap = [
		{key: TAG_WATERMARKING_LABEL, value: JS_WATERMARKING_LABEL},
		{key: TAG_WATERMARKING_FONT, value: JS_WATERMARKING_FONT},
		{key: TAG_WATERMARKING_SIZE, value: JS_WATERMARKING_SIZE},
		{key: TAG_WATERMARKING_OPACITY, value: JS_WATERMARKING_OPACITY},
		{key: TAG_WATERMARKING_COLOR, value: JS_WATERMARKING_COLOR},
		{key: TAG_POS_X, value: JS_WATERMARKING_POSX},
		{key: TAG_POS_Y, value: JS_WATERMARKING_POSY},
		{key: TAG_WIDTH, value: JS_WATERMARKING_WIDTH},
		{key: TAG_HEIGHT, value: JS_WATERMARKING_HEIGHT},
		{key: TAG_WATERMARKING_BG_OPACITY, value: JS_WATERMARKING_BG_OPACITY},
		{key: TAG_WATERMARKING_BG_COLOR, value: JS_WATERMARKING_BG_COLOR},
		{key: TAG_WATERMARKING_TYPE, value: JS_WATERMARKING_TYPE}
		];
	
	var fieldMap = [
		{key: FIELD_WATERMARKING_LABEL, value: JS_WATERMARKING_LABEL},
		{key: FIELD_WATERMARKING_FONT, value: JS_WATERMARKING_FONT},
		{key: FIELD_WATERMARKING_SIZE, value: JS_WATERMARKING_SIZE},
		{key: FIELD_WATERMARKING_OPACITY, value: JS_WATERMARKING_OPACITY},
		{key: FIELD_WATERMARKING_COLOR, value: JS_WATERMARKING_COLOR},
		{key: FIELD_WATERMARKING_POSX, value: JS_WATERMARKING_POSX},
		{key: FIELD_WATERMARKING_POSY, value: JS_WATERMARKING_POSY},
		{key: FIELD_WATERMARKING_WIDTH, value: JS_WATERMARKING_WIDTH},
		{key: FIELD_WATERMARKING_HEIGHT, value: JS_WATERMARKING_HEIGHT},
		{key: FIELD_WATERMARKING_BG_OPACITY, value: JS_WATERMARKING_BG_OPACITY},
		{key: FIELD_WATERMARKING_BG_COLOR, value: JS_WATERMARKING_BG_COLOR},
		{key: FIELD_WATERMARKING_TYPE, value: JS_WATERMARKING_TYPE}
		];
	
	var infoChanger = [
		JS_WATERMARKING_LABEL,
		JS_WATERMARKING_OPACITY,
		JS_WATERMARKING_COLOR,
		JS_WATERMARKING_FONT,
		JS_WATERMARKING_SIZE,
		JS_WATERMARKING_ENGLISH_FONT,
		JS_WATERMARKING_ENGLISH_SIZE,
		JS_WATERMARKING_POSX,
		JS_WATERMARKING_POSY,
		JS_WATERMARKING_WIDTH,
		JS_WATERMARKING_HEIGHT,
		JS_WATERMARKING_BG_OPACITY,
		JS_WATERMARKING_BG_COLOR
		];
	
	var validatorMap = [
		{selector: JS_WATERMARKING_COLOR, type: VALIDATOR_TYPE_COLOR, param: {recommend: "ffffff"} },
		{selector: JS_WATERMARKING_OPACITY, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 100, recommend: 100} },
		{selector: JS_WATERMARKING_SIZE, type: MODIFICATION_INTEGER, param: {min: 2, max: 100, recommend: 42} },
		{selector: JS_WATERMARKING_ENGLISH_SIZE, type: MODIFICATION_INTEGER, param: {min: 2, max: 100, recommend: 42} },
		{selector: JS_WATERMARKING_BG_COLOR, type: VALIDATOR_TYPE_COLOR, param: {recommend: "000000"} },
		{selector: JS_WATERMARKING_BG_OPACITY, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 100, recommend: 0} }
		];
	
	this.dom = null;
	
	this.prefixField = "";
	this.myField = FIELD_WATERMARKING_INSERTERS;
	this.fieldIndex = null;
	this.parent = null;
	this.colorDom = null;
	
	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_WATERMARKING_ITEM_TMPL;
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
		this.UpdateType();
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
		
		$(JS_DELETE_WATERMARKING_TRIGGER, this.dom).click(function() {
			if(context.parent != null) {
				context.parent.DeleteItem(context);
			}
		});
		
		$(JS_PALETTE_TRIGGER, this.dom).click(function() {
			context.colorDom = this;
			g_Palette.SetOnClose(function() {
				context.OnPaletteClose();
			});
			var $color = $(this);
			$color.get(0).disabled = true;
			var color = $color.val();
			g_Palette.SetColor(color);
			g_Palette.SetShowBG(true);
			g_Palette.Show();
		});
		
		$(JS_WATERMARKING_TYPE, this.dom).change(function() {
			context.UpdateType();
		});
		
		var arr = editorSubtitleData.getChineseFont();
		var $sel = $(JS_WATERMARKING_FONT, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = editorSubtitleData.getEnglishFont();
		var $sel = $(JS_WATERMARKING_ENGLISH_FONT, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = waterMarkingData.getType();
		var $sel = $(JS_WATERMARKING_TYPE, this.dom);
		uUpdateSelect($sel[0], arr);
		
		ValidatorBindArray(this.dom, validatorMap);
		
		this.BindInfoChanger();
	};
	
	this.OnPaletteClose = function() {
		if(this.colorDom == null) return;
		var color = g_Palette.GetColor();
		var $color = $(this.colorDom);
		$color.get(0).disabled = false;
		$color.val(color).change();
		
		this.colorDom = null;
	};
	
	this.LicenseControl = function() {
	};
	
	this.UpdateType = function() {
		var type = $(JS_WATERMARKING_TYPE, this.dom).val();
		
		if(type == WATER_MARKING_TYPE_WATERMARK) {
			$(JS_TYPE_WATERMARK, this.dom).show();
		} else if(type == WATER_MARKING_TYPE_SIGNATURE) {
			$(JS_TYPE_WATERMARK, this.dom).hide();
		}
	};
	
	this.GetInfo = function() {
		if(this.dom == null) return null;
		
		var o = {};
		o.label = this.GetValueByJS(JS_WATERMARKING_LABEL);
		o.opacity = this.GetValueByJS(JS_WATERMARKING_OPACITY);
		o.color = this.GetValueByJS(JS_WATERMARKING_COLOR);
		o.font = this.GetValueByJS(JS_WATERMARKING_FONT);
		o.size = this.GetValueByJS(JS_WATERMARKING_SIZE);
		o.englishFont = $(JS_WATERMARKING_ENGLISH_FONT, this.dom).val();
		o.englishSize = $(JS_WATERMARKING_ENGLISH_SIZE, this.dom).val();
		o.posx = $(JS_WATERMARKING_POSX, this.dom).val();
		o.posy = $(JS_WATERMARKING_POSY, this.dom).val();
		o.width = $(JS_WATERMARKING_WIDTH, this.dom).val();
		o.height = $(JS_WATERMARKING_HEIGHT, this.dom).val();
		
		return o;
	};
	
	this.SetInfo = function(o) {
		if(this.dom == null) return;

		$(JS_WATERMARKING_LABEL, this.dom).val(o.label);
		$(JS_WATERMARKING_OPACITY, this.dom).val(o.opacity);
		$(JS_WATERMARKING_COLOR, this.dom).val(o.color);
		$(JS_WATERMARKING_FONT, this.dom).val(o.font);
		$(JS_WATERMARKING_SIZE, this.dom).val(o.size);
		$(JS_WATERMARKING_ENGLISH_FONT, this.dom).val(o.englishFont);
		$(JS_WATERMARKING_ENGLISH_SIZE, this.dom).val(o.englishSize);
		$(JS_WATERMARKING_POSX, this.dom).val(o.posx);
		$(JS_WATERMARKING_POSY, this.dom).val(o.posy);
		$(JS_WATERMARKING_WIDTH, this.dom).val(o.width);
		$(JS_WATERMARKING_HEIGHT, this.dom).val(o.height);
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
		xml.BeginNode(TAG_WATERMARKING);
		
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

function WatermarkingInserter() {
	this.dom = null;
	this.itemTmpl = JS_WATERMARKING_ITEM_TMPL;	//default value
	this.itemArray = [];
	this.fnNew = null;
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_WATERMARKING_INSERTERS;
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
		if(GetLicense(license.VIDEO_EDITING_WATERMARKING_INSERTION) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
			return;
		}
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_WATERMARKING_ITEM, this.dom).each(function() {
			var sub = new WatermarkingItem();
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
		
		$(JS_NEW_WATERMARKING_TRIGGER, this.dom).click(function() {
			context.NewItem();
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.NewItem = function() {
		var item = new WatermarkingItem();
		item.Create($(JS_WATERMARKING_ITEM_CONTAINER, this.dom).get(0), this.itemTmpl);
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
		var $arr = $(JS_WATERMARKING_ITEM_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_WATERMARKING_ITEM) {
			$(JS_NEW_WATERMARKING_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_WATERMARKING_TRIGGER, this.dom).show();
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
	
	this.SetList = function(o) {
		if(this.dom == null) return;
		
		this.ClearList();
		if(o == null) return;
		for(var i = 0; i < o.length; i++) {
			var item = new WatermarkingItem();
			item.Create($(JS_WATERMARKING_ITEM_CONTAINER, this.dom).get(0), this.itemTmpl);
			item.SetParent(this);
			item.SetInfo(o[i]);
			this.itemArray.push(item);
			if($.isFunction(this.fnNew)) {
				this.fnNew(item.dom);
			}
		}
		this.SortItem();
	};
	
	this.GetList = function() {
		if(this.dom == null) return null;
		
		var o = [];
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
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