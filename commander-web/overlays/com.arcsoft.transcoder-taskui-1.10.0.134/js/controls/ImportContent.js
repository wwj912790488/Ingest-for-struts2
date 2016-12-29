function ImportContent() {
	var JS_IMPORT_CONTENT_TMPL ="#ImportContentTmpl";
	var JS_IMPORT_CONTENT_FORM = "form";
	
	var Z_INDEX = 10001; 
	
	this.domDialog = null;
	this.bg = null;
	this.fnOnOK = null;
	
	this.Init = function(action, domParent) {
		var $dialog = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		$dialog.attr('id', "");
		$dialog.hide();
		$dialog.find(JS_DIALOG_HEAD_LINE).hide();
		$(domParent).append($dialog);
		this.domDialog = $dialog[0];
		
		var $content = $(JS_IMPORT_CONTENT_TMPL).clone();
		$content.attr('id', "");
		$(JS_IMPORT_CONTENT_FORM, $content).attr("action", action);
		$(JS_DIALOG_CONTAINER, this.domDialog).append($content[0]);
		
		var style = {
			'position':'fixed', 
			'z-index': Z_INDEX,
			'left':'0px',
			'top':'0px'
		};
		$dialog.css(style);
		this.Bind();
		
		this.bg = new BackgroundControl();
		this.bg.Init();

		return this.domDialog;
	};
	
	this.SetOnOK = function(fn) {
		this.fnOnOK = fn;
	};
	
	this.SetTitle = function(title) {
		$(JS_DIALOG_TITLE_TEXT, this.domDialog).text(title);
	};
	
	this.Show = function() {
		var $dialog = $(this.domDialog);
		
		this.bg.Show();
		$dialog.show();
		
		var pos = uGetCenterPos($dialog.width(), $dialog.height());
		$dialog.offset({left:pos.x , top:pos.y});
	};
		
	this.Bind = function() {
		var context = this;
		var $dialog = $(this.domDialog);
		
		$(JS_BUTTON_TRIGGER, this.domDialog).click(function() {
			context.bg.Hide();
			$dialog.hide();
			
			if($(this).attr('id') == ID_BUTTON_OK) {
				var form = $(JS_IMPORT_CONTENT_FORM, context.domDialog).get(0);
				form.submit();
				if($.isFunction(context.fnOnOK)) {
					context.fnOnOK();
				}
			}
		});
	};
}

