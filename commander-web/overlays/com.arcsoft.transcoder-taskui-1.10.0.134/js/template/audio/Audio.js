var MAX_JOINED_COUNT = 8;

var JS_DELETE_AUDIO_TRIGGER =".DeleteAudioTrigger";
var JS_AUDIO_INDEX =".AudioIndex";
var JS_AUDIO_EXPAND_TRIGGER = ".AudioExpandTrigger";
var JS_AUDIO_EXPAND_TARGET = ".AudioExpandTarget";
var JS_AUDIO_EXPAND_ICON = ".AudioExpandIcon";
var JS_AUDIO_DESCRIPTION_TEMPLATE ="#TemplateLib .AudioDescription";
var JS_AUDIO_AAC_TEMPLATE ="#TemplateLib #AudioAAC";
var JS_AUDIO_AMR_TEMPLATE ="#TemplateLib #AudioAMR";
var JS_AUDIO_MP2_TEMPLATE ="#TemplateLib #AudioMP2";
var JS_AUDIO_MP3_TEMPLATE ="#TemplateLib #AudioMP3";
var JS_AUDIO_AC3_TEMPLATE ="#TemplateLib #AudioAC3";
var JS_AUDIO_DTS_TEMPLATE ="#TemplateLib #AudioDTS";
var JS_AUDIO_VORBIS_TEMPLATE ="#TemplateLib #AudioVorbis";
var JS_AUDIO_PCM_TEMPLATE ="#TemplateLib #AudioPCM";
var JS_AUDIO_DDPLUS_TEMPLATE ="#TemplateLib #AudioDDPlus";
var JS_AUDIO_WMA_TEMPLATE ="#TemplateLib #AudioWMA";
var JS_AUDIO_PASSTHROUGH_TEMPLATE ="#TemplateLib #AudioPassThrough";
var JS_AUDIO_PASS_THROUGH_CONTAINER = ".AudioPassThroughContainer";
var JS_ADD_JOINED_TRIGGER = ".AddJoinedTrigger";
var JS_CLEAR_JOINED_TRIGGER = ".ClearJoinedTrigger";

var JS_LICENSE_AUDIO_BOOST =".LicenseAudioBoost";
var JS_LICENSE_AUDIO_BALANCE =".LicenseAudioBalance";
var JS_LICENSE_CHANNEL_PROCESSING =".LicenseChannelProcessing";
var JS_LICENSE_AUDIO_PASS_THROUGH = ".LicenseAudioPassThrough";
var JS_LICENSE_AUDIO_CODEC_ID = ".LicenseAudioCodecId";
var JS_LICENSE_AUDIO_DENOISE = ".LicenseAudioDenoise";
var JS_LICENSE_AUDIO_JOINED_REF = ".LicenseAudioJoinedRef";
var JS_LICENSE_FILL_ON_AUDIO_LOST = ".LicenseFillOnAudioLost";

var JS_AUDIO_SETTING ="input[name='AudioSetting']";
var JS_AUDIO_CODEC ="select[name='AudioCodec']";
var JS_AUDIO_PASS_THROUGH ="input[name='AudioPassThrough']";
var JS_AUDIO_CHANNEL ="select[name='AudioChannel']";
var JS_AUDIO_CHANNEL_PROCESSING ="select[name='AudioChannelProcessing']";
var JS_AUDIO_CODEC_ID ="input[name='AudioCodecId']";
var JS_AUDIO_PLAY_RATE ="input[name='AudioPlayRate']";
var JS_AUDIO_BITS_PER_SAMPLE = "select[name='AudioBitsPerSample']";
var JS_AUDIO_BITRATE ="select[name='AudioBitrate']";
var JS_AUDIO_BITRATE_BPS ="input[name='AudioBitrateBps']";
var JS_AUDIO_BITRATE_KBPS ="input[name='AudioBitrateKbps']";
var JS_AUDIO_SAMPLERATE ="select[name='AudioSampleRate']";
var JS_AUDIO_CODEC_PROFILE ="select[name='AudioCodecProfile']";
var JS_AUDIO_PACKAGE_MODE ="select[name='AudioPackageMode']";
var JS_AUDIO_BOOST_LEVEL ="select[name='AudioBoostLevel']";
var JS_AUDIO_VOLUME_MODE ="select[name='AudioVolumeMode']";
var JS_AUDIO_BALANCE_LEVEL ="select[name='AudioBalanceLevel']";
var JS_AUDIO_BALANCE_DB ="input[name='AudioBalanceDb']";
var JS_AUDIO_JOINED_REF = "input[name='AudioJoinedRef']";
var JS_AUDIO_JOINED_REF_DISP = "input[name='AudioJoinedRefDisp']";
var JS_AUDIO_FILL_ON_AUDIO_LOST ="input[name='FillOnAudioLost']";
var JS_AUDIO_DENOISE ="input[name='AudioDenoise']";
var JS_AUDIO_ENCODING_MODE ="select[name='AudioEncodingMode']";

var TAG_AUDIO_AAC ="aac";
var TAG_AUDIO_AMR ="amr";
var TAG_AUDIO_MP2 ="mp2";
var TAG_AUDIO_MP3 ="mp3";
var TAG_AUDIO_DDPLUS ="ddp";
var TAG_AUDIO_AC3 ="ac3";
var TAG_AUDIO_DTS ="dts";
var TAG_AUDIO_VORBIS ="vorbis";
var TAG_AUDIO_PCM ="pcm";
var TAG_AUDIO_WMA ="wma";
var TAG_AUDIO_CHANNEL ="channel";
var TAG_AUDIO_CHANNEL_PROCESSING ="channelprocessing";
var TAG_AUDIO_JOINED_REF ="joinedref";
var TAG_AUDIO_BITS_PER_SAMPLE = "bitspersample";
var TAG_AUDIO_BITRATE ="bitrate";
var TAG_AUDIO_SAMPLERATE ="samplerate";
var TAG_AUDIO_CODEC_PROFILE ="profile";
var TAG_AUDIO_PACKAGE_MODE ="packagemode";
var TAG_AUDIO_BOOST_LEVEL ="boostlevel";
var TAG_AUDIO_VOLUME_MODE ="volumemode";
var TAG_AUDIO_BALANCE_LEVEL ="balancelevel";
var TAG_AUDIO_BALANCE_DB ="balancedb";
var TAG_AUDIO_PASS_THROUGH = "audiopassthrough";
var TAG_AUDIO_CODEC_ID = "audiocodecid";
var TAG_AUDIO_PLAY_RATE = "audioplayrate";
var TAG_AUDIO_FILL_ON_AUDIO_LOST = "fillonlost";
var TAG_AUDIO_DENOISE = "denoise";
var TAG_AUDIO_ENCODING_MODE = "encodingmode";

var FIELD_AUDIO ="audioDescriptions";
var FIELD_AUDIO_CODEC ="settingsType";
var FIELD_AUDIO_JOINED_REF ="candidateLocationId";
var FIELD_AUDIO_PASS_THROUGH = "passthrough";
var FIELD_AUDIO_SETTING ="audioSetting";
var FIELD_AUDIO_CHANNEL ="audioSetting.channels";
var FIELD_AUDIO_CHANNEL_PROCESSING ="audioSetting.channelProcessing";
var FIELD_AUDIO_BITRATE ="audioSetting.bitrate";
var FIELD_AUDIO_SAMPLERATE ="audioSetting.sampleRate";
var FIELD_AUDIO_CODEC_PROFILE ="audioSetting.codecProfile";
var FIELD_AUDIO_PACKAGE_MODE ="audioSetting.packageMode";
var FIELD_AUDIO_BITS_PER_SAMPLE ="audioSetting.bitsPerSample";
var FIELD_AUDIO_BOOST_LEVEL ="audioSetting.boostLevel";
var FIELD_AUDIO_VOLUME_MODE ="audioSetting.volumeMode";
var FIELD_AUDIO_BALANCE_DB ="audioSetting.balanceDb";
var FIELD_AUDIO_BALANCE_LEVEL ="audioSetting.balanceLevel";
var FIELD_AUDIO_CODEC_ID ="audioCodecId";
var FIELD_AUDIO_PLAY_RATE ="audioPlayRate";
var FIELD_AUDIO_FILL_ON_AUDIO_LOST = "audioSetting.fillOnAudioLost";
var FIELD_AUDIO_DENOISE = "audioSetting.denoise";
var FIELD_AUDIO_ENCODING_MODE = "audioSetting.encodingMode";
	
function AudioSupport() {
	
	var codecTagMap = [
		{key: AUDIO_CODEC_AAC, value: TAG_AUDIO_AAC},
		{key: AUDIO_CODEC_AMR, value: TAG_AUDIO_AMR},
		{key: AUDIO_CODEC_MP2, value: TAG_AUDIO_MP2},
		{key: AUDIO_CODEC_MP3, value: TAG_AUDIO_MP3},
		{key: AUDIO_CODEC_DDPLUS, value: TAG_AUDIO_DDPLUS},
		{key: AUDIO_CODEC_AC3, value: TAG_AUDIO_AC3},
		{key: AUDIO_CODEC_DTS, value: TAG_AUDIO_DTS},
		{key: AUDIO_CODEC_VORBIS, value: TAG_AUDIO_VORBIS},
		{key: AUDIO_CODEC_PCM, value: TAG_AUDIO_PCM},
		{key: AUDIO_CODEC_WMA, value: TAG_AUDIO_WMA}
		];
	
	var tagMap = [
		{key: TAG_AUDIO_CODEC_PROFILE,	value: JS_AUDIO_CODEC_PROFILE},
		{key: TAG_AUDIO_CHANNEL,		value: JS_AUDIO_CHANNEL},
		{key: TAG_AUDIO_BITRATE,		value: JS_AUDIO_BITRATE_BPS},
		{key: TAG_AUDIO_SAMPLERATE,		value: JS_AUDIO_SAMPLERATE},
		{key: TAG_AUDIO_FILL_ON_AUDIO_LOST,		value: JS_AUDIO_FILL_ON_AUDIO_LOST},
		{key: TAG_AUDIO_DENOISE,		value: JS_AUDIO_DENOISE},
		{key: TAG_AUDIO_VOLUME_MODE,	value: JS_AUDIO_VOLUME_MODE},
		{key: TAG_AUDIO_BALANCE_DB,	value: JS_AUDIO_BALANCE_DB},
		{key: TAG_AUDIO_BALANCE_LEVEL,	value: JS_AUDIO_BALANCE_LEVEL},
		{key: TAG_AUDIO_BOOST_LEVEL,	value: JS_AUDIO_BOOST_LEVEL},
		{key: TAG_AUDIO_CHANNEL_PROCESSING,	value: JS_AUDIO_CHANNEL_PROCESSING},
		{key: TAG_AUDIO_CODEC_ID,	value: JS_AUDIO_CODEC_ID},
		{key: TAG_AUDIO_PLAY_RATE,	value: JS_AUDIO_PLAY_RATE},
		{key: TAG_AUDIO_JOINED_REF,	value: JS_AUDIO_JOINED_REF}
		];
	
	
	var tagMapAAC = [	   	
  		{key: TAG_AUDIO_CODEC_PROFILE,	value: JS_AUDIO_CODEC_PROFILE},
  		{key: TAG_AUDIO_PACKAGE_MODE,	value: JS_AUDIO_PACKAGE_MODE},  		
  		{key: TAG_AUDIO_CHANNEL,		value: JS_AUDIO_CHANNEL},
  		{key: TAG_AUDIO_BITRATE,		value: JS_AUDIO_BITRATE_BPS},
  		{key: TAG_AUDIO_SAMPLERATE,		value: JS_AUDIO_SAMPLERATE},
  		{key: TAG_AUDIO_FILL_ON_AUDIO_LOST,		value: JS_AUDIO_FILL_ON_AUDIO_LOST},
  		{key: TAG_AUDIO_DENOISE,		value: JS_AUDIO_DENOISE},
  		{key: TAG_AUDIO_VOLUME_MODE,	value: JS_AUDIO_VOLUME_MODE},
  		{key: TAG_AUDIO_BALANCE_DB,	value: JS_AUDIO_BALANCE_DB},
  		{key: TAG_AUDIO_BALANCE_LEVEL,	value: JS_AUDIO_BALANCE_LEVEL},
  		{key: TAG_AUDIO_BOOST_LEVEL,	value: JS_AUDIO_BOOST_LEVEL},
  		{key: TAG_AUDIO_CHANNEL_PROCESSING,	value: JS_AUDIO_CHANNEL_PROCESSING},
  		{key: TAG_AUDIO_CODEC_ID,	value: JS_AUDIO_CODEC_ID},
  		{key: TAG_AUDIO_PLAY_RATE,	value: JS_AUDIO_PLAY_RATE},
  		{key: TAG_AUDIO_JOINED_REF,	value: JS_AUDIO_JOINED_REF}
  		];
	
	//for ac3 dd+ vorbis
	var tagMapAc3 = [	               
  		{key: TAG_AUDIO_CHANNEL,		value: JS_AUDIO_CHANNEL},
  		{key: TAG_AUDIO_BITRATE,		value: JS_AUDIO_BITRATE_BPS},
  		{key: TAG_AUDIO_SAMPLERATE,		value: JS_AUDIO_SAMPLERATE},
  		{key: TAG_AUDIO_FILL_ON_AUDIO_LOST,		value: JS_AUDIO_FILL_ON_AUDIO_LOST},
  		{key: TAG_AUDIO_DENOISE,		value: JS_AUDIO_DENOISE},
  		{key: TAG_AUDIO_VOLUME_MODE,	value: JS_AUDIO_VOLUME_MODE},
		{key: TAG_AUDIO_BALANCE_DB,	value: JS_AUDIO_BALANCE_DB},
		{key: TAG_AUDIO_BALANCE_LEVEL,	value: JS_AUDIO_BALANCE_LEVEL},
  		{key: TAG_AUDIO_BOOST_LEVEL,	value: JS_AUDIO_BOOST_LEVEL},
  		{key: TAG_AUDIO_CHANNEL_PROCESSING,	value: JS_AUDIO_CHANNEL_PROCESSING},
  		{key: TAG_AUDIO_CODEC_ID,	value: JS_AUDIO_CODEC_ID},
  		{key: TAG_AUDIO_PLAY_RATE,	value: JS_AUDIO_PLAY_RATE},
  		{key: TAG_AUDIO_JOINED_REF,	value: JS_AUDIO_JOINED_REF}
  		];
	
	//for dts
	var tagMapDts = [	          
	    {key: TAG_AUDIO_ENCODING_MODE,		value: JS_AUDIO_ENCODING_MODE},
  		{key: TAG_AUDIO_CHANNEL,		value: JS_AUDIO_CHANNEL},
  		{key: TAG_AUDIO_BITRATE,		value: JS_AUDIO_BITRATE_BPS},
  		{key: TAG_AUDIO_SAMPLERATE,		value: JS_AUDIO_SAMPLERATE},
  		{key: TAG_AUDIO_FILL_ON_AUDIO_LOST,		value: JS_AUDIO_FILL_ON_AUDIO_LOST},
  		{key: TAG_AUDIO_DENOISE,		value: JS_AUDIO_DENOISE},
  		{key: TAG_AUDIO_VOLUME_MODE,	value: JS_AUDIO_VOLUME_MODE},
		{key: TAG_AUDIO_BALANCE_DB,	value: JS_AUDIO_BALANCE_DB},
		{key: TAG_AUDIO_BALANCE_LEVEL,	value: JS_AUDIO_BALANCE_LEVEL},
  		{key: TAG_AUDIO_BOOST_LEVEL,	value: JS_AUDIO_BOOST_LEVEL},
  		{key: TAG_AUDIO_CHANNEL_PROCESSING,	value: JS_AUDIO_CHANNEL_PROCESSING},
  		{key: TAG_AUDIO_CODEC_ID,	value: JS_AUDIO_CODEC_ID},
  		{key: TAG_AUDIO_PLAY_RATE,	value: JS_AUDIO_PLAY_RATE},
  		{key: TAG_AUDIO_JOINED_REF,	value: JS_AUDIO_JOINED_REF}
  		];
	
	var tagMapPcm = [
		{key: TAG_AUDIO_CHANNEL,		value: JS_AUDIO_CHANNEL},
		{key: TAG_AUDIO_BITRATE,		value: JS_AUDIO_BITRATE_BPS},
		{key: TAG_AUDIO_SAMPLERATE,		value: JS_AUDIO_SAMPLERATE},
		{key: TAG_AUDIO_FILL_ON_AUDIO_LOST,		value: JS_AUDIO_FILL_ON_AUDIO_LOST},
		{key: TAG_AUDIO_DENOISE,		value: JS_AUDIO_DENOISE},
		{key: TAG_AUDIO_VOLUME_MODE,	value: JS_AUDIO_VOLUME_MODE},
		{key: TAG_AUDIO_BALANCE_DB,	value: JS_AUDIO_BALANCE_DB},
		{key: TAG_AUDIO_BALANCE_LEVEL,	value: JS_AUDIO_BALANCE_LEVEL},
		{key: TAG_AUDIO_BOOST_LEVEL,	value: JS_AUDIO_BOOST_LEVEL},
		{key: TAG_AUDIO_CHANNEL_PROCESSING,	value: JS_AUDIO_CHANNEL_PROCESSING},
		{key: TAG_AUDIO_CODEC_ID,	value: JS_AUDIO_CODEC_ID},
		{key: TAG_AUDIO_PLAY_RATE,	value: JS_AUDIO_PLAY_RATE},
		{key: TAG_AUDIO_JOINED_REF,	value: JS_AUDIO_JOINED_REF},
		{key: TAG_AUDIO_BITS_PER_SAMPLE,	value: JS_AUDIO_BITS_PER_SAMPLE}	//bitspersample should be last
		];
	
	var fieldMap = [
		{key: FIELD_AUDIO_CODEC,			value: JS_AUDIO_CODEC},
		{key: FIELD_AUDIO_JOINED_REF,			value: JS_AUDIO_JOINED_REF},
		{key: FIELD_AUDIO_PASS_THROUGH,			value: JS_AUDIO_PASS_THROUGH},
		{key: FIELD_AUDIO_SETTING,			value: JS_AUDIO_SETTING},
		{key: FIELD_AUDIO_CHANNEL,		value: JS_AUDIO_CHANNEL},
		{key: FIELD_AUDIO_CHANNEL_PROCESSING,		value: JS_AUDIO_CHANNEL_PROCESSING},
		{key: FIELD_AUDIO_BITRATE,		value: JS_AUDIO_BITRATE_BPS},
		{key: FIELD_AUDIO_SAMPLERATE,		value: JS_AUDIO_SAMPLERATE},
		{key: FIELD_AUDIO_FILL_ON_AUDIO_LOST,		value: JS_AUDIO_FILL_ON_AUDIO_LOST},
		{key: FIELD_AUDIO_DENOISE,		value: JS_AUDIO_DENOISE},
		{key: FIELD_AUDIO_CODEC_PROFILE,		value: JS_AUDIO_CODEC_PROFILE},		
		{key: FIELD_AUDIO_PACKAGE_MODE,		value: JS_AUDIO_PACKAGE_MODE},		
		{key: FIELD_AUDIO_ENCODING_MODE,		value: JS_AUDIO_ENCODING_MODE},		
		{key: FIELD_AUDIO_BITS_PER_SAMPLE,		value: JS_AUDIO_BITS_PER_SAMPLE},
		{key: FIELD_AUDIO_BOOST_LEVEL,		value: JS_AUDIO_BOOST_LEVEL},
		{key: FIELD_AUDIO_VOLUME_MODE,		value: JS_AUDIO_VOLUME_MODE},
		{key: FIELD_AUDIO_BALANCE_DB,		value: JS_AUDIO_BALANCE_DB},
		{key: FIELD_AUDIO_BALANCE_LEVEL,		value: JS_AUDIO_BALANCE_LEVEL},
		{key: FIELD_AUDIO_CODEC_ID,		value: JS_AUDIO_CODEC_ID},
		{key: FIELD_AUDIO_PLAY_RATE,		value: JS_AUDIO_PLAY_RATE}
		];
	
	var infoChanger = [
		JS_AUDIO_CODEC,
		JS_AUDIO_JOINED_REF,
		JS_AUDIO_PASS_THROUGH,
		JS_AUDIO_SETTING,
		JS_AUDIO_CHANNEL,
		JS_AUDIO_CHANNEL_PROCESSING,
		JS_AUDIO_BITRATE_BPS,
		JS_AUDIO_BITRATE_KBPS,
		JS_AUDIO_BITRATE,
		JS_AUDIO_SAMPLERATE,
		JS_AUDIO_FILL_ON_AUDIO_LOST,
		JS_AUDIO_DENOISE,
		JS_AUDIO_CODEC_PROFILE,
		JS_AUDIO_BOOST_LEVEL,
		JS_AUDIO_VOLUME_MODE,
		JS_AUDIO_BALANCE_DB,
		JS_AUDIO_BALANCE_LEVEL
		];
	
	var volumeModeMap = [
  		{mode:VOLUME_MODE_SOURCE, enable:[], disable:[JS_AUDIO_BOOST_LEVEL, JS_AUDIO_BALANCE_LEVEL, JS_AUDIO_BALANCE_DB]},
  		{mode:VOLUME_MODE_BOOST, enable:[JS_AUDIO_BOOST_LEVEL], disable:[JS_AUDIO_BALANCE_LEVEL, JS_AUDIO_BALANCE_DB]},
  		{mode:VOLUME_MODE_BALANCE, enable:[JS_AUDIO_BALANCE_LEVEL, JS_AUDIO_BALANCE_DB], disable:[JS_AUDIO_BOOST_LEVEL]}
  		];
	
	var validatorMap = [
		{selector: JS_AUDIO_BITRATE_KBPS, type: MODIFICATION_FLOAT, param: {min: 0, max: 999, recommend: 0} },
		{selector: JS_AUDIO_BALANCE_DB, type: MODIFICATION_INTEGER, param: {min: -70, max: 0, recommend: -30} }
		];
	
	this.dom = null;
	this.stream = null;
	this.joinedList = null;
	
	this.prefixField = "";
	this.myField = FIELD_AUDIO;
	this.fieldIndex = null;
	
	this.Create = function(domParent, container) {
		var $template = $(JS_AUDIO_DESCRIPTION_TEMPLATE);
		if($template.length == 0) return null;
		
		var $parent = $(domParent);
		var	pilot = $parent.find(JS_AUDIO_FLOCK).last();
		if(pilot.length == 0) return null;
		
		var $object = $template.clone();
		$object.show();
		pilot.append($object.get(0));
		this.dom = $object.get(0);
		
		this.Init(this.dom, container);
		
		return this.dom;
	};
	
	this.Delete = function() {
		$(this.dom).remove();
	};
	
	this.Init = function(dom, container) {
		if(container != undefined){
			this.container = container;
		}
		this.dom = dom;		
		this.LicenseControl();

		var codec1 =  this.GetCodec();
		this.UpdateCodecUI();
		var codec2 = this.GetCodec();
		if(codec1 != codec2) {
			this.ChangeCodec(codec2);
		}
		
		this.Bind();
		this.UpdateProfile();
		this.UpdatePackageMode();
		this.UpdateEncodingMode();
		this.UpdateChannels();
		this.UpdateChannelProcessing();
		this.UpdateSampleRate();
		this.UpdateBitrate();
		this.UpdateVolumeProcess();
		this.ChangeByVolumeMode();
		this.bps2Kbps();
		this.bps2Select();
		this.UpdateBitrateUI();
		this.UpdatePassThrough();
		this.UpdateBitsPerSample();
		this.UpdateJoinedRef();
		this.updateByActionType();
		this.updateIcon();
	};

	this.IsLimitedCodec = function() {
		var codec = this.GetCodec();
		var arr = audioData.getCodec();
		for(var i = 0 ; i < arr.length; i++) {
			if(codec == arr[i].key) {
				return false;
			}
		}
		return true;
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.AUDIO_VOLUME_BOOST) != license.ENABLED) {
			$(JS_LICENSE_AUDIO_BOOST, this.dom).remove();
		}
		
		if(GetLicense(license.AUDIO_VOLUME_BALANCE) != license.ENABLED) {
			$(JS_LICENSE_AUDIO_BALANCE, this.dom).remove();
		}
		
		if(GetLicense(license.AUDIO_LRCHANNEL_PROCESS) != license.ENABLED) {
			$(JS_LICENSE_CHANNEL_PROCESSING, this.dom).remove();
		}
		
		if(GetLicense(license.AUDIO_ENCODER_PASSTHROUGH) != license.ENABLED) {
			$(JS_LICENSE_AUDIO_PASS_THROUGH, this.dom).remove();
		}
		
		if(GetLicense(license.AUDIO_ENCODER_CODEC_ID) != license.ENABLED) {
			$(JS_LICENSE_AUDIO_CODEC_ID, this.dom).remove();
		}

		if(GetLicense(license.AUDIO_ENCODER_PLAY_RATE) != license.ENABLED) {
			$(".LicenseAudioPlayRate", this.dom).remove();
		}
		
		if(GetLicense(license.AUDIO_DENOISE) != license.ENABLED) {
			$(JS_LICENSE_AUDIO_DENOISE, this.dom).remove();
		}
		
		if(GetLicense(license.AUDIO_MULTIPLE_INPUT) != license.ENABLED) {
			$(JS_LICENSE_AUDIO_JOINED_REF, this.dom).remove();
		}
		
		if(GetLicense(license.AUDIO_FILL_ON_AUDIO_LOST) != license.ENABLED) {
			$(JS_LICENSE_FILL_ON_AUDIO_LOST, this.dom).remove();
		}
		
		var codecArr = audioData.getCodec();
		if(codecArr.length == 0) {
			$(JS_AUDIO_PASS_THROUGH_CONTAINER, this.dom).remove();
		}
		
		if(GetLicense(license.AUDIO_VOLUME_MODE) != license.ENABLED) {
			$(".LicenseAudioVolumeMode", this.dom).hide();
		}
		
	};
	
	this.SetStream = function(streamSupport) {
		this.stream = streamSupport;
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_AUDIO_CODEC, this.dom).change(function() {
			var codec = context.GetCodec();
			context.ChangeCodec(codec);
		});
		
		$(JS_AUDIO_CODEC_PROFILE, this.dom).change(function() {
			context.UpdateChannels();
			context.UpdateChannelProcessing();
			context.UpdateSampleRate();
			context.UpdateBitrate();			
			context.UpdatePackageMode();
			$(JS_AUDIO_BITRATE, context.dom).change();
		});
		
		$(JS_ADD_JOINED_TRIGGER, this.dom).click(function() {
			var map = context.joinedList;
			if(map == null || map.length == 0) return;

			g_LineSelector.setContent(map);
			g_LineSelector.setTitle(str_audio.add_input_audio);
			g_LineSelector.show();
			g_LineSelector.setOnSelected(function(key) {
				context.AddJoinedRef(key);
			});
		});
		
		$(JS_CLEAR_JOINED_TRIGGER, this.dom).click(function() {
			context.ClearJoinedRef();
		});
		
		$(JS_AUDIO_CHANNEL, this.dom).change(function(){
			context.UpdateChannelProcessing();
			context.UpdateBitrate();
			$(JS_AUDIO_BITRATE, context.dom).change();
		});
		
		$(JS_AUDIO_SAMPLERATE, this.dom).change(function(){
			context.UpdateBitrate();
			$(JS_AUDIO_BITRATE, context.dom).change();
		});
		
		$(JS_DELETE_AUDIO_TRIGGER, this.dom).click(function() {
			if(context.stream == null) return;
			context.stream.DeleteAudio(context);
		});
		
		$(JS_AUDIO_PASS_THROUGH, this.dom).click(function() {
			context.UpdatePassThrough();
			context.UpdateSummary();
		});
		
		$(JS_AUDIO_VOLUME_MODE, this.dom).change(function() {
			context.ChangeByVolumeMode();
		});
		
		$(JS_SUMMARY_TRIGGER, this.dom).change(function() {
			context.UpdateSummary();
		});
		
		this.BindExpand();
		
		ValidatorBindArray(this.dom, validatorMap);

		this.BindInfoChanger();
	};
	
	this.BindExpand = function() {
		var o = {};
		o.$trigger = $(JS_AUDIO_EXPAND_TRIGGER, this.dom);
		o.$icon = $(JS_AUDIO_EXPAND_ICON, this.dom);
		o.$target = $(JS_AUDIO_EXPAND_TARGET, this.dom);
		o.expand = true;
		uBindExpand(o);
	};
	
	this.bps2Kbps = function() {
		var $dom = $(this.dom);
		var value = $dom.find(JS_AUDIO_BITRATE_BPS).val();
		value = parseFloat(value) / 1000;
		if(isNaN(value)) value = 0;
		value = uFormatNumber(value, "?.???");
		$dom.find(JS_AUDIO_BITRATE_KBPS).val(value);
	};
	
	this.bps2Select = function() {
		var $dom = $(this.dom);
		var value = $dom.find(JS_AUDIO_BITRATE_BPS).val();
		$dom.find(JS_AUDIO_BITRATE).val(value);
	};
	
	this.UpdatePassThrough = function() {
		if(this.GetPassThrough()) {
			$(JS_AUDIO_PASS_THROUGH_CONTAINER, this.dom).hide();
		} else {
			$(JS_AUDIO_PASS_THROUGH_CONTAINER, this.dom).show();
		}
	};
	
	this.UpdateSummary = function() {
		var streamSupport = this.stream;
		streamSupport.UpdateSummary();
	};
	
	this.UpdateProfile = function() {
		var codec = $(JS_AUDIO_CODEC, this.dom).val();
		var arr = audioData.getProfile(codec);
		var domSelect = $(JS_AUDIO_CODEC_PROFILE, this.dom).get(0);
		if(domSelect == null) return;
		uUpdateSelect(domSelect, arr);
	};
	
	this.UpdateChannels = function() {
		var profile = $(JS_AUDIO_CODEC_PROFILE, this.dom).val();
		var srArr = audioData.getChannels(profile);
		uUpdateSelect($(JS_AUDIO_CHANNEL, this.dom).get(0), srArr);
	};
	
	this.UpdatePackageMode = function() {
		var codec = this.GetCodec();
				
		if(codec != AUDIO_CODEC_AAC) return;
			
		var profile = $(JS_AUDIO_CODEC_PROFILE, this.dom).val();
		var arr = audioData.getPackageMode(codec);
		var domSelect = $(JS_AUDIO_PACKAGE_MODE, this.dom).get(0);
		if(domSelect == null) return;
		uUpdateSelect(domSelect, arr);		
		
		if(profile == AUDIO_PROFILE_HEV1 || profile == AUDIO_PROFILE_HEV2) {
			$(".PackageModeItem", this.dom).show();
		} else {
			$(".PackageModeItem", this.dom).hide();
		}
	};
	
	this.UpdateEncodingMode = function() {
		arr = audioData.getEncodingMode();
		uUpdateSelect($(JS_AUDIO_ENCODING_MODE, this.dom).get(0), arr);
	};
	
	this.OnMediaInfoChanged = function(mediaInfo) {
		this.UpdateChannelProcessing(mediaInfo);
	};
	
	this.OnInputChanged = function(mediaInfo) {
	};
	
	this.GetInputAudioChannels = function(mediaInfo) {
		if(mediaInfo == null) {
			if(g_taskSupport == null) return null;
			var inputSupport = g_taskSupport.GetInputSupport();
			if(inputSupport == null) return null;
			mediaInfo = inputSupport.GetMediaInfo();
			if(mediaInfo == null) return null;
		}
		var channels = null;
		if(mediaInfo.audio != null) {
			channels = mediaInfo.audio.channel;
		}
		return channels;
	};
	
	this.UpdateChannelProcessing = function(mediaInfo) {
		var channels = this.GetInputAudioChannels(mediaInfo);
		if(channels == CHANNEL_2 || channels == null) {
			var channel = $(JS_AUDIO_CHANNEL, this.dom).val();
			var arr = audioData.getChannelProcessing(channel);
			var domSelect = $(JS_AUDIO_CHANNEL_PROCESSING, this.dom).get(0);
			if(domSelect == null) return;
			domSelect.disabled = false;
			uUpdateSelect(domSelect, arr);
		} else {
			var arr = audioData.getChannelProcessing(CHANNEL_8);
			var domSelect = $(JS_AUDIO_CHANNEL_PROCESSING, this.dom).get(0);
			if(domSelect == null) return;
			domSelect.disabled = false;
			uUpdateSelect(domSelect, arr);
		}
	};
	
	this.UpdateVolumeProcess = function() {
		arr = audioData.getVolumeMode();
		uUpdateSelect($(JS_AUDIO_VOLUME_MODE, this.dom).get(0), arr);
		
		arr = audioData.getBoostLevel();
		uUpdateSelect($(JS_AUDIO_BOOST_LEVEL, this.dom).get(0), arr);
		
		arr = audioData.getBalanceLevel();
		uUpdateSelect($(JS_AUDIO_BALANCE_LEVEL, this.dom).get(0), arr);
	};
	
	this.ChangeByVolumeMode = function() {
		var mode = $(JS_AUDIO_VOLUME_MODE, this.dom).val();
		for(var i = 0; i < volumeModeMap.length; i++) {
			if(mode == volumeModeMap[i].mode) {
				var j = 0;
				var enableArr = volumeModeMap[i].enable;
				for(j = 0; j < enableArr.length; j++) {
					var $dom = $(enableArr[j], this.dom);
					if($dom.length == 0) continue;
					$dom[0].disabled = false;
				}
				var disableArr = volumeModeMap[i].disable;
				for(j = 0; j < disableArr.length; j++) {
					var $dom = $(disableArr[j], this.dom);
					if($dom.length == 0) continue;
					$dom[0].disabled = true;
				}
				break;
			}
		}
	};
	
	this.UpdateBitsPerSample = function() {
		var arr = audioData.getBitsPerSample();
		var domSelect = $(JS_AUDIO_BITS_PER_SAMPLE, this.dom).get(0);
		uUpdateSelect(domSelect, arr);
	};
	
	this.UpdateSampleRate = function() {
		var $audio = $(this.dom);
		var profile = $audio.find(JS_AUDIO_CODEC_PROFILE).val();
		var srArr = audioData.getSampleRate(profile);
		uUpdateSelect($audio.find(JS_AUDIO_SAMPLERATE).get(0), srArr);
	};
	
	this.UpdateBitrate = function() {
		var $audio = $(this.dom);
		var profile = $audio.find(JS_AUDIO_CODEC_PROFILE).val();
		var channels = $audio.find(JS_AUDIO_CHANNEL).val();
		var sampleRate = $audio.find(JS_AUDIO_SAMPLERATE).val();
		var srArr = audioData.getBitrate(profile, channels, sampleRate);
		if(srArr == null) return;
		uUpdateSelect($audio.find(JS_AUDIO_BITRATE).get(0), srArr);
		var defaultBitrate = audioData.getDefaultBitrate(profile, channels, sampleRate);
		if(defaultBitrate != undefined) {
			setSelect($audio.find(JS_AUDIO_BITRATE).get(0), defaultBitrate);
		}
		
		var min = parseFloat(srArr[0].value);
		var max = parseFloat(srArr[srArr.length-1].value);
		
		$(JS_AUDIO_BITRATE_KBPS, this.dom).val(min);
		var validator = ValidatorGetItem(validatorMap, JS_AUDIO_BITRATE_KBPS);
		validator.param.min = min;
		validator.param.max = max;
		validator.param.recommend = min;
	};
	
	this.UpdateBitrateUI = function() {
		var codec = this.GetCodec();
		var $dom = $(this.dom);
		if(codec == AUDIO_CODEC_AMR || codec == AUDIO_CODEC_MP2 || codec == AUDIO_CODEC_MP3 || codec == AUDIO_CODEC_DTS) {
			$dom.find(JS_AUDIO_BITRATE).show();
			$dom.find(JS_AUDIO_BITRATE_KBPS).hide();
		} else {
			$dom.find(JS_AUDIO_BITRATE).hide();
			$dom.find(JS_AUDIO_BITRATE_KBPS).show();
		}
	};
	
	this.UpdateCodecUI = function() {
		if(this.container != undefined) {
			this.UpdateCodecList();
		} else {
			var $audio = $(this.dom);
			var srArr = audioData.getCodec();
			uUpdateSelect($audio.find(JS_AUDIO_CODEC).get(0), srArr);
		}
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.UpdateCodecList = function(){
		var srArr = outputGroupData.GetContainerAudio(this.container);
		var codecArr = [];
		var arr = audioData.getCodec();
		for(var i = 0; i < srArr.length; i++){			
			for(var j = 0 ; j < arr.length; j++) {
				if(srArr[i] == arr[j].key) {
					val = arr[j].value;
				}
			}
		
			codecArr[i] = {key: srArr[i], value: val};
		}	
		uUpdateSelect($(JS_AUDIO_CODEC, this.dom).get(0), codecArr);
	};
	
	this.UpdateContainer = function(container){
		this.container = container;
		this.UpdateCodecUI();
	};
	
	this.ChangeCodec = function(codec) {
		var key = codec;
		if(key == null) {
			//key = this.GetCodec();
			return;
		}
		var $template = null;
		if(key == AUDIO_CODEC_AMR) {
			$template = $(JS_AUDIO_AMR_TEMPLATE);
		} else if(key == AUDIO_CODEC_MP2) {
			$template = $(JS_AUDIO_MP2_TEMPLATE);
		} else if(key == AUDIO_CODEC_MP3) {
			$template = $(JS_AUDIO_MP3_TEMPLATE);
		} else if(key == AUDIO_CODEC_AC3) {
			$template = $(JS_AUDIO_AC3_TEMPLATE);
		}else if(key == AUDIO_CODEC_DTS) {
			$template = $(JS_AUDIO_DTS_TEMPLATE);
		} else if(key == AUDIO_CODEC_VORBIS) {
			$template = $(JS_AUDIO_VORBIS_TEMPLATE);
		} else if(key == AUDIO_CODEC_PCM) {
			$template = $(JS_AUDIO_PCM_TEMPLATE);
		} else if(key == AUDIO_CODEC_DDPLUS) {
			$template = $(JS_AUDIO_DDPLUS_TEMPLATE);
		} else if(key == AUDIO_CODEC_WMA) {
			$template = $(JS_AUDIO_WMA_TEMPLATE);
		} else if(key == AUDIO_CODEC_AAC){
			$template = $(JS_AUDIO_AAC_TEMPLATE);
		} else if(key == AUDIO_CODEC_PASSTHROUGH){
			$template = $(JS_AUDIO_PASSTHROUGH_TEMPLATE);
		} else {
			return;
		}
		
		if(key == AUDIO_CODEC_PASSTHROUGH) {
			this.setPassThrough(true);
		}
		else {
			this.setPassThrough(false);
		}
		
		if($template.length == 0) return;
		var $object = $template.clone();
		$object.show();
		var $pilot = $(this.dom).find(JS_AUDIO_EXPAND_TARGET);
		$pilot.empty();
		$pilot.append($object.get(0));
		
		this.Init(this.dom);
	};
	
	this.SetBoostLevel = function(boostLevel) {
		$(JS_AUDIO_BOOST_LEVEL, this.dom).val(boostLevel);
	};
	
	this.GetBoostLevel = function() {
		return $(JS_AUDIO_BOOST_LEVEL, this.dom).val();
	};
	
	this.SetChannelProcessing = function(channelProcessing) {
		$(JS_AUDIO_CHANNEL_PROCESSING, this.dom).val(channelProcessing);
	};
	
	this.GetChannelProcessing = function() {
		return $(JS_AUDIO_CHANNEL_PROCESSING, this.dom).val();
	};
	
	this.SetIndex = function(index) {
		$(this.dom).find(JS_AUDIO_INDEX).text(index+1);
	};
	
	this.GetChannelText = function() {
		return this.GetValueByJS(JS_AUDIO_CHANNEL) + "ch";
	};
	
	this.GetBitrateText = function() {
		if(this.GetCodec() == AUDIO_CODEC_PCM) return "";
		
		var value = null;
		value = $(JS_AUDIO_BITRATE_BPS, this.dom).val();
		var iValue = parseFloat(value) / 1000;
		value = uFormatNumber(iValue, "?.???");
		value += "Kbps";
		return value; 
	};
	
	this.GetSampleRateText = function() {
		var value = null;
		var domSel = $(JS_AUDIO_SAMPLERATE, this.dom).get(0);
		if(domSel != null && domSel.selectedIndex >= 0) {
			value = domSel.options[domSel.selectedIndex].text;
		}
		var iValue = parseInt(value);
		if(!isNaN(iValue) && iValue > 0) {
			value += "KHz";
		} else {
			value = "";
		}
		return value; 
	};
	
	this.GetCodec = function() {
		return $(JS_AUDIO_CODEC, this.dom).val();
	};
	
	this.GetCodecTag = function() {
		var codec = this.GetValueByJS(JS_AUDIO_CODEC);
		var tag = uGetMapValue(codecTagMap, codec);
		return tag;
	};
	
	this.GetPassThrough = function() {
		var value = this.GetValueByJS(JS_AUDIO_PASS_THROUGH);
		return value == ENABLE_TRUE? true: false;
	};
	
	this.FormatText = function() {
		//if(this.GetPassThrough()) return str_video.passThrough;
		
		var codec = this.GetCodec();
		if(codec == AUDIO_CODEC_PASSTHROUGH) return str_video.passThrough;
		
		this.SyncBitrate();
		
		var text = "";
		var valueArr =[];
		
		valueArr[0] = this.GetValueByJS(JS_AUDIO_CODEC);
		valueArr[1] = this.GetChannelText();
		valueArr[2] = this.GetSampleRateText();
		valueArr[3] = this.GetBitrateText();
		
		var formatText = str_output.audioBreviary;
		text = formatText.format(valueArr[0], valueArr[1], valueArr[2], valueArr[3]);
		return text;
	};
	
	this.OnInfoChange = function() {
		if(this.stream == null) return;
		this.stream.OnInfoChange();
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
	
	this.SetJoinedList = function(list) {
		this.joinedList = list;
		
		$joinedRef = $(JS_AUDIO_JOINED_REF, this.dom);
		if($joinedRef.length == 0) return;
		
		if(list == null || list.length == 0 ) {
			$joinedRef.get(0).disabled = true;
			$joinedRef.val("");
		} else {
			$joinedRef.get(0).disabled = false;
		}
		this.SyncJoinedRef();
		
		$joinedRefDisp = $(JS_AUDIO_JOINED_REF_DISP, this.dom);
		if($joinedRefDisp.length == 0) return;
		
		if(list == null || list.length == 0 ) {
			//$joinedRefDisp.get(0).disabled = true;
			$joinedRefDisp.val("");
		} else {
			//$joinedRefDisp.get(0).disabled = false;
		}
		this.SyncJoinedRefDisp();
		
		this.UpdateJoinedRef();
	};
	
	this.AddJoinedRef = function(key) {
		var text = $(JS_AUDIO_JOINED_REF, this.dom).val();
		if(text.length > 0) text += ",";
		$(JS_AUDIO_JOINED_REF, this.dom).val(text + key);
		
		var value = uGetMapValue(this.joinedList, key);
		text = $(JS_AUDIO_JOINED_REF_DISP, this.dom).val();
		if(text.length > 0) text += ",";
		$(JS_AUDIO_JOINED_REF_DISP, this.dom).val(text + value);
		
		this.UpdateJoinedButton();
	};
	
	this.SyncJoinedRef = function() {
		if(this.joinedList == null || this.joinedList.length == 0) {
			$(JS_AUDIO_JOINED_REF, this.dom).val("");
			return;
		}
		
		var key = $(JS_AUDIO_JOINED_REF, this.dom).val();
		var keyArr = key.split(",");
		var text = "";
		for(var i = 0; i < keyArr.length; i++) {
			var value = uGetMapValue(this.joinedList, keyArr[i]);
			if(value == null) {
				continue;
			}
			if(text.length > 0) text += ",";
			text += keyArr[i];
		}
		$(JS_AUDIO_JOINED_REF, this.dom).val(text);
	};
	
	this.SyncJoinedRefDisp = function() {
		if(this.joinedList == null || this.joinedList.length == 0) {
			$(JS_AUDIO_JOINED_REF_DISP, this.dom).val("");
			return;
		}
		
		var key = $(JS_AUDIO_JOINED_REF, this.dom).val();
		var keyArr = key.split(",");
		var disp = "";
		for(var i = 0; i < keyArr.length; i++) {
			var value = uGetMapValue(this.joinedList, keyArr[i]);
			if(value == null) {
				continue;
			}
			if(disp.length > 0) disp += ",";
			disp += value;
		}
		$(JS_AUDIO_JOINED_REF_DISP, this.dom).val(disp);
	};
	
	this.ClearJoinedRef = function() {
		$(JS_AUDIO_JOINED_REF, this.dom).val("");
		$(JS_AUDIO_JOINED_REF_DISP, this.dom).val("");
		
		this.UpdateJoinedButton();
	};
	
	this.UpdateJoinedRef = function() {
		var $joinedRef = $(JS_LICENSE_AUDIO_JOINED_REF, this.dom);
		if($joinedRef.length == 0) return;
		
		if(this.joinedList == null || this.joinedList.length == 0) {
			$joinedRef.hide();
		}
		else {
			$joinedRef.show();
		}
		
		this.UpdateJoinedButton();
	};
	
	this.UpdateJoinedButton = function() {
		var key = $(JS_AUDIO_JOINED_REF, this.dom).val();
		var keyArr = key.split(",");
		if((key.length > 0 && keyArr.length >= MAX_JOINED_COUNT)
				|| this.joinedList == null 
				|| this.joinedList.length == 0) {
			$(JS_ADD_JOINED_TRIGGER, this.dom).hide();
		}
		else {
			$(JS_ADD_JOINED_TRIGGER, this.dom).show();
		}
		
		if(key.length > 0) {
			$(JS_CLEAR_JOINED_TRIGGER, this.dom).show();
		}
		else {
			$(JS_CLEAR_JOINED_TRIGGER, this.dom).hide();
		}
	};
	
	this.SyncBitrate = function() {
		var codec = this.GetCodec();
		var bps = null;
		if(codec == AUDIO_CODEC_AMR || codec == AUDIO_CODEC_MP2 || codec == AUDIO_CODEC_MP3 || codec == AUDIO_CODEC_DTS) {
			bps = $(JS_AUDIO_BITRATE, this.dom).val();
		} else {
			var kbps = $(JS_AUDIO_BITRATE_KBPS, this.dom).val();
			bps = parseFloat(kbps) * 1000;
			if(isNaN(bps)) bps = 0;
			bps = uFormatNumber(bps, "?");
		}
		
		$(JS_AUDIO_BITRATE_BPS, this.dom).val(bps);
	};
	
	/* XML submit */
	this.GetValueByJS = function(selector) {
		var value = null;
		var $sel = $(selector, this.dom);
		
		if($sel.length == 0) {
			return null;
		}
		
		if($sel.get(0).disabled) {
			value = null;
		}
		else if($sel.attr('type') == "checkbox") {
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
					value = checkVal;
				} else {
					value = null;
				}
			}
		}
		else {
			value = $sel.val();
		}
		return value;
	};
	
	this.GetValueInXML = function(selector) {
		var value = this.GetValueByJS(selector);
		
		if(value != null && value.length == 0) {
			if(selector == JS_AUDIO_CODEC_ID) {
				value = null;
			}
		}
		return value;
	};
	
	this.XML = function(xml) {
		this.SyncBitrate();
		
		if(this.GetPassThrough()) {
			xml.BeginNode(TAG_AUDIO_PASS_THROUGH);
			xml.EndNode();
		} else {
			var codec = this.GetCodec();
			if(codec == null) return;
			
			var tag = this.GetCodecTag();
			xml.BeginNode(tag);
			
			var tm = null;
			var codec = this.GetCodec(); 
			if(codec == AUDIO_CODEC_AC3 
					|| codec == AUDIO_CODEC_DDPLUS
					|| codec == AUDIO_CODEC_VORBIS
					) {
				tm = tagMapAc3;
			} else if(codec == AUDIO_CODEC_PCM) {
				tm = tagMapPcm;
			} else if (codec == AUDIO_CODEC_AAC) {				
				tm = tagMapAAC;
			} else if (codec == AUDIO_CODEC_DTS) {				
				tm = tagMapDts;
			} else {
				tm = tagMap;
			}
			
			var len = tm.length;
			for(var i = 0; i < len; i++) {
				var value = this.GetValueInXML(tm[i].value);
				if(value != null) {
					xml.Node(tm[i].key, value);
				}
			}
			
			xml.EndNode();
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
		var field = "";
		if(this.fieldIndex == null) {
			field = this.prefixField + this.myField + ".";
		} else {
			field = this.prefixField + this.myField + "[" + this.fieldIndex + "].";
		}
		return field;
	};
	
	this.UpdateElementName = function() {
		this.SyncBitrate();
		
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

AudioSupport.prototype = {
	//kbps audio bitrate
	getBitrate : function() {
		if(this.GetCodec() == AUDIO_CODEC_PCM) return "";
		
		var value = null;
		value = $(JS_AUDIO_BITRATE_BPS, this.dom).val();
		var iValue = parseFloat(value) / 1000;
		value = uFormatNumber(iValue, "?.???");
		return value;
	},
	
	updateByActionType : function() {
		if(g_taskSupport != null) {
			var taskAction = g_taskSupport.getActionType();
			if(taskAction == "runtime") {
				$(JS_DELETE_AUDIO_TRIGGER, this.dom).hide();
				$(JS_LICENSE_AUDIO_PASS_THROUGH, this.dom).hide();
				$(JS_AUDIO_CODEC, this.dom).hide();
				$(JS_AUDIO_CODEC_PROFILE, this.dom).hide();
				$(".AudioRuntimeNotSupport", this.dom).hide();
				
				$(".AudioCodecText", this.dom).show();
				$(".AudioCodecProfileText", this.dom).show();
			}
		}
	},
	
	updateIcon : function(){
		var codec = $(JS_AUDIO_CODEC, this.dom).val();
		if(codec == "DTS") {
			$(".AudioIcon", this.dom).attr('src','images/icons/dts.png');
			$(".AudioIcon", this.dom).show();
		} else {
			$(".AudioIcon", this.dom).attr('src','');
			$(".AudioIcon", this.dom).hide();
		}
	},
	
	setPassThrough: function(bSet) {
		$(JS_AUDIO_PASS_THROUGH, this.dom).get(0).checked = bSet;
	}
};