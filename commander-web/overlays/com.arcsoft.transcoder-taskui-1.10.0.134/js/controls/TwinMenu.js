function TwinMenu() {
	var CLASS_TM_ITEM_ACTIVE ="TM_ItemActive";
	var CLASS_TM_ITEM_NORMAL ="TM_ItemNormal";

	var JS_TWINMENU_COLUMN =".TM_Column";
	var JS_TM_ITEM_TEXT =".TM_ItemText";
	
	var JS_TWINMENU_TEMPLATE ="#TwinMenuTemplate";
	var JS_TM_ITEM_ACTIVE_TEMPLATE ="#TM_ItemActiveTemplate";
	var JS_TM_ITEM_NORMAL_TEMPLATE ="#TM_ItemNormalTemplate";
	
	var Z_INDEX = 10001;
	
	this.domMenu = undefined;
	this.bg = undefined;
	this.domItemActiveTmp = undefined;
	this.domItemNormalTmp = undefined;
	
	this.tmData = undefined;
	this.activeArray = undefined;
	this.fnOnOK = undefined;
	
	/** public API **/
	this.Init = function(domUL, id) {
		if(id == undefined) id="";
		
		this.domItemActiveTmp = $(JS_TM_ITEM_ACTIVE_TEMPLATE)[0];
		this.domItemNormalTmp = $(JS_TM_ITEM_NORMAL_TEMPLATE)[0];
		
		var $menu = $(JS_DIALOG_FRAME_TEMPLATE).clone();
		$menu.attr('id', id);
		this.domMenu = $menu[0];
		
		var $tMenu = $(JS_TWINMENU_TEMPLATE).clone();
		$tMenu.attr('id', id);
		
		$menu.find(JS_DIALOG_CONTAINER).append($tMenu[0]);
		var style = {
			'position':'fixed', 
			'z-index': Z_INDEX,
			'left':'0px',
			'top':'0px'
		};
		$menu.css(style);
		$menu.hide();
		
		this.tmData = new TwinMenuData();
		this.tmData.Init(domUL);
		
		this.activeArray = [];
		this.activeArray[0] = 0;
		this.activeArray[1] = 0;
		
		this.GenerateMenu(0);
		this.GenerateMenu(1);
		this.BindC0Menu();
		this.BindC1Menu();
		this.BindTrigger();
		
		this.bg = new BackgroundControl();
		this.bg.Init();
		
		return this.domMenu;
	};
	
	this.Show = function() {
		var $menu = $(this.domMenu);
		
		this.bg.Show();
		$menu.show();
		
		var pos = uGetCenterPos($menu.width(), $menu.height());
		$menu.offset({left:pos.x , top:pos.y ,});
	};
	
	this.GetLastActiveKey = function() {
		var node = this.tmData.GetNode(this.activeArray);
		var key = undefined;
		if(node != undefined) {
			key = node.GetKey();
		}
		return key;
	};
	
	/** 
	* @param onOK(value);
	*/
	this.SetOnOK = function(fn) {
		this.fnOnOK = fn;
	};
	
	this.SetTitle = function(title) {
		$(this.domMenu).find(JS_DIALOG_TITLE_TEXT).text(title);
	};
	
	/** private API **/
	this.GenerateMenu = function(columnIndex) {
		if(columnIndex == undefined) columnIndex = 0;
		
		var $item = undefined;
		var $column = $(this.domMenu).find(JS_TWINMENU_COLUMN).eq(columnIndex);
		$column.empty();
		
		var valueArray = this.GetValueArray(columnIndex);
		if(valueArray == undefined) return;
		var len = valueArray.length;
		if(len == 0) return;
		
		for(var i = 0; i < len; i++) {
			if(i == this.activeArray[columnIndex]) {
				$item = $(this.domItemActiveTmp).clone();
			}
			else {
				$item = $(this.domItemNormalTmp).clone();
			}
			$item.attr('id', "");
			$item.find(JS_TM_ITEM_TEXT).text(valueArray[i]);
			$column.append($item[0]);
		}
	};
	
	this.UpdateMenu = function(columnIndex) {
		if(columnIndex == undefined) columnIndex = 0;
		var context = this;
		var $column = $(this.domMenu).find(JS_TWINMENU_COLUMN).eq(columnIndex);

		$column.children().each(function(i) {
			var state = CLASS_TM_ITEM_NORMAL;
			if(context.activeArray[columnIndex] == i) {
				state = CLASS_TM_ITEM_ACTIVE;
			}
			context.SetItemState(this, state);
		});
	};
	
	this.GetValueArray = function(columnIndex) {
		var valueArray = undefined;
		
		if(columnIndex == 0) {
			var topNode = this.tmData.GetTopNode();
			valueArray = topNode.GetSubValueArray();
		} else {
			var indexArr = [];
			for(var i = 0; i < columnIndex; i++) {
				indexArr[i] = this.activeArray[i];
			}
			var c0node = this.tmData.GetNode(indexArr);
			if(c0node != undefined) {
				valueArray = c0node.GetSubValueArray();
			}
		}
		
		return valueArray;
	};

	this.SetItemState = function(domItem, state) {
		var $item = $(domItem);
		
		if($item.hasClass(state)) {
			return;
		}
		else {
			var text = $item.find(JS_TM_ITEM_TEXT).text();
			var $tmp = undefined;
			if(state == CLASS_TM_ITEM_ACTIVE) {
				$tmp = $(this.domItemActiveTmp).clone();
			} else {
				$tmp = $(this.domItemNormalTmp).clone();
			}
			$tmp.attr('id', "");
			$tmp.find(JS_TM_ITEM_TEXT).text(text);
			$item.after($tmp[0]);
			$item.remove();
		}
	};
	
	this.BindC0Menu = function() {
		var context = this;
		var $menu = $(this.domMenu);
		var $itemArr = $menu.find(JS_TWINMENU_COLUMN).eq(0).children();
		
		$itemArr.unbind('click').click(function() {
			var index = $itemArr.index(this);
			if(context.activeArray[0] == index) return;
			context.activeArray[0] = index;
			context.activeArray[1] = 0;
			context.UpdateMenu(0);
			context.GenerateMenu(1);
			context.BindC0Menu();
			context.BindC1Menu();
		});
	};
	
	this.BindC1Menu = function() {
		var context = this;
		var $menu = $(this.domMenu);
		var $itemArr = $menu.find(JS_TWINMENU_COLUMN).eq(1).children();
		
		$itemArr.unbind('click').click(function() {
			var index = $itemArr.index(this);
			if(context.activeArray[1] == index) return;
			context.activeArray[1] = index;
			context.UpdateMenu(1);
			context.BindC1Menu();
		});
	};
	
	this.BindTrigger = function() {
		var context = this;
		var $menu = $(this.domMenu);
		
		$menu.find(JS_BUTTON_TRIGGER).click(function() {
			var $object = $(this);
			context.bg.Hide();
			$(context.domMenu).hide();
			if($object.attr('id') == ID_BUTTON_OK) {
				if($.isFunction(context.fnOnOK)) {
					var key = context.GetLastActiveKey();
					context.fnOnOK(key);
				}
			}
		});
	};
}

function TwinMenuNode() {
	var TM_INDEX_KEY =1;
	var TM_INDEX_VALUE =0;
	
	this.key = undefined;
	this.value = undefined;
	this.subArr = [];
	
	this.Init = function(domLI) {
		var context = this;
		var $dom = $(domLI);
		var $divArr = $dom.find('div');
		var key = $divArr.eq(TM_INDEX_KEY).text();
		var value = $divArr.eq(TM_INDEX_VALUE).text();
		this.key = key;
		this.value = value;
		
		var $liArr = $dom.children('ul').children('li');
		$liArr.each(function() {
			var subNode = new TwinMenuNode();
			subNode.Init(this);
			context.AddSubNode(subNode);
		});
	};
	
	this.GetKey = function() {
		return this.key;
	};
	
	this.GetValue = function() {
		return this.value;
	};
	
	this.AddSubNode = function(node) {
		this.subArr[this.subArr.length] = node;
	};
	
	this.GetSubNode = function(index) {
		return this.subArr[i];
	};
	
	this.GetSubNodeArray = function() {
		return this.subArr;
	};
	
	this.GetSubValueArray = function() {
		var subArr = this.subArr;
		var len = subArr.length;
		var valueArr = [];
		for(var i = 0; i < len; i++) {
			valueArr[i] = subArr[i].GetValue();
		}
		
		return valueArr;
	};
};

function TwinMenuData() {
	this.topNode = undefined;
	
	this.Init = function(domUL) {
		var context = this;
		var $dom = $(domUL);
		
		this.topNode = new TwinMenuNode();
		$dom.children('li').each(function(i) {
			var node = new TwinMenuNode();
			node.Init(this);
			context.topNode.AddSubNode(node);
		});
	};
	
	this.GetTopNode = function() {
		return this.topNode;
	};
	
	this.GetNode = function(indexArray) {
		var len = indexArray.length;
		var subArr = this.topNode.GetSubNodeArray();
		var subNode = undefined;
		
		for(var i = 0; i < len; i++) {
			subNode = subArr[indexArray[i]];
			if(subNode == undefined) break;
			subArr = subNode.GetSubNodeArray();
			if(subArr == undefined) break; 
			if(subArr.length == 0) break;
		}
		
		return subNode;
	};
};
