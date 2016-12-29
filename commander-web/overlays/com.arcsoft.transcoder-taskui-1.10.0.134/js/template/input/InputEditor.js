function InputEditor() {
	var JS_INPUT_EDITOR_EXPAND_TRIGGER =".InputEditorExpandTrigger";
	var JS_INPUT_EDITOR_EXPAND_ICON =".InputEditorExpandIcon";
	var JS_INPUT_EDITOR_EXPAND_TARGET =".InputEditorExpandTarget";

	this.dom = null;
	this.editorMosaic = null;
	this.editorTrim = null;
	this.paddingImage = null;
	this.audioProcess = null;
	this.timeClipping = null;
	this.advertisement = null;
	
	this.Init = function(dom) {
		this.SetDOM(dom);
		this.LicenseControl();
		this.Bind();
		this.UpdateExpand();
		this.InitSub();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.VIDEO_EDITING_MOSAIC_INSERTION) != license.ENABLED) {
			$(".TabMosaic", this.dom).remove();
		}
		if(GetLicense(license.VIDEO_EDITING_CROPPING) != license.ENABLED) {
			$(".TabTrim", this.dom).remove();
		}
		if(GetLicense(license.VIDEO_EDITING_TIMELINE_CUT_TRIM) != license.ENABLED) {
			$(".TabTimeClipping", this.dom).remove();
		}
		if(GetLicense(license.VIDEO_EDITING_ADS) != license.ENABLED) {
			$(".TabAdvertisement", this.dom).remove();
		}
		if(GetLicense(license.VIDEO_EDITING_PADDING_IMAGE) != license.ENABLED) {
			$(".TabPaddingImage", this.dom).remove();
		}
		if(GetLicense(license.VIDEO_EDITING_AUDIO_DELAY) != license.ENABLED) {
			$(".TabAudioProcess", this.dom).remove();
		}
		$("."+CLASS_UNDERLINE_TRIGGER, this.dom).first().addClass(CLASS_UNDERLINE_ACTIVE);
	};

	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Bind = function() {
		var context = this;
		var $dom = $(this.dom);
		var $table = $dom.find(JS_INPUT_EDITOR_TAB);
		classArr = [CLASS_UNDERLINE_TRIGGER, CLASS_UNDERLINE_ACTIVE];
		uInitTab($table.get(0), classArr, function(domTrigger) {
			context.ShowEditorTab(domTrigger.id);
		});
	};
	
	this.UpdateExpand = function() {
		var $dom = $(this.dom);
		var o = {};
		o.$trigger = $dom.find(JS_INPUT_EDITOR_EXPAND_TRIGGER);
		o.$icon = $dom.find(JS_INPUT_EDITOR_EXPAND_ICON);
		o.$target = $dom.find(JS_INPUT_EDITOR_EXPAND_TARGET);
		o.expand = false;
		uBindExpand(o);
	};

	this.InitSub = function() {
		this.editorMosaic = new EditorMosaic();
		this.editorMosaic.Init($(JS_EDITOR_MOSAIC, this.dom).get(0));
		
		this.editorTrim = new EditorTrim();
		this.editorTrim.Init($(JS_EDITOR_TRIM, this.dom).get(0));

		this.timeClipping = new EditorTimeClipping();
		this.timeClipping.Init($(JS_EDITOR_TIMECLIPPING, this.dom).get(0));
		
		this.advertisement = new Advertisement();
		this.advertisement.Init($(JS_ADVERTISEMENT, this.dom).get(0));
		
		this.paddingImage = new EditorPaddingImage();
		this.paddingImage.Init($(JS_EDITOR_PADDING_IMAGE, this.dom).get(0));
		
		this.audioProcess = new EditorAudioProcess();
		this.audioProcess.Init($(JS_EDITOR_AUDIO_PROCESS, this.dom).get(0));
	};
	
	this.ShowEditorTab = function(id) {
		var $pageArr = $(this.dom).find(JS_INPUT_EDITOR_PANEL);
		$pageArr.hide();
		$pageArr.filter("#"+id).show();
	};
	
	this.ShowPlayIcon = function(bShow) {
		if(bShow) {
			$(JS_INPUT_PREVIEW_TRIGGER, this.dom).show();
		}
		else {
			$(JS_INPUT_PREVIEW_TRIGGER, this.dom).hide();
		}
	};
}
