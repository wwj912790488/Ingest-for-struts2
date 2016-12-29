// JavaScript Document
function PopupMenu() {
	var JS_POPUPMENU_CONTAINER =".PopupMenu_Container";
	var JS_POPUPMENU_TEMPLATE ="#PopupMenuTemplate";
	
	var JS_PM_ITEM_TEXT =".PM_ItemText";
	var JS_PM_ITEM_TEMPLATE ="#PM_ItemTemplate";
	
	var Z_INDEX = 10001;
	var BG_NAME = "_PopupMenuBg";
	
	this.domMenu = undefined;
	this.domItemTmp = undefined;
	this.domColumn = undefined;
	this.fnOnSelected = undefined;
	this.contentMap = undefined;
	
	/** public API **/
	this.Init = function(id) {
		if(id == undefined) id="";
		var context = this;
		
		this.domItemTmp = $(JS_PM_ITEM_TEMPLATE)[0];
		
		var $menu = $(JS_POPUPMENU_TEMPLATE).clone();
		$menu.attr('id', id);
		this.domMenu = $menu[0];
		
		var $column = $menu.find(JS_POPUPMENU_CONTAINER);
		this.domColumn = $column[0];
		
		var style = {
			'position':'absolute', 
			'z-index': Z_INDEX,
			'left':'0px',
			'top':'0px'
		};
		$menu.css(style);
		$menu.hide();
		
		this.bg = new BackgroundControl();
		this.bg.Init(id+BG_NAME, Z_INDEX-1, 0.0);
		this.bg.SetOnClick(function() {
			context.bg.Hide();
			$(context.domMenu).hide();
		});
		
		//this.GenerateMenu();
		
		return this.domMenu;
	};
	
	this.Show = function(domTrigger) {
		var $menu = $(this.domMenu);
		
		this.bg.Show();
		$menu.show();
		
		var $trigger = $(domTrigger);
		var x = 0;
		var y = 0;
		if($trigger.length != 0) {
			x = $trigger.offset().left;
			y = $trigger.offset().top;
		}
		var pos = uMoveIntoScreen($menu[0], x, y);
		$menu.offset({left:pos.x , top:pos.y ,});
	};
	
	this.SetContentWidth = function(w) {
		var $column = $(this.domColumn);
		$column.width(w);
	};
	
	this.SetOnSelected = function(fn) {
		this.fnOnSelected = fn;
	};
	
	this.SetContentMap = function(map) {
		this.contentMap = map;
		this.GenerateMenu();
	};
	
	/** private API **/
	this.GenerateMenu = function() {
		var $item = undefined;
		var $column = $(this.domColumn);
		$column.empty();
		
		var valueArray = this.contentMap;
		if(valueArray == undefined) return;
		var len = valueArray.length;
		if(len == 0) return;
		
		for(var i = 0; i < len; i++) {
			$item = $(this.domItemTmp).clone();
			$item.attr('id', "");
			$item.find(JS_PM_ITEM_TEXT).text(valueArray[i].value);
			$column.append($item[0]);
			this.BindItem($item[0]);
		}
	};
	
	this.BindItem = function(domItem) {
		var context = this;
		var $column = $(this.domColumn);
		var $item = $(domItem);
		
		$item.click(function() {
			context.bg.Hide();
			$(context.domMenu).hide();
			var activeIndex = $column.children().index(this);
			if($.isFunction(context.fnOnSelected)) {
				var key = context.contentMap[activeIndex].key;
				context.fnOnSelected(key);
			}
		});
	};
}