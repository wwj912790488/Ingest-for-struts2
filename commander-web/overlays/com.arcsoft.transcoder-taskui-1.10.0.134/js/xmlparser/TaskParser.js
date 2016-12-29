var tag = {
	task : "task",
	href : "href",
	id : "id",
	inputs : "inputs",
	localfile : "localfile",
	network : "network",
	protocol : "protocol",
	uri : "uri",
	container : "container",
	pathuri : "pathuri",
	programid : "programid",
	audiotrackid : "audiotrackid",
	subtitleid : "subtitleid",
	streams : "streams",
	outputgroups : "outputgroups",
	output : "output",
	streamref : "streamref",
	h264 : "h264",
	avc : "avc",
	h265 : "h265",
	mpeg2 : "mpeg2",
	mpeg4 : "mpeg4",
	mpeg1 : "mpeg1",
	vc1 : "vc-1",
	h263 : "h263",
	prores : "prores",
	raw : "raw",
	dnxhd : "dnxhd",
	s263 : "s263",
	width : "width",
	height : "height",
	par : "par",
	par_x : "par_x",
	par_y : "par_y",
	aac : "aac",
	amr : "amr",
	mp2 : "mp2",
	mp3 : "mp3",
	wma : "wma",
	ac3 : "ac3",
	dts : "dts",
	vorbis : "vorbis",
	pcm : "pcm",
	ddp : "ddp",
	preprocessor : "preprocessor",
	motionicon : "motionicon",
	motioniconbegin : "motioniconbegin",
	dynamictext : "dynamictext",
	dynamictextbegin : "dynamictextbegin",
	markid : "markid",
	posindex : "posindex",
	name : "name",
	description : "description",
	path : "path",
	posx : "posx",
	posy : "posy",
	operate : "operate",
	framerate : "framerate",
	imageformat : "imageformat",
	isloop : "isloop",
	initialactive : "initialactive",
	label : "label",
	font : "font",
	size : "size",
	color : "color",
	opacity : "opacity",
	bgcolor : "bgcolor",
	bgopacity : "bgopacity",
	animationtype : "animationtype",
	scrollmode : "scrollmode",
	scrollspeed : "scrollspeed",
	scrollcount : "scrollcount",
	scrollinterval : "scrollinterval",
	runtimevisible : "runtimevisible",
	contentpackaging : "contentpackaging",
	_end : ""
};

/****************************************/
function BaseParser() {
	this.dom = null;
}

BaseParser.prototype = {
	parse : function(xmlDom) {
		this.dom = xmlDom;
	},
	
	parseString : function(xmlString) {
		var xmlDom = loadXML(xmlString);
		var b = xmlDom.xml;
		var a = $(xmlDom).children();
		this.parse(a.get(0));
	},
	
	getTagName : function() {
		return this.dom.tagName;
	},
	
	getTagValue : function(tag) {
		var $dom = $(this.dom).children(tag);
		if($dom.length > 0) {
			return $dom.text();
		}
		else {
			return null;
		}
	},
	
	getTagValue_2 : function(tag) {
		var $dom = $(tag, this.dom);
		if($dom.length > 0) {
			return $dom.text();
		}
		else {
			return null;
		}
	},
	
	setTagValue : function(tag, value) {
		var $dom = $(this.dom).children(tag);
		if($dom.length > 0) {
			$dom.text(value);
		}
	},
	
	insertAfter : function(preTag, tag, value) {
		var tagContent = null;
		if(value == null) {
			tagContent = "<" + tag + ">" + "</" + tag + ">";
		}
		else {
			tagContent = "<" + tag + ">" + value + "</" + tag + ">";
		}
		
		var $pre = $(this.dom).children(preTag);
		if($pre.length > 0) {
			$pre.after(tagContent);
		}
		else {
			$(this.dom).append(tagContent);
		}
	},
	
	insertDomAfter : function(preTag, dom) {
		var $pre = $(this.dom).children(preTag);
		if($pre.length > 0) {
			$pre.after(dom);
		}
		else {
			$(this.dom).append(dom);
		}
	},
	
	getAttrValue : function(attr) {
		return $(this.dom).attr(attr);
	},
	
	setAttrValue : function(attr, value) {
		return $(this.dom).attr(attr, value);
	},
	
	toString : function() {
		return XmlToString(this.dom);
	}
};

/****************************************/
function TaskParser() {
	this.dom = null;
	this.inputs = [];
	this.streams = [];
	this.outputgroups = [];
};

TaskParser.prototype = new BaseParser();

TaskParser.prototype.parse = function(xmlDom) {
	this.inputs.length = 0;
	this.streams.length = 0;
	this.outputgroups.length = 0;
	
	this.dom = xmlDom;
	if(this.dom == null) return;
	
	var context = this;
	
	$(tag.inputs, this.dom).children().each(function() {
		var p = new InputParser();
		p.parse(this);
		context.inputs.push(p);
	});
	
	$(tag.streams, this.dom).children().each(function() {
		var p = new StreamParser();
		p.parse(this);
		context.streams.push(p);
	});
	
	$(tag.outputgroups, this.dom).children().each(function() {
		var p = new OutputgroupParser();
		p.parse(this);
		context.outputgroups.push(p);
	});
};

/****************************************/
function StreamParser() {
	this.dom = null;
	this.videos = [];
	this.audios = [];
};

StreamParser.prototype = new BaseParser();

StreamParser.prototype.parse = function(xmlDom) {
	this.videos.length = 0;
	this.audios.length = 0;
	
	this.dom = xmlDom;
	var context = this;
	
	$(this.dom).children().each(function() {
		var p = null;
		if(this.tagName == tag.h264
			|| this.tagName == tag.avs
			|| this.tagName == tag.h265
			|| this.tagName == tag.mpeg2
			|| this.tagName == tag.mpeg4
			|| this.tagName == tag.vc1
			|| this.tagName == tag.h263
			|| this.tagName == tag.prores
			|| this.tagName == tag.raw
			|| this.tagName == tag.dnxhd
			|| this.tagName == tag.s263) {
			p = new VideoParser();
		}
		else if(this.tagName == tag.aac
			|| this.tagName == tag.amr
			|| this.tagName == tag.mp2
			|| this.tagName == tag.mp3
			|| this.tagName == tag.wma
			|| this.tagName == tag.ac3
			|| this.tagName == tag.dts
			|| this.tagName == tag.vorbis
			|| this.tagName == tag.pcm
			|| this.tagName == tag.ddp) {
			p = new AudioParser();
		}
		
		if(p != null) {
			p.parse(this);
		}
		
		if(p instanceof VideoParser) {
			context.videos.push(p);
		}
		else if(p instanceof AudioParser) {
			context.audios.push(p);
		}
	});
};

/****************************************/
function VideoParser() {
	this.dom = null;
	this.preprocessors = [];
}

VideoParser.prototype = new BaseParser();

VideoParser.prototype.parse = function(xmlDom) {
	this.preprocessors.length = 0 ;
	
	this.dom = xmlDom;
	var context = this;

	$(tag.preprocessor, this.dom).children().each(function() {
		var p = new ProcessorParser();
		p.parse(this);
		context.preprocessors.push(p);
	});
};

VideoParser.prototype.deleteProcessor = function(processor) {
	var index = null;
	for(var i = 0; i < this.preprocessors.length; i++) {
		if(this.preprocessors[i] == processor) {
			index = i;
			break;
		}
	}
	
	if(index != null) {
		$(processor.dom).remove();
		this.preprocessors.splice(index, 1);
	}
};

VideoParser.prototype.addProcessor = function(processor) {
	var index = null;
	if(processor.getTagName() == tag.motionicon) {
		index = this.getLastProcessorIndex(tag.motionicon);
		if(index == null) {
			index = this.getLastProcessorIndex(tag.motioniconbegin);
		}
	}
	else if(processor.getTagName() == tag.dynamictext) {
		index = this.getLastProcessorIndex(tag.dynamictext);
		if(index == null) {
			index = this.getLastProcessorIndex(tag.dynamictextbegin);
		}
	}
	
	var pilot = this.preprocessors[index];
	$(pilot.dom).after(processor.dom);
	
	this.preprocessors.splice(index+1, 0, processor);
};

VideoParser.prototype.getLastProcessorIndex = function(tagName) {
	for(var i = this.preprocessors.length-1; i >= 0; i--) {
		var processor = this.preprocessors[i];
		if(processor.getTagName() == tagName) {
			return i;
		}
	}
	
	return null;
};

/****************************************/
function ProcessorParser() {
	this.dom = null;
}

ProcessorParser.prototype = new BaseParser();

/****************************************/
function AudioParser() {
	this.dom = null;
}

AudioParser.prototype = new BaseParser();

/****************************************/
function InputParser() {
	this.dom = null;
}

InputParser.prototype = new BaseParser();

/****************************************/
function OutputgroupParser() {
	this.dom = null;
	this.outputs = [];
};

OutputgroupParser.prototype = new BaseParser();

OutputgroupParser.prototype.parse = function(xmlDom) {
	this.outputs.length = 0;
	
	this.dom = xmlDom;
	var context = this;
	
	$(this.dom).children(tag.output).each(function() {
		var p = new OutputParser();
		p.parse(this);
		context.outputs.push(p);
	});
};

/****************************************/
function OutputParser() {
	this.dom = null;
};

OutputParser.prototype = new BaseParser();

/****************************************/
function ContentPackagingParser() {
	this.dom = null;
	this.preprocessors = [];
}

ContentPackagingParser.prototype = new BaseParser();

ContentPackagingParser.prototype.parse = function(xmlDom) {
	this.preprocessors.length = 0;
	
	this.dom = xmlDom;
	var context = this;

	$(tag.preprocessor, this.dom).children().each(function() {
		var p = new ProcessorParser();
		p.parse(this);
		context.preprocessors.push(p);
	});
};

/***************************************/
function SimHdScenesParser() {
	this.simHdScenes = [];
}

SimHdScenesParser.prototype = new BaseParser();
SimHdScenesParser.prototype.parse = function(xmlDom) {
	this.simHdScenes.length = 0;
	this.dom = xmlDom;
	var context = this;
	
	$("scene", this.dom).each(function() {
		var p = new SimHdSceneParser();
		p.parse(this);
		context.simHdScenes.push(p);
	});
};

function SimHdSceneParser() {	
}

SimHdSceneParser.prototype = new BaseParser();
