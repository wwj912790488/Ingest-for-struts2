var JS_TSAO_SERVER_NAME = "input[name='TsaoServerName']";
var JS_TSAO_SERVER_PROVIDER = "input[name='TsaoServerProvider']";
var JS_TSAO_SERVICE_ID = "input[name='TsaoServiceID']";
var JS_TSAO_TOTAL_BITRATE = "input[name='TsaoTotalBitrate']";
var JS_TSAO_PMT_PID = "input[name='TsaoPmtPID']";
var JS_TSAO_VIDEO_PID = "input[name='TsaoVideoPID']";
var JS_TSAO_AUDIO_PID = "input[name='TsaoAudioPID']";
var JS_TSAO_PCR_PID = "input[name='TsaoPcrPID']";
var JS_TSAO_INSERT_TOT_TDT = "input[name='TsaoInsertTotTdt']";
var JS_TSAO_PERIOD_TOT_TDT = "input[name='TsaoPeriodTotTdt']";
var JS_TSAO_PCR_PERIOD = "input[name='TsaoPcrPeriod']";
var JS_TSAO_PAT_PERIOD = "input[name='TsaoPatPeriod']";
var JS_TSAO_SDT_PERIOD = "input[name='TsaoSdtPeriod']";
var JS_TSAO_ORIGINAL_NETWORK_ID = "input[name='TsaoOriginalNetworkId']";
var JS_TSAO_TRANSPORT_STREAM_ID = "input[name='TsaoTransportStreamId']";
var JS_TSAO_PRIVATE_METADATA_PID = "input[name='TsaoPrivateMetadataPid']";
var JS_TSAO_PRIVATE_METADATA_TYPE = "input[name='TsaoPrivateMetadataType']";
var JS_TSAO_BIT_RATE_MODE = "select[name='TsaoBitRateMode']";
var JS_TSAO_VIDEO_DELAY = "input[name='TsaoVideoDelay']";
var JS_TSAO_CUT_AUDIO = "input[name='TsaoCutAudio']";
var JS_TSAO_AUDIO_MERGE_FRAME = "input[name='TsaoAudioMergeFrame']";
var JS_AUDIO_PROCESS_MODE = "select[name='AudioProcessMode']";

var TAG_TSAO = "tssetting";
var TAG_TSAO_SERVER_NAME = "servername";
var TAG_TSAO_SERVER_PROVIDER = "serviceprovider";
var TAG_TSAO_SERVICE_ID = "serviceid";
var TAG_TSAO_TOTAL_BITRATE = "totalbitrate";
var TAG_TSAO_PMT_PID = "pmtpid";
var TAG_TSAO_VIDEO_PID = "videopid";
var TAG_TSAO_AUDIO_PID = "audiopid";
var TAG_TSAO_PCR_PID = "pcrpid";
var TAG_TSAO_INSERT_TOT_TDT = "inserttottdt";
var TAG_TSAO_PERIOD_TOT_TDT = "periodtottdt";
var TAG_TSAO_PCR_PERIOD = "pcrperiod";
var TAG_TSAO_PAT_PERIOD = "patperiod";
var TAG_TSAO_SDT_PERIOD = "sdtperiod";
var TAG_TSAO_BIT_RATE_MODE = "bitratemode";
var TAG_TSAO_VIDEO_DELAY = "videodelay";
var TAG_TSAO_CUT_AUDIO = "cutaudio";
var TAG_TSAO_AUDIO_MERGE_FRAME = "audiomergeframe";
var TAG_TSAO_ORIGINAL_NETWORK_ID = "originalnetworkid";
var TAG_TSAO_TRANSPORT_STREAM_ID = "transportstreamid";
var TAG_TSAO_PRIVATE_METADATA_PID = "privatemetadatapid";
var TAG_TSAO_PRIVATE_METADATA_TYPE = "privatemetadatatype";
var TAG_AUDIO_PROCESS_MODE = "audioprocessmode";

var FIELD_CONTAINER_SETTING = "containerSetting";
var FIELD_TSAO_SERVER_NAME = "serverName";
var FIELD_TSAO_SERVER_PROVIDER = "serviceProvider";
var FIELD_TSAO_SERVICE_ID = "serviceId";
var FIELD_TSAO_TOTAL_BITRATE = "totalBitrate";
var FIELD_TSAO_PMT_PID = "pmtPid";
var FIELD_TSAO_VIDEO_PID = "videoPid";
var FIELD_TSAO_AUDIO_PID = "audioPid";
var FIELD_TSAO_PCR_PID = "pcrPid";
var FIELD_TSAO_INSERT_TOT_TDT = "insertTotTdt";
var FIELD_TSAO_PERIOD_TOT_TDT = "periodTotTdt";
var FIELD_TSAO_PCR_PERIOD = "pcrPeriod";
var FIELD_TSAO_PAT_PERIOD = "patPeriod";
var FIELD_TSAO_SDT_PERIOD = "sdtPeriod";
var FIELD_TSAO_BIT_RATE_MODE = "bitRateMode";
var FIELD_TSAO_VIDEO_DELAY = "videoDelay";
var FIELD_TSAO_CUT_AUDIO = "cutAudio";
var FIELD_TSAO_AUDIO_MERGE_FRAME = "audioMergeFrame"
var FIELD_TSAO_ORIGINAL_NETWORK_ID = "originalNetworkId";
var FIELD_TSAO_TRANSPORT_STREAM_ID = "transportStreamId";
var FIELD_TSAO_PRIVATE_METADATA_PID = "privateMetadataPid";
var FIELD_TSAO_PRIVATE_METADATA_TYPE = "privateMetadataType";
var FIELD_AUDIO_PROCESS_MODE = "audioProcessMode";

tsAdvancedOptionData = {};
tsAdvancedOptionData.bitRateMode = [
	{key: "-1", value: "AUTO"},
	{key: "0", value: "CBR"},
	{key: "1", value: "VBR"},
	{key: "2", value: "ABR"},
	{key: "3", value: "CBR+"}
	];

tsAdvancedOptionData.getBitRateMode = function() {
	return tsAdvancedOptionData.bitRateMode;
};

function TSAdvancedOptions() {
	
	/*static var*/
	var tagMap = [
		{key: TAG_TSAO_SERVER_NAME, value: JS_TSAO_SERVER_NAME},
		{key: TAG_TSAO_SERVER_PROVIDER, value: JS_TSAO_SERVER_PROVIDER},
		{key: TAG_TSAO_SERVICE_ID, value: JS_TSAO_SERVICE_ID},
		{key: TAG_TSAO_TOTAL_BITRATE, value: JS_TSAO_TOTAL_BITRATE},
		{key: TAG_TSAO_BIT_RATE_MODE, value: JS_TSAO_BIT_RATE_MODE},		
		{key: TAG_TSAO_VIDEO_DELAY, value: JS_TSAO_VIDEO_DELAY},		
		{key: TAG_TSAO_CUT_AUDIO, value: JS_TSAO_CUT_AUDIO},
		{key: TAG_TSAO_AUDIO_MERGE_FRAME, value: JS_TSAO_AUDIO_MERGE_FRAME},		
		{key: TAG_TSAO_PMT_PID, value: JS_TSAO_PMT_PID},
		{key: TAG_TSAO_VIDEO_PID, value: JS_TSAO_VIDEO_PID},
		{key: TAG_TSAO_AUDIO_PID, value: JS_TSAO_AUDIO_PID},
		{key: TAG_TSAO_PCR_PID, value: JS_TSAO_PCR_PID},
		{key: TAG_TSAO_INSERT_TOT_TDT, value: JS_TSAO_INSERT_TOT_TDT},
		{key: TAG_TSAO_PERIOD_TOT_TDT, value: JS_TSAO_PERIOD_TOT_TDT},
		{key: TAG_TSAO_PCR_PERIOD, value: JS_TSAO_PCR_PERIOD},
		{key: TAG_TSAO_PAT_PERIOD, value: JS_TSAO_PAT_PERIOD},
		{key: TAG_TSAO_SDT_PERIOD, value: JS_TSAO_SDT_PERIOD},
		{key: TAG_TSAO_ORIGINAL_NETWORK_ID, value: JS_TSAO_ORIGINAL_NETWORK_ID},
		{key: TAG_TSAO_TRANSPORT_STREAM_ID, value: JS_TSAO_TRANSPORT_STREAM_ID},
		{key: TAG_TSAO_PRIVATE_METADATA_PID, value: JS_TSAO_PRIVATE_METADATA_PID},
		{key: TAG_TSAO_PRIVATE_METADATA_TYPE, value: JS_TSAO_PRIVATE_METADATA_TYPE},
		{key: TAG_AUDIO_PROCESS_MODE, value: JS_AUDIO_PROCESS_MODE}
		];
	
	var fieldMap = [
        {key: FIELD_AUDIO_PROCESS_MODE, value: JS_AUDIO_PROCESS_MODE},
		{key: FIELD_TSAO_SERVER_NAME, value: JS_TSAO_SERVER_NAME},
		{key: FIELD_TSAO_SERVER_PROVIDER, value: JS_TSAO_SERVER_PROVIDER},
		{key: FIELD_TSAO_SERVICE_ID, value: JS_TSAO_SERVICE_ID},
		{key: FIELD_TSAO_TOTAL_BITRATE, value: JS_TSAO_TOTAL_BITRATE},
		{key: FIELD_TSAO_BIT_RATE_MODE, value: JS_TSAO_BIT_RATE_MODE},		
		{key: FIELD_TSAO_VIDEO_DELAY, value: JS_TSAO_VIDEO_DELAY},		
		{key: FIELD_TSAO_CUT_AUDIO, value: JS_TSAO_CUT_AUDIO},
		{key: FIELD_TSAO_AUDIO_MERGE_FRAME, value: JS_TSAO_AUDIO_MERGE_FRAME},		
		{key: FIELD_TSAO_PMT_PID, value: JS_TSAO_PMT_PID},
		{key: FIELD_TSAO_VIDEO_PID, value: JS_TSAO_VIDEO_PID},
		{key: FIELD_TSAO_AUDIO_PID, value: JS_TSAO_AUDIO_PID},
		{key: FIELD_TSAO_PCR_PID, value: JS_TSAO_PCR_PID},
		{key: FIELD_TSAO_INSERT_TOT_TDT, value: JS_TSAO_INSERT_TOT_TDT},
		{key: FIELD_TSAO_PERIOD_TOT_TDT, value: JS_TSAO_PERIOD_TOT_TDT},
		{key: FIELD_TSAO_PCR_PERIOD, value: JS_TSAO_PCR_PERIOD},
		{key: FIELD_TSAO_PAT_PERIOD, value: JS_TSAO_PAT_PERIOD},
		{key: FIELD_TSAO_SDT_PERIOD, value: JS_TSAO_SDT_PERIOD},
		{key: FIELD_TSAO_ORIGINAL_NETWORK_ID, value: JS_TSAO_ORIGINAL_NETWORK_ID},
		{key: FIELD_TSAO_TRANSPORT_STREAM_ID, value: JS_TSAO_TRANSPORT_STREAM_ID},
		{key: FIELD_TSAO_PRIVATE_METADATA_PID, value: JS_TSAO_PRIVATE_METADATA_PID},
		{key: FIELD_TSAO_PRIVATE_METADATA_TYPE, value: JS_TSAO_PRIVATE_METADATA_TYPE}
		];
	
	var validatorMap = [
		{selector: JS_TSAO_SERVICE_ID, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 100000, recommend: ""} },
		{selector: JS_TSAO_TOTAL_BITRATE, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 1000000, recommend: ""} },
		{selector: JS_TSAO_PMT_PID, type: VALIDATOR_TYPE_INTEGER, param: {min: 16, max: 61438, recommend: ""} },
		{selector: JS_TSAO_VIDEO_PID, type: VALIDATOR_TYPE_INTEGER, param: {min: 16, max: 61438, recommend: ""} },
		//{selector: JS_TSAO_AUDIO_PID, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 8190, recommend: ""} },
		{selector: JS_TSAO_PCR_PID, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 8190, recommend: ""} },
		{selector: JS_TSAO_PERIOD_TOT_TDT, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: MAX_INTEGER, recommend: ""} },
		{selector: JS_TSAO_PCR_PERIOD, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: MAX_INTEGER, recommend: ""} },
		{selector: JS_TSAO_PAT_PERIOD, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: MAX_INTEGER, recommend: ""} },
		{selector: JS_TSAO_SDT_PERIOD, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: MAX_INTEGER, recommend: ""} },
		{selector: JS_TSAO_ORIGINAL_NETWORK_ID, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: MAX_INTEGER, recommend: ""} },
		{selector: JS_TSAO_TRANSPORT_STREAM_ID, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: MAX_INTEGER, recommend: ""} },
		{selector: JS_TSAO_PRIVATE_METADATA_PID, type: VALIDATOR_TYPE_INTEGER, param: {min: 1, max: 8190, recommend: ""} },
		{selector: JS_TSAO_PRIVATE_METADATA_TYPE, type: VALIDATOR_TYPE_INTEGER, param: {min: 128, max: 255, recommend: ""} }
		];
	
	this.dom = null;
	this.myTag = TAG_TSAO;
	
	this.prefixField = "";
	this.myField = FIELD_CONTAINER_SETTING;
	this.fieldIndex = null;
	this.parent = null;

	this.Init = function(dom) {
		if(this.dom == dom) return;
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		
		this.UpdatePeriodTotTdt();
		this.updateTotalBitrate();	
		//this.updateVideoDelay();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.TS_MUXER_ADVANCE_OPTION) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
	
	this.Delete = function() {
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		
		var context = this;
		$(JS_TSAO_INSERT_TOT_TDT, this.dom).change(function() {
			context.UpdatePeriodTotTdt();			
		});
		
		$(JS_TSAO_BIT_RATE_MODE, this.dom).change(function() {
			context.updateTotalBitrate();
			//context.updateVideoDelay();
		})
		
		var arr = tsAdvancedOptionData.getBitRateMode();
		uUpdateSelect($(JS_TSAO_BIT_RATE_MODE, this.dom).get(0), arr);
		
		/*$(".ExpandTrigger", this.dom).click(function() {
			var target = $(".ExpandTarget", context.dom);
			var icon = $(".ExpandIcon", context.dom);
			if(target.hasClass("Hide")) {
				target.removeClass("Hide");
				icon.removeClass("ICON_ArrowRight").addClass("ICON_ArrowDown");
			}
			else {
				target.addClass("Hide");
				icon.removeClass("ICON_ArrowDown").addClass("ICON_ArrowRight");
			}
		});*/
		
		$(JS_TSAO_TOTAL_BITRATE, this.dom).change(function() {
			context.validateTotalBitrate();
		});
		
		$(JS_TSAO_AUDIO_PID, this.dom).change(function() {
			context.validateAudioPid();
		})
		
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.GetValueByJS = function(jsSelector) {
		if(this.dom == null) return;
		var value = null;
		var $sel = $(jsSelector, this.dom);
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
		
		if(value != null && value.length == 0) {
			if(jsSelector == JS_TSAO_PERIOD_TOT_TDT
				|| jsSelector == JS_TSAO_PCR_PERIOD
				|| jsSelector == JS_TSAO_PAT_PERIOD
				|| jsSelector == JS_TSAO_SDT_PERIOD
				|| jsSelector == JS_TSAO_ORIGINAL_NETWORK_ID
				|| jsSelector == JS_TSAO_TRANSPORT_STREAM_ID) {
				value = null;
			}
		}
		
		return value;
	};

	this.UpdatePeriodTotTdt = function() {
		var $insert = $(JS_TSAO_INSERT_TOT_TDT, this.dom);
		var $period = $(JS_TSAO_PERIOD_TOT_TDT, this.dom);
		if($insert.length > 0 && $period.length > 0) {
			if($insert.get(0).checked) {
				$period.get(0).disabled = false;
			}
			else {
				$period.val("");
				$period.get(0).disabled = true;
			}
		}
	};
	
	this.Show = function() {
		if(this.dom == null) return;
		var $dom =$(this.dom);
		$dom.show();
		$dom.find(JS_CONTAINER_SETTING).get(0).disabled = false;
	};
	
	this.Hide = function() {
		if(this.dom == null) return;
		var $dom =$(this.dom);
		$dom.hide();
		$dom.find(JS_CONTAINER_SETTING).get(0).disabled = true;
	};
	
	this.SetContainer = function(container) {
		$(this.dom).find(JS_CONTAINER_SETTING).val(container);
	};
	
	/* xml generator */
	this.XML = function(xml) {
		if(this.dom == null) return;
		xml.BeginNode(this.myTag);
		var len = tagMap.length;
		var value = "";
		for(var i = 0; i < len; i++) {
			value = this.GetValueByJS(tagMap[i].value);
			if(value == null) continue;
			if(value.length == 0) continue;
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
		var domSetting = $(JS_CONTAINER_SETTING, this.dom).get(0); 
		if(domSetting.disabled) return;
		
		setSelect($(JS_TSAO_BIT_RATE_MODE, this.dom).get(0), null, false);
		
		var $my = $(JS_CONTAINER_SETTING, this.dom);
		var myName = this.prefixField + this.myField;
		$my.attr("name", myName);
		
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

TSAdvancedOptions.prototype = {
	setTotalBitrate : function(bitrate) {
		if(this.dom == null) return;
		$(JS_TSAO_TOTAL_BITRATE, this.dom).val(bitrate);
	},
	
	setParent : function(parent) {
		this.parent = parent;
	},
	
	validateTotalBitrate : function() {
		var calcTotalBitrate = this.parent.getTotalBitrate();
		var myTotalBitrate = parseInt($(JS_TSAO_TOTAL_BITRATE, this.dom).val());
		if(!isNaN(myTotalBitrate)) {
			if(myTotalBitrate < calcTotalBitrate) {
				alert(str_warning.ts_total_bitrate_overflow);
			}
		}
	},
	
	updateTotalBitrate : function() {
		var bitRateMode = $(JS_TSAO_BIT_RATE_MODE, this.dom).val();
		var totalBitrate = $(JS_TSAO_TOTAL_BITRATE, this.dom).get(0);
		if(totalBitrate != null) {
			if(bitRateMode == "-1" || bitRateMode == "2") {
				totalBitrate.disabled = true;
				totalBitrate.value = "";
			}
			else {
				totalBitrate.disabled = false;
				
				if(this.parent != null) {
					this.parent.onTotalBitrateChange();
				}
			}
		}
	},
	
	
	updateVideoDelay : function() {
		var bitRateMode = $(JS_TSAO_BIT_RATE_MODE, this.dom).val();
		if(bitRateMode == "3")  //CBR+ mode
			$(".VideoDelayItem", this.dom).show();
		else
			$(".VideoDelayItem", this.dom).hide();			
	},
	
	updateByContainer : function(container) {
		if(container == CONTAINER_HLS) {
			$(".TsBlock", this.dom).hide();
			
			$(JS_TSAO_BIT_RATE_MODE, this.dom).val("2");
			$(JS_TSAO_BIT_RATE_MODE, this.dom).get(0).disabled = true;
			
			$(".TotalBitRateItem", this.dom).hide();
		}
		else {
			$(".TsBlock", this.dom).show();

			$(JS_TSAO_BIT_RATE_MODE, this.dom).get(0).disabled = false;
			
			$(".TotalBitRateItem", this.dom).show();
		}
		this.updateAudioProcessMode(container);
	},
	
	showExpand: function(bShow) {
		if(bShow) {
			$(".ExpandTarget", this.dom).removeClass("Hide");
		}
		else {
			$(".ExpandTarget", this.dom).addClass("Hide");
		}
	},
	
	validateAudioPid: function() {
		var $audioPid = $(JS_TSAO_AUDIO_PID, this.dom);
		var audios = $audioPid.val();
		var audioArray = audios.split(",");
		var bMin = true;
		var bMax = true;
		var bNaN = false;
		var min = 16;
		var max = 61438;
		var recommand = "";
		
		for(var i = 0; i < audioArray.length; i++) {
			var audio = parseInt(audioArray[i]);
			if(isNaN(audio)) {
				bNaN = true;
				break;
			}
			if(audio < min) {
				bMin = false;
				break;
			}
			if(audio > max) {
				bMax = false;
				break;
			}
			
			if(i > 0) {
				recommand += ",";
			}
			recommand += new String(audioArray[i]);
		}
		
		if(bNaN) {
			alert(str_warning.needInteger);
			$audioPid.val(recommand);
		}
		
		if(!bMin) {
			var outStr = str_warning.outOfMinRange.format(min);
			alert(outStr);
			$audioPid.val(recommand);
		}
		
		if(!bMax) {
			var outStr = str_warning.outOfMaxRange.format(max);
			alert(outStr);
			$audioPid.val(recommand);
		}
	},
	
	updateAudioProcessMode:function(container){		
		var $audioMode = $(JS_AUDIO_PROCESS_MODE, this.dom);
		var arr = outputGroupData.getAudioProcessMode(container);
		uUpdateSelect($audioMode[0], arr);
		
	},
}
