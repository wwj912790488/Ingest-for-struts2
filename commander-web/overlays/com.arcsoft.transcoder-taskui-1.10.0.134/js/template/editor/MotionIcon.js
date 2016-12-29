var MAX_COUNT_MOTION_ICON_ITEM = 9;

var JS_MOTION_ICON_ITEM_TMPL ="#TemplateLib #MotionIconItemTmpl";
var JS_MOTION_ICON_ITEM = ".MotionIconItem";
var JS_NEW_MOTION_ICON_TRIGGER = ".NewMotionIconTrigger";
var JS_MOTION_ICON_ITEM_CONTAINER = ".MotionIconItemContainer";
var JS_MOTION_ICON_ITEM_INDEX = ".MotionIconItemIndex";
var JS_MOTION_ICON = ".MotionIcon";
var JS_DELETE_MOTION_ICON_TRIGGER = ".DeleteMotionIconTrigger";
var JS_SELECT_MOTION_ICON_TRIGGER = ".SelectMotionIconTrigger";
var JS_MOTION_ICON_MATERIAL_TRIGGER = ".MotionIconMaterialTrigger";

var TAG_MOTION_ICON ="motionicon";
var TAG_MOTION_ICON_PATH ="path";
var TAG_MOTION_ICON_NAME ="name";
var TAG_MOTION_ICON_OPERATE ="operate";
var TAG_MOTION_ICON_INITIAL_ACTIVE ="initialactive";
var TAG_MOTION_ICON_FRAMERATE ="framerate";
var TAG_MOTION_ICON_IMAGE_FORMAT ="imageformat";
var TAG_MOTION_ICON_IS_LOOP ="isloop";
var TAG_MOTION_ICON_POS_INDEX ="posindex";

var FIELD_MOTION_ICONS ="motionIcons";
var FIELD_MOTION_ICON_PATH ="path";
var FIELD_MOTION_ICON_NAME ="name";
var FIELD_MOTION_ICON_X ="x";
var FIELD_MOTION_ICON_Y ="y";
var FIELD_MOTION_ICON_OPERATE ="operate";
var FIELD_MOTION_ICON_INITIAL_ACTIVE ="initialActive";
var FIELD_MOTION_ICON_FRAMERATE ="framerate";
var FIELD_MOTION_ICON_IMAGE_FORMAT ="imageFormat";
var FIELD_MOTION_ICON_IS_LOOP ="isLoop";
var FIELD_MOTION_ICON_POS_INDEX ="posIndex";

var JS_MOTION_ICON_PATH ="input[name='MotionIconPath']";
var JS_MOTION_ICON_NAME ="input[name='MotionIconName']";
var JS_MOTION_ICON_X = "input[name='MotionIconX']";
var JS_MOTION_ICON_Y = "input[name='MotionIconY']";
var JS_MOTION_ICON_WIDTH = "input[name='MotionIconWidth']";
var JS_MOTION_ICON_HEIGHT = "input[name='MotionIconHeight']";
var JS_MOTION_ICON_OPERATE ="select[name='MotionIconOperate']";
var JS_MOTION_ICON_INITIAL_ACTIVE ="input[name='MotionIconInitialActive']";
var JS_MOTION_ICON_FRAMERATE ="input[name='MotionIconFramerate']";
var JS_MOTION_ICON_IMAGE_FORMAT ="select[name='MotionIconImageFormat']";
var JS_MOTION_ICON_IS_LOOP ="select[name='MotionIconIsLoop']";
var JS_MOTION_ICON_POS_INDEX = "input[name='MotionIconPosIndex']";

var motionIconData = {};
motionIconData.operate = [
	{key: "0", value: str_motion_icon.permanent},
	{key: "1", value: str_motion_icon.dynamic}
	];

motionIconData.imageFormat = [
	{key: "0", value: "BMP"},
	{key: "1", value: "PNG"},
	{key: "2", value: "TGA"}
	];

motionIconData.isLoop = [
  	{key: "0", value: str_motion_icon.play_once},
  	{key: "1", value: str_motion_icon.loop},
  	{key: "2", value: str_motion_icon.keep_last_frame}
  	];

motionIconData.getOperate = function() {
	return motionIconData.operate;
};

motionIconData.getImageFormat = function() {
	return motionIconData.imageFormat;
};

motionIconData.getIsLoop = function() {
	return motionIconData.isLoop;
};

var g_MotionIconSelector = null;

function MotionIconItem() {
	var tagMap = [
		{key: TAG_MOTION_ICON_POS_INDEX, value: JS_MOTION_ICON_POS_INDEX},
		{key: TAG_MOTION_ICON_NAME, value: JS_MOTION_ICON_NAME},
		{key: TAG_MOTION_ICON_PATH, value: JS_MOTION_ICON_PATH},
		{key: TAG_POS_X, value: JS_MOTION_ICON_X},
		{key: TAG_POS_Y, value: JS_MOTION_ICON_Y},
		{key: TAG_MOTION_ICON_OPERATE, value: JS_MOTION_ICON_OPERATE},
		{key: TAG_MOTION_ICON_INITIAL_ACTIVE, value: JS_MOTION_ICON_INITIAL_ACTIVE},
		{key: TAG_MOTION_ICON_FRAMERATE, value: JS_MOTION_ICON_FRAMERATE},
		{key: TAG_MOTION_ICON_IMAGE_FORMAT, value: JS_MOTION_ICON_IMAGE_FORMAT},
		{key: TAG_MOTION_ICON_IS_LOOP, value: JS_MOTION_ICON_IS_LOOP}
		];
	
	var fieldMap = [
		{key: FIELD_MOTION_ICON_POS_INDEX, value: JS_MOTION_ICON_POS_INDEX},
		{key: FIELD_MOTION_ICON_NAME, value: JS_MOTION_ICON_NAME},
		{key: FIELD_MOTION_ICON_PATH, value: JS_MOTION_ICON_PATH},
		{key: FIELD_MOTION_ICON_X, value: JS_MOTION_ICON_X},
		{key: FIELD_MOTION_ICON_Y, value: JS_MOTION_ICON_Y},
		{key: FIELD_MOTION_ICON_OPERATE, value: JS_MOTION_ICON_OPERATE},
		{key: FIELD_MOTION_ICON_INITIAL_ACTIVE, value: JS_MOTION_ICON_INITIAL_ACTIVE},
		{key: FIELD_MOTION_ICON_FRAMERATE, value: JS_MOTION_ICON_FRAMERATE},
		{key: FIELD_MOTION_ICON_IMAGE_FORMAT, value: JS_MOTION_ICON_IMAGE_FORMAT},
		{key: FIELD_MOTION_ICON_IS_LOOP, value: JS_MOTION_ICON_IS_LOOP}
		];
	
	var infoChanger = [
		JS_MOTION_ICON_NAME,
		JS_MOTION_ICON_PATH,
		JS_MOTION_ICON_X,
		JS_MOTION_ICON_Y,
		JS_MOTION_ICON_OPERATE,
		JS_MOTION_ICON_INITIAL_ACTIVE,
		JS_MOTION_ICON_FRAMERATE,
		JS_MOTION_ICON_IMAGE_FORMAT
		];
	
	var validatorMap = [
		{selector: JS_MOTION_ICON_X, type: MODIFICATION_INTEGER, param: {min: 0, max: 10000000, recommend: 0} },
		{selector: JS_MOTION_ICON_Y, type: MODIFICATION_INTEGER, param: {min: 0, max: 10000000, recommend: 0} },
		{selector: JS_MOTION_ICON_FRAMERATE, type: MODIFICATION_FLOAT, param: {min: 1, max: 60.0, recommend: 25} }
		];
	
	this.dom = null;
	
	this.prefixField = "";
	this.myField = FIELD_MOTION_ICONS;
	this.fieldIndex = null;
	this.parent = null;
	this.colorDom = null;
	this.imageName = null;
	this.imageWidth = null;
	this.imageHeight = null;
	this.fnGetOffset = null;
	
	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_MOTION_ICON_ITEM_TMPL;
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
		
		if(g_MotionIconSelector == null) {
			g_MotionIconSelector = new FileView();
			dom = g_MotionIconSelector.Init("MotionIconSelector", true);
			$('body').append(dom);
		}
		
		this.Bind();
		this.UpdateInitialActive();
		this.RequestMotionIconInfo();
	};
	
	this.Delete = function() {
		$(this.dom).remove();
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.SetFnGetOffset = function(fn) {
		this.fnGetOffset = fn;
	}
	
	this.Show = function() {
		$(this.dom).show();
	};
	
	this.Hide = function() {
		$(this.dom).hide();
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_MOTION_ICON_PATH, this.dom).change(function() {
			context.RequestMotionIconInfo();
		});
		
		$(JS_MOTION_ICON_IMAGE_FORMAT, this.dom).change(function() {
			context.RequestMotionIconInfo();
		});
		
		$(JS_DELETE_MOTION_ICON_TRIGGER, this.dom).click(function() {
			if(context.parent != null) {
				context.parent.DeleteItem(context);
			}
		});
		
		$(JS_SELECT_MOTION_ICON_TRIGGER, this.dom).click(function() {
			context.ShowFileDialog();
		});
		
		$(JS_MOTION_ICON_MATERIAL_TRIGGER, this.dom).click(function() {
			context.RequestMaterial();
		});
		
		$(JS_MOTION_ICON_OPERATE, this.dom).change(function() {
			context.UpdateInitialActive();
		});
		
		var arr = motionIconData.getOperate();
		var $sel = $(JS_MOTION_ICON_OPERATE, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = motionIconData.getImageFormat();
		var $sel = $(JS_MOTION_ICON_IMAGE_FORMAT, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = motionIconData.getIsLoop();
		var $sel = $(JS_MOTION_ICON_IS_LOOP, this.dom);
		uUpdateSelect($sel[0], arr);
		
		ValidatorBindArray(this.dom, validatorMap);
		
		this.BindInfoChanger();
	};
	
	this.ShowFileDialog = function() {
		var context = this;
		g_MotionIconSelector.SetOnOK(function(key) {
			$(JS_MOTION_ICON_PATH, context.dom).val(key).change();
		});
		
		var offset = null;
		if($.isFunction(this.fnGetOffset)) {
			offset = this.fnGetOffset(g_LineSelector);
		}
		if(offset != null) {
			g_MotionIconSelector.Show(offset.left, offset.top);
		}
		else {
			g_MotionIconSelector.Show();
		}
	}
	
	this.ShowLineDialog = function(title, map) {
		var context = this;
		g_LineSelector.setContent(map);
		g_LineSelector.setTitle(title);
		g_LineSelector.setOnSelected(function(key) {
			//var text = $(JS_MOTION_ICON_PATH, context.dom).val();
			if(key.length == 0) return;
			if(key.charAt(key.length-1) != "/") {
				key += "/";
			}
			$(JS_MOTION_ICON_PATH, context.dom).val(key).change();
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
		var param = {materialType: MATERIAL_TYPE_MOTIONICON, rand: Math.random()};
		$.post(url, param, function(data) {
			var arr = ParseMaterial(data);
			context.ListMaterial(arr);
		});
	};
	
	this.UpdateInitialActive = function(checked) {
		var $operate = $(JS_MOTION_ICON_OPERATE, this.dom);
		if($operate.length == 0) return;
		
		var $initialActive = $(JS_MOTION_ICON_INITIAL_ACTIVE, this.dom);
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
	
	this.LicenseControl = function() {
		if(GetLicense(license.MATERIAL_MANAGEMENT) != license.ENABLED) {
			$(JS_LICENSE_MATERIAL, this.dom).remove();
		};
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
		$(JS_MOTION_ICON_POS_INDEX, this.dom).val(o.posIndex);
		$(JS_MOTION_ICON_NAME, this.dom).val(o.name);
		$(JS_MOTION_ICON_PATH, this.dom).val(o.path);
		$(JS_MOTION_ICON_X, this.dom).val(o.posx);
		$(JS_MOTION_ICON_Y, this.dom).val(o.posy);
		$(JS_MOTION_ICON_OPERATE, this.dom).val(o.operate);
		$(JS_MOTION_ICON_FRAMERATE, this.dom).val(o.frameRate);
		$(JS_MOTION_ICON_IMAGE_FORMAT, this.dom).val(o.imageFormate);
		$(JS_MOTION_ICON_IS_LOOP, this.dom).val(o.isLoop);
		
		/*
		var $isLoop = $(JS_MOTION_ICON_IS_LOOP, this.dom);
		if($isLoop.length > 0) {
			if(o.isLoop == "1") {
				$isLoop.get(0).checked = true;
			}
			else {
				$isLoop.get(0).checked = false;
			}
		}*/
		
		if(o.initialActive == "1") {
			this.UpdateInitialActive(true);
		}
		else {
			this.UpdateInitialActive(false);
		}
		
		/* other info*/
		this.imageName = o.imageName;
		this.imageWidth = o.imageWidth;
		this.imageHeight = o.imageHeight;
		
		$(JS_MOTION_ICON_WIDTH, this.dom).val(o.imageWidth);
		$(JS_MOTION_ICON_HEIGHT, this.dom).val(o.imageHeight);
		
		this.RequestMotionIconInfo();
	};
	
	this.GetInfo = function() {
		var o = {};
		o.posIndex = $(JS_MOTION_ICON_POS_INDEX, this.dom).val();
		o.name = $(JS_MOTION_ICON_NAME, this.dom).val();
		o.path = $(JS_MOTION_ICON_PATH, this.dom).val();
		o.posx = parseInt($(JS_MOTION_ICON_X, this.dom).val());
		o.posy = parseInt($(JS_MOTION_ICON_Y, this.dom).val());
		o.operate = $(JS_MOTION_ICON_OPERATE, this.dom).val();
		o.frameRate = parseFloat($(JS_MOTION_ICON_FRAMERATE, this.dom).val());
		o.imageFormate = $(JS_MOTION_ICON_IMAGE_FORMAT, this.dom).val();
		/* check box is special*/
		o.isLoop = this.GetValueByJS(JS_MOTION_ICON_IS_LOOP);
		o.initialActive = this.GetValueByJS(JS_MOTION_ICON_INITIAL_ACTIVE);
		
		/* other info*/
		o.imageName = this.imageName;
		o.imageWidth = this.imageWidth;
		o.imageHeight = this.imageHeight;
		
		//o.imageWidth = parseInt($(JS_MOTION_ICON_WIDTH, this.dom).val());
		//o.imageHeight = parseInt($(JS_MOTION_ICON_HEIGHT, this.dom).val());
		return o;
	};
	
	this.RequestMotionIconInfo = function() {
		var path = $(JS_MOTION_ICON_PATH, this.dom).val();
		if(path == null || path.length == 0) return;
		
		var $imageFormat = $(JS_MOTION_ICON_IMAGE_FORMAT, this.dom);
		if($imageFormat.length == 0) return;
		
		var imageFormat = $imageFormat.get(0).options[$imageFormat.get(0).selectedIndex].text;    
		
		var url = "getMotionIconInfo";
		var param = {"path": path, "imageFormat": imageFormat};
		
		var context = this;
		$.post(url, param, function(data) {
			context.parseData(data);
		});
	};
	
	this.parseData = function(data) {
		var $dom = $(data);
		
		this.imageName = $dom.find("#fileName").text();
		
		var width = $dom.find("#width").text();
		this.imageWidth = parseInt(width);
		if(isNaN(this.imageWidth)) this.imageWidth = null;
		
		var height = $dom.find("#height").text();
		this.imageHeight = parseInt(height);
		if(isNaN(this.imageWidth)) this.imageWidth = null;
		
		$(JS_MOTION_ICON_WIDTH, this.dom).val(width);
		$(JS_MOTION_ICON_HEIGHT, this.dom).val(height);
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
		xml.BeginNode(TAG_MOTION_ICON);
		
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

function MotionIcon() {
	this.dom = null;
	this.itemTmpl = JS_MOTION_ICON_ITEM_TMPL;	//default value
	this.itemArray = [];
	this.fnNew = null;
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_MOTION_ICONS;
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
		if(GetLicense(license.VIDEO_EDITING_MOTION_ICON) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
			return;
		}
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_MOTION_ICON_ITEM, this.dom).each(function() {
			var sub = new MotionIconItem();
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
		
		$(JS_NEW_MOTION_ICON_TRIGGER, this.dom).click(function() {
			context.NewItem();
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.NewItem = function() {
		var item = new MotionIconItem();
		item.Create($(JS_MOTION_ICON_ITEM_CONTAINER, this.dom).get(0), this.itemTmpl);
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
		var $arr = $(JS_MOTION_ICON_ITEM_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_MOTION_ICON_ITEM) {
			$(JS_NEW_MOTION_ICON_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_MOTION_ICON_TRIGGER, this.dom).show();
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
			var item = new MotionIconItem();
			item.Create($(JS_MOTION_ICON_ITEM_CONTAINER, this.dom).get(0), this.itemTmpl);
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