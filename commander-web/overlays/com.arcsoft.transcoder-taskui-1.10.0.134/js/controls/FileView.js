function FileView() {
	var zIndex = 10100; 
	
	this.domDialog = undefined;
	this.fileView = undefined;
	this.bg = undefined;
	this.showBG = true;
	this.fnOnOK = undefined;
	this.fnOnCancel = undefined;
	
	this.Init = function(id, onlyFolder, action, rootPath) {
		if(id == undefined) id="";
		var style = undefined;
		if(onlyFolder == undefined) onlyFolder = false;
		if(action == undefined) action = 'getDirFiles';
		if(rootPath == null) rootPath = '/';
		
		var $dialog = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		$dialog.attr('id', id);
		$dialog.hide();
		this.domDialog = $dialog[0];
		
		var $fileView = $('<div></div>');
		style = {
			'width':'470px',
			'height':'300px',
			'overflow': 'auto',
		};
		$fileView.css(style);
		this.fileView = $fileView;
		// $fileView comes from jqueryFileTree.js
		$fileView.fileTree(
			{
				root: rootPath,
				expandSpeed: -1,
				collapseSpeed: -1,
				onlyFolder: onlyFolder,
				script: action
			}, null
		);
		
		$dialog.find(JS_DIALOG_CONTAINER).append($fileView[0]);
		style = {
			'position':'fixed', 
			'z-index': zIndex,
			'left':'0px',
			'top':'0px'
		};
		$dialog.css(style);
		
		this.bg = new BackgroundControl();
		this.bg.Init("FileViewBk", 10099, 0.2);
		
		this.Bind();
		
		return this.domDialog;
	};
	
	this.SetOnOK = function(fn) {
		this.fnOnOK = fn;
	};
	
	this.SetOnCancel = function(fn) {
		this.fnOnCancel = fn;
	};
	
	this.SetWidth = function(width) {
		style = {
			'width': width +'px'
		};
		this.fileView.css(style);
	};

	this.SetHeight = function(height) {
		style = {
			'height': height +'px'
		};
		this.fileView.css(style);
	};
	
	this.Show = function(x, y) {
		var $dialog = $(this.domDialog);
		
		if(this.showBG) this.bg.Show();
		$dialog.show();
		
		if(x == undefined || y == undefined) {
			var pos = uGetCenterPos($dialog.width(), $dialog.height());
			$dialog.offset({left:pos.x , top:pos.y});
		} else {
			$dialog.offset({left:x , top:y});
		}
	};
	
	this.GetRect = function() {
		var o = new Object();
		var $dialog = $(this.domDialog);
		var offset = $dialog.offset();
		o.left = offset.left;
		o.top = offset.top;
		o.width = $dialog.width();
		o.height = $dialog.height();
		return o;
	};
	
	this.SetTitle = function(title) {
		$(this.domDialog).find(JS_DIALOG_TITLE_TEXT).text(title);
	};
	
	this.GetFilePath = function() {
		return this.fileView.getFilePath();
	};
	

	this.SetZIndex = function(zIndex) {
		style = { 
			'z-index': zIndex
		};
		$(this.domDialog).css(style);
	};
	
	this.SetShowBG = function(b) {
		this.showBG = b;
	};
	
	this.Bind = function() {
		var context = this;
		var $dialog = $(this.domDialog);
		
		$dialog.find(JS_BUTTON_TRIGGER).click(function() {
			if(context.showBG) context.bg.Hide();
			$dialog.hide();
			
			if($(this).attr('id') == ID_BUTTON_OK) {
				if($.isFunction(context.fnOnOK)) {
					var key = context.GetFilePath();
					if(key == undefined) key="";
					context.fnOnOK(key);
				}
			}
			else if($(this).attr('id') == "ButtonCancel") {
				if($.isFunction(context.fnOnCancel)) {
					var key = context.GetFilePath();
					if(key == undefined) key="";
					context.fnOnCancel(key);
				}
			}
		});
	};
}

