var JS_LINE_SELECTOR_TMPL = "#TemplateLib #LineSelectorTmpl";
var JS_LINE_SELECTOR_ITEM_TMPL = "#TemplateLib #LineSelectorItemTmpl";
var JS_LINE_SELECTOR_ITEM_TMPL1 = "#TemplateLib #LineSelectorItemTmpl1";
var JS_LINE_SELECTOR_ITEM_TMPL2 = "#TemplateLib #LineSelectorItemTmpl2";
var JS_LINE_SELECTOR_ITEM = ".LineSelectorItem";
var JS_LINE_SELECTOR_CONTAINER = ".LineSelectorContainer";
var JS_LINE_SELECTOR_TITLE = ".LineSelectorTitle";
var JS_ATTR_DATA_KEY = "data-key";

function CreateLineSelector(id, parentDom) {
	var $tmp = $(JS_LINE_SELECTOR_TMPL).clone();
	$tmp.attr("id", id);
	$(parentDom).append($tmp);
	
	var ls = new LineSelector();
	ls.init($tmp.get(0));
	ls.hide();
	return ls;
};

function LineSelector() {
	this.dom = null;
	this.fnOnSelected = null;
	this.background = null;
	
	this.init = function(dom) {
		this.dom = dom;
		
		this.background = new BackgroundControl();
		this.background.Init("LineSelectBk", 20000, 0.2);
	};
	
	this.getRect = function() {
		var o = new Object();
		var $dialog = $(this.dom);
		var offset = $dialog.offset();
		o.left = offset.left;
		o.top = offset.top;
		o.width = $dialog.width();
		o.height = $dialog.height();
		return o;
	};
	
	this.show = function(x, y) {
		var context = this;
		var $dialog = $(this.dom);
		
		$dialog.show();
		if(this.background != null) {
			this.background.Show();
			this.background.SetOnClick(function() {
				context.background.SetOnClick(null);
				context.hide();
			});
		}
		
		if(x == null || y == null) {
			var pos = uGetCenterPos($dialog.width(), $dialog.height());
			$dialog.offset({left:pos.x , top:pos.y});
		} else {
			$dialog.offset({left:x , top:y});
		}
	};
	
	this.hide = function() {
		$(this.dom).hide();
		if(this.background != null) {
			this.background.Hide();
		}
	};
	
	this.setOnSelected = function(fn) {
		this.fnOnSelected = fn;
	};
	
	this.cleanContent = function() {
		$(JS_LINE_SELECTOR_ITEM, this.dom).remove();
	};
	
	this.setContent = function(map) {
		this.cleanContent();
		if(map == null) return;
		
		for(var i = 0; i < map.length; i++) {
			this.createItem(map[i]);
		}
	};
	
	this.setTitle = function(title) {
		$(JS_LINE_SELECTOR_TITLE, this.dom).text(title);
	};
	
	/**
	 * obj {key, value, style, inputArray}
	 */
	this.createItem = function(obj) {
		var key = obj.key;
		var value = obj.value;
		var style = obj.style;
		var inputArray = obj.inputArray;
		
		var itemTmp = JS_LINE_SELECTOR_ITEM_TMPL;
		if(style == 1) {
			itemTmp = JS_LINE_SELECTOR_ITEM_TMPL1;
		}
		else if(style == 2) {
			itemTmp = JS_LINE_SELECTOR_ITEM_TMPL2;
		}
		
		var $item = $(itemTmp).clone();
		$(JS_LINE_SELECTOR_CONTAINER, this.dom).append($item);
		$item.attr(JS_ATTR_DATA_KEY, key);
		$(".ItemLabel", $item).text(value);
		
		if(inputArray != null && inputArray.length > 0) {
			$(".ItemInput", $item).each(function(index) {
				if(index < inputArray.length) {
					this.value = inputArray[index];
				}
			});
		}
		
		this.bindItem($item.get(0));
		return $item;
	};
	
	this.bindItem = function(itemDom) {
		var context = this;
		$(itemDom).click(function() {
			var key = $(itemDom).attr(JS_ATTR_DATA_KEY);
			context.hide();
			
			if($.isFunction(context.fnOnSelected)) {
				context.fnOnSelected(key);
			}
		});
		
		$(".ItemInput", itemDom).click(function(e) {
			e.stopPropagation();
		})
	};
}

LineSelector.prototype = {
	getInputValues : function(key) {
		var inputArray = [];
		var sel = "div[data-key='" + key +"']";
		var $item = $(sel, this.dom);
		if($item.length > 0) {
			$(".ItemInput", $item).each(function(index) {
				inputArray.push(this.value);
			});
		}
		return inputArray;
	},
}