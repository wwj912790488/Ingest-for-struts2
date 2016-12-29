function OP_OnBoxChanged(left, top, right, bottom) {
	g_OutputPreview.OnBoxChanged(left, top, right, bottom);
};

function OP_OnPointChanged(x, y, flag) {
	g_OutputPreview.OnPointChanged(x, y, flag);
};

function OutputPreview() {
	//dom ID
	var ID_TAB_LOGO = "TabLogo";
	var ID_TAB_SUBTITLE = "TabSubtitle";
	var ID_TAB_DYNAMIC_TEXT = "TabDynamicText";
	var ID_TAB_MOTION_ICON = "TabMotionIcon";
	
	/** my selector **/
	var JS_PREVIEW_LOGO_ITEM_TMPL = "#PreviewLogoItemTmpl";
	var JS_PREVIEW_SUBTITLE_ITEM_TMPL = "#PreviewSubtitleItemTmpl";
	var JS_PREVIEW_DYNAMIC_TEXT_ITEM_TMPL = "#PreviewDynamicTextItemTmpl";
	var JS_PREVIEW_MOTION_ICON_ITEM_TMPL =  "#PreviewMotionIconItemTmpl";
	var JS_PREVIEW_TEMPLATE="#OutputPreviewTemplate";
	var JS_PREVIEW_PLAYER="#ArcSoft_TMPlayer";
	var JS_PREVIEW_LOGO_TRIGGER = ".PreviewLogoTrigger";
	var JS_PREVIEW_SUBTITLE_TRIGGER = ".PreviewSubtitleTrigger";
	var JS_PREVIEW_DYNAMIC_TEXT_TRIGGER = ".PreviewDynamicTextTrigger";
	var JS_PREVIEW_MOTION_ICON_TRIGGER = ".PreviewMotionIconTrigger";
	var JS_PREPROCESS_TAB = ".PreprocessTab";
	var JS_PROCESS_PAGE = ".ProcessPage";
	var JS_PLAYER_CONTAINER = ".TMPlayerContainer";
	var JS_SELECT_POINTER_TRIGGER = ".SelectPointTrigger";
	var JS_SELECT_BOX_TRIGGER = ".SelectBoxTrigger";

	var rectImage = {imageName: "rect.bmp", width: 4, height: 4, opacity: 50};
	
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
	var LOGO_FILE_VIEW_OFFSET = 520;
	var PLAYER_WIDTH = 480;
	var PLAYER_HEIGHT = 480;
	
	this.dom = null;
	this.domContent = null;
	this.domPlayer = null;
	this.domPointX = null;
	this.domPointY = null;
	this.domLeft = null;
	this.domTop = null;
	this.domWidth = null;
	this.domHeight = null;
	
	this.bg = null;
	this.localURI = null;
	this.inputType = null;
	this.aspectRatio = {x: 0, y: 0};
	this.program = {programId: -1, videoId: -1, audioId: -1, subtitleId: -1};
	this.httpURI = null;
	this.logoHttpURI = null;
	this.mediaInfoWidth = null;
	this.mediaInfoHeight = null;
	this.destResolutionW = null;
	this.destResolutionH = null;
	this.subtitleLinkFile = null;
	this.playerMosaicPos = [];
	this.playerTrimPos = {x: 0, y: 0};
	this.playerClipPos = [];
	this.videoInfo = {width: 0, height: 0, parx: 4, pary: 3, parSource: true};
	this.tabPreprocessId = null;
	this.fnOnClose = null;
	this.trimInfo = null;
	this.mosaicList = null;
	this.clipInfo = null;
	this.clipList = null;
	this.logoInserter = null;
	this.subtitleInserter = null;
	this.dynamicText = null;
	this.motionIcon = null;
	this.programList = null;
	this.bDeviceStarted = false;
	this.bShow = false;
	this.frameRate = 25;
	this.timer = null;
	
	/** public API **/
	this.Init = function(id) {
		if(id == null) id="";
		
		var $preview = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		$preview.attr('id', id);
		this.dom = $preview[0];
		
		//dialog frame UI
		$preview.find(JS_DIALOG_HEAD_LINE).hide();
		$preview.find(JS_BUTTON_CANCEL).parent().hide();
		$preview.find(JS_LABEL_OK).text(str_common.close);
		
		var $content = $(JS_PREVIEW_TEMPLATE);
		this.domContent = $content[0];
		$preview.find(JS_DIALOG_CONTAINER).append($content[0]);
		var style = {
			'position':'fixed', 
			'z-index': Z_INDEX,
			'left':'0px',
			'top':'0px'
		};
		$preview.css(style);
		$preview.hide();
		
		var context = this;
		this.logoInserter = new EditorLogoInserter();
		this.logoInserter.Init($(JS_EDITOR_LOGO_INSERTER, $content).get(0), JS_PREVIEW_LOGO_ITEM_TMPL);
		this.logoInserter.SetFnNew(function(logoItem) {
			context.OnNewLogoItem(logoItem);
		});
		
		this.subtitleInserter = new EditorSubtitleInserter();
		this.subtitleInserter.Init($(JS_EDITOR_SUBTITLE, $content).get(0), JS_PREVIEW_SUBTITLE_ITEM_TMPL);
		this.subtitleInserter.SetFnNew(function(dom) {
			context.OnNewSubtitleItem(dom);
		});
		
		this.dynamicText = new DynamicText();
		this.dynamicText.Init($(JS_DYNAMIC_TEXT, $content).get(0), JS_PREVIEW_DYNAMIC_TEXT_ITEM_TMPL);
		this.dynamicText.SetFnNew(function(dynamicTextItem) {
			context.OnNewDynamicTextItem(dynamicTextItem);
		});
		
		this.motionIcon = new MotionIcon();
		this.motionIcon.Init($(JS_MOTION_ICON, $content).get(0), JS_PREVIEW_MOTION_ICON_ITEM_TMPL);
		this.motionIcon.SetFnNew(function(motionIconItem) {
			context.OnNewMotionIconItem(motionIconItem);
		});
		
		this.bg = new BackgroundControl();
		this.bg.Init();
		
		this.LicenseControl();
		this.Bind();
		
		var context = this;
		RegKeyHandler(function(key) {
			context.OnKeyDown(key);
		});
		
		return this.dom;
	};
	
	this.InitTMPlayer = function() {
		if(this.domPlayer != null) return;
		
		this.domPlayer = Player_Init($(JS_PLAYER_CONTAINER, this.dom).get(0));
	};
	
	this.Show = function() {
		var $preview = $(this.dom);
		this.bg.Show();
		$preview.show();
		
		var posTask = $(JS_TASK).offset();
		
		var pos = uGetCenterPos($preview.width(), $preview.height());
		$preview.offset({left:posTask.left , top:pos.y});
		this.bShow = true;
	};
	
	this.Play = function() {
		this.InitTMPlayer();
		if(this.domPlayer != null) {
			uDomAddEvent(this.domPlayer, "SelBoxPosition", OP_OnBoxChanged);
			uDomAddEvent(this.domPlayer, "SelPointPosition", OP_OnPointChanged);
		}
		
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
	
	/*o = {
	 * uri: ,
	 * inputType: ,
	 * size:,
	 * program: {programId: , videoId: , audioId: , subtitleId: },
	 * }*/
	this.SetMediaInfo = function(o) {
		this.ClearMediaInfo();
		
		if(o == null) return;
		
		this.localURI = o.uri;
		this.inputType = o.inputType;
		
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
				if(isNaN(value)) value = null;
				this.mediaInfoWidth = value;
				value = parseInt(arr[1]);
				if(isNaN(value)) value = null;
				this.mediaInfoHeight = value;
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
		this.aspectRatio.x = 0;
		this.aspectRatio.y = 0;
		this.program.programId = -1;
		this.program.videoId = -1;
		this.program.audioId = -1;
		this.program.subtitleId = -1;
		this.mediaInfoWidth = null;
		this.mediaInfoHeight = null;
		this.programList = null;
	};
	
	this.GetInputVideoWidth = function() {
		var width = this.mediaInfoWidth;
		if(isNaN(width)) {
			width = this.domPlayer.GetVideoWidth();
		}
		
		return width;
	};
	
	this.GetInputVideoHeight = function() {
		var height = this.mediaInfoHeight;
		if(isNaN(height)) {
			height = this.domPlayer.GetVideoHeight();
		}
		
		return height;
	};
	
	this.SetProgramList = function(list) {
		this.programList = list;
	};
	
	this.SetVideoResolution = function(width, height) {
		this.videoInfo.width = width;
		this.videoInfo.height = height;
	};
	
	this.GetSourceVideoWidth = function() {
		//source video width should fetch from player, because of smart border.
		var width = this.domPlayer.GetVideoWidth();
		return width;
	};
	
	this.GetSourceVideoHeight = function() {
		var height = this.domPlayer.GetVideoHeight();
		return height;
	};
	
	this.GetOutputVideoWidth = function() {
		var width = parseInt(this.videoInfo.width);
		if(isNaN(width) || width == null) {
			width = this.mediaInfoWidth;
		}
		if(isNaN(width) || width == null) {
			width = this.domPlayer.GetVideoWidth();
		}
		return width;
	};
	
	this.GetOutputVideoHeight = function() {
		var height = parseInt(this.videoInfo.height);
		if(isNaN(height) || height == null) {
			height = this.mediaInfoHeight;
		}
		if(isNaN(height) || height == null) {
			height = this.domPlayer.GetVideoHeight();
		}
		return height;
	};
	
	this.SetPixelAspectRatio = function(parx, pary, followSource) {
		this.videoInfo.parx = parx;
		this.videoInfo.pary = pary;
		this.videoInfo.parSource = followSource;
	};
	
	this.SetTitle = function(title) {
		$(this.domMenu).find(JS_DIALOG_TITLE_TEXT).text(title);
	};
	
	this.SetOnClose = function(fn) {
		this.fnOnClose = fn;
	};
	
	this.ShowPreprocessTab = function(id) {
		if(this.tabPreprocessId == id) return;
		var $pageArr = $(this.domContent).find(JS_PROCESS_PAGE);
		$pageArr.hide();
		$pageArr.filter("#"+id).show();
		this.tabPreprocessId = id;
		this.EndSelectPoint();
		this.EndSelectBox();
	};
	
	/*logo begin*/
	this.ClearPlayerLogo = function() {
		if(this.logoInserter == null) return null;
		if(this.domPlayer == null) return;
		this.domPlayer.AddLogoImage("", 0, 0, 0, 0, 0);
	};
	
	this.PreviewLogo = function() {
		if(this.logoInserter == null) return null;
		if(this.domPlayer == null) return;
		
		var outVideoWidth = this.GetOutputVideoWidth();
		var outVideoHeight = this.GetOutputVideoHeight();
		if(outVideoWidth == 0 || outVideoHeight == 0) {
			return;
		}
		
		var logoList = this.GetLogoList();
		for(var i = 0; i < logoList.length; i++) {
			var logo = logoList[i];
			var x = parseInt(logo.x);
			if(isNaN(x)) x = 0;
			var y = parseInt(logo.y);
			if(isNaN(y)) y = 0;
			
			if(x > outVideoWidth
				|| y > outVideoHeight) {
				var text = str_warning.coordinatesInRange.format(outVideoWidth, outVideoHeight);
				alert(text);
			}

			//postion can not be translated if ACV-6172 is fixed.
			var renderx = this.ResolutionToRenderX(x);
			var rendery = this.ResolutionToRenderY(y);
			var opacity = 255 * logo.opacity / 100;
			if(logo.resize != null) {
				opacity += parseInt(logo.resize * 10) << 8;
			}
			
			var width = null;
			var height = null;
			width = outVideoWidth;
			if(width != 0) width += 0x01000000;
			height = outVideoHeight;
			if(height != 0) height += 0x01000000;
			
			var httpURI = URI2HttpURL(logo.uri);
			
			this.domPlayer.AddLogoImage(httpURI, renderx, rendery, width, height, opacity);
		}
	};
	
	this.SetLogoInfo = function(o) {
		if(this.logoInserter == null) return null;
		this.logoInserter.SetInfo(o);
	};
	
	this.GetLogoInfo = function() {
		if(this.logoInserter == null) return null;
		return this.logoInserter.GetInfo();
	};
	
	this.SetLogoList = function(o) {
		if(this.logoInserter == null) return null;
		this.logoInserter.SetLogoList(o);
	};
	
	this.GetLogoList = function() {
		if(this.logoInserter == null) return null;
		return this.logoInserter.GetLogoList();
	};
	
	/*
	 * @param: o = {x: , y: , width: , height: }
	 */
	this.UpdaateSelectPoint = function(o) {
		o.x = Math.round(this.RenderToResolutionX(o.x));
		o.y = Math.round(this.RenderToResolutionY(o.y));
		this.domPointX.value = o.x;
		this.domPointY.value = o.y;
	};
	
	this.OnNewLogoItem = function(logoItem) {
		logoItem.SetFnGetOffset(function(dialog) {
			var rect = dialog.getRect();
			var pos = uGetCenterPos(rect.width, rect.height);
			var panelPos = $(JS_TASK).offset();
			var offset = {};
			offset.left = panelPos.left + LOGO_FILE_VIEW_OFFSET;
			offset.top = pos.y;
			return offset;
		});
		
		var context = this;
		var dom = logoItem.dom;
		$(JS_SELECT_POINTER_TRIGGER, dom).click(function() {
			context.BeginSelectPoint(dom);
		});
	};

	this.LicenseLogo = function() {
		if(GetLicense(license.VIDEO_EDITING_LOGO_INSERTION) != license.ENABLED) {
			$("td#TabLogo", this.dom).remove();
			this.logoInserter = null;
		}
	};
	/*logo end*/
	
	/*subtitle begin*/
	this.SetSubtitleURI = function(uri) {
		if(this.subtitleInserter == null) return;
		var $uri = $(this.domContent).find(JS_SUBTITLE_URI);
		$uri.val(uri);
		$uri.change();
	};
	
	this.ClearPlayerSubtitle = function() {
		if(this.subtitleInserter == null) return;
		if(this.domPlayer == null) return;
		this.domPlayer.AddExtSubtitle("", 0, "", 0, 0, 0);
	};
	
	this.SetOutVideoSize = function() {
		var width = this.GetOutputVideoWidth();
		var height = this.GetOutputVideoHeight();
		var parx = this.videoInfo.parx;
		var pary = this.videoInfo.pary;
		if(this.videoInfo.parSource) {
			parx = this.aspectRatio.x;
			pary = this.aspectRatio.y;
		}
		this.domPlayer.SetTranscodeOutVideoSize(width, height, parx, pary);
	};
	
	this.UpdateRectRange = function(o) {
		o.left = Math.round(this.RenderToResolutionX(o.left));
		o.top = Math.round(this.RenderToResolutionY(o.top));
		o.width = Math.round(this.RenderToResolutionX(o.width));
		o.height = Math.round(this.RenderToResolutionY(o.height));
		
		this.domLeft.value = o.left;
		this.domTop.value = o.top;
		
		if(this.domWidth != null)
			this.domWidth.value = o.width;
		
		if(this.domHeight != null)
			this.domHeight.value = o.height;
	};
	
	this.PreviewSubtitleURI = function(info) {
		if(this.subtitleInserter == null) return;
		if(this.domPlayer == null) return;
		if(info == null) return;
		if(info.enable != ENABLE_TRUE) return;

		var httpURI = URI2HttpURL(info.uri);
		var bPosToFullSize = 1;
		var textPos = info.vPos;
		textPos = textPos + (bPosToFullSize<<16);
		var fontName = info.fontFamily;
		var fontColor = parseInt(info.color, 16);
		if(isNaN(fontColor)) fontColor = 0xffffff;
		
		var fontSize = info.fontSize;
		var delayTime = info.sync;
		var opacity = info.opacity * 255 / 100;
		
		this.domPlayer.AddExtSubtitle(httpURI, textPos, fontName, fontColor, fontSize, delayTime);
		this.domPlayer.SetExtSubtitleOpaque(opacity);
		
		this.domPlayer.SetExtSubtitleFontInfo(info.englishFont, info.englishSize, info.fontFamily, info.fontSize);
		
		var left = parseInt(info.left);
		var top = parseInt(info.top);
		var width = parseInt(info.width);
		var height = parseInt(info.height);
		if(!isNaN(left) && !isNaN(top) && !isNaN(width) && !isNaN(height)) {
			this.domPlayer.SetExtSubtitleBoxInfo(left, top, width, height);
		}
	};
	
	this.ValidateSubtitle = function(info) {
		if(info == null) return;
		if(info.enable != ENABLE_TRUE) return;
		
		var localUri = info.uri;
		if(!VerifySubtitle(localUri)) {
			alert(str_warning.preview_subtitle);
			return;
		}
		
		if(!this.ValedateSelectedRect(info.left, info.top, info.width, info.height)) {
			alert(str_warning.subtitle_out_of_range);
			return;
		}
	};
	
	this.OnNewSubtitleItem = function(domSubtitleItem) {
		$(JS_SELECT_SUBTITLE_TRIGGER, domSubtitleItem).click(function() {
			var rect = g_SubtitleFileView.GetRect();
			var pos = uGetCenterPos(rect.width, rect.height);
			var taskPos = $(JS_TASK).offset();
			g_SubtitleFileView.Show(taskPos.left + LOGO_FILE_VIEW_OFFSET, pos.y);
		});
		
		$(JS_SUBTITLE_COLOR, domSubtitleItem).click(function() {
			var rect = g_Palette.GetRect();
			var pos = uGetCenterPos(rect.width, rect.height);
			var taskPos = $(JS_TASK).offset();
			g_Palette.Show(taskPos.left + LOGO_FILE_VIEW_OFFSET, pos.y);
		});
		
		var context = this;
		$(JS_SELECT_BOX_TRIGGER, domSubtitleItem).click(function() {
			context.BeginSelectBox(domSubtitleItem);
		});
	};
	
	
	this.PreviewSubtitle = function() {
		this.ClearPlayerSubtitle();
		
		var subtitleList = this.GetSubtitleList();
		if(subtitleList == null) return;
		
		for(var i = 0; i < subtitleList.length; i++) {
			var info = subtitleList[i];
			this.ValidateSubtitle(info);
			this.PreviewSubtitleURI(info);
			if(i == 1) break;	// Can't preview multi subtitle.
		}
	};
	
	this.SetSubtitleList = function(subtitleList) {
		if(this.subtitleInserter == null) return;
		this.subtitleInserter.SetSubtitleList(subtitleList);
	};
	
	this.GetSubtitleList = function() {
		if(this.subtitleInserter == null) return;
		return this.subtitleInserter.GetSubtitleList();
	};
	
	this.LicenseSubtitle = function() {
		if(GetLicense(license.EX_VIDEO_EDITING_EXTERNAL_SUBTITLE) != license.ENABLED) {
			$("td#TabSubtitle", this.dom).remove();
			this.subtitleInserter = null;
		}
	};
	
	this.OnPaletteClose = function() {
		var color = g_Palette.GetColor();
		var $color = $(JS_SUBTITLE_COLOR, this.dom);
		$color.get(0).disabled = false;
		$color.val(color).change();
	};
	/*subtitle end*/
	
	/* DynamicText begin */
	this.SetDynamicTextList = function(list) {
		if(this.dynamicText == null) return;
		this.dynamicText.SetList(list);
	};
	
	this.GetDynamicTextList = function(list) {
		if(this.dynamicText == null) return;
		return this.dynamicText.GetList();
	};
	
	this.OnNewDynamicTextItem = function(dynamicTextItem) {
		var context = this;
		
		dynamicTextItem.SetFnGetOffset(function(dialog) {
			var rect = dialog.getRect();
			var pos = uGetCenterPos(rect.width, rect.height);
			var panelPos = $(JS_TASK).offset();
			var offset = {};
			offset.left = panelPos.left + LOGO_FILE_VIEW_OFFSET;
			offset.top = pos.y;
			return offset;
		});
		
		var dom = dynamicTextItem.dom;
		$(JS_SELECT_BOX_TRIGGER, dom).click(function() {
			context.BeginSelectBox(dom);
		});
	};
	
	this.ClearPlayerDynamicText = function() {
		if(this.dynamicText == null) return;
		if(this.domPlayer == null) return;
		this.domPlayer.SetDisplayString("", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	};
	
	this.PreviewDynamicText = function() {
		if(this.dynamicText == null) return;
		if(this.domPlayer == null) return;
		var $dom = $(JS_DYNAMIC_TEXT, this.dom);
		if($dom.length == 0) return;
		
		var outVideoWidth = this.GetOutputVideoWidth();
		var outVideoHeight = this.GetOutputVideoHeight();
		if(outVideoWidth == 0 || outVideoHeight == 0) {
			return;
		}
		
		var list = this.GetDynamicTextList();
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var x = parseInt(item.posx);
			if(isNaN(x)) x = 0;
			var y = parseInt(item.posy);
			if(isNaN(y)) y = 0;
			
			if(x > outVideoWidth
				|| y > outVideoHeight) {
				var text = str_warning.coordinatesInRange.format(outVideoWidth, outVideoHeight);
				alert(text);
			}

			//postion can not be translated if ACV-6172 is fixed.
			var renderx = parseInt(this.ResolutionToRenderX(x));
			var rendery = parseInt(this.ResolutionToRenderY(y));
			var opacity = parseInt(255 * rectImage.opacity / 100);
			
			var width = parseInt(this.ResolutionToRenderX(item.width));
			var height = parseInt(this.ResolutionToRenderY(item.height));
			
			var httpURI = this.GetDynamicTextUri(rectImage.imageName, i);
			
			this.domPlayer.SetDisplayString(item.label, 
					item.font, parseInt(item.size), parseInt("0x"+item.color), parseInt(item.opacity), 
					parseInt("0x"+item.bgcolor), parseInt(item.bgopacity),
					parseInt(item.posx), parseInt(item.posy), parseInt(item.width), parseInt(item.height), 
					outVideoWidth, outVideoHeight, 0, -1);
		}
	};
	
	this.GetDynamicTextUri = function(imageName, index) {
		var uri = this.GetPreviewImageUri(imageName);
		uri += "?index="+index;
		return uri;
	};
	
	this.LicenseDynamicText = function() {
		if(GetLicense(license.VIDEO_EDITING_DYNAMIC_TEXT) != license.ENABLED) {
			$("td#TabDynamicText", this.dom).remove();
			this.dynamicText = null;
		}
	};
	/* DynamicText end */
	
	/* MotionIcon begin */
	this.SetMotionIconList = function(list) {
		if(this.motionIcon == null) return;
		this.motionIcon.SetList(list);
	};
	
	this.GetMotionIconList = function(list) {
		if(this.motionIcon == null) return;
		return this.motionIcon.GetList();
	};
	
	this.OnNewMotionIconItem = function(motionIconItem) {
		var context = this;
		
		motionIconItem.SetFnGetOffset(function(dialog) {
			var rect = dialog.getRect();
			var pos = uGetCenterPos(rect.width, rect.height);
			var panelPos = $(JS_TASK).offset();
			var offset = {};
			offset.left = panelPos.left + LOGO_FILE_VIEW_OFFSET;
			offset.top = pos.y;
			return offset;
		});
		
		var dom = motionIconItem.dom;
		$(JS_SELECT_BOX_TRIGGER, dom).click(function() {
			//context.BeginSelectPoint(dom);
			context.BeginSelectBox(dom);
		});
	};
	
	this.ClearPlayerMotionIcon = function() {
		if(this.motionIcon == null) return;
		if(this.domPlayer == null) return;
		this.domPlayer.AddLogoImage("", 0, 0, 0, 0, 0);
	};
	
	this.PreviewMotionIcon = function() {
		if(this.motionIcon == null) return;
		if(this.domPlayer == null) return;
		var $dom = $(JS_MOTION_ICON, this.dom);
		if($dom.length == 0) return;
		
		var outVideoWidth = this.GetOutputVideoWidth();
		var outVideoHeight = this.GetOutputVideoHeight();
		if(outVideoWidth == 0 || outVideoHeight == 0) {
			return;
		}
		
		var list = this.GetMotionIconList();
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var x = parseInt(item.posx);
			if(isNaN(x)) x = 0;
			var y = parseInt(item.posy);
			if(isNaN(y)) y = 0;
			
			if(x > outVideoWidth
				|| y > outVideoHeight) {
				var text = str_warning.coordinatesInRange.format(outVideoWidth, outVideoHeight);
				alert(text);
			}

			//postion can not be translated if ACV-6172 is fixed.
			var renderx = parseInt(this.ResolutionToRenderX(x));
			var rendery = parseInt(this.ResolutionToRenderY(y));
			var opacity = 255;
			
			var width = null;
			var height = null;
			width = outVideoWidth;
			if(width != 0) width += 0x01000000;
			height = outVideoHeight;
			if(height != 0) height += 0x01000000;
			
			var httpURI = URI2HttpURL(item.imageName);
			if(httpURI != null) {
				this.domPlayer.AddLogoImage(httpURI, renderx, rendery, width, height, opacity);
			}
		}
	};
	
	this.LicenseMotionIcon = function() {
		if(GetLicense(license.VIDEO_EDITING_MOTION_ICON) != license.ENABLED) {
			$("td#TabMotionIcon", this.dom).remove();
			this.motionIcon = null;
		}
	};
	/* MotionIcon end */

	/*mosaic begin*/
	this.SetMosaicList = function(o) {
		this.mosaicList = o;
	};
	
	this.ApplyInputMosaic = function() {
		if(this.domPlayer == null) return;
		var o = this.mosaicList;
		if(o == null) return;
		
		for(var i = 0; i < o.length; i++) {
			var mosaic = o[i];
			/*this.domPlayer.AddMosaicMask(mosaic.x, mosaic.y, mosaic.width, mosaic.height, mosaic.blur);
			this.playerMosaicPos.push(mosaic);*/
			
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
	
	this.ClearPlayerMosaic = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.ClearMosaicMask();
	};
	/*mosaic end*/
	
	/*clip begin*/
	this.SetClipInfo = function(o) {
		this.clipInfo = o;
	};
	
	this.SetClipList = function(clips) {
		this.clipList = clips;
	};
	
	this.GetClipImageInfo = function() {
		var len = clipImageMap.length;
		var i = 0;
		var width = this.GetInputVideoWidth();
		var height = this.GetInputVideoHeight();
		if(this.trimInfo.enable == ENABLE_TRUE && this.trimInfo.width != 0 && this.trimInfo.height != 0) {
			width = this.trimInfo.width;
			height = this.trimInfo.height;
		}
		for(i = 0; i < len; i++) {
			if(height < clipImageMap[i].videoHeight) {
				break;
			}
		}
		var o = {};
		o.width = clipImageMap[i].width;
		o.height = clipImageMap[i].height;
		o.imageName = clipImageMap[i].imageName;
		o.x = Math.round((width - o.width) / 2);
		o.y = Math.round((height - o.height) / 2);
		
		o.uri = this.GetPreviewImageUri(o.imageName);
		
		return o;
	};
	
	this.ApplyInputClip = function() {
		if(this.domPlayer == null) return;
		var clipInfo = this.clipInfo;
		if(clipInfo == null) return;
		if(clipInfo.enable != ENABLE_TRUE) return;
		var mode = 0;
		if(clipInfo.mode != ENABLE_TRUE) mode = 1;
		var imageInfo = this.GetClipImageInfo();
		this.domPlayer.SetCutTimeImage(imageInfo.uri, imageInfo.x, imageInfo.y, imageInfo.width, imageInfo.height, 
				255, mode);
		
		var clipList = this.clipList;
		for(var i = 0; i < clipList.length; i++) {
			var start = uTimeText2Object(clipList[i].startTimeText);
			var end = uTimeText2Object(clipList[i].endTimeText);
			this.domPlayer.AddCutTime(start.ms, end.ms);
			this.playerClipPos[this.playerClipPos.length] = start.ms;
		}
	};
	
	this.ClearPlayerClip = function() {
		if(this.domPlayer == null) return;
		var len = this.playerClipPos.length;
		for(var i = 0; i < len; i++) {
			this.domPlayer.AddCutTime(this.playerClipPos[i], this.playerClipPos[i]);
		};
		this.playerClipPos.length = 0;
	};
	/*clip end*/
	
	/*trim begin*/
	/**
	 * This API should be called before play. 
	 * o= {enable: , x: , y: , width: , height: }
	 */
	this.SetTrimInfo = function(o) {
		this.trimInfo = o;
	};
	
	this.ApplyInputTrim = function() {
		if(this.domPlayer == null) return;
		var trim = this.trimInfo;
		if(trim == null) return;
		if(trim.enable != ENABLE_TRUE) return;
		
		this.domPlayer.ApplyTrimout(trim.x, trim.y, trim.x+trim.width, trim.y+trim.height);
		this.playerTrimPos.x = trim.x;
		this.playerTrimPos.y = trim.y;
	};
	
	//the player should be stopped before clear trim  
	this.ClearPlayerTrim = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.ApplyTrimout(this.playerTrimPos.x, this.playerTrimPos.y, this.playerTrimPos.x, this.playerTrimPos.y);
		this.playerTrimPos.x = 0;
		this.playerTrimPos.y = 0;
	};
	/*trim end*/
	
	/* advertisement begin */
	this.SetAdvertisementList = function(al) {
		this.advertisementList = al;
	};
	
	this.ClearPlayerAdvertisement = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.AddInsertClip(-1, 0, "", 0);
	};
	
	this.ApplyInputAdvertisement = function() {
		if(this.domPlayer == null) return;
		this.ClearPlayerAdvertisement();
		
		var al = this.advertisementList;
		if(al == null) return;
		for(var i = 0; i < al.length; i++) {
			var ads = al[i];
			var o = uTimeText2Object(ads.time);
			this.domPlayer.AddInsertClip(o.ms, 0, "", 0);
		}
	};
	/* advertisement end */

	this.PlayURI = function(httpURI) {
		if(this.domPlayer == null) return;
		var ret = 0;
		
		if(this.programList == null) {
			Player_SelectTrack(this.domPlayer, this.localURI, this.program);
		} else {
			Player_AddCompose(this.domPlayer, this.localURI, this.programList);
		}
		
		//apply input mosaic
		this.ApplyInputMosaic();
		//apply input clip, clip use input width & height
		this.ApplyInputClip();
		this.ApplyInputAdvertisement();

		var mediaType = Player_GetMediaType(this.inputType, this.localURI);
		ret = this.domPlayer.LoadMedia(httpURI, "", mediaType);
		if(ret != 0) return;

		var aspectRatioX = 0;
		var aspectRatioY = 0;
		if(this.aspectRatio.x == 0 || this.aspectRatio.y == 0) {
			aspectRatioX = this.domPlayer.GetVideoDisplayWidth();
			aspectRatioY = this.domPlayer.GetVideoDisplayHeight();
			this.aspectRatio.x = aspectRatioX;
			this.aspectRatio.y = aspectRatioY;
		} else {
			aspectRatioX = this.aspectRatio.x;
			aspectRatioY = this.aspectRatio.y;
		}
		
		this.SetOutVideoSize();
		
		//apply subtitle
		this.PreviewSubtitle();
		
		/*var ratio = aspectRatioX * this.domPlayer.GetVideoHeight() / 
			(aspectRatioY * this.domPlayer.GetVideoWidth());*/
		this.ApplyInputTrim();

		//change aspect ratio
		var trim = this.trimInfo;
		var parx = 0;
		var pary = 0;
		if(this.videoInfo.parSource) {
			if(trim == null || trim.enable != ENABLE_TRUE) {
				this.domPlayer.ChangeAspectRatio(0, 0, -100, 0);
				parx = aspectRatioX;
				pary = aspectRatioY;
			} else {
				//keep the original aspect ratio.
				parx = aspectRatioX;
				pary = aspectRatioY;
				this.domPlayer.ChangeAspectRatio(parx, pary, 0, 0);
			}
		} else {
			parx = this.videoInfo.parx;
			pary = this.videoInfo.pary;
			//this.domPlayer.ChangeAspectRatio(parx, pary, 0, 0);
			this.domPlayer.ChangeAspectRatio(parx, pary, -1, 0);
		}

		//Get Info
		/*if(this.resolutionWidth == 0 || this.resolutionHeight == 0) {
			this.resolutionWidth = this.domPlayer.GetVideoWidth();
			this.resolutionHeight = this.domPlayer.GetVideoHeight();
		}*/
		
		//Play
		//parx = aspectRatioX;
		//pary = aspectRatioY;
		if(parx >= pary) {
			this.domPlayer.width = PLAYER_WIDTH;
			this.domPlayer.height = PLAYER_WIDTH * pary / parx;
		} else {
			this.domPlayer.height = PLAYER_HEIGHT;
			this.domPlayer.width = PLAYER_HEIGHT * parx / pary;
		}
		
		//Fix bug ACV-5919 : move preview logo here 
		//apply logo
		this.PreviewLogo();
		
		this.PreviewDynamicText();
		
		this.PreviewMotionIcon();
		
		if (ret == 0) ret = this.domPlayer.Play();
		this.Show();
	};
	
	this.ResolutionToRenderX = function(pos) {
		var width = this.GetSourceVideoWidth();
		var outWidth = this.GetOutputVideoWidth();
		if(outWidth == null) {
			return pos;
		} else {
			return pos * width / outWidth;
		}
	};
	
	this.ResolutionToRenderY = function(pos) {
		var height = this.GetSourceVideoHeight();
		var outHeight = this.GetOutputVideoHeight();
		if(outHeight == null) {
			return pos;
		} else {
			return pos * height / outHeight;
		}
	};
	
	this.RenderToResolutionX = function(pos) {
		var width = this.domPlayer.GetVideoWidth();
		var outWidth = this.GetOutputVideoWidth();
		if(outWidth == 0) {
			return pos;
		} else {
			return pos * outWidth / width;
		}
	};
	
	this.RenderToResolutionY = function(pos) {
		var height = this.domPlayer.GetVideoHeight();
		var outHeight = this.GetOutputVideoHeight();
		if(isNaN(outHeight)) {
			return pos;
		} else {
			return pos * outHeight / height;
		}
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
	
	this.OnBoxChanged = function(left, top, right, bottom) {
		var o = {};
		o.left = left;
		o.top = top;
		o.width = right - left;
		o.height = bottom - top;
		var tabId = this.tabPreprocessId;
		if(tabId == ID_TAB_SUBTITLE
			|| tabId == ID_TAB_DYNAMIC_TEXT
			|| tabId == ID_TAB_MOTION_ICON) {
			this.UpdateRectRange(o);
		}
	};
	
	this.BeginSelectBox = function(domItem) {
		if(this.domPlayer == null) return;
		var tabId = this.tabPreprocessId;
		
		var left = null;
		var top = null;
		var width = null;
		var height = null;
		if(tabId == ID_TAB_SUBTITLE) {
			this.domLeft = $(JS_SUBTITLE_LEFT, domItem).get(0);
			this.domTop = $(JS_SUBTITLE_TOP, domItem).get(0);
			this.domWidth = $(JS_SUBTITLE_WIDTH, domItem).get(0);
			this.domHeight = $(JS_SUBTITLE_HEIGHT, domItem).get(0);
			
			left = parseInt(this.domLeft.value);
			top = parseInt(this.domTop.value);
			width = parseInt(this.domTop.value);
			height = parseInt(this.domTop.value);
			
			if(!this.ValedateSelectedRect(left, top, width, height)) {
				alert(str_warning.subtitle_out_of_range);
				return;
			}
		}
		else if(tabId == ID_TAB_DYNAMIC_TEXT) {
			this.domLeft = $(JS_DYNAMIC_TEXT_POSX, domItem).get(0);
			this.domTop = $(JS_DYNAMIC_TEXT_POSY, domItem).get(0);
			this.domWidth = $(JS_DYNAMIC_TEXT_WIDTH, domItem).get(0);
			this.domHeight = $(JS_DYNAMIC_TEXT_HEIGHT, domItem).get(0);

			left = parseInt(this.domLeft.value);
			top = parseInt(this.domTop.value);
			width = parseInt(this.domWidth.value);
			height = parseInt(this.domHeight.value);
			
			if(!this.ValedateSelectedRect(left, top, width, height)) {
				alert(str_warning.select_box_out_of_resolution);
				return;
			}
		}
		else if(tabId == ID_TAB_MOTION_ICON) {
			this.domLeft = $(JS_MOTION_ICON_X, domItem).get(0);
			this.domTop = $(JS_MOTION_ICON_Y, domItem).get(0);
			this.domWidth = $(JS_MOTION_ICON_WIDTH, domItem).get(0);
			this.domHeight = $(JS_MOTION_ICON_HEIGHT, domItem).get(0);
			
			left = parseInt(this.domLeft.value);
			top = parseInt(this.domTop.value);
			width = parseInt(this.domWidth.value);
			height = parseInt(this.domHeight.value);
			
			this.domWidth = null;
			this.domHeight = null;
			
			if(!this.ValedateSelectedRect(left, top, width, height)) {
				alert(str_warning.select_box_out_of_resolution);
				return;
			}
		}
		
		var range = {};
		range.left = this.ResolutionToRenderX(left);
		range.top = this.ResolutionToRenderY(top);
		range.width = this.ResolutionToRenderX(width);
		range.height = this.ResolutionToRenderY(height);
		
		if(range == null) return;
		this.domPlayer.SetSelBoxPosition(
				Math.round(range.left), 
				Math.round(range.top), 
				Math.round(range.left + range.width), 
				Math.round(range.top + range.height));
		
		this.domPlayer.SelectRectBox(1, 0xff00ff00);
	};
	
	this.EndSelectBox = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.SelectRectBox(0, 0xffffffff);
	};

	this.OnPointChanged = function(x, y, flag) {
		var o = {};
		o.x = x;
		o.y = y;
		o.width = 0;//right - left;
		o.height = 0;//bottom - top;
		var tabId = this.tabPreprocessId;
		if(tabId == ID_TAB_LOGO
			|| tabId == ID_TAB_MOTION_ICON) {
			this.UpdaateSelectPoint(o);
		}
	};
	
	this.BeginSelectPoint = function(domItem) {
		if(this.domPlayer == null) return;

		var tabId = this.tabPreprocessId;
		if(tabId == ID_TAB_LOGO) {
			this.domPointX = $(JS_LOGO_X, domItem).get(0);
			this.domPointY = $(JS_LOGO_Y, domItem).get(0);
		}
		else if(tabId == ID_TAB_MOTION_ICON) {
			this.domPointX = $(JS_MOTION_ICON_X, domItem).get(0);
			this.domPointY = $(JS_MOTION_ICON_Y, domItem).get(0);
		}
		
		this.domPlayer.SelectPoint(1, 0xff00ff00);
	};
	
	this.EndSelectPoint = function() {
		if(this.domPlayer == null) return;
		this.domPlayer.SelectPoint(0, 0xffffffff);
	};
	
	this.JumpByTimeText = function(timeText) {
		var o = uTimeText2Object(timeText);
		
		var accurate = 1;
		var flag = 1; 
		var mode = accurate * 0x01000000 + flag;
		this.domPlayer.Pause();
		this.domPlayer.Seek(o.ms, mode);
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
		this.EndSelectPoint();
		this.ClearPlayerMosaic();
		this.ClearPlayerClip();
		this.ClearPlayerAdvertisement();
		this.ClearPlayerLogo();
		this.ClearPlayerTrim();
		this.ClearPlayerSubtitle();
		this.ClearPlayerDynamicText();
	};
	
	this.Close = function() {
		if(!this.bShow) return;
		this.bShow = false;
		
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
	
	this.LicenseControl = function() {
		this.LicenseLogo();
		this.LicenseSubtitle();
		this.LicenseDynamicText();
		this.LicenseMotionIcon();
		$("."+CLASS_UNDERLINE_TRIGGER, this.dom).first().addClass(CLASS_UNDERLINE_ACTIVE);
		
		if(GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_LIVE
				|| GetLicense(license.PRODUCT_TYPE) == license.PRODUCT_TYPE_MAL) {
			$(".LicenseFrameControl", this.dom).remove();
		}
	};
	
	this.ValedateSelectedRect = function(left, top, width, height) {
		if(isNaN(left) || isNaN(top) || isNaN(width) || isNaN(height)) return false;
		if(left < 0 || top < 0 || width < 0 || height < 0) return false;
		if(left + width > this.GetOutputVideoWidth()) return false;
		if(top + height > this.GetOutputVideoHeight()) return false;
		
		return true;
	};
	
	this.Bind = function() {
		var context = this;
		var $table = null;
		var classArr = null;
		
		$table = $(JS_PREPROCESS_TAB, this.dom);
		classArr = [CLASS_UNDERLINE_TRIGGER, CLASS_UNDERLINE_ACTIVE];
		uInitTab($table.get(0), classArr, function(domTrigger) {
			context.ShowPreprocessTab(domTrigger.id);
		});
		
		$(JS_BUTTON_TRIGGER, this.dom).click(function() {
			context.Close();
		});
		
		$(JS_PREVIEW_LOGO_TRIGGER, this.dom).click(function() {
			context.EndSelectPoint();
			context.ClearPlayerLogo();
			context.PreviewLogo();
		});
		
		$(JS_PREVIEW_DYNAMIC_TEXT_TRIGGER, this.dom).click(function() {
			context.EndSelectBox();
			context.ClearPlayerDynamicText();
			context.PreviewDynamicText();
		});
		
		$(JS_PREVIEW_MOTION_ICON_TRIGGER, this.dom).click(function() {
			context.EndSelectBox();
			context.ClearPlayerMotionIcon();
			context.PreviewMotionIcon();
		});
		
		var arr = editorSubtitleData.getChineseFont();
		var $sel = $(JS_SUBTITLE_FONT_FAMILY, this.dom);
		uUpdateSelect($sel[0], arr);
		
		arr = editorSubtitleData.getEnglishFont();
		$sel = $(JS_SUBTITLE_ENGLISH_FONT, this.dom);
		uUpdateSelect($sel[0], arr);
		
		$(JS_PREVIEW_SUBTITLE_TRIGGER, this.dom).click(function() {
			context.EndSelectBox();
			context.PreviewSubtitle();
		});
		
		$(JS_SEEK_TIME_TRIGGER, this.dom).click(function() {
			context.SeekTime();
		});
		
		$(JS_SELECT_BOX_TRIGGER, this.dom).click(function() {
			context.BeginSelectBox();
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
		
		ValidatorBindArray(this.domContent, validatorMap);
	};
	
	
	this.GetPreviewImageUri = function(imageName) {
		var pathName = window.location.pathname;
		pathName = pathName.substring(0, pathName.indexOf("/", 1));
		var iconPath = pathName + "/images/icons/" + imageName;
		uri = window.location.protocol + "//" + window.location.host + iconPath;
		return uri;
	};

	function VerifySubtitle(uri) {
		var ret = true;
		if(uri.match(/(.srt|.ssa|.ass)$/gi) == null) {
			ret = false;
		}
		return ret;
	};
}

OutputPreview.prototype = {
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