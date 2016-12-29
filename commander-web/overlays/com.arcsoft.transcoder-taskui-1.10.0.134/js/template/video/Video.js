var JS_DELETE_VIDEO_TRIGGER =".DeleteVideoTrigger";
var JS_VIDEO_EXPAND_TRIGGER =".VideoExpandTrigger";
var JS_VIDEO_EXPAND_TARGET =".VideoExpandTarget";
var JS_VIDEO_EXPAND_ICON =".VideoExpandIcon";
var JS_VIDEO_EDITING_EXPAND_TRIGGER = ".VideoEditingExpandTrigger";
var JS_VIDEO_EDITING_EXPAND_TARGET = ".VideoEditingExpandTarget";
var JS_VIDEO_EDITING_EXPAND_ICON = ".VideoEditingExpandIcon";
var JS_VIDEO_PASS_THROUGH_CONTAINER = ".VideoPassThroughContent";
var JS_LICENSE_VIDEO_PASS_THROUGH = ".LicenseVideoPassThrough";

var JS_VIDEO_SETTING		="input[name='VideoSetting']";
var JS_VIDEO_CODEC			="select[name='VideoCodec']";
var JS_VIDEO_WIDTH			="input[name='VideoWidth']";
var JS_VIDEO_HEIGHT			="input[name='VideoHeight']";
var JS_VIDEO_SMART_BORDER	="select[name='VideoSmartBorder']";
var JS_VIDEO_PASS_THROUGH = "input[name='VideoPassThrough']";
var JS_VIDEO_ID = "input[name='VideoId']";

var TAG_PREPROCESSER ="preprocessor";
var TAG_VIDEO_PASS_THROUGH = "videopassthrough";

var FIELD_VIDEO				="videoDescription";
var FIELD_VIDEO_CODEC		="settingsType";
var FIELD_VIDEO_SETTING		="videoSetting";
var FIELD_VIDEO_WIDTH		="width";
var FIELD_VIDEO_HEIGHT		="height";
var FIELD_VIDEO_SMART_BORDER	="enableBorder";
var FIELD_VIDEO_PASS_THROUGH = "passthrough";
var FIELD_VIDEO_CODEC_ID = "videoCodecId";
var FIELD_VIDEO_PLAY_RATE= "videoPlayRate";
var FIELD_VIDEO_MARK_ID = "markId";

function VideoSupport() {

	var fieldMap = [
    	{key: FIELD_VIDEO_CODEC, value: JS_VIDEO_CODEC},
    	{key: FIELD_VIDEO_SETTING, value: JS_VIDEO_SETTING},
    	{key: FIELD_VIDEO_WIDTH, value: JS_VIDEO_WIDTH},
    	{key: FIELD_VIDEO_HEIGHT, value: JS_VIDEO_HEIGHT},
    	{key: FIELD_VIDEO_PASS_THROUGH, value: JS_VIDEO_PASS_THROUGH},
		{key: FIELD_VIDEO_CODEC_ID, value: JS_VIDEO_CODEC_ID},
		{key: FIELD_VIDEO_PLAY_RATE, value: JS_VIDEO_PLAY_RATE},
		{key: FIELD_VIDEO_MARK_ID, value: JS_VIDEO_MARK_ID},
    	{key: FIELD_VIDEO_SMART_BORDER, value: JS_VIDEO_SMART_BORDER}
    	];
	
	var infoChanger = [
		JS_VIDEO_CODEC,
		JS_VIDEO_RESOLUTION,
		JS_VIDEO_WIDTH,
		JS_VIDEO_HEIGHT,
		JS_VIDEO_PASS_THROUGH,
		JS_VIDEO_SMART_BORDER
		];
	
	this.dom = null;
	this.stream = null;
	this.videoCodec = null;
	this.editorLogo = null;
	this.editorPip = null;
	this.editorSubtitle = null;
	this.watermarking = null;
	this.imageGrabbing = null;
	this.motionIcon = null;
	this.dynamicText = null;
	this.videoDrm = null;
	this.videoProcessing = null;
	
	/* field */
	this.prefixField = "";
	this.myField = FIELD_VIDEO;
	this.fieldIndex = null;
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.SetStream = function(streamSupport) {
		this.stream = streamSupport;
	};
	
	this.Create = function(domParent, container) {
		var $template = $(JS_VIDEO_DESCRIPTION_TEMPLATE);
		if($template.length == 0) return null;
		
		var $parent = $(domParent);
		var	pilot = $parent.find(JS_VIDEO_FLOCK).last();
		if(pilot.length == 0) return null;
		
		var $object = $template.clone();
		$object.show();
		pilot.append($object.get(0));

		this.Init($object.get(0), container);
		
		return this.dom;
	};
	
	this.Delete = function() {
		this.videoCodec.Delete();
		this.videoCodec = null;
		
		this.editorLogo.Delete();
		this.editorLogo = null;
		
		this.editorPip.Delete();
		this.editorPip = null;
		
		this.imageGrabbing.Delete();
		this.imageGrabbing = null;
		
		this.motionIcon.Delete();
		this.motionIcon = null;
		
		this.dynamicText.Delete();
		this.dynamicText = null;
		
		this.videoDrm.Delete();
		this.videoDrm = null;
		
		this.editorSubtitle.Delete();
		this.editorSubtitle = null;
		
		this.watermarking.Delete();
		this.watermarking = null;
		
		this.videoProcessing.Delete();
		this.videoProcessing = null;
		
		$(this.dom).remove();
	};
	
	this.Init = function(dom, container) {
		if(container != undefined){
			this.container = container;
		}
		this.SetDOM(dom);
		this.LicenseControl();
		
		this.videoCodec = new VideoCodec();
		this.videoCodec.SetVideoDescription(this);
		this.videoCodec.Init($(JS_VIDEO_DETAIL, this.dom).get(0), this.container);
		
		this.videoProcessing = new VideoProcessing();
		this.videoProcessing.SetParent(this);
		this.videoProcessing.Init($(JS_VIDEO_PROCESSING, this.dom).get(0));
		
		this.editorLogo = new EditorLogoInserter();
		this.editorLogo.Init($(JS_EDITOR_LOGO_INSERTER, this.dom).get(0));
		this.editorLogo.SetParent(this);
		
		this.editorPip = new EditorPipInserter();
		this.editorPip.Init($(JS_EDITOR_PIP_INSERTER, this.dom).get(0));
		this.editorPip.SetParent(this);
		
		this.imageGrabbing = new ImageGrabbing();
		this.imageGrabbing.Init($(JS_IMAGE_GRABBING, this.dom).get(0));
		this.imageGrabbing.SetParent(this);
		
		this.motionIcon = new MotionIcon();
		this.motionIcon.Init($(JS_MOTION_ICON, this.dom).get(0));
		this.motionIcon.SetParent(this);
		
		this.dynamicText = new DynamicText();
		this.dynamicText.Init($(JS_DYNAMIC_TEXT, this.dom).get(0));
		this.dynamicText.SetParent(this);
		
		this.videoDrm = new VideoDrm();
		this.videoDrm.Init($(JS_VIDEO_DRM, this.dom).get(0));
		this.videoDrm.SetParent(this);
		
		this.editorSubtitle = new EditorSubtitleInserter();
		this.editorSubtitle.Init($(JS_EDITOR_SUBTITLE, this.dom).get(0));
		this.editorSubtitle.SetParent(this);
		
		this.watermarking = new WatermarkingInserter();
		this.watermarking.Init($(JS_WATERMARKING, this.dom).get(0));
		this.watermarking.SetParent(this);
		
		this.UpdatePassThrough();
		this.updateByActionType();
		this.Bind();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_ENCODER_PASSTHROUGH) != license.ENABLED) {
			$(JS_LICENSE_VIDEO_PASS_THROUGH, this.dom).remove();
		}
		
		var codecArr = videoData.getCodec();
		if(codecArr.length == 0) {
			$(JS_VIDEO_PASS_THROUGH_CONTAINER, this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_EDITING) != license.ENABLED) {
			$(".LicenseVideoEditing", this.dom).remove();
		}
	};
	
	this.Bind = function() {
		var context = this;

		$(JS_OUTPUT_PREVIEW_TRIGGER, this.dom).click(function() {
			context.ShowPreview();
		});
		
		$(JS_DELETE_VIDEO_TRIGGER, this.dom).click(function() {
			context.stream.DeleteVideo(context);
		});
		
		$(JS_VIDEO_PASS_THROUGH, this.dom).click(function() {
			context.UpdatePassThrough();
			context.UpdateSummary();
		});
		
		this.BindInfoChanger();
		
		this.BindExpand();
	};
	
	this.BindExpand = function() {
		var $dom = $(this.dom);
		/*var o = {};
		o.$trigger = $(JS_VIDEO_EXPAND_TRIGGER, this.dom);
		o.$icon = $(JS_VIDEO_EXPAND_ICON, this.dom);
		o.$target = $(JS_VIDEO_EXPAND_TARGET, this.dom);
		var codec = $(JS_VIDEO_CODEC, this.dom).val();
		var codecExpand = videoData.getCodecExpandInfo(codec);
		o.expand = codecExpand.expand;
		o.disabled = codecExpand.disabled;
		uBindExpand(o);*/
		
		var o2 = {};
		o2.$trigger = $(JS_VIDEO_EDITING_EXPAND_TRIGGER, this.dom);
		o2.$icon = $(JS_VIDEO_EDITING_EXPAND_ICON, this.dom);
		o2.$target = $(JS_VIDEO_EDITING_EXPAND_TARGET, this.dom);
		o2.expand = false;
		uBindExpand(o2);
	};
	
	this.ActivePolicy = function(bActive) {
		if(this.videoCodec != null) {
			this.videoCodec.ActivePolicy(bActive);
		}
	};
	
	this.ShowPreview = function() {
		var context = this;
		if(g_taskSupport == null) return;
		
		var inputSupport = g_taskSupport.GetInputSupport();
		var mediaInfo = inputSupport.GetMediaInfo();
		g_OutputPreview.SetMediaInfo(mediaInfo);
		
		var programList = inputSupport.GetProgramList();
		g_OutputPreview.SetProgramList(programList);
		
		var trim = inputSupport.GetTrimInfo();
		if(trim != null) {
			var ret = inputSupport.ValidateTrimInfo(trim);
			if(!ret) {
				alert(str_warning.trimError);
				return;
			}
			g_OutputPreview.SetTrimInfo(trim);
		}
		
		//mosaic
		var mosaic = inputSupport.GetMosaicList();
		g_OutputPreview.SetMosaicList(mosaic);
		
		//time clipping
		var clipInfo = inputSupport.GetTimeClippingInfo();
		g_OutputPreview.SetClipInfo(clipInfo);
		var clipList = inputSupport.GetTimesliceList();
		g_OutputPreview.SetClipList(clipList);
		
		var al = inputSupport.GetAdvertisementList();
		g_OutputPreview.SetAdvertisementList(al);
		
		var ar = this.videoCodec.GetAspectRatio();
		g_OutputPreview.SetPixelAspectRatio(ar.parx, ar.pary, ar.parSource);
		
		var rs = this.videoCodec.GetResolution();
		g_OutputPreview.SetVideoResolution(rs.width, rs.height);
		
		var logoInfo = this.editorLogo.GetInfo();
		g_OutputPreview.SetLogoInfo(logoInfo);
		var logoList = this.editorLogo.GetLogoList();
		g_OutputPreview.SetLogoList(logoList);
		
		g_OutputPreview.SetSubtitleList(this.editorSubtitle.GetSubtitleList());
		
		g_OutputPreview.SetDynamicTextList(this.dynamicText.GetList());

		g_OutputPreview.SetMotionIconList(this.motionIcon.GetList());
		
		g_OutputPreview.Show();
		g_OutputPreview.Play();
		g_OutputPreview.SetOnClose(function() {
			context.OnPreviewClose();
		});
		g_OutputPreviewOwner = this.dom;
	};
	
	this.GetCodec = function() {
		return $(JS_VIDEO_CODEC, this.dom).val();
	}
	
	this.SetLogoInfo = function(o) {
		this.editorLogo.SetInfo(o);
	};
	
	this.GetLogoInfo = function() {
		return this.editorLogo.GetInfo();
	};
	
	this.SetLogoList = function(array) {
		this.editorLogo.SetLogoList(array);
	};
	
	this.GetLogoList = function() {
		return this.editorLogo.GetLogoList();
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.SetInputLogoList = function(array) {
		this.editorLogo.SetInputLogoList(array);
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.GetInputLogoList = function() {
		return this.editorLogo.GetInputLogoList();
	};
	
	this.SetDynamicTextList = function(list) {
		this.dynamicText.SetList(list);
	};
	
	this.SetPipList = function(array) {
		this.editorPip.SetPipList(array);
	};
	
	this.GetPipList = function() {
		return this.editorPip.GetPipList();
	};
	
	this.SetSubtitleInfo = function(o) {
		this.editorSubtitle.SetInfo(o);
	};
	
	this.GetSubtitleInfo = function() {
		return this.editorSubtitle.GetInfo();
	};
	
	this.GetPassThrough = function() {
		var value = this.GetValueByJS(JS_VIDEO_PASS_THROUGH);
		return value == ENABLE_TRUE? true: false;
	};
	
	this.OnPreviewClose = function() {
		var oldLogoInfo = this.editorLogo.GetInfo();
		var logoInfo = g_OutputPreview.GetLogoInfo();
		this.editorLogo.SetInfo(logoInfo);
		var bSameLogo = CompareObject(logoInfo, oldLogoInfo);
		
		var oldLogoList = this.editorLogo.GetLogoList();
		var logoList = g_OutputPreview.GetLogoList();
		this.editorLogo.SetLogoList(logoList);
		var bSameLogoList = CompareArray(logoList, oldLogoList);
		
		var oldDynamicTextList = this.dynamicText.GetList();
		var dynamicTextList = g_OutputPreview.GetDynamicTextList();
		this.dynamicText.SetList(dynamicTextList);
		var bSameDynamicTextList = CompareArray(dynamicTextList, oldDynamicTextList);
		
		var oldMotionIconList = this.motionIcon.GetList();
		var motionIconList = g_OutputPreview.GetMotionIconList();
		this.motionIcon.SetList(motionIconList);
		var bSameMotionIconList = CompareArray(motionIconList, oldMotionIconList);
		
		var oldSubtitle = this.editorSubtitle.GetSubtitleList();
		var subtitle = g_OutputPreview.GetSubtitleList();
		this.editorSubtitle.SetSubtitleList(subtitle);
		var bSameSubtitle = CompareArray(subtitle, oldSubtitle);
		
		if(!(bSameLogo && bSameLogoList && bSameSubtitle && bSameDynamicTextList && bSameMotionIconList)) {
			this.stream.SetLinkedPresetId(LINKED_PRESET_ID_NONE);
		}
	};
	
	this.UpdatePassThrough = function() {
		if(this.GetPassThrough()) {
			$(JS_VIDEO_PASS_THROUGH_CONTAINER, this.dom).hide();
		} else {
			$(JS_VIDEO_PASS_THROUGH_CONTAINER, this.dom).show();
		}
	};
	
	this.UpdateSummary = function() {
		var streamSupport = this.stream;
		streamSupport.UpdateSummary();
	};
	
	this.GetVideoCodec = function() {
		return this.videoCodec;
	};
	
	/*used in cloud transcoder, cannot delete*/
	this.UpdateContainer = function(container) {
		this.videoCodec.UpdateContainer(container);
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

	this.FormatText = function() {
		if(this.videoCodec == null) return null;
		if(this.GetPassThrough()) return str_video.passThrough;
		return this.videoCodec.FormatText();
	};
	
	this.OnMediaInfoChanged = function(mediaInfo) {
	};
	
	this.OnInputChanged = function(input) {
		this.editorSubtitle.OnInputChanged(input);
	};

	/* XML submit*/
	this.GetValueByJS = function(selector) {
		var value = null;
		var $sel = $(selector, this.dom);
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
		var id = $(JS_VIDEO_ID, this.dom).val();
		if(this.GetPassThrough()) {
			xml.BeginNode(TAG_VIDEO_PASS_THROUGH);
			xml.Attrib("id", id);
			xml.EndNode();
		} else {
			var tag = this.videoCodec.GetCodecTag();
			if(tag == null) return;
			
			xml.BeginNode(tag);
			xml.Attrib("id", id);
			
			this.videoCodec.XML(xml);
			
			this.videoProcessing.XML(xml);
			
			xml.BeginNode(TAG_PREPROCESSER);
			this.editorLogo.XML(xml);
			this.editorSubtitle.XML(xml);
			this.editorPip.XML(xml);
			this.watermarking.XML(xml);
			this.imageGrabbing.XML(xml);
			this.motionIcon.XML(xml);
			this.dynamicText.XML(xml);
			xml.EndNode();
			
			this.videoDrm.XML(xml);
			
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
		
		this.videoCodec.SetPrefixField(fullField);
		this.videoCodec.UpdateElementName();
		
		this.videoProcessing.SetPrefixField(fullField);
		this.videoProcessing.UpdateElementName();
		
		this.editorLogo.SetPrefixField(fullField);
		this.editorLogo.UpdateElementName();
		
		this.editorPip.SetPrefixField(fullField);
		this.editorPip.UpdateElementName();
		
		this.editorSubtitle.SetPrefixField(fullField);
		this.editorSubtitle.UpdateElementName();
		
		this.watermarking.SetPrefixField(fullField);
		this.watermarking.UpdateElementName();
		
		this.imageGrabbing.SetPrefixField(fullField);
		this.imageGrabbing.UpdateElementName();
		
		this.motionIcon.SetPrefixField(fullField);
		this.motionIcon.UpdateElementName();
		
		this.dynamicText.SetPrefixField(fullField);
		this.dynamicText.UpdateElementName();
		
		this.videoDrm.SetPrefixField(fullField);
		this.videoDrm.UpdateElementName();
	};
	/* Field operate end */
	
	//static
	function CompareObject(left, right) {
		if(left == null && right == null) {
			return true;
		} else if((left != null && right == null) || (left == null && right != null)) {
			return false;
		}
		
		for(var key in left) {
			if(left[key] != right[key]) {
				return false;
			}
		}
		
		return true;
	}
	
	function CompareArray(left, right) {
		if(left == null && right == null) {
			return true;
		} else if((left != null && right == null) || (left == null && right != null)) {
			return false;
		}
		
		if(left.length != right.length) {
			return false;
		}
		
		for(var i = 0; i < left.length; i++) {
			if(!CompareObject(left[i], right[i])) {
				return false;
			}
		}
		
		return true;
	}
}

VideoSupport.prototype = {
	//kbps audio bitrate
	getBitrate : function() {
		return this.videoCodec.getTotalBitrate();
	},
	
	updateByActionType : function() {
		if(g_taskSupport != null) {
			var taskAction = g_taskSupport.getActionType();
			if(taskAction == "runtime") {
				$(JS_DELETE_VIDEO_TRIGGER, this.dom).hide();
				$(JS_LICENSE_VIDEO_PASS_THROUGH, this.dom).hide();
				$(".VideoEditing", this.dom).hide();
				
				var codec = this.GetCodec();
				var support = videoData.getCodecRuntimeSupport(codec);
				if(!support) {
					$(".RuntimeUnsupport", this.dom).show();
				}
			}
		}
	},

	setPassThrough: function(bSet) {
		$(JS_VIDEO_PASS_THROUGH, this.dom).get(0).checked = bSet;
		this.UpdatePassThrough();
	}
};
