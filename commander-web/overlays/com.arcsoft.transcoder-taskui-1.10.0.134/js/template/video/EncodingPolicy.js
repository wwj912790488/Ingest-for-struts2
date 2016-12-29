/**
 * can delete
 */
function EncodingPolicy() {
	var JS_TWO_PASS = "input[name='TwoPass']";
	var JS_QUALITY_LEVEL_DISP = "select[name='QualityLevelDisp']";
	var JS_QUALITY_LEVEL = "input[name='QualityLevel']";
	var JS_DEVICE_ID = "input[name='DeviceId']";
	
	var FIELD_TWO_PASS = "twoPasses";
	var FIELD_DEVICE_ID = "deviceId";
	var FIELD_QUALITY_LEVEL = "qualityLevel";
	
	var TAG_TWO_PASS = "twopass";
	var TAG_DEVICE_ID = "deviceid";
	var TAG_QUALITY_LEVEL = "qualitylevel";
	
	var fieldMap = [
    	{key: FIELD_TWO_PASS, value: JS_TWO_PASS},
    	{key: FIELD_DEVICE_ID, value: JS_DEVICE_ID},
    	{key: FIELD_QUALITY_LEVEL, value: JS_QUALITY_LEVEL}
    	];
	
	var tagMap = [
		{key: TAG_TWO_PASS, value: JS_TWO_PASS},
		{key: TAG_DEVICE_ID, value: JS_DEVICE_ID},
		{key: TAG_QUALITY_LEVEL, value: JS_QUALITY_LEVEL}
		];
	
	var infoChanger = [
		JS_TWO_PASS,
		JS_QUALITY_LEVEL_DISP
		];
	
	this.prefixField = "";
	this.myField = null;
	this.fieldIndex = null;
	
	this.dom = null;
	this.videoCodec = null;

	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Init = function(dom, videoCodec) {
		this.SetDOM(dom);
		this.LicenseControl();
		
		this.SetVideoCodec(videoCodec);
		
		this.Bind();
		
		this.UpdateQualityLevelDisp();

		if(g_taskSupport != null) {
			if(g_taskSupport.GetEncodePolicy() == ENCODINGPOLICY_CUSTOM) {
				this.Active(true);
			} else {
				this.Active(false);
			}
		}
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_ENCODER_TWO_PASS) != license.ENABLED) {
			$(JS_TWO_PASS_OPTION, this.dom).remove();
		}
	};
	
	this.OnInfoChange = function() {
		if(this.videoCodec == null) return;
		this.videoCodec.OnInfoChange();
	};
	
	this.Active = function(bActive) {
		bActive = true;
		if(this.dom == null) return;
		var codec = this.videoCodec.GetCodecType();
		
		var $twopass = $(JS_TWO_PASS, this.dom);
		if(codec == VIDEO_CODEC_H264) {
			if(bActive) {
				if($twopass.length > 0) {
					$twopass.get(0).disabled = false;
				}
				$(JS_DEVICE_ID, this.dom).get(0).disabled = false;
				$(JS_QUALITY_LEVEL, this.dom).get(0).disabled = false;
				$(JS_QUALITY_LEVEL_DISP, this.dom).get(0).disabled = false;
			} else {
				if($twopass.length > 0) {
					$twopass.get(0).disabled = true;
				}
				$(JS_DEVICE_ID, this.dom).get(0).disabled = true;
				$(JS_QUALITY_LEVEL, this.dom).get(0).disabled = true;
				$(JS_QUALITY_LEVEL_DISP, this.dom).get(0).disabled = true;
			}
		}
	};
	
	this.ShowDot = function(bShow) {
		if(bShow) {
			$(this.dom).addClass("dotBorder");
		}
		else {
			$(this.dom).removeClass("dotBorder");
		}
	};
	
	this.ShowTwoPass = function(bShow) {
		if(!bShow) {
			$(JS_TWO_PASS_OPTION, this.dom).remove();
		}
	};
	
	this.SetComment = function(comment) {
		$(JS_ENCODING_POLICY_COMMENT, this.dom).text(comment);
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		var context = this;
		
		var ql = policyData.getQualityLevel(this.videoCodec.GetCodecType());
		uUpdateSelect($(JS_QUALITY_LEVEL_DISP, this.dom).get(0), ql);
		
		$(JS_QUALITY_LEVEL_DISP, this.dom).change(function() {
			context.SyncData();
			context.videoCodec.onQualityLevelChange(this.value);
		});
		
		this.BindInfoChanger();
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
	
	this.SetVideoCodec = function(videoCodec) {
		this.videoCodec = videoCodec;
		
		var codec = this.videoCodec.GetCodecType();
		if(codec == VIDEO_CODEC_MPEG2
				|| codec == VIDEO_CODEC_DNXHD
				|| codec == VIDEO_CODEC_PRORES) {
			this.ShowDot(false);
			this.ShowTwoPass(false);
			this.SetComment("");
		}
		else if(codec == VIDEO_CODEC_H265) {
			this.ShowDot(false);
			this.SetComment("");
		}
		else if(codec == VIDEO_CODEC_H264) {
			this.ShowDot(false);
			this.SetComment("");
		}
	};
	
	this.RequestEncoderPolicy = function(encoding) {
		var context = this;
		var frameRate = -1;
		var followSource = this.videoCodec.GetValueByJS(JS_VIDEO_FRAMERATE);
		if(followSource == VIDEO_FOLLOW_SOURCE) {
			frameRate = -1;
		} else {
			var frx = this.videoCodec.GetValueByJS(JS_VIDEO_FRAMERATE_X);
			var fry = this.videoCodec.GetValueByJS(JS_VIDEO_FRAMERATE_Y);
			frameRate = parseInt(frx * 100 / fry);
		}
		
		var encoderPolicyBean = {
		"encoderPolicyBean.codecType" : this.videoCodec.GetValueByJS(JS_VIDEO_CODEC),
		"encoderPolicyBean.encoding" : encoding,
		"encoderPolicyBean.width" : this.videoCodec.GetValueByJS(JS_VIDEO_WIDTH),
		"encoderPolicyBean.height" : this.videoCodec.GetValueByJS(JS_VIDEO_HEIGHT),
		"encoderPolicyBean.frameRate" : frameRate,
		"encoderPolicyBean.rc" : this.videoCodec.GetValueByJS(JS_VIDEO_RATE_CONTROL),
		"encoderPolicyBean.bitrate" : this.videoCodec.GetValueByJS(JS_VIDEO_BITRATE),
		"encoderPolicyBean.interlace" : this.videoCodec.GetValueByJS(JS_VIDEO_INTERLACE)
		};
		
		var url = "getEncoderPolicy";
		$.post(url, encoderPolicyBean, function(data) {
			context.ParseXml(data);
		}, "xml");
	};
	
	this.ParseXml = function(xml) {
		var $data = $(xml);
		var twoPass = $("TwoPass", $data).text();
		var deviceId = $("DeviceID", $data).text();
		var qualityLevel = $("QualityLevel", $data).text();
		
		if(twoPass == "null" || deviceId == "null") return;
		
		var domTwoPass = $(JS_TWO_PASS, this.dom).get(0);
		var oldTwoPass = domTwoPass.checked;
		if(twoPass == "1") {
			domTwoPass.checked = true;
		} else {
			domTwoPass.checked = false;
		}
		if(oldTwoPass != domTwoPass.checked) {
			$(domTwoPass).change();
		}
		
		var $QualityLevelDisp = $(JS_QUALITY_LEVEL_DISP, this.dom);
		var oldValue = $QualityLevelDisp.val();
		var ql = 0;
		if(deviceId != "0") {
			ql = QUALITY_LEVEL_HARD;
		} else {
			ql = qualityLevel;
		}
		$QualityLevelDisp.val(ql);
		if(oldValue != $QualityLevelDisp.val()) {
			$QualityLevelDisp.change();
		}
	};
	
	this.UpdateQualityLevelDisp = function() {
		var deviceId = $(JS_DEVICE_ID, this.dom).val();
		var qualityLevel = $(JS_QUALITY_LEVEL, this.dom).val();
		var $qlDisp = $(JS_QUALITY_LEVEL_DISP, this.dom);
		if(deviceId == DEVICE_ID_CPU) {
			$qlDisp.val(qualityLevel);
		} else {
			$qlDisp.val(QUALITY_LEVEL_HARD);
		}
	};
	
	this.CalcDeviceId = function() {
		var value = $(JS_QUALITY_LEVEL_DISP, this.dom).val();
		if(value == QUALITY_LEVEL_HARD) {
			return DEVICE_ID_HARDWARE;
		} else {
			return DEVICE_ID_CPU;
		}
	};
	
	this.CalcQualityLevel = function() {
		var value = $(JS_QUALITY_LEVEL_DISP, this.dom).val();
		return value;
	};
	
	this.SyncData = function() {
		var deviceId = this.CalcDeviceId();
		var qualityLevel = this.CalcQualityLevel();
		
		$(JS_DEVICE_ID, this.dom).val(deviceId);
		$(JS_QUALITY_LEVEL, this.dom).val(qualityLevel);
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
		
		this.SyncData();
		
		var value = "";
		for(var i = 0; i < tagMap.length; i++) {
			value = this.GetValueByJS(tagMap[i].value);
			if(value != null) {
				xml.Node(tagMap[i].key, value);
			}
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
		
		this.SyncData();
		
		var len = fieldMap.length;
		var fullField = this.GetFullField();
		for(var i = 0; i < len; i++) {
			var $sel = $(fieldMap[i].value, this.dom);
			var elName = fullField + fieldMap[i].key;
			$sel.attr("name", elName);
		};
	};
	
	this.UpdateSubElement = function() {
	};
	/* Field operate end */
}

EncodingPolicy.prototype = {
	getQualityLevel: function() {
		return $(JS_QUALITY_LEVEL_DISP, this.dom).val();
	}
}