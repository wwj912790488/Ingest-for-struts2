
var TL_COLOR_ROW_SELECTED = "#c0d6de";//"#2296AE";
var TABLE_ROW2_BG = "#f4f4f4";//"#ebf5f6";
var TABLE_ROW_BG = "transparent";//"#ebf5f6";

var enableTopAlert = true;

/**
 *  utility API
 */
function GetTextWidth(text, css) {
	$div = $('<div></div>');
	$div.css(css).css({'position':'absolute', 'width':'auto'});
	$div.text(text);
	$div.appendTo('body');
	var width = $div.width();
	$div.remove();
	return width;
}

function IsTextFit(outWidth, text, css, pos) {
	var newText = text.substring(0, pos);
	newText += "...";
	var fit = GetTextWidth(newText, css) > outWidth? 0: 1;
	return fit;
}

function GetTextCss(dom) {
	var propertyArray = new Array(
		'font-family', 
		'font-size',
		'font-style',
		'font-weight',
		'margin'
	);
	var css = new Array();
	for(var i = 0; i < propertyArray.length; i++) {
		css[propertyArray[i]] = $(dom).css(propertyArray[i]);
	}
	
	return css;
};

function GetTruncatedText(outWidth, text, css) {
	var newText;
	var lp = 0;
	var rp = 0;
	var cp = 0;
	
	if(text == undefined) {
		return text;
	}
	
	rp = text.length-1;
	if(rp <= 0) {
		return text;
	} else if(IsTextFit(outWidth, text, css, rp)) {
		return text;
	} else {
		while(lp != rp-1) {
			cp = Math.floor((lp+rp)/2);
			if(IsTextFit(outWidth, text, css, cp) == 0) {
				rp = cp;
			}
			else {
				lp = cp;
			}
		}
		newText = text.substring(0, lp) + '...';
	}

	return newText;
}

function uGetText(dom) {
	var text = $(dom).html();
	var endpos = text.search('<');
	if(endpos >= 0) {
		text = text.substring(0, endpos);
	}
	return text;
}

function uSelectUL(domSel, domUL) {
	var SU_DIV_SELECT_TEXT	=0;
	var SU_DIV_SELECT_VALUE	=1;
	var SU_DIV_SELECTED	=2;
	var SU_STATE_SELECTED ="selected";
	
	var $ul = $(domUL);
	var $sel = $(domSel);
	
	$sel.get(0).options.length=0;
	$ul.children('li').each(function(i) {
		var $divArr = $(this).children('div');
		var text = $divArr.eq(SU_DIV_SELECT_TEXT).text();
		var $option = $("<option></option>");
		$option.text(text);
		var value = $divArr.eq(SU_DIV_SELECT_VALUE).text();
		$option.val(value);
		$sel.append($option.get(0));
		
		if($divArr.eq(SU_DIV_SELECTED).text() == SU_STATE_SELECTED) {
			domSel.selectedIndex = i;
		}
	});
}

function uSelectItem(objSelect, objItemValue) {
	var isExit = false;
    for (var i = 0; i < objSelect.options.length; i++) {
        if (objSelect.options[i].value == objItemValue) {        
        	objSelect.value = objItemValue;
        	isExit = true;
            break;
        }
    }
    if(!isExit) {
    	objSelect.selectedIndex = 0;
    };
    return isExit;
}

function uRelatedSelect(domSel1, domSel2, domUL) {
	var $sel1 = $(domSel1);
	var $sel2 = $(domSel2);
	var oldSel1Value = $sel1.val();
	var oldSel2Value = $sel2.val();
	
	var SelectLevel2 = function(index) {
		var $subul = $(domUL).children('li').eq(index).children('ul');
		uSelectUL(domSel2, $subul.get(0));
		$sel2.change();
	};
	
	uSelectUL(domSel1, domUL);
	$sel1.change(function() {
		var index = $sel1.get(0).selectedIndex;
		SelectLevel2(index);
	});
	$sel1.val(oldSel1Value);
	$sel1.change();
	$sel2.val(oldSel2Value);
}

function uSelectText(domSel, domText1, domText2, domTable) {
	var ST_TD_SELECT_TEXT	=0;
	var ST_TD_SELECT_VALUE	=1;
	var ST_TD_TEXT1			=2;
	var ST_TD_TEXT2			=3;	
	var ST_TD_STATE			=4;
	var ST_VALUE_SOURCE		="source";
	var ST_STATE_SELECTED	="selected";
	
	var $sel = $(domSel);
	var $tab = $(domTable);
	var $text1 = $(domText1);
	var $text2 = $(domText2);
	var text1Arr = [];
	var text2Arr = [];
	var sourceIndex = 0;	//Can be read from html
	var customIndex = 1;	//Can be read from html
	var oldSelValue = $sel.val();
	var oldText1 = $text1.val();
	var oldText2 = $text2.val();
	
	$sel.empty();
	$tab.find('tr').each(function(i) {
		var $tdArr = $(this).children('td');
		var text = $tdArr.eq(ST_TD_SELECT_TEXT).text();
		var value = $tdArr.eq(ST_TD_SELECT_VALUE).text();
		var $option = $("<option></option>");
		$option.text(text);
		$option.attr('value', value);
		$sel.append($option.get(0));
		
		if($tdArr.eq(ST_TD_STATE).text() == ST_STATE_SELECTED) {
			domSel.selectedIndex = i;
		}
		
		text1Arr[i] = $tdArr.eq(ST_TD_TEXT1).text();
		text2Arr[i] = $tdArr.eq(ST_TD_TEXT2).text();
	});
	
	$sel.change(function() {
		var index = domSel.selectedIndex;
		var $tdArr = null;
		var text = null;
		
		if(index == sourceIndex) {
			domText1.value = "";
			domText2.value = "";
			domText1.disabled = true;
			domText2.disabled = true;
		}
		else if(index == customIndex) {
			domText1.disabled = false;
			domText2.disabled = false;
		}
		else {
			domText1.disabled = false;
			domText2.disabled = false;
			$tdArr = $tab.find('tr').eq(index).children('td');
			text = $tdArr.eq(ST_TD_TEXT1).text();
			domText1.value = text;
			text = $tdArr.eq(ST_TD_TEXT2).text();
			domText2.value = text;
		}
	});

	var OnTextChange = function() {
		var text1 = $text1.val();
		var text2 = $text2.val();
		var i = 0;
		var len = text1Arr.length;
		var selected = customIndex;
		for(i = 0; i < len; i++) {
			if(i == sourceIndex || i == customIndex) continue;
			if(text1Arr[i] == text1 && text2Arr[i] == text2){
				selected = i;
				break;
			}
		}
		domSel.selectedIndex = selected;
		$sel.change();
	};
	$text1.change(OnTextChange);
	$text2.change(OnTextChange);
	
	$sel.val(oldSelValue);
	$sel.change();
	if(oldSelValue != ST_VALUE_SOURCE) {
		$text1.val(oldText1);
		$text2.val(oldText2);
	}
}

//array : {key: , value: , text1: , text2: ]}
function uSelectTextText(domSel, domText1, domText2, array) {
	var SPECIAL_ITEM_SOURCE = "source";
	var SPECIAL_ITEM_CUSTOM = "custom";
	
	var $sel = $(domSel);
	var $text1 = $(domText1);
	var $text2 = $(domText2);
	
	var GetSelectedIndexByText = function() {
		var text1 = $text1.val();
		var text2 = $text2.val();
		var i = 0;
		var len = array.length;
		
		var selected = 0;
		for(i = 0; i < len; i++) {
			if(array[i].key == SPECIAL_ITEM_SOURCE) {
				selected = i;
				continue;
			} else if(array[i].key == SPECIAL_ITEM_CUSTOM) {
				selected = i;
				continue;
			}
			if(array[i].text1 == text1 && array[i].text2 == text2){
				selected = i;
			}
		}
		return selected;
	};
	
	
	//Init select
	var oldSelected = $sel.val();
	domSel.length = 0;
	var len = array.length;
	for(var i = 0; i < len; i++) {
		var varItem = new Option(array[i].value, array[i].key);      
		domSel.options.add(varItem);
	}
	if(oldSelected == SPECIAL_ITEM_SOURCE) {
		domText1.value = "";
		domText2.value = "";
		domText1.disabled = true;
		domText2.disabled = true;
		$sel.val(oldSelected);
	} else {
		var selected = GetSelectedIndexByText();
		domSel.selectedIndex = selected;
	}
	
	//bind select
	$sel.change(function() {
		var selKey = $sel.val();
		if(selKey == SPECIAL_ITEM_SOURCE) {
			domText1.value = "";
			domText2.value = "";
			domText1.disabled = true;
			domText2.disabled = true;
		} else if(selKey == SPECIAL_ITEM_CUSTOM) {
			domText1.disabled = false;
			domText2.disabled = false;
			if(domText1.value.length == 0) {
				$text1.val(array[domSel.selectedIndex].text1);
			}
			if(domText2.value.length == 0) {
				$text2.val(array[domSel.selectedIndex].text2);
			}
		} else {
			domText1.disabled = false;
			domText2.disabled = false;
			$text1.val(array[domSel.selectedIndex].text1);
			$text2.val(array[domSel.selectedIndex].text2);
		}
	});
	
	//bind text
	var OnTextChange = function() {
		var oldIndex = domSel.selectedIndex;
		var selected = GetSelectedIndexByText();
		domSel.selectedIndex = selected;
		if(oldIndex != selected) {
			$sel.change();
		}
	};
	$text1.change(OnTextChange);
	$text2.change(OnTextChange);
}

/**
 * it will call: uicBtn_SetState(domBtn, clz+"L", clz, clz+"R");
 * @param {Element}domBtn	container of the button's three parts.
 * @param {String}clz		eg, clz=xxx, then, call uicBtn_SetState use "xxxL,xxx,xxxR"
 */
function uicBtn_SetStateLR(domBtn, clz){
	uicBtn_SetState(domBtn, clz+"L", clz, clz+"R");
}

/**
 * 
 * @param {Element}domBtn	container of the button's three parts.
 * @param {String}clzL		left
 * @param {String}clzM
 * @param {String}clzR
 */
function uicBtn_SetState(domBtn, clzL,clzM,clzR){
	var div;
	if(domBtn==null)
		return;	
	
	div = domBtn.getAttribute("id")=="m" ? domBtn : uFindFirstNodeById(domBtn,"m");
	div.setAttribute("class", clzM);
	
	div = uFindFirstNodeById(domBtn,"l");
	div.setAttribute("class", clzL);
		
	div = uFindFirstNodeById(domBtn,"r");	
	div.setAttribute("class", clzR);
}

/**
 * Bind button state.
 * @param dom		Button DOM.
 * @param classNormal	class array of normal state: {"left", "middle", "right"}
 * @param classActive	class array of normal state: {"left", "middle", "right"}
 */
function uBindButtonState(dom, classNormal, classActive) {
	var $dom = $(dom);	
	$dom.mousedown(function() {
		var i = 0;
		var len = classNormal.length;
		for(i = 0; i < len; i++) {
			$dom.find('.'+classNormal[i]).removeClass(classNormal[i]).addClass(classActive[i]);
		}
	});
	
	$dom.mouseup(function() {
		var i = 0;
		var len = classNormal.length;
		for(i = 0; i < len; i++) {
			$dom.find('.'+classActive[i]).removeClass(classActive[i]).addClass(classNormal[i]);
		}
	});
}

/**
 * 
 * @param {Element}tableDIV
 * @param {Integer}index	row index
 * @param {String}rowID		[option]
 */
function uPaintTableRowBg(tableDIV, index, rowID){
	var bgE;
	bgE = rowID==null||rowID==undefined ? tableDIV :uFindFirstNodeById(tableDIV, rowID);
	var oldBg = bgE.style.backgroundColor;
	var oldBL = bgE.style.borderBottomColor;
	
	var newBg;
	var newBL;
	if(index%2 == 0){
		newBg = TABLE_ROW2_BG;
		newBL = "#cdcdcd";//"#b0e0e6";
	}else{
		newBg = TABLE_ROW_BG;
		newBL = "#d7d7d7";//"#c3ebea";
	}
	
	if(oldBg != newBg)
		bgE.style.backgroundColor = newBg;	
	if(oldBL != newBL)
		bgE.style.borderBottomColor = newBL;
}

/**
 * @param {Array}rows
 * @param {Integer}index
 * @param {Boolean}isSelected
 * @param {Element}rowDiv		rowDIV
 * @param {Element}rowBgDivId	[optional] bg Element used to draw background on it, if null, then use row
 * @param bgColor				[optional] row bgcolor, if not defined, use default in uPaintTableRowBg
 * @version 2.0
 */
function uPaintTableRow(rows, index, isSelected, rowBgDivId, bgColor){
	var rowDiv = rows[index];
	var rowBgDiv;
	if(rowBgDivId==null||rowBgDivId==undefined){
		rowBgDiv = rowDiv;
	}else{
		rowBgDiv = uFindFirstNodeById(rows[index], rowBgDivId);
	}
	
	if(isSelected){
		if(bgColor==null||bgColor==undefined){
			bgColor = TL_COLOR_ROW_SELECTED;
		}
		if(bgColor != rowBgDiv.style.backgroundColor){
			rowBgDiv.style.backgroundColor = bgColor;
		}				
		//invert text color
		if(!uIsContainCssClass(rowDiv, "TableItemTextSelected"))
			uReplaceStyle(rowDiv, 'TableItemText',"TableItemTextSelected");
	}else{
		if(bgColor==undefined || bgColor==null){			
			bgColor = index%2 == 0 ? TABLE_ROW2_BG : TABLE_ROW_BG;
		}
		if(bgColor != rowBgDiv.style.backgroundColor){
			rowBgDiv.style.backgroundColor = bgColor;
		}
		//invert text color
		uReplaceStyle(rowDiv, 'TableItemTextSelected',"TableItemText");
	}
	
	var bl = index%2 == 0 ? "#cdcdcd" : "#d7d7d7";
	if(rowBgDiv.style.borderBottomColor != bl)
		rowBgDiv.style.borderBottomColor = bl;
	
}

/**
 * 
 * @param {Array}rows	all div rows 	
 * @param {Element}row	selected			
 * @param rowID			rowID used to draw background on it, if null, then use row
 * @param bgColor		row bgcolor, if not defined, use default in uPaintTableRowBg
 * @version 1.0
 */
function uPaintTableRowSelected(rows, row, rowID, bgColor){
	for(var i=0;i<rows.length;i++){	
		var isSelected = (rows[i]==row);
		if(isSelected){
			//bg
			var bgE = rowID==null||rowID==undefined ? rows[i] :uFindFirstNodeById(rows[i], rowID);
			var bg = TL_COLOR_ROW_SELECTED ;
			if(bg != bgE.style.backgroundColor)
				bgE.style.backgroundColor = bg;
			//invert color
			if(!uIsContainCssClass(rows[i], "TableItemTextSelected"))
				uReplaceStyle(rows[i], 'TableItemText',"TableItemTextSelected");
		}else{
			//bg
			if(bgColor!=undefined && bgColor!=null){
				var bgE = rowID==null||rowID==undefined ? rows[i] :uFindFirstNodeById(rows[i], rowID);
				if(bgColor != bgE.style.backgroundColor)
					bgE.style.backgroundColor = bgColor;
			}else{
				uPaintTableRowBg(rows[i],i,rowID);
			}
			//invert color
			uReplaceStyle(rows[i], 'TableItemTextSelected',"TableItemText");
		}
	}
}

function uGetCenterPos(width, height) {
	var posArray = new Array();
	var x = ($(window).width() - width) / 2;
	var y = ($(window).height() - height) / 2;

	if(x < 0) {x = 0;}
	if(y < 0) {y = 0;}
	x += $(document).scrollLeft();
	y += $(document).scrollTop();
	
	posArray['x'] = x;
	posArray['y'] = y;
	
	return posArray;
}

function uMoveIntoScreen(dom, x, y) {
	var pos = {
		x:x,
		y:y
	};
	
	var height = $(dom).height();
	var w_height = $(window).height();
	var d_scroll = $(document).scrollTop();
	if(height > w_height) {
		pos.y = d_scroll;
	}
	else if(y < d_scroll) {
		pos.y = d_scroll;
	}
	else if(y+height > d_scroll+w_height) {
		pos.y = d_scroll + w_height - height;
	}

	return pos;
}

/*Waiting control begin*/
var WAITING_DURATION = 3000;
var wt_ZOrder = 20001;
var wt_Timer = null;
function Waiting_Show(duration) {
	var $wt = $('#waiting_control').first();
	if($wt.length == 0) {
		return null;
	}
	
	if(wt_Timer != null) {
		Waiting_Hide();
	}
	
	$wt.show();
	var style = {
		'position':'fixed',
		'z-index':wt_ZOrder,
		'left':'0px',
		'top':'0px'
	};
	$wt.css(style);
	var pos = uGetCenterPos($wt.width(), $wt.height());
	$wt.offset({left:pos.x , top:pos.y });
	
	var $bg = BG_Show("WaitingBG", wt_ZOrder-1);
	
	if(duration != 0) {
		wt_Timer = setTimeout(function() {
			$wt.hide();
			BG_Hide($bg);
		}, duration);
	}
	return $wt;
}

function Waiting_Hide() {
	$('#waiting_control').hide();
	$('#WaitingBG').hide();
	if(wt_Timer != null) {
		clearTimeout(wt_Timer);
		wt_Timer = null;
	}
}
/*Waiting control end*/

/*Background control*/
function BG_Show(bgName, zOrder, fn, alpha) {
	if(alpha == undefined) alpha = 0.3;
	
	var $pbg = $('#'+bgName);
	if($pbg.length == 0) {
		$pbg = $('<div></div>');
		$pbg.attr('id', bgName);
		$('body').append($pbg.get(0));
	}
	
	$pbg.attr('id', bgName);
	$pbg.unbind('click');
	
	if($.isFunction(fn)) {
		$pbg.click(fn);
	}
	
	var pbgStyle = {
		'position':'absolute',
		'z-index':zOrder,
		'background-color':'#000000',
		'left':0, 
		'top':0, 
		'width': ($(window).width()),
		'height': ($(document).height())
	};
	$pbg.fadeTo(0, alpha);
	$pbg.css(pbgStyle);
	
	return $pbg;
}

function BG_Hide($bg) {
	if($bg == undefined || $bg == null) return;
	$bg.remove();
}
/*Background control end*/

/** Background control 2 **/
function BackgroundControl() {
	var BG_DEFAULT_NAME = "BackgroundControl";
	var BG_DEFAULT_INDEX = 9000;
	
	this.domBg = null;
	this.alpha = 0.0;
	this.fnOnClick = null;
	
	/** public API **/
	this.Init = function(name, z_index, alpha) {
		if(name == null) name = BG_DEFAULT_NAME;
		if(z_index == null) z_index = BG_DEFAULT_INDEX;
		if(alpha == null) alpha = 0.3;
		
		this.alpha = alpha;
		
		var $bg = $('#'+name);
		if($bg.length == 0) {
			$bg = $('<div></div>');
			$bg.attr('id', name);
			$('body').append($bg.get(0));
			
			var style = {
				'position':'fixed',
				'z-index':z_index,
				'background-color':'#000000',
				'left':0, 
				'top':0, 
				//'width': ($(window).width()),
				//'height': ($(document).height())
			};
			$bg.css(style);
			
			$(window).resize(function() {
				$bg.width($(window).width());
				$bg.height($(window).height());
			});
			
			this.domBg = $bg[0];
			this.Bind();
		}
		else {
			this.domBg = $bg[0];
		}

		$bg.hide();
		return this.domBg;
	};
	
	this.isInit=function(){return this.domBg!=undefined;};
	
	this.Show = function() {
		var $bg = $(this.domBg);
		$bg.fadeTo(0, this.alpha);
		$bg.width($(window).width());
		$bg.height($(window).height());
	};
	
	this.Hide = function() {
		var $bg = $(this.domBg);
		$bg.hide();
	};
	
	this.SetOnClick = function(fn) {
		this.fnOnClick = fn;
	};

	this.Bind = function() {
		var context = this;
		var $bg = $(this.domBg);
		
		$bg.unbind('click').click(function(){
			if($.isFunction(context.fnOnClick)) {
				context.fnOnClick();
			}
		});
	};
}
/** Background control 2 end **/

/** parser DOM 'UL' to array **/
function MenuItemData() {
	var ITEM_VALUE = 0;
	var ITEM_KEY = 1;
	
	this.valueArray = [];
	this.keyArray = [];
	this.current = 0;
	
	this.ParseDOM = function(domUL) {
		var context = this;
		$(domUL).children('li').each(function(i){
			var $divArr = $(this).children('div');
			context.valueArray[i] = $divArr.eq(ITEM_VALUE).text();
			context.keyArray[i] = $divArr.eq(ITEM_KEY).text();
		});
	};
	
	this.GetValueArray = function() {
		return this.valueArray;
	};
	
	this.GetKeyArray = function() {
		return this.keyArray;
	};
}

/**
 * open dialog with a iframe in it.
 * 
 * @param {String}url
 * @param {Number}w
 * @param {Number}h
 * @author Bing
 */
function uOpenDlgIframe(url, w,h){
	var cnt = '<iframe class="PopDlgInnerFrame" src="' + url + '"></iframe>';
	uOpenDlg(null, cnt, w,h);
}

/**
 * Open DIV dlg 
 * @param {Element}divDlg	div to act as a dlg, if null, use default
 * @param {String}cnt		html text to show
 * @param {Number}w			width
 * @param {Number}h			height
 * @param {Boolean}			[option]autoBorder, defaul true
 * @author Bing
 */
function uOpenDlg(divDlg, cnt, w,h,autoBorder){
	if(divDlg==null){
		divDlg = document.getElementById("__OpenDlg__");
		if(divDlg==null){			
			divDlg = document.body.appendChild(document.createElement("div"));
			divDlg.id = "__OpenDlg__";
		}
	}
	
	if(cnt==null)
		return;
	uCloseDlg(divDlg);
	
	//clz
	var clzDlg =  /[\s]*PopDlg[\s]*/;
	var dlgclz = divDlg.getAttribute('class');
	if( !clzDlg.test(dlgclz) ){		
		divDlg.setAttribute('class', (dlgclz==null?'':dlgclz) + ' PopDlg');
	}
	
	//center
	var x = ($(window).width() - w) / 2;
	var y = ($(window).height() - h) / 2;
	if(x < 0) {x = 0;}
	if(y < 0) {y = 0;}
	
	divDlg.style.left  =  x + 'px';
	divDlg.style.top   =  y + 'px';
	divDlg.style.width =  w    + 'px';
	divDlg.style.height=  h    + 'px';
	
	//borders
	if(autoBorder==undefined || autoBorder==true)
		cnt += '<div class="l"></div><div class="t"></div><div class="r"></div><div class="b"></div><div class="tl"></div><div class="tr"></div><div class="bl"></div><div class="br"></div>';
	else
		cnt += '<div class="l0"></div><div class="t0"></div><div class="r"></div><div class="b"></div><div class="tl"></div><div class="tr"></div><div class="bl"></div><div class="br"></div>';
	
	divDlg.innerHTML = cnt;
	
	divDlg.style.display='block';
	
	var bg = new BackgroundControl();
	bg.Init('uOpenDlgBG', 101, 0.3);
	bg.Show();
}

/**
 * close dialog
 * @param divDlg	[option]null, or your dlg div
 * @author Bing
 */
function uCloseDlg(divDlg){
	if(divDlg==undefined || divDlg==null){
		divDlg = document.getElementById("__OpenDlg__");
	}
	var f = uFindFirstNode(divDlg, function(n){return n.tagName=='IFRAME';}, true);
	if(f!=null)
		f.src = '';
	
	divDlg.style.display='none';
	divDlg.innerHTML='';

	var bg = document.getElementById('uOpenDlgBG');
	if(bg!=null){
		bg.parentNode.removeChild(bg);
	}
}

/**
 * Bind year month day select. The day will change by year and month changing.
 * @param domYear
 * @param domMonth
 * @param domDay
 * @returns
 */
function uFillYMDSelect(domYear, domMonth, domDay) {
	var MONTH_DAY_ARRAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	var $year = $(domYear);
	var $month = $(domMonth);
	var $day = $(domDay);
	var beginYear = 2012;
	var endYear = 2023;
	
	/**
	 * @param: month start from 1 to 12
	 */
	var GetDayCount = function(year, month) {
		var count = undefined;
		if(month == 2) {
			if(year%4 == 0 && year%100 != 0) {
				count = 29;
			} else {
				count = 28;
			}
		} else {
			count = MONTH_DAY_ARRAY[month-1];
		}
		
		return count;
	};
	
	var Init = function() {
		var year = $year.val();
		$year.empty();
		for(var i = beginYear; i < endYear; i++) {
			var $option = $('<option></option>');
			$option.text(i);
			$year.append($option[0]);
		}
		$year.val(year);
		
		var month = $month.val();
		/*
		$month.empty();
		for(var i = 1; i <= 12; i++) {
			var $option = $('<option></option>');
			$option.text(i);
			$month.append($option[0]);
		}
		$month.val(month);*/
		
		var day = $day.val();
		var count = GetDayCount(year, month);
		$day.empty();
		for(var i = 0; i < count; i++) {
			var $option = $('<option></option>');
			$option.text(i+1);
			$day.append($option[0]);
		}
		$day.val(day);
	};
	
	var UpdateDay = function() {
		var curDayCount = $day.find('option').length;
		var year = parseInt($year.val());
		var month = parseInt($month.val());
		var newDayCount = GetDayCount(year, month);
		
		if(newDayCount == curDayCount) return;
		
		var curDay = $day.val();
		$day.empty();
		for(var i = 0; i < newDayCount; i++) {
			var $option = $('<option></option>');
			$option.text(i+1);
			$day.append($option[0]);
		}
		if(curDay < newDayCount) {
			$day.val(curDay);
		}
	};
	
	var Bind = function() {
		$year.change(UpdateDay);
		$month.change(UpdateDay);
	};
	
	/* process code */
	Init();
	Bind();
}

/**
 * Fulfill options of select.
 * @param domSelect 
 */
function uFillIntegerSelect(domSelect, begin, end) {
	var $dom = $(domSelect);
	var value = $dom.val();
	
	$dom.empty();
	for(var i = begin; i <= end; i++) {
		var $option = $('<option></option>');
		$option.text(i);
		$dom.append($option[0]);
	}
	$dom.val(value);
}

function uFillHourSelect(domSelect) {
	uFillIntegerSelect(domSelect, 0, 23);
}

function uFillMinuteSelect(domSelect) {
	uFillIntegerSelect(domSelect, 0, 59);
}

/**
 * add options of select.
 * @param domSelect 
 * @param arr: object array {key: , value: };
 */
function uUpdateSelect(domSelect, arr) {
	if(domSelect == undefined || arr == undefined) return;
	var $domSelect = $(domSelect);
	var oldValue = $domSelect.val();
	var len = arr.length;
	domSelect.options.length = 0;
	/*fix bug of ie9: $domSelect.val("abc"). 
	* If the select doesn't has "abc" option, selectIndex will be -1.
	* And then call $domSelect.val() will return null.
	*/
	var index = 0;
	for(var i = 0; i < len; i++) {
		var varItem = new Option(arr[i].value, arr[i].key);      
		domSelect.options.add(varItem);
		if(oldValue == arr[i].key) {
			index = i;
		}
	};
	domSelect.selectedIndex = index;
}

/**
 * Switch will switch dom's class between chass1 and class2.
 * @param dom
 * @param class1 class1 will be the initialized class.
 * @param class2
 * @param fnOnChange : fnOnChange(class) class will be the final name of calss.
 */
function uSwitch(dom, class1, class2, fnOnChange) {
	var $dom = $(dom);
	
	$dom.removeClass(class2).addClass(class1);
	if($.isFunction(fnOnChange)) {
		fnOnChange(class1);
	}
	
	$dom.click(function() {
		if($dom.hasClass(class1)) {
			$dom.removeClass(class1).addClass(class2);
			if($.isFunction(fnOnChange)) {
				fnOnChange(class2);
			}
		}
		else if($dom.hasClass(class2)) {
			$dom.removeClass(class2).addClass(class1);
			if($.isFunction(fnOnChange)) {
				fnOnChange(class1);
			}
		}
	});
}

/**
 * @param domTable - table DOM
 * @param classArr - [0]: trigger tab, [1]: active tab, [2]: hover tab  
 * @param onTabClicked - callback
 */
function uInitTab(domTable, classArr, onTabClicked) {
	var CLASS_TAB_TRIGGER = classArr[0];
	var CLASS_TAB_ACTIVE = classArr[1];
	var CLASS_TAB_HOVER = classArr[2];
	var JS_TAB_TRIGGER = "." + CLASS_TAB_TRIGGER;
	var $table = $(domTable);
	var $triggerArr = $table.find(JS_TAB_TRIGGER);
	
	/*
	$triggerArr.mouseover(function() {
		$(this).addClass(CLASS_TAB_HOVER);
	});
	
	$triggerArr.mouseout(function() {
		$(this).removeClass(CLASS_TAB_HOVER);
	});
	*/
	
	$triggerArr.click(function() {
		$triggerArr.removeClass(CLASS_TAB_ACTIVE);
		$(this).addClass(CLASS_TAB_ACTIVE);
		if(onTabClicked != undefined) {
			onTabClicked(this);
		}
	});
	
	$triggerArr.each(function() {
		if($(this).hasClass(CLASS_TAB_ACTIVE) && onTabClicked != undefined) {
			onTabClicked(this);
		}
	});
}

function uValueChanger(dom) {
	var JS_INCREASE_TRIGGER = ".IncreaseTrigger";
	var JS_DECREASE_TRIGGER = ".DecreaseTrigger";
	var JS_VALUE_CHANGER = "input[type='text']";
	
	var $dom = $(dom);
	var $value = $dom.find(JS_VALUE_CHANGER);
	
	$dom.find(JS_INCREASE_TRIGGER).click(function() {
		var value = parseInt($value.val());
		value++;
		$value.val(value);
		$value.change();
	});
	
	$dom.find(JS_DECREASE_TRIGGER).click(function() {
		var value = parseInt($value.val());
		value--;
		if(value < 0) value = 0;
		$value.val(value);
		$value.change();
	});
}

function LoadTMPlayer(dom) {
	dom.innerHTML = 
	'<object classid="clsid:b14dcdc6-dc3a-4e99-80b2-3169b06ef069"'+
	'codebase="tmplayer/TMPlayer.CAB#Version=2,0,0,102"'+
	'id="ArcSoft_TMPlayer"'+
	'width="480" height="360"'+
	'viewastext standby="Loading ArcSoft TotalMedia Player ...">'+
	'<param name="ApplicationType" value="0" />'+
	'<param name="PanelType" value="3" />'+
	'<param name="ResizeMode" value="7" />'+
	'<br/><br/>'+
	'<p style="font-size:12px">This website wants to install ArcSoft TotalMedia Player.<br/>'+
	'If you did not see a notice, please check the security policy of your browser and computer.<br/></p>'+
	'<a href="tmplayer/TMPSetup.exe"><b style="color:green;font-size:13px">Or directly click here to install ArcSoft TotalMedia Player.</b></a><br/>'+
	'<a href="#" onclick="location.reload()"><b style="font-size:13px">Please refresh this web page after you finish installation.</b></a><br/>'+
	'</object>';
	return $("#ArcSoft_TMPlayer", dom).get(0);
}

function LoadFakePlayer(dom) {
	dom.innerHTML = "<div id='FakePlayer' style='width: 480px; height: 360px; text-align:center;line-height:360px'>ArcVideo播放器仅支持32位IE浏览器</div>";
}

function installTMPlayer() {
	var pluginDiv = document.createElement("div");
	pluginDiv.setAttribute("id", "installPlugin");
	pluginDiv.setAttribute("style", "display:none");
	document.body.insertBefore(pluginDiv, null);
	LoadTMPlayer(pluginDiv);
}

function detectPlugin(CLSID, functionName)
{
    var pluginDiv = document.createElement("<div id=\"pluginDiv\" style=\"display:none\"></div>");
    document.body.insertBefore(pluginDiv);
    pluginDiv.innerHTML = '<object id="objectForDetectPlugin" classid="CLSID:'+ CLSID +'"></object>';
    try
    {
        if(eval("objectForDetectPlugin." + functionName) == undefined)
        {
            pluginDiv.removeNode(true);//delete pluginDiv and sub elements
            return false;
        }
        else
        {
            pluginDiv.removeNode(true);//delete pluginDiv and sub elements
            return true;
        }
    }
    catch(e)
    {
        return false;
    }
}

//
// date and time
//
/**
 * @param year
 * @param month	1~12
 * @param daySelect	the <select> elem 
 */
function uAdjustDaySelectOptions(year, month, daySelect){
	var d = new Date(year, month, 1);
	d.setDate(d.getDate()-1);
	var maxDay = d.getDate();
	if(daySelect.options.length < maxDay){
		for(var i=daySelect.options.length+1; i<=maxDay;i++){
			  var o=document.createElement('option');
			  o.text = i;
			  daySelect.add(o);
		}
	}else if(daySelect.options.length > maxDay){
		while(daySelect.options.length > maxDay){			 
			 daySelect.remove(daySelect.options.length-1);
		}
	}
}

function updateMiniAlertMsg(div, type){
	$.post('listLastAlert?type='+type,function(data){
		$(div).html(data);
	});
}
function timerUpdateMiniAlertBox(type){
	var r = new Object();
	r.type = type;	
	r.run = function(){
		updateMiniAlertMsg(document.getElementById('MiniAlertBox'), r.type);
		if(enableTopAlert) 
			window.setTimeout(r.run, 3500);
	};
	window.setTimeout(r.run, 3000);
}

function timeStopMiniAlertBox(){
	enableTopAlert = false;
	$('#MiniAlertBox').hide();
	$.post('closeTopAlert',function(data){});
}

function uParseServerIP(data) {
	var list = [];
	var o = {};
	$("li", data).each(function(i) {
		var eth = $("#eth", this).text();
		var ip = $("#ip", this).text();
		if(ip == null || ip.length == 0) return true;
		var o = {};
		o.key = eth;
		o.value = ip;
		list.push(o);
	});
	return list;
}

function setCheckBox(dom, bChecked, bDisabled) {
	if(dom == null) return;
	
	if(bChecked != null) {
		dom.checked = bChecked;
	}
	
	if(bDisabled != null) {
		dom.disabled = bDisabled;
	}
}

function setSelect(dom, value, bDisabled) {
	if(dom == null) return;
	
	if(value != null) {
		dom.value = value;
	}
	
	if(bDisabled != null) {
		dom.disabled = bDisabled;
	}
}

function setInputText(dom, text, bDisabled) {
	if(dom == null) return;
	
	if(text != null) {
		dom.value = text;
	}
	
	if(bDisabled != null) {
		dom.disabled = bDisabled;
	}
}

function GetValueByJS($sel ) {
	var value = null;
	
	if($sel.length == 0) {
		return null;
	}
	
	if($sel.get(0).disabled) {
		value = null;
	}
	else if($sel.attr('type') == "checkbox") {
		var checkVal = $sel.val();
		if(checkVal == "on") {
			if($sel.get(0).checked) {
				value = ENABLE_TRUE;
			} else {
				value = ENABLE_FALSE;
			}
		}
		else {
			if($sel.get(0).checked) {
				value = checkVal;
			} else {
				value = null;
			}
		}
	}
	else {
		value = $sel.val();
	}
	return value;
};