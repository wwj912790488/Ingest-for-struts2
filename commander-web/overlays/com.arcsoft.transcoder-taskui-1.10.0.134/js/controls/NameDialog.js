function NameDialog() {
	var JS_INPUT_NAME_TEMPLATE ="#InputNameTemplate";
	var JS_ND_CATEGORY =".Category";
	
	var JS_NAME ="input[name='Name']";
	var JS_DESCRIPTION ="textarea[name='Description']";
	var JS_CATEGORY ="input[name='Category']";
	
	var Z_INDEX = 10001; 
	
	this.domDialog = null;
	this.bg = null;
	this.fnOnOK = null;
	
	/**
	 * @param: id = tag id.
	 * in the array will be hidden in dialog.
	 */
	this.Init = function(id) {
		if(id == undefined) id = "";
		
		var $dialog = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		this.domDialog = $dialog[0];
		$dialog.attr('id', id);
		$dialog.hide();
		$dialog.find(JS_DIALOG_HEAD_LINE).hide();
		
		var $inputName = $(JS_INPUT_NAME_TEMPLATE).clone();
		$inputName.attr('id', "");
		$dialog.find(JS_DIALOG_CONTAINER).append($inputName[0]);
		
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
	
	this.Show = function(x, y) {
		var $dialog = $(this.domDialog);
		
		this.bg.Show();
		$dialog.show();

		if(x == null || y == null) {
			var pos = uGetCenterPos($dialog.width(), $dialog.height());
			$dialog.offset({left:pos.x , top:pos.y});
		} else {
			$dialog.offset({left:x , top:y});
		}
	};

	this.GetName = function() {
		return this.GetValueByJS(JS_NAME);
	};
	
	this.GetDescription = function() {
		return this.GetValueByJS(JS_DESCRIPTION);
	};
	
	this.GetCategory = function() {
		return this.GetValueByJS(JS_CATEGORY);
	};
	
	this.GetValueByJS = function(selector) {
		return $(this.domDialog).find(selector).val();
	};
	
	this.SetTitle = function(title) {
		$(this.domDialog).find(JS_DIALOG_TITLE_TEXT).text(title);
	};
	
	this.DisplayCategory = function(bShow) {
		if(bShow) {
			$(this.domDialog).find(JS_ND_CATEGORY).show();
		} else {
			$(this.domDialog).find(JS_ND_CATEGORY).hide();
		}
	};
	
	this.Bind = function() {
		var context = this;
		var $dialog = $(this.domDialog);
		
		$dialog.find(JS_BUTTON_TRIGGER).click(function() {
			context.bg.Hide();
			$dialog.hide();
			
			if($(this).attr('id') == ID_BUTTON_OK) {
				if($.isFunction(context.fnOnOK)) {
					context.fnOnOK();
				}
			}
		});
	};
}

