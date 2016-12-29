var CLIP_MODE_OUTSIDE = "1";
var CLIP_MODE_INSIDE = "0";

function IP_OnBoxChanged(left, top, right, bottom) {
	g_InputPreview.OnBoxChanged(left, top, right, bottom);
}

function IP_OnTimeChanged(time) {
	g_InputPreview.OnTimeChanged(time);
}

function InputPreview() {
	/** my selector **/
	var JS_PREVIEW_MOSAIC_ITEM_TMPL = "#PreviewMosaicTmpl";
	var JS_PREVIEW_TIMESLICE_TMPL = "#PreviewTimesliceTmpl";
	var JS_PREVIEW_TEMPLATE = "#InputPreviewTemplate";
	var JS_PREVIEW_PLAYER = "#ArcSoft_TMPlayer";
	var JS_PLAYER_CONTAINER = ".TMPlayerContainer";
	var JS_PREPROCESS_TAB = ".PreprocessTab";
	var JS_PROCESS_PAGE = ".ProcessPage";
	var JS_PRE_FRAME_TRIGGER = ".PreFrameTrigger";
	var JS_NEXT_FRAME_TRIGGER = ".NextFrameTrigger";
	var JS_PREVIEW_MOSAIC_TRIGGER = ".PreviewMosaicTrigger";
	var JS_PREVIEW_TRIM_TRIGGER = ".PreviewTrimTrigger";
	var JS_PREVIEW_CLIP_TRIGGER = ".PreviewClipTrigger";
	var JS_PREVIEW_ADVERTISEMENT_TRIGGER = ".PreviewAdvertisementTrigger";
	var JS_VALUE_CHANGER = ".ValueChanger";
	var JS_SELECT_BOX_TRIGGER = ".SelectBoxTrigger";
	var JS_TRIM = ".TabTrim";
	
	/*Clip define*/
	var JS_SEEK_HOUR = ".Hour";
	var JS_SEEK_MINUTE = ".Minute";
	var JS_SEEK_SECOND = ".Second";
	var JS_SEEK_MILLISECOND = ".Frame";
	var JS_CLIP_START_TRIGGER = ".ClipStartTrigger";
	var JS_CLIP_END_TRIGGER = ".ClipEndTrigger";
	var JS_JUMP_CLIP_START_TRIGGER = ".JumpClipStartTrigger";
	var JS_JUMP_CLIP_END_TRIGGER = ".JumpClipEndTrigger";
	var JS_SNAPSHOT_TRIGGER = ".SnapshotTrigger";
	var JS_VERIFY_MOSAIC = ".VerifyMosaic";
	var JS_VERIFY_TRIM = ".VerifyTrim";
	var JS_START_POINT_TRIGGER = ".StartPointTrigger";
	var JS_END_POINT_TRIGGER = ".EndPointTrigger";
	var JS_START_SEEK_TRIGGER = ".StartSeekTrigger";
	var JS_END_SEEK_TRIGGER = ".EndSeekTrigger";
	
	//id
	var ID_TAB_MOSAIC = "TabMosaic";
	var ID_TAB_TRIM = "TabTrim";	//range trim
	var ID_TAB_CLIP ="TabTimeClipping";	//time clipping
	
	/* Value Selector*/
	var JS_FRAME_SKIP_NUMBER = "input[name='FrameSkipNumber']";
	var JS_TRIM_ENABLE = "input[name='TrimEnable']";
	var JS_TRIM_X = "input[name='TrimX']";
	var JS_TRIM_Y = "input[name='TrimY']";
	var JS_TRIM_WIDTH = "input[name='TrimWidth']";
	var JS_TRIM_HEIGHT = "input[name='TrimHeight']";
	var JS_LOCAL_PATH = "input[name='LocalPath']";
	var JS_LOCAL_NAME = "input[name='LocalName']";
	
	var clipImageMap = [
		{videoWidth: 180, videoHeight: 135, width: 60, height: 40, imageName: "Scissor_60x40.png"},
		{videoWidth: 720, videoHeight: 480, width: 166, height: 120, imageName: "Scissor_166x120.png"},
		{videoWidth: 1280, videoHeight: 720, width: 360, height: 240, imageName: "Scissor_360x240.png"},
		{videoWidth: 9999, videoHeight: 9999, width: 640, height: 360, imageName: "Scissor_640x360.png"}
		];
	
	var validatorMap = [
		{selector: JS_SEEK_TIME, type: VALIDATOR_TYPE_HMSM, param: {recommend: "0:0:0:0"} }
		];
	
	var Z_INDEX = 10001;
	var PLAYER_WIDTH = 480;
	var PLAYER_HEIGHT = 480;
	
	//DOM
	this.dom = null;
	this.domContent = null;
	this.domPlayer = null;
	this.domMosaicX = null;
	this.domMosaicY = null;
	this.domMosaicW = null;
	this.domMosaicH = null;
	this.domTrimX = null;
	this.domTrimY = null;
	this.domTrimW = null;
	this.domTrimH = null;
	this.domHour = null;
	this.domMinute = null;
	this.domSecond = null;
	this.domMillisecond = null;
	
	this.bg = null;
	this.localURI = null;
	this.inputType = null;
	this.resolutionWidth = null;
	this.resolutionHeight = null;
	this.frameRate = 25; //for windows debug.
	this.aspectRatio = {x: 0, y: 0};
	this.playerMosaicPos = [];	//{x: , y:}
	this.playerTrimPos = {x:0, y: 0};
	this.playerClipPos = [];
	this.tabPreprocessId = null;
	this.fnOnClose = null;
	this.program = {programId: -1, videoId: -1, audioId: -1, subtitleId: -1};
	this.editorMosaic = null;
	this.editorTimeClipping = null;
	this.advertisement = null;
	this.programList = null;
	this.bDeviceStarted = false;
	this.bShow = false;
	this.timer = null;
	
	/** public API **/
	this.Init = function(id) {
		if(id == null) id="InputPreview";
		
		var context = this;
		var $preview = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		$preview.attr('id', id);
		this.dom = $preview[0];
		
		$(JS_DIALOG_HEAD_LINE, this.dom).hide();
		$(JS_BUTTON_CANCEL, this.dom).parent().hide();
		$(JS_LABEL_OK, this.dom).text(str_common.close);
		
		var $content = $(JS_PREVIEW_TEMPLATE);
		this.domContent = $content[0];
		$(JS_DIALOG_CONTAINER, this.dom).append(this.domContent);
		var style = {
			'position':'fixed', 
			'z-index': Z_INDEX,
			'left':'0px',
			'top':'0px'
		};
		$preview.css(style);
		$preview.hide();
		
		this.domTrim = $(JS_TRIM, $content);
		this.domTrimX = $(JS_TRIM_X, $content).get(0);
		this.domTrimY = $(JS_TRIM_Y, $content).get(0);
		this.domTrimW = $(JS_TRIM_WIDTH, $content).get(0);
		this.domTrimH = $(JS_TRIM_HEIGHT, $content).get(0);
		this.domHour = $(JS_SEEK_HOUR, $content).get(0);
		this.domMinute = $(JS_SEEK_MINUTE, $content).get(0);
		this.domSecond = $(JS_SEEK_SECOND, $content).get(0);
		this.domMillisecond = $(JS_SEEK_MILLISECOND, $content).get(0);

		this.editorMosaic = new EditorMosaic();
		this.editorMosaic.Init($(JS_EDITOR_MOSAIC, $content).get(0), JS_PREVIEW_MOSAIC_ITEM_TMPL);
		this.editorMosaic.SetFnNew(onNewMosaicItem);
		
		this.editorTimeClipping = new EditorTimeClipping();
		this.editorTimeClipping.Init($(JS_EDITOR_TIMECLIPPING, $content).get(0), JS_PREVIEW_TIMESLICE_TMPL);
		this.editorTimeClipping.SetFnNew(onNewTimeslice);
		
		this.advertisement = new PreviewAd();
		this.advertisement.Init($(JS_ADVERTISEMENT, $content).get(0));
		
		this.bg = new BackgroundControl();
		this.bg.Init();
		
		this.LicenseControl();
		this.Bind();
		
		RegKeyHandler(function(key) {
			context.OnKeyDown(key);
		});
		
		return this.dom;
	};
	
	this.InitTMPlayer = function() {
		if(this.domPlayer != null) return;
		
		this.domPlayer = Player_Init($(JS_PLAYER_CONTAINER, this.dom).get(0));
		
		if(this.domPlayer != null) {
			uDomAddEvent(this.domPlayer, "SelBoxPosition", IP_OnBoxChanged);
			uDomAddEvent(this.domPlayer, "TimePosition", IP_OnTimeChanged);
		}
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_MOSAIC_INSERTION) != license.ENABLED) {
			$(".TabMosaic", this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_EDITING_CROPPING) != license.ENABLED) {
			$(".TabTrim", this.dom).remove();
			$(this.domTrim).remove();
			this.domTrim = null;
		}
		
		if(GetLicense(license.VIDEO_EDITING_TIMELINE_CUT_TRIM) != license.ENABLED) {
			$(".TabTimeClipping", this.dom).remove();
		}
		
		if(GetLicense(license.VIDEO_EDITING_ADS) != license.ENABLED) {
			$(".TabAdvertisement", this.dom).remove();
		}
		
		$("."+CLASS_UNDERLINE_TRIGGER, this.dom).first().addClass(CLASS_UNDERLINE_ACTIVE);
		
		if(GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_LIVE
				|| GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_MAL) {
			$(".LicenseFrameControl", this.dom).remove();
		}
	};
	
	/**
	 * Show or hide frame operator container.Hide dom when InputURI start with udp://
	 * @param op - value is show or hide.
	 */
	this.UpdatePreviewUI = function(){
		var bSupport = true;
		if(this.inputType == INPUT_TYPE_SDI
				|| this.inputType == INPUT_TYPE_CVBS
				|| this.inputType == INPUT_TYPE_HDMI
				|| this.inputType == INPUT_TYPE_ASI) {
			bSupport = false;
		} else if(this.inputType == INPUT_TYPE_NETWORK) {
			var protocol = uGetProtocol(this.localURI);
			if(protocol == "udp" 
				|| protocol == "rtp" 
				|| protocol == "rtsp"
				|| protocol == "rtmp") {
				bSupport = false;
			} else {
				bSupport = true;
			}
		} else {
			bSupport = true;
		}
		
		var supportDiv = $(JS_SUPPORT, this.domContent);
		var unsupportDiv = $(JS_UNSUPPORT, this.domContent);
		if(bSupport){
			supportDiv.show();
			unsupportDiv.hide();
		}else{
			supportDiv.hide();
			unsupportDiv.show();
		}
	};
	
	this.Show = function() {
		var $preview = $(this.dom);
		this.bg.Show();
		$preview.show();
		var pos = uGetCenterPos($preview.width(), $preview.height());
		$preview.offset({left:pos.x , top:pos.y});
		this.bShow = true;
	};
	
	this.Play = function() {
		this.InitTMPlayer();
		
		if(this.localURI == null) return;
		
		if(this.inputType == INPUT_TYPE_SDI
				|| this.inputType == INPUT_TYPE_CVBS
				|| this.inputType == INPUT_TYPE_HDMI
				|| this.inputType == INPUT_TYPE_ASI) {
			this.StartDevicePreview();
			this.keepAlive();
		}
		else if(this.inputType == INPUT_TYPE_NETWORK 
				&& uGetProtocol(this.localURI) == "udp") {
			this.startUdpPreview();
			this.keepAlive();
		}
		else {
			var _url = URI2HttpURL(this.localURI);
			this.PlayURI(_url);
		}
	};
	
	this.keepAlive = function() {
		var _requestURL = "keepAlivePreview";
		var _param = {};
		if(g_params_preview_action != null) {
			$.extend(_param, _param, g_params_preview_action);
		}
		this.timer = setInterval(function(){
			$.post(_requestURL, _param);
		}, 15000);
	}
	
	/*o = {
	 * uri: ,
	 * size:,
	 * video: {codec: , bitrate: , aspectRatio:, }
	 * audio: {codec:, bitrate:, channel:, samplerate:, bitdepth:}
	 * }*/
	this.SetMediaInfo = function(o) {
		this.ClearMediaInfo();
		
		if(o == null) return ;
		
		this.localURI = o.uri;
		this.inputType = o.inputType;
		
		this.UpdatePreviewUI();
		
		if(o.video != null) {
			this.frameRate = parseFloat(o.video.framerate);
			if(isNaN(this.frameRate) || this.frameRate < 1) {
				this.frameRate = 25;
			}
			
			if(o.video.aspectRatio != null) {
				var aspectArr = o.video.aspectRatio.match(/\d+/g);
				value = parseInt(aspectArr[0]);
				if(isNaN(value)) value = 0;
				this.aspectRatio.x = value;
				value = parseInt(aspectArr[1]);
				if(isNaN(value)) value = 0;
				this.aspectRatio.y = value;
			}
			
			if(o.video.resolution != null) {
				var arr = o.video.resolution.match(/\d+/g);
				value = parseInt(arr[0]);
				if(isNaN(value)) value = 0;
				this.resolutionWidth = value;
				value = parseInt(arr[1]);
				if(isNaN(value)) value = 0;
				this.resolutionHeight = value;
			}
		}
		
		if(o.program != null) {
			this.program.programId = o.program.programId;
			this.program.videoId = o.program.videoId;
			this.program.audioId = o.program.audioId;
			this.program.subtitleId = o.program.subtitleId;
		}
	};
	
	this.ClearMediaInfo = function() {
		this.localURI = "";
		this.inputType = null;
		this.frameRate = 25;
		this.aspectRatio.x = 0;
		this.aspectRatio.y = 0;
		this.program.programId = -1;
		this.program.videoId = -1;
		this.program.audioId = -1;
		this.program.subtitleId = -1;
		this.resolutionWidth = 0;
		this.resolutionHeight = 0;
		this.programList = null;
	};
	
	this.SetProgramList = function(list) {
		this.programList = list;
	};
	
	this.SetOnClose = function(fn) {
		this.fnOnClose = fn;
	};
	
	this.ShowPreprocessTab = function(domTab) {
		if(this.tabPreprocessId == domTab.id) return;
		var $pageArr = $(this.domContent).find(JS_PROCESS_PAGE);
		$pageArr.hide();
		$pageArr.filter("#"+domTab.id).show();
		this.tabPreprocessId = domTab.id;
		this.EndSelectBox();
	};

	this.PlayURI = function(httpURI) {
		if(this.domPlayer == null) return;
		if(this.programList == null) {
			Player_SelectTrack(this.domPlayer, this.localURI, this.program);
		} else {
			Player_AddCompose(this.domPlayer, this.localURI, this.programList);
		}
		
		this.PreviewMosaic();
		this.PreviewTrim();
		this.PreviewClip();
		this.PreviewAdvertisement();
		
		var mediaType = Player_GetMediaType(this.inputType, this.localURI);
		var ret = this.domPlayer.LoadMedia(httpURI, "", mediaType);
		if(ret != 0) return;
		
		var aspectRatioX = 0;
		var aspectRatioY = 0;
		if(this.aspectRatio.x == 0 || this.aspectRatio.y == 0) {
			aspectRatioX = this.domPlayer.GetVideoDisplayWidth();
			aspectRatioY = this.domPlayer.GetVideoDisplayHeight();
		} else {
			aspectRatioX = this.aspectRatio.x;
			aspectRatioY = this.aspectRatio.y;
		}
		
		if(this.resolutionWidth == 0 || this.resolutionHeight == 0) {
			this.resolutionWidth = this.domPlayer.GetVideoWidth();
			this.resolutionHeight = this.domPlayer.GetVideoHeight();
		}
		
		if(aspectRatioX >= aspectRatioY) {
			this.domPlayer.width = PLAYER_WIDTH;
			this.domPlayer.height = PLAYER_WIDTH * aspectRatioY / aspectRatioX;
		} else {
			this.domPlayer.height = PLAYER_HEIGHT;
			this.domPlayer.width = PLAYER_HEIGHT * aspectRatioX / aspectRatioY;
		}
		
		if (ret == 0) ret = this.domPlayer.Play();
	};
	
	/*
	 * duration: +: forward, -: backward
	 * */
	this.SeekFromCurrent = function(duration) {
		if(this.domPlayer == null) return;
		
		var state = this.domPlayer.GetPlayState();
		if(state == STATE_RUNNING) {
			this.domPlayer.Pause();
		} else if(state == STATE_PAUSED || state == STATE_STOPPED) {
		} else {
			return;
		}
		
		var accurate = 1;
		var flag = 2; 
		var mode = accurate * 0x01000000 + flag;
		this.domPlayer.Seek(duration, mode);
	};
	
	this.StepBack = function() {
		if(this.domPlayer == null) return;
		var frame = this.GetValue(JS_FRAME_SKIP_NUMBER);
		frame = parseInt(frame);
		frame = -frame;
		this.StepFrame(frame);
	};
	
	this.StepFrame = function(frame) {
		if(this.domPlayer == null) return;
		
		if(frame == null) {
			frame = this.GetValue(JS_FRAME_SKIP_NUMBER);
			frame = parseInt(frame);
		}

		this.domPlayer.Step(frame);
	};
	
	this.SeekTime = function() {
		if(this.domPlayer == null) return;
		
		var timeText = $(JS_SEEK_TIME, this.dom).val();
		var o = uTimeText2Object(timeText);
		if(o == null) {
			alert(str_warning.needHmsm);
			return;
		}
		
		if(o.ms > this.domPlayer.GetMediaDuration()) {
			alert(str_warning.outOfDuration);
			return;
		}
		
		this.JumpByTimeText(timeText);
	};

	this.RestorePlayer = function() {
		this.domPlayer.ChangeAspectRatio(0, 0, -100, 0);
		this.domPlayer.RemoveComposeTitle(-1);
		this.EndSelectBox();
		this.ClearPlayerMosaic();
		this.ClearPlayerClip();
		this.ClearPlayerTrim();
		this.ClearPlayerAdvertisement();
	};
	
	/*
	 * return {ms:, hour: , minute: , second: , millisecond: }
	 */
	this.GetCurrentTimeObject = function() {
		if(this.domPlayer == null) return;
		var ms = this.domPlayer.GetPlaybackTime();
		if(ms < 0) ms = 0;
		var o = uMs2Hmsm(ms);
		o.ms = ms;
		var text = "{0}:{1}:{2}:{3}";
		o.text = text.format(o.hour, o.minute, o.second, o.millisecond);
		return o;
	};
	
	/* timeText: 'h:m:s:ms' */
	this.JumpByTimeText = function(timeText) {
		var o = uTimeText2Object(timeText);
		
		var accurate = 1;
		var flag = 1; 
		var mode = accurate * 0x01000000 + flag;
		this.domPlayer.Pause();
		this.domPlayer.Seek(o.ms, mode);
	};
		
	/*Clip begin*/
	//o: {enable: "true", mode: "1"}
	this.SetClipInfo = function(o) {
		this.editorTimeClipping.SetTimeClippingInfo(o);
	};
	
	this.GetClipInfo = function() {
		return this.editorTimeClipping.GetTimeClippingInfo();
	};
	
	this.SetClipList = function(array) {
		this.editorTimeClipping.SetTimesliceList(array);
	};
	
	this.GetClipList = function() {
		return this.editorTimeClipping.GetTimesliceList();
	};

	this.GetClipImageInfo = function() {
		var len = clipImageMap.length;
		var i = 0;
		for(i = 0; i < len; i++) {
			if(this.resolutionHeight < clipImageMap[i].videoHeight) {
				break;
			}
		}
		var o = {};
		o.width = clipImageMap[i].width;
		o.height = clipImageMap[i].height;
		o.imageName = clipImageMap[i].imageName;
		o.x = Math.floor((this.resolutionWidth - o.width) / 2);
		o.y = Math.floor((this.resolutionHeight - o.height) / 2);
		
		var pathName = window.location.pathname;
		pathName = pathName.substring(0, pathName.indexOf("/", 1));
		var iconPath = pathName + "/images/icons/" + o.imageName;
		o.uri = window.location.protocol + "//" + window.location.host + iconPath;
		
		return o;
	};
	
	this.ClearPlayerClip = function() {
		if(this.domPlayer == null) return;
		var len = this.playerClipPos.length;
		for(var i = 0; i < len; i++) {
			this.domPlayer.AddCutTime(this.playerClipPos[i], this.playerClipPos[i]);
		};
		this.playerClipPos.length = 0;
	};
	
	this.PreviewClip = function() {
		if(this.domPlayer == null) return;

		var clipInfo = this.GetClipInfo();
		if(clipInfo == null) return;
		if(clipInfo.enable != ENABLE_TRUE) {
			return;
		}
		var mode = 0;
		if(clipInfo.mode != ENABLE_TRUE) mode = 1; 
		var imageInfo = this.GetClipImageInfo();
		this.domPlayer.SetCutTimeImage(imageInfo.uri, imageInfo.x, imageInfo.y, imageInfo.width, imageInfo.height, 
				255, mode);
		
		var clipList = this.GetClipList();
		if(clipList == null) return;
		for(var i = 0; i < clipList.length; i++) {
			this.domPlayer.AddCutTime(clipList[i].startTime, clipList[i].endTime);
			this.playerClipPos[this.playerClipPos.length] = clipList[i].startTime;
		}
	};
	
	this.OnNewTimeslice = function(domTimeslice) {
		var context = this;
		
		$(JS_CLIP_START_TRIGGER, domTimeslice).click(function() {
			var time = context.GetCurrentTimeObject();
			$(JS_TIMESLICE_START, domTimeslice).val(time.text);
		});
		
		$(JS_CLIP_END_TRIGGER, domTimeslice).click(function() {
			var time = context.GetCurrentTimeObject();
			$(JS_TIMESLICE_END, domTimeslice).val(time.text);
		});
		
		$(JS_JUMP_CLIP_START_TRIGGER, domTimeslice).click(function() {
			var time = $(JS_TIMESLICE_START, domTimeslice).val();
			var o = uTimeText2Object(time);
			
			var accurate = 1;
			var flag = 1; 
			var mode = accurate * 0x01000000 + flag;
			context.domPlayer.Pause();
			context.domPlayer.Seek(o.ms, mode);
		});
		
		$(JS_JUMP_CLIP_END_TRIGGER, domTimeslice).click(function() {
			var time = $(JS_TIMESLICE_END, domTimeslice).val();
			var o = uTimeText2Object(time);
			
			var accurate = 1;
			var flag = 1; 
			var mode = accurate * 0x01000000 + flag;
			context.domPlayer.Pause();
			context.domPlayer.Seek(o.ms, mode);
		});
	};
	/*Clip end*/
	
	/*mosaic begin*/
	this.SetMosaicInfo = function(o) {
		this.editorMosaic.SetMosaicInfo(o);
	};
	
	this.GetMosaicInfo = function() {
		return this.editorMosaic.GetMosaicInfo();
	};

	this.SetMosaicList = function(o) {
		this.editorMosaic.SetMosaicList(o);
	};
	
	this.GetMosaicList = function() {
		return this.editorMosaic.GetMosaicList();
	};
	
	this.ClearPlayerMosaic = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.ClearMosaicMask();
		/*for(var i = 0; i < this.playerMosaicPos.length; i++) {
			var o = this.playerMosaicPos[i];
			this.domPlayer.AddMosaicMask(o.x, o.y, 0, 0, 0);
		}
		this.playerMosaicPos.length = 0;*/
	};
	
	this.PreviewMosaic = function() {
		if(this.domPlayer == null) return;

		var o = this.GetMosaicList();
		if(o == null) return;
		for(var i = 0; i < o.length; i++) {
			var mosaic = o[i];
			//this.domPlayer.AddMosaicMask(mosaic.x, mosaic.y, mosaic.width, mosaic.height, mosaic.blur);
			//this.playerMosaicPos.push(mosaic);
			
			var beginTime = 0;
			var endTime = -1;
			if(mosaic.activeTime == ENABLE_TRUE) {
				var time = uTimeText2Object(mosaic.start);
				if(time != null) {
					beginTime = time.ms;
				}
				time = uTimeText2Object(mosaic.end);
				if(time != null) {
					endTime = time.ms;
				}
			}
			this.domPlayer.AddMosaicMaskEx(mosaic.x, mosaic.y, mosaic.width, mosaic.height,
					mosaic.mosaicType, mosaic.blur, beginTime, endTime);
		}
	};
	
	/*
	 * @param: o = {x: , y: , width: , height: }
	 */
	this.UpdateMosaicRange = function(o) {
		this.domMosaicX.value = o.x;
		this.domMosaicY.value = o.y;
		this.domMosaicW.value = o.width;
		this.domMosaicH.value = o.height;
	};
	
	this.VerifyMosaic = function() {
		var o = this.GetMosaicInfo();
		if(o.x > this.resolutionWidth) {
			o.x = 0;
		}
		if(o.x + o.width > this.resolutionWidth) {
			o.width = this.resolutionWidth - o.x;
		}
		if(o.y > this.resolutionHeight) {
			o.y = 0;
		}
		if(o.y + o.height > this.resolutionHeight) {
			o.height = this.resolutionHeight - o.y;
		}
		this.UpdateMosaicRange(o);
	};
	
	this.OnNewMosaicItem = function(domMosaicItem) {
		var context = this;
		$(JS_SELECT_BOX_TRIGGER, domMosaicItem).click(function() {
			context.BeginSelectMosaic(domMosaicItem);
		});

		$(JS_START_POINT_TRIGGER, domMosaicItem).click(function() {
			var time = context.GetCurrentTimeObject();
			$(JS_MOSAIC_START, domMosaicItem).val(time.text);
		});
		
		$(JS_END_POINT_TRIGGER, domMosaicItem).click(function() {
			var time = context.GetCurrentTimeObject();
			$(JS_MOSAIC_END, domMosaicItem).val(time.text);
		});
		
		$(JS_START_SEEK_TRIGGER, domMosaicItem).click(function() {
			var time = $(JS_MOSAIC_START, domMosaicItem).val();
			var o = uTimeText2Object(time);
			
			var accurate = 1;
			var flag = 1; 
			var mode = accurate * 0x01000000 + flag;
			context.domPlayer.Pause();
			context.domPlayer.Seek(o.ms, mode);
		});
		
		$(JS_END_SEEK_TRIGGER, domMosaicItem).click(function() {
			var time = $(JS_MOSAIC_END, domMosaicItem).val();
			var o = uTimeText2Object(time);
			
			var accurate = 1;
			var flag = 1; 
			var mode = accurate * 0x01000000 + flag;
			context.domPlayer.Pause();
			context.domPlayer.Seek(o.ms, mode);
		});
	};
	/*mosaic end*/
	
	/*trim begin*/
	/*return: o={enable: , x: , y: , width: , height: }
	 **/
	this.GetTrimInfo = function() {
		if(this.domTrim == null) return null;
		var o = {};
		o.enable = this.GetValue(JS_TRIM_ENABLE);
		o.x = parseInt(this.domTrimX.value);
		o.y = parseInt(this.domTrimY.value);
		o.width = parseInt(this.domTrimW.value);
		o.height = parseInt(this.domTrimH.value);
		return o;
	};
	
	/*param: o={enable: , x: , y: , width: , height: }
	 */
	this.SetTrimInfo = function(o) {
		if(o == null) return;
		var $content = $(this.domContent);
		if(o.enable == ENABLE_TRUE) {
			$content.find(JS_TRIM_ENABLE).get(0).checked = true;
		} else {
			$content.find(JS_TRIM_ENABLE).get(0).checked = false;
		}
		this.domTrimX.value = o.x;
		this.domTrimY.value = o.y;
		this.domTrimW.value = o.width;
		this.domTrimH.value = o.height;
	};
	
	this.ClearPlayerTrim = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.ApplyMaskout(this.playerTrimPos.x, this.playerTrimPos.y, this.playerTrimPos.x, this.playerTrimPos.y, 0, 0);
		this.playerTrimPos.x = 0;
		this.playerTrimPos.y = 0;
	};
	
	this.PreviewTrim = function() {
		if(this.domPlayer == null) return;
		
		var trim = this.GetTrimInfo();
		if(trim == null) return;
		if(trim.enable != ENABLE_TRUE) {
			this.ClearPlayerTrim();
			return;
		}
		
		if(this.resolutionWidth < trim.x+trim.width) {
			var text = str_warning.outOfWidth.format(this.resolutionWidth);
			alert(text);
			return;
		}
		if(this.resolutionHeight < trim.y+trim.height) {
			var text = str_warning.outOfHeight.format(this.resolutionHeight);
			alert(text);
			return;
		}
		
		this.domPlayer.ApplyMaskout(trim.x, trim.y, trim.x+trim.width, trim.y+trim.height, 127, 0xffffff);
		this.playerTrimPos.x = trim.x;
		this.playerTrimPos.y = trim.y;
	};
	
	/*
	 * @param: o = {x: , y: , width: , height: }
	 */
	this.UpdateTrimRange = function(o) {
		this.domTrimX.value = o.x;
		this.domTrimY.value = o.y;
		this.domTrimW.value = o.width;
		this.domTrimH.value = o.height;
	};
	
	this.VerifyTrim = function() {
		var o = this.GetTrimInfo();
		if(o.x > this.resolutionWidth) {
			o.x = 0;
		}
		if(o.x + o.width > this.resolutionWidth) {
			o.width = this.resolutionWidth - o.x;
		}
		if(o.y > this.resolutionHeight) {
			o.y = 0;
		}
		if(o.y + o.height > this.resolutionHeight) {
			o.height = this.resolutionHeight - o.y;
		}
		this.UpdateTrimRange(o);
	};
	/*trim end*/
	
	/* advertisement begin */
	this.SetAdvertisementList = function(o) {
		this.advertisement.SetItemList(o);
	};
	
	this.GetAdvertisementList = function() {
		return this.advertisement.GetItemList();
	};
	
	this.ClearPlayerAdvertisement = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.AddInsertClip(-1, 0, "", 0);
	};
	
	this.PreviewAdvertisement = function() {
		if(this.domPlayer == null) return;
		this.ClearPlayerAdvertisement();
		
		var al = this.GetAdvertisementList();
		for(var i = 0; i < al.length; i++) {
			var ads = al[i];
			var o = uTimeText2Object(ads.time);
			this.domPlayer.AddInsertClip(o.ms, 0, "", 0);
		}
	};
	/* advertisement end */
	
	/*Select box begin*/
	this.OnBoxChanged = function(left, top, right, bottom) {
		var o = {};
		o.x = left;
		o.y = top;
		o.width = right - left;
		o.height = bottom - top;
		var tabId = this.tabPreprocessId;
		if(tabId == ID_TAB_MOSAIC) {
			this.UpdateMosaicRange(o);
		} else if(tabId == ID_TAB_TRIM) {
			this.UpdateTrimRange(o);
		};
	};
	
	this.OnTimeChanged = function(time) {
		var o = uMs2Hmsm(time);
		this.domHour.innerHTML = o.hour;
		this.domMinute.innerHTML = o.minute;
		this.domSecond.innerHTML = o.second;
		this.domMillisecond.innerHTML = o.millisecond;
	};
	
	this.BeginSelectBox = function() {
		if(this.domPlayer == null) return;
		var tabId = this.tabPreprocessId;
		var range = null;
		if(tabId == ID_TAB_MOSAIC) {
			range = this.GetMosaicInfo();
		} else if(tabId == ID_TAB_TRIM) {
			range = this.GetTrimInfo();
		}
		if(range == null) return;
		this.domPlayer.SetSelBoxPosition(range.x, range.y, range.x+range.width, range.y+range.height);
		this.domPlayer.SelectRectBox(1, 0xff00ff00);
	};
	
	this.BeginSelectMosaic = function(domMosaicItem) {
		var index = $(JS_MOSAIC_ITEM_INDEX, domMosaicItem).text();
		index = parseInt(index);
		if(isNaN(index)) return;
		index--;
		
		this.domMosaicX = $(JS_MOSAIC_X, domMosaicItem).get(0);
		this.domMosaicY = $(JS_MOSAIC_Y, domMosaicItem).get(0);
		this.domMosaicW = $(JS_MOSAIC_WIDTH, domMosaicItem).get(0);
		this.domMosaicH = $(JS_MOSAIC_HEIGHT, domMosaicItem).get(0);
		
		var o = this.GetMosaicList();
		var range = o[index];
		if(range == null) return;
		this.domPlayer.SetSelBoxPosition(range.x, range.y, range.x+range.width, range.y+range.height);
		this.domPlayer.SelectRectBox(1, 0xff00ff00);
	};
	
	this.EndSelectBox = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.SelectRectBox(0, 0xffffffff);
	};
	/*select box end*/
	
	this.Snapshot = function() {
		var $content = $(this.domContent);
		var path = $content.find(JS_LOCAL_PATH).val();
		
		if(!ValidateFilePath(path)) return;
		
		if(path.charAt(path.length-1) != "\\") {
			path += "\\";
		}
		var name = $content.find(JS_LOCAL_NAME).val();
		if(name == null || name.length == 0) {
			name = this.domPlayer.GetPlaybackTime();
			name = String(name);
		}
		if(!ValidateFileName(name)) return;
		
		var filePath = path + name + ".jpg";
		var type = 4;//jpeg
		var ret = this.domPlayer.SaveVideoSnapshot(filePath, type, 0, 0);
		if(ret == 0) {
			alert(filePath + " " + str_common.saveSuccessed);
		} else {
			alert(filePath + " " + str_common.saveFailed);
		}
	};
	
	this.Close = function() {
		if(!this.bShow) return;
		
		this.bShow = false;
		//TMPlayer operate.
		if(this.domPlayer != null) {
			this.domPlayer.close();
			this.RestorePlayer();
		}
		
		$(JS_SEEK_TIME, this.dom).val("0:0:0:0");
		
		this.stopPreview();
		
		if(this.timer != null) {
			clearInterval(this.timer);
		}
		
		this.bg.Hide();
		$(this.dom).hide();
		
		if($.isFunction(this.fnOnClose)) {
			this.fnOnClose();
		};
	};
	
	this.GetValue = function(jsSelect) {
		var value = null;
		var $sel = $(this.domContent).find(jsSelect);
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

	this.Bind = function() {
		var context = this;
		var $table = null;
		var classArr = null;
		
		$table = $(JS_PREPROCESS_TAB, this.dom);
		classArr = [CLASS_UNDERLINE_TRIGGER, CLASS_UNDERLINE_ACTIVE];
		uInitTab($table.get(0), classArr, function(domTab) {
			context.ShowPreprocessTab(domTab);
		});
		
		$(JS_BUTTON_TRIGGER, this.dom).click(function() {
			context.Close();
		});
		
		$(JS_PRE_FRAME_TRIGGER, this.dom).click(function() {
			context.StepBack();
		});
		
		$(JS_NEXT_FRAME_TRIGGER, this.dom).click(function() {
			context.StepFrame();
		});
		
		$(JS_SEEK_TIME_TRIGGER, this.dom).click(function() {
			context.SeekTime();
		});
		
		$(JS_PREVIEW_MOSAIC_TRIGGER, this.dom).click(function() {
			context.EndSelectBox();
			context.ClearPlayerMosaic();
			context.PreviewMosaic();
		});
		
		$(JS_PREVIEW_TRIM_TRIGGER, this.dom).click(function() {
			context.EndSelectBox();
			context.PreviewTrim();
		});
		
		$(JS_PREVIEW_CLIP_TRIGGER, this.dom).click(function() {
			context.ClearPlayerClip();
			context.PreviewClip();
		});
		
		$(JS_PREVIEW_ADVERTISEMENT_TRIGGER, this.dom).click(function() {
			context.PreviewAdvertisement();
		});
		
		$(JS_VALUE_CHANGER, this.dom).each(function() {
			uValueChanger(this);
		});
		
		$(JS_SELECT_BOX_TRIGGER, this.dom).click(function() {
			context.BeginSelectBox();
		});
		
		$(JS_SNAPSHOT_TRIGGER, this.dom).click(function() {
			context.Snapshot();
		});
		
		$(JS_VERIFY_MOSAIC, this.dom).change(function() {
			context.VerifyMosaic();
		});
		
		$(JS_VERIFY_TRIM, this.dom).change(function() {
			context.VerifyTrim();
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
	
	this.StartDevicePreview = function() {
		var context = this;
		var port = parseInt(this.localURI);
		if(isNaN(port)) return;
		
		var _requestURL = "startSDIPreview";
		if(this.inputType == INPUT_TYPE_SDI) {
			_requestURL = "startSDIPreview";
		}
		else if(this.inputType == INPUT_TYPE_CVBS) {
			_requestURL = "startCvbsPreview";
		}
		else if(this.inputType == INPUT_TYPE_HDMI) {
			_requestURL = "startHdmiPreview";
		}
		else if(this.inputType == INPUT_TYPE_ASI) {
			_requestURL = "startASIPreview";
		}
		
		var _param = {"port": port};
		if(g_params_preview_action != null) {
			$.extend(_param, _param, g_params_preview_action);
		}
		$.post(_requestURL, _param, function(data) {
			var monitorUrl = ParseMonitorUrl(data);
			if(monitorUrl != null) {
				context.bDeviceStarted = true;
			}
			
			var _url = URI2HttpURL(monitorUrl);
			context.PlayURI(_url);
		}, "html");
	};
	
	this.StopDevicePreview = function() {
		var context = this;
		var port = parseInt(this.localURI);
		if(isNaN(port)) return;
		
		var _requestURL = "stopSDIPreview";
		if(this.inputType == INPUT_TYPE_SDI) {
			_requestURL = "stopSDIPreview";
		}
		else if(this.inputType == INPUT_TYPE_CVBS) {
			_requestURL = "stopCvbsPreview";
		}
		else if(this.inputType == INPUT_TYPE_HDMI) {
			_requestURL = "stopHdmiPreview";
		}
		else if(this.inputType == INPUT_TYPE_ASI) {
			_requestURL = "stopASIPreview";
		}
		
		var _param = {"port": port};
		if(g_params_preview_action != null) {
			$.extend(_param, _param, g_params_preview_action);
		}
		$.post(_requestURL, _param, function(data) {
			context.bDeviceStarted = false;
		}, "html");
	};
	
	this.OnKeyDown = function(key) {
		if(!this.bShow) return;
		if(this.domPlayer == null) return;
		if(g_Focus != null) return;
		
		if(key == KEY_LEFT) {
			this.StepFrame(-1);
		} else if(key == KEY_RIGHT){
			this.StepFrame(1);
		} else if(key == KEY_UP){
			this.SeekFromCurrent(500);
		} else if(key == KEY_DOWN){
			this.SeekFromCurrent(-500);
		} else if(key == KEY_SPACE) {
			var state = this.domPlayer.GetPlayState();
			if(state == STATE_RUNNING) {
				this.domPlayer.Pause();
			} else if(state == STATE_PAUSED || state == STATE_STOPPED) {
				this.domPlayer.Play();
			} else {
				return;
			}
		}
	};
	
	//call back function
	function onNewMosaicItem(domMosaicItem) {
		g_InputPreview.OnNewMosaicItem(domMosaicItem);
	};
	
	function onNewTimeslice(domTimeslice) {
		g_InputPreview.OnNewTimeslice(domTimeslice);
	};
	
	function ValidateFilePath(path) {
		if(path == null || path.length == 0) {
			alert(str_input.needRightPath);
			return false;
		}
		if(path.match(/^\w:\\/gi) == null || 
				path.match(/\\\\/gi) != null) {
			alert(str_input.needRightPath);
			return false;
		}
		var path2 = path.substring(2);
		if(path2.match(/[\/:*?"<>|]/gi) != null) {
			alert(str_input.pathLimitSymbols);
			return false;
		}
		
		return true;
	}
	
	function ValidateFileName(fileName) {
		if(fileName == null || fileName.length == 0) {
			alert(str_input.fileLimitSymbols);
			return false;
		}
		if(fileName.match(/[\\\/:*?"<>|]/gi) != null) {
			alert(str_input.fileLimitSymbols);
			return false;
		}
		
		return true;
	}
}

InputPreview.prototype = {
	startUdpPreview: function() {
		var context = this;
		
		var _requestURL = "startUdpPreview";
		var _param = {"inputUri": this.localURI,
				"programId": this.program.programId,
				"audioId": this.program.audioId,
				"subtitleId":  this.program.subtitleId};
		if(g_params_preview_action != null) {
			$.extend(_param, _param, g_params_preview_action);
		}
		$.post(_requestURL, _param, function(data) {
			var monitorUrl = ParseMonitorUrl(data);
			if(monitorUrl != null) {
				context.bDeviceStarted = true;
			}
			
			var _url = URI2HttpURL(monitorUrl);
			context.PlayURI(_url);
		}, "html");
	},

	stopUdpPreview : function() {
		var context = this;
		var _requestURL = "stopUdpPreview";
		var _param = {"inputUri": this.localURI,
				"programId": this.program.programId,
				"audioId": this.program.audioId,
				"subtitleId":  this.program.subtitleId};
		if(g_params_preview_action != null) {
			$.extend(_param, _param, g_params_preview_action);
		}
		$.post(_requestURL, _param, function(data) {
			context.bDeviceStarted = false;
		}, "html");
	},
	
	stopPreview: function() {
		if(!this.bDeviceStarted) return;
		
		if(this.inputType == INPUT_TYPE_SDI
				|| this.inputType == INPUT_TYPE_CVBS
				|| this.inputType == INPUT_TYPE_HDMI
				|| this.inputType == INPUT_TYPE_ASI) {
			this.StopDevicePreview();
		}
		else if(this.inputType == INPUT_TYPE_NETWORK
				&& uGetProtocol(this.localURI) == "udp") {
			this.stopUdpPreview();
		}
	}
}
