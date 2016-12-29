var MEDIAINFO_MEDIAINFO ="mediainfo";
var MEDIAINFO_PROGRAMS ="programs";
var MEDIAINFO_COUNT ="count";
var MEDIAINFO_PROGRAM ="program";
var MEDIAINFO_VIDEO ="video";
var MEDIAINFO_AUDIO ="audio";
var MEDIAINFO_SUBTITLE ="subtitle";
var MEDIAINFO_CODEC ="codec";
var MEDIAINFO_BITRATE ="bitrate";
var MEDIAINFO_FRAMERATE ="framerate";
var MEDIAINFO_RESOLUTION ="resolution";
var MEDIAINFO_ASPECT_RATIO ="aspect_ratio";
var MEDIAINFO_SAMPLE ="samplerate";
var MEDIAINFO_PID ="pid";
var MEDIAINFO_INDEX ="idx";
var MEDIAINFO_NAME ="name";
var MEDIAINFO_USED ="used";
var MEDIAINFO_DURATION ="duration";
var MEDIAINFO_CANSEEK = "canseek";
var MEDIAINFO_USED_TRUE = "1";
var MEDIAINFO_ANGLE_COUNT ="anglecount";

var MEDIAINFO_PORTIDS = "PortIDs";
var MEDIAINFO_PORTS = "Ports";
var MEDIAINFO_PORT = "Port";
var MEDIAINFO_TYPE = "type";

var MEDIAINFO_CONTAINER_TS ="MPEG-TS";
var MEDIAINFO_CONTAINER_PS ="MPEG-PS";
var MEDIAINFO_CONTAINER_MXF ="MXF";
var MEDIAINFO_CONTAINER_MKV ="MKV";
var MEDIAINFO_CONTAINER_BD ="BD";
var MEDIAINFO_CONTAINER_DVD ="DVD";
var MEDIAINFO_CONTAINER_NETWORK_URL ="NetworkURL";
var MEDIAINFO_CONTAINER_MP4 = "MP4";
var MEDIAINFO_CONTAINER_QUICKTIME = "Quicktime";

function MI_ParseObject($node) {
	if($node == null || $node.length == 0) return null;
	var o = {};
	$node.children().each(function() {
		if($(this).children().length == 0) {
			var tag = this.tagName.toLowerCase();
			//there are some difference getting text in some browsers.
			var text = $(this).text();
			text = text.replace("\r", "").replace("\n", "");
			eval("o." + tag + " = \"" + text + "\";");
		}
	});
	return o;
}

function MediaInfoParser() {
	this.$rootNode = null;
	
	this.Init = function(data) {
		if(data == null) {
			this.$rootNode = null;
		} else {
			var a = $(data).children();
			this.$rootNode = $(a.get(0));
		}
	};
	
	this.GetCommonInfo = function() {
		if(this.$rootNode == null) return null;
		var o = MI_ParseObject(this.$rootNode);
		o.name = this.$rootNode.attr(MEDIAINFO_NAME);
		return o;
	};
	
	this.GetProgramCount = function() {
		var $programs = $(MEDIAINFO_PROGRAMS, this.$rootNode);
		if($programs.length == 0) return null;
		
		var count = $programs.first().attr(MEDIAINFO_COUNT);
		return count;
	};
	
	this.GetVideoNode = function() {
		if(this.$rootNode == null) return null;
		var $node = null;
		$node = $(MEDIAINFO_VIDEO, this.$rootNode).first();
		return $node;
	};
	
	this.GetVideoInfo = function() {
		if(this.$rootNode == null) return null;
		var $node = this.GetVideoNode();
		var o = MI_ParseObject($node);
		return o;
	};
	
	this.GetAudioNode = function() {
		if(this.$rootNode == null) return null;
		var $node = null;
		$node = $(MEDIAINFO_AUDIO, this.$rootNode).first();
		return $node;
	};
	
	this.GetAudioInfo = function() {
		if(this.$rootNode == null) return null;
		var $node = this.GetAudioNode();
		var o = MI_ParseObject($node);
		return o;
	};
}

MediaInfoParser.prototype = {
	GetAudioChannelArray : function() {
		var o = this.GetAudioInfo();
		if(o == null) return null;
		if(o.channel == null) return null;
		
		var count = parseInt(o.channel);
		if(isNaN(count) || count == 0) return null;
		
		var arr = [{key: "-1", value: str_audio.audio_process_default}];
		for(var i = 0; i < count; i++) {
			var o = {};
			o.key = i+1;
			o.value = i+1;
			arr.push(o);
		}

		return arr;
	}
};

function TSParser() {
	this.$rootNode = null;
	
	this.Init = function(data) {
		if(data == null) {
			this.$rootNode = null;
		} else {
			var a = $(data).children();
			this.$rootNode = $(a.get(0));	
		}
	};
	
	this.GetCommonInfo = function() {
		if(this.$rootNode == null) return null;
		var o = MI_ParseObject(this.$rootNode);
		o.name = this.$rootNode.attr(MEDIAINFO_NAME);
		return o;
	};
	
	this.GetProgramCount = function() {
		var $programs = $(MEDIAINFO_PROGRAMS, this.$rootNode);
		if($programs.length == 0) return null;
		
		var count = $programs.first().attr(MEDIAINFO_COUNT);
		return count;
	};
	
	this.GetProgramArray = function() {
		if(this.$rootNode == null) return null;
		var arr = [];
		$(MEDIAINFO_PROGRAM, this.$rootNode).each(function(i) {
			var obj = {};
			obj.key = $(this).attr(MEDIAINFO_INDEX);
			obj.value = $(this).children(MEDIAINFO_NAME).first().text();
			arr[i] = obj;
		});
		return arr;
	};
	
	this.GetProgramNode = function(programId) {
		if(this.$rootNode == null) return null;
		var $node = null;
		$(MEDIAINFO_PROGRAM, this.$rootNode).each(function(i) {
			if($(this).attr(MEDIAINFO_INDEX) == programId) {
				$node = $(this);
				return false;
			}
		});
		return $node;
	};
	
	this.GetProgramInfo = function(programId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetProgramNode(programId);
		if($node == null) return null;
		var o = MI_ParseObject($node);
		return o;
	};
	
	this.GetAngleArray = function(programId) {
		var o = this.GetProgramInfo(programId);
		var count = parseInt(o.anglecount);
		if(isNaN(count)) count = 0;
		var arr = [];
		for(var i = 0; i < count; i++) {
			var o = {};
			o.key = i.toString();
			o.value = i.toString();
			arr.push(o);
		}
		if(arr.length == 0) {
			arr.push({key:"0", value:"0"});
		}
		return arr;
	};
	
	this.GetProgramUsed = function() {
		if(this.$rootNode == null) return null;
		var id = null;
		var jsel = MEDIAINFO_PROGRAM+" > "+MEDIAINFO_USED;
		var $usedArr = $(jsel, this.$rootNode);
		$usedArr.each(function() {
			if($(this).text() == MEDIAINFO_USED_TRUE) {
				var $program = $(this).parent();
				id = GetId($program);
				return false;
			}
		});
		return id;
	};
	
	this.GetVideoArray = function(programId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetProgramNode(programId);
		if($node == null) return null;
		var arr = [];
		$(MEDIAINFO_VIDEO, $node).each(function(i) {
			var obj = {};
			obj.key = GetId($(this));
			obj.value = $(this).children(MEDIAINFO_NAME).first().text();
			arr[i] = obj;
		});
		return arr;
	};
	
	this.GetVideoNode = function(programId, videoId) {
		if(this.$rootNode == null) return null;
		var $pNode = this.GetProgramNode(programId);
		if($pNode == null) return null;
		var $node = null;
		$(MEDIAINFO_VIDEO, $pNode).each(function(i) {
			var id = GetId($(this));
			if(id == videoId) {
				$node = $(this);
				return false;
			}
		});
		return $node;
	};
	
	this.GetVideoInfo = function(programId, videoId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetVideoNode(programId, videoId);
		var o = MI_ParseObject($node);
		return o;
	};
	
	this.GetAudioArray = function(programId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetProgramNode(programId);
		if($node == null) return null;
		var arr = [];
		$(MEDIAINFO_AUDIO, $node).each(function(i) {
			var obj = {};
			obj.key = GetId($(this));
			obj.value = $(this).children(MEDIAINFO_NAME).first().text();
			arr[i] = obj;
		});
		
		if(arr.length == 0) {
			var obj = {key: "-1", value: "None"};
			arr.push(obj);
		}
		return arr;
	};
	
	this.GetAudioArrayi18 = function(programId) {
		if(this.$rootNode == null) return null;
		var arr = this.GetAudioArray(programId);
		for(var i = 0; i < arr.length; i++) {
			var lan = Translatei18(arr[i].value);
			if(lan != null) {
				arr[i].value = lan;
			}
		}
		return arr;
	};
	
	this.GetAudioNode = function(programId, audioId) {
		if(this.$rootNode == null) return null;
		var $pNode = this.GetProgramNode(programId);
		if($pNode == null) return null;
		var $node = null;
		$(MEDIAINFO_AUDIO, $pNode).each(function(i) {
			var id = GetId($(this));
			if(id == audioId) {
				$node = $(this);
				return false;
			}
		});
		return $node;
	};
	
	this.GetAudioInfo = function(programId, audioId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetAudioNode(programId, audioId);
		var o = MI_ParseObject($node);
		return o;
	};
	
	this.GetAudioUsed = function(programId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetProgramNode(programId);
		if($node == null || $node.length == 0) return 0;
		
		var id = null;
		var jsel = MEDIAINFO_AUDIO+" > "+MEDIAINFO_USED;
		var $usedArr = $(jsel, $node);
		$usedArr.each(function() {
			if($(this).text() == MEDIAINFO_USED_TRUE) {
				var $audio = $(this).parent();
				id = GetId($audio);
				return false;
			}
		});
		return id;
	};
	
	this.GetSubtitleArray = function(programId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetProgramNode(programId);
		if($node == null) return null;
		var arr = [];
		$(MEDIAINFO_SUBTITLE, $node).each(function(i) {
			var obj = {};
			obj.key = GetId($(this));
			obj.value = $(this).children(MEDIAINFO_NAME).first().text();
			arr[i] = obj;
		});
		//if(arr.length > 0) {
			var obj = {key: "-3", value: "None"};
			arr.push(obj);
		//}
		return arr;
	};
	
	this.GetSubtitleArrayi18 = function(programId) {
		if(this.$rootNode == null) return null;
		var arr = this.GetSubtitleArray(programId);
		for(var i = 0; i < arr.length; i++) {
			var lan = Translatei18(arr[i].value);
			if(lan != null) {
				arr[i].value = lan;
			}
		}
		return arr;
	};
	
	this.GetSubtitleNode = function(programId, subtitleId) {
		if(this.$rootNode == null) return null;
		var $pNode = this.GetProgramNode(programId);
		if($pNode == null) return null;
		var $node = null;
		$(MEDIAINFO_SUBTITLE, $pNode).each(function(i) {
			var id = GetId($(this));
			if(id == subtitleId) {
				$node = $(this);
				return false;
			}
		});
		return $node;
	};
	
	this.GetSubtitleInfo = function(programId, subtitleId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetSubtitleNode(programId, subtitleId);
		var o = MI_ParseObject($node);
		return o;
	};
	
	this.GetSubtitleUsed = function(programId) {
		if(this.$rootNode == null) return null;
		var $node = this.GetProgramNode(programId);
		if($node == null || $node.length == 0) return 0;
		
		var id = null;
		var jsel = MEDIAINFO_SUBTITLE+" > "+MEDIAINFO_USED;
		var $usedArr = $(jsel, $node);
		$usedArr.each(function() {
			if($(this).text() == MEDIAINFO_USED_TRUE) {
				var $subtitle = $(this).parent();
				id = GetId($subtitle);
				return false;
			}
		});
		return id;
	};
	
	//static function
	function GetId($node) {
		var id = null;
		var $pid = $node.children(MEDIAINFO_PID);
		if($pid.length == 0) {
			id = $node.attr(MEDIAINFO_INDEX);
		} else {
			id = $pid.first().text();
		}
		return id;
	}
	
	function Translatei18(string) {
		var subArr = string.match(/\b\w{3}\b/gi);
		var lan = null;
		if(subArr != null) {
			lan = GetLanguage(subArr[subArr.length-1]);
		}
		return lan;
	};
}

TSParser.prototype = {
	GetAudioChannelArray : function(programId, audioId) {
		var o = this.GetAudioInfo(programId, audioId);
		if(o == null) return null;
		if(o.channel == null) return null;
		
		var count = parseInt(o.channel);
		if(isNaN(count) || count == 0) return null;
		
		var arr = [{key: "-1", value: str_audio.audio_process_default}];
		for(var i = 0; i < count; i++) {
			var o = {};
			o.key = i+1;
			o.value = i+1;
			arr.push(o);
		}

		return arr;
	}
};

function MediaPortParser() {
	this.$rootNode = null;
	
	this.Init = function(data) {
		if(data == null) this.$rootNode = null;
		var a = $(data).children();
		this.$rootNode = $(a.get(0));
	};
	
	this.GetType = function() {
		if(this.$rootNode == null) return null;
		return this.$rootNode.attr(MEDIAINFO_TYPE);
	};
	
	this.GetPortArray = function() {
		if(this.$rootNode == null) return null;
		var arr = [];
		$(MEDIAINFO_PORT, this.$rootNode).each(function(i) {
			var obj = {};
			obj.key = $(this).attr(MEDIAINFO_INDEX);
			obj.value = $(this).attr(MEDIAINFO_INDEX);
			arr[i] = obj;
		});
		return arr;
	};
}

function ValidateInputInData(inputInfo, data) {
	if(inputInfo == null || data == null) return false;
	
	var a = $(data).children();
	$rootNode = $(a.get(0));
	
	var dataUri = $rootNode.attr(MEDIAINFO_NAME);
	if(dataUri == null) return false;
	
	var ret = false;
	if(inputInfo.type == INPUT_TYPE_SDI
			|| inputInfo.type == INPUT_TYPE_CVBS
			|| inputInfo.type == INPUT_TYPE_HDMI
			|| inputInfo.type == INPUT_TYPE_ASI) {
		if(dataUri.match(inputInfo.uri) != null) ret = true;
	} else {
		if(dataUri == inputInfo.uri) ret = true;
	}
	return ret;
}