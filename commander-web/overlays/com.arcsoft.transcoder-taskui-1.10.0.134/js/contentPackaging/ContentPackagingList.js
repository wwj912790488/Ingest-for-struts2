var processorTypeLabels = [
	{key : tag.motionicon, value: str_motion_icon.title},
	{key : tag.dynamictext, value: str_dynamic_text.title}
	];

function getProcessorTypeLabel(key) {
	return uGetMapValue(processorTypeLabels, key);
}

function ContentPackagingList() {
	this.dom = null;
	this.items = [];
	this.parent = null;
}

ContentPackagingList.prototype = {
	init : function(dom) {
		this.dom = dom;
		
		this.bind();
	},
	
	bind : function() {
		var context = this;
		$(cpjs.cplHeadCheckBox, this.dom).change(function() {
			context.onChecked();
		});
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

	setInfoList : function(list) {
		this.clear();
		
		for(var i = 0; i < list.length; i++) {
			var tabInfo = list[i];
			this.createItem(tabInfo);
		}
		
		this.sortItem();
	},
	
	onChecked : function() {
		var checkDom = $(cpjs.cplHeadCheckBox, this.dom).get(0);
		for(var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			item.setCheck(checkDom.checked)
		}
	},
	
	getInfoList : function() {
		var list = [];
		for(var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			var info = item.getInfo();
			list.push(info);
		}
		
		return list;
	},
	
	getInfo : function(index) {
		if(this.items.length <= index) return null;
		var item = this.items[index];
		var info = item.getInfo();
		return info;
	},
	
	getSize : function() {
		return this.items.length;
	},
	
	createItem : function(info) {
		var item = new ContentPackagingListItem();
		item.create(this);
		item.setInfo(info);
		$(this.dom).append(item.dom);
		
		this.items.push(item);
	},
	
	addItem : function(info) {
		this.createItem(info);
		
		this.sortItem();
	},
	
	insertItem : function(info, index) {
		if(index >= this.items.length) {
			this.addItem(info);
			return;
		}
		
		var item = new ContentPackagingListItem();
		item.create(this);
		item.setInfo(info);
		
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
		var items = this.items;
		for(var i = 0; i < items.length - 1; i++) {
			for(var j = i; j < items.length - 1; j++) {
				var item = items[j];
				var itemNext = items[j+1];
				var info = item.getInfo();
				var infoNext = itemNext.getInfo();
				if(info.posIndex > infoNext.posIndex) {
					items[j] = itemNext;
					items[j+1] = item;
				}
			}
		}
		
		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			$(this.dom).append(item.dom);
			if(i == 0) {
				$("#MoveUpTrigger", item.dom).hide();
				$("#MoveDownTrigger", item.dom).show();
			}
			else if(i == items.length-1) {
				$("#MoveUpTrigger", item.dom).show();
				$("#MoveDownTrigger", item.dom).hide();
			}
			else {
				$("#MoveUpTrigger", item.dom).show();
				$("#MoveDownTrigger", item.dom).show();
			}
		}
	},
	
	getItemIndex: function(item) {
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i] == item) {
				return i;
			}
		}
		return null;
	},
	
	onItemMoveUp: function(item) {
		if(this.items.length <= 1) return;
		if(this.items[0] == item) return;
		
		var index = this.getItemIndex(item);
		var itemPre = this.items[index-1];
		var info = item.getInfo();
		var infoPre = itemPre.getInfo();
		
		var tmp = info.posIndex;
		info.posIndex = infoPre.posIndex;
		infoPre.posIndex = tmp;
		
		this.sortItem();
	},
	
	onItemMoveDown: function(item) {
		if(this.items.length <= 1) return;
		if(this.items[this.items.length-1] == item) return;
		
		var index = this.getItemIndex(item);
		var itemNext = this.items[index+1];
		var info = item.getInfo();
		var infoNext = itemNext.getInfo();
		
		var tmp = info.posIndex;
		info.posIndex = infoNext.posIndex;
		infoNext.posIndex = tmp;
		
		this.sortItem();
	},
};

function ContentPackagingListItem() {
	this.dom = null;
	this.parent = null;
	this.info = null;
};

ContentPackagingListItem.prototype = {
	create : function(parent) {
		this.parent = parent;
		var $tmpl = $(cptmpl.ContentPackagingListItem);
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
		
		$(JS_DYNAMIC_TEXT_MACRO_TRIGGER, this.dom).click(function() {
			context.showLineDialog(str_common.macro, dynamicTextMacroMap);
		});
		
		$(JS_DYNAMIC_TEXT_MATERIAL_TRIGGER, this.dom).click(function() {
			context.requestMaterial();
		});
		
		
		$(".DynamicTextEditorTrigger", this.dom).click(function() {
			context.onDynamicTextLabelClick();
		});
		
		$("#MoveUpTrigger", this.dom).click(function() {
			context.onMoveUp();
		});
		
		$("#MoveDownTrigger", this.dom).click(function() {
			context.onMoveDown();
		});
	},
	
	remove : function() {
		$(this.dom).remove();
		this.dom = null;
	},
	
	setCheck : function(bCheck) {
		var checkDom = $(cpjs.cplItemCheckBox, this.dom).get(0);
		if(checkDom != null) {
			if(!checkDom.disabled) {
				checkDom.checked = bCheck;
			}
		}
	},
	
	/**
	 * 
	 * @param info {processorType: 1, name: xxx, label: xxx, posIndex: 1, checkbox_checked: 1, checkbox_disabled: 1}
	 */
	setInfo : function(info) {
		this.info = info;

		var checkDom = $(cpjs.cplItemCheckBox, this.dom).get(0);
		if(checkDom != null) {
			checkDom.checked = info.checkbox_checked;
			checkDom.disabled = info.checkbox_disabled;
		}
		
		var typeLabel = getProcessorTypeLabel(info.processorType);
		$(cpjs.cplItemType, this.dom).text(typeLabel);
		
		$(cpjs.cplItemName, this.dom).text(info.name);
		
		if(info.processorType == tag.dynamictext) {
			$(".DynamicTextLabelDisp", this.dom).text(info.label).show();
			$(".DynamicTextLabel", this.dom).val(info.label);
		}
		else {
			$(".DynamicTextLabelDisp", this.dom).hide();
			$(".DynamicTextEditorTrigger", this.dom).removeClass("MouseHover").unbind("click");
		}
	},
	
	getInfo : function() {
		var info = this.info;
		
		var checkDom = $(cpjs.cplItemCheckBox, this.dom).get(0);
		if(checkDom != null) {
			info.checkbox_checked = checkDom.checked;
			info.checkbox_disabled = checkDom.disabled;
		}

		return info;
	},
	
	showLineDialog : function(title, map) {
		var context = this;
		g_LineSelector.setContent(map);
		g_LineSelector.setTitle(title);
		g_LineSelector.setOnSelected(function(key) {
			var text = g_dynamicTextEditor.getLabel();
			g_dynamicTextEditor.setLabel(text + key);
		});
		
		var rect = g_LineSelector.getRect();
		var pos = uGetCenterPos(rect.width, rect.height);
		var panelPos = $(cpjs.ContentPackaging).offset();
		g_LineSelector.show(panelPos.left + DIALOG_OFFET, pos.y);
	},
	
	listMaterial : function(arr) {
		var context = this;
		var maps = [];
		
		for(var i = 0; i < arr.length; i++) {
			var o = {};
			o.key = arr[i].content;
			o.value = arr[i].name + " - " + arr[i].content;
			maps.push(o);
		};

		this.showLineDialog(str_common.material, maps)
	},
	
	requestMaterial : function() {
		var context = this;
		var url = "listMaterialBrief";
		var param = {materialType: MATERIAL_TYPE_DYNAMICTEXT, rand: Math.random()};
		$.post(url, param, function(data) {
			var arr = ParseMaterial(data);
			context.listMaterial(arr);
		});
	},
	
	onMoveUp: function() {
		this.parent.onItemMoveUp(this);
	},
	
	onMoveDown: function() {
		this.parent.onItemMoveDown(this);
	},
	
	onDynamicTextLabelClick: function() {
		var context = this;
		
		g_dynamicTextEditor.setLabel($(".DynamicTextLabel", this.dom).val());
		g_dynamicTextEditor.setOnButtonClick(function(buttonId) {
			context.onDynamicTextEditorClick(buttonId);
		});
		
		var rect = g_dynamicTextEditor.getRect();
		var pos = uGetCenterPos(rect.width, rect.height);
		var panelPos = $(cpjs.ContentPackaging).offset();
		g_dynamicTextEditor.show(panelPos.left + DIALOG_OFFET, pos.y);
	},
	
	onDynamicTextEditorClick : function(buttonId) {
		if(buttonId == "OKTrigger") {
			var label = g_dynamicTextEditor.getLabel();
			$(".DynamicTextLabel", this.dom).val(label);
			$(".DynamicTextLabelDisp", this.dom).text(label);
			this.info.label = label;
		}
		else if(buttonId == "DynamicTextMacroTrigger") {
			this.showLineDialog(str_common.macro, dynamicTextMacroMap);
		}
		else if(buttonId == "DynamicTextMaterialTrigger") {
			this.requestMaterial();
		}
	},
};
