function ViewInput() {
	this.dom = null;
	this.mosaic = null;
	this.trim = null;
	this.timeClip = null;
	this.advertise = null;
	this.paddingImage = null;
	this.audioProcess = null;
}

ViewInput.prototype = {
	init : function(dom) {
		this.dom = dom;
		
		this.licenseControl();
	},
	
	licenseControl : function() {
		if(GetLicense(license.VIDEO_EDITING_MOSAIC_INSERTION) != license.ENABLED) {
			$(JS_EDITOR_MOSAIC, this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_EDITING_CROPPING) != license.ENABLED) {
			$(JS_EDITOR_TRIM, this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_EDITING_PADDING_IMAGE) != license.ENABLED) {
			$(JS_EDITOR_PADDING_IMAGE, this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_EDITING_AUDIO_DELAY) != license.ENABLED) {
			$(JS_EDITOR_AUDIO_PROCESS, this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_EDITING_TIMELINE_CUT_TRIM) != license.ENABLED) {
			$(JS_EDITOR_TIMECLIPPING, this.dom).hide();
		}
		
		if(GetLicense(license.VIDEO_EDITING_ADS) != license.ENABLED) {
			$(JS_ADVERTISEMENT, this.dom).hide();
		}
	
	},
	
	_end : ""
};

