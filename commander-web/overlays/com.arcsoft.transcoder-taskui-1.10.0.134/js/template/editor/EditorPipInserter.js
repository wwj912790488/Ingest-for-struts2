var FIELD_PIP_INSERTERS ="pipInserters";
var FIELD_PIP_URI ="uri";
var FIELD_PIP_PROGRAM_ID = "programId";
var FIELD_PIP_AUDIO_TRACK_ID = "audioTrackId";
var FIELD_PIP_SUBTITLE_ID = "subtitleId";
var FIELD_PIP_INSERT_TIME = "insertTime";
var FIELD_PIP_X ="posX";
var FIELD_PIP_Y ="posY";
var FIELD_PIP_WIDTH ="width";
var FIELD_PIP_HEIGHT ="height";
var FIELD_PIP_ALPHA ="alpha";
	
function EditorPipItem() {
	var tagMap = [
  		{key: TAG_URI, value: JS_PIP_URI},
  		{key: TAG_PROGRAM_ID, value: JS_PIP_PROGRAM_ID},
  		{key: TAG_AUDIO_TRACK_ID, value: JS_PIP_AUDIO_TRACK_ID},
  		{key: TAG_SUBTITLE_ID, value: JS_PIP_SUBTITLE_ID},
  		{key: TAG_INSERT_TIME, value: JS_PIP_INSERT_TIME},
  		{key: TAG_POS_X, value: JS_PIP_X},
  		{key: TAG_POS_Y, value: JS_PIP_Y},
  		{key: TAG_WIDTH, value: JS_PIP_WIDTH},
  		{key: TAG_HEIGHT, value: JS_PIP_HEIGHT},
  		{key: TAG_ALPHA, value: JS_PIP_ALPHA}
  		];
  	
  	var fieldMap = [
  		{key: FIELD_PIP_URI, value: JS_PIP_URI},
  		{key: FIELD_PIP_PROGRAM_ID, value: JS_PIP_PROGRAM_ID},
  		{key: FIELD_PIP_AUDIO_TRACK_ID, value: JS_PIP_AUDIO_TRACK_ID},
  		{key: FIELD_PIP_SUBTITLE_ID, value: JS_PIP_SUBTITLE_ID},
  		{key: FIELD_PIP_INSERT_TIME, value: JS_PIP_INSERT_TIME},
  		{key: FIELD_PIP_X, value: JS_PIP_X},
  		{key: FIELD_PIP_Y, value: JS_PIP_Y},
  		{key: FIELD_PIP_WIDTH, value: JS_PIP_WIDTH},
  		{key: FIELD_PIP_HEIGHT, value: JS_PIP_HEIGHT},
  		{key: FIELD_PIP_ALPHA, value: JS_PIP_ALPHA}
  		];
  	
	var infoChanger = [
		JS_PIP_URI,
		JS_PIP_PROGRAM_ID,
		JS_PIP_AUDIO_TRACK_ID,
		JS_PIP_SUBTITLE_ID,
		JS_PIP_INSERT_TIME,
		JS_PIP_X,
		JS_PIP_Y,
		JS_PIP_WIDTH,
		JS_PIP_HEIGHT,
		JS_PIP_ALPHA
  		];
  	
  	var validatorMap = [
  		{selector: JS_PIP_X, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: null, recommend: 0} },
  		{selector: JS_PIP_Y, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: null, recommend: 0} },
  		{selector: JS_PIP_ALPHA, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 100, recommend: 100} }
  		];
  	
	this.dom = null;
	this.pipInserter = null;
	this.prefixField = "";
	this.myField = FIELD_PIP_INSERTERS;
	this.fieldIndex = null;
	
	this.mediaInfoControl = new MediaInfoControl();
	this.timerId = null;
	this.controlDom = {};
	this.inputInfo = null;
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Create = function(domParent, tmpl) {
		if(tmpl == null) {
			tmpl = JS_PIP_ITEM_TMPL;
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
		this.Bind();
		
		this.controlDom.program = $(JS_PIP_PROGRAM_ID, this.dom).get(0);
		this.controlDom.audio = $(JS_PIP_AUDIO_TRACK_ID, this.dom).get(0);
		this.controlDom.subtitle = $(JS_PIP_SUBTITLE_ID, this.dom).get(0);
		this.controlDom.brief = $(JS_PIP_MEDIA_INFO, this.dom).get(0);
		this.mediaInfoControl.SetControlDom(this.controlDom);
		this.RequestMediaInfo();
	};
	
	this.RequestMediaInfo = function() {
		var context = this;
		var inputInfo = {};
		inputInfo.type = INPUT_TYPE_FILE;
		inputInfo.uri = $(JS_PIP_URI, this.dom).val();
		this.inputInfo = inputInfo;
		this.StartRequest();
		var ret = g_MediaInfoAjax.RequestMediaInfo(inputInfo, function(data, userData) {
			if(context.inputInfo === userData) {
				context.EndRequest();
				context.SetMediaInfoData(data);
			}
		}, inputInfo);
		
		if(!ret) {
			this.EndRequest();
		}
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
		var $mediaInfo = $(JS_PIP_MEDIA_INFO, this.dom); 
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
		g_MediaInfoRequestList.add(this);
	};
	
	this.EndRequest = function() {
		this.EndWaiting();
		this.ClearBrief();
		g_MediaInfoRequestList.remove(this);
	};
	
	this.SetMediaInfoData = function(data, programInfo) {
		if(programInfo == null) {
			programInfo = {};
			programInfo.programId = parseInt($(JS_PIP_PROGRAM_ID_DOWN, this.dom).val());
			programInfo.audioTrackId = parseInt($(JS_PIP_AUDIO_TRACK_ID_DOWN, this.dom).val());
			programInfo.subtitleId = parseInt($(JS_PIP_SUBTITLE_ID_DOWN, this.dom).val());
		}
		
		this.mediaInfoControl.UpdateControl(data, programInfo);
	};
	
	this.Delete = function() {
		$(this.dom).remove();
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_SELECT_PIP_TRIGGER, this.dom).click(function() {
			g_LogoFileView.SetOnOK(function(key) {
				context.OnFileSelected(key);
			});
			g_LogoFileView.SetShowBG(true);
			g_LogoFileView.Show();
		});
		
		$(JS_DELETE_PIP_TRIGGER, this.dom).click(function() {
			if(context.pipInserter != null) {
				context.pipInserter.DeletePipItem(context);
			}
		});
		
		ValidatorBindArray(this.dom, validatorMap);
		
		$(JS_PIP_URI, this.dom).change(function() {
			context.RequestMediaInfo();
		});
		
		this.BindInfoChanger();
	};
	
	this.OnFileSelected = function(key) {
		var $uri = $(JS_PIP_URI, this.dom);
		$uri.val(key);
		$uri.change();
	};
	
	this.GetUri = function() {
		return this.GetValueByJS(JS_PIP_URI);
	};
	
	this.SetUri = function(text) {
		$(JS_PIP_URI, this.dom).val(text);
	};
	
	this.GetInfo = function() {
		var o = new Object();
		
		o.uri = this.GetValueByJS(JS_PIP_URI);
		
		o.x = this.GetValueByJS(JS_PIP_X);
		o.x = parseInt(o.x);
		if(isNaN(o.x)) o.x = 0;
		
		o.y = this.GetValueByJS(JS_PIP_Y);
		o.y = parseInt(o.y);
		if(isNaN(o.y)) o.y = 0;
		
		o.alpha = this.GetValueByJS(JS_PIP_ALPHA);
		o.alpha = parseInt(o.alpha);
		if(isNaN(o.alpha)) o.alpha = 100;
		
		return o;
	};
	
	this.SetInfo = function(o) {
		$(JS_PIP_URI, this.dom).val(o.uri);
		$(JS_PIP_X, this.dom).val(o.x);
		$(JS_PIP_Y, this.dom).val(o.y);
		$(JS_PIP_ALPHA, this.dom).val(o.alpha);
	};
	
	this.SetPipInserter = function(pipInserter) {
		this.pipInserter = pipInserter;
	};
	
	this.OnInfoChange = function() {
		if(this.pipInserter == null) return;
		this.pipInserter.OnInfoChange();
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
		xml.BeginNode(TAG_PIP);
		
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

function EditorPipInserter() {
	this.dom = null;
	this.pipItemTmpl = JS_PIP_ITEM_TMPL;	//default value
	this.pipItemArray = [];
	this.fnNew = null;
	this.parent = null;
	
	this.prefixField = "";
	this.myField = FIELD_PIP_INSERTERS;
	this.fieldIndex = null;

	this.Init = function(dom, pipItemTmpl) {
		if(dom == null) return;
		if(pipItemTmpl != null) {
			this.pipItemTmpl = pipItemTmpl;
		}
		
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_PIP_INSERTION) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_PIP_ITEM, this.dom).each(function() {
			var sub = new EditorPipItem();
			sub.Init(this);
			sub.SetPipInserter(context);
			context.pipItemArray.push(sub);
		});
		this.SortPipItem();
	};
	
	this.Delete = function() {
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		$(JS_NEW_PIP_TRIGGER, this.dom).click(function() {
			context.NewPipItem();
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	this.NewPipItem = function() {
		var item = new EditorPipItem();
		item.Create($(JS_PIP_ITEM_CONTAINER, this.dom).get(0), this.pipItemTmpl);
		item.SetPipInserter(this);
		this.pipItemArray.push(item);
		this.SortPipItem();
		if($.isFunction(this.fnNew)) {
			this.fnNew(item.dom);
		}
		
		this.OnInfoChange();
	};
	
	this.DeletePipItem = function(item) {
		var bFound = false;
		var len = this.pipItemArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.pipItemArray[i-1] = this.pipItemArray[i];
			} else {
				if(this.pipItemArray[i] == item) {
					item.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.pipItemArray.length--;
		}
		this.SortPipItem();
		this.OnInfoChange();
	};
	
	this.OnUriChanged = function(changedItem) {
		
	};
	
	this.SortPipItem = function() {
		var $arr = $(JS_PIP_ITEM_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_PIP_ITEM) {
			$(JS_NEW_PIP_TRIGGER, this.dom).hide();
		} else {
			$(JS_NEW_PIP_TRIGGER, this.dom).show();
		}
	};

	this.ClearPipList = function() {
		if(this.dom == null) return;
		for(var i = 0; i < this.pipItemArray.length; i++) {
			var item = this.pipItemArray[i];
			item.Delete();
		}
		this.pipItemArray.length = 0;
		this.SortPipItem();
	};
	
	this.SetPipList = function(o) {
		if(this.dom == null) return;
		this.ClearPipList();
		if(o == null) return;
		for(var i = 0; i < o.length; i++) {
			var item = new EditorPipItem();
			item.Create($(JS_PIP_ITEM_CONTAINER, this.dom).get(0), this.pipItemTmpl);
			item.SetPipInserter(this);
			item.SetInfo(o[i]);
			this.pipItemArray.push(item);
			if($.isFunction(this.fnNew)) {
				this.fnNew(item.dom);
			}
		}
		this.SortPipItem();
	};
	
	this.GetPipList = function() {
		if(this.dom == null) return null;
		var o = [];
		for(var i = 0; i < this.pipItemArray.length; i++) {
			var item = this.pipItemArray[i];
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
		for(var i = 0; i < this.pipItemArray.length; i++) {
			var item = this.pipItemArray[i];
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
		for(var i = 0; i < this.pipItemArray.length; i++) {
			var item = this.pipItemArray[i];
			item.SetPrefixField(fullField);
			item.SetFieldIndex(i);
			item.UpdateElementName();
		}
	};
	/* Field operate end */
}
