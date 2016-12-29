function ViewOutput() {
	this.dom = null;
	this.video = null;
}

ViewOutput.prototype = {
	init : function(dom) {
		this.dom = dom;
		
		this.licenseControl();
		
		this.initSub();
	},
	
	licenseControl : function() {
	},
	
	initSub : function() {
		this.video = new ViewVideo();
		this.video.init($(JS_VIDEO_DESCRIPTION, this.dom).get(0));
	},
	
	_end : ""
};

