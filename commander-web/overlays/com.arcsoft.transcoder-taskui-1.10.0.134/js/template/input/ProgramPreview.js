function ProgramPreview() {
	var JS_PREVIEW_TEMPLATE = "#ProgramPreviewTmpl";
	
	var Z_INDEX = 10001;
	var PLAYER_WIDTH = 480;
	var PLAYER_HEIGHT = 360;
	
	//DOM
	this.dom = null;
	this.domContent = null;
	this.domPlayer = null; 
	
	this.bg = null;
	this.localURI = null;
	this.inputType = null;
	this.resolutionWidth = null;
	this.resolutionHeight = null;
	this.frameRate = 25; //for windows debug.
	this.aspectRatio = {x: 0, y: 0};
	this.program = {programId: -1, videoId: -1, audioId: -1, subtitleId: -1};
	
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
	
	this.InitTMPlayer = function() {
		if(this.domPlayer != null) return;
		
		this.domPlayer = Player_Init($(JS_PLAYER_CONTAINER, this.dom).get(0));
	};

	this.Show = function() {
		var $preview = $(this.dom);
		this.bg.Show();
		$preview.show();
		var pos = uGetCenterPos($preview.width(), $preview.height());
		$preview.offset({left:pos.x , top:pos.y ,});
	};
	
	this.Play = function() {
		this.InitTMPlayer();
		
		if(this.localURI == null) return;
		
		var _url = URI2HttpURL(this.localURI);
		this.PlayURI(_url);
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
		
		if(o.video != null) {
			this.frameRate = parseFloat(o.video.framerate);
			if(isNaN(this.frameRate) || this.frameRate < 1) {
				this.frameRate = 25;
			}
			
			if(o.video.aspectRatio != null) {
				var aspectArr = o.video.aspectRatio.match(/\d+/g);
				value = parseInt(aspectArr[0]);
				if(isNaN(value)) value = 0;
				this.aspectRatio.x = value;
				value = parseInt(aspectArr[1]);
				if(isNaN(value)) value = 0;
				this.aspectRatio.y = value;
			}
			
			if(o.video.resolution != null) {
				var arr = o.video.resolution.match(/\d+/g);
				value = parseInt(arr[0]);
				if(isNaN(value)) value = 0;
				this.resolutionWidth = value;
				value = parseInt(arr[1]);
				if(isNaN(value)) value = 0;
				this.resolutionHeight = value;
			}
		}
		
		if(o.program != null) {
			this.program.programId = o.program.programId;
			this.program.videoId = o.program.videoId;
			this.program.audioId = o.program.audioId;
			this.program.subtitleId = o.program.subtitleId;
			this.program.angleId = o.program.angleId;
		}
	};
	
	this.ClearMediaInfo = function() {
		this.localURI = "";
		this.inputType = null;
		this.frameRate = 25;
		this.aspectRatio.x = 0;
		this.aspectRatio.y = 0;
		this.program.programId = -1;
		this.program.videoId = -1;
		this.program.audioId = -1;
		this.program.subtitleId = -1;
		this.program.angleId = null;
		this.resolutionWidth = 0;
		this.resolutionHeight = 0;
	};
	
	this.SetTitle = function(title) {
		$(this.domMenu).find(JS_DIALOG_TITLE_TEXT).text(title);
	};

	this.PlayURI = function(httpURI) {
		if(this.domPlayer == null) return;
		Player_SelectTrack(this.domPlayer, this.localURI, this.program);
		
		var mediaType = Player_GetMediaType(this.inputType, this.localURI);
		var ret = this.domPlayer.LoadMedia(httpURI, "", mediaType);
		if(ret != 0) return;
		
		var aspectRatioX = 0;
		var aspectRatioY = 0;
		if(this.aspectRatio.x == 0 || this.aspectRatio.y == 0) {
			aspectRatioX = this.domPlayer.GetVideoDisplayWidth();
			aspectRatioY = this.domPlayer.GetVideoDisplayHeight();
		} else {
			aspectRatioX = this.aspectRatio.x;
			aspectRatioY = this.aspectRatio.y;
		}
		
		if(this.resolutionWidth == 0 || this.resolutionHeight == 0) {
			this.resolutionWidth = this.domPlayer.GetVideoWidth();
			this.resolutionHeight = this.domPlayer.GetVideoHeight();
		}
		
		if(aspectRatioX <= 0 || aspectRatioY <= 0) {
			this.domPlayer.width = PLAYER_WIDTH;
			this.domPlayer.height = PLAYER_HEIGHT;
		} else {
			if(aspectRatioX >= aspectRatioY) {
				this.domPlayer.width = PLAYER_WIDTH;
				this.domPlayer.height = PLAYER_WIDTH * aspectRatioY / aspectRatioX;
			} else {
				this.domPlayer.height = PLAYER_HEIGHT;
				this.domPlayer.width = PLAYER_HEIGHT * aspectRatioX / aspectRatioY;
			}
		}
		
		if (ret == 0) ret = this.domPlayer.Play();
		return ret;
	};

	this.RestorePlayer = function() {
		this.domPlayer.ChangeAspectRatio(0, 0, -100, 0);
	};

	this.Close = function() {
		//TMPlayer operate.
		if(this.domPlayer != null) {
			this.domPlayer.close();
			this.RestorePlayer();
		}
		
		this.bg.Hide();
		$(this.dom).hide();
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_BUTTON_TRIGGER, this.dom).click(function() {
			context.Close();
		});
	};
	
}
