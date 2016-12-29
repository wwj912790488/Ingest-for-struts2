var JS_DYNAMIC_TEXT_EDITOR_TMPL = "#TemplateLib #DynamicTextEditorTmpl";

function CreateDynamicTextEditor(id, parentDom) {
	var $tmp = $(JS_DYNAMIC_TEXT_EDITOR_TMPL).clone();
	$tmp.attr("id", id);
	$(parentDom).append($tmp);
	
	var obj = new DynamicTextEditor();
	obj.init($tmp.get(0));
	obj.hide();
	return obj;
}

function DynamicTextEditor() {
	this.dom = null;
	this.fnOnButtonClick = null;
	this.background = null;
}

DynamicTextEditor.prototype = {
	init : function(dom) {
		this.dom = dom;
		
		this.background = new BackgroundControl();
		this.background.Init("DynamicTextEditorBk", 10000, 0.2);
		
		this.bind();
	},
	
	bind : function() {
		var context = this;
		$(".EditorButton", this.dom).click(function() {
			context.onButtonClick(this.id);
		});
	},
	
	onButtonClick : function(buttonId) {
		if($.isFunction(this.fnOnButtonClick)) {
			this.fnOnButtonClick(buttonId);
		}
		
		if(buttonId == "OKTrigger" || buttonId == "CancelTrigger") {
			this.hide();
		}
	},
	
	show : function(x, y) {
		var context = this;
		var $dialog = $(this.dom);
		
		$dialog.show();
		if(this.background != null) {
			this.background.Show();
		}
		
		if(x == null || y == null) {
			var pos = uGetCenterPos($dialog.width(), $dialog.height());
			$dialog.offset({left:pos.x , top:pos.y});
		} else {
			$dialog.offset({left:x , top:y});
		}
		
		$(".DynamicTextArea", this.dom).focus();
	},
	
	hide : function() {
		$(this.dom).hide();
		if(this.background != null) {
			this.background.Hide();
		}
	},

	setOnButtonClick : function(fn) {
		this.fnOnButtonClick = fn;
	},
	
	setLabel : function(label) {
		$(".DynamicTextArea", this.dom).val(label);
	},

	getLabel : function(label) {
		return $(".DynamicTextArea", this.dom).val();
	},
	
	getRect : function() {
		var o = new Object();
		var $dialog = $(this.dom);
		var offset = $dialog.offset();
		o.left = offset.left;
		o.top = offset.top;
		o.width = $dialog.width();
		o.height = $dialog.height();
		return o;
	}
};

