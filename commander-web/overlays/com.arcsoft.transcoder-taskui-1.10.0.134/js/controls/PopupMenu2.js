/********** jsp ***************
<div class="PopupMenu">+
	<div class="PopupMenuItems">
	</div>
</div>
*/

function PopupMenu2() {
	this.dom = null;
	this.itemGroup = null;
	this.bShow = false;
	this.itemCss = {};
	this.fnOnItemClick = null;
};

PopupMenu2.prototype = {
	init : function(dom) {
		this.dom = dom;
		this.itemGroup = $(".PopupMenuItems", this.dom);
		this.bind();
	},
	
	bind : function() {
		var context = this;
	},
	
	bindItem : function(itemDom) {
		var context = this;
		
		$(itemDom).click(function() {
			context.itemGroup.hide();
			if($.isFunction(context.fnOnItemClick)) {
				context.fnOnItemClick(this.id);
			}
		});
	},
	
	setList : function(list) {
		if(list == null) return;

		for(var i = 0; i < list.length; i++) {
			var $item = $("<div></div>");
			$item.css(this.itemCss);
			
			$item.id(list[i].key);
			$item.text(list[i].value);
			
			this.itemGroup.append($item);
			
			this.bindItem($item.get(0));
		} 
	},

	setOnItemClick : function(fn) {
		this.fnOnItemClick = fn;
	},
};