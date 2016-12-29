var PLAYER_WIDTH = 480;
var PLAYER_HEIGHT = 480;
var DIALOG_OFFET = 500;

var g_contentPackaging = null;
function OnContentPackagingLoad() {
	g_contentPackaging = new ContentPackaging();
	g_contentPackaging.init();
}

function CP_OnBoxChanged(left, top, right, bottom) {
	g_contentPackaging.onBoxChanged(left, top, right, bottom);
};

function CP_OnPointChanged(x, y, flag) {
	g_contentPackaging.onPointChanged(x, y, flag);
};

function ContentPackaging() {
	this.dom = null;
	this.domPlayer = null;
	this.taskParser = new TaskParser();
	this.outputGroupIdx = 0;
	this.outputIdx = 0;
	this.inputParser = null;
	this.videoParser = null;
	this.processorParsers = [];
	this.contentTab = new ContentTab();
	this.processors = [];	//[{processor, parser}]
	this.localURI = null;
	this.inputType = null;
	this.program = {programId: -1, videoId: -1, audioId: -1, subtitleId: -2};
	this.aspectRatio = {x: 0, y: 0};
	this.videoInfo = {width: 0, height: 0, parx: 4, pary: 3, par: "source"};
	this.trimInfo = {enable : ENABLE_FALSE};
	this.domPointX = null;
	this.domPointY = null;
	this.domLeft = null;
	this.domTop = null;
	this.domWidth = null;
	this.domHeight = null;
	this.rectImage = {imageName: "rect.bmp", width: 4, height: 4, opacity: 50};
	this.bInfoChanged = false;
}

ContentPackaging.prototype = {
	init : function() {
		this.dom = $("body").get(0);
		
		g_LineSelector = CreateLineSelector("LineSelector", $('body').get(0));
		
		g_PopBackground = new BackgroundControl();
		g_PopBackground.Init();
		
		this.contentTab.init($(cpjs.ContentTabList, this.dom).get(0));
		this.contentTab.setParent(this);

		this.bind();
		
		this.requestXml();
	},
	
	bind : function() {
		var context = this;
		
		$(cpjs.ApplyTrigger, this.dom).click(function() {
			context.applyLiveParam();
		});
		
		$(cpjs.PreviewTrigger, this.dom).click(function() {
			context.preview();
		});
		
		$(cpjs.PositionTrigger, this.dom).click(function() {
			context.beginSelectPosition();
		});
		
		$(cpjs.OutputGroupSelect, this.dom).change(function() {
			context.outputGroupIdx = parseInt($(this).val());
			context.outputIdx = 0;
			context.updateUI();
		});
		
		$(cpjs.OutputSelect, this.dom).change(function() {
			context.outputIdx = parseInt($(this).val());
			context.updateUI();
		});
		
		$(cpjs.TaskId, this.dom).click(function() {
			context.requestTaskList();
		});
		
		$(cpjs.DefaultButton, this.dom).mousedown(function() {
			$(this).addClass("DefaultButtonDown");
		});
		
		$(cpjs.DefaultButton, this.dom).mouseup(function() {
			$(this).removeClass("DefaultButtonDown");
		});
	},
	
	requestTaskList : function() {
		var url = "listTaskBrief";
		var param = {filter: "RUNNING", rnd: Math.random()};
		
		var context = this;
		$.post(url, param, function(data) {
			context.onResponseTaskList(data);
		});
	},
	
	onResponseTaskList : function(data) {
		var context = this;
		var $data = $(parseDom(data));
		var arr = [];
		$(".task", $data).each(function() {
			var o = {};
			o.key = $(".id", this).get(0).innerText;
			o.value = o.key + " - " + $(".name", this).get(0).innerText;
			arr.push(o);
		});
		
		g_LineSelector.setContent(arr);
		g_LineSelector.setTitle(str_task.task);
		g_LineSelector.setOnSelected(function(key) {
			$(cpjs.TaskId, context.dom).val(key);
			context.switchTask();
		});
		var rect = g_LineSelector.getRect();
		var pos = uGetCenterPos(rect.width, rect.height);
		var panelPos = $(cpjs.ContentPackaging).offset();
		g_LineSelector.show(panelPos.left + DIALOG_OFFET, pos.y);
	},
	
	switchTask : function() {
		var domTaskId = $(cpjs.TaskId, this.dom).val();
		var parserTaskId = this.taskParser.getAttrValue(tag.id);
		if(domTaskId != parserTaskId) {
			this.requestXml();
		}
	},
	
	onTabSelected : function(index) {
		this.clearPlayerImage();
		this.endSelectPoint();
		this.endSelectBox();
		this.updateProcessor(index);
	},
	
	onChecked : function(index, checked) {
		this.bInfoChanged = true;
	},
	
	requestXml : function() {
		var context = this;
		var taskId = $(cpjs.TaskId, this.dom).val();
		var url = "api/task/" + taskId;
		var param = {rnd: Math.random()};
		$.get(url, param, function(xml) {
			context.onResponse(xml);
		});
	},
	
	onResponse : function(xml) {
		this.taskParser.parseString(xml);
		if(this.taskParser.dom == null) {
			alert(str_task.load_task_failed);
			return;
		}
		
		this.updateUI();
	},
	
	updateUI : function() {
		this.generateParser();
		this.generateInputInfo();
		this.generateOutputInfo();
		this.updateOutputGroupSelect();
		this.updateOutputSelect();
		this.generateProcessors();
		this.generateTabs();
		this.initPlayer();
		this.play();
	},
	
	generateTabs : function() {
		var infoList = [];
		for(var i = 0; i < this.processorParsers.length; i++) {
			var pilot = this.processorParsers[i];
			var tagName = pilot.getTagName();
			var o = {};
			
			if(tagName == tag.motionicon) {
				o.label = str_motion_icon.title;
			}
			else if(tagName == tag.dynamictext) {
				o.label = str_dynamic_text.title;
			}
			
			var operate = pilot.getTagValue(tag.operate);
			var initActive = pilot.getTagValue(tag.initialactive);
			var runtimeVisible = pilot.getTagValue(tag.runtimevisible);
			
			if(operate == "1") {
				o.checkbox_disabled = false;
				
				if(runtimeVisible == "1") {
					o.checkbox_checked = true;
				}
				else if(runtimeVisible == "0") {
					o.checkbox_checked = false;
				}
				else {
					if(initActive == "1") {
						o.checkbox_checked = true;
					}
					else {
						o.checkbox_checked = false;
					}
				}
				//o.show = true;
			}
			else {
				o.checkbox_disabled = true;
				o.checkbox_checked = true;
				//o.show = false;
			}
			o.show = true;
			infoList.push(o);
		}
		this.contentTab.setList(infoList);
		
		if(this.processorParsers.length > 0)
			this.contentTab.select(0);
	},
	
	clearParser : function() {
		this.processorParsers.length = 0;
	},
	
	generateParser : function() {
		this.clearParser();
		
		if(this.taskParser.inputs.length > 0) {
			this.inputParser = this.taskParser.inputs[0];
		}
		
		var outputGroupParser = null;
		var outputParser = null;
		if(this.taskParser.outputgroups.length > this.outputGroupIdx) {
			outputGroupParser = this.taskParser.outputgroups[this.outputGroupIdx];
			if(outputGroupParser.outputs.length > this.outputIdx) {
				outputParser = outputGroupParser.outputs[this.outputIdx];
			}
		}
		
		var streamref = outputParser.getAttrValue(tag.streamref);
		var streamParser = null;
		for(var i = 0; i < this.taskParser.streams.length; i++) {
			var pilot = this.taskParser.streams[i];
			if(pilot.getAttrValue(tag.id) == streamref) {
				streamParser = pilot;
				break;
			}
		}
		
		var videoParser = null;
		if(streamParser != null && streamParser.videos.length > 0) {
			videoParser = streamParser.videos[0];
		}
		this.videoParser = videoParser;
		if(this.videoParser != null) {
			for(i = 0; i < videoParser.preprocessors.length; i++) {
				var pilot = videoParser.preprocessors[i];
				var tagName = pilot.getTagName();
				if(tagName == tag.motionicon || tagName == tag.dynamictext) {
					this.processorParsers.push(pilot);
				}
			}
		}
	},
	
	clearInputInfo : function() {
		this.localURI = null;
		this.inputType = null;
		this.program = {programId: -1, videoId: -1, audioId: -1, subtitleId: -2};
	},
	
	generateInputInfo : function() {
		this.clearInputInfo();
		if(this.inputParser != null) {
			this.localURI = this.inputParser.getTagValue(tag.uri);
			this.inputType = this.inputParser.getTagName();
			this.program.programId = parseInt(this.inputParser.getTagValue(tag.programid));
			this.program.audioId = parseInt(this.inputParser.getTagValue(tag.audiotrackid));
			this.program.subtitleId = parseInt(this.inputParser.getTagValue(tag.subtitleid));
		}
	},
	
	clearOutputInfo : function() {
		this.aspectRatio = {x: 0, y: 0};
		this.videoInfo = {width: 0, height: 0, parx: 4, pary: 3, par: "source"};
	},
	
	generateOutputInfo : function() {
		this.clearOutputInfo();
		
		if(this.videoParser != null) {
			this.videoInfo.par = this.videoParser.getTagValue(tag.par);
			this.videoInfo.pary = this.videoParser.getTagValue(tag.par_y);
			this.videoInfo.parx = this.videoParser.getTagValue(tag.par_x);
			this.videoInfo.width = this.videoParser.getTagValue(tag.width);
			this.videoInfo.height = this.videoParser.getTagValue(tag.height);
		}
	},
	
	generateProcessors : function() {
		this.clearProcessors();
		for(var i = 0; i < this.processorParsers.length; i++) {
			var o = {};
			o.parser = this.processorParsers[i];
			o.processor = this.addProcessor(o.parser);
			this.processors.push(o);
		}
	},
	
	addProcessor : function(parser) {
		var processor = null;
		if(parser.getTagName() == tag.motionicon) {
			processor = this.addMotionIcon(parser);
		}
		else if(parser.getTagName() == tag.dynamictext) {
			processor = this.addDynamicText(parser);
		}
		
		return processor;
	},
	
	updateOutputGroupSelect : function() {
		var arr = [];
		var outputGroups = this.taskParser.outputgroups;
		for(var i = 0; i < outputGroups.length; i++) {
			var o = {};
			o.key = i;
			o.value = i+1;
			arr.push(o);
		}
		
		uUpdateSelect($(cpjs.OutputGroupSelect, this.dom).get(0), arr);
	},
	
	updateOutputSelect : function() {
		var arr = [];
		var outputGroupParser = this.taskParser.outputgroups[this.outputGroupIdx];
		var outputs = outputGroupParser.outputs;
		for(var i = 0; i < outputs.length; i++) {
			var o = {};
			o.key = i;
			o.value = i+1;
			arr.push(o);
		}
		uUpdateSelect($(cpjs.OutputSelect, this.dom).get(0), arr);
	},
	
	clearProcessors : function() {
		$(cpjs.ContentParamItem, this.dom).empty();
		this.processors.length = 0;
	},
	
	updateProcessor : function(index) {
		if(this.processors.length <= index) return;

		for(var i = 0; i < this.processors.length; i++) {
			var pilot = this.processors[i];
			if(i == index) {
				pilot.processor.Show();
			}
			else {
				pilot.processor.Hide();
			}
		}
	},
	
	addMotionIcon : function(motionIconParser) {
		var motionIconItem = new MotionIconItem();
		motionIconItem.Create($(cpjs.ContentParamItem, this.dom).get(0), cptmpl.ContentMotionIcon);
		motionIconItem.SetParent(this);

		motionIconItem.SetFnGetOffset(function(dialog) {
			var rect = dialog.getRect();
			var pos = uGetCenterPos(rect.width, rect.height);
			var panelPos = $(cpjs.ContentPackaging).offset();
			var offset = {};
			offset.left = panelPos.left + DIALOG_OFFET;
			offset.top = pos.y;
			return offset;
		});

		var o = {};
		o.name = motionIconParser.getTagValue(tag.name);
		o.path = motionIconParser.getTagValue(tag.path);
		o.posx = motionIconParser.getTagValue(tag.posx);
		o.posy = motionIconParser.getTagValue(tag.posy);
		o.frameRate = motionIconParser.getTagValue(tag.framerate);
		o.imageFormate = motionIconParser.getTagValue(tag.imageformat);
		o.operate = motionIconParser.getTagValue(tag.operate);
		/* check box is special*/
		o.initialActive = motionIconParser.getTagValue(tag.initialactive);
		motionIconItem.SetInfo(o);
		
		return motionIconItem;
	},
	
	addDynamicText : function(parser) {
		var dynamicTextItem = new DynamicTextItem();
		dynamicTextItem.Create($(cpjs.ContentParamItem, this.dom).get(0), cptmpl.ContentDynamicText);
		dynamicTextItem.SetParent(this);
		
		dynamicTextItem.SetFnGetOffset(function(dialog) {
			var rect = dialog.getRect();
			var pos = uGetCenterPos(rect.width, rect.height);
			var panelPos = $(cpjs.ContentPackaging).offset();
			var offset = {};
			offset.left = panelPos.left + DIALOG_OFFET;
			offset.top = pos.y;
			return offset;
		});

		var o = {};
		o.name = parser.getTagValue(tag.name);
		o.label = parser.getTagValue(tag.label);
		o.font = parser.getTagValue(tag.font);
		o.size = parser.getTagValue(tag.size);
		o.posx = parser.getTagValue(tag.posx);
		o.posy = parser.getTagValue(tag.posy);
		o.width = parser.getTagValue(tag.width);
		o.height = parser.getTagValue(tag.height);
		o.color = parser.getTagValue(tag.color);
		o.opacity = parser.getTagValue(tag.opacity);
		o.bgcolor = parser.getTagValue(tag.bgcolor);
		o.bgopacity = parser.getTagValue(tag.bgopacity);
		o.animationType = parser.getTagValue(tag.animationtype);
		o.scrollMode = parser.getTagValue(tag.scrollmode);
		o.speed = parser.getTagValue(tag.scrollspeed);
		o.interval = parser.getTagValue(tag.scrollinterval);
		o.operate = parser.getTagValue(tag.operate);
		/* check box is special*/
		o.initialActive = parser.getTagValue(tag.initialactive);
		dynamicTextItem.SetInfo(o);
		
		return dynamicTextItem;
	},
	
	initPlayer : function() {
		if(this.domPlayer != null) return;
		
		this.domPlayer = Player_Init($(JS_PLAYER_CONTAINER, this.dom).get(0));
		
		if(this.domPlayer != null) {
			uDomAddEvent(this.domPlayer, "SelBoxPosition", CP_OnBoxChanged);
			uDomAddEvent(this.domPlayer, "SelPointPosition", CP_OnPointChanged);
		}
	},
	
	play : function() {
		if(this.domPlayer == null) return;
		
		if(this.inputType == INPUT_TYPE_SDI
				|| this.inputType == INPUT_TYPE_CVBS
				|| this.inputType == INPUT_TYPE_HDMI
				|| this.inputType == INPUT_TYPE_ASI) {
			this.startDevicePreview(this.localURI);
			this.keepAlive();
		}
		else {
			var _url = URI2HttpURL(this.localURI);
			this.playURI(_url);
		}
	},
	
	keepAlive : function() {
		var _requestURL = "keepAlivePreview";
		var _param = {};
		if(g_params_preview_action != null) {
			$.extend(_param, _param, g_params_preview_action);
		}
		this.timer = setInterval(function(){
			$.post(_requestURL, _param);
		}, 15000);
	},
	
	playURI : function(httpURI) {
		if(this.domPlayer == null) return;
		var ret = 0;
		
		Player_SelectTrack(this.domPlayer, this.localURI, this.program);
		
		//apply input mosaic
		//this.ApplyInputMosaic();
		//apply input clip, clip use input width & height
		//this.ApplyInputClip();
		//this.ApplyInputAdvertisement();

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
		
		//this.SetOutVideoSize();
		
		//apply subtitle
		//this.PreviewSubtitle();
		
		//this.ApplyInputTrim();

		//change aspect ratio
		var trim = this.trimInfo;
		var parx = 0;
		var pary = 0;
		if(this.videoInfo.par == "source") {
			if(trim.enable != ENABLE_TRUE) {
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
			this.domPlayer.ChangeAspectRatio(parx, pary, -1, 0);
		}
		
		//Play
		if(parx >= pary) {
			this.domPlayer.width = PLAYER_WIDTH;
			this.domPlayer.height = PLAYER_WIDTH * pary / parx;
		} else {
			this.domPlayer.height = PLAYER_HEIGHT;
			this.domPlayer.width = PLAYER_HEIGHT * parx / pary;
		}
		
		//Fix bug ACV-5919 : move preview logo here 
		//apply logo
		//this.PreviewLogo();
		
		//this.PreviewDynamicText();
		
		//this.previewMotionIcon();
		
		if (ret == 0) ret = this.domPlayer.Play();
	},
	

	startDevicePreview : function(uri) {
		function ParseData(data) {
			if(data == null) return null;
			var $data = $(data);
			var text = $("#monitorUrl", $data).text();
			return text;
		}
		
		var context = this;
		var port = parseInt(uri);
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
			var monitorUrl = ParseData(data);
			if(monitorUrl != null) {
				context.bDeviceStarted = true;
			}
			
			var _url = URI2HttpURL(monitorUrl);
			context.PlayURI(_url);
		}, "html");
	},
	
	stopDevicePreview : function(uri) {
		var context = this;
		var port = parseInt(uri);
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
	},
	
	getSourceVideoWidth : function() {
		//source video width should fetch from player, because of smart border.
		var width = this.domPlayer.GetVideoWidth();
		return width;
	},
	
	getSourceVideoHeight : function() {
		var height = this.domPlayer.GetVideoHeight();
		return height;
	},
	
	getOutputVideoWidth : function() {
		var width = parseInt(this.videoInfo.width);
		if(isNaN(width) || width == null) {
			//width = this.mediaInfoWidth;
		}
		if(isNaN(width) || width == null) {
			width = this.domPlayer.GetVideoWidth();
		}
		return width;
	},
	
	getOutputVideoHeight : function() {
		var height = parseInt(this.videoInfo.height);
		if(isNaN(height) || height == null) {
			//height = this.mediaInfoHeight;
		}
		if(isNaN(height) || height == null) {
			height = this.domPlayer.GetVideoHeight();
		}
		return height;
	},
	
	resolutionToRenderX : function(pos) {
		var width = this.getSourceVideoWidth();
		var outWidth = this.getOutputVideoWidth();
		if(outWidth == null) {
			return pos;
		} else {
			return pos * width / outWidth;
		}
	},
	
	resolutionToRenderY : function(pos) {
		var height = this.getSourceVideoHeight();
		var outHeight = this.getOutputVideoHeight();
		if(outHeight == null) {
			return pos;
		} else {
			return pos * height / outHeight;
		}
	},
	
	renderToResolutionX : function(pos) {
		var width = this.domPlayer.GetVideoWidth();
		var outWidth = this.getOutputVideoWidth();
		if(outWidth == 0) {
			return pos;
		} else {
			return pos * outWidth / width;
		}
	},
	
	renderToResolutionY : function(pos) {
		var height = this.domPlayer.GetVideoHeight();
		var outHeight = this.getOutputVideoHeight();
		if(isNaN(outHeight)) {
			return pos;
		} else {
			return pos * outHeight / height;
		}
	},
	
	preview : function() {
		var index = this.contentTab.getSelectedIndex();
		var processor = this.processors[index].processor;
		
		this.endSelectPoint();
		this.endSelectBox();
		this.clearPlayerImage();
		
		if(processor instanceof MotionIconItem) {
			this.previewMotionIcon(processor);
		}
		else if(processor instanceof DynamicTextItem) {
			this.previewDynamicText(processor);
		}
	},
	
	/* Motion Icon */
	clearPlayerImage : function() {
		if(this.domPlayer == null) return;
		this.domPlayer.AddLogoImage("", 0, 0, 0, 0, 0);
	},
	
	previewMotionIcon : function(motionIconItem) {
		if(motionIconItem == null) return;
		if(this.domPlayer == null) return;
		
		var outVideoWidth = this.getOutputVideoWidth();
		var outVideoHeight = this.getOutputVideoHeight();
		if(outVideoWidth == 0 || outVideoHeight == 0) {
			return;
		}
		
		var item = motionIconItem.GetInfo();
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
		var renderx = parseInt(this.resolutionToRenderX(x));
		var rendery = parseInt(this.resolutionToRenderY(y));
		var opacity = 255;
		
		var width = null;
		var height = null;
		width = outVideoWidth;
		if(width != 0) width += 0x01000000;
		height = outVideoHeight;
		if(height != 0) height += 0x01000000;
		
		var httpURI = URI2HttpURL(item.imageName);
		
		this.domPlayer.AddLogoImage(httpURI, renderx, rendery, width, height, opacity);
	},
	/* MotionIcon end */
	
	/* DynamicText */
	previewDynamicText : function(dynamicTextItem) {
		if(dynamicTextItem == null) return;
		if(this.domPlayer == null) return;

		var outVideoWidth = this.getOutputVideoWidth();
		var outVideoHeight = this.getOutputVideoHeight();
		if(outVideoWidth == 0 || outVideoHeight == 0) {
			return;
		}
		
		var item = dynamicTextItem.GetInfo();
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
		var renderx = parseInt(this.resolutionToRenderX(x));
		var rendery = parseInt(this.resolutionToRenderY(y));
		var opacity = parseInt(255 * this.rectImage.opacity / 100);
		
		var width = parseInt(this.resolutionToRenderX(item.width));
		var height = parseInt(this.resolutionToRenderY(item.height));
		
		var httpURI = this.getDynamicTextUri(this.rectImage.imageName, 0);
		
		this.domPlayer.AddLogoImage(httpURI, renderx, rendery, width, height, opacity);
	},
	
	getDynamicTextUri : function(imageName, index) {
		var uri = this.getPreviewImageUri(imageName);
		uri += "?index="+index;
		return uri;
	},
	
	getPreviewImageUri : function(imageName) {
		var pathName = window.location.pathname;
		pathName = pathName.substring(0, pathName.indexOf("/", 1));
		var iconPath = pathName + "/images/icons/" + imageName;
		uri = window.location.protocol + "//" + window.location.host + iconPath;
		return uri;
	},
	/* DynamicText end*/
	
	/* select position */
	beginSelectPosition : function() {
		var index = this.contentTab.getSelectedIndex();
		if(this.processors.length <= index) return;
		
		var processor = this.processors[index].processor;
		
		if(processor instanceof MotionIconItem) {
			this.beginSelectPoint(processor.dom);
		}
		else if(processor instanceof DynamicTextItem) {
			this.beginSelectBox(processor.dom);
		}
	},
	
	endSelectPoint : function() {
		if(this.domPlayer == null) return;
		this.domPlayer.SelectPoint(0, 0xffffffff);
	},
	
	onPointChanged : function(x, y, flag) {
		var outx = Math.round(this.renderToResolutionX(x));
		var outy = Math.round(this.renderToResolutionY(y));
		if(this.domPointX != null) this.domPointX.value = outx;
		if(this.domPointY != null) this.domPointY.value = outy;
		
		this.bInfoChanged = true;
	},
	
	beginSelectPoint : function(domItem) {
		if(this.domPlayer == null) return;

		this.domPointX = $(JS_MOTION_ICON_X, domItem).get(0);
		this.domPointY = $(JS_MOTION_ICON_Y, domItem).get(0);
		
		this.domPlayer.SelectPoint(1, 0xff00ff00);
	},

	onBoxChanged : function(left, top, right, bottom) {
		var width = right - left;
		var height = bottom - top;
		
		var outx = Math.round(this.renderToResolutionX(left));
		var outy = Math.round(this.renderToResolutionY(top));
		var outwidth = Math.round(this.renderToResolutionX(width));
		var outheight = Math.round(this.renderToResolutionY(height));
		
		this.domLeft.value = outx;
		this.domTop.value = outy;
		this.domWidth.value = outwidth;
		this.domHeight.value = outheight;
		
		this.bInfoChanged = true;
	},
	
	beginSelectBox : function(domItem) {
		if(this.domPlayer == null) return;

		this.domLeft = $(JS_DYNAMIC_TEXT_POSX, domItem).get(0);
		this.domTop = $(JS_DYNAMIC_TEXT_POSY, domItem).get(0);
		this.domWidth = $(JS_DYNAMIC_TEXT_WIDTH, domItem).get(0);
		this.domHeight = $(JS_DYNAMIC_TEXT_HEIGHT, domItem).get(0);
		
		var left = parseInt(this.domLeft.value);
		var top = parseInt(this.domTop.value);
		var width = parseInt(this.domWidth.value);
		var height = parseInt(this.domHeight.value);
		
		if(!this.valedateSelectedRect(left, top, width, height)) {
			alert(str_warning.subtitle_out_of_range);
			return;
		}
			
		var outx = Math.round(this.resolutionToRenderX(left));
		var outy = Math.round(this.resolutionToRenderY(top));
		var outright = Math.round(this.resolutionToRenderX(left + width));
		var outbottom = Math.round(this.resolutionToRenderY(top + height));

		this.domPlayer.SetSelBoxPosition(outx, outy, outright, outbottom);
		
		this.domPlayer.SelectRectBox(1, 0xff00ff00);
	},
	
	endSelectBox : function() {
		if(this.domPlayer == null) return;
		this.domPlayer.SelectRectBox(0, 0xffffffff);
	},
	
	valedateSelectedRect : function(left, top, width, height) {
		if(isNaN(left) || isNaN(top) || isNaN(width) || isNaN(height)) return false;
		if(left < 0 || top < 0 || width < 0 || height < 0) return false;
		if(left + width > this.getOutputVideoWidth()) return false;
		if(top + height > this.getOutputVideoHeight()) return false;
		
		return true;
	},
	/* select position end */
	
	syncMotionIconParser : function(index) {
		var processor = this.processors[index].processor;
		var parser = this.processors[index].parser;
		var o = processor.GetInfo();
		parser.setTagValue(tag.name, o.name);
		parser.setTagValue(tag.path, o.path);
		parser.setTagValue(tag.posx, o.posx);
		parser.setTagValue(tag.posy, o.posy);
		parser.setTagValue(tag.framerate, o.frameRate);
		parser.setTagValue(tag.imageformat, o.imageFormate);
		parser.setTagValue(tag.operate, o.operate);
		/* check box is special*/
		parser.setTagValue(tag.initialactive, o.initialActive);
		
		/*runtime visible*/
		var tabItem = this.contentTab.getTab(index);
		var info = tabItem.getInfo();
		var runtimevislble = 0;
		if(info.checkbox_disabled) {
			runtimevislble = -1;
		}
		else {
			if(info.checkbox_checked) {
				runtimevislble = 1;
			}
			else {
				runtimevislble = 0;
			}
		}
		parser.setTagValue(tag.runtimevisible, runtimevislble);
	},
	
	syncDynamicTextParser : function(index) {
		var processor = this.processors[index].processor;
		var parser = this.processors[index].parser;
		var o = processor.GetInfo();
		parser.setTagValue(tag.name, o.name);
		parser.setTagValue(tag.label, o.label);
		parser.setTagValue(tag.font, o.font);
		parser.setTagValue(tag.size, o.size);
		parser.setTagValue(tag.posx, o.posx);
		parser.setTagValue(tag.posy, o.posy);
		parser.setTagValue(tag.width, o.width);
		parser.setTagValue(tag.height, o.height);
		parser.setTagValue(tag.color, o.color);
		parser.setTagValue(tag.opacity, o.opacity);
		parser.setTagValue(tag.bgcolor, o.bgcolor);
		parser.setTagValue(tag.bgopacity, o.bgopacity);
		parser.setTagValue(tag.animationtype, o.animationType);
		parser.setTagValue(tag.scrollmode, o.scrollMode);
		parser.setTagValue(tag.scrollspeed, o.speed);
		parser.setTagValue(tag.scrollinterval, o.interval);
		parser.setTagValue(tag.operate, o.operate);
		/* check box is special*/
		parser.setTagValue(tag.initialactive, o.initialActive);
		
		/*runtime visible*/
		var tabItem = this.contentTab.getTab(index);
		var info = tabItem.getInfo();
		var runtimevislble = 0;
		if(info.checkbox_disabled) {
			runtimevislble = -1;
		}
		else {
			if(info.checkbox_checked) {
				runtimevislble = 1;
			}
			else {
				runtimevislble = 0;
			}
		}
		parser.setTagValue(tag.runtimevisible, runtimevislble);
	},
	
	syncParser : function() {
		for(var i = 0; i < this.processors.length; i++) {
			var pilot = this.processors[i];
			if(pilot.processor instanceof MotionIconItem) {
				this.syncMotionIconParser(i);
			}
			else if(pilot.processor instanceof DynamicTextItem) {
				this.syncDynamicTextParser(i);
			}
		}
	},
	
	applyLiveParam : function() {
		if(!this.bInfoChanged) return;
		
		this.syncParser();
		
		var taskId = $(cpjs.TaskId, this.dom).val();
		var xml = this.videoParser.toString();
		
		this.requestLiveControl(taskId, xml);
	},
	
	requestLiveControl : function(taskId, xml) {
		var context = this;
		var url = "liveControl";
		var param = {"taskId" : taskId, "xml" : xml};
		
		$.post(url, param, function(data) {
			context.bInfoChanged = false;
		});
	},
	
	OnInfoChange : function() {
		this.bInfoChanged = true;
	},
	
	_end : ""
};

