var JS_CANDIDATE_SDI_ITEM =".CandidateSdiItem";
var JS_CANDIDATE_SDI_CONTAINER =".CandidateSdiContainer";
var JS_CANDIDATE_SDI_LIST =".CandidateSdiList";
var JS_NEW_CANDIDATE_SDI =".NewCandidateSdi";
var JS_DELETE_CANDIDATE_SDI =".DeleteCandidateSdi";
var JS_CANDIDATE_SDI_INDEX =".CandidateSdiIndex";
var JS_CANDIDATE_SDI_MEDIA_INFO = ".CandidateSdiMediaInfo";

var JS_CANDIDATE_SDI_PORT ="select[name='CandidateSdiPort']";
var JS_CANDIDATE_SDI_PORT_DOWN = "input[name='CandidateSdiPortDown']";
var JS_CANDIDATE_SDI_PROGRAM_ID = "select[name='CandidateSdiProgramId']";
var JS_CANDIDATE_SDI_AUDIO_TRACK_ID = "select[name='CandidateSdiAudioTrackId']";
var JS_CANDIDATE_SDI_SUBTITLE_ID = "select[name='CandidateSdiSubtitleId']";

var MAX_COUNT_CANDIDATE_SDI = 1;

function CandidateSdiItem() {
	var tagMap = [
		{key: TAG_CANDIDATELOCATION_URI, value: JS_CANDIDATE_SDI_PORT}
		];
	
	var fieldMap = [
		{key: FIELD_CANDIDATELOCATION_URI, value: JS_CANDIDATE_SDI_PORT}
		];
	
	this.prefixField = "";
	this.myField = FIELD_CANDIDATELOCATION;
	this.fieldIndex = null;
	
	this.timerId = null;
	this.mediaInfoControl = new MediaInfoControl();
	this.controlDom = {};
	this.dom = null;
	this.container = null;
	this.posting = false;
	this.portParser = new MediaPortParser();
	
	this.Create = function(domParent) {
		var $tmp = $(JS_CANDIDATE_SDI_TMPL);
		if($tmp.length == 0) return null;
		
		var $clone = $tmp.clone();
		$(domParent).append($clone.get(0));
		
		this.Init($clone.get(0));
		return this.dom;
	};
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Init = function(dom) {
		this.SetDOM(dom);
		this.licenseControl();
		this.Bind();
		
		this.SyncPort();
		this.RequestPort();

		this.controlDom.program = $(JS_CANDIDATE_SDI_PROGRAM_ID, this.dom).get(0);
		this.controlDom.audio = $(JS_CANDIDATE_SDI_AUDIO_TRACK_ID, this.dom).get(0);
		this.controlDom.subtitle = $(JS_CANDIDATE_SDI_SUBTITLE_ID, this.dom).get(0);
		this.controlDom.brief = $(JS_CANDIDATE_SDI_MEDIA_INFO, this.dom).get(0);
		
		this.mediaInfoControl.SetControlDom(this.controlDom);
		
		this.RequestMediaInfo();
	};
	
	this.licenseControl = function() {
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		
		var context = this;
		
		$(JS_DELETE_CANDIDATE_SDI, this.dom).click(function() {
			context.parent.Delete(context);
		});
		
		$(JS_CANDIDATE_SDI_PORT, this.dom).change(function() {
			context.RequestMediaInfo();
		});
	};
	
	this.SyncPort = function() {
		var port = $(JS_CANDIDATE_SDI_PORT_DOWN, this.dom).val();
		$(JS_CANDIDATE_SDI_PORT, this.dom).val(port);
	};
	
	this.RequestPort = function() {
		var context = this;
		
		var url ="getMediaFileInfo";
		var uri = "sdiport:0";

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
	
	this.OnPortResponse = function(data) {
		if(data == null) return;
		this.portParser.Init(data);
		var pa = this.portParser.GetPortArray();
		uUpdateSelect($(JS_CANDIDATE_SDI_PORT, this.dom).get(0), pa);
		this.SyncPort();
		
		this.RequestMediaInfo();
	};

	this.ClearBrief = function() {
		$(this.controlDom.brief).text("");
	};
	
	this.StartWaiting = function() {
		var $mediaInfo = $(JS_CANDIDATE_SDI_MEDIA_INFO, this.dom); 
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
	
	this.StartRequest = function() {
		this.StartWaiting();
		g_MediaInfoRequestList.add(this);
	};
	
	this.EndRequest = function() {
		this.EndWaiting();
		this.ClearBrief();
		g_MediaInfoRequestList.remove(this);
	};
	
	this.SetMediaInfoData = function(data, programInfo) {
		this.mediaInfoControl.UpdateControl(data, programInfo);
	};
	
	this.RequestMediaInfo = function() {
		var context = this;
		var inputInfo = {};
		inputInfo.type = INPUT_TYPE_SDI;
		inputInfo.uri = this.GetValueByJS(JS_CANDIDATE_SDI_PORT);
		this.inputInfo = inputInfo;
		this.StartRequest();
		var ret = g_MediaInfoAjax.RequestMediaInfo(inputInfo, function(data, userData) {
			if(context.inputInfo === userData) {
				context.EndRequest();
				context.SetMediaInfoData(data);
			}
		}, inputInfo);
		
		if(!ret) {
			this.EndRequest();
		}
	};
	
	this.StartWaiting = function() {
		var $mediaInfo = $(JS_ALT_URI_MEDIA_INFO, this.dom); 
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
	
	this.SetParent = function(parent) {
		this.parent = parent;
	};
	
	this.Delete = function() {
		if(this.dom == null) return;
		
		$(this.dom).remove();
		this.dom = null;
	};
	
	this.GetValueByJS = function(jsSelect) {
		return $(jsSelect, this.dom).val();
	};
	
  	/** xml : XMLWriter object**/
  	this.XML = function(xml) {
  		if(this.dom == null) return;
  		
  		var value = "";
  		
  		xml.BeginNode(TAG_CANDIDATELOCATION);
  	
  		for(var i = 0; i < tagMap.length; i++) {
  			value = this.GetValueByJS(tagMap[i].value);
  			if(value == null) continue;
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

function CandidateSdi() {
  	this.prefixField = "";
  	this.myField = FIELD_INPUT_BODY;
  	this.fieldIndex = null;
  	
  	this.dom = null;
  	this.bShow = true;
  	this.subArray = [];

  	this.SetDOM = function(dom) {
  		this.dom = dom;
  	};
  	
  	this.Init = function(dom) {
  		this.SetDOM(dom);
  		this.licenseControl();
  		this.Bind();
  		this.InitSub();
  	};
  	
	this.licenseControl = function() {
		if(GetLicense(license.INPUT_CANDIDATE_SDI) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
  	
  	this.InitSub = function() {
  		if(this.dom == null) return;
		var context = this;
		$(JS_CANDIDATE_SDI_ITEM, this.dom).each(function() {
			var sub = new CandidateSdiItem();
			sub.Init(this);
			sub.SetParent(context);
			context.subArray.push(sub);
		});
		this.Sort();
  	};
  	
  	this.Bind = function() {
  		if(this.dom == null) return;
  		var context = this;
  		$(JS_NEW_CANDIDATE_SDI, this.dom).click(function() {
  			context.New();
  		});
  	};
  	
  	this.New = function() {
  		var sub = new CandidateSdiItem();
  		sub.Create($(JS_CANDIDATE_SDI_LIST, this.dom).get(0));
  		sub.SetParent(this);
  		this.subArray.push(sub);
  		this.Sort();
  	};
  	
  	this.Delete = function(sub) {
		var bFound = false;
		var len = this.subArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.subArray[i-1] = this.subArray[i];
			} else {
				if(this.subArray[i] == sub) {
					sub.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.subArray.length--;
		}
		this.Sort();
  	};
  	
  	this.Sort = function() {
		var $arr = $(JS_CANDIDATE_SDI_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_CANDIDATE_SDI) {
			$(JS_NEW_CANDIDATE_SDI, this.dom).hide();
		} else {
			$(JS_NEW_CANDIDATE_SDI, this.dom).show();
		}
  	};
  	
  	this.UpdateMediaInfo = function() {
  		for(var i = 0; i < this.subArray.length; i++) {
  			var sub = this.subArray[i];
  			sub.RequestMediaInfo();
  		}
  	};
  	
  	this.Display = function(bShow) {
  		var $dom = $(this.dom);
  		if(bShow) {
  			$dom.show();
  		} else {
  			$dom.hide();
  		}
  		this.bShow = bShow;
  	};
  	
  	/** xml : XMLWriter object**/
  	this.XML = function(xml) {
  		for(var i = 0; i < this.subArray.length; i++) {
  			var sub = this.subArray[i];
  			sub.XML(xml);
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
  		if(!this.bShow) return;
  		this.UpdateSubElement();
  	};
  	
  	this.UpdateSubElement = function() {
  		var field = this.GetFullField();
  		var i = 0;
  		for(i = 0; i < this.subArray.length; i++) {
  			var sub = this.subArray[i];
  			sub.SetPrefixField(field);
  			sub.SetFieldIndex(i);
  			sub.UpdateElementName();
  		}
  	};
  	/* Field operate end */
}

