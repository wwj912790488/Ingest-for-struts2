var JS_ALTERNATE_URI =".AlternateURI";
var JS_ALTERNATE_URI_CONTAINER =".AlternateURIContainer";
var JS_ALTERNATE_URI_LIST =".AlternateURIList";
var JS_NEW_ALTERNATE_URI =".NewAlternateURI";
var JS_DELETE_ALTERNATE_URI =".DeleteAlternateURI";
var JS_ALTERNATE_URI_INDEX =".AlternateURIIndex";
var JS_ALT_URI_MEDIA_INFO = ".AltUriMediaInfo";
var JS_LICENSE_ALT_CAND_SRCIP = ".LicenseOptionSrcIp";

var JS_ALTERNATE_URI_STRING ="input[name='AlternateURI']";
var JS_ALT_URI_PROGRAM_ID = "select[name='AltUriProgramId']";
var JS_ALT_URI_AUDIO_TRACK_ID = "select[name='AltUriAudioTrackId']";
var JS_ALT_URI_SUBTITLE_ID = "select[name='AltUriSubtitleId']";
var JS_ALT_URI_PROGRAM_ID_DOWN = "input[name='AltUriProgramIdDown']";
var JS_ALT_URI_AUDIO_TRACK_ID_DOWN = "input[name='AltUriAudioTrackIdDown']";
var JS_ALT_URI_SUBTITLE_ID_DOWN = "input[name='AltUriSubtitleIdDown']";
var JS_ALT_CAND_SRCIP = "select[name='optionSrcIp']";

var TAG_CANDIDATELOCATION = "candidatelocation";
var TAG_CANDIDATELOCATION_URI = "uri";
var TAG_CAND_PROGRAM_ID = "programid";
var TAG_CAND_AUDIO_TRACK_ID = "audiotrackid";
var TAG_CAND_SUBTITLE_ID = "subtitleid";
var TAG_CAND_SRCIP = "srcip";

var FIELD_INPUT_BODY ="body";
var FIELD_CANDIDATELOCATION = "candidateLocations";
var FIELD_CANDIDATELOCATION_URI = "uri";
var FIELD_CAND_PROGRAM_ID = "programId";
var FIELD_CAND_AUDIO_TRACK_ID = "audioTrackId";
var FIELD_CAND_SUBTITLE_ID = "subtitleId";
var FIELD_CAND_SRCIP = "srcIp";

var MAX_COUNT_ALTERNATE_URI = 1;

function AlternateURI() {
	this.timerId = null;
	this.mediaInfoControl = new MediaInfoControl();
	this.controlDom = {};
	
	var tagMap = [
		{key: TAG_CANDIDATELOCATION_URI, value: JS_ALTERNATE_URI_STRING},
		{key: TAG_CAND_PROGRAM_ID, value: JS_ALT_URI_PROGRAM_ID},
		{key: TAG_CAND_AUDIO_TRACK_ID, value: JS_ALT_URI_AUDIO_TRACK_ID},
		{key: TAG_CAND_SUBTITLE_ID, value: JS_ALT_URI_SUBTITLE_ID},
		{key: TAG_CAND_SRCIP, value: JS_ALT_CAND_SRCIP}
		];
	
	var fieldMap = [
		{key: FIELD_CANDIDATELOCATION_URI, value: JS_ALTERNATE_URI_STRING},
		{key: FIELD_CAND_PROGRAM_ID, value: JS_ALT_URI_PROGRAM_ID},
		{key: FIELD_CAND_AUDIO_TRACK_ID, value: JS_ALT_URI_AUDIO_TRACK_ID},
		{key: FIELD_CAND_SUBTITLE_ID, value: JS_ALT_URI_SUBTITLE_ID},
		{key: FIELD_CAND_SRCIP, value: JS_ALT_CAND_SRCIP}
		];
	
	this.prefixField = "";
	this.myField = FIELD_CANDIDATELOCATION;
	this.fieldIndex = null;
	
	this.dom = null;
	this.container = null;
	
	this.Create = function(domParent) {
		var $tmp = $(JS_ALTERNATE_URI_TMPL);
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
		
		this.controlDom.program = $(JS_ALT_URI_PROGRAM_ID, this.dom).get(0);
		this.controlDom.audio = $(JS_ALT_URI_AUDIO_TRACK_ID, this.dom).get(0);
		this.controlDom.subtitle = $(JS_ALT_URI_SUBTITLE_ID, this.dom).get(0);
		this.controlDom.brief = $(JS_ALT_URI_MEDIA_INFO, this.dom).get(0);
		
		this.ClearSelected();
		this.mediaInfoControl.SetControlDom(this.controlDom);
		
		this.RequestMediaInfo();
		this.RequestSrcIP();
	};
	
	this.licenseControl = function() {
		if(GetLicense(license.ETH_SMART_SELECTION) != license.ENABLED) {
			$(JS_LICENSE_ALT_CAND_SRCIP, this.dom).remove();
		}
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		
		var context = this;
		
		$(JS_DELETE_ALTERNATE_URI, this.dom).click(function() {
			context.container.DeleteAlternateURI(context);
		});
		
		$(JS_ALTERNATE_URI_STRING, this.dom).change(function() {
			context.RequestMediaInfo();
		});
		
		$(JS_ALT_CAND_SRCIP, this.dom).change(function() {
			context.RequestMediaInfo();
		});
	};
	
	this.ClearSelected = function() {
		this.controlDom.program.options.length = 0;
		this.controlDom.program.disabled = true;
		
		this.controlDom.audio.options.length = 0;
		this.controlDom.audio.disabled = true;
		
		this.controlDom.subtitle.options.length = 0;
		this.controlDom.subtitle.disabled = true;
	};
	
	this.ClearBrief = function() {
		$(this.controlDom.brief).text("");
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
	
	this.StartRequest = function() {
		this.ClearSelected();
		this.StartWaiting();
		g_MediaInfoRequestList.add(this);
	};
	
	this.EndRequest = function() {
		this.EndWaiting();
		this.ClearBrief();
		g_MediaInfoRequestList.remove(this);
	};
	
	this.SetMediaInfoData = function(data, programInfo) {
		if(programInfo == null) {
			programInfo = {};
			programInfo.programId = parseInt($(JS_ALT_URI_PROGRAM_ID_DOWN, this.dom).val());
			programInfo.audioTrackId = parseInt($(JS_ALT_URI_AUDIO_TRACK_ID_DOWN, this.dom).val());
			programInfo.subtitleId = parseInt($(JS_ALT_URI_SUBTITLE_ID_DOWN, this.dom).val());
		}
		
		this.mediaInfoControl.UpdateControl(data, programInfo);
	};
	
	this.RequestMediaInfo = function() {
		var context = this;
		var inputInfo = {};
		inputInfo.type = INPUT_TYPE_NETWORK;
		inputInfo.uri = this.GetValueByJS(JS_ALTERNATE_URI_STRING);
		inputInfo.eth = this.GetEth();
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
	
	this.GetEth = function() {
		var $eth = $(JS_ALT_CAND_SRCIP, this.dom);
		if($eth.length == 0) return null;
		
		return $eth.val();
	};
	
	this.RequestSrcIP = function() {
		if($(JS_ALT_CAND_SRCIP, this.dom).length == 0) return;
		
		var context = this;
		var url = "listIfaces";
		var param = {ethType: "input"};
		if(g_params_listIfaces != null) {
			$.extend(param, param, g_params_listIfaces);
		}
		$.post(url, param, function(data) {
			var list = uParseServerIP(data);
			var $srcIP = $(JS_ALT_CAND_SRCIP, context.dom);
			uUpdateSelect($srcIP.get(0), list);
		});
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
	
	this.SetContainer = function(alternateURIContainer) {
		this.container = alternateURIContainer;
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
  	
  	//static function
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
		if(domSelect == null) return;
		domSelect.options.length = 0;
	};
	
	function VerifyURI(uri, inputType) {
		if(uri == null || uri == null) return false;
		if(uri.length <= 0) return false;
		if(inputType == INPUT_TYPE_NETWORK) {
			if(uri.length < 7) return false;
			if(uri.indexOf("://") == -1) return false;
		}
		return true;
	};
}

function AlternateURIContainer() {
  	this.prefixField = "";
  	this.myField = FIELD_INPUT_BODY;
  	this.fieldIndex = null;
  	
  	this.dom = null;
  	this.bShow = true;
  	this.alternateURIArray = [];

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
	};
  	
  	this.InitSub = function() {
  		if(this.dom == null) return;
		var context = this;
		$(JS_ALTERNATE_URI, this.dom).each(function() {
			var au = new AlternateURI();
	  		au.Init(this);
	  		au.SetContainer(context);
			context.alternateURIArray.push(au);
		});
		this.SortAlternateURI();
  	};
  	
  	this.Bind = function() {
  		if(this.dom == null) return;
  		var context = this;
  		$(JS_NEW_ALTERNATE_URI, this.dom).click(function() {
  			context.NewAlternateURI();
  		});
  	};
  	
  	this.NewAlternateURI = function() {
  		var au = new AlternateURI();
  		au.Create($(JS_ALTERNATE_URI_LIST, this.dom).get(0));
  		au.SetContainer(this);
  		this.alternateURIArray.push(au);
  		this.SortAlternateURI();
  	};
  	
  	this.DeleteAlternateURI = function(alternateURI) {
		var bFound = false;
		var len = this.alternateURIArray.length;
		for(var i = 0; i < len; i++) {
			if(bFound) {
				this.alternateURIArray[i-1] = this.alternateURIArray[i];
			} else {
				if(this.alternateURIArray[i] == alternateURI) {
					alternateURI.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.alternateURIArray.length--;
		}
		this.SortAlternateURI();
  	};
  	
  	this.SortAlternateURI = function() {
		var $dom = $(this.dom);
		var $arr = $dom.find(JS_ALTERNATE_URI_INDEX);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		if($arr.length >= MAX_COUNT_ALTERNATE_URI) {
			$dom.find(JS_NEW_ALTERNATE_URI).hide();
		} else {
			$dom.find(JS_NEW_ALTERNATE_URI).show();
		}
  	};
  	
  	this.UpdateMediaInfo = function() {
  		for(var i = 0; i < this.alternateURIArray.length; i++) {
  			var au = this.alternateURIArray[i];
  			au.RequestMediaInfo();
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
  		for(var i = 0; i < this.alternateURIArray.length; i++) {
  			var au = this.alternateURIArray[i];
  			au.XML(xml);
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
  		for(i = 0; i < this.alternateURIArray.length; i++) {
  			var au = this.alternateURIArray[i];
  			au.SetPrefixField(field);
  			au.SetFieldIndex(i);
  			au.UpdateElementName();
  		}
  	};
  	/* Field operate end */
}

