function InputSupport() {
	this.dom = undefined;
	this.fnOnRemove = undefined;
	this.fnOnReorder = undefined;
	this.portParser = new MediaPortParser();
	this.programEditor = null;
	this.inputEditor = null;
	this.editorMosaic = null;
	this.editorTrim = null;
	this.paddingImage = null;
	this.audioProcess = null;
	this.timeClipping = null;
	this.advertisement = null;
	this.posting = false;
	this.timerId = 0;
	this.alternateURIContainer = null;
	this.candidateSdi = null;
	this.joinedSetting = null;
	this.oldUri = "";
	this.initRequestFinised = false;
	
	var typeTagMap = [
		{key: INPUT_TYPE_SDI, value: TAG_SDI},
		{key: INPUT_TYPE_CVBS, value: TAG_CVBS},
		{key: INPUT_TYPE_HDMI, value: TAG_HDMI},
		{key: INPUT_TYPE_AES_EBU, value: TAG_AES_EBU},
		{key: INPUT_TYPE_ASI, value: TAG_ASI},
		{key: INPUT_TYPE_NETWORK, value: TAG_NETWORK},
		{key: INPUT_TYPE_FILE, value: TAG_LOCAL_FILE},
		{key: INPUT_TYPE_BD, value: TAG_BD},
		{key: INPUT_TYPE_DVD, value: TAG_DVD},
		{key: INPUT_TYPE_P2, value: TAG_P2},
		{key: INPUT_TYPE_OSS, value: TAG_OSS},
		{key: INPUT_TYPE_COMBINATION, value: TAG_COMBINATION}
		];
	
	var defaultTagMap = [
		{key: TAG_INPUT_URI,	value: JS_INPUT_URI},
		{key: TAG_INPUT_PROGRAM_ID,		value: JS_INPUT_PROGRAM_ID},
		{key: TAG_INPUT_AUDIO_TRACK_ID,	value: JS_INPUT_AUDIO_TRACK_ID},
		{key: TAG_INPUT_SUBTITLE_ID,	value: JS_INPUT_SUBTITLE_ID},
		{key: TAG_INPUT_FORMAT,	value: JS_INPUT_FORMAT},
		{key: TAG_INPUT_PROTOCOL,	value: JS_INPUT_PROTOCOL},
		{key: TAG_INPUT_FAILOVER_TIME,	value: JS_INPUT_FAILOVER_TIME}
		];
	
	var fileTagMap = [
		{key: TAG_INPUT_URI,	value: JS_INPUT_URI},
		{key: TAG_INPUT_PROGRAM_ID,		value: JS_INPUT_PROGRAM_ID},
		{key: TAG_INPUT_AUDIO_TRACK_ID,	value: JS_INPUT_AUDIO_TRACK_ID},
		{key: TAG_INPUT_SUBTITLE_ID,	value: JS_INPUT_SUBTITLE_ID},
		{key: TAG_INPUT_AUDIO_CHANNEL_ID,	value: JS_INPUT_AUDIO_CHANNEL_ID},
		{key: TAG_INPUT_FILL_TYPE,	value: JS_INPUT_FILL_TYPE}
		];

	var sdiTagMap = [
   		{key: TAG_INPUT_PORT,	value: JS_INPUT_PORT},
   		{key: TAG_INPUT_LIVE_SYNC_MODE,	value: JS_INPUT_LIVE_SYNC_MODE},
   		{key: TAG_INPUT_AUDIO_CHANNEL_ID,	value: JS_INPUT_AUDIO_CHANNEL_ID},
   		{key: TAG_INPUT_4K,	value: JS_INPUT_4K}
   		];
	
	var asiTagMap = [
		{key: TAG_INPUT_PORT,	value: JS_INPUT_PORT},
		{key: TAG_INPUT_PROGRAM_ID,		value: JS_INPUT_PROGRAM_ID},
		{key: TAG_INPUT_AUDIO_TRACK_ID,	value: JS_INPUT_AUDIO_TRACK_ID},
		{key: TAG_INPUT_SUBTITLE_ID,	value: JS_INPUT_SUBTITLE_ID},
		{key: TAG_INPUT_ALLOW_PROGRAM_ID_CHANGE, value: JS_INPUT_ALLOW_PROGRAM_ID_CHANGE}
		];
	
	var networkTagMap = [
		{key: TAG_INPUT_PROTOCOL,	value: JS_INPUT_PROTOCOL},
		{key: TAG_INPUT_URI,	value: JS_INPUT_URI},
		{key: TAG_INPUT_PROGRAM_ID,		value: JS_INPUT_PROGRAM_ID},
		{key: TAG_INPUT_AUDIO_TRACK_ID,	value: JS_INPUT_AUDIO_TRACK_ID},
		{key: TAG_INPUT_SUBTITLE_ID,	value: JS_INPUT_SUBTITLE_ID},
		{key: TAG_INPUT_FILL_TYPE,	value: JS_INPUT_FILL_TYPE},
		{key: TAG_DELAY_OUTPUT_TIME,	value: JS_DELAY_OUTPUT_TIME},
		{key: TAG_FILL_LOST_TIME,	value: JS_FILL_LOST_TIME},
		{key: TAG_FILL_MODE_LOST,	value: JS_FILL_MODE_LOST},
		{key: TAG_INPUT_FAILOVER_TIME,	value: JS_INPUT_FAILOVER_TIME},
		{key: TAG_SOURCE_IP, value: JS_INPUT_SRC_IP},
		{key: TAG_INPUT_VIDEO_RTP_URI, value: JS_INPUT_VIDEO_RTP_URI},
		{key: TAG_INPUT_AUDIO_RTP_URI, value: JS_INPUT_AUDIO_RTP_URI},
		{key: TAG_INPUT_VIDEO_RTCP_URI, value: JS_INPUT_VIDEO_RTCP_URI},
		{key: TAG_INPUT_AUDIO_RTCP_URI, value: JS_INPUT_AUDIO_RTCP_URI},
		{key: TAG_INPUT_SDP, value: JS_INPUT_SDP_URI},
		{key: TAG_INPUT_ALLOW_PROGRAM_ID_CHANGE, value: JS_INPUT_ALLOW_PROGRAM_ID_CHANGE},
		{key: TAG_INPUT_LIVE_SYNC_MODE,	value: JS_INPUT_LIVE_SYNC_MODE}
		];
	
	var bdTagMap = [
   		{key: TAG_INPUT_URI,	value: JS_INPUT_URI}
   		];
	
	var ossTagMap = [
 		{key: TAG_INPUT_KEY,	value: JS_INPUT_KEY},
 		{key: TAG_INPUT_PROGRAM_ID,		value: JS_INPUT_PROGRAM_ID},
 		{key: TAG_INPUT_AUDIO_TRACK_ID,	value: JS_INPUT_AUDIO_TRACK_ID},
 		{key: TAG_INPUT_SUBTITLE_ID,	value: JS_INPUT_SUBTITLE_ID}
 		];
	
	/* used in file/network/sdi/asi */
	var fileFieldMap = [
		{key: FIELD_INPUT_TYPE, value: JS_INPUT_TYPE},
		{key: FIELD_INPUT_BODY, value: JS_INPUT_BODY},
		{key: FIELD_INPUT_PORT, value: JS_INPUT_PORT},
		{key: FIELD_INPUT_LIVE_SYNC_MODE, value: JS_INPUT_LIVE_SYNC_MODE},
		{key: FIELD_INPUT_URI, value: JS_INPUT_URI},
		{key: FIELD_INPUT_PROTOCOL,	value: JS_INPUT_PROTOCOL},
		{key: FIELD_INPUT_FAILOVER_TIME, value: JS_INPUT_FAILOVER_TIME},
		{key: FIELD_INPUT_SRC_IP, value: JS_INPUT_SRC_IP},
		{key: FIELD_INPUT_VIDEO_RTP_URI, value: JS_INPUT_VIDEO_RTP_URI},
		{key: FIELD_INPUT_AUDIO_RTP_URI, value: JS_INPUT_AUDIO_RTP_URI},
		{key: FIELD_INPUT_VIDEO_RTCP_URI, value: JS_INPUT_VIDEO_RTCP_URI},
		{key: FIELD_INPUT_AUDIO_RTCP_URI, value: JS_INPUT_AUDIO_RTCP_URI},
		{key: FIELD_INPUT_SDP, value: JS_INPUT_SDP_URI},
		{key: FIELD_INPUT_PROGRAM_ID, value: JS_INPUT_PROGRAM_ID},
		{key: FIELD_INPUT_AUDIO_TRACK_ID, value: JS_INPUT_AUDIO_TRACK_ID},
		{key: FIELD_INPUT_SUBTITLE_ID, value: JS_INPUT_SUBTITLE_ID},
		{key: FIELD_INPUT_ANGLE_ID, value: JS_INPUT_ANGLE_ID},
		{key: FIELD_INPUT_AUDIO_CHANNEL_ID, value: JS_INPUT_AUDIO_CHANNEL_ID},
		{key: FIELD_INPUT_4K, value: JS_INPUT_4K},
		{key: FIELD_INPUT_KEY, value: JS_INPUT_KEY},
		{key: FIELD_INPUT_FILL_TYPE, value: JS_INPUT_FILL_TYPE},
		{key: FIELD_DELAY_OUTPUT_TIME, value: JS_DELAY_OUTPUT_TIME},
		{key: FIELD_FILL_LOST_TIME,	value: JS_FILL_LOST_TIME},
		{key: FIELD_FILL_MODE_LOST,	value: JS_FILL_MODE_LOST},
		{key: FIELD_INPUT_ALLOW_PROGRAM_ID_CHANGE, value: JS_INPUT_ALLOW_PROGRAM_ID_CHANGE}
		];
	
	/* used in bd/dvd */
	var bdFieldMap = [
		{key: FIELD_INPUT_TYPE, value: JS_INPUT_TYPE},
		{key: FIELD_INPUT_BODY, value: JS_INPUT_BODY},
		{key: FIELD_INPUT_PORT, value: JS_INPUT_PORT},
		{key: FIELD_INPUT_URI, value: JS_INPUT_URI},
		{key: FIELD_INPUT_PROTOCOL,	value: JS_INPUT_PROTOCOL},
		{key: FIELD_INPUT_FAILOVER_TIME, value: JS_INPUT_FAILOVER_TIME}
		];
	
	var validatorMap = [
		{selector: JS_INPUT_FAILOVER_TIME, type: VALIDATOR_TYPE_INTEGER, param: {min: -1, max: 86400000, recommend: 3000} },
		{selector: JS_FILL_LOST_TIME, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 86400000, recommend: 5000, canEmpty: true} }
		];
	
	this.prefixField = "";
	this.myField = FIELD_INPUT;
	this.fieldIndex = undefined;

	this.SetDOM = function(dom) {
		this.dom = dom;
	};

	this.Create = function(domTask) {
		var $tmp = $(JS_INPUT_TEMPLATE);
		if($tmp.length == 0) return null;
		
		var $task = $(domTask);
		var	pilot = $task.find(JS_INPUT_FLOCK).last();
		if(pilot.length == 0) return null;
		
		var $input = $tmp.clone();
		$input.show();
		pilot.append($input.get(0));
		
		this.Init($input.get(0));
		
		return this.dom;
	};
	
	this.Init = function(dom) {
		this.SetDOM(dom);
		this.LicenseControl();
		this.InitInputEditor();
		this.UpdateType();
		this.UpdateInputFormat();
		this.UpdateInputSettingByType();
		this.UpdateRuntimeSupport();
		this.UpdateInputNote();
		this.Bind();
		this.BindOption();
		this.UpdateProtocol();
		this.UpdateURI();
		this.UpdateOpenFileTrigger();
		this.UpdateInputInfo();
		this.UpdateAllowProgramIdChange();
		this.updateLiveSyncMode();
		this.updateFillLostTime();
		this.UpdateFillType();
		this.UpdatePreviewTrigger();
		this.UpdatePort();
		this.InitProgramEditor();
		this.UpdateSupportEditor();
		this.InitAlternateURI();
		this.UpdateAlternateURI();
		this.InitCandidateSdi();
		this.InitJoinedSetting();
		this.RequestSrcIP();
		this.UpdateESOverRTP();
		this.UpdateFailoverTime();
		
		this.oldUri = $(JS_INPUT_URI, this.dom).val();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.INPUT_PREVIEW) != license.ENABLED) {
			$(JS_INPUT_PREVIEW_TRIGGER, this.dom).remove();
		}
		
		if(GetLicense(license.ETH_SMART_SELECTION) != license.ENABLED) {
			$(JS_LICENSE_SRC_IP, this.dom).remove();
		}
		
		if(GetLicense(license.INPUT_FAILOVER_TIME) != license.ENABLED) {
			$(JS_LICENSE_FAILOVER_TIME, this.dom).remove();
		}
		
		if(GetLicense(license.INPUT_ALLOW_PROGRAM_ID_CHANGE) != license.ENABLED) {
			$(JS_LICENSE_ALLOW_PROGRAM_ID_CHANGE, this.dom).remove();
		}
		
		if(GetLicense(license.INPUT_FILL_TYPE) != license.ENABLED) {
			$(".LicenseInputFillType", this.dom).remove();
		}
		
		if(GetLicense(license.INPUT_FILL_MODE_LOST) != license.ENABLED) {
			$(".LicenseFillModeLost", this.dom).remove();
		}
		
		if(GetLicense(license.INPUT_LIVE_SYNC_MODE) != license.ENABLED) {
			$(".LicenseLiveSyncMode", this.dom).remove();
		}
		
		if(GetLicense(license.INPUT_DELAY_OUTPUT_TIME) != license.ENABLED) {
			$(".LicenseDelayOutputTime", this.dom).remove();
		}
		
		if(GetLicense(license.INPUT_EDITING) != license.ENABLED) {
			$(".LicenseInputEditing", this.dom).hide();
			$(".InputPreviewBtn", this.dom).show();
		}
		else {
			$(".InputPreviewBtn", this.dom).hide();
		}
		
		if(GetLicense(license.INPUT_SDI_4K) != license.ENABLED) {
			$(".LicenseInput4k").remove();
		}
	};
	
	this.HideDeleteTrigger = function() {
		$(this.dom).find(JS_DELETE_INPUT_TRIGGET).hide();
	};
	
	/**
	 * @param fn(dom) 
	 */
	this.SetOnRemove = function(fn) {
		this.fnOnRemove = fn;
	};
	
	/**
	 * @param fn(dom, mode) : mode can be INPUT_MOVE_PREV or INPUT_MOVE_NEXT 
	 */
	this.SetOnReorder = function(fn) {
		this.fnOnReorder = fn;
	};
	
	/**
	 * private API.
	 */
	this.Bind = function() {
		var $input = $(this.dom);
		var context = this;
		
		$(JS_DELETE_INPUT_TRIGGET, this.dom).click(function() {
			if($.isFunction(context.fnOnRemove)) {
				context.fnOnRemove($input[0]);
			}
		});
		
		$(JS_INPUT_TYPE, this.dom).change(function() {
			context.oldUri = $(JS_INPUT_URI, context.dom).val();
			
			context.UpdateInputSettingByType();
			context.UpdateRuntimeSupport();
			context.UpdateInputNote();
			context.BindOption();
			context.UpdateInputFormat();
			context.UpdateProtocol();
			context.UpdateURI();
			context.UpdateOpenFileTrigger();
			context.UpdateInputInfo();
			context.UpdateAllowProgramIdChange();
			context.updateLiveSyncMode();
			context.updateFillLostTime();
			context.UpdateFillType();
			context.UpdatePreviewTrigger();
			context.ClearEditorInfo();
			context.UpdatePort();
			context.InitProgramEditor();
			context.UpdateSupportEditor();
			context.InitAlternateURI();
			context.UpdateAlternateURI();
			context.InitCandidateSdi();
			context.InitJoinedSetting();
			context.RequestSrcIP();
			context.UpdateESOverRTP();
			context.UpdateVideoRtpUri();
			context.UpdateFailoverTime();
			
			$(JS_INPUT_URI, context.dom).change();
			
			g_taskSupport.UpdateAudioJoinedList();
		});

	};
	
	this.GetSrcIp = function() {
		var $sel = $(JS_INPUT_SRC_IP, this.dom);
		if($sel.length == 0) return null;
		
		var sel = $sel.get(0);
		if(sel.options == 0) return null;
		if(sel.selectedIndex < 0) return null;
		
		var currSelectText = sel.options[sel.selectedIndex].text;
		var arr = currSelectText.split(":");
		if(arr == null || arr.length < 2) return null;
		if(arr[0] == "auto") return null;
		
		return arr[1];
	};
	
	/**
	 * mediaInfo {
	 *	size: xxx,
	 *	inputType: xxx		
	 *	duration: xxx,
	 *	canseek: xxx,
	 * 	program: {programId: xxx, videoId: xxx, audioId: xxx, subtitleId},
	 * 	video: {codec: xxx, bitrate: xxx, aspectRatio: xxx, framerate: xxx, resolution: xxx },
	 * 	audio: {codec: xxx, bitrate: xxx, channel: xxx, samplerate: xxx, bitdepth: xxx },
	 * }
	 */
	//only for inner call
	this.GetMediaInfo = function() {
		var mediaInfo = this.programEditor.GetMediaInfo(0);
		mediaInfo.inputType = this.GetInputType();
		mediaInfo.uri = this.GetURI();
		
		var srcIp = this.GetSrcIp();
		if(mediaInfo.uri != null && mediaInfo.uri.match(/^udp:/i) != null && srcIp != null && srcIp.length > 6) {
			mediaInfo.uri += "?localaddr=" + srcIp;
		}
		
		return mediaInfo;
	};
	
	this.GetProgramList = function() {
		return this.programEditor.GetProgramList();
	};
	
	//add for cloudtranscoder
	this.SetProgramList = function(itemList){
		this.programEditor.SetProgramList(itemList);
	};
	
	this.StartWaiting = function() {
		var $mediaInfo = $(this.dom).find(JS_INPUT_MEDIA_INFO); 
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
	
	this.ShowSDIPreview = function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_SDI) return;
		
		var mediaInfo = this.GetMediaInfo();
		g_SDIPreview.SetMediaInfo(mediaInfo);
		g_SDIPreview.Show();
		g_SDIPreview.Play();
	};
	
	this.ShowInputPreview = function() {
		var context = this;
		if(this.posting) return;
		
		var inputType = this.GetInputType();

		var mediaInfo = this.GetMediaInfo();
		g_InputPreview.SetMediaInfo(mediaInfo);
		
		var programList = this.GetProgramList();
		g_InputPreview.SetProgramList(programList);
		
		//mosaic
		var mosaic = this.editorMosaic.GetMosaicList();
		g_InputPreview.SetMosaicList(mosaic);
		
		//trim
		var trim = this.editorTrim.GetTrimInfo();
		g_InputPreview.SetTrimInfo(trim);
		
		//time clipping
		var ts = this.timeClipping.GetTimeClippingInfo();
		g_InputPreview.SetClipInfo(ts);
		
		//timeslice list
		var tl = this.timeClipping.GetTimesliceList();
		g_InputPreview.SetClipList(tl);
		
		//advertisement list
		var al = this.advertisement.GetItemList();
		g_InputPreview.SetAdvertisementList(al);
		
		g_InputPreview.Show();
		g_InputPreview.Play();
		g_InputPreview.SetOnClose(function() {
			context.OnPreviewClose();
		});
		g_InputPreviewOwner = this;
	};
	
	this.OnPreviewClose = function() {
		var mosaic = g_InputPreview.GetMosaicList();
		this.editorMosaic.SetMosaicList(mosaic);
		
		var trim = g_InputPreview.GetTrimInfo();
		this.editorTrim.SetTrimInfo(trim);
		
		var ts = g_InputPreview.GetClipInfo();
		this.timeClipping.SetTimeClippingInfo(ts);
		
		var tl = g_InputPreview.GetClipList();
		this.timeClipping.SetTimesliceList(tl);
		
		var al = g_InputPreview.GetAdvertisementList();
		this.advertisement.SetItemList(al);
	};
	
	this.OnPortResponse = function(data) {
		if(data == null) return;
		this.portParser.Init(data);
		var pa = this.portParser.GetPortArray();
		uUpdateSelect($(JS_INPUT_PORT, this.dom).get(0), pa);
		
		var originalPort = $(JS_INPUT_PORT_DOWN, this.dom).val();
		originalPort = parseInt(originalPort);
		if(!isNaN(originalPort) && originalPort >= 0) {
			$(JS_INPUT_PORT, this.dom).val(originalPort);
		}
		
		this.UpdateProgramEditor(true);
	};
	
	this.UpdatePort = function() {
		var context = this;
		var inputType = this.GetInputType(); 
		if(inputType != INPUT_TYPE_SDI
				&& inputType != INPUT_TYPE_CVBS
				&& inputType != INPUT_TYPE_HDMI
				&& inputType != INPUT_TYPE_ASI
				&& inputType != INPUT_TYPE_AES_EBU) return;
		
		var url ="getMediaFileInfo";
		var uri = "";
		if(inputType == INPUT_TYPE_SDI) {
			uri = "sdiport:0";
		}
		else if(inputType == INPUT_TYPE_CVBS) {
			uri = "cvbsport:0";
		}
		else if(inputType == INPUT_TYPE_HDMI) {
			uri = "hdmiport:0";
		}
		else if(inputType == INPUT_TYPE_ASI) {
			uri = "asiport:0";
		}
		else if(inputType == INPUT_TYPE_AES_EBU) {
			uri = "aesport:0";
		}
		
		var param = { 'uri': uri, 'rnd': Math.random() };
		if(g_params_getMediaFileInfo != null) {
			$.extend(param, param, g_params_getMediaFileInfo);
		}
		this.posting = true;
		this.StartWaiting();
		$.post(url, param, function(data) {
			context.OnPortResponse(data);
			context.EndWaiting();
			context.posting = false;
		}, "xml");
	};
	
	this.CleanDownloadedMediaInfo = function() {
		$(JS_INPUT_PROGRAM_ID_DOWN, this.dom).val("-1");
		$(JS_INPUT_AUDIO_TRACK_ID_DOWN, this.dom).val("-1");
		$(JS_INPUT_SUBTITLE_ID_DOWN, this.dom).val("-2");
	};
	
	this.UpdatePreviewTriggerASI = function() {
		if(this.inputEditor == null) return;
		
		if(GetLicense(license.INPUT_PREVIEW_ASI) != license.ENABLED ) {
			this.inputEditor.ShowPlayIcon(false);
		} else {
			this.inputEditor.ShowPlayIcon(true);
		}
	};
	
	this.UpdatePreviewTriggerSDI = function() {
		if(this.inputEditor == null) return;
		
		if(GetLicense(license.INPUT_PREVIEW_SDI) != license.ENABLED ) {
			this.inputEditor.ShowPlayIcon(false);
		} else {
			this.inputEditor.ShowPlayIcon(true);
		}
	};
	
	this.UpdatePreviewTrigger = function() {
		var inputType = this.GetInputType();
		
		if(inputType == INPUT_TYPE_SDI) {
			this.UpdatePreviewTriggerSDI();
		} 
		else if(inputType == INPUT_TYPE_ASI) {
			this.UpdatePreviewTriggerASI();
		}
		else {
			this.inputEditor.ShowPlayIcon(true);
		}
	};
	
	this.InitInputEditor = function() {
		this.inputEditor = new InputEditor();
		this.inputEditor.Init($(JS_INPUT_EDITOR, this.dom).get(0));
		
		this.editorMosaic = this.inputEditor.editorMosaic;
		this.editorTrim = this.inputEditor.editorTrim;
		this.paddingImage = this.inputEditor.paddingImage;
		this.audioProcess = this.inputEditor.audioProcess;
		this.timeClipping = this.inputEditor.timeClipping;
		this.advertisement = this.inputEditor.advertisement;
	};
	
	this.SetType = function(type) {
		var $type = $(JS_INPUT_TYPE, this.dom);
		$type.val(type);
		$type.change();
	};
	
	this.SetProtocol = function(protocol) {
		if(protocol == null) return;
		var $protocol = $(JS_INPUT_PROTOCOL, this.dom);
		$protocol.val(protocol);
		$protocol.change();
	};

	this.SetURI = function(uri) {
		var $dom = $(JS_INPUT_URI, this.dom);
		$dom.val(uri);
		$dom.change();
	};
	
	this.GetURI = function() {
		var inputType = this.GetInputType();
		if(inputType == INPUT_TYPE_SDI 
				|| inputType == INPUT_TYPE_CVBS
				|| inputType == INPUT_TYPE_HDMI
				|| inputType == INPUT_TYPE_ASI
				|| inputType == INPUT_TYPE_AES_EBU) {
			uri = this.GetValueByJS(JS_INPUT_PORT);
		} else {
			uri = this.GetValueByJS(JS_INPUT_URI);
		}
		return uri;
	};
	
	this.GetOldURI = function() {
		return this.oldUri;
	};
	
	this.GetEth = function() {
		var $eth = $(JS_INPUT_SRC_IP, this.dom);
		if($eth.length == 0) return null;
		
		return $eth.val();
	};
	
	this.BindOption = function() {
		var context = this;
		var $input = $(this.dom);
		
		$(JS_INPUT_PREVIEW_TRIGGER, this.dom).unbind("click").click(function() {
			var canPreview = context.checkProtocolAndUri();
			if(canPreview){
				context.ShowInputPreview();
			}else{
				alert(str_preview.protocal);
			}
		});
		
		var $openFileArr = $(JS_OPEN_FILE_TRIGGER, this.dom); 
		$openFileArr.click(function() {
			var inputType = context.GetInputType();
			if(inputType == INPUT_TYPE_BD || inputType == INPUT_TYPE_DVD) {
				g_InputBDSelector.SetOnOK(function(key) {
					$(JS_INPUT_URI, context.dom).val(key).change();
				});
				g_InputBDSelector.Show();
			} else {
				g_InputFileView.SetOnOK(function(key) {
					$(JS_INPUT_URI, context.dom).val(key).change();
				});
				g_InputFileView.Show();
			}
		});
		
		$(JS_INPUT_OPEN_SDP_TRIGGER, this.dom).click(function() {
			g_InputFileView.SetOnOK(function(key) {
				$(JS_INPUT_SDP_URI, context.dom).val(key).change();
			});
			g_InputFileView.Show();
		});
		
		$(JS_INPUT_URI, this.dom).change(function() {
			context.ClearEditorInfo();
			context.UpdateProgramEditor();
			context.UpdateSupportEditor();
			context.UpdateVideoRtpUri();
			g_taskSupport.OnInputChanged(context);
			context.oldUri = this.value;
		});
		
		$(JS_INPUT_SRC_IP, this.dom).change(function() {
			context.UpdateProgramEditor();
		});
		
		$(JS_INPUT_4K, this.dom).change(function() {
			context.UpdateProgramEditor();
		});
		
		$(JS_INPUT_PROTOCOL, this.dom).change(function() {
			context.oldUri = $(JS_INPUT_URI, context.dom).val();
			
			context.UpdateURI();
			context.UpdateOpenFileTrigger();
			context.UpdateInputInfo();
			context.UpdateAllowProgramIdChange();
			context.updateLiveSyncMode();
			context.updateFillLostTime();
			context.UpdateFillType();
			context.UpdateSupportEditor();
			context.UpdateAlternateURI();
			context.UpdatePreviewTrigger();
			context.UpdateProgramEditor();
			context.UpdateESOverRTP();
			context.UpdateVideoRtpUri();
			
			$(JS_INPUT_URI, context.dom).change();
		});
		
		$(JS_INPUT_PORT, this.dom).change(function() {
			context.UpdateProgramEditor();
		});
		
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.UpdateInputSettingByType = function() {
		var $input = $(this.dom);
		var inputType = $(JS_INPUT_TYPE, this.dom).first().val();
		var $special = $(JS_INPUT_SEPCIAL_OPTION, this.dom);
		if($special.length != 0 && $special.attr("id") == inputType) return;
		
		var tmp = null;
		if(inputType == INPUT_TYPE_NETWORK) {
			tmp = $(JS_NETWORK_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_FILE ) {
			tmp = $(JS_LOCALFILE_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_BD) {
			tmp = $(JS_BD_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_DVD) {
			tmp = $(JS_DVD_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_P2) {
			tmp = $(JS_P2_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_OSS) {
			tmp = $(JS_OSS_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_SDI) {
			tmp = $(JS_SDI_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_CVBS) {
			tmp = $(JS_CVBS_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_HDMI) {
			tmp = $(JS_HDMI_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_AES_EBU) {
			tmp = $(JS_AES_EBU_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_ASI) {
			tmp = $(JS_ASI_TEMPLATE).clone();
		} else if(inputType == INPUT_TYPE_COMBINATION) {
			tmp = $(JS_COMBINATION_TEMPLATE).clone();
		} else {
			return;
		}
		
		var $inputOption = $input.find(JS_INPUT_OPTION).first();
		$inputOption.empty();
		$inputOption.append(tmp.get(0));
		tmp.show();
		this.LicenseControl();
	};
	
	this.UpdateRuntimeSupport = function() {
		var inputType = this.GetInputType();
		var protocol = $(JS_INPUT_PROTOCOL, this.dom).val();
		var taskAction = g_taskSupport.getActionType();
		if(taskAction == "runtime") {
			$(".InputRuntimeNotSupport", this.dom).hide();
			$(".InputRuntimeSupport", this.dom).show();
			
			if(inputType == INPUT_TYPE_NETWORK
				&& protocol == INPUT_PROTOCOL_TSOVERUDP ) {
			}
			else {
				$(".AllowProgramIdChangeItem", this.dom).hide();
			}
		}
	};
	
	this.UpdateInputNote = function() {
		var inputType = this.GetInputType();
		if(inputType == INPUT_TYPE_AES_EBU) {
			$(JS_INPUT_NOTE, this.dom).text(str_input.aes_ebu_note);
		} else {
			$(JS_INPUT_NOTE, this.dom).text("");
		}
	};
	
	this.UpdateType = function() {
		var $type = $(JS_INPUT_TYPE, this.dom);
		if($type.length == 0) return;
		var typeArr = inputData.getTypeArray();
		uUpdateSelect($type.get(0), typeArr);
	};
	
	this.UpdateFailoverTime = function() {
		var ft = $(JS_INPUT_FAILOVER_TIME, this.dom).val();
		ft = parseInt(ft);
		if(isNaN(ft)) ft = 0;
		var fts = ft/1000;
		$(JS_INPUT_FAILOVER_TIME_SECOND, this.dom).val(fts);
	};
	
	this.SyncFailoverTime = function() {
		var fts = $(JS_INPUT_FAILOVER_TIME_SECOND, this.dom).val();
		fts = parseInt(fts);
		if(isNaN(fts)) fts = 0;
		var ft = fts*1000;
		$(JS_INPUT_FAILOVER_TIME, this.dom).val(ft);
	};
	
	this.UpdateInputFormat = function() {
		var $format = $(JS_INPUT_FORMAT, this.dom);
		if($format.length == 0) return;
		var arr = inputData.getInputFormat();
		uUpdateSelect($format.get(0), arr);
	};
	
	this.UpdateProtocol = function() {
		var $protocol = $(JS_INPUT_PROTOCOL, this.dom);
		if($protocol.length == 0) return;
		var protocolArr = inputData.getProtocolArray();
		uUpdateSelect($protocol.get(0), protocolArr);
	};
	
	this.UpdateURI = function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_NETWORK) return;
		var $uri = $(JS_INPUT_URI, this.dom);
		var uri = $uri.val();
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		var head = inputData.getProtocolHead(protocol);

		if(uri.match(/^\s*$/)) {
			if(protocol == INPUT_PROTOCOL_ESOVERRTP) {
			}
			else {
				$uri.val(head);
			}
		}
		else if(uri.match(/^\//)) {
			if(protocol == INPUT_PROTOCOL_ESOVERRTP) {
			}
			else {
				uri = uri.substr(1);
				$uri.val(head + uri);
			}
		}
		else if(uri.match(/^\w+:\/\//)) {
			if(protocol == INPUT_PROTOCOL_ESOVERRTP) {
				var pos = uri.search(/\/\//);
				uri = uri.substr(pos+2);
				if(uri.length == 0) {
					$uri.val("");
				} else {
					$uri.val("/" + uri);
				}
			}
			else {
				var pos = uri.search(/\/\//);
				uri = uri.substr(pos+2);
				$uri.val(head + uri);
			}
		}
	};
	
	this.UpdateOpenFileTrigger = function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_NETWORK) return;
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		
		if(protocol == INPUT_PROTOCOL_ESOVERRTP) {
			$(".OpenFileBtn", this.dom).show();
		} else {
			$(".OpenFileBtn", this.dom).hide();
		}
	};
	
	this.UpdateInputInfo = function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_NETWORK) return;
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		
		if(protocol == INPUT_PROTOCOL_ESOVERRTP) {
			$(".InputInfoLabel", this.dom).text(str_input.input_sdp);
		} else {
			$(".InputInfoLabel", this.dom).text("");
		}
	};
	
	this.UpdateAllowProgramIdChange = function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_NETWORK) return;
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		
		var $dom = $(JS_INPUT_ALLOW_PROGRAM_ID_CHANGE, this.dom);
		if($dom.length > 0) {
			if(protocol == INPUT_PROTOCOL_TSOVERUDP) {
				$dom.get(0).disabled = false;
			} else {
				$dom.get(0).disabled = true;
				$dom.get(0).checked = false;
			}
		}
	};
	
	this.UpdateFillType = function() {
		var arr = inputData.getFillType();
		uUpdateSelect($(JS_INPUT_FILL_TYPE, this.dom).get(0), arr);
	}
	
	this.checkProtocolAndUri = function(){
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_NETWORK) return true;

		return this.MatchProtocol();
	};
	
	this.MatchProtocol = function() {
		var protocolType = this.GetValueByJS(JS_INPUT_PROTOCOL);
		var uri = this.GetURI();
		var pHead = inputData.getProtocolHead(protocolType);
		pHead = pHead.toLowerCase();
		var uHead = uGetProtocol(uri);
		uHead = uHead.toLowerCase() + "://";
		
		if(pHead.match(uHead)) {
			return true;
		} else {
			return false;
		}
	};
	
	this.InitProgramEditor = function() {
		var context = this;
		this.programEditor = new ProgramEditor();
		this.programEditor.Init($(JS_PROGRAM_EDITOR, this.dom).get(0));
		
		var inputInfo = {};
		inputInfo.type = this.GetInputType();
		inputInfo.uri = this.GetURI();
		inputInfo.eth = this.GetEth();
		if(inputInfo.type == INPUT_TYPE_SDI) {
			if(GetValueByJS($(JS_INPUT_4K, this.dom)) == "1") {
				inputInfo.sdi4k = true;
			}
		}
		
		this.programEditor.SetInputInfo(inputInfo);
		//merged from cloudtranscoder
		this.programEditor.SetOnMediaInfoChanged(function(mediaInfo){
			g_taskSupport.OnMediaInfoChanged(mediaInfo);
		});
		
		var inputType = this.GetInputType();
		if( inputType == INPUT_TYPE_SDI
				|| inputType == INPUT_TYPE_CVBS
				|| inputType == INPUT_TYPE_HDMI
				|| inputType == INPUT_TYPE_AES_EBU) {
			this.programEditor.ShowProgramLine(false);
		}
		
		if( inputType == INPUT_TYPE_DVD) {
			this.programEditor.ShowAngle(true);
		} else {
			this.programEditor.ShowAngle(false);
		}
		
		if(inputType == INPUT_TYPE_FILE
				|| inputType == INPUT_TYPE_SDI) {
			this.programEditor.showAudioChannel(true);
		}
		else {
			this.programEditor.showAudioChannel(false);
		} 
		
		if(VerifyURI(inputInfo.uri, inputInfo.type)) {
			this.programEditor.RequestMediaInfo(inputInfo, function() {
				context.initRequestFinised = true;
			});
		}
		else {
			this.initRequestFinised = true;
		}
	};
	
	this.UpdateProgramEditor = function(bReserveOld) {
		if(bReserveOld == null || !bReserveOld) {
			this.programEditor.ClearExProgramList();
		}
		var inputInfo = {};
		inputInfo.type = this.GetInputType();
		inputInfo.uri = this.GetURI();
		inputInfo.eth = this.GetEth();
		if(inputInfo.type == INPUT_TYPE_SDI) {
			if(GetValueByJS($(JS_INPUT_4K, this.dom)) == "1") {
				inputInfo.sdi4k = true;
			}
		}

		if(inputInfo.type == INPUT_TYPE_SDI
				|| inputInfo.type == INPUT_TYPE_CVBS
				|| inputInfo.type == INPUT_TYPE_HDMI
				|| inputInfo.type == INPUT_TYPE_AES_EBU) {
			this.programEditor.ShowProgramLine(false);
		}
		
		if(inputInfo.type == INPUT_TYPE_DVD) {
			this.programEditor.ShowAngle(true);
		} else {
			this.programEditor.ShowAngle(false);
		}
		
		if(VerifyURI(inputInfo.uri, inputInfo.type)) {
			this.programEditor.RequestMediaInfo(inputInfo);
		}
	};
	
	this.UpdateMediaInfo = function() {
		this.UpdateProgramEditor();
		
		if(this.alternateURIContainer != null) {
			this.alternateURIContainer.UpdateMediaInfo();
		}
		
		if(this.candidateSdi != null) {
			this.candidateSdi.UpdateMediaInfo();
		}
	};
	
	this.InitAlternateURI = function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_NETWORK) return;
		
		this.alternateURIContainer = new AlternateURIContainer();
		this.alternateURIContainer.Init($(JS_ALTERNATE_URI_CONTAINER, this.dom).get(0));
	};
	
	this.InitCandidateSdi = function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_SDI) return;
		
		this.candidateSdi = new CandidateSdi();
		this.candidateSdi.Init($(JS_CANDIDATE_SDI_CONTAINER, this.dom).get(0));
	};
	
	this.InitJoinedSetting = function() {
		var inputType = this.GetInputType();
		if(inputType == INPUT_TYPE_FILE
			|| inputType == INPUT_TYPE_SDI) {
			this.joinedSetting = new JoinedSetting();
			this.joinedSetting.setInputType(inputType);
			this.joinedSetting.Init($(JS_JOINED_SETTING, this.dom).get(0));
			this.joinedSetting.showAudioChannel(true);
		}
	};
	
	this.UpdateAlternateURI = function() {
		if(this.alternateURIContainer == null) return;
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		var display = false;
		if(protocol == INPUT_PROTOCOL_TSOVERUDP
				&& GetLicense(license.INPUT_NETWORK_TSOVERUDP_BACKUP) == license.ENABLED) {
			display = true;
		}
		else if(protocol == INPUT_PROTOCOL_ESOVERRTP
				&& GetLicense(license.INPUT_NETWORK_ESOVERRTP_BACKUP) == license.ENABLED) {
			display = true;
		}
		else if(protocol == INPUT_PROTOCOL_HTTP
				&& GetLicense(license.INPUT_NETWORK_HTTP_BACKUP) == license.ENABLED) {
			display = true;
		}
		else if(protocol ==  INPUT_PROTOCOL_RTSP
				&& GetLicense(license.INPUT_NETWORK_RTSP_BACKUP)== license.ENABLED) {
			display = true;
		}
		else if(protocol ==  INPUT_PROTOCOL_RTMP
				&& GetLicense(license.INPUT_NETWORK_RTMP_BACKUP) == license.ENABLED) {
			display = true;
		}
		
		this.alternateURIContainer.Display(display);
	};
	
	this.UpdateESOverRTP = function() {
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		if(protocol == INPUT_PROTOCOL_ESOVERRTP) {
			$(JS_INPUT_ESOVERRTP_SETTING, this.dom).show();
		} else {
			$(JS_INPUT_ESOVERRTP_SETTING, this.dom).hide();
		}
	};
	
	this.RequestSrcIP = function() {
		if($(JS_INPUT_SRC_IP, this.dom).length == 0) return;
		
		var context = this;
		var url = "listIfaces";
		var param = {"ethType": "input"};
		if(g_params_listIfaces != null) {
			$.extend(param, param, g_params_listIfaces);
		}
		$.post(url, param, function(data) {
			var list = uParseServerIP(data);
			var $srcIP = $(JS_INPUT_SRC_IP, context.dom);
			uUpdateSelect($srcIP.get(0), list);
			/*var itemValue = $(JS_INPUT_SRC_IP_DOWN, context.dom).val();
			uSelectItem($srcIP.get(0), itemValue);*/
		});
	};
	
	this.UpdateSupportEditor = function(){
		var inputType = this.GetInputType();
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		if(protocol == null) protocol = "*";
		var bSupport = true;
		
		bSupport = this.getTimeClipSupport(inputType, protocol);
		this.timeClipping.SetSupport(bSupport);
		
		bSupport = this.getAdvertisementSupport(inputType, protocol);
		this.advertisement.SetSupport(bSupport);
		
		bSupport = this.getPaddingSupport(inputType, protocol);
		this.paddingImage.SetSupport(bSupport);
		
		this.audioProcess.SetSupport(true);
	};
	
	this.UpdateVideoRtpUri = function() {
		var $vru = $(JS_INPUT_VIDEO_RTP_URI, this.dom);
		if($vru.length == 0) return;
		
		var uri = this.GetURI();
		$vru.val(uri);
	};
	
	this.ClearEditorInfo = function() {
		this.editorMosaic.RestoreMosaicInfo();
		this.editorTrim.RestoreTrimInfo();
		this.timeClipping.RestoreTimeClipping();
		this.advertisement.ClearItems();
		this.advertisement.ClearPadding();
	};
	
	this.GetMosaicList = function() {
		return this.editorMosaic.GetMosaicList();
	};
	
	this.SetMosaicList = function(o) {
		this.editorMosaic.SetMosaicList(o);
	};
	
	this.GetTrimInfo = function() {
		return this.editorTrim.GetTrimInfo();
	};
	
	this.SetTrimInfo = function(o) {
		return this.editorTrim.SetTrimInfo(o);
	};
	
	this.GetAdvertisementList = function() {
		return this.advertisement.GetItemList();
	};
	
	this.ValidateTrimInfo = function(trim) {
		if(trim.enable == ENABLE_FALSE) return true;
		if(trim.x < 0 || trim.y < 0) return false;
		var mediaInfo = this.GetMediaInfo();
		if(mediaInfo == null || mediaInfo.video == null) return true;
		var arr = mediaInfo.video.resolution.match(/\d+/g);
		var width = 0;
		var height = 0;
		if(arr != null && arr.length == 2) {
			width = arr[0];
			height = arr[1];
		}
		if(trim.x + trim.width > width || trim.y + trim.height > height) {
			return false;
		}
		return true;
	};
	
	this.GetTimeClippingInfo = function() {
		return this.timeClipping.GetTimeClippingInfo();
	};
	
	this.SetTimeClippingInfo = function(o) {
		this.timeClipping.SetTimeClippingInfo(o);
	};
	
	this.GetTimesliceList = function() {
		return this.timeClipping.GetTimesliceList();
	};
	
	this.SetTimesliceList = function(array) {
		this.timeClipping.SetTimesliceList(array);
	};
	
	this.GetInputType = function() {
		return $(JS_INPUT_TYPE, this.dom).val();
	};
	
	this.GetAudioJoinedList = function() {
		var inputType = this.GetInputType();
		if(!(inputType == INPUT_TYPE_FILE
			|| inputType == INPUT_TYPE_SDI)){
			return null;
		}
		
		if(this.joinedSetting == null) return null;
		var arr = this.joinedSetting.GetJoinedList();
		if(arr != null && arr.length > 0) {
			var o = {key: "0", value: "0"};
			arr.unshift(o);
		}
		
		return arr;
	};
	
	//add for cloudtransocder
	this.SetJoinedList = function(joinedList) {
		if(this.joinedSetting != null) {
			this.joinedSetting.SetJoinedList(joinedList, true);
		}			
	};
	
	//add for cloudtransocder
	this.GetJoinedList = function(){
		if(this.joinedSetting == null) return null;
		return this.joinedSetting.GetJoinedList();
	};
	
	this.copyDownProgramId = function() {
		if(!g_taskSupport.isCopy()) return;
		if(this.initRequestFinised) return;
		
		var key = $(JS_INPUT_PROGRAM_ID_DOWN, this.dom).val();
		addSelect($(JS_INPUT_PROGRAM_ID, this.dom).get(0), key);
		
		key = $(JS_INPUT_AUDIO_TRACK_ID_DOWN, this.dom).val();
		addSelect($(JS_INPUT_AUDIO_TRACK_ID, this.dom).get(0), key);
		
		key = $(JS_INPUT_SUBTITLE_ID_DOWN, this.dom).val();
		addSelect($(JS_INPUT_SUBTITLE_ID, this.dom).get(0), key);
	};
	
	/* XML submit */
	this.GetValueByJS = function(selector) {
		if(this.dom == null) return;
		var value = null;
		var $sel = $(selector, this.dom);
		if($sel.attr('type') == "checkbox") {
			if($sel.get(0).checked) {
				value = $sel.val();
			} 
		} else {
			value = $sel.val();
		}
		return value;
	};
	
	this.GetValueInXML = function(selector) {
		var value = this.GetValueByJS(selector);
		if(value == null || value.length == 0) {
			if(selector == JS_INPUT_PROGRAM_ID || selector == JS_INPUT_AUDIO_TRACK_ID
					|| selector == JS_INPUT_SUBTITLE_ID) {
				value = "-1";
			}
		}
		return value;
	};
	
	this.GetInputTag = function() {
		var value = this.GetInputType();
		var tag = uGetMapValue(typeTagMap, value);
		return tag;
	};
	
	/** xml : XMLWriter object**/
	this.XML = function(xml) {
		this.SyncFailoverTime();
		
		var tag = this.GetInputTag();
		xml.BeginNode(tag);
	
		var inputType = this.GetInputType();
		var tagMap = defaultTagMap;
		if(inputType == INPUT_TYPE_FILE) {
			tagMap = fileTagMap;
		} else if(inputType == INPUT_TYPE_SDI) {
			tagMap = sdiTagMap;
		} else if(inputType == INPUT_TYPE_CVBS) {
			tagMap = sdiTagMap;
		} else if(inputType == INPUT_TYPE_HDMI) {
			tagMap = sdiTagMap;
		} else if(inputType == INPUT_TYPE_AES_EBU) {
			tagMap = sdiTagMap;
		} else if(inputType == INPUT_TYPE_ASI) {
			tagMap = asiTagMap;
		} else if(inputType == INPUT_TYPE_BD) {
			tagMap = bdTagMap;
		} else if(inputType == INPUT_TYPE_DVD) {
			tagMap = bdTagMap;
		} else if(inputType == INPUT_TYPE_P2) {
			tagMap = p2TagMap;
		} else if(inputType == INPUT_TYPE_OSS) {
			tagMap = ossTagMap;
		} else if(inputType == INPUT_TYPE_NETWORK) {
			tagMap = networkTagMap;
		} else if(inputType == INPUT_TYPE_COMBINATION) {
			tagMap = fileTagMap;
		} else {
			return;
		}
		
		var len = tagMap.length;
		var value = "";
		for(var i = 0; i < len; i++) {
			value = this.GetValueInXML(tagMap[i].value);
			if(value == null) continue;
			xml.Node(tagMap[i].key, value);
		}
		
		if(inputType == INPUT_TYPE_BD || inputType == INPUT_TYPE_DVD || inputType == INPUT_TYPE_P2) {
			this.programEditor.XML(xml);
		}
		
		if(this.alternateURIContainer != null) {
			this.alternateURIContainer.XML(xml);
		}
		
		if(this.candidateSdi != null) {
			this.candidateSdi.XML(xml);
		}
		
		if(this.joinedSetting != null) {
			this.joinedSetting.XML(xml);
		}
		
		//preprocesser
		xml.BeginNode(TAG_INPUT_PREPROCESSOR);
			this.editorMosaic.XML(xml);		
			this.editorTrim.XML(xml);
			this.timeClipping.XML(xml);
			this.advertisement.XML(xml);
			this.paddingImage.XML(xml);
			this.audioProcess.XML(xml);
		xml.EndNode();
		
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
		if(this.fieldIndex == undefined) {
			field = this.prefixField + this.myField + ".";
		} else {
			field = this.prefixField + this.myField + "[" + this.fieldIndex + "].";
		}
		return field;
	};
	
	this.UpdateElementName = function() {
		this.SyncFailoverTime();
		this.copyDownProgramId();
		
		var fieldMap = null;
		var inputType = this.GetInputType();
		if(inputType == INPUT_TYPE_BD || inputType == INPUT_TYPE_DVD || inputType == INPUT_TYPE_P2) {
			fieldMap = bdFieldMap;
		} else {
			fieldMap = fileFieldMap;
		}
		
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
		
		if(this.alternateURIContainer != null) {
			this.alternateURIContainer.SetPrefixField(fullField);
			this.alternateURIContainer.UpdateElementName();
		}
		
		if(this.candidateSdi != null) {
			this.candidateSdi.SetPrefixField(fullField);
			this.candidateSdi.UpdateElementName();
		}
		
		if(this.joinedSetting != null) {
			this.joinedSetting.SetPrefixField(fullField);
			this.joinedSetting.UpdateElementName();
		}
		
		if(this.programEditor != null) {
			this.programEditor.SetPrefixField(fullField);
			this.programEditor.UpdateElementName();
		}
		
		//mosaic
		this.editorMosaic.SetPrefixField(fullField);
		this.editorMosaic.UpdateElementName();
		
		//trim
		this.editorTrim.SetPrefixField(fullField);
		this.editorTrim.UpdateElementName();
		
		//time clipping
		this.timeClipping.SetPrefixField(fullField);
		this.timeClipping.UpdateElementName();
		
		//advertisement
		this.advertisement.SetPrefixField(fullField);
		this.advertisement.UpdateElementName();
		
		this.paddingImage.SetPrefixField(fullField);
		this.paddingImage.UpdateElementName();
		
		this.audioProcess.SetPrefixField(fullField);
		this.audioProcess.UpdateElementName();
	};
	/* Field operate end */
	
	//static function
	function VerifyURI(uri, inputType) {
		if(uri == null) return false;
		if(uri.length < 1) return false;
		if(inputType == INPUT_TYPE_NETWORK) {
			var pos = uri.indexOf("://");
			if(pos == -1) {
			}
			else {
				var path = uri.substr(pos+3);
				if(path.length <= 0) return false;
			}
		}
		return true;
	};
	
	function CheckMediaInfoValue(inputString) {
		var value = parseFloat(inputString);
		if(isNaN(value)) {
			value = "";
		} else if(value < 1) {
			value = "";
		} else {
			value = String(value);
		}
		return value;
	};
	
	function EmptySelect(domSelect) {
		if(domSelect == undefined) return;
		domSelect.options.length = 0;
	};
	
	function addSelect(domSelect, key, value) {
		if(domSelect == null) return;
		domSelect.disabled = false;
		var varItem = new Option(value, key);      
		domSelect.options.add(varItem);
		domSelect.selectedIndex = domSelect.options.length - 1;
	}
}

InputSupport.prototype = {
	timeClipSupport : [
		//key:[input type, protocol], value: supported
		{key: [INPUT_TYPE_FILE, "*"], value: true},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_TSOVERUDP], value: false},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_ESOVERRTP], value: false},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_HTTP], value: true},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_RTSP], value: false},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_RTMP], value: false},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_FTP], value: true},
		{key: [INPUT_TYPE_SDI, "*"], value: false},
		{key: [INPUT_TYPE_CVBS, "*"], value: false},
		{key: [INPUT_TYPE_HDMI, "*"], value: false},
		{key: [INPUT_TYPE_AES_EBU, "*"], value: false},
		{key: [INPUT_TYPE_ASI, "*"], value: false},
		{key: [INPUT_TYPE_BD, "*"], value: true},
		{key: [INPUT_TYPE_DVD, "*"], value: true},
		{key: [INPUT_TYPE_P2, "*"], value: true},
		],
		
	advertisementSupport : [
   		//key:[input type, protocol], value: supported
   		{key: [INPUT_TYPE_FILE, "*"], value: true},
   		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_TSOVERUDP], value: false},
   		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_ESOVERRTP], value: false},
   		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_HTTP], value: true},
   		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_RTSP], value: false},
   		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_RTMP], value: false},
   		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_FTP], value: true},
   		{key: [INPUT_TYPE_SDI, "*"], value: false},
   		{key: [INPUT_TYPE_CVBS, "*"], value: false},
   		{key: [INPUT_TYPE_HDMI, "*"], value: false},
   		{key: [INPUT_TYPE_AES_EBU, "*"], value: false},
   		{key: [INPUT_TYPE_ASI, "*"], value: false},
   		{key: [INPUT_TYPE_BD, "*"], value: true},
   		{key: [INPUT_TYPE_DVD, "*"], value: true},
   		{key: [INPUT_TYPE_P2, "*"], value: true},
   		],
   		
   	paddingSupport : [
		//key:[input type, protocol], value: supported
		{key: [INPUT_TYPE_FILE, "*"], value: false},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_TSOVERUDP], value: true},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_ESOVERRTP], value: false},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_HTTP], value: true},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_RTSP], value: false},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_RTMP], value: true},
		{key: [INPUT_TYPE_NETWORK, INPUT_PROTOCOL_FTP], value: false},
		{key: [INPUT_TYPE_SDI, "*"], value: true},
		{key: [INPUT_TYPE_CVBS, "*"], value: false},
		{key: [INPUT_TYPE_HDMI, "*"], value: false},
		{key: [INPUT_TYPE_AES_EBU, "*"], value: false},
		{key: [INPUT_TYPE_ASI, "*"], value: false},
		{key: [INPUT_TYPE_BD, "*"], value: false},
		{key: [INPUT_TYPE_DVD, "*"], value: false},
		{key: [INPUT_TYPE_P2, "*"], value: true},
		],
		
	getUriAsName: function() {
		var inputType = this.GetInputType();
		if(inputType == INPUT_TYPE_SDI 
				|| inputType == INPUT_TYPE_CVBS
				|| inputType == INPUT_TYPE_HDMI
				|| inputType == INPUT_TYPE_ASI
				|| inputType == INPUT_TYPE_AES_EBU) {
			uri = inputType;
		} else {
			uri = this.GetValueByJS(JS_INPUT_URI);
		}
		
		if(inputType == INPUT_TYPE_FILE) {
			var pos = uri.lastIndexOf("/");
			uri = uri.substr(pos+1);
		}
		
		return uri;
	},
	
	updateLiveSyncMode : function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_NETWORK) return;
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		
		var $dom = $(JS_INPUT_LIVE_SYNC_MODE, this.dom);
		if($dom.length > 0) {
			if(protocol == INPUT_PROTOCOL_RTMP) {
				$dom.get(0).disabled = false;
			} else {
				$dom.get(0).disabled = true;
				$dom.get(0).checked = false;
			}
		}
	},
	
	updateFillLostTime : function() {
		var inputType = this.GetInputType();
		if(inputType != INPUT_TYPE_NETWORK) return;
		/*
		var $dom = $(JS_FILL_LOST_TIME, this.dom);
		var protocol = this.GetValueByJS(JS_INPUT_PROTOCOL);
		if(protocol == INPUT_PROTOCOL_RTMP) {
			setInputText($dom.get(0), null, false);
		} else {
			setInputText($dom.get(0), "", true);
		}*/
	},
	
	getTimeClipSupport: function(inputType, protocol) {
		var key = [inputType, protocol];
		return uGetMapValue(this.timeClipSupport, key);
	},
	
	getAdvertisementSupport: function(inputType, protocol) {
		var key = [inputType, protocol];
		return uGetMapValue(this.advertisementSupport, key);
	},
	
	getPaddingSupport: function(inputType, protocol) {
		var key = [inputType, protocol];
		return uGetMapValue(this.paddingSupport, key);
	},
}