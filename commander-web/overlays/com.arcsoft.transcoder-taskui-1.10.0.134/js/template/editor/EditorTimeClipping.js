function Timeslice() {
	var tagMap = [
		{key: TAG_TIMESLICE_START,	value: JS_TIMESLICE_START},
		{key: TAG_TIMESLICE_END,	value: JS_TIMESLICE_END}
		];
	
	var fieldMap = [
		{key: FIELD_TIMESLICE_START,	value: JS_TIMESLICE_START},
		{key: FIELD_TIMESLICE_END,	value: JS_TIMESLICE_END}
		];
	
	var validatorMap = [
		{selector: JS_TIMESLICE_START, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} },
		{selector: JS_TIMESLICE_END, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} }
		];
	
	this.prefixField = "";
	this.myField = FIELD_TIMESLICES;
	this.fieldIndex = null;
	
	this.dom = null;
	this.timeClipping = null;

	this.SetDOM = function(dom) {
		this.dom = dom;
	};

	this.Create = function(domParent, timesliceTmpl) {
		if(timesliceTmpl == null) {
			timesliceTmpl = JS_TIMESLICE_TEMPLATE;
		}
		var $tmp = $(timesliceTmpl);
		if($tmp.length == 0) return null;
		
		var $ts = $tmp.clone();
		$ts.attr("id", "");
		$(domParent).append($ts.get(0));
		
		this.Init($ts.get(0));
		return this.dom;
	};
	
	this.Init = function(dom) {
		this.SetDOM(dom);
		this.Bind();
	};
	
	this.Delete = function() {
		$(this.dom).remove();
		this.dom = null;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		var $timeslice = $(this.dom);
		$timeslice.find(JS_DELETE_CLIP_TRIGGER).click(function() {
			if(context.timeClipping != null) {
				context.timeClipping.DeleteTimeslice(context);
			}
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
	
	this.SetTimeClipping = function(timeClipping) {
		this.timeClipping = timeClipping;
	};
	
	//o: {startTimeText: "hh:mm:ss:ff", endTimeText: "hh:mm:ss:ff"}
	this.SetTime = function(o) {
		if(this.dom == null) return;
		var $ts = $(this.dom);
		$ts.find(JS_TIMESLICE_START).val(o.startTimeText);
		$ts.find(JS_TIMESLICE_END).val(o.endTimeText);
	};
	
	this.GetTime = function() {
		if(this.dom == null) return null;
		var $ts = $(this.dom);
		var o = {};
		
		o.startTimeText = $ts.find(JS_TIMESLICE_START).val();
		var timeObj = uTimeText2Object(o.startTimeText);
		o.startTime = timeObj.ms;
		if(isNaN(o.startTime)) o.startTime = 0;
		
		o.endTimeText = $ts.find(JS_TIMESLICE_END).val();
		timeObj = uTimeText2Object(o.endTimeText);
		o.endTime = timeObj.ms;
		if(isNaN(o.endTime)) o.endTime = 0;
		
		return o;
	};
	
	this.GetValueByJS = function(selector) {
		return $(this.dom).find(selector).val();
	};
	
	/** xml : XMLWriter object**/
	this.XML = function(xml) {
		if(this.dom == null) return;
		var value = "";
		
		xml.BeginNode(TAG_TIMESLICE);
	
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

function EditorTimeClipping() {
	var defaultData = {enable: ENABLE_FALSE, mode: ENABLE_TRUE};
	
	var fieldMap = [
		{key: FIELD_TIMECLIPPING_ENABLE, value: JS_TIMECLIPPING_ENABLE},
		{key: FIELD_TIMECLIPPING_TRIMMED, value: JS_TIMECLIPPING_MODE}
	];
	
	this.prefixField = "";
	this.myField = FIELD_TIMECLIPPING;
	this.fieldIndex = null;
	
	this.dom = null;
	this.timesliceArray = [];
	this.timesliceTmpl = null;
	this.fnNew = null;
	this.fnDelete = null;
	this.support = true;

	this.Init = function(dom, timesliceTmpl) {
		this.timesliceTmpl = timesliceTmpl;
		this.SetDOM(dom);
		this.LicenseControl();
		this.UpdateTrimmed();
		this.Bind();
		this.InitSub();
		this.SortTimeSlices();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_TIMELINE_CUT_TRIM) != license.ENABLED) {
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
		var $timeClipping = $(this.dom);
		$timeClipping.find(JS_NEW_CLIP_TRIGGER).click(function() {
			context.NewTimeslice();
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
	};
	
	this.InitSub = function() {
		if(this.dom == null) return;
		var context = this;
		var $timeClipping = $(this.dom);
		$timeClipping.find(JS_TIMESLICE).each(function() {
			var timeslice = new Timeslice();
			timeslice.Init(this);
			timeslice.SetTimeClipping(context);
			context.timesliceArray.push(timeslice);
		});
	};
	
	this.UpdateTrimmed = function() {
		var trimmed = $(JS_TIMECLIPPING_TRIMMED, this.dom).val();
		var value = "true";
		if(trimmed == "0") {
			value = "false";
		}
		
		$(JS_TIMECLIPPING_MODE, this.dom).each(function() {
			if(value == this.value) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		});
	};
	
	this.SetFnNew = function(fn) {
		this.fnNew = fn;
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.SetFnDelete = function(fn) {
		this.fnDelete = fn;
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
	
	this.NewTimeslice = function() {
		var timeslice = new Timeslice();
		timeslice.Create($(this.dom).find(JS_CLIP_CONTAINER).get(0), this.timesliceTmpl);
		timeslice.SetTimeClipping(this);
		this.timesliceArray.push(timeslice);
		this.SortTimeSlices();
		if($.isFunction(this.fnNew)) {
			this.fnNew(timeslice.dom);
		}
	};
	
	this.DeleteTimeslice = function(timeslice) {
		var bFound = false;
		var len = this.timesliceArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.timesliceArray[i-1] = this.timesliceArray[i];
			} else {
				if(this.timesliceArray[i] == timeslice) {
					timeslice.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.timesliceArray.length--;
		}
		this.SortTimeSlices();
		if($.isFunction(this.fnDelete)) {
			this.fnDelete();
		}
	};
	
	this.ClearTimeslice = function() {
		if(this.dom == null) return;
		var len = this.timesliceArray.length;
		for(var i = 0; i < len; i++) {
			var timeslice =	this.timesliceArray[i];
			timeslice.Delete();
		}
		this.timesliceArray.length = 0;
		this.SortTimeSlices();
	};
	
	this.SortTimeSlices = function() {
		var $dom = $(this.dom);
		var $tsArr = $dom.find(JS_CLIP_INDEX);
		$tsArr.each(function(i) {
			$(this).text(i+1);
		});
		if($tsArr.length >= MAX_COUNT_TIME_SLICES) {
			$dom.find(JS_NEW_CLIP_TRIGGER).hide();
		} else {
			$dom.find(JS_NEW_CLIP_TRIGGER).show();
		}
	};
	
	this.GetTimeClippingInfo = function() {
		if(this.dom == null) return null;
		var o = {};
		o.enable = this.GetValueByJS(JS_TIMECLIPPING_ENABLE);
		o.mode = this.GetValueByJS(JS_TIMECLIPPING_MODE);
		return o;
	};
	
	this.SetTimeClippingInfo = function(o) {
		if(this.dom == null) return;
		var $timeClipping = $(this.dom);
		if(o.enable == ENABLE_TRUE) {
			$timeClipping.find(JS_TIMECLIPPING_ENABLE).get(0).checked = true;
		} else {
			$timeClipping.find(JS_TIMECLIPPING_ENABLE).get(0).checked = false;
		}
		
		$timeClipping.find(JS_TIMECLIPPING_MODE).each(function() {
			if(o.mode == this.value) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		});
	};
	
	this.GetTimesliceList = function() {
		if(this.dom == null) return null;
		var array = [];
		for(var i = 0; i < this.timesliceArray.length; i++) {
			var timeslice = this.timesliceArray[i];
			var o = timeslice.GetTime();
			array[i] = o;
		}
		return array;
	};
	
	//array: [{startTimeText: "hh:mm:ss:ff", endTimeText: "hh:mm:ss:ff"}, {...}]
	this.SetTimesliceList = function(array) {
		if(this.dom == null) return;
		this.ClearTimeslice();
		for(var i = 0; i < array.length; i++) {
			var timeslice = new Timeslice();
			timeslice.Create($(this.dom).find(JS_CLIP_CONTAINER).get(0), this.timesliceTmpl);
			timeslice.SetTime(array[i]);
			timeslice.SetTimeClipping(this);
			this.timesliceArray.push(timeslice);
			if($.isFunction(this.fnNew)) {
				this.fnNew(timeslice.dom);
			}
		}
		this.SortTimeSlices();
	};
	
	this.RestoreTimeClipping = function() {
		if(this.dom == null) return;
		this.SetTimeClippingInfo(defaultData);
		var arr = [];
		this.SetTimesliceList(arr);
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
		if(!this.support) return;
		
		xml.BeginNode(TAG_TIMECLIPPING);
		var o = this.GetTimeClippingInfo();
		xml.Node(TAG_ENABLED, o.enable);
		xml.Node(TAG_TIMECLIPPING_TRIMMED, o.mode);
		
		for(var i = 0; i < this.timesliceArray.length; i++) {
			var timeslice = this.timesliceArray[i];
			timeslice.XML(xml);
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
		if(!this.support) return;
		
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
		var fullField = this.GetFullField();
		
		//timeslice
		for(var i = 0; i < this.timesliceArray.length; i++) {
			var timeslice = this.timesliceArray[i];
			timeslice.SetPrefixField(fullField);
			timeslice.SetFieldIndex(i);
			timeslice.UpdateElementName();
		}
	};
	/* Field operate end */
}
