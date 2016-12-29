var g_Palette = null;

function CreatePalette() {
	g_Palette = new Palette();
	dom = g_Palette.Init();
	$('body').append(dom);
}

function Palette() {
	var JS_PALETTE_TEMPLATE = "#PaletteTmpl";
	var JS_PALETTE_COLOR = "#PaletteColor";
	var JS_PALETTE_PICKER = "#PalettePicker";
	
	var Z_INDEX = 10002;
	
	//DOM
	this.dom = null;
	this.bg = null;
	this.fnOnClose = null;
	this.farb = null;
	this.showBG = true;
	
	/** public API **/
	this.Init = function(id) {
		if(id == null) id="";
		
		var $dialog = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		$dialog.attr('id', id);
		this.dom = $dialog[0];
		
		$(JS_DIALOG_HEAD_LINE, this.dom).hide();
		$(JS_BUTTON_CANCEL, this.dom).parent().hide();
		$(JS_LABEL_OK, this.dom).text(str_common.close);
		
		var $content = $(JS_PALETTE_TEMPLATE);
		$(JS_DIALOG_CONTAINER, this.dom).append($content[0]);
		var style = {
			'position':'fixed', 
			'z-index': Z_INDEX,
			'left':'0px',
			'top':'0px'
		};
		$dialog.css(style);
		$dialog.hide();

		this.bg = new BackgroundControl();
		this.bg.Init();
		
		var domPicker = $(JS_PALETTE_PICKER, this.dom).get(0); 
		var domColor = $(JS_PALETTE_COLOR, this.dom).get(0);
		this.farb = $.farbtastic(domPicker, domColor);
		
		this.Bind();
		
		return this.dom;
	};

	this.Show = function(x, y) {
		var $dialog = $(this.dom);
		if(this.showBG) this.bg.Show();
		
		$dialog.show();
		var pos = uGetCenterPos($dialog.width(), $dialog.height());
		if(x == null) x = pos.x;
		if(y == null) y = pos.y;
		$dialog.offset({left: x , top: y});
	};

	this.Close = function() {
		if(this.showBG) this.bg.Hide();
		$(this.dom).hide();
		
		if($.isFunction(this.fnOnClose)) {
			this.fnOnClose();
		};
	};
	
	this.Bind = function() {
		var context = this;
		
		$(JS_BUTTON_TRIGGER, this.dom).click(function() {
			context.Close();
		});
	};
	
	this.SetOnClose = function(fn) {
		this.fnOnClose = fn;
	};
	
	this.GetColor = function() {
		var value =  $(JS_PALETTE_COLOR, this.dom).val();
		var match = value.match(/#[0-9a-f]{6}/gi);
		if(match == null) {
			value = "#ffffff";
		} else {
			value = match[0];
		}
		value = value.substring(1);
		return value;
	};
	
	this.GetRect = function() {
		var o = new Object();
		var $dialog = $(this.dom);
		var offset = $dialog.offset();
		o.left = offset.left;
		o.top = offset.top;
		o.width = $dialog.width();
		o.height = $dialog.height();
		return o;
	};
	
	this.getRect = function() {
		return this.GetRect();
	}
	
	this.SetShowBG = function(showBG) {
		this.showBG = showBG;
	};
	
	this.SetColor = function(color) {
		this.farb.setColor("#"+color);
	};
}
