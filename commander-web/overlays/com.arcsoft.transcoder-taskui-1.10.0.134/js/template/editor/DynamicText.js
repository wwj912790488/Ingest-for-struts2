var MAX_COUNT_DYNAMIC_TEXT_ITEM = 9;

var JS_DYNAMIC_TEXT_ITEM_TMPL ="#TemplateLib #DynamicTextItemTmpl";
var JS_DYNAMIC_TEXT_ITEM = ".DynamicTextItem";
var JS_NEW_DYNAMIC_TEXT_TRIGGER = ".NewDynamicTextTrigger";
var JS_DYNAMIC_TEXT_ITEM_CONTAINER = ".DynamicTextItemContainer";
var JS_DYNAMIC_TEXT_ITEM_INDEX = ".DynamicTextItemIndex";
var JS_DYNAMIC_TEXT = ".DynamicText";
var JS_DELETE_DYNAMIC_TEXT_TRIGGER = ".DeleteDynamicTextTrigger";
var JS_DYNAMIC_TEXT_MACRO_TRIGGER = ".DynamicTextMacroTrigger";
var JS_DYNAMIC_TEXT_MATERIAL_TRIGGER = ".DynamicTextMaterialTrigger";

var TAG_DYNAMIC_TEXT ="dynamictext";
var TAG_DYNAMIC_TEXT_NAME ="name";
var TAG_DYNAMIC_TEXT_LABEL ="label";
var TAG_DYNAMIC_TEXT_FONT ="font";
var TAG_DYNAMIC_TEXT_SIZE ="size";
var TAG_DYNAMIC_TEXT_COLOR ="color";
var TAG_DYNAMIC_TEXT_OPACITY ="opacity";
var TAG_DYNAMIC_TEXT_BGCOLOR ="bgcolor";
var TAG_DYNAMIC_TEXT_BGOPACITY ="bgopacity";
var TAG_DYNAMIC_TEXT_ANIMATION_TYPE ="animationtype";
var TAG_DYNAMIC_TEXT_SCROLL_MODE ="scrollmode";
var TAG_DYNAMIC_TEXT_SCROLL_SPEED ="scrollspeed";
var TAG_DYNAMIC_TEXT_SCROLL_INTERVAL ="scrollinterval";
var TAG_DYNAMIC_TEXT_OPERATE ="operate";
var TAG_DYNAMIC_TEXT_INITIAL_ACTIVE ="initialactive";
var TAG_DYNAMIC_TEXT_POS_INDEX ="posindex";

var FIELD_DYNAMIC_TEXTS ="dynamicTexts";
var FIELD_DYNAMIC_TEXT_NAME ="name";
var FIELD_DYNAMIC_TEXT_LABEL ="label";
var FIELD_DYNAMIC_TEXT_FONT ="font";
var FIELD_DYNAMIC_TEXT_SIZE ="size";
var FIELD_DYNAMIC_TEXT_POSX ="posX";
var FIELD_DYNAMIC_TEXT_POSY ="posY";
var FIELD_DYNAMIC_TEXT_WIDTH ="width";
var FIELD_DYNAMIC_TEXT_HEIGHT ="height";
var FIELD_DYNAMIC_TEXT_COLOR ="color";
var FIELD_DYNAMIC_TEXT_OPACITY ="opacity";
var FIELD_DYNAMIC_TEXT_BGCOLOR ="bgColor";
var FIELD_DYNAMIC_TEXT_BGOPACITY ="bgOpacity";
var FIELD_DYNAMIC_TEXT_ANIMATION_TYPE ="animationType";
var FIELD_DYNAMIC_TEXT_SCROLL_MODE ="scrollMode";
var FIELD_DYNAMIC_TEXT_SCROLL_SPEED ="scrollSpeed";
var FIELD_DYNAMIC_TEXT_SCROLL_INTERVAL ="scrollInterval";
var FIELD_DYNAMIC_TEXT_OPERATE ="operate";
var FIELD_DYNAMIC_TEXT_INITIAL_ACTIVE ="initialActive";
var FIELD_DYNAMIC_TEXT_POS_INDEX ="posIndex";

var JS_DYNAMIC_TEXT_NAME ="input[name='DynamicTextName']";
var JS_DYNAMIC_TEXT_LABEL ="input[name='DynamicTextLabel']";
var JS_DYNAMIC_TEXT_FONT ="select[name='DynamicTextFont']";
var JS_DYNAMIC_TEXT_SIZE ="input[name='DynamicTextSize']";
var JS_DYNAMIC_TEXT_COLOR ="input[name='DynamicTextColor']";
var JS_DYNAMIC_TEXT_OPACITY ="input[name='DynamicTextOpacity']";
var JS_DYNAMIC_TEXT_BGCOLOR ="input[name='DynamicTextBgColor']";
var JS_DYNAMIC_TEXT_BGOPACITY ="input[name='DynamicTextBgOpacity']";
var JS_DYNAMIC_TEXT_POSX = "input[name='DynamicTextPosX']";
var JS_DYNAMIC_TEXT_POSY = "input[name='DynamicTextPosY']";
var JS_DYNAMIC_TEXT_WIDTH = "input[name='DynamicTextWidth']";
var JS_DYNAMIC_TEXT_HEIGHT = "input[name='DynamicTextHeight']";
var JS_DYNAMIC_TEXT_ANIMATION_TYPE ="select[name='DynamicTextAnimationType']";
var JS_DYNAMIC_TEXT_SCROLL_MODE ="select[name='DynamicTextScrollMode']";
var JS_DYNAMIC_TEXT_SCROLL_SPEED ="select[name='DynamicTextScrollSpeed']";
var JS_DYNAMIC_TEXT_SCROLL_INTERVAL ="input[name='DynamicTextScrollInterval']";
var JS_DYNAMIC_TEXT_OPERATE ="select[name='DynamicTextOperate']";
var JS_DYNAMIC_TEXT_INITIAL_ACTIVE ="input[name='DynamicTextInitialActive']";
var JS_DYNAMIC_TEXT_POS_INDEX ="input[name='DynamicTextPosIndex']";

var dynamicTextMacroMap = [
	{key: "${TASKNAME}", value: str_macro.task_name},
	{key: "${yyyy}", value: str_macro.yyyy},
	{key: "${MM}", value: str_macro.MM},
	{key: "${dd}", value: str_macro.dd},
	{key: "${HH}", value: str_macro.HH},
	{key: "${mm}", value: str_macro.mm},
	{key: "${ss}", value: str_macro.ss}
	];

var dynamicTextData = {};
dynamicTextData.operate = [
	{key: "0", value: str_motion_icon.permanent},
	{key: "1", value: str_motion_icon.dynamic}
	];

dynamicTextData.animationType = [
   	{key: "0", value: str_dynamic_text.animation_static},
   	{key: "1", value: str_dynamic_text.animation_scroll}
   	];

dynamicTextData.scrollMode = [
	{key: "1", value: str_dynamic_text.scroll_from_right},
	{key: "2", value: str_dynamic_text.scroll_from_left}/*,
	{key: "4", value: str_dynamic_text.scroll_from_top},
	{key: "8", value: str_dynamic_text.scroll_from_bottom}*/
	];

dynamicTextData.scrollSpeed = [
  	{key: "3", value: str_dynamic_text.fastest},
  	{key: "6", value: str_dynamic_text.fast},
  	{key: "9", value: str_dynamic_text.normal},
  	{key: "12", value: str_dynamic_text.slow},
  	{key: "15", value: str_dynamic_text.slowest},
  	{key: "18", value: str_dynamic_text.moreslowest}
  	];

dynamicTextData.getOperate = function() {
	return dynamicTextData.operate;
};

dynamicTextData.getAnimationType = function() {
	return dynamicTextData.animationType;
};

dynamicTextData.getScrollMode = function() {
	return dynamicTextData.scrollMode;
};

dynamicTextData.getScrollSpeed = function() {
	return dynamicTextData.scrollSpeed;
};

function DynamicTextItem() {
	var tagMap = [
		{key: TAG_DYNAMIC_TEXT_POS_INDEX, value: JS_DYNAMIC_TEXT_POS_INDEX},
		{key: TAG_DYNAMIC_TEXT_NAME, value: JS_DYNAMIC_TEXT_NAME},
		{key: TAG_DYNAMIC_TEXT_LABEL, value: JS_DYNAMIC_TEXT_LABEL},
		{key: TAG_DYNAMIC_TEXT_FONT, value: JS_DYNAMIC_TEXT_FONT},
		{key: TAG_DYNAMIC_TEXT_SIZE, value: JS_DYNAMIC_TEXT_SIZE},
		{key: TAG_POS_X, value: JS_DYNAMIC_TEXT_POSX},
		{key: TAG_POS_Y, value: JS_DYNAMIC_TEXT_POSY},
		{key: TAG_WIDTH, value: JS_DYNAMIC_TEXT_WIDTH},
		{key: TAG_HEIGHT, value: JS_DYNAMIC_TEXT_HEIGHT},
		{key: TAG_DYNAMIC_TEXT_COLOR, value: JS_DYNAMIC_TEXT_COLOR},
		{key: TAG_DYNAMIC_TEXT_OPACITY, value: JS_DYNAMIC_TEXT_OPACITY},
		{key: TAG_DYNAMIC_TEXT_BGCOLOR, value: JS_DYNAMIC_TEXT_BGCOLOR},
		{key: TAG_DYNAMIC_TEXT_BGOPACITY, value: JS_DYNAMIC_TEXT_BGOPACITY},
		{key: TAG_DYNAMIC_TEXT_ANIMATION_TYPE, value: JS_DYNAMIC_TEXT_ANIMATION_TYPE},
		{key: TAG_DYNAMIC_TEXT_SCROLL_MODE, value: JS_DYNAMIC_TEXT_SCROLL_MODE},
		{key: TAG_DYNAMIC_TEXT_SCROLL_SPEED, value: JS_DYNAMIC_TEXT_SCROLL_SPEED},
		{key: TAG_DYNAMIC_TEXT_SCROLL_INTERVAL, value: JS_DYNAMIC_TEXT_SCROLL_INTERVAL},
		{key: TAG_DYNAMIC_TEXT_OPERATE, value: JS_DYNAMIC_TEXT_OPERATE},
		{key: TAG_DYNAMIC_TEXT_INITIAL_ACTIVE, value: JS_DYNAMIC_TEXT_INITIAL_ACTIVE}
		];
	
	var fieldMap = [
		{key: FIELD_DYNAMIC_TEXT_POS_INDEX, value: JS_DYNAMIC_TEXT_POS_INDEX},
		{key: FIELD_DYNAMIC_TEXT_NAME, value: JS_DYNAMIC_TEXT_NAME},
		{key: FIELD_DYNAMIC_TEXT_LABEL, value: JS_DYNAMIC_TEXT_LABEL},
		{key: FIELD_DYNAMIC_TEXT_FONT, value: JS_DYNAMIC_TEXT_FONT},
		{key: FIELD_DYNAMIC_TEXT_SIZE, value: JS_DYNAMIC_TEXT_SIZE},
		{key: FIELD_DYNAMIC_TEXT_POSX, value: JS_DYNAMIC_TEXT_POSX},
		{key: FIELD_DYNAMIC_TEXT_POSY, value: JS_DYNAMIC_TEXT_POSY},
		{key: FIELD_DYNAMIC_TEXT_WIDTH, value: JS_DYNAMIC_TEXT_WIDTH},
		{key: FIELD_DYNAMIC_TEXT_HEIGHT, value: JS_DYNAMIC_TEXT_HEIGHT},
		{key: FIELD_DYNAMIC_TEXT_COLOR, value: JS_DYNAMIC_TEXT_COLOR},
		{key: FIELD_DYNAMIC_TEXT_OPACITY, value: JS_DYNAMIC_TEXT_OPACITY},
		{key: FIELD_DYNAMIC_TEXT_BGCOLOR, value: JS_DYNAMIC_TEXT_BGCOLOR},
		{key: FIELD_DYNAMIC_TEXT_BGOPACITY, value: JS_DYNAMIC_TEXT_BGOPACITY},
		{key: FIELD_DYNAMIC_TEXT_ANIMATION_TYPE, value: JS_DYNAMIC_TEXT_ANIMATION_TYPE},
		{key: FIELD_DYNAMIC_TEXT_SCROLL_MODE, value: JS_DYNAMIC_TEXT_SCROLL_MODE},
		{key: FIELD_DYNAMIC_TEXT_SCROLL_SPEED, value: JS_DYNAMIC_TEXT_SCROLL_SPEED},
		{key: FIELD_DYNAMIC_TEXT_SCROLL_INTERVAL, value: JS_DYNAMIC_TEXT_SCROLL_INTERVAL},
		{key: FIELD_DYNAMIC_TEXT_OPERATE, value: JS_DYNAMIC_TEXT_OPERATE},
		{key: FIELD_DYNAMIC_TEXT_INITIAL_ACTIVE, value: JS_DYNAMIC_TEXT_INITIAL_ACTIVE}
		];
	
	var infoChanger = [
		JS_DYNAMIC_TEXT_NAME,
		JS_DYNAMIC_TEXT_LABEL,
		JS_DYNAMIC_TEXT_FONT,
		JS_DYNAMIC_TEXT_SIZE,
		JS_DYNAMIC_TEXT_POSX,
		JS_DYNAMIC_TEXT_POSY,
		JS_DYNAMIC_TEXT_WIDTH,
		JS_DYNAMIC_TEXT_HEIGHT,
		JS_DYNAMIC_TEXT_COLOR,
		JS_DYNAMIC_TEXT_OPACITY,
		JS_DYNAMIC_TEXT_BGCOLOR,
		JS_DYNAMIC_TEXT_BGOPACITY,
		JS_DYNAMIC_TEXT_ANIMATION_TYPE,
		JS_DYNAMIC_TEXT_SCROLL_MODE,
		JS_DYNAMIC_TEXT_SCROLL_SPEED,
		JS_DYNAMIC_TEXT_SCROLL_INTERVAL,
		JS_DYNAMIC_TEXT_OPERATE,
		JS_DYNAMIC_TEXT_INITIAL_ACTIVE
		];
	
	var validatorMap = [
		{selector: JS_DYNAMIC_TEXT_POSX, type: MODIFICATION_INTEGER, param: {min: 0, max: 10000000, recommend: 0} },
		{selector: JS_DYNAMIC_TEXT_POSY, type: MODIFICATION_INTEGER, param: {min: 0, max: 10000000, recommend: 0} },
		{selector: JS_DYNAMIC_TEXT_WIDTH, type: MODIFICATION_INTEGER, param: {min: 1, max: 10000000, recommend: 200} },
		{selector: JS_DYNAMIC_TEXT_HEIGHT, type: MODIFICATION_INTEGER, param: {min: 1, max: 10000000, recommend: 80} },
		{selector: JS_DYNAMIC_TEXT_SIZE, type: MODIFICATION_INTEGER, param: {min: 2, max: 1000, recommend: 42} },
		{selector: JS_DYNAMIC_TEXT_OPACITY, type: MODIFICATION_INTEGER, param: {min: 0, max: 100, recommend: 100} },
		{selector: JS_DYNAMIC_TEXT_BGOPACITY, type: MODIFICATION_INTEGER, param: {min: 0, max: 100, recommend: 0} },
		{selector: JS_DYNAMIC_TEXT_SCROLL_INTERVAL, type: MODIFICATION_INTEGER, param: {min: 0, max: MAX_INTEGER, recommend: 0} }
		];
	
	this.dom = null;
	
	this.prefixField = "";
	this.myField = FIELD_DYNAMIC_TEXTS;
	this.fieldIndex = null;
	this.parent = null;
	this.colorDom = null;
	this.fnGetOffset = null;
	
	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_DYNAMIC_TEXT_ITEM_TMPL;
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
		
		if(g_Palette == null) {
			CreatePalette();
		}
		
		if(g_LineSelector == null) {
			g_LineSelector = CreateLineSelector("LineSelector", $('body').get(0));
		}
		
		this.Bind();
		this.UpdateInitialActive();
		this.UpdateAnimationType();
	};
	
	this.Delete = function() {
		$(this.dom).remove();
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.SetFnGetOffset = function(fn) {
		this.fnGetOffset = fn;
	};
	
	this.Show = function() {
		$(this.dom).show();
	};
	
	this.Hide = function() {
		$(this.dom).hide();
	};
		
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_LIVE_SETTING) != license.ENABLED) {
			$(JS_LICENSE_LIVE_SETTING, this.dom).remove();
		};
		
		if(GetLicense(license.MATERIAL_MANAGEMENT) != license.ENABLED) {
			$(JS_LICENSE_MATERIAL, this.dom).remove();
		};
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_DYNAMIC_TEXT_MACRO_TRIGGER, this.dom).click(function() {
			context.ShowLineDialog(str_common.macro, dynamicTextMacroMap);
		});
		
		$(JS_DYNAMIC_TEXT_MATERIAL_TRIGGER, this.dom).click(function() {
			context.RequestMaterial();
		});
		
		$(JS_DELETE_DYNAMIC_TEXT_TRIGGER, this.dom).click(function() {
			if(context.parent != null) {
				context.parent.DeleteItem(context);
			}
		});
		
		$(JS_DYNAMIC_TEXT_OPERATE, this.dom).change(function() {
			context.UpdateInitialActive();
		});
		
		$(JS_DYNAMIC_TEXT_ANIMATION_TYPE, this.dom).change(function() {
			context.UpdateAnimationType();
		});
		
		$(JS_PALETTE_TRIGGER, this.dom).click(function() {
			context.ShowPalette(this);
		});
		
		var arr = dynamicTextData.getOperate();
		var $sel = $(JS_DYNAMIC_TEXT_OPERATE, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = dynamicTextData.getAnimationType();
		var $sel = $(JS_DYNAMIC_TEXT_ANIMATION_TYPE, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = dynamicTextData.getScrollMode();
		var $sel = $(JS_DYNAMIC_TEXT_SCROLL_MODE, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = dynamicTextData.getScrollSpeed();
		var $sel = $(JS_DYNAMIC_TEXT_SCROLL_SPEED, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = editorSubtitleData.getChineseFont();
		var $sel = $(JS_DYNAMIC_TEXT_FONT, this.dom);
		uUpdateSelect($sel[0], arr);
		
		ValidatorBindArray(this.dom, validatorMap);
		
		this.BindInfoChanger();
	};
	
	this.ShowLineDialog = function(title, map) {
		var context = this;
		g_LineSelector.setContent(map);
		g_LineSelector.setTitle(title);
		g_LineSelector.setOnSelected(function(key) {
			var text = $(JS_DYNAMIC_TEXT_LABEL, context.dom).val();
			$(JS_DYNAMIC_TEXT_LABEL, context.dom).val(text + key);
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
		var param = {materialType: MATERIAL_TYPE_DYNAMICTEXT, rand: Math.random()};
		$.post(url, param, function(data) {
			var arr = ParseMaterial(data);
			context.ListMaterial(arr);
		});
	};
	
	this.ShowPalette = function(dom) {
		var context = this;
		this.colorDom = dom;
		g_Palette.SetOnClose(function() {
			context.OnPaletteClose();
		});
		var $color = $(dom);
		$color.get(0).disabled = true;
		var color = $color.val();
		g_Palette.SetColor(color);
		g_Palette.SetShowBG(true);
		
		var offset = null;
		if($.isFunction(this.fnGetOffset)) {
			offset = this.fnGetOffset(g_Palette);
		}
		if(offset != null) {
			g_Palette.Show(offset.left, offset.top);
		}
		else {
			g_Palette.Show();
		}
	};
	
	this.OnPaletteClose = function() {
		if(this.colorDom == null) return;
		var color = g_Palette.GetColor();
		var $color = $(this.colorDom);
		$color.get(0).disabled = false;
		$color.val(color).change();
		
		this.colorDom = null;
	};
	
	this.UpdateInitialActive = function(checked) {
		var $operate = $(JS_DYNAMIC_TEXT_OPERATE, this.dom);
		if($operate.length == 0) return;
		var $initialActive = $(JS_DYNAMIC_TEXT_INITIAL_ACTIVE, this.dom);
		if($initialActive.length == 0) return;
		
		var operate = $operate.val();
		if(operate == "0") {
			$initialActive.get(0).disabled = true;
			$initialActive.get(0).checked = false;
		} else if(operate == "1") {
			$initialActive.get(0).disabled = false;
			if(checked != null) {
				$initialActive.get(0).checked = checked;
			}
		}
	};
	
	this.UpdateAnimationType = function() {
		var animType = $(JS_DYNAMIC_TEXT_ANIMATION_TYPE, this.dom).val();
		if(animType == "0") {
			$(JS_DYNAMIC_TEXT_SCROLL_MODE, this.dom).get(0).disabled = true;
			$(JS_DYNAMIC_TEXT_SCROLL_SPEED, this.dom).get(0).disabled = true;
			$(JS_DYNAMIC_TEXT_SCROLL_INTERVAL, this.dom).get(0).disabled = true;
		} else if(animType == "1") {
			$(JS_DYNAMIC_TEXT_SCROLL_MODE, this.dom).get(0).disabled = false;
			$(JS_DYNAMIC_TEXT_SCROLL_SPEED, this.dom).get(0).disabled = false;
			$(JS_DYNAMIC_TEXT_SCROLL_INTERVAL, this.dom).get(0).disabled = false;
		}
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
	
	this.SetInfo = function(o) {
		if(o == null) return;
		$(JS_DYNAMIC_TEXT_POS_INDEX, this.dom).val(o.posIndex);
		$(JS_DYNAMIC_TEXT_NAME, this.dom).val(o.name);
		$(JS_DYNAMIC_TEXT_LABEL, this.dom).val(o.label);
		$(JS_DYNAMIC_TEXT_FONT, this.dom).val(o.font);
		$(JS_DYNAMIC_TEXT_SIZE, this.dom).val(o.size);
		$(JS_DYNAMIC_TEXT_POSX, this.dom).val(o.posx);
		$(JS_DYNAMIC_TEXT_POSY, this.dom).val(o.posy);
		$(JS_DYNAMIC_TEXT_WIDTH, this.dom).val(o.width);
		$(JS_DYNAMIC_TEXT_HEIGHT, this.dom).val(o.height);
		$(JS_DYNAMIC_TEXT_COLOR, this.dom).val(o.color);
		$(JS_DYNAMIC_TEXT_OPACITY, this.dom).val(o.opacity);
		$(JS_DYNAMIC_TEXT_BGCOLOR, this.dom).val(o.bgcolor);
		$(JS_DYNAMIC_TEXT_BGOPACITY, this.dom).val(o.bgopacity);
		$(JS_DYNAMIC_TEXT_ANIMATION_TYPE, this.dom).val(o.animationType);
		$(JS_DYNAMIC_TEXT_SCROLL_MODE, this.dom).val(o.scrollMode);
		$(JS_DYNAMIC_TEXT_SCROLL_SPEED, this.dom).val(o.speed);
		$(JS_DYNAMIC_TEXT_SCROLL_INTERVAL, this.dom).val(o.interval);
		this.UpdateAnimationType();
		
		$(JS_DYNAMIC_TEXT_OPERATE, this.dom).val(o.operate);
		/* check box is special*/
		if(o.initialActive == "1") {
			this.UpdateInitialActive(true);
		}
		else {
			this.UpdateInitialActive(false);
		}
	};
	
	this.GetInfo = function() {
		var o = {};
		o.posIndex = $(JS_DYNAMIC_TEXT_POS_INDEX, this.dom).val();
		o.name = $(JS_DYNAMIC_TEXT_NAME, this.dom).val();
		o.label = $(JS_DYNAMIC_TEXT_LABEL, this.dom).val();
		o.font = $(JS_DYNAMIC_TEXT_FONT, this.dom).val();
		o.size = $(JS_DYNAMIC_TEXT_SIZE, this.dom).val();
		o.posx = $(JS_DYNAMIC_TEXT_POSX, this.dom).val();
		o.posy = $(JS_DYNAMIC_TEXT_POSY, this.dom).val();
		o.width = $(JS_DYNAMIC_TEXT_WIDTH, this.dom).val();
		o.height = $(JS_DYNAMIC_TEXT_HEIGHT, this.dom).val();
		o.color = $(JS_DYNAMIC_TEXT_COLOR, this.dom).val();
		o.opacity = $(JS_DYNAMIC_TEXT_OPACITY, this.dom).val();
		o.bgcolor = $(JS_DYNAMIC_TEXT_BGCOLOR, this.dom).val();
		o.bgopacity = $(JS_DYNAMIC_TEXT_BGOPACITY, this.dom).val();
		o.animationType = $(JS_DYNAMIC_TEXT_ANIMATION_TYPE, this.dom).val();
		o.scrollMode = $(JS_DYNAMIC_TEXT_SCROLL_MODE, this.dom).val();
		o.speed = $(JS_DYNAMIC_TEXT_SCROLL_SPEED, this.dom).val();
		o.interval = $(JS_DYNAMIC_TEXT_SCROLL_INTERVAL, this.dom).val();
		o.operate = $(JS_DYNAMIC_TEXT_OPERATE, this.dom).val();
		/* check box is special*/
		o.initialActive = this.GetValueByJS(JS_DYNAMIC_TEXT_INITIAL_ACTIVE);
		return o;
	};
	
	/* XML submit */
	this.GetValueByJS = function(jsSelect) {
		var value = null;
		var $sel = $(jsSelect, this.dom);
		if($sel.attr('type') == "checkbox") {
			if($sel.get(0).checked) {
				value = $sel.val();
			} else {
				value = null;
			}
		} else {
			value = $sel.val();
		}
		return value;
	};
	
	this.XML = function(xml) {
		if(this.dom == null) return;
		xml.BeginNode(TAG_DYNAMIC_TEXT);
		
		var len = tagMap.length;
		for(var i = 0; i < len; i++) {
			var value = this.GetValueByJS(tagMap[i].value);
			if(value == null) continue;
			
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

function DynamicText() {
	this.dom = null;
	this.itemTmpl = JS_DYNAMIC_TEXT_ITEM_TMPL;	//default value
	this.itemArray = [];
	this.fnNew = null;
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_DYNAMIC_TEXTS;
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
		if(GetLicense(license.VIDEO_EDITING_DYNAMIC_TEXT) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
			return;
		}
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_DYNAMIC_TEXT_ITEM, this.dom).each(function() {
			var sub = new DynamicTextItem();
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
		
		$(JS_NEW_DYNAMIC_TEXT_TRIGGER, this.dom).click(function() {
			context.NewItem();
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.NewItem = function() {
		var item = new DynamicTextItem();
		item.Create($(JS_DYNAMIC_TEXT_ITEM_CONTAINER, this.dom).get(0), this.itemTmpl);
		item.SetParent(this);
		this.itemArray.push(item);
		this.SortItem();
		if($.isFunction(this.fnNew)) {
			this.fnNew(item);
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
		var $arr = $(JS_DYNAMIC_TEXT_ITEM_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_DYNAMIC_TEXT_ITEM) {
			$(JS_NEW_DYNAMIC_TEXT_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_DYNAMIC_TEXT_TRIGGER, this.dom).show();
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
			var item = new DynamicTextItem();
			item.Create($(JS_DYNAMIC_TEXT_ITEM_CONTAINER, this.dom).get(0), this.itemTmpl);
			item.SetParent(this);
			item.SetInfo(o[i]);
			this.itemArray.push(item);
			if($.isFunction(this.fnNew)) {
				this.fnNew(item);
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
				value = "1";
			} 
			else {
				value = "0";
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