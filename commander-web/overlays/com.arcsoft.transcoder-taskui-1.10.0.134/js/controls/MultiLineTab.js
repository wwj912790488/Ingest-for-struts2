var MLT_MODE_NORMAL		="normal";
var MLT_MODE_FIXED		="fixed";

/**
 * MultiLineTab icon.
 */
var MLT_ICON_DEFAULT		="MLT_ICON_MMS_SINGLE";
var MLT_ICON_HLS			="MLT_ICON_HLS";
var MLT_ICON_FLV			="MLT_ICON_FLV";
var MLT_ICON_MP4			="MLT_ICON_MP4";
var MLT_ICON_TS				="MLT_ICON_TS";
var MLT_ICON_RTMP_SINGLE	="MLT_ICON_RTMP_SINGLE";
var MLT_ICON_RTMP_MULTI		="MLT_ICON_RTMP_MULTI";
var MLT_ICON_MMS_SINGLE		="MLT_ICON_MMS_SINGLE";

function MultiLineTab() {
	var MLT_ANIMATION_TIME = 150;
	
	var CLASS_STATE_NORMAL	="TabStateNormal";
	var CLASS_STATE_ACTIVE	="TabStateActive";
	var CLASS_STATE_HIDE	="TabStateHide";
	var CLASS_ITEM			="MLT_Item";
	var CLASS_ICON_DELETE	="MLT_IconDelete";
	var CLASS_ITEM_ICON		="MLT_ItemIcon";
	
	var JS_TAB_ITEM			="."+CLASS_ITEM;
	var JS_ITEM_ICON		="."+CLASS_ITEM_ICON;
	var JS_TAB_PREV			=".MLT_Prev";
	var JS_TAB_NEXT			=".MLT_Next";
	var JS_TAB_CONTAINER	=".MLT_Container";
	var JS_TAB_LINE			=".MLT_Line";
	var JS_TAB_REMOVE		=".MLT_Remove";

	var JS_TAB_TEMPLATE			= "#MultiLineTabTemplate";
	var JS_TAB_LINE_TEMPLATE	= "#MLT_LineTemplate";
	var JS_TAB_NORMAL_TEMPLATE	= "#MLT_ItemNormalTemplate";
	var JS_TAB_ACTIVE_TEMPLATE	= "#MLT_ItemActiveTemplate";
	
	this.domTabTmp = null;
	this.domTabLineTmp = null;
	this.domNormalTmp = null;
	this.domActiveTmp = null;
	
	this.domTab = null;
	this.domActive = null;
	this.domPrev = null;
	this.domNext = null;
	
	this.activeIndex = 0;
	this.count = 0;
	this.column = 0;
	this.line = 0;
	this.lineIndex = 0;
	this.maxCount = 999;
	this.bAnimating = false;
	this.mode = MLT_MODE_NORMAL;
	this.iconArr = [];
	
	this.userData = null;
	this.fnOnChange = null;
	this.fnOnAdd = null;
	this.fnOnRemove = null;
	
	/** public API **/
	this.Init = function(count, mode) {
		if(count == null) count = 0;
		if(mode == null) mode = MLT_MODE_NORMAL;
		
		this.domTabTmp = $(JS_TAB_TEMPLATE)[0];
		if(this.domTabTmp == null) return;
		this.domTabLineTmp = $(JS_TAB_LINE_TEMPLATE)[0];
		this.domNormalTmp = $(JS_TAB_NORMAL_TEMPLATE)[0];
		this.domActiveTmp = $(JS_TAB_ACTIVE_TEMPLATE)[0];
		
		var $tab = $(this.domTabTmp).clone();
		$tab.attr('id', "");
		this.domTab = $tab[0];
		this.domPrev = $tab.find(JS_TAB_PREV).get(0);
		this.domNext = $tab.find(JS_TAB_NEXT).get(0);
		
		this.column = $(this.domTabLineTmp).find(JS_TAB_ITEM).length;
		if(this.column == 0) this.column = 8;
		this.count = count;
		this.mode = mode;
		
		var i = 0;
		do {
			this.AddLine();
			i += this.column;
		} while(i < count);
		
		this.BindControl();
		this.lineIndex = 0;
		this.activeIndex = 0;
		this.Render();
		
		return this.domTab;
	};
	
	this.GetDOM = function() {
		return this.domTab;
	};
	
	this.AddItem = function() {
		if(this.count >= this.maxCount) return;
		if(this.count >= this.line * this.column) {
			this.AddLine();
		}
		this.count++;
		this.activeIndex = this.count-1;
		this.lineIndex = this.line-1;
		this.Render();
		if($.isFunction(this.fnOnAdd)) {
			this.fnOnAdd(this.userData);
		}
		if($.isFunction(this.fnOnChange)) {
			this.fnOnChange(this.userData, this.activeIndex);
		}
	};
	
	this.RemoveActiveItem = function() {
		if(this.count == 0) return;
		var oldIndex = this.GetActiveIndex();
		
		if(this.line > 1 && this.count == (this.line-1)*this.column+1) {
			this.RemoveLine();
		}
		
		this.count--;
		if(this.activeIndex == this.count) {
			this.activeIndex = this.count-1;
		}
		this.lineIndex = Math.floor(this.activeIndex/this.column);
		this.Render();
		
		if($.isFunction(this.fnOnRemove)) {
			this.fnOnRemove(this.userData, oldIndex);
		}
		if($.isFunction(this.fnOnChange)) {
			this.fnOnChange(this.userData, this.activeIndex);
		}
	};
	
	/**
	 * @param index: index of item
	 * @param icon: MultiLineTab icon defined in this file such as MLT_ICON_DEFAULT.
	 */
	this.SetIconByIndex = function(index, icon) {
		this.iconArr[index] = icon;
		this.UpdateIcon();
	};
	
	/**
	 * @param iconArr: MultiLineTab icon defined in this file such as MLT_ICON_DEFAULT.
	 */
	this.SetIconByArray = function(iconArr) {
		this.iconArr = iconArr;
		this.UpdateIcon();
	};
	
	this.UpdateIcon = function() {
		var context = this;
		
		$(this.domTab).find(JS_ITEM_ICON).each(function(i) {
			var icon = context.iconArr[i];
			if(icon != null) {
				var $object = $(this);
				if(!$object.hasClass(icon)) {
					$object.removeClass().addClass(CLASS_ITEM_ICON+" "+icon);
				}
			}
		});
	};
	
	this.GetCount = function() {
		return this.count;
	};
	
	this.SetMaxCount = function(count) {
		this.maxCount = count;
	};
	
	this.GetActiveIndex = function() {
		return this.activeIndex;
	};
	
	this.SetActiveIndex = function(index) {
		this.activeIndex = index;
		this.Render();
		var context = this;
		if($.isFunction(this.fnOnChange)) {
			context.fnOnChange(context.userData, context.activeIndex);
		}
	};
	
	this.SetUserData = function(userData) {
		this.userData = userData;
	};
	
	/**
	 * @param onChange(userData, index)
	 */
	this.SetOnChange = function(onChange) {
		this.fnOnChange = onChange;
	};
	
	/**
	 * @param onAdd(userData)
	 */
	this.SetOnAdd = function(onAdd) {
		this.fnOnAdd = onAdd;
	};
	
	/**
	 * @param onRemove(userData)
	 */
	this.SetOnRemove = function(onRemove) {
		this.fnOnRemove = onRemove;
	};
	
	/** private API **/
	this.AddLine = function() {
		var context = this;
		var $tab = $(this.domTab);
		var $tmp = $(this.domTabLineTmp).clone();
		
		$tab.find(JS_TAB_CONTAINER).append($tmp[0]);
		$tmp.find(JS_TAB_ITEM).each(function() {
			context.BindOneItem(this);
		});
		
		this.line++;
	};
	
	this.RemoveLine = function() {
		var $tab = $(this.domTab);
		var $lineArr = $tab.find(JS_TAB_LINE);
		$lineArr.last().remove();
		this.line--;
	};
	
	this.Render = function() {
		var $tab = $(this.domTab);
		var context = this;
		
		if(this.count == 0) {
			$tab.hide();
		}
		else {
			$tab.show();
		}
		
		$tab.find(JS_TAB_ITEM).each(function(i) {
			if(i >= context.count) {
				context.SetState(this, CLASS_STATE_HIDE);
			}
			else {
				if(context.activeIndex == i) {
					context.SetState(this, CLASS_STATE_ACTIVE);
				}
				else {
					context.SetState(this, CLASS_STATE_NORMAL);
				}
			}
		});
		
		$tab.find(JS_TAB_LINE).each(function(i) {
			if(i == context.lineIndex) {
				$(this).show();
			}
			else {
				$(this).hide();
			}
		});
		
		if(this.line == 1) {
			$(this.domPrev).hide();
			$(this.domNext).hide();
		}
		else {
			$(this.domPrev).show();
			$(this.domNext).show();
		}
		
		$tab.find('.MLT_ItemText').each(function(i) {
			$(this).text(i+1);
		});
		
		this.UpdateIcon();
	};
	
	this.ClearState = function(dom) {
		var $object = $(dom);
		$object.removeClass();
		$object.addClass(CLASS_ITEM);
	};
	
	this.SetState = function(dom, state) {
		var $dom = $(dom);
		var context = this;
		
		if($dom.hasClass(state)) return;
		this.ClearState(dom);
		$dom.addClass(state);
		if(state == CLASS_STATE_NORMAL) {
			$dom.empty();
			$dom.append($(this.domNormalTmp).clone().get(0));
		}
		else if(state == CLASS_STATE_ACTIVE) {
			$dom.empty();
			$dom.append($(this.domActiveTmp).clone().get(0));
			if(this.mode == MLT_MODE_FIXED) {
				$dom.find(JS_TAB_REMOVE).removeClass(CLASS_ICON_DELETE);
			}
		}
		
		$dom.find(JS_TAB_REMOVE).click(function() {
			if(context.mode == MLT_MODE_NORMAL && context.GetDOMIndex($dom[0]) == context.GetActiveIndex()) {
				context.RemoveActiveItem();
				//event.stopPropagation();
			return false;
			}
		});
	};
	
	this.GetDOMIndex = function(domItem) {
		var $tab = $(this.domTab);
		var index = $tab.find(JS_TAB_ITEM).index(domItem);
		return index;
	};
	
	this.BindOneItem = function(domItem) {
		var context = this;
		$(domItem).click(function() {
			var myIndex = context.GetDOMIndex(this);
			if(myIndex == context.GetActiveIndex()) {
			}
			else {
				context.activeIndex = myIndex;
				context.Render();
				if($.isFunction(context.fnOnChange)) {
					context.fnOnChange(context.userData, context.activeIndex);
				}
			}
		});
	};
	
	this.BindControl = function() {
		var context = this;
		var $tab = $(this.domTab);
		
		$(this.domNext).click(function() {
			if(context.lineIndex >= context.line) return;
			if(context.bAnimating) return;
			
			var $lineArr = $tab.find(JS_TAB_LINE);
			var $line = $lineArr.eq(context.lineIndex);
			var $next = $lineArr.eq(context.lineIndex+1);
			if($next.length == 0) return;
			
			var onFadeInEnd = function() {
				context.bAnimating = false;
				
				//YingMing: Change active index with turning page.
				/*context.Render();
				if($.isFunction(context.fnOnChange)) {
					context.fnOnChange();
				}*/
			};
			
			var onFadeOutEnd = function() {
				$next.hide();
				$next.fadeIn(MLT_ANIMATION_TIME, onFadeInEnd);
			};
			
			context.bAnimating = true;
			$line.fadeOut(MLT_ANIMATION_TIME, onFadeOutEnd);
			
			context.lineIndex++;
			
			//YingMing: Change active index with turning page.
			//context.activeIndex = context.lineIndex*context.column;
		});
		
		$(this.domPrev).click(function() {
			if(context.lineIndex <= 0) return;
			if(context.bAnimating) return;
			
			var $lineArr = $tab.find(JS_TAB_LINE);
			var $line = $lineArr.eq(context.lineIndex);
			var $prev = $lineArr.eq(context.lineIndex-1);
			if($prev.length == 0) return;
			
			var onFadeInEnd = function() {
				context.bAnimating = false;
				
				//YingMing: Change active index with turning page.
				/*context.Render();
				if($.isFunction(context.fnOnChange)) {
					context.fnOnChange();
				}*/
			};
			
			var onFadeOutEnd = function() {
				$prev.hide();
				$prev.fadeIn(MLT_ANIMATION_TIME, onFadeInEnd);
			};
			
			context.bAnimating = true;
			$line.fadeOut(MLT_ANIMATION_TIME, onFadeOutEnd);
			
			context.lineIndex--;
			
			//YingMing: Change active index with turning page.
			//context.activeIndex = context.lineIndex*context.column;
		});
	};
}