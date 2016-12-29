var MAX_COUNT_IMAGE_GRABBING_ITEM = 1;

var JS_IMAGE_GRABBING_ITEM_TMPL ="#TemplateLib #ImageGrabbingItemTmpl";
var JS_IMAGE_GRABBING_ITEM = ".ImageGrabbingItem";
var JS_NEW_IMAGE_GRABBING_TRIGGER = ".NewImageGrabbingTrigger";
var JS_IMAGE_GRABBING_ITEM_CONTAINER = ".ImageGrabbingItemContainer";
var JS_IMAGE_GRABBING_ITEM_INDEX = ".ImageGrabbingItemIndex";
var JS_IMAGE_GRABBING = ".ImageGrabbing";
var JS_DELETE_IMAGE_GRABBING_TRIGGER = ".DeleteImageGrabbingTrigger";
var JS_SELECT_IMAGE_GRABBING_TRIGGER = ".SelectImageGrabbingTrigger";

var TAG_IMAGE_GRABBING ="imagegrabbing";
var TAG_IMAGE_GRABBING_TARGET_PATH ="targetpath";
var TAG_IMAGE_GRABBING_TARGET_NAME ="targetname";
var TAG_IMAGE_GRABBING_TARGET_EXT ="extension";
var TAG_IMAGE_GRABBING_INTERVAL ="interval";
var TAG_IMAGE_GRABBING_MAX_COUNT ="maxcount";
var TAG_IMAGE_GRABBING_OPERATE ="operate";
var TAG_IMAGE_GRABBING_MODE ="grabbingmode";

var FIELD_IMAGE_GRABBINGS ="imageGrabbings";
var FIELD_IMAGE_GRABBING_TARGET_PATH ="targetPath";
var FIELD_IMAGE_GRABBING_TARGET_NAME ="targetName";
var FIELD_IMAGE_GRABBING_TARGET_EXT ="targetExt";
var FIELD_IMAGE_GRABBING_INTERVAL ="interval";
var FIELD_IMAGE_GRABBING_MAX_COUNT ="maxCount";
var FIELD_IMAGE_GRABBING_OPERATE ="operate";
var FIELD_IMAGE_GRABBING_WIDTH ="width";
var FIELD_IMAGE_GRABBING_HEIGHT ="height";
var FIELD_IMAGE_GRABBING_MODE ="grabbingMode";

var JS_IMAGE_GRABBING_TARGET_PATH ="input[name='ImageGrabbingTargetPath']";
var JS_IMAGE_GRABBING_TARGET_NAME ="input[name='ImageGrabbingTargetName']";
var JS_IMAGE_GRABBING_TARGET_EXT ="input[name='ImageGrabbingTargetExt']";
var JS_IMAGE_GRABBING_INTERVAL ="input[name='ImageGrabbingInterval']";
var JS_IMAGE_GRABBING_MAX_COUNT ="input[name='ImageGrabbingMaxCount']";
var JS_IMAGE_GRABBING_OPERATE ="select[name='ImageGrabbingOperate']";
var JS_IMAGE_GRABBING_WIDTH = "input[name='ImageGrabbingWidth']";
var JS_IMAGE_GRABBING_HEIGHT = "input[name='ImageGrabbingHeight']";
var JS_IMAGE_GRABBING_MODE ="select[name='ImageGrabbingMode']";

var g_ImageGrabbingSelector = null;

/********* data *************/
var imageGrabbingData = {};
imageGrabbingData.license = {};

imageGrabbingData.operate = [
	{key: "1", value: str_image_grabbing.black_border},
	{key: "2", value: str_image_grabbing.keep_aspect_ratio},
	{key: "3", value: str_image_grabbing.stretch}
	];

imageGrabbingData.fullGrabbingMode = [
	{key: "0", value: str_image_grabbing.normal},
 	{key: "1", value: str_image_grabbing.skip_count},
 	{key: "2", value: str_image_grabbing.skip_interval}
 	];

imageGrabbingData.license.grabbingMode = [
	{key: "0", value: license.VIDEO_EDITING_IMAGE_GRABBING_NORMAL},
	{key: "1", value: license.VIDEO_EDITING_IMAGE_GRABBING_SKIP_COUNT},
	{key: "2", value: license.VIDEO_EDITING_IMAGE_GRABBING_SKIP_INTERVAL}
	];
imageGrabbingData.grabbingMode = uLicenseFilterKey(imageGrabbingData.fullGrabbingMode, imageGrabbingData.license.grabbingMode);

imageGrabbingData.getOperate = function() {
	return imageGrabbingData.operate;
};

imageGrabbingData.getGrabbingMode = function() {
	if(imageGrabbingData.grabbingMode.length == 0) {
		imageGrabbingData.grabbingMode.push(imageGrabbingData.fullGrabbingMode[0]);
	}
	return imageGrabbingData.grabbingMode;
};
/**********data end************/

function ImageGrabbingItem() {
	var tagMap = [
		{key: TAG_IMAGE_GRABBING_TARGET_PATH, value: JS_IMAGE_GRABBING_TARGET_PATH},
		{key: TAG_IMAGE_GRABBING_TARGET_NAME, value: JS_IMAGE_GRABBING_TARGET_NAME},
		{key: TAG_IMAGE_GRABBING_TARGET_EXT, value: JS_IMAGE_GRABBING_TARGET_EXT},
		{key: TAG_IMAGE_GRABBING_INTERVAL, value: JS_IMAGE_GRABBING_INTERVAL},
		{key: TAG_IMAGE_GRABBING_MAX_COUNT, value: JS_IMAGE_GRABBING_MAX_COUNT},
		{key: TAG_WIDTH, value: JS_IMAGE_GRABBING_WIDTH},
		{key: TAG_HEIGHT, value: JS_IMAGE_GRABBING_HEIGHT},
		{key: TAG_IMAGE_GRABBING_OPERATE, value: JS_IMAGE_GRABBING_OPERATE},
		{key: TAG_IMAGE_GRABBING_MODE, value: JS_IMAGE_GRABBING_MODE}
		];
	
	var fieldMap = [
		{key: FIELD_IMAGE_GRABBING_TARGET_PATH, value: JS_IMAGE_GRABBING_TARGET_PATH},
		{key: FIELD_IMAGE_GRABBING_TARGET_NAME, value: JS_IMAGE_GRABBING_TARGET_NAME},
		{key: FIELD_IMAGE_GRABBING_TARGET_EXT, value: JS_IMAGE_GRABBING_TARGET_EXT},
		{key: FIELD_IMAGE_GRABBING_INTERVAL, value: JS_IMAGE_GRABBING_INTERVAL},
		{key: FIELD_IMAGE_GRABBING_MAX_COUNT, value: JS_IMAGE_GRABBING_MAX_COUNT},
		{key: FIELD_IMAGE_GRABBING_WIDTH, value: JS_IMAGE_GRABBING_WIDTH},
		{key: FIELD_IMAGE_GRABBING_HEIGHT, value: JS_IMAGE_GRABBING_HEIGHT},
		{key: FIELD_IMAGE_GRABBING_OPERATE, value: JS_IMAGE_GRABBING_OPERATE},
		{key: FIELD_IMAGE_GRABBING_MODE, value: JS_IMAGE_GRABBING_MODE}
		];
	
	var infoChanger = [
		JS_IMAGE_GRABBING_TARGET_PATH,
		JS_IMAGE_GRABBING_TARGET_NAME,
		JS_IMAGE_GRABBING_TARGET_EXT,
		JS_IMAGE_GRABBING_INTERVAL,
		JS_IMAGE_GRABBING_MAX_COUNT,
		JS_IMAGE_GRABBING_OPERATE,
		JS_IMAGE_GRABBING_WIDTH,
		JS_IMAGE_GRABBING_HEIGHT,
		JS_IMAGE_GRABBING_MODE
		];
	
	var validatorMap = [
		{selector: JS_IMAGE_GRABBING_INTERVAL, type: VALIDATOR_TYPE_INTEGER, param: {min: 10, max: 10000000, recommend: 1000} },
		{selector: JS_IMAGE_GRABBING_MAX_COUNT, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 10000000, recommend: 0} },
		{selector: JS_IMAGE_GRABBING_WIDTH, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 10000000, recommend: 0} },
		{selector: JS_IMAGE_GRABBING_HEIGHT, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 10000000, recommend: 0} }
		];
	
	this.dom = null;
	
	this.prefixField = "";
	this.myField = FIELD_IMAGE_GRABBINGS;
	this.fieldIndex = null;
	this.parent = null;
	this.colorDom = null;
	
	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_IMAGE_GRABBING_ITEM_TMPL;
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
		
		if(g_ImageGrabbingSelector == null) {
			g_ImageGrabbingSelector = new FileView();
			dom = g_ImageGrabbingSelector.Init("ImageGrabbingSelector", true);
			$('body').append(dom);
		}
		
		this.Bind();
		this.UpdateGrabbingMode();
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
		
		$(JS_DELETE_IMAGE_GRABBING_TRIGGER, this.dom).click(function() {
			if(context.parent != null) {
				context.parent.DeleteItem(context);
			}
		});
		
		$(JS_SELECT_IMAGE_GRABBING_TRIGGER, this.dom).click(function() {
			g_ImageGrabbingSelector.SetOnOK(function(key) {
				$(JS_IMAGE_GRABBING_TARGET_PATH, context.dom).val(key).change();
			});
			g_ImageGrabbingSelector.Show();
		});
		
		var arr = imageGrabbingData.getOperate();
		var $sel = $(JS_IMAGE_GRABBING_OPERATE, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = imageGrabbingData.getGrabbingMode();
		uUpdateSelect($(JS_IMAGE_GRABBING_MODE, this.dom).get(0), arr);
		
		$(JS_IMAGE_GRABBING_MODE, this.dom).change(function() {
			context.UpdateGrabbingMode();
		});
		
		ValidatorBindArray(this.dom, validatorMap);
		
		this.BindInfoChanger();
	};
	
	this.LicenseControl = function() {
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
	
	this.UpdateGrabbingMode = function() {
		var grabbingMode = $(JS_IMAGE_GRABBING_MODE, this.dom).val();
		var $interval = $(JS_IMAGE_GRABBING_INTERVAL, this.dom);
		var $maxCount = $(JS_IMAGE_GRABBING_MAX_COUNT, this.dom);
		if(grabbingMode == "1") {
			if($interval.val().length == 0) $interval.val("1000");
			$interval.get(0).disabled = false;
			
			$maxCount.val("");
			$maxCount.get(0).disabled = true;
		}
		else if(grabbingMode == "2") {
			if($maxCount.val().length == 0) $maxCount.val("1");
			$maxCount.get(0).disabled = false;
			
			$interval.val("");
			$interval.get(0).disabled = true;
		}
		else {
			if($interval.val().length == 0) $interval.val("1000");
			$interval.get(0).disabled = false;
			
			if($maxCount.val().length == 0) $maxCount.val("1");
			$maxCount.get(0).disabled = false;
		}
	};
	
	/* XML submit */
	this.GetValueByJS = function(jsSelect) {
		var value = null;
		var $sel = $(jsSelect, this.dom);
		if($sel.length == 0 || $sel.get(0).disabled) {
			value = null;
		}
		else if($sel.attr('type') == "checkbox") {
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
		xml.BeginNode(TAG_IMAGE_GRABBING);
		
		var len = tagMap.length;
		for(var i = 0; i < len; i++) {
			var value = this.GetValueByJS(tagMap[i].value);
			if(value != null) xml.Node(tagMap[i].key, value);
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

function ImageGrabbing() {
	this.dom = null;
	this.itemTmpl = JS_IMAGE_GRABBING_ITEM_TMPL;	//default value
	this.itemArray = [];
	this.fnNew = null;
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_IMAGE_GRABBINGS;
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
		if(GetLicense(license.VIDEO_EDITING_IMAGE_GRABBING) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
			return;
		}
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_IMAGE_GRABBING_ITEM, this.dom).each(function() {
			var sub = new ImageGrabbingItem();
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
		
		$(JS_NEW_IMAGE_GRABBING_TRIGGER, this.dom).click(function() {
			context.NewItem();
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.NewItem = function() {
		var item = new ImageGrabbingItem();
		item.Create($(JS_IMAGE_GRABBING_ITEM_CONTAINER, this.dom).get(0), this.itemTmpl);
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
		var $arr = $(JS_IMAGE_GRABBING_ITEM_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_IMAGE_GRABBING_ITEM) {
			$(JS_NEW_IMAGE_GRABBING_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_IMAGE_GRABBING_TRIGGER, this.dom).show();
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