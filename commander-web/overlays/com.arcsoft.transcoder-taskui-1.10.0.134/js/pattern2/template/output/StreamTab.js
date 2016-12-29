
function StreamTab() {
	this.dom = null;
	this.parent = null;
	this.items  = [];
	this.selectedIndex = null;
	this.tmpl = null;
	this.fnOnTabSelected = null;
	this.fnOnTabChecked = null;
	this.fnOnTabTrigger = null;
}

StreamTab.prototype = {
	init : function(dom, tmplSelector) {
		this.dom = dom;
		this.tmpl = tmplSelector;
	},
	
	setOnTabSelected : function(fn) {
		this.fnOnTabSelected = fn;
	},
	
	setOnTabChecked : function(fn) {
		this.fnOnTabChecked = fn;
	},
	
	setOnTabTrigger : function(fn) {
		this.fnOnTabTrigger = fn;
	},
	
	clear : function() {
		for(var i = 0; i < this.items.length; i++) {
			this.items[i].remove();
		}
		
		this.items.length = 0;
		this.selectedIndex = null;
	},
	
	setList : function(list) {
		this.clear();
		
		for(var i = 0; i < list.length; i++) {
			var tabInfo = list[i];
			this.createItem(tabInfo);
		}
		
		this.sortItem();
	},
	
	createItem : function(tabInfo) {
		var item = new StreamTabItem();
		item.create(this, this.tmpl);
		item.setInfo(tabInfo);
		$(this.dom).append(item.dom);
		
		this.items.push(item);
	},
	
	addItem : function(info) {
		this.createItem(info);
		
		this.sortItem();
	},
	
	insertItem : function(tabInfo, index) {
		if(index >= this.items.length) {
			this.addItem(tabInfo);
			return;
		}
		
		var item = new StreamTabItem();
		item.create(this, this.tmpl);
		item.setInfo(tabInfo);
		
		var pilot = this.items[index];
		$(pilot.dom).before(item.dom);
		
		this.items.splice(index, 0, item);
		
		this.sortItem();
	},
	
	deleteItem : function(item) {
		var index = null;
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i] == item) {
				index = i;
				break;
			}
		}
		
		if(index != null) {
			item.remove();
			this.items.splice(index, 1);
			
			if(this.selectedIndex == index) {
				this.selectedIndex = null;
			}
		}
		
		this.sortItem();
	},
	
	sortItem : function() {
	},

	getItem : function(index) {
		return this.items[index];
	},
	
	getItemIndex : function(tab) {
		for(var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if(item == tab) {
				return i;
			}
		}
		
		return null;
	},
	
	getInfo : function(index) {
		var item = this.items[index];
		return item.getInfo();
	},
	
	setInfo : function(index, tabInfo) {
		var item = this.items[index];
		item.setInfo(tabInfo);
	},
	
	select : function(index) {
		var item = this.items[index];
		if(item != null) {
			item.selected();
			this.selectedIndex = index;
		}
	},
	
	getSelected : function() {
		return this.selectedIndex;
	},
	
	onTabSelected : function(tab) {
		for(var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if(item == tab) {
				this.selectedIndex = i;
				
				if($.isFunction(this.fnOnTabSelected)) 
					this.fnOnTabSelected(this, i);
			}
			else {
				item.unselected();
			}
		}
	},
	
	onTabTrigger : function(tab, triggerId) {
		var index = this.getItemIndex(tab);
		if($.isFunction(this.fnOnTabTrigger)) 
			this.fnOnTabTrigger(this, index, triggerId);
	},
	
	onTabChecked : function(tab, bChecked) {
		var index = this.getItemIndex(tab);
		if($.isFunction(this.fnOnTabChecked)) 
			this.fnOnTabChecked(this, index, bChecked);
	}
};

function StreamTabItem() {
	this.dom = null;
	this.parent = null;
	this.bSelected = false;
	this.info = null;
}

StreamTabItem.prototype = {
	create : function(parent, tmplSelector) {
		this.parent = parent;
		
		if(tmplSelector == null) {
			tmplSelector = JS_STREAM_TAB_ITEM_TMPL;			
		}
		
		var $tmpl = $tmpl = $(tmplSelector);
		var $dom = $tmpl.clone();
		this.dom = $dom.get(0);
		
		this.init(this.dom);
		
		return this.dom;
	},
	
	init : function(dom) {
		this.dom = dom;
		
		this.bind();
	},
	
	bind : function() {
		var context = this;
		
		$(this.dom).click(function() {
			if(!context.bSelected) {
				context.selected();
			}
		});
		
		$(".ToggleTrigger", this.dom).click(function() {
			context.boxChecked();
		});
		
		$(".TabTrigger", this.dom).click(function() {
			context.tabTrigger(this.id);
		});
	},
	
	remove : function() {
		$(this.dom).remove();
		this.dom = null;
	},
	
	setInfo : function(info) {
		this.info = info;
		
		if(info == null) return;
		
		if(info.show != null && !info.show) {
			$(this.dom).hide();
		}
		else {
			$(this.dom).show();
		}
		
		if(info.checkbox_disabled != null && info.checkbox_disabled) {
			$(".ToggleTrigger", this.dom).hide();
		}
		else {
			$(".ToggleTrigger", this.dom).show();
		}
		
		if(info.checkbox_checked != null) {
			this.setCheck(info.checkbox_checked);
		}
		
		this.setLabel(info.label);
	},
	
	getInfo : function() {
		var info = this.info;

		var $check = $(".StreamTabCheck", this.dom);
		if($check.length > 0) {
			info.checkbox_checked = $check.get(0).checked;
		}
		
		return info;
	},
	
	setLabel : function(label) {
		$(".StreamTabItemLabel", this.dom).text(label);
	},
	
	setCheck : function(check) {
		if(check == null) return;
		
		if(check) {
			$(".ToggleTrigger", this.dom).removeClass("ICON_toggle_off").addClass("ICON_toggle_on");
		}
		else {
			$(".ToggleTrigger", this.dom).removeClass("ICON_toggle_on").addClass("ICON_toggle_off");
		}
	},
	
	getCheck : function() {
		var $toggle = $(".ToggleTrigger", this.dom);
		if($toggle.hasClass("ICON_toggle_on")) {
			return true;
		}
		else {
			return false;
		}
	},
	
	selected : function() {
		this.bSelected = true;
		
		$(".stream_tab_item_1", this.dom).addClass("stream_tab_item_blue");
		$(".stream_tab_item_2", this.dom).addClass("stream_tab_item_white");

		$(".TabTrigger", this.dom).show();
		
		if(this.parent != null) {
			if($.isFunction(this.parent.onTabSelected)) {
				this.parent.onTabSelected(this);
			}
		}
	},
	
	unselected : function() {
		$(".stream_tab_item_1", this.dom).removeClass("stream_tab_item_blue");
		$(".stream_tab_item_2", this.dom).removeClass("stream_tab_item_white");

		$(".TabTrigger", this.dom).hide();
		
		this.bSelected = false;
	},
	
	tabTrigger : function(triggerId) {
		if(this.parent != null) {
			if($.isFunction(this.parent.onTabTrigger)) {
				this.parent.onTabTrigger(this, triggerId);
			}
		}
	},
	
	boxChecked : function() {
		var bChecked = this.getCheck();
		bChecked = !bChecked;
		this.setCheck(bChecked);
		if(this.parent != null) {
			if($.isFunction(this.parent.onTabChecked)) {
				this.parent.onTabChecked(this, bChecked);
			}
		}
	}
};
