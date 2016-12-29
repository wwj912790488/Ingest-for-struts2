var JS_ADVERTISEMENT_ITEM = ".AdvertisementItem";
var JS_ADVERTISEMENT_LIST = ".AdvertisementList";
var JS_AD_ITEM_INDEX = ".AdItemIndex";
var JS_ADVERTISEMENT_PADDING = ".AdvertisementPadding";
var JS_SELECT_ADVERTISEMENT_TRIGGER = ".SelectAdvertisementTrigger";
var JS_DELETE_ADVERTISEMENT_TRIGGER = ".DeleteAdvertisementTrigger";
var JS_NEW_ADVERTISEMENT_TRIGGER = ".NewAdvertisementTrigger";
var JS_SELECT_AD_PADDING_TRIGGER = ".SelectADPaddingTrigger";
var JS_SELECT_AD_PADDING_LOGO_TRIGGER = ".SelectADPaddingLogoTrigger";
var JS_PREVIEW_ADVERTISEMENT_TRIGGER = ".PreviewAdvertisementTrigger";

var JS_AD_ENABLE = "input[name='AdvertisementEnable']";
var JS_AD_INSERT_TIME= "input[name='AdInsertTime']";
var JS_AD_CLIP_CROPPING = "input[name='AdClipCropping']";
var JS_AD_CLIP_START = "input[name='AdClipStart']";
var JS_AD_CLIP_END = "input[name='AdClipEnd']";
var JS_ADVERTISEMENT_URI = "input[name='AdvertisementUri']";
var JS_AD_PROGRAM_ID		="select[name='AdProgramId']";
var JS_AD_AUDIO_TRACK_ID	="select[name='AdAudioTrackId']";
var JS_AD_SUBTITLE_ID	="select[name='AdSubtitleId']";
var JS_AD_DURATION_LIMIT = "input[name='AdDurationLimit']";
var JS_AD_PADDING_TYPE = "select[name='AdPaddingType']";
var JS_AD_PADDING_URI = "input[name='AdPaddingUri']";
var JS_AD_PADDING_LOGO = "input[name='AdPaddingLogo']";

var FIELD_ADVERTISEMENT_ENABLE = "enabled";
var FIELD_ADVERTISEMENT_INSERTER = "advertisementInserter";
var FIELD_ADVERTISEMENT_ENTRY = "entry";
var FIELD_ADVERTISEMENT_CLIP = "clips";
var FIELD_ADVERTISEMENT_START = "start";
var FIELD_ADVERTISEMENT_END = "end";
var FIELD_ADVERTISEMENT_CROPPING = "cropping";
var FIELD_ADVERTISEMENT_URI = "uri";
var FIELD_MV4ENLIGHT = "mv4Enlight";
var FIELD_MV_TOTAL_DURATION = "totalDuration";
var FIELD_MV_URI = "uri";
var FIELD_MV_LOGO_URI = "logoUri";
var FIELD_MV_PADDING = "padding";

function AdvertisementItem() {
	var tagMap = [
		{key: TAG_ENTRY,	value: JS_AD_INSERT_TIME},
		{key: TAG_URI,	value: JS_ADVERTISEMENT_URI},
		{key: TAG_PROGRAM_ID,	value: JS_AD_PROGRAM_ID},
		{key: TAG_AUDIO_TRACK_ID,	value: JS_AD_AUDIO_TRACK_ID},
		{key: TAG_SUBTITLE_ID,	value: JS_AD_SUBTITLE_ID},
		{key: TAG_CROPPING,	value: JS_AD_CLIP_CROPPING},
		{key: TAG_START,	value: JS_AD_CLIP_START},
		{key: TAG_END,	value: JS_AD_CLIP_END}
		];
	
	var fieldMap = [
		{key: FIELD_ADVERTISEMENT_ENTRY,	value: JS_AD_INSERT_TIME},
		{key: FIELD_ADVERTISEMENT_START,	value: JS_AD_CLIP_START},
		{key: FIELD_ADVERTISEMENT_END,	value: JS_AD_CLIP_END},
		{key: FIELD_ADVERTISEMENT_CROPPING,	value: JS_AD_CLIP_CROPPING},
		{key: FIELD_ADVERTISEMENT_URI,	value: JS_ADVERTISEMENT_URI},
		{key: FIELD_INPUT_PROGRAM_ID,	value: JS_AD_PROGRAM_ID},
		{key: FIELD_INPUT_AUDIO_TRACK_ID,	value: JS_AD_AUDIO_TRACK_ID},
		{key: FIELD_INPUT_SUBTITLE_ID,	value: JS_AD_SUBTITLE_ID}
		];
	
	var validatorMap = [
		{selector: JS_AD_INSERT_TIME, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} },
		{selector: JS_AD_CLIP_START, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} },
		{selector: JS_AD_CLIP_END, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} }
		];
	
	this.prefixField = "";
	this.myField = FIELD_ADVERTISEMENT_CLIP;
	this.fieldIndex = null;
	
	this.dom = null;
	this.parent = null;
	this.mediaInfoControl = new MediaInfoControl();
	this.timerId = null;
	this.controlDom = {};

	this.SetDOM = function(dom) {
		this.dom = dom;
	};

	this.Create = function(domParent, itemTmpl) {
		if(itemTmpl == null) {
			itemTmpl = JS_ADVERTISEMENT_ITEM_TMPL;
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
		
		this.controlDom.program = $(JS_AD_PROGRAM_ID, this.dom).get(0);
		this.controlDom.audio = $(JS_AD_AUDIO_TRACK_ID, this.dom).get(0);
		this.controlDom.subtitle = $(JS_AD_SUBTITLE_ID, this.dom).get(0);
		this.controlDom.brief = $(JS_INPUT_MEDIA_INFO, this.dom).get(0);
		
		this.ClearSelected();
		
		this.mediaInfoControl.SetControlDom(this.controlDom);
		
		this.RequestMediaInfo();
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
		$(JS_SELECT_ADVERTISEMENT_TRIGGER, this.dom).click(function() {
			g_AdvertisementFileView.SetOnOK(function(key) {
				context.OnFileSelected(key);
			});
			g_AdvertisementFileView.SetShowBG(true);
			g_AdvertisementFileView.Show();
		});
		
		$(JS_ADVERTISEMENT_URI, this.dom).change(function() {
			context.RequestMediaInfo();
		});
		
		$(JS_DELETE_ADVERTISEMENT_TRIGGER, this.dom).click(function() {
			if(context.parent == null) return;
			context.parent.DeleteItem(context);
		});
		
		$(JS_PREVIEW_ADVERTISEMENT_TRIGGER, this.dom).click(function() {
			context.Preview();
		});
		
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.OnFileSelected = function(key) {
		$(JS_ADVERTISEMENT_URI, this.dom).val(key).change();
	};
	
	this.Preview = function() {
		var mediaInfo = this.GetMediaInfo();
		
		g_ProgramPreview.SetMediaInfo(mediaInfo);
		g_ProgramPreview.Show();
		g_ProgramPreview.Play();
	};
	
	this.GetMediaInfo = function() {
		var mediaInfo = this.mediaInfoControl.GetMediaInfo();
		if(mediaInfo == null) {
			mediaInfo = {};
		};
		
		mediaInfo = this.ExtendMediaInfo(mediaInfo);
		
		return mediaInfo;
	};
	
	this.ExtendMediaInfo = function(mediaInfo) {
		if(mediaInfo == null) {
			mediaInfo = {};
		};
		
		mediaInfo.inputType = INPUT_TYPE_FILE;
		mediaInfo.uri = $(JS_ADVERTISEMENT_URI, this.dom).val();
		
		return mediaInfo;
	};
	
	this.ClearSelected = function() {
		this.controlDom.program.options.length = 0;
		this.controlDom.program.disabled = true;
		
		this.controlDom.audio.options.length = 0;
		this.controlDom.audio.disabled = true;
		
		this.controlDom.subtitle.options.length = 0;
		this.controlDom.subtitle.disabled = true;
	};
	
	this.ClearBrief = function() {
		$(this.controlDom.brief).text("");
	};
	
	this.StartWaiting = function() {
		var $mediaInfo = $(JS_INPUT_MEDIA_INFO, this.dom); 
		$mediaInfo.text(".");
		this.timerId = setInterval(function() {
			var text = $mediaInfo.text();
			if(text.match(/^\.+$/gi) != null) {
				if(text.length > 20) text = "";
				text += ".";
				$mediaInfo.text(text);;
			}
		}, 500);
	};
	
	this.EndWaiting = function() {
		clearInterval(this.timerId);
	};
	
	this.StartRequest = function() {
		this.ClearSelected();
		this.StartWaiting();
	};
	
	this.EndRequest = function() {
		this.EndWaiting();
		this.ClearBrief();
	};
	
	this.SetMediaInfoData = function(data, programInfo) {
		if(programInfo == null) {
			programInfo = {};
			programInfo.programId = parseInt($(JS_INPUT_PROGRAM_ID_DOWN, this.dom).val());
			programInfo.audioTrackId = parseInt($(JS_INPUT_AUDIO_TRACK_ID_DOWN, this.dom).val());
			programInfo.subtitleId = parseInt($(JS_INPUT_SUBTITLE_ID_DOWN, this.dom).val());
		}
		
		this.mediaInfoControl.UpdateControl(data, programInfo);
	};
	
	this.RequestMediaInfo = function() {
		var context = this;
		var inputInfo = {};
		inputInfo.type = INPUT_TYPE_FILE;
		inputInfo.uri = this.GetValueByJS(JS_ADVERTISEMENT_URI);
		
		this.StartRequest();
		var ret = g_MediaInfoAjax.RequestMediaInfo(inputInfo, function(data) {
			context.EndRequest();
			context.SetMediaInfoData(data);
		});
		
		if(!ret) {
			this.EndRequest();
		}
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
		
	this.GetValueByJS = function(selector) {
		var $sel = $(selector);
		var value = "";
		if($sel.attr("type") == "checkbox") {
			value = $sel.get(0).checked? ENABLE_TRUE:ENABLE_FALSE;
		} else {
			value = $(selector, this.dom).val(); 
		}
		return value;
	};
	
	/** xml : XMLWriter object**/
	this.XML = function(xml) {
		var value = "";
		
		xml.BeginNode(TAG_CLIP);
	
		for(var i = 0; i < tagMap.length; i++) {
			value = this.GetValueByJS(tagMap[i].value);
			if(value != null) {
				xml.Node(tagMap[i].key, value);
			}
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
		
		var fullField = this.GetFullField();
		for(var i = 0; i < fieldMap.length; i++) {
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

function AdvertisementPadding() {
	var tagMap = [
		{key: TAG_TOTAL_DURATION,	value: JS_AD_DURATION_LIMIT},
		{key: TAG_URI,	value: JS_AD_PADDING_URI},
		{key: TAG_PADDING,	value: JS_AD_PADDING_TYPE},
		{key: TAG_PADDING_LOGO_URI,	value: JS_AD_PADDING_LOGO}
  		];
  	
  	var fieldMap = [
  		{key: FIELD_MV_TOTAL_DURATION,	value: JS_AD_DURATION_LIMIT},
  		{key: FIELD_MV_PADDING,	value: JS_AD_PADDING_TYPE},
  		{key: FIELD_MV_URI,	value: JS_AD_PADDING_URI},
  		{key: FIELD_MV_LOGO_URI,	value: JS_AD_PADDING_LOGO}
  		];
  	
  	var validatorMap = [
  		{selector: JS_AD_DURATION_LIMIT, type: VALIDATOR_TYPE_HMSM, param: {recommend: ""} }
  		];
  	
  	this.prefixField = "";
  	this.myField = FIELD_MV4ENLIGHT;
  	this.fieldIndex = null;
  	
  	this.dom = null;

  	this.SetDOM = function(dom) {
  		this.dom = dom;
  	};

  	this.Init = function(dom) {
  		this.SetDOM(dom);
  		this.LicenseControl();
  		this.UpdatePaddingType();
  		this.Bind();
  	};
  	
  	this.LicenseControl = function() {
  		if(GetLicense(license.ADS_ENLIGHT) != license.ENABLED) {
  			$(this.dom).remove();
  			this.dom = null;
  		}
  	};
  	
  	this.Bind = function() {
  		if(this.dom == null) return;
  		var context = this;
  		
  		$(JS_SELECT_AD_PADDING_TRIGGER, this.dom).click(function() {
			g_AdvertisementFileView.SetOnOK(function(key) {
				context.OnFileSelected(key);
			});
			g_AdvertisementFileView.SetShowBG(true);
			g_AdvertisementFileView.Show();
  		});
  		
		
		$(JS_SELECT_AD_PADDING_LOGO_TRIGGER, this.dom).click(function() {
			g_AdvertisementFileView.SetOnOK(function(key) {
				context.OnLogoSelected(key);
			});
			g_AdvertisementFileView.SetShowBG(true);
			g_AdvertisementFileView.Show();
		});
  		
  		ValidatorBindArray(this.dom, validatorMap);
  	};
  	
  	this.ClearInfo = function() {
  		if(this.dom == null) return;
  		$(JS_AD_DURATION_LIMIT, this.dom).val("");
  		$(JS_AD_PADDING_TYPE, this.dom).val("0");
  		$(JS_AD_PADDING_URI, this.dom).val("");
  		$(JS_AD_PADDING_LOGO, this.dom).val("");
  	};
  	
  	this.OnFileSelected = function(key) {
  		$(JS_AD_PADDING_URI, this.dom).val(key).change();
  	};
  	
	this.OnLogoSelected = function(key) {
		$(JS_AD_PADDING_LOGO, this.dom).val(key).change();
	};
  	
	this.GetValueByJS = function(selector) {
		return $(selector, this.dom).val();
	};
	
	this.UpdatePaddingType = function() {
		if(this.dom == null) return;
		var arr = advertisementData.getPaddingType();
		uUpdateSelect($(JS_AD_PADDING_TYPE, this.dom).get(0), arr);
	};
	
	/** xml : XMLWriter object**/
	this.XML = function(xml) {
		if(this.dom == null) return;
		var value = "";
		
		xml.BeginNode(TAG_MV4ENLIGHT);
	
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
		if(this.dom == null) return;
		
		var fullField = this.GetFullField();
		for(var i = 0; i < fieldMap.length; i++) {
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

function Advertisement() {
	this.dom = null;
	this.itemArray = [];
	this.itemTmpl = null;
	this.padding = new AdvertisementPadding();
	this.support = true;
	
	var fieldMap = [
		{key: FIELD_ADVERTISEMENT_ENABLE,	value: JS_AD_ENABLE}
		];
	
	this.prefixField = "";
	this.myField = FIELD_ADVERTISEMENT_INSERTER;
	this.fieldIndex = null;

	this.Init = function(dom, itemTmpl) {
		this.itemTmpl = itemTmpl;
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_ADS) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_NEW_ADVERTISEMENT_TRIGGER, this.dom).click(function() {
			context.NewItem();
		});
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_ADVERTISEMENT_ITEM, this.dom).each(function(i) {
			var item = new AdvertisementItem();
			item.Init(this);
			item.SetParent(context);
			context.itemArray.push(item);
		});
		
		this.padding.Init($(JS_ADVERTISEMENT_PADDING, this.dom).get(0));
		
		this.SortItems();
	};
	
	this.SetSupport = function(bSupport) {
		if(this.dom == null) return;
		if(bSupport) {
			$(JS_SUPPORT, this.dom).show();
			$(JS_UNSUPPORT, this.dom).hide();
		} else {
			$(JS_SUPPORT, this.dom).hide();
			$(JS_UNSUPPORT, this.dom).show();
		}
		this.support = bSupport;
	};

	this.NewItem = function() {
		if(this.dom == null) return;
		var item = new AdvertisementItem();
		item.Create($(JS_ADVERTISEMENT_LIST, this.dom).get(0));
		item.SetParent(this);
		this.itemArray.push(item);
		this.SortItems();
	};
	
	this.DeleteItem = function(item) {
		if(this.dom == null) return;
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
	
	this.ClearPadding = function() {
		this.padding.ClearInfo();
	};
	
	this.ClearItems = function() {
		if(this.dom == null) return;
		for(var i = 0; i < this.itemArray.length; i++) {
			var item = this.itemArray[i];
			item.Delete();
		}
		this.itemArray.length = 0;
		this.SortItems();
	};
	
	this.SortItems = function() {
		if(this.dom == null) return;
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
		
		if(o.length > this.itemArray.length) {
			var i = 0;
			for(; i < this.itemArray.length; i++) {
				var item = this.itemArray[i];
				item.SetInfo(o[i]);
			}
			
			var domParent = $(JS_ADVERTISEMENT_LIST, this.dom).get(0);
			for(; i < o.length; i++) {
				var item = new AdvertisementItem();
				item.Create(domParent);
				item.SetParent(this);
				item.SetInfo(o[i]);
				this.itemArray.push(item);
			}
		} else {
			var i = 0; 
			for(; i < o.length; i++) {
				var item = this.itemArray[i];
				item.SetInfo(o[i]);
			}
			
			for(; i < this.itemArray.length; i++) {
				var item = this.itemArray[i];
				item.Delete();
			}
			
			this.itemArray.length = o.length;
		}
		
		this.SortItems();
	};
	
	this.XML = function(xml) {
		if(this.dom == null) return;
		if(!this.support) return;
		
		xml.BeginNode(TAG_ADVERTISEMENT);
		
		for(var i = 0; i < this.itemArray.length; i++) {
			this.itemArray[i].XML(xml);
		}
		
		this.padding.XML(xml);
		
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
		if(!this.support) return;
		
		var fullField = this.GetFullField();
		for(var i = 0; i < fieldMap.length; i++) {
			var $sel = $(fieldMap[i].value, this.dom);
			var elName = fullField + fieldMap[i].key;
			$sel.attr("name", elName);
		};
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
		
		this.padding.SetPrefixField(fullField);
		this.padding.UpdateElementName();
	};
	/* Field operate end */
}
