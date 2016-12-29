var PLAYER_WIDTH = 624;
var PLAYER_HEIGHT = 358;
var DIALOG_OFFET = PLAYER_WIDTH + 20;

var g_contentPackaging = null;
var g_dynamicTextEditor = null;

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
	this.cpParser = new ContentPackagingParser();
	this.outputGroupIdx = 0;
	this.outputIdx = 0;
	this.inputParser = null;
	this.videoParser = null;
	this.cpList = new ContentPackagingList();
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
	this.playMode = 0;	//0- input, 1- output
}

ContentPackaging.prototype = {
	init : function() {
		this.dom = $("body").get(0);
		
		g_LineSelector = CreateLineSelector("LineSelector", $('body').get(0));
		
		g_PopBackground = new BackgroundControl();
		g_PopBackground.Init();
		
		g_dynamicTextEditor = CreateDynamicTextEditor("DynamicTextEditor", $("body").get(0));
		
		this.cpList.init($(cpjs.ContentPackagingList, this.dom).get(0));
		this.cpList.setParent(this);

		this.initPlayer();
		
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
			context.playOutput();
		});
		
		$(cpjs.OutputSelect, this.dom).change(function() {
			context.outputIdx = parseInt($(this).val());
			context.updateUI();
			context.playOutput();
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
		
		$(cpjs.ImportTrigger, this.dom).click(function() {
			context.requestContentPackagingList();
		});
		
		$(cpjs.CopySourceTrigger, this.dom).click(function() {
			var text = $(cpjs.InputSource, context.dom).val();
			var ret = copy_clip(text);
			if(ret) {
				alert(str_warning.copy_success);
			}
			else {
				alert(str_warning.copy_failed);
			}
		});
		
		$(cpjs.CopyOutputTrigger, this.dom).click(function() {
			var dom = $(cpjs.OutputGroupSelect, context.dom).get(0);
			var text = dom.options[dom.selectedIndex].text;    
			var ret = copy_clip(text);
			if(ret) {
				alert(str_warning.copy_success);
			}
			else {
				alert(str_warning.copy_failed);
			}
		});
		
		$(cpjs.PlaySourceTrigger, this.dom).click(function() {
			context.playSource();
		});
		
		$(cpjs.PlayOutputTrigger, this.dom).click(function() {
			context.playOutput();
		});
		
		$(cpjs.UploadMaterialTrigger, this.dom).click(function() {
			window.location.href = "#listMaterial.action";
		});
		
		$(cpjs.ContentPackagingMgrTrigger, this.dom).click(function() {
			//window.location.href = "#listMaterial.action";
		});
		
		$(cpjs.BackTrigger, this.dom).click(function() {
			var fromUri = $(cpjs.FromUri, context.dom).val();
			if(fromUri != null && fromUri.length > 0) {
				window.location.href = fromUri;
			}
			else {
				history.back();
			}
		});
		
		$(".SaveDescriptionTrigger", this.dom).click(function() {
			context.onSaveDescripiton();
		});
	},
	
	onSaveDescripiton: function() {
		var taskId = $(cpjs.TaskId, this.dom).val();
		var url = "api/task/description/" + taskId;
		var desc = $(".TaskDescription", this.dom).val();
		var xml = "<?xml version='1.0' encoding='UTF-8'?>" + "<task><description>" + desc + "</description></task>";
		httpPost(url, xml, function(data) {
			var a = data;
		});
	},
	
	requestContentPackagingList : function() {
		var url = "listContentPackagingBrief";
		var param = {rnd: Math.random()};
		
		var context = this;
		$.post(url, param, function(data) {
			context.responseContentPackagingList(data);
		});
	},
	
	responseContentPackagingList : function(data) {
		var context = this;
		var $data = $(parseDom(data));
		var arr = [];
		$(".ContentPackagingItem", $data).each(function() {
			var o = {};
			o.key = $(".id", this).get(0).innerText;
			o.value = $(".name", this).get(0).innerText;
			arr.push(o);
		});
		
		g_LineSelector.setContent(arr);
		g_LineSelector.setTitle(str_common.content_packaging);
		g_LineSelector.setOnSelected(function(key) {
			context.requestContentPackagingXml(key);
		});
		var rect = g_LineSelector.getRect();
		var pos = uGetCenterPos(rect.width, rect.height);
		var panelPos = $(cpjs.ContentPackaging).offset();
		g_LineSelector.show(panelPos.left + DIALOG_OFFET, pos.y);
	},
	
	requestContentPackagingXml : function(id) {
		var context = this;
		var url = "api/contentpackaging/" + id;
		var param = {rnd: Math.random()};
		$.get(url, param, function(xml) {
			context.responseContentPackagingXml(xml);
		});
	},
	
	responseContentPackagingXml : function(xml) {
		this.cpParser.parseString(xml);
		if(this.cpParser.dom == null) {
			alert(str_warning.load_profile_failed);
			return;
		}
		
		this.updateContentPackaging();
		this.generateContentPackagingList();
	},
	
	getParsers : function(preprocessors, tagName) {
		var parsers = [];
		for(var i = 0; i < preprocessors.length; i++) {
			var pilot = preprocessors[i];
			var pTagName = pilot.getTagName();
			
			if(pTagName == tagName) {
				parsers.push(pilot);
			}
		}
		
		return parsers;
	},
	
	updateContentPackaging : function() {
		var motionIconParsers = this.getParsers(this.cpParser.preprocessors, tag.motionicon);
		var dynamicTextParsers = this.getParsers(this.cpParser.preprocessors, tag.dynamictext);
		
		var taskMotionIconParsers = this.getParsers(this.videoParser.preprocessors, tag.motionicon);
		var taskDynamicTextParsers = this.getParsers(this.videoParser.preprocessors, tag.dynamictext);

		var len = Math.min(motionIconParsers.length, taskMotionIconParsers.length);
		for(var i = 0; i < len; i++) {
			var parser = taskMotionIconParsers[i];
			var downParser = motionIconParsers[i];
			this.updateMotionIcon(parser, downParser);
		}
		
		if(len < taskMotionIconParsers.length) {
			for(var i = len; i< taskMotionIconParsers.length; i++) {
				var parser = taskMotionIconParsers[i];
				this.videoParser.deleteProcessor(parser);
			}
		}
		
		if(len < motionIconParsers.length) {
			for(var i = len; i < motionIconParsers.length; i++) {
				var parser = motionIconParsers[i];
				var markId = parseInt("0X"+uGetHexId(7));
				parser.setTagValue(tag.markid, markId);
				this.videoParser.addProcessor(parser);
			}
		}
		
		len = Math.min(dynamicTextParsers.length, taskDynamicTextParsers.length);
		for(var i = 0; i < len; i++) {
			var parser = taskDynamicTextParsers[i];
			var downParser = dynamicTextParsers[i];
			this.updateDynamicText(parser, downParser);
		}
		
		if(len < taskDynamicTextParsers.length) {
			for(var i = len; i< taskDynamicTextParsers.length; i++) {
				var parser = taskDynamicTextParsers[i];
				this.videoParser.deleteProcessor(parser);
			}
		}
		
		if(len < dynamicTextParsers.length) {
			for(var i = len; i < dynamicTextParsers.length; i++) {
				var parser = dynamicTextParsers[i];
				var markId = parseInt("0X"+uGetHexId(7));
				parser.setTagValue(tag.markid, markId);
				this.videoParser.addProcessor(parser);
			}
		}
		
		this.generateProcessors();
	},
	
	updateMotionIcon : function(parser, downParser) {
		if(downParser == null) {
			parser.setTagValue(tag.name, "");
			parser.setTagValue(tag.path, "");
		}
		else {
			parser.setTagValue(tag.name, downParser.getTagValue(tag.name));
			parser.setTagValue(tag.path, downParser.getTagValue(tag.path));
			parser.setTagValue(tag.posx, downParser.getTagValue(tag.posx));
			parser.setTagValue(tag.posy, downParser.getTagValue(tag.posy));
			parser.setTagValue(tag.framerate, downParser.getTagValue(tag.framerate));
			parser.setTagValue(tag.imageformat, downParser.getTagValue(tag.imageformat));
			parser.setTagValue(tag.isloop, downParser.getTagValue(tag.isloop));
			parser.setTagValue(tag.operate, downParser.getTagValue(tag.operate));
			parser.setTagValue(tag.initialactive, downParser.getTagValue(tag.initialactive));
			parser.setTagValue(tag.runtimevisible, downParser.getTagValue(tag.runtimevisible));
		}
	},
	
	updateDynamicText : function(parser, downParser) {
		if(downParser == null) {
			parser.setTagValue(tag.name, "");
			parser.setTagValue(tag.label, "");
		}
		else {
			parser.setTagValue(tag.name, downParser.getTagValue(tag.name));
			parser.setTagValue(tag.label, downParser.getTagValue(tag.label));
			parser.setTagValue(tag.font, downParser.getTagValue(tag.font));
			parser.setTagValue(tag.size, downParser.getTagValue(tag.size));
			parser.setTagValue(tag.posx, downParser.getTagValue(tag.posx));
			parser.setTagValue(tag.posy, downParser.getTagValue(tag.posy));
			parser.setTagValue(tag.width, downParser.getTagValue(tag.width));
			parser.setTagValue(tag.height, downParser.getTagValue(tag.height));
			parser.setTagValue(tag.color, downParser.getTagValue(tag.color));
			parser.setTagValue(tag.opacity, downParser.getTagValue(tag.opacity));
			parser.setTagValue(tag.bgcolor, downParser.getTagValue(tag.bgcolor));
			parser.setTagValue(tag.bgopacity, downParser.getTagValue(tag.bgopacity));
			parser.setTagValue(tag.animationtype, downParser.getTagValue(tag.animationtype));
			parser.setTagValue(tag.scrollmode, downParser.getTagValue(tag.scrollmode));
			parser.setTagValue(tag.scrollspeed, downParser.getTagValue(tag.scrollspeed));
			parser.setTagValue(tag.scrollinterval, downParser.getTagValue(tag.scrollinterval));
			parser.setTagValue(tag.operate, downParser.getTagValue(tag.operate));
			parser.setTagValue(tag.initialactive, downParser.getTagValue(tag.initialactive));
			parser.setTagValue(tag.runtimevisible, downParser.getTagValue(tag.runtimevisible));
		}
	},
	
	requestTaskList : function() {
		var url = "listTaskBrief";
		//"taskQuery.status":"RUNNING" is used in commandar
		var param = {filter: "RUNNING", "taskQuery.status":"RUNNING", rnd: Math.random()};
		
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
		this.play();
	},
	
	updateUI : function() {
		this.generateParser();
		this.generateInputInfo();
		this.generateOutputInfo();
		this.updateInput();
		this.updateOutputGroupSelect();
		this.updateOutputSelect();
		this.generateProcessors();
		this.generateContentPackagingList();
	},
	
	updateInput : function() {
		var uri = this.inputParser.getTagValue(tag.uri);
		$(cpjs.InputSource, this.dom).val(uri);
		
		var desc = this.taskParser.getTagValue(tag.description);
		$(".TaskDescription", this.dom).val(desc);
	},
	
	generateContentPackagingList : function() {
		var infoList = [];
		for(var i = 0; i < this.processors.length; i++) {
			var pilot = this.processors[i].parser;
			var tagName = pilot.getTagName();
			var o = {};
			
			//used by search
			o.parser = pilot;
			
			if(tagName == tag.motionicon) {
				o.processorType = tag.motionicon;
			}
			else if(tagName == tag.dynamictext) {
				o.processorType = tag.dynamictext;
				o.label = pilot.getTagValue(tag.label);
			}
			
			o.name = pilot.getTagValue(tag.name);
			o.posIndex = parseInt(pilot.getTagValue(tag.posindex));
			if(isNaN(o.posIndex) || o.posIndex < 0) {
				o.posIndex = i;
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
			}
			else {
				o.checkbox_disabled = true;
				o.checkbox_checked = true;
			}
			
			infoList.push(o);
		}

		this.cpList.setInfoList(infoList);
	},
	
	generateParser : function() {
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
		this.generateProcessors();
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
			this.videoInfo.pary = parseInt(this.videoParser.getTagValue(tag.par_y));
			this.videoInfo.parx = parseInt(this.videoParser.getTagValue(tag.par_x));
			this.videoInfo.width = parseInt(this.videoParser.getTagValue(tag.width));
			this.videoInfo.height = parseInt(this.videoParser.getTagValue(tag.height));
		}
	},
	
	generateProcessors : function() {
		this.clearProcessors();
		for(var i = 0; i < this.videoParser.preprocessors.length; i++) {
			var parser = this.videoParser.preprocessors[i];
			var tagName = parser.getTagName();
			if(tagName == tag.motionicon || tagName == tag.dynamictext) {
				var o = {};
				o.parser = parser;
				o.processor = this.addProcessor(o.parser);
				this.processors.push(o);
			}
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
			var parser = outputGroups[i];
			var o = {};
			o.key = i;
			var uri = parser.getTagValue(tag.uri);
			var container = parser.getTagValue(tag.container);
			if(container == CONTAINER_TSOVERHTTP
					|| container == CONTAINER_FLVOVERHTTP) {
				var preUri = location.href.substring(0, location.href.lastIndexOf("/"));
				var pathuri = parser.getTagValue(tag.pathuri);
				uri = preUri + "/" + pathuri + "/" + uri;
			}
			o.value = uri;
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
		o.isLoop = motionIconParser.getTagValue(tag.isloop);
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
			this.domPlayer.width = PLAYER_WIDTH;
			this.domPlayer.height = PLAYER_HEIGHT;
		}
		else {
			var fakePlayer = $("#FakePlayer", this.dom);
			fakePlayer.width(PLAYER_WIDTH);
			fakePlayer.height(PLAYER_HEIGHT);
		}
		
		if(this.domPlayer != null) {
			uDomAddEvent(this.domPlayer, "SelBoxPosition", CP_OnBoxChanged);
			uDomAddEvent(this.domPlayer, "SelPointPosition", CP_OnPointChanged);
		}
	},
	
	playSource : function() {
		if(this.domPlayer == null) return;
		
		this.clearPreview();
		
		if(this.playMode == 0) return;
		this.playMode = 0;
		
		this.domPlayer.Close();
		
		this.generateInputInfo();
		this.localURI = $(cpjs.InputSource, this.dom).val();
		
		this.play();
	},
	
	playOutput : function() {
		if(this.domPlayer == null) return;
		
		this.clearPreview();
		
		var dom = $(cpjs.OutputGroupSelect, this.dom).get(0);
		var uri = dom.options[dom.selectedIndex].text;
		
		//if(this.playMode == 1 && uri == this.localURI) return;
		this.playMode = 1;
		
		this.domPlayer.Close();
		
		this.program = {programId: -1, videoId: -1, audioId: -1, subtitleId: -2};
		
		this.localURI = uri;
		
		this.play();
	},
	
	play : function() {
		if(this.domPlayer == null) return;
		
		if(this.inputType == INPUT_TYPE_ASI.toLowerCase()) {
			//this.StartASI(this.localURI);
		}
		else if(this.inputType == INPUT_TYPE_SDI.toLowerCase()) {
			//this.StartSDI(this.localURI);
		}
		else {
			var _url = URI2HttpURL(this.localURI);
			this.playURI(_url);
		}
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
		if(parx > 0 && pary > 0) {
			if(parx * PLAYER_HEIGHT >= pary * PLAYER_WIDTH) {
				this.domPlayer.width = PLAYER_WIDTH;
				this.domPlayer.height = PLAYER_WIDTH * pary / parx;
			} else {
				this.domPlayer.height = PLAYER_HEIGHT;
				this.domPlayer.width = PLAYER_HEIGHT * parx / pary;
			}
		}
		
		//Fix bug ACV-5919 : move preview logo here 
		//apply logo
		//this.PreviewLogo();
		
		//this.PreviewDynamicText();
		
		//this.previewMotionIcon();
		
		if (ret == 0) 
			ret = this.domPlayer.Play();
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
	
	clearPreview : function() {
		this.clearPlayerImage();
		this.clearDynamicText();
	},
	
	preview : function() {
		if(this.domPlayer == null) return;
		
		this.clearPreview();
		
		if(this.playMode != 0) {
			this.playMode = 0;
			
			this.domPlayer.Close();
			
			this.generateInputInfo();
			this.localURI = $(cpjs.InputSource, this.dom).val();
			
			this.play();
		}
		
		for(var i = 0; i < this.processors.length; i++) {
			var processor = this.processors[i].processor;
			var previewInfo = this.getPreviewInfo(i);
			
			if(processor instanceof MotionIconItem) {
				if(previewInfo.runtimeVisible == 1) {
					this.previewMotionIcon(processor);
				}
			}
			else if(processor instanceof DynamicTextItem) {
				if(previewInfo.runtimeVisible == 1) {
					this.previewDynamicText(processor, previewInfo.label);
				}
			}
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
	clearDynamicText : function() {
		if(this.domPlayer == null) return;
		this.domPlayer.SetDisplayString("", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	},
	
	previewDynamicText : function(dynamicTextItem, label) {
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
		/*
		var renderx = parseInt(this.resolutionToRenderX(x));
		var rendery = parseInt(this.resolutionToRenderY(y));
		var opacity = parseInt(255 * this.rectImage.opacity / 100);
		
		var width = parseInt(this.resolutionToRenderX(item.width));
		var height = parseInt(this.resolutionToRenderY(item.height));
		
		var httpURI = this.getDynamicTextUri(this.rectImage.imageName, 0);
		
		this.domPlayer.AddLogoImage(httpURI, renderx, rendery, width, height, opacity);
		*/
		this.domPlayer.SetDisplayString(label, 
				item.font, parseInt(item.size), parseInt("0x"+item.color), parseInt(item.opacity), 
				parseInt("0x"+item.bgcolor), parseInt(item.bgopacity),
				parseInt(item.posx), parseInt(item.posy), parseInt(item.width), parseInt(item.height), 
				outVideoWidth, outVideoHeight, 0, -1);
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
		parser.setTagValue(tag.isloop, o.isLoop);
		parser.setTagValue(tag.operate, o.operate);
		/* check box is special*/
		parser.setTagValue(tag.initialactive, o.initialActive);
		
		/*runtime visible*/
		var tabItem = this.contentTab.getTab(index);
		var info = tabItem.getInfo();
		var runtimeVisible = 0;
		if(info.checkbox_disabled) {
			runtimeVisible = -1;
		}
		else {
			if(info.checkbox_checked) {
				runtimeVisible = 1;
			}
			else {
				runtimeVisible = 0;
			}
		}
		parser.setTagValue(tag.runtimevisible, runtimeVisible);
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
		var runtimeVisible = 0;
		if(info.checkbox_disabled) {
			runtimeVisible = -1;
		}
		else {
			if(info.checkbox_checked) {
				runtimeVisible = 1;
			}
			else {
				runtimeVisible = 0;
			}
		}
		parser.setTagValue(tag.runtimevisible, runtimeVisible);
	},
	
	getPreviewInfo : function(index) {
		var infoList = this.cpList.getInfoList();
		var parser = this.processors[index].parser;
		var tabInfo = null;
		for(var i = 0; i < infoList.length; i++) {
			if(infoList[i].parser == parser) {
				tabInfo = infoList[i];
				break;
			}
		}
		if(tabInfo == null) return;
		
		var info = {};
		if(tabInfo.processorType == tag.dynamictext) {
			info.label = tabInfo.label;
		}
		
		var runtimeVisible = 0;
		if(tabInfo.checkbox_disabled) {
			runtimeVisible = 1;
		}
		else {
			if(tabInfo.checkbox_checked) {
				runtimeVisible = 1;
			}
			else {
				runtimeVisible = 0;
			}
		}
		info.runtimeVisible = runtimeVisible;
		
		return info;
	},
	
	syncParser : function() {
		var list = this.cpList.getInfoList();
		for(var i = 0; i < list.length; i++) {
			var info = list[i];
			var parser = info.parser;
			
			if(info.processorType == tag.dynamictext) {
				parser.setTagValue(tag.label, info.label);
			}
			
			parser.setTagValue(tag.posindex, info.posIndex);
			
			var runtimeVisible = 0;
			if(info.checkbox_disabled) {
				runtimeVisible = -1;
			}
			else {
				if(info.checkbox_checked) {
					runtimeVisible = 1;
				}
				else {
					runtimeVisible = 0;
				}
			}
			
			parser.setTagValue(tag.runtimevisible, runtimeVisible);
		}
	},
	
	applyLiveParam : function() {
		//if(!this.bInfoChanged) return;
		
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
			var $data = $(data);
			if($data.length > 0 && $data.text() == "success") {
				alert(str_common.apply_success);
			}
			else {
				alert(str_common.apply_failed);
			}
			context.bInfoChanged = false;
		});
	},
	
	OnInfoChange : function() {
		this.bInfoChanged = true;
	},
};

