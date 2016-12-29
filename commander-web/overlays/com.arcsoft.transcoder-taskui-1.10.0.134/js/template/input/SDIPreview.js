function SDIPreview() {
	var JS_PREVIEW_TEMPLATE = "#SDIPreviewTmpl";
	var JS_PREVIEW_IMAGE = "#PreviewImage";
	
	var Z_INDEX = 10001;
	var PLAYER_WIDTH = 480;
	var PLAYER_HEIGHT = 480;
	var TIMER_INTERVAL = 3000;
	
	//DOM
	this.dom = null;
	this.domContent = null;
	this.domPlayer = null;
	
	this.bg = null;
	this.localURI = null;
	this.inputType = null;
	this.timerId = null;
	this.imgBack = new Image();
	
	/** public API **/
	this.Init = function(id) {
		if(id == null) id="";
		
		var $preview = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		$preview.attr('id', id);
		this.dom = $preview[0];
		
		$(JS_DIALOG_HEAD_LINE, $preview).hide();
		$(JS_BUTTON_CANCEL, $preview).parent().hide();
		$(JS_LABEL_OK, $preview).text(str_common.close);
		
		var $content = $(JS_PREVIEW_TEMPLATE);
		this.domContent = $content[0];
		$(JS_DIALOG_CONTAINER, $preview).append($content[0]);
		var style = {
			'position':'fixed', 
			'z-index': Z_INDEX,
			'left':'0px',
			'top':'0px'
		};
		$preview.css(style);
		$preview.hide();

		this.bg = new BackgroundControl();
		this.bg.Init();
		
		this.Bind();
		
		return this.dom;
	};

	this.Show = function() {
		var $preview = $(this.dom);
		this.bg.Show();
		$preview.show();
		var pos = uGetCenterPos($preview.width(), $preview.height());
		$preview.offset({left:pos.x , top:pos.y ,});
	};
	
	this.Play = function() {
		var context = this;
		this.timerId = setInterval(function() {
			context.PlayURI(context.localURI);
		}, TIMER_INTERVAL);
	};
	
	/*o = {
	 * uri: ,
	 * size:,
	 * video: {codec: , bitrate: , aspectRatio:, }
	 * audio: {codec:, bitrate:, channel:, samplerate:, bitdepth:}
	 * }*/
	this.SetMediaInfo = function(o) {
		this.ClearMediaInfo();
		
		this.localURI = o.uri;
		this.inputType = o.inputType;
	};
	
	this.ClearMediaInfo = function() {
		this.localURI = "";
		this.inputType = null;
	};
	
	this.PlayURI = function(uri) {
		var w = PLAYER_WIDTH;
		var requestURI = 'getMediaFileThumb?uri=sdi:' + uri +'&width=' + w + '&rnd=' + RefreshRnd();
		requestURI = encodeURI(requestURI);
		this.imgBack.src = requestURI;
		
		var img = $(JS_PREVIEW_IMAGE, this.dom).get(0);
		img.src = this.imgBack.src;
	};

	this.Close = function() {
		clearInterval(this.timerId);
		
		this.bg.Hide();
		$(this.dom).hide();
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_BUTTON_TRIGGER, this.dom).click(function() {
			context.Close();
		});
	};
	
	/* static */
	function RefreshRnd(){
		var d = new Date();
		return ''+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDay()+'_'+d.getHours();
	}
}
