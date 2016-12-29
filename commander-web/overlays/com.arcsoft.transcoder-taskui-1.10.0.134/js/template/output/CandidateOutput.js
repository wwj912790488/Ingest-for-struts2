var JS_CANDIDATE_OUTPUT_CONTAINER =".CandidateOutputContainer";
var JS_CANDIDATE_OUTPUT =".CandidateOutput";
var JS_CANDIDATE_OUTPUT_LIST =".CandidateOutputList";
var JS_NEW_CANDIDATE_OUTPUT =".NewCandidateOutput";
var JS_DELETE_CANDIDATE_OUTPUT =".DeleteCandidateOutput";
var JS_CANDIDATE_OUTPUT_INDEX =".CandidateOutputIndex";
var JS_OPEN_CANDIDATE_TRIGGER = ".OpenCandidateTrigger";

var JS_CANDIDATE_OUTPUT_URI ="input[name='CandidateOutputUri']";
var JS_CANDIDATE_OUTPUT_SRCIP = "select[name='CandidateOutputSrcIp']";
var JS_CANDIDATE_OUTPUT_SRCPORT = "input[name='CandidateOutputSrcPort']";
var JS_CANDIDATE_OUTPUT_BUFFERSIZE = "input[name='CandidateOutputBufferSize']";
var JS_CANDIDATE_OUTPUT_TTL = "input[name='CandidateOutputTTL']";
var JS_CANDIDATE_OUTPUT_IGMP_SOURCE_IP = "input[name='CandidateOutputIgmpSourceIp']";

var TAG_CANDIDATE_OUTPUT = "candidateoutput";

var FIELD_CANDIDATE_OUTPUT = "candidateOutputs";

var MAX_COUNT_CANDIDATE_OUTPUT = 5;

function CandidateOutput() {
	
	var tagMap = [
		{key: TAG_URI, value: JS_CANDIDATE_OUTPUT_URI},
		{key: TAG_SOURCE_IP, value: JS_CANDIDATE_OUTPUT_SRCIP},
		{key: TAG_SOURCE_PORT, value: JS_CANDIDATE_OUTPUT_SRCPORT},
		{key: TAG_BUFFER_SIZE, value: JS_CANDIDATE_OUTPUT_BUFFERSIZE},
		{key: TAG_TTL, value: JS_CANDIDATE_OUTPUT_TTL},
		{key: TAG_IGMP_SOURCE_IP, value: JS_CANDIDATE_OUTPUT_IGMP_SOURCE_IP}
		];
	
	var fieldMap = [
		{key: FIELD_URI, value: JS_CANDIDATE_OUTPUT_URI},
		{key: FIELD_SOURCE_IP, value: JS_CANDIDATE_OUTPUT_SRCIP},
		{key: FIELD_PORT, value: JS_CANDIDATE_OUTPUT_SRCPORT},
		{key: FIELD_BUFFER_SIZE, value: JS_CANDIDATE_OUTPUT_BUFFERSIZE},
		{key: FIELD_TTL, value: JS_CANDIDATE_OUTPUT_TTL},
		{key: FIELD_IGMP_SOURCE_IP, value: JS_CANDIDATE_OUTPUT_IGMP_SOURCE_IP}
		];
	
	var validatorMap = [
		{selector: JS_CANDIDATE_OUTPUT_TTL, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: null, recommend: 255} },
		{selector: JS_CANDIDATE_OUTPUT_SRCPORT, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: null, recommend: 1234} },
		{selector: JS_CANDIDATE_OUTPUT_BUFFERSIZE, type: VALIDATOR_TYPE_INTEGER, param: {min: 0, max: 900000, recommend: 65535} }
		];
	
	this.prefixField = "";
	this.myField = FIELD_CANDIDATE_OUTPUT;
	this.fieldIndex = null;
	
	this.dom = null;
	this.container = null;
	
	this.Create = function(domParent) {
		var $tmp = $(JS_CANDIDATE_OUTPUT_TMPL);
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
		this.Bind();
		this.RequestUDPSourceIP();
		this.updateDeleteCandidateTrigger();
	};
	
	this.RemoveLine = function(line) {
		$(line, this.dom).remove();
	};
	
	this.Bind = function() {
		if(this.dom == null) return;
		
		var context = this;
		
		$(JS_DELETE_CANDIDATE_OUTPUT, this.dom).click(function() {
			context.container.DeleteItem(context);
		});
		
		$(JS_OPEN_CANDIDATE_TRIGGER, this.dom).click(function() {
			g_OutputFileView.Show();
			g_OutputFileView.SetOnOK(function(key) {
				$(JS_CANDIDATE_OUTPUT_URI, context.dom).val(key);
			});
		});
		
		ValidatorBindArray(this.dom, validatorMap);
	};
	
	this.SetContainer = function(CandidateContainer) {
		this.container = CandidateContainer;
	};
	
	this.Delete = function() {
		if(this.dom == null) return;
		
		$(this.dom).remove();
		this.dom = null;
	};
	
	this.RequestUDPSourceIP = function() {
		if($(JS_CANDIDATE_OUTPUT_SRCIP, this.dom).length == 0) return;
		
		var context = this;
		var url = "listIfaces";
		var param = {"ethType": "output"};
		if(g_params_listIfaces != null) {
			$.extend(param, param, g_params_listIfaces);
		}
		
		$.post(url, param, function(data) {
			var list = uParseServerIP(data);
			var $srcIP = $(JS_CANDIDATE_OUTPUT_SRCIP, context.dom);
			uUpdateSelect($srcIP.get(0), list);
		});
	};
	
	this.GetValueByJS = function(jsSelect) {
		return $(jsSelect, this.dom).val();
	};
	
  	/** xml : XMLWriter object**/
  	this.XML = function(xml) {
  		if(this.dom == null) return;
  		
  		var value = "";
  		
  		xml.BeginNode(TAG_CANDIDATE_OUTPUT);
  	
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

CandidateOutput.prototype = {
	updateDeleteCandidateTrigger : function() {
		var $trigger = $(JS_DELETE_CANDIDATE_OUTPUT, this.dom);
		
		if(g_taskSupport != null) {
			var taskAction = g_taskSupport.getActionType();
			if(taskAction == "runtime") {
				$trigger.hide();
			}
		}
	},
};

function CandidateOutputContainer() {
  	this.prefixField = "";
  	this.myField = FIELD_OUTPUT_GROUP_SETTING;
  	this.fieldIndex = null;
  	
  	this.dom = null;
  	this.bShow = true;
  	this.candidateArray = [];
  	this.container = null;

  	this.SetDOM = function(dom) {
  		this.dom = dom;
  	};
  	
  	this.Init = function(dom) {
  		this.candidateArray.length = 0;
  		
  		this.SetDOM(dom);
  		this.licenseControl();
  		this.Bind();
  		
  		this.InitSub();
  	};
  	
	this.licenseControl = function() {
		if(GetLicense(license.OUTPUT_CANDIDATE_LOCATION) != license.ENABLED) {
			$(this.dom).remove();
			this.dom = null;
		}
	};
  	
  	this.InitSub = function() {
  		if(this.dom == null) return;
		var context = this;
		$(JS_CANDIDATE_OUTPUT, this.dom).each(function() {
			var item = new CandidateOutput();
			item.Init(this);
			item.SetContainer(context);
			context.candidateArray.push(item);
		});
		this.SortItems();
  	};
  	
  	this.Bind = function() {
  		if(this.dom == null) return;
  		var context = this;
  		$(JS_NEW_CANDIDATE_OUTPUT, this.dom).click(function() {
  			context.NewItem();
  		});
  	};
  	
  	this.SetContainer = function(container) {
  		if(this.dom == null) return;
  		if(this.container == container) return;
  		this.container = container;
  		
  		this.ChangeByContainer();
  	};
  	
  	this.ChangeByContainer = function() {
  		for(var i = 0; i < this.candidateArray.length; i++) {
  			var item = this.candidateArray[i];
  			if(this.container == CONTAINER_HLS) {
  				item.RemoveLine(".CandidateOutputLine1");
  				item.RemoveLine(".CandidateOutputLine2");
  			} else if(this.container == CONTAINER_TSOVERUDP) {
  				item.RemoveLine(JS_OPEN_CANDIDATE_TRIGGER);
  			} else if(this.container == CONTAINER_RTMP) {
  				item.RemoveLine(".CandidateOutputLine1");
  				item.RemoveLine(".CandidateOutputLine2");
  				item.RemoveLine(JS_OPEN_CANDIDATE_TRIGGER);
  			} 
  		}
  	};
  	
  	this.NewItem = function() {
  		var item = new CandidateOutput();
  		item.Create($(JS_CANDIDATE_OUTPUT_LIST, this.dom).get(0));
  		item.SetContainer(this);
 		
  		if(this.container == CONTAINER_HLS) {
  			item.RemoveLine(".CandidateOutputLine1");
			item.RemoveLine(".CandidateOutputLine2");
  		} else if(this.container == CONTAINER_TSOVERUDP) {
			item.RemoveLine(JS_OPEN_CANDIDATE_TRIGGER);
		} else if(this.container == CONTAINER_RTMP) {
			item.RemoveLine(".CandidateOutputLine1");
			item.RemoveLine(".CandidateOutputLine2");
			item.RemoveLine(JS_OPEN_CANDIDATE_TRIGGER);
		}
				
  		this.candidateArray.push(item);
  		this.SortItems();
  	};
  	
  	this.DeleteItem = function(item) {
		var bFound = false;
		for(var i = 0; i < this.candidateArray.length; i++) {
			if(bFound) {
				this.candidateArray[i-1] = this.candidateArray[i];
			} else {
				if(this.candidateArray[i] == item) {
					item.Delete();
					bFound = true;
				}
			}
		}
		if(bFound) {
			this.candidateArray.length--;
		}
		this.SortItems();
  	};
  	
  	this.SortItems = function() {
		var $dom = $(this.dom);
		var $arr = $(JS_CANDIDATE_OUTPUT_INDEX, this.dom);
		$arr.each(function(i) {
			$(this).text(i+1);
		});
		
		this.updateNewCandidateTrigger();
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
  	
  	this.Delete = function() {
  	};
  	
  	/** xml : XMLWriter object**/
  	this.XML = function(xml) {
  		if(this.dom == null) return;
  		if(!this.bShow) return;
  		
  		for(var i = 0; i < this.candidateArray.length; i++) {
  			var item = this.candidateArray[i];
  			item.XML(xml);
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
  		if(this.dom == null) return;
  		if(!this.bShow) return;
  		
  		this.UpdateSubElement();
  	};
  	
  	this.UpdateSubElement = function() {
  		var field = this.GetFullField();
  		var i = 0;
  		for(i = 0; i < this.candidateArray.length; i++) {
  			var item = this.candidateArray[i];
  			item.SetPrefixField(field);
  			item.SetFieldIndex(i);
  			item.UpdateElementName();
  		}
  	};
  	/* Field operate end */
}

CandidateOutputContainer.prototype = {
	updateNewCandidateTrigger : function() {
		var $arr = $(JS_CANDIDATE_OUTPUT_INDEX, this.dom);
		var $trigger = $(JS_NEW_CANDIDATE_OUTPUT, this.dom);
		if($arr.length >= MAX_COUNT_CANDIDATE_OUTPUT) {
			$trigger.hide();
		} else {
			$trigger.show();
		}
		
		if(g_taskSupport != null) {
			var taskAction = g_taskSupport.getActionType();
			if(taskAction == "runtime") {
				$trigger.hide();
			}
		}
	},
};