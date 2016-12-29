function EditorPaddingImage() {
	var JS_SELECT_PADDING_IMAGE_TRIGGER = ".SelectPaddingImageTrigger";
	
	var JS_PADDING_IMAGE = "input[name='PaddingImage']";
	
	var FIELD_PADDING_IMAGE = "paddingImage";
	
	var TAG_PADDING_IMAGE = "paddingimage";
	
	var fieldMap = [
		{key: FIELD_PADDING_IMAGE, value: JS_PADDING_IMAGE}
		];
	
	this.prefixField = "";
	this.myField = null;
	this.fieldIndex = null;
	
	this.dom = null;

	this.Init = function(dom) {
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_PADDING_IMAGE) != license.ENABLED) {
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
		$(JS_SELECT_PADDING_IMAGE_TRIGGER, this.dom).click(function() {
			g_InputFileView.SetOnOK(function(key) {
				$(JS_PADDING_IMAGE, context.dom).val(key);
			});
			g_InputFileView.SetShowBG(true);
			g_InputFileView.Show();
		});
		
		$(".PaddingMaterialTrigger", this.dom).click(function() {
			context.RequestMaterial();
		});
	};
	

	this.ShowLineDialog = function(title, map) {
		var context = this;
		g_LineSelector.setContent(map);
		g_LineSelector.setTitle(title);
		g_LineSelector.setOnSelected(function(key) {
			if(key.length == 0) return;
			
			$(JS_PADDING_IMAGE, context.dom).val(key).change();
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
		var param = {materialType: MATERIAL_TYPE_PADDING, rand: Math.random()};
		$.post(url, param, function(data) {
			var arr = ParseMaterial(data);
			context.ListMaterial(arr);
		});
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

		var value = this.GetValueByJS(JS_PADDING_IMAGE);
		
		xml.Node(TAG_PADDING_IMAGE, value);
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
