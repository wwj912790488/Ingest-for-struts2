function VideoProcessing() {
	var JS_VIDEO_PROCESSING_EXPAND_TRIGGER = ".VideoProcessingExpandTrigger";
	var JS_VIDEO_PROCESSING_EXPAND_TARGET = ".VideoProcessingExpandTarget";
	var JS_VIDEO_PROCESSING_EXPAND_ICON = ".VideoProcessingExpandIcon";
	var JS_LICENSE_ANTISHAKING = ".LicenseAntiShaking";
	var JS_LICENSE_DELIHGT = ".LicenseDelight";
	var JS_LICENSE_DENOISE = ".LicenseDenoise";
	var JS_LICENSE_DEINTERLACE = ".LicenseDeinterlace";
	var JS_LICENSE_DEBLOCK = ".LicenseDeblock";
	var JS_LICENSE_SHARPEN = ".LicenseSharpen";
	var JS_LICENSE_ANTIALIAS = ".LicenseAntialias";
	var JS_LICENSE_BRIGHT = ".LicenseBright";
	var JS_LICENSE_CONTRAST = ".LicenseContrast";
	var JS_LICENSE_SATURATION = ".LicenseSaturation";
	var JS_LICENSE_HUE = ".LicenseHue";
	var JS_LICENSE_RESIZEALG = ".LicenseResizeAlg";
	var JS_LICENSE_DEINTERLACEALG = ".LicenseDeinterlaceAlg";
	var JS_LICENSE_ROTATION = ".LicenseRotation";
	
	var JS_VIDEO_DENOISE ="select[name='Denoise']";
	var JS_VIDEO_DENOISE_METHOD ="select[name='DenoiseMethod']";
	var JS_VIDEO_DEINTERLACE ="select[name='Deinterlace']";
	var JS_VIDEO_DEBLOCK ="input[name='Deblock']";
	var JS_VIDEO_DELIGHT ="select[name='Delight']";
	var JS_VIDEO_SHARPEN ="select[name='Sharpen']";
	var JS_VIDEO_ANTIALIAS ="input[name='AntiAlias']";
	var JS_VIDEO_ANTISHAKING ="select[name='AntiShaking']";
	var JS_VIDEO_BRIGHT ="input[name='Bright']";
	var JS_VIDEO_CONTRAST ="input[name='Contrast']";
	var JS_VIDEO_SATURATION ="input[name='Saturation']";
	var JS_VIDEO_HUE ="input[name='Hue']";
	var JS_VIDEO_RESIZEALG ="select[name='ResizeAlg']";
	var JS_VIDEO_DEINTERLACEALG ="select[name='DeinterlaceAlg']";
	var JS_VIDEO_ROTATION ="input[name='Rotation']";
	
	var TAG_VIDEO_PROCESSING ="simhd";
	var TAG_VIDEO_DENOISE ="denoise";
	var TAG_VIDEO_DENOISE_METHOD ="denoisemethod";
	var TAG_VIDEO_DEINTERLACE ="deinterlace";
	var TAG_VIDEO_DEBLOCK ="deblock";
	var TAG_VIDEO_DELIGHT ="delight";
	var TAG_VIDEO_SHARPEN ="sharpen";
	var TAG_VIDEO_ANTIALIAS ="antialias";
	var TAG_VIDEO_ANTISHAKING ="antishaking";
	var TAG_VIDEO_BRIGHT ="brightness";
	var TAG_VIDEO_CONTRAST ="contrast";
	var TAG_VIDEO_SATURATION ="saturation";
	var TAG_VIDEO_HUE ="hue";
	var TAG_VIDEO_RESIZEALG ="resizealg";
	var TAG_VIDEO_DEINTERLACEALG ="deinterlacealg";
	var TAG_VIDEO_ROTATION ="rotation";
	
	var FIELD_VIDEO_PROCESSING ="imageEditor";
	var FIELD_VIDEO_DENOISE ="denoise";
	var FIELD_VIDEO_DENOISE_METHOD ="denoiseMethod";
	var FIELD_VIDEO_DEINTERLACE ="deinterlace";
	var FIELD_VIDEO_DEBLOCK ="deblock";
	var FIELD_VIDEO_DELIGHT ="delight";
	var FIELD_VIDEO_SHARPEN ="sharpen";
	var FIELD_VIDEO_ANTIALIAS ="antialias";
	var FIELD_VIDEO_ANTISHAKING ="antiShaking";
	var FIELD_VIDEO_BRIGHT ="brightness";
	var FIELD_VIDEO_CONTRAST ="contrast";
	var FIELD_VIDEO_SATURATION ="saturation";
	var FIELD_VIDEO_HUE ="hue";
	var FIELD_VIDEO_RESIZEALG ="resizeAlg";
	var FIELD_VIDEO_DEINTERLACEALG ="deinterlaceAlg";
	var FIELD_VIDEO_ROTATION ="rotation";

	/*static var*/
	this.dom = null;
	this.simHdScenesParser = new SimHdScenesParser();
	this.simHdParser = new BaseParser();
	this.prefixField = "";
	this.myField = FIELD_VIDEO_PROCESSING;
	this.fieldIndex = null;
	this.parent = null;
	
	var tagMap = [
		{key: TAG_VIDEO_DEBLOCK, value: JS_VIDEO_DEBLOCK},
		{key: TAG_VIDEO_DEINTERLACE, value: JS_VIDEO_DEINTERLACE},
		{key: TAG_VIDEO_DENOISE, value: JS_VIDEO_DENOISE},
		{key: TAG_VIDEO_DENOISE_METHOD, value: JS_VIDEO_DENOISE_METHOD},
		{key: TAG_VIDEO_DELIGHT, value: JS_VIDEO_DELIGHT},
		{key: TAG_VIDEO_SHARPEN, value: JS_VIDEO_SHARPEN},
		{key: TAG_VIDEO_ANTIALIAS, value: JS_VIDEO_ANTIALIAS},
		{key: TAG_VIDEO_ANTISHAKING, value: JS_VIDEO_ANTISHAKING},
		{key: TAG_VIDEO_BRIGHT, value: JS_VIDEO_BRIGHT},
		{key: TAG_VIDEO_CONTRAST, value: JS_VIDEO_CONTRAST},
		{key: TAG_VIDEO_SATURATION, value: JS_VIDEO_SATURATION},
		{key: TAG_VIDEO_HUE, value: JS_VIDEO_HUE},
		{key: TAG_VIDEO_RESIZEALG, value: JS_VIDEO_RESIZEALG},
		{key: TAG_VIDEO_DEINTERLACEALG, value: JS_VIDEO_DEINTERLACEALG},
		{key: TAG_VIDEO_ROTATION, value: JS_VIDEO_ROTATION}
		];
	
	var fieldMap = [
	    {key: FIELD_VIDEO_DENOISE, value: JS_VIDEO_DENOISE},
	    {key: FIELD_VIDEO_DENOISE_METHOD, value: JS_VIDEO_DENOISE_METHOD},
		{key: FIELD_VIDEO_DEINTERLACE, value: JS_VIDEO_DEINTERLACE},
		{key: FIELD_VIDEO_DEBLOCK, value: JS_VIDEO_DEBLOCK},
		{key: FIELD_VIDEO_DELIGHT, value: JS_VIDEO_DELIGHT},
		{key: FIELD_VIDEO_SHARPEN, value: JS_VIDEO_SHARPEN},
		{key: FIELD_VIDEO_ANTIALIAS, value: JS_VIDEO_ANTIALIAS},
		{key: FIELD_VIDEO_ANTISHAKING, value: JS_VIDEO_ANTISHAKING},
		{key: FIELD_VIDEO_BRIGHT, value: JS_VIDEO_BRIGHT},
		{key: FIELD_VIDEO_CONTRAST, value: JS_VIDEO_CONTRAST},
		{key: FIELD_VIDEO_SATURATION, value: JS_VIDEO_SATURATION},
		{key: FIELD_VIDEO_HUE, value: JS_VIDEO_HUE},
		{key: FIELD_VIDEO_RESIZEALG, value: JS_VIDEO_RESIZEALG},
		{key: FIELD_VIDEO_DEINTERLACEALG, value: JS_VIDEO_DEINTERLACEALG},
		{key: FIELD_VIDEO_ROTATION, value: JS_VIDEO_ROTATION}
		];
	
	var infoChanger = [
		JS_VIDEO_DENOISE,
		JS_VIDEO_DENOISE_METHOD,
		JS_VIDEO_DEINTERLACE,
		JS_VIDEO_DEBLOCK,
		JS_VIDEO_DELIGHT,
		JS_VIDEO_SHARPEN,
		JS_VIDEO_ANTIALIAS,
		JS_VIDEO_ANTISHAKING,
		JS_VIDEO_BRIGHT,
		JS_VIDEO_CONTRAST,
		JS_VIDEO_SATURATION,
		JS_VIDEO_HUE,
		JS_VIDEO_RESIZEALG,
		JS_VIDEO_DEINTERLACEALG,
		JS_VIDEO_ROTATION
		];
	
	var validatorMap = [
		{selector: JS_VIDEO_BRIGHT, type: VALIDATOR_TYPE_INTEGER, param: {min: -100, max: 100, recommend: 0} },
		{selector: JS_VIDEO_CONTRAST, type: VALIDATOR_TYPE_INTEGER, param: {min: -100, max: 100, recommend: 0} },
		{selector: JS_VIDEO_SATURATION, type: VALIDATOR_TYPE_INTEGER, param: {min: -100, max: 100, recommend: 0} },
		{selector: JS_VIDEO_HUE, type: VALIDATOR_TYPE_INTEGER, param: {min: -180, max: 180, recommend: 0} }
		];

	this.Init = function(dom) {
		if(dom == null) return;
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.BindExpand();
		this.UpdateDenoise();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.OUTPUT_SIM_HD) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
			return;
		}
		
		if(GetLicense(license.IMAGE_EDITING_ANTISHAKING) != license.ENABLED) {
			$(JS_LICENSE_ANTISHAKING, this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_DELIGHT)!=license.ENABLED){
			$(JS_LICENSE_DELIHGT,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_DENOISE)!=license.ENABLED){
			$(JS_LICENSE_DENOISE,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_DEINTERLACE)!=license.ENABLED){
			$(JS_LICENSE_DEINTERLACE,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_DEBLOCK)!=license.ENABLED){
			$(JS_LICENSE_DEBLOCK,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_SHARPEN)!=license.ENABLED){
			$(JS_LICENSE_SHARPEN,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_ANTIALIAS)!=license.ENABLED){
			$(JS_LICENSE_ANTIALIAS,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_BRIGHT)!=license.ENABLED){
			$(JS_LICENSE_BRIGHT,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_CONTRAST)!=license.ENABLED){
			$(JS_LICENSE_CONTRAST,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_SATURATION)!=license.ENABLED){
			$(JS_LICENSE_SATURATION,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_HUE)!=license.ENABLED){
			$(JS_LICENSE_HUE,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_RESIZEALG)!=license.ENABLED){
			$(JS_LICENSE_RESIZEALG,this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_DEINTERLACEALG)!=license.ENABLED){
			$(JS_LICENSE_DEINTERLACEALG,this.dom).hide();
		}
		
		if(GetLicense(license.OUTPUT_SIM_HD_SCENE)!=license.ENABLED){
			$(".LicenseSimHdScene",this.dom).hide();
		}
		
		if(GetLicense(license.IMAGE_EDITING_ROTATION)!=license.ENABLED){
			$(JS_LICENSE_ROTATION,this.dom).remove();
		}
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Delete = function() {
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		var dom = $(JS_VIDEO_DEINTERLACE, this.dom).get(0);
		var arr = videoProcessingData.getDeinterlace();
		uUpdateSelect(dom, arr);

		dom = $(JS_VIDEO_DENOISE_METHOD, this.dom).get(0);
		arr = videoProcessingData.getDenoiseMethod();
		uUpdateSelect(dom, arr);
		
		/*var method = $(JS_VIDEO_DENOISE_METHOD, this.dom).val();
		dom = $(JS_VIDEO_DENOISE, this.dom).get(0);
		arr = videoProcessingData.getDenoise(method);
		uUpdateSelect(dom, arr);*/

		dom = $(JS_VIDEO_DELIGHT, this.dom).get(0);
		arr = videoProcessingData.getDelight();
		uUpdateSelect(dom, arr);
		
		dom = $(JS_VIDEO_SHARPEN, this.dom).get(0);
		arr = videoProcessingData.getSharpen();
		uUpdateSelect(dom, arr);
		
		dom = $(JS_VIDEO_ANTISHAKING, this.dom).get(0);
		arr = videoProcessingData.getAntiShaking();
		uUpdateSelect(dom, arr);
		
		dom = $(JS_VIDEO_RESIZEALG, this.dom).get(0);
		arr = videoProcessingData.getResizeAlg();
		uUpdateSelect(dom, arr);
		
		dom = $(JS_VIDEO_DEINTERLACEALG, this.dom).get(0);
		arr = videoProcessingData.getDeinterlaceAlg();
		uUpdateSelect(dom, arr);
		
		$(JS_VIDEO_DENOISE_METHOD, this.dom).change(function() {
			context.UpdateDenoise();
		});
		
		$(".ImportSimHdTrigger", this.dom).click(function() {
			context.requestSimHdList();
		});
		
		ValidatorBindArray(this.dom, validatorMap);
		
		this.BindInfoChanger();
	};
	
	this.BindExpand = function() {
		if(this.dom == null) return;
		var $dom = $(this.dom);
		var o = {};
		o.$trigger = $(JS_VIDEO_PROCESSING_EXPAND_TRIGGER, this.dom);
		o.$icon = $(JS_VIDEO_PROCESSING_EXPAND_ICON, this.dom);
		o.$target = $(JS_VIDEO_PROCESSING_EXPAND_TARGET, this.dom);
		
		var codec = this.parent.GetCodec();
		var codecExpand = videoData.getCodecExpandInfo(codec);
		o.disabled = codecExpand.disabled;
		o.expand = false;
		uBindExpand(o);
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
	
	this.UpdateDenoise = function() {
		var $denoiseMethod = $(JS_VIDEO_DENOISE_METHOD, this.dom);
		if($denoiseMethod.length == 0) return;

		var method = $(JS_VIDEO_DENOISE_METHOD, this.dom).val();
		var dom = $(JS_VIDEO_DENOISE, this.dom).get(0);
		var arr = videoProcessingData.getDenoise(method);
		uUpdateSelect(dom, arr);
	};
	
	this.onRespSimHdScene = function(xml) {
		this.simHdParser.parseString(xml);
		
		$(JS_VIDEO_DEINTERLACE, this.dom).val(this.simHdParser.getTagValue("deinterlace"));
		$(JS_VIDEO_DENOISE, this.dom).val(this.simHdParser.getTagValue("denoise"));
		$(JS_VIDEO_DENOISE_METHOD, this.dom).val(this.simHdParser.getTagValue("denoisemethod"));
		$(JS_VIDEO_DELIGHT, this.dom).val(this.simHdParser.getTagValue("delight"));
		$(JS_VIDEO_SHARPEN, this.dom).val(this.simHdParser.getTagValue("sharpen"));
		$(JS_VIDEO_ANTISHAKING, this.dom).val(this.simHdParser.getTagValue("antishaking"));
		$(JS_VIDEO_BRIGHT, this.dom).val(this.simHdParser.getTagValue("brightness"));
		$(JS_VIDEO_CONTRAST, this.dom).val(this.simHdParser.getTagValue("contrast"));
		$(JS_VIDEO_SATURATION, this.dom).val(this.simHdParser.getTagValue("saturation"));
		$(JS_VIDEO_HUE, this.dom).val(this.simHdParser.getTagValue("hue"));
		$(JS_VIDEO_RESIZEALG, this.dom).val(this.simHdParser.getTagValue("resizealg"));
		$(JS_VIDEO_DEINTERLACEALG, this.dom).val(this.simHdParser.getTagValue("deinterlacealg"));
		$(JS_VIDEO_ROTATION, this.dom).val(this.simHdParser.getTagValue("rotation"));
		
		var deblock = this.simHdParser.getTagValue("deblock");
		if(deblock == "1") {
			this.setCheckBox(JS_VIDEO_DEBLOCK, true);
		}
		else {
			this.setCheckBox(JS_VIDEO_DEBLOCK, false);
		}
		
		var antialias = this.simHdParser.getTagValue("antialias");
		if(antialias == "1") {
			this.setCheckBox(JS_VIDEO_ANTIALIAS, true);
		}
		else {
			this.setCheckBox(JS_VIDEO_ANTIALIAS, false);
			
		}
	}
	
	/* XML submit */
	this.GetValueByJS = function(jsSelect) {
		var value = null;
		var $sel = $(this.dom).find(jsSelect);
		if($sel.attr('type') == "checkbox") {
			var checkVal = $sel.val();
			if(checkVal == "on") {
				if($sel.get(0).checked) {
					value = ENABLE_TRUE;
				} else {
					value = ENABLE_FALSE;
				}
			}
			else {
				if($sel.get(0).checked) {
					value = "1";
				} else {
					value = "0";
				}
			}
		} else {
			value = $sel.val();
		}
		return value;
	};
	
	this.XML = function(xml) {
		if(this.dom == null) return;
		xml.BeginNode(TAG_VIDEO_PROCESSING);
		
		var len = tagMap.length;
		for(var i = 0; i < len; i++) {
			var value = this.GetValueByJS(tagMap[i].value);
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

VideoProcessing.prototype = {
	requestSimHdList : function() {
		var context = this;
		var url = "api/simhd_scene/all";
		var param = {rnd: Math.random()};
		$.get(url, param, function(xml) {
			context.onRespSimHdList(xml);
		});
	},
	
	onRespSimHdList: function(xml) {
		var context = this;
		this.simHdScenesParser.parseString(xml);
		var scenes = this.simHdScenesParser.simHdScenes;
		var map = [];
		for(var i = 0; i < scenes.length; i++) {
			var simHdSceneParser = scenes[i];
			var o = {};
			o.key = simHdSceneParser.getAttrValue("id");
			o.value = simHdSceneParser.getTagValue("name");
			if(o.key == "default") {
				map.unshift(o);
			}
			else {
				map.push(o);
			}
		}
		
		g_LineSelector.setContent(map);
		g_LineSelector.setTitle(str_common.import_scene);
		g_LineSelector.setOnSelected(function(key) {
			context.requestSimHdScene(key);
		});
		g_LineSelector.show();
	},
	
	requestSimHdScene: function(id) {
		var context = this;
		var url = "api/simhd_scene/" + id;
		var param = {rnd: Math.random()};
		$.get(url, param, function(xml) {
			context.onRespSimHdScene(xml);
		});
	},
	
	setCheckBox: function(domSelector, bCheck) {
		var $dom = $(domSelector, this.dom);
		if($dom.length > 0) {
			$dom.get(0).checked = bCheck;
		}
	}
};