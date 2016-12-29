function ViewVideo() {
	this.dom = null;
}

ViewVideo.prototype = {
	init : function(dom) {
		this.dom = dom;
		
		this.licenseControl();
	},
	
	licenseControl : function() {
		if(GetLicense(license.VIDEO_ENCODER_CQ) != license.ENABLED) {
			$(JS_LICENSE_VIDEO_QUANTIZER, this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_ENCODER_TWO_PASS) != license.ENABLED) {
			$(JS_TWO_PASS_OPTION, this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_EDITING_LOGO_INSERTION) != license.ENABLED) {
			$(JS_EDITOR_LOGO_INSERTER, this.dom).hide();
		}
		
		if(GetLicense(license.EX_VIDEO_EDITING_EXTERNAL_SUBTITLE) != license.ENABLED) {
			$(JS_EDITOR_SUBTITLE, this.dom).hide();
		}
	},
	
	_end : ""
};

