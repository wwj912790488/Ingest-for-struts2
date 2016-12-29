function ContentTab() {
	this.dom = null;
	this.items = [];
	this.parent = null;
	this.selectedIndex = null;
}

ContentTab.prototype = {
	init : function(dom) {
		this.dom = dom;
	},
	
	setParent : function(parent) {
		this.parent = parent;
	},
	
	clear : function() {
		for(var i = 0; i < this.items.length; i++) {
			this.items[i].remove();
		}
		
		this.items.length = 0;
	},

	setList : function(list) {
		this.clear();
		for(var i = 0; i < list.length; i++) {
			var tabInfo = list[i];
			this.createItem(tabInfo);
		}
		
		this.sortItem();
	},
	
	onTabSelected : function(tab) {
		for(var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if(item == tab) {
				this.selectedIndex = i;
				if(this.parent != null) {
					if($.isFunction(this.parent.onTabSelected)) 
						this.parent.onTabSelected(i);
				}
			}
			else {
				item.unselected();
			}
		}
	},
	
	onChecked : function(tab, checked) {
		for(var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if(item == tab) {
				if(this.parent != null) {
					if($.isFunction(this.parent.onChecked)) {
						this.parent.onChecked(i, checked);
					}
				}
				break;
			}
		}
	},
	
	getSelectedIndex : function() {
		return this.selectedIndex;
	},
	
	getSelectedItem : function() {
		if(this.selectedIndex == null) return null;
		return this.items[this.selectedIndex];
	},
	
	getTab : function(index) {
		if(this.items.length <= index) return null;
		return this.items[index];
	},
	
	getInfo : function(index) {
		var item = this.getTab(index);
		var info = item.getInfo();
		return info;
	},
	
	getSize : function() {
		return this.items.length;
	},
	
	select : function(index) {
		if(this.items.length <= index) return;
		
		this.selectedIndex = index;
		this.items[index].selected();
	},
	
	createItem : function(tabInfo) {
		var item = new ContentTabItem();
		item.create(this);
		item.setInfo(tabInfo);
		$(this.dom).append(item.dom);
		
		this.items.push(item);
	},
	
	addItem : function(tabInfo) {
		this.createItem(tabInfo);
		
		this.sortItem();
	},
	
	insertItem : function(tabInfo, index) {
		if(index >= this.items.length) {
			this.addItem(tabInfo);
			return;
		}
		
		var item = new ContentTabItem();
		item.create(this);
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
		}
		
		this.sortItem();
	},
	
	sortItem : function() {
		/*$(cpjs.ContentTabIndex, this.dom).each(function(i) {
			$(this).text(i + 1);
		});*/
	},
};

function ContentTabItem() {
	this.dom = null;
	this.parent = null;
	this.bSelected = false;
	this.info = null;
};

ContentTabItem.prototype = {
	create : function(parent) {
		this.parent = parent;
		var $tmpl = $(cptmpl.ContentTab);
		var $dom = $tmpl.clone();
		this.dom = $dom.get(0);
		
		this.init();
		
		return this.dom;
	},
	
	init : function(dom) {
		this.bind();
	},
	
	bind : function() {
		var context = this;
		
		$(this.dom).click(function() {
			if(!context.bSelected) {
				context.selected();
			}
		});
		
		$(cpjs.TabCheck, this.dom).change(function() {
			context.onChecked();
		});
	},
	
	remove : function() {
		$(this.dom).remove();
		this.dom = null;
	},
	
	setInfo : function(info) {
		this.info = info;
		
		if(info.show != null && !info.show) {
			$(this.dom).hide();
		}
		else {
			$(this.dom).show();
		}
		
		this.setLabel(info.label);
		
		var checkDom = $(cpjs.TabCheck, this.dom).get(0);
		if(checkDom != null) {
			checkDom.checked = info.checkbox_checked;
			checkDom.disabled = info.checkbox_disabled;
		}
	},
	
	getInfo : function() {
		var info = this.info;
		
		var checkDom = $(cpjs.TabCheck, this.dom).get(0);
		if(checkDom != null) {
			info.checkbox_checked = checkDom.checked;
			info.checkbox_disabled = checkDom.disabled;
		}
		return info;
	},
	
	setLabel : function(label) {
		$(cpjs.ContentTabLabel, this.dom).text(label);
	},
	
	selected : function() {
		$(this.dom).removeClass("unselected_tab").addClass("selected_tab");
		this.bSelected = true;
		if(this.parent != null) {
			if($.isFunction(this.parent.onTabSelected)) {
				this.parent.onTabSelected(this);
			}
		}
	},
	
	unselected : function() {
		$(this.dom).removeClass("selected_tab").addClass("unselected_tab");
		this.bSelected = false;
	},
	
	onChecked : function() {
		var checked = $(cpjs.TabCheck, this.dom).get(0).checked;
		if(this.parent != null) {
			if($.isFunction(this.parent.onChecked)) {
				this.parent.onChecked(this, checked);
			}
		}
	},
	
	setTitle : function(title) {
		$(this.dom).attr({"title" : title});
	},
};
