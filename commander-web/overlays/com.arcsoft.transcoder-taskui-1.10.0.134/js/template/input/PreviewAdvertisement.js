/*var JS_ADVERTISEMENT_ITEM = ".AdvertisementItem";
var JS_ADVERTISEMENT_LIST = ".AdvertisementList";
var JS_AD_ITEM_INDEX = ".AdItemIndex";
var JS_SELECT_ADVERTISEMENT_TRIGGER = ".SelectAdvertisementTrigger";
var JS_DELETE_ADVERTISEMENT_TRIGGER = ".DeleteAdvertisementTrigger";
var JS_NEW_ADVERTISEMENT_TRIGGER = ".NewAdvertisementTrigger";

var JS_AD_INSERT_TIME= "input[name='AdInsertTime']";
var JS_ADVERTISEMENT_URI = "input[name='AdvertisementUri']";
var JS_AD_PROGRAM_ID		="select[name='AdProgramId']";
var JS_AD_AUDIO_TRACK_ID	="select[name='AdAudioTrackId']";
var JS_AD_SUBTITLE_ID	="select[name='AdSubtitleId']";

var FIELD_ADVERTISEMENT = "advertisements";
var FIELD_ADVERTISEMENT_TIME = "start";
var FIELD_ADVERTISEMENT_URI = "uri";*/

var JS_PREVIEW_AD_ITEM_TMPL = "#PreviewAdItemTmpl";
var JS_POINT_TRIGGER = ".PointTrigger";
var JS_JUMP_TRIGGER = ".JumpTrigger";

function PreviewAdItem() {
	this.dom = null;
	this.parent = null;
	
	var validatorMap = [
		{selector: JS_AD_INSERT_TIME, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} }
		];

	this.SetDOM = function(dom) {
		this.dom = dom;
	};

	this.Create = function(domParent, itemTmpl) {
		if(itemTmpl == null) {
			itemTmpl = JS_PREVIEW_AD_ITEM_TMPL;
		}
		var $tmp = $(itemTmpl);
		if($tmp.length == 0) return null;
		
		var $item = $tmp.clone();
		$item.attr("id", "");
		$(domParent).append($item.get(0));
		
		this.Init($item.get(0));
		return this.dom;
	};
	
	this.Init = function(dom) {
		this.SetDOM(dom);
		this.Bind();		
	};
	
	this.SetParent = function(parent) {
		this.parent = parent;
	};
	
	this.Delete = function() {
		if(this.dom == null) return;
		
		$(this.dom).remove();
		this.dom = null;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_DELETE_ADVERTISEMENT_TRIGGER, this.dom).click(function() {
			if(context.parent == null) return;
			context.parent.DeleteItem(context);
		});
		
		$(JS_POINT_TRIGGER, this.dom).click(function() {
			context.OnPoint();
		});
		
		$(JS_JUMP_TRIGGER, this.dom).click(function() {
			context.OnJump();
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
		
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.OnPoint = function() {
		var to = g_InputPreview.GetCurrentTimeObject();
		$(JS_AD_INSERT_TIME, this.dom).val(to.text);
	};
	
	this.OnJump = function() {
		var tt = $(JS_AD_INSERT_TIME, this.dom).val();
		g_InputPreview.JumpByTimeText(tt);
	};
	
	/* return: {time: h:m:s:ms} */
	this.GetInfo = function() {
		var o = {};
		o.time = $(JS_AD_INSERT_TIME, this.dom).val();
		return o;
	};
	
	/* o: {time: h:m:s:ms} */
	this.SetInfo = function(o) {
		$(JS_AD_INSERT_TIME, this.dom).val(o.time);
	};
}

function PreviewAd() {
	this.dom = null;
	this.itemArray = [];

	this.Init = function(dom) {
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.ENABLED) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_NEW_ADVERTISEMENT_TRIGGER, this.dom).click(function() {
			context.NewItem();
		});
	};
	
	this.InitSub = function() {
		var context = this;
		
		$(JS_ADVERTISEMENT_ITEM, this.dom).each(function(i) {
			var item = new PreviewAdItem();
			item.Init(this);
			item.SetParent(context);
			context.itemArray.push(item);
		});
		
		this.SortItems();
	};

	this.NewItem = function() {
		var item = new PreviewAdItem();
		item.Create($(JS_ADVERTISEMENT_LIST, this.dom).get(0));
		item.SetParent(this);
		this.itemArray.push(item);
		this.SortItems();
	};
	
	this.DeleteItem = function(item) {
		var bFound = false;
		for(var i = 0; i < this.itemArray.length; i++) {
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
		this.SortItems();
	};
	
	this.ClearItems = function() {
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.Delete();
		}
		this.itemArray.length = 0;
		this.SortItems();
	};
	
	this.SortItems = function() {
		var $array = $(JS_AD_ITEM_INDEX, this.dom);
		
		$array.each(function(i) {
			$(this).text(i+1);
		});
		
		if($array.length >= MAX_COUNT_ADVERTISEMENT_ITEM) {
			$(JS_NEW_ADVERTISEMENT_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_ADVERTISEMENT_TRIGGER, this.dom).show();
		}
	};
	
	/* return: [{time: h:m:s:ms}, ...] */
	this.GetItemList = function() {
		if(this.dom == null) return null;
		
		var ret = [];
		for(var i = 0; i < this.itemArray.length; i++) {
			var info = this.itemArray[i].GetInfo();
			ret.push(info);
		}
		return ret;
	};
	
	/* o: [{time: h:m:s:ms}, ...] */
	this.SetItemList = function(o) {
		if(this.dom == null) return;
		
		this.ClearItems();
		
		if(o == null) return;
		
		var domParent = $(JS_ADVERTISEMENT_LIST, this.dom);
		for(var i = 0; i < o.length; i++) {
			var item = new PreviewAdItem();
			item.Create(domParent);
			item.SetParent(this);
			item.SetInfo(o[i]);
			this.itemArray.push(item);
		}
		
		this.SortItems();
		
	};
}
