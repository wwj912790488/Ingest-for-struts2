function OnPageReady() {
	g_taskSupport = new PresetSupport();
	g_taskSupport.Create();
}

function PresetSupport() {
	var JS_PRESET_DESCRIPTION	="textarea[name='Description']";

	var fieldMap = [
		{key: FIELD_ID,				value: JS_ID},
		{key: FIELD_NAME,			value: JS_NAME},
		{key: FIELD_DESCRIPTION,	value: JS_PRESET_DESCRIPTION},
		{key: FIELD_CATEGORY,		value: JS_CATEGORY}
	];
	
	this.dom = undefined;
	this.stream = undefined;
	
	this.prefixField = "";
	this.myField = FIELD_PRESET;
	this.fieldIndex = undefined;
	
	this.Create = function() {
		this.dom = $(JS_PRESET).get(0);

		g_PopBackground = new BackgroundControl();
		g_PopBackground.Init("presetBG");
		
		//import category
		g_LineSelector = CreateLineSelector("LineSelector", $('body').get(0));
		g_LineSelector.setTitle(str_common.macro);
		g_LineSelector.hide();
		
		//output preview
		g_OutputPreview = new OutputPreview();
		dom = g_OutputPreview.Init();
		$('body').append(dom);
		
		//select logo file
		g_LogoFileView = new FileView();
		dom = g_LogoFileView.Init();
		$('body').append(dom);
		g_LogoFileView.SetShowBG(false);
		title = str_output.logoFileViewTitle;
		g_LogoFileView.SetTitle(title);
		
		//select subtitle file
		g_SubtitleFileView = new FileView();
		dom = g_SubtitleFileView.Init();
		$('body').append(dom);
		g_SubtitleFileView.SetShowBG(false);
		title = str_output.subtitleFileViewTitle;
		g_SubtitleFileView.SetTitle(title);
		
		//palette
		g_Palette = new Palette();
		dom = g_Palette.Init();
		$('body').append(dom);
		
		this.Bind();
	};
	
	/** method **/
	this.Bind = function() {
		var context = this;
		var $preset = $(this.dom);
		
		$(JS_SUBMIT_TRIGGER).click(function() {
			context.Submit();
		});
		
		$(JS_BACK_TRIGGER).click(function() {
			window.location.href = PAGE_LIST_PRESET;
		});
		
		$preset.find(JS_STREAM).each(function(i){
			var streamSupport = new StreamSupport();
			streamSupport.Init(this);
			context.UpdateStream(streamSupport);
			context.stream = streamSupport;
		});
		
		$(JS_CATEGORY_LIST_TRIGGER, this.dom).click(function() {
			context.ImportCategory();
		});
	};
	
	this.ImportCategory = function() {
		var context = this;
		var $category = $(JS_CATEGORY_LIST_DATA);
		var arr = [];
		$("li", $category).each(function() {
			var o = {};
			o.value = $("div", this).get(0).innerText;
			o.key = $("div", this).get(1).innerText;
			arr.push(o);
		});
		
		g_LineSelector.setContent(arr);
		g_LineSelector.setTitle(str_common.categoryList);
		g_LineSelector.setOnSelected(function(key) {
			$(JS_CATEGORY, context.dom).val(key);
		});
		g_LineSelector.show();
	};
	
	this.isNew = function() {
		if($(JS_ACTION_TYPE, this.dom).val() == ACTION_TYPE_SAVE
			&& $(JS_ID, this.dom).val() == "0") {
			return true;
		} else {
			return false;
		}
	};
	
	this.SetCategory = function(category) {
		$(JS_CATEGORY, this.dom).val(category);
	};
	
	this.UpdateStream = function(streamSupport) {
		var $preset = $(this.dom);
		var summary = streamSupport.FormatText();
		$preset.find(JS_SUMMARY).text(summary);
	};
	
	this.GetValueByJS = function(selector) {
		return $(this.dom).find(selector).val();
	};
	
	this.Submit = function() {
		this.UpdateElementName();
		var form = $(this.dom).find("form").get(0);
		var ymdebug = $(form).serialize();
		form.submit();
	};
	
	this.GetEncodePolicy = function() {
		return ENCODINGPOLICY_CUSTOM;
	};
	
	this.GetInputSupport = function() {
		return null;
	};
	
	this.GetAudioJoinedList = function() {
		return null;
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
		if(this.fieldIndex == undefined) {
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
		var fullField = this.GetFullField();
		
		//stream
		var streamSupport = this.stream;
		streamSupport.SetPrefixField(fullField);
		streamSupport.myField = FIELD_STREAMASSEMBLY;
		streamSupport.UpdateElementName();
	};
	/* Field operate end */
}

PresetSupport.prototype = {
	getActionType : function() {
		return $(JS_ACTION_TYPE, this.dom).val();
	}
};