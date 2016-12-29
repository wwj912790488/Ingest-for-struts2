var PLAYER_WIDTH = 624;
var PLAYER_HEIGHT = 358;
var DIALOG_OFFET = PLAYER_WIDTH + 20;

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
	this.xmlParser = new ContentPackagingParser();
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
	this.miIndex = 0;
	this.dtIndex = 0;
	this.bSaving = false;
	
	this.tagMap = [
  		{key: tag.name,	value: cpjs.ContentPackagingName},
  		{key: tag.description,	value: cpjs.ContentPackagingDescription}
  		];
	
	this.aspectRatioMap = [
	 	{key: "16:9", value: "16 : 9"},
	 	{key: "4:3", value: "4 : 3"},
	 	{key: "40:33", value: "40 : 33"},
	 	{key: "16:11", value: "16 : 11"},
	 	{key: "221:100", value: "2.21 :1"}
	 	];
}

ContentPackaging.prototype = {
	init : function() {
		this.dom = $("body").get(0);
		
		g_LineSelector = CreateLineSelector("LineSelector", $('body').get(0));
		
		g_PopBackground = new BackgroundControl();
		g_PopBackground.Init();
		
		g_InputFileView = new FileView();
		dom = g_InputFileView.Init();
		$('body').append(dom);
		title = str_common.selectInputPath;
		g_InputFileView.SetTitle(title);
		
		this.contentTab.init($(cpjs.ContentTabList, this.dom).get(0));
		this.contentTab.setParent(this);

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
		
		$(cpjs.NewMotionIconTrigger, this.dom).click(function() {
			context.newMotionIcon();
		});
		
		$(cpjs.NewDynamicTextTrigger, this.dom).click(function() {
			context.newDynamicText();
		});
		
		$(cpjs.DeleteProcessorTrigger, this.dom).click(function() {
			context.deleteProcessors();
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
		
		$(cpjs.SaveTrigger, this.dom).click(function() {
			context.save();
		});
		
		$(cpjs.SelectSourceTrigger, this.dom).click(function() {
			g_InputFileView.SetOnOK(function(key) {
				$(cpjs.ContentPackagingSource, context.dom).val(key);
			});
			
			var rect = g_InputFileView.GetRect();
			var pos = uGetCenterPos(rect.width, rect.height);
			var panelPos = $(cpjs.ContentPackaging).offset();

			g_InputFileView.Show(panelPos.left + DIALOG_OFFET, pos.y);
		});
		
		$(cpjs.PlayTrigger, this.dom).click(function() {
			context.play();
		});
		
		$(cpjs.ResolutionTrigger, this.dom).click(function() {
			context.updateResolution();
		});
		
		$(cpjs.AspectRatioTrigger, this.dom).click(function() {
			context.updateAspectRatio();
		});
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
		var parserTaskId = this.xmlParser.getAttrValue(tag.id);
		if(domTaskId != parserTaskId) {
			this.requestXml();
		}
	},
	
	onTabSelected : function(index) {
		this.clearPlayerImage();
		this.clearDynamicText();
		this.endSelectPoint();
		this.endSelectBox();
		this.updateProcessor(index);
	},
	
	onChecked : function(index, checked) {
		this.bInfoChanged = true;
	},
	
	requestXml : function() {
		var context = this;
		var id = $(cpjs.ContentPackagingId, this.dom).val();
		var url = "api/contentpackaging/" + id;
		var param = {rnd: Math.random()};
		$.get(url, param, function(xml) {
			context.onResponse(xml);
		});
	},
	
	onResponse : function(xml) {
		this.xmlParser.parseString(xml);
		if(this.xmlParser.dom == null) {
			alert(str_task.load_task_failed);
			return;
		}
		
		this.updateUI();
	},
	
	updateUI : function() {
		this.generateParser();
		//this.generateInputInfo();
		//this.generateOutputInfo();
		//this.updateOutputGroupSelect();
		//this.updateOutputSelect();
		this.updateInfo();
		this.generateProcessors();
		this.generateTabs();
		//this.initPlayer();
		//this.play();
	},
	
	generateTabs : function() {
		var infoList = [];
		for(var i = 0; i < this.processors.length; i++) {
			var pilot = this.processors[i].parser;
			var tagName = pilot.getTagName();
			var o = {};
			
			if(tagName == tag.motionicon) {
				this.miIndex++;
				o.label = str_motion_icon.title + " " + this.miIndex;
			}
			else if(tagName == tag.dynamictext) {
				this.dtIndex++;
				o.label = str_dynamic_text.title + " " + this.dtIndex;
			}

			o.show = true;
			o.checkbox_checked = false;
			o.checkbox_disabled = false;
			o.userData = this.processors[i].processor;
			
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
		
		var cpParser = this.xmlParser;
		for(i = 0; i < cpParser.preprocessors.length; i++) {
			var pilot = cpParser.preprocessors[i];
			var tagName = pilot.getTagName();
			if(tagName == tag.motionicon || tagName == tag.dynamictext) {
				this.processorParsers.push(pilot);
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

		this.videoInfo.par = "custom";
		this.videoInfo.parx = parseInt($(cpjs.AspectRatioX, this.dom).val());
		this.videoInfo.pary = parseInt($(cpjs.AspectRatioY, this.dom).val());
		this.videoInfo.width = parseInt($(cpjs.OutputWidth, this.dom).val());
		this.videoInfo.height = parseInt($(cpjs.OutputHeight, this.dom).val());
	},
	
	updateInfo : function() {
		var name = this.xmlParser.getTagValue(tag.name);
		var description = this.xmlParser.getTagValue(tag.description);
		$(cpjs.ContentPackagingName).val(name);
		$(cpjs.ContentPackagingDescription).val(description);
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
		var outputGroups = this.xmlParser.outputgroups;
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
		var outputGroupParser = this.xmlParser.outputgroups[this.outputGroupIdx];
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
		var tabInfo = this.contentTab.getInfo(index);

		for(var i = 0; i < this.processors.length; i++) {
			var pilot = this.processors[i].processor;
			if(pilot == tabInfo.userData) {
				pilot.Show();
			}
			else {
				pilot.Hide();
			}
		}
	},
	
	getMotionIconCount : function() {
		var count = 0;
		for(var i = 0; i < this.processors.length; i++) {
			if(this.processors[i].processor instanceof MotionIconItem) {
				count++;
			}
		}
		return count;
	},
	
	getDynamicTextCount : function() {
		var count = 0;
		for(var i = 0; i < this.processors.length; i++) {
			if(this.processors[i].processor instanceof DynamicTextItem) {
				count++;
			}
		}
		return count;
	},
	
	newMotionIcon : function() {
		var count = this.getMotionIconCount();
		if(count >= MAX_COUNT_MOTION_ICON_ITEM) {
			return;
		}
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
		o.processor = motionIconItem;
		this.processors.push(o);

		var tabInfo = {};
		this.miIndex++;
		tabInfo.label = str_motion_icon.title + " " + this.miIndex;
		tabInfo.userData = o.processor;
		this.contentTab.insertItem(tabInfo, count);
		this.contentTab.select(count);
		
		return motionIconItem;
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
	
	newDynamicText : function() {
		var count = this.getDynamicTextCount();
		if(count >= MAX_COUNT_MOTION_ICON_ITEM) {
			return;
		}
		
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
		o.processor = dynamicTextItem;
		this.processors.push(o);
		
		var tabInfo = {};
		this.dtIndex++;
		tabInfo.label = str_dynamic_text.title + " " + this.dtIndex
		tabInfo.userData = o.processor;
		this.contentTab.addItem(tabInfo);
		this.contentTab.select(this.contentTab.getSize() - 1);
		
		return dynamicTextItem;
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
	
	deleteProcessor : function(processor) {
		var index = null;
		for(var i = 0; i < this.processors.length; i++) {
			if(this.processors[i].processor == processor) {
				index = i;
				break;
			}
		}
		
		if(index != null) {
			this.processors.splice(index, 1);
			processor.Delete();
		}
	},
	
	deleteProcessors : function() {
		/*var resetSelect = false;
		var selectedIndex = this.contentTab.getSelectedIndex();
		var items = [];
		for(var i = 0; i < this.contentTab.getSize(); i++) {
			var tabInfo = this.contentTab.getInfo(i);
			if(tabInfo.checkbox_checked) {
				this.deleteProcessor(tabInfo.userData);
				items.push(this.contentTab.getTab(i));
				if(selectedIndex == i) {
					resetSelect = true;
				}
			}
		}
		
		for(var i = 0; i < items.length; i++) {
			this.contentTab.deleteItem(items[i]);
		}
		
		if(resetSelect) {
			this.contentTab.select(0);
		}*/
		
		var item = this.contentTab.getSelectedItem();
		var tabInfo = item.getInfo();
		this.deleteProcessor(tabInfo.userData);
		this.contentTab.deleteItem(item);
		this.contentTab.select(0);
	},
	
	onSaveResponse : function(xmlText) {
		var xml = loadXML(xmlText);
		var $error = $(xml).find("error");
		var fromUri = $(cpjs.FromUri, this.dom).val();
		if($error.length == 0) {
			if(fromUri != null && fromUri.length > 0) {
				window.location.href = fromUri;
			}
			else {
				//history.back();
				alert(str_common.saveSuccessed);
			}
		} else {
			var text = $error.text();
			text = str_common.saveFailed + "\r\n" + text;
			alert(text);
		}
		this.bSaving = false;
	},
	
	onSaveFailed : function() {
		alert(str_common.saveFailed);
		this.bSaving = false;
	},
	
	saveContentPackaging : function() {
		var context = this;
		var xml = this.toXML();
		var url = "api/contentpackaging";
		RestApi(url, "POST", xml, function(data) {
			context.onSaveResponse(data);
		}, 
		function() {
			context.onSaveFailed();
		});
	},
	
	updateContentPackaging : function() {
		var context = this;
		var xml = this.toXML();
		var id = $(cpjs.ContentPackagingId, this.dom).val();
		var url = "api/contentpackaging/" + id;
		RestApi(url, "PUT", xml, function(data) {
			context.onSaveResponse(data);
		}, 
		function() {
			context.onSaveFailed();
		});
	},
	
	save : function() {
		if(this.bSaving) return;
		this.bSaving = true;
		var operate = $(cpjs.ContentPackagingOperate, this.dom).val();
		if(operate == "edit") {
			this.updateContentPackaging();
		}
		else {
			this.saveContentPackaging();
		}
	},
	
	getValueByJS : function(selector) {
		var value = $(selector, this.dom).val();
		return value;
	},
	
	toXML : function() {
		var xml = new XMLWriter();
		xml.BeginNode(tag.contentpackaging);
		
		var tagMap = this.tagMap;
		var value = "";
		for(var i = 0; i < tagMap.length; i++) {
			value = this.getValueByJS(tagMap[i].value);
			if(value == null) continue;
			xml.Node(tagMap[i].key, value);
		}
		
		xml.BeginNode(tag.preprocessor);
		for(var i = 0; i < this.processors.length; i++) {
			var processor = this.processors[i].processor;
			if(processor instanceof MotionIconItem) {
				processor.XML(xml);
			}
		}
		
		for(var i = 0; i < this.processors.length; i++) {
			var processor = this.processors[i].processor;
			if(processor instanceof DynamicTextItem) {
				processor.XML(xml);
			}
		}
		xml.EndNode();
		
		xml.EndNode();
		xml.Close();
		
		return xml.ToString();
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
	
	updateResolution : function() {
		var context = this;
		var arr = videoData.getResolution();
		g_LineSelector.setContent(arr);
		g_LineSelector.setTitle(str_video.resolution);
		g_LineSelector.setOnSelected(function(key) {
			var wh = key.split("x");
			$(cpjs.OutputWidth, context.dom).val(wh[0]);
			$(cpjs.OutputHeight, context.dom).val(wh[1]);
		});
		var rect = g_LineSelector.getRect();
		var pos = uGetCenterPos(rect.width, rect.height);
		var panelPos = $(cpjs.ContentPackaging).offset();
		g_LineSelector.show(panelPos.left + DIALOG_OFFET, pos.y);
	},
	
	updateAspectRatio : function() {
		var context = this;
		var arr = this.aspectRatioMap;
		g_LineSelector.setContent(arr);
		g_LineSelector.setTitle(str_video.aspect_ratio);
		g_LineSelector.setOnSelected(function(key) {
			var wh = key.split(":");
			$(cpjs.AspectRatioX, context.dom).val(wh[0]);
			$(cpjs.AspectRatioY, context.dom).val(wh[1]);
		});
		var rect = g_LineSelector.getRect();
		var pos = uGetCenterPos(rect.width, rect.height);
		var panelPos = $(cpjs.ContentPackaging).offset();
		g_LineSelector.show(panelPos.left + DIALOG_OFFET, pos.y);
	},
	
	play : function() {
		if(this.domPlayer == null) return;
		
		this.localURI = $(cpjs.ContentPackagingSource, this.dom).val();
		this.inputType = INPUT_TYPE_FILE;
		
		this.generateOutputInfo();
		
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
		if(parx * PLAYER_HEIGHT >= pary * PLAYER_WIDTH) {
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
		var info = this.contentTab.getInfo(index);
		var processor = info.userData;
		
		this.endSelectPoint();
		this.endSelectBox();
		this.clearPlayerImage();
		this.clearDynamicText();
		
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
	clearDynamicText : function() {
		if(this.domPlayer == null) return;
		this.domPlayer.SetDisplayString("", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	},
	
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
		/*
		var renderx = parseInt(this.resolutionToRenderX(x));
		var rendery = parseInt(this.resolutionToRenderY(y));
		var opacity = parseInt(255 * this.rectImage.opacity / 100);
		
		var width = parseInt(this.resolutionToRenderX(item.width));
		var height = parseInt(this.resolutionToRenderY(item.height));
		
		
		var httpURI = this.getDynamicTextUri(this.rectImage.imageName, 0);
		
		this.domPlayer.AddLogoImage(httpURI, renderx, rendery, width, height, opacity);
		*/
		this.domPlayer.SetDisplayString(item.label, 
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
		var info = this.contentTab.getInfo(index);
		var processor = info.userData;
		
		if(processor instanceof MotionIconItem) {
			//this.beginSelectPoint(processor.dom);
			this.beginSelectBox(processor.dom);
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
		
		if(this.domLeft != null)
			this.domLeft.value = outx;
		
		if(this.domTop != null)
			this.domTop.value = outy;
		
		if(this.domWidth != null)
			this.domWidth.value = outwidth;
		
		if(this.domHeight != null)
			this.domHeight.value = outheight;
		
		this.bInfoChanged = true;
	},
	
	beginSelectBox : function(domItem) {
		if(this.domPlayer == null) return;

		var left = null;
		var top = null;
		var width = null;
		var height = null;
		if($(domItem).hasClass("ContentDynamicText")) {
			this.domLeft = $(JS_DYNAMIC_TEXT_POSX, domItem).get(0);
			this.domTop = $(JS_DYNAMIC_TEXT_POSY, domItem).get(0);
			this.domWidth = $(JS_DYNAMIC_TEXT_WIDTH, domItem).get(0);
			this.domHeight = $(JS_DYNAMIC_TEXT_HEIGHT, domItem).get(0);
			
			left = parseInt(this.domLeft.value);
			top = parseInt(this.domTop.value);
			width = parseInt(this.domWidth.value);
			height = parseInt(this.domHeight.value);
		}
		else if($(domItem).hasClass("ContentMotionIcon")) {
			this.domLeft = $(JS_MOTION_ICON_X, domItem).get(0);
			this.domTop = $(JS_MOTION_ICON_Y, domItem).get(0);
			this.domWidth = $(JS_MOTION_ICON_WIDTH, domItem).get(0);
			this.domHeight = $(JS_MOTION_ICON_HEIGHT, domItem).get(0);
			
			left = parseInt(this.domLeft.value);
			top = parseInt(this.domTop.value);
			width = parseInt(this.domWidth.value);
			if(isNaN(width)) width = 0;
			height = parseInt(this.domHeight.value);
			if(isNaN(height)) height = 0;
			
			this.domWidth = null;
			this.domHeight = null;
		}
		
		if(!this.valedateSelectedRect(left, top, width, height)) {
			alert(str_warning.select_box_out_of_resolution);
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

