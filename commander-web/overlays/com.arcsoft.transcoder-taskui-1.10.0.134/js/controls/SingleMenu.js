function SingleMenu() {
	/** my selector **/
	var CLASS_SM_ITEM_ACTIVE ="SM_ItemActive";
	var CLASS_SM_ITEM_NORMAL ="SM_ItemNormal";
	var JS_SM_ITEM_TEXT =".SM_ItemText";
	var JS_SM_COLUMN_TEMPLATE ="#SM_ColumnTemplate";
	var JS_SM_ITEM_ACTIVE_TEMPLATE ="#SM_ItemActiveTemplate";
	var JS_SM_ITEM_NORMAL_TEMPLATE ="#SM_ItemNormalTemplate";
	
	var Z_INDEX = 10001;
	
	this.domMenu = undefined;
	this.domItemActiveTmp = undefined;
	this.domItemNormalTmp = undefined;
	this.menuData = undefined;
	this.domColumn = undefined;
	this.activeIndex = -1;
	this.fnOnOK = undefined;
	
	/** public API **/
	this.Init = function(domUL, id) {
		if(id == undefined) id="";
		
		this.domItemActiveTmp = $(JS_SM_ITEM_ACTIVE_TEMPLATE)[0];
		this.domItemNormalTmp = $(JS_SM_ITEM_NORMAL_TEMPLATE)[0];
		
		var $menu = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		$menu.attr('id', id);
		this.domMenu = $menu[0];
		
		var $column = $(JS_SM_COLUMN_TEMPLATE).clone();
		$column.attr('id', "");
		this.domColumn = $column[0];
		
		$menu.find(JS_DIALOG_CONTAINER).append(this.domColumn);
		var style = {
			'position':'fixed', 
			'z-index': Z_INDEX,
			'left':'0px',
			'top':'0px'
		};
		$menu.css(style);
		$menu.hide();
			
		this.menuData = new MenuItemData();
		this.menuData.ParseDOM(domUL);
		
		this.bg = new BackgroundControl();
		this.bg.Init();
		
		this.GenerateMenu();
		
		this.BindTrigger();
		
		return this.domMenu;
	};
	
	this.Show = function() {
		var $menu = $(this.domMenu);
		
		this.bg.Show();
		$menu.show();
		
		var pos = uGetCenterPos($menu.width(), $menu.height());
		$menu.offset({left:pos.x , top:pos.y ,});
	};
	
	this.SetOnOK = function(fn) {
		this.fnOnOK = fn;
	};
	
	this.SetTitle = function(title) {
		$(this.domMenu).find(JS_DIALOG_TITLE_TEXT).text(title);
	};
	
	/** private API **/
	this.GenerateMenu = function() {
		var $item = undefined;
		var $column = $(this.domColumn);
		$column.empty();
		
		var valueArray = this.menuData.GetValueArray();
		if(valueArray == undefined) return;
		var len = valueArray.length;
		if(len == 0) return;
		
		for(var i = 0; i < len; i++) {
			if(i == this.activeIndex) {
				$item = $(this.domItemActiveTmp).clone();
			} else {
				$item = $(this.domItemNormalTmp).clone();
			}
			this.BindItem($item[0]);
			$item.attr('id', "");
			$item.find(JS_SM_ITEM_TEXT).text(valueArray[i]);
			$column.append($item[0]);
		}
	};
	
	this.UpdateMenu = function() {
		var context = this;
		var $column = $(this.domColumn);

		$column.children().each(function(i) {
			var state = CLASS_SM_ITEM_NORMAL;
			if(context.activeIndex == i) {
				state = CLASS_SM_ITEM_ACTIVE;
			}
			context.SetItemState(this, state);
		});
	};
	
	this.SetItemState = function(domItem, state) {
		var $item = $(domItem);
		
		if($item.hasClass(state)) {
			return;
		}
		else {
			var text = $item.find(JS_SM_ITEM_TEXT).text();
			var $tmp = undefined;
			if(state == CLASS_SM_ITEM_ACTIVE) {
				$tmp = $(this.domItemActiveTmp).clone();
			} else {
				$tmp = $(this.domItemNormalTmp).clone();
			}
			this.BindItem($tmp[0]);
			$tmp.attr('id', "");
			$tmp.find(JS_SM_ITEM_TEXT).text(text);
			$item.after($tmp[0]);
			$item.remove();
		}
	};
	
	this.BindItem = function(domItem) {
		var context = this;
		var $column = $(this.domColumn);
		
		$(domItem).click(function() {
			context.activeIndex = $column.children().index(this);
			context.UpdateMenu();
		});
	};
	
	this.BindTrigger = function() {
		var context = this;
		var $menu = $(this.domMenu);
		
		$menu.find(JS_BUTTON_TRIGGER).click(function() {
			context.bg.Hide();
			$menu.hide();
			
			if($(this).attr('id') == ID_BUTTON_OK) {
				if($.isFunction(context.fnOnOK)) {
					var keyArray = context.menuData.GetKeyArray();
					var key = undefined;
					if(context.activeIndex >= 0) {
						key = keyArray[context.activeIndex];
					}
					context.fnOnOK(key);
				}
			}
		});
	};
}