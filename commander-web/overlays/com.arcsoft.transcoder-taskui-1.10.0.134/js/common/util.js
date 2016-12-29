var MS_HOUR = 3600000;
var MS_MINUTE = 60000;
var MS_SECOND = 1000;

/**
 * Is array contains object
 * @param {Array}arr
 * @param o
 * @returns {Boolean}
 */
function uArrContains(arr, o){
	var l = arr.length;
	for(var i=0;i<l;i++){
		if(arr[i]==o)
			return true;
	}
	return false;
}

/**
 * 
 * @param {Array}arr
 * @param {Function}fnMatch		f(o):true|false
 * @returns						arr[i] or null
 */
function uFindFirstInArray(arr, fnMatch){
	if(arr!=null){
		var len = arr.length;
		for(var i=0;i<len;i++){
			var o = arr[i];
			if(fnMatch(o))
				return o;
		}
	}
	return null;
}

/**
 * replace style0 with style1
 * @param {Element}elem
 * @param {String}style0
 * @param {String}style1
 */
function uReplaceStyle(elem, style0, style1){
	if(elem==undefined ||elem==null)
		return;
	var changed = false;
	var clz1;
	var clz0 = elem.getAttribute("class");
			
	var clzs = clz0.split(/\s+/);
	for(var i=0;i<clzs.length;i++){
		if(clzs[i]==style0){
			clzs[i] = style1;
			changed = true;
		}
	}
	
	if(changed){
		clz1 = clzs.join(' ');
		elem.setAttribute("class", clz1);
	}
}
/**
 * check whether clz contained
 * @param {Element} node	
 * @param {String} clz
 * @returns boolean
 */
function uIsContainCssClass(node, clz){
	var clzAttrVal = node.getAttribute("class");
	if(clzAttrVal!=null && clzAttrVal!=undefined){
		if(clzAttrVal.length==clz.length)
			return clzAttrVal==clz;	
		var clzs = clzAttrVal.split(/\s+/);
		for(var i=0;i<clzs.length;i++){
			if(clzs[i]==clz)
				return true;
		}
	}
	return false;
}

/**
 * 
 * @param domElem
 * @param fnContainerMatch	fnContainerMatch(node) : true|false
 * @returns					node or null
 */
function uGetContainer(domElem, fnContainerMatch){
	if(domElem==null)
		return null;
	if(fnContainerMatch==null)
		return n.parentNode;
	var ret = null;
	for(var n=domElem; n!=null; n=n.parentNode){
		if(fnContainerMatch(n)){
			ret = n;
			break;
		}
	}
	return ret;
}

function uFindFirstNodeById(parentElem, id){
	return uFindFirstNode(parentElem,
			function(n){
				return n.getAttribute("id")==id;
			},
			true);
}

function uFindFirstNodeByName(parentElem, tagName, name){
	if(tagName!=null)
		tagName = tagName.toUpperCase();
	return uFindFirstNode(parentElem,
			function(n){
				return n.getAttribute("name")==name 
							&& (tagName==null 
									? true : ( n.nodeName==tagName 
												|| (n.nodeName.charAt(0).toUpperCase()==tagName.charAt(0) && n.nodeName.toUpperCase()==tagName) ));
			},
			true);
}

/**
 * 
 * @param {Element}parentElem
 * @param {Function}fnMatch				fnMatch(node) : true|false
 * @param {Boolean}isDeepFirstSearch	to use deep-first or breadth-first search
 * @returns								node or null
 */
function uFindFirstNode(parentElem, fnMatch, isDeepFirstSearch){	
	var f = uFindDeepFirst;	
	return f(parentElem, fnMatch);
}

/**
 * 
 * @param {Array}arrResult						[OUT] result array
 * @param {Element}parentElem					dom element
 * @param {Function}fnMatch						fnMatch(node) : true|false
 * @param {boolean}isSkipSearchChildAfterMatch	whether to continue to search in its child if this node is matched
 */
function uFindNodeArray(arrResult, parentElem, fnMatch, isSkipSearchChildAfterMatch){
	if(parentElem!=null){
		for(var n=parentElem.firstChild; n!=null; n=n.nextSibling){
			if(n.nodeType!=1/*Node.ELEMENT_NODE*/)
				continue;
			if(fnMatch(n)){
				arrResult[arrResult.length] = n;
				if(isSkipSearchChildAfterMatch)
					continue;
			}					
			uFindNodeArray(arrResult, n,fnMatch, isSkipSearchChildAfterMatch);			
		}
	}	
}

function uFindDeepFirst(elemP, fnMatch){
	if(elemP!=null){
		for(var n=elemP.firstChild; n!=null; n=n.nextSibling){
			if(n.nodeType!=1/*Node.ELEMENT_NODE*/)
				continue;
			if(fnMatch(n))
				return n;
			var e = uFindDeepFirst(n,fnMatch);
			if(e!=null)
				return e;
		}
	}
	return null;
}

/**
 * Check all checkbox named {chkName} in body.
 * @param {String}chkName	check box name
 * @param {boolean}isChk	is to check
 */
function uAction_CheckAll(chkName, isChk){
	var toChecked = isChk;
	var chks = document.getElementsByName(chkName);
	var len=chks.length;
	for(var i=0;i<len;i++){
		chks[i].checked = toChecked;
	}
}

function uCheckBrowser(){
	var Sys = {}; 
	var ua = navigator.userAgent.toLowerCase(); 
	var s; 
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 
	(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : 
	(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : 
	(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	return Sys;
}

function uBrowserInfo(){
	var browser = {
		msie: false, firefox: false, opera: false, safari: false, 
		chrome: false, netscape: false, appname: 'unknown', version: 0
		},
	userAgent = window.navigator.userAgent.toLowerCase();
	if ( /(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test( userAgent ) ){
		browser[RegExp.$1] = true;
		browser.appname = RegExp.$1;
		browser.version = RegExp.$2;
	} else if ( /version\D+(\d[\d.]*).*safari/.test( userAgent ) ){ // safari
		browser.safari = true;
		browser.appname = 'safari';
		browser.version = RegExp.$2;
	} else if( /rv:(\d[\d.]*)/.test( userAgent)) {
		browser.msie = true;
		browser.appname = "msie";
		browser.version = RegExp.$1;
	}
	
	browser.platform = navigator.platform;	//Win32 or Win64
	
	return browser;
}

/* _functionCallback must be global function */
function AttachIE11Event(obj, _strEventId, _functionCallback) {
    var nameFromToStringRegex = /^function\s?([^\s(]*)/;
    var paramsFromToStringRegex = /\(\)|\(.+\)/;
    var params = _functionCallback.toString().match(paramsFromToStringRegex)[0];
    var functionName = _functionCallback.name || _functionCallback.toString().match(nameFromToStringRegex)[1];
    var handler;
    try {
        handler = document.createElement("script");
        handler.setAttribute("for", obj.id);
    }
    catch(ex) {
        handler = document.createElement('<script for="' + obj.id + '">');
    }
    handler.event = _strEventId + params;
    handler.appendChild(document.createTextNode(functionName + params + ";"));
    document.body.appendChild(handler);
}

/* fn: must be global function in ie11 */
function uDomAddEvent(obj, fnName, fn) {
	if(obj.attachEvent) {
		obj.attachEvent(fnName, fn);
	} else if(obj.addEventListener) {
		AttachIE11Event(obj, fnName, fn);
	}  
}

function Runnable(){}
Runnable.prototype=new Object(); 
Runnable.run = function(){};

function StepRunnable(){}
StepRunnable.prototype=new Runnable(); 
StepRunnable.steps = 1;
StepRunnable.stepInterval = function(){return 200;};


/**
 * do all steps defined in runnable
 * @param {StepRunnable}stepRunnable
 */
function uAnim_DoSteps(stepRunnable){
	var cxt = new Runnable();
	cxt.stepRunnable = stepRunnable;
	cxt.run = function(){
		cxt.stepRunnable.run();
		cxt.stepRunnable.steps--;
		if(cxt.stepRunnable.steps <= 0){
			return;
		}
		setTimeout(function(){cxt.run();}, cxt.stepRunnable.stepInterval());
	};	
	
	cxt.run();
}

function uAnim_Opacity(e,setVisibleRunnable, isInc){	
	var fn = new StepRunnable();
	fn.steps = 4;
	fn.elem = e;
	fn.total = fn.steps;
	fn.stepInterval = function(){ return 400*fn.steps*fn.steps/(fn.total*fn.total); };
	fn.run = function(){
		var o = 100*(fn.total-fn.steps+1)/fn.total;
		if(!isInc)
			o = 100 - o;		
		fn.elem.style.filter = 'alpha(opacity=' + o +')';
		fn.elem.style.opacity = o/100;
		
		if(isInc ? fn.steps==fn.total : fn.steps==1){
			setVisibleRunnable.run();
		}
	};
	
	uAnim_DoSteps(fn);	
}

function uAnim_SwitchDisplay(e2Hide, e2Show, displayVal){
	if(e2Hide.style.display!='none')
		e2Hide.style.display='none';	
	
	if(e2Show.style.display!=displayVal){
		var fn = new Runnable();
		fn.e = e2Show;
		fn.displayVal = displayVal;
		fn.run = function(){fn.e.style.display=fn.displayVal;};
		uAnim_Opacity(e2Show, fn,true);	
	}
}

function XMLWriter() 
{ 
	this.XML=[]; 
	this.Nodes=[]; 
	this.State=""; 
	
	this.FormatXML = function(Str) 
	{ 
		if (Str) {
			//ymchange
			//return Str.replace(/&/g, "&").replace(/\"/g, "\"").replace(/</g, "<").replace(/>/g, ">"); 
			return Str.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;");
		}
		return "";
	};
	
	this.BeginNode = function(Name) 
	{ 
		if (!Name) return; 
		if (this.State=="beg") this.XML.push(">"); 
		this.State="beg"; 
		this.Nodes.push(Name); 
		this.XML.push("<"+Name); 
	};
	
	this.EndNode = function() 
	{ 
		if (this.State=="beg") 
		{
			//Single mode.
			this.XML.push("/>"); 
			this.Nodes.pop(); 
			
			//ymchange
			//close mode.
			//this.XML.push(">"); 
			//this.XML.push("</"+this.Nodes.pop()+">"); 
		} 
		else if (this.Nodes.length>0)
		{
			this.XML.push("</"+this.Nodes.pop()+">"); 
		}
		this.State=""; 
	};
	
	this.Attrib = function(Name, Value) 
	{
		if (this.State!="beg" || !Name) return; 
		this.XML.push(" "+Name+"=\""+this.FormatXML(Value)+"\""); 
	};
	
	this.WriteString = function(Value) 
	{ 
		if (this.State=="beg") this.XML.push(">"); 
		this.XML.push(this.FormatXML(Value)); 
		this.State=""; 
	};

	this.Node = function(Name, Value) 
	{

		if (!Name) return; 
		if (this.State=="beg") this.XML.push(">"); 
		this.XML.push((Value=="" || !Value)?"<"+Name+"/>":"<"+Name+">"+this.FormatXML(Value)+"</"+Name+">"); 
		this.State=""; 
	};
	
	this.Close = function() 
	{ 
		while (this.Nodes.length>0) 
			this.EndNode(); 
		this.State="closed"; 
	};
	
	this.ToString = function(){return this.XML.join("");};
} //~XMLWriter

/**
 * format ms to hh:MM:ss
 * 
 * @param ms
 * @returns
 */
function uFormatTime(ms){
	var t = Math.floor((new Number(ms))/1000);
	var buf = '';
	var h  = Math.floor(t/3600);
	var hr = Math.floor(t%3600);
	var m  = Math.floor(hr/60 );
	var mr = Math.floor(hr%60 );
	
	if(h<10) buf += '0';
	buf += h +':';
	
	if(m<10) buf += '0';
	buf += m +':';
	
	if(mr<10) buf += '0';
	buf += mr;
	
	return buf;
}

function uFormatFileSize(bytes){
	if(bytes==null||bytes.length==0)
		return '';
	var t = parseInt(bytes);
	if(t<1024){
		return t + ' Bytes';
	}else if(t<1024*1024){ //<1M
		var value = t/1024;
		value = uFormatNumber(value, "0.00");
		return value + ' KB';
	}else if(t<1024*1024*1024){ //<1G
		var value = t/1024/1024;
		value = uFormatNumber(value, "0.00");
		return value + ' MB';
	}else{ // >1G
		var value = t/1024/1024/1024;
		value = uFormatNumber(value, "0.00");
		return value + ' GB';
	}
}
/**
 * format number.
 * @param {number}number	number
 * @param {string}pattern	pattern string can be ???.??? / 0.000 or so.
 * @return formated number string.
 */
function uFormatNumber(number, pattern){
    var str            = number.toString();
    var strInt;
    var strFloat;
    var formatInt;
    var formatFloat;
    if(/\./g.test(pattern)){
        formatInt        = pattern.split('.')[0];
        formatFloat        = pattern.split('.')[1];
    }else{
        formatInt        = pattern;
        formatFloat        = null;
    }

    if(/\./g.test(str)){
        if(formatFloat!=null){
            var tempFloat    = Math.round(parseFloat('0.'+str.split('.')[1])*Math.pow(10,formatFloat.length))/Math.pow(10,formatFloat.length);
            strInt        = (Math.floor(number)+Math.floor(tempFloat)).toString();                
            strFloat    = /\./g.test(tempFloat.toString())?tempFloat.toString().split('.')[1]:'0';            
        }else{
            strInt        = Math.round(number).toString();
            strFloat    = '0';
        }
    }else{
        strInt        = str;
        strFloat    = '0';
    }
    if(formatInt!=null){
        var outputInt    = '';
        var zero        = formatInt.match(/0*$/)[0].length;
        var comma        = null;
        if(/,/g.test(formatInt)){
            comma        = formatInt.match(/,[^,]*/)[0].length-1;
        }
        var newReg        = new RegExp('(\\d{'+comma+'})','g');

        if(strInt.length<zero){
            outputInt        = new Array(zero+1).join('0')+strInt;
            outputInt        = outputInt.substr(outputInt.length-zero,zero);
        }else{
            outputInt        = strInt;
        }

        outputInt            = outputInt.substr(0,outputInt.length%comma)+outputInt.substring(outputInt.length%comma).replace(newReg,(comma!=null?',':'')+'$1');
        outputInt            = outputInt.replace(/^,/,'');

        strInt    = outputInt;
    }

    if(formatFloat!=null){
        var outputFloat    = '';
        var zero        = formatFloat.match(/^0*/)[0].length;

        if(strFloat.length<zero){
            outputFloat        = strFloat+new Array(zero+1).join('0');
            //outputFloat        = outputFloat.substring(0,formatFloat.length);
            var outputFloat1    = outputFloat.substring(0,zero);
            var outputFloat2    = outputFloat.substring(zero,formatFloat.length);
            outputFloat        = outputFloat1+outputFloat2.replace(/0*$/,'');
        }else{
            outputFloat        = strFloat.substring(0,formatFloat.length);
        }

        strFloat    = outputFloat;
    }else{
        if(pattern!='' || (pattern=='' && strFloat=='0')){
            strFloat    = '';
        }
    }

    return strInt+(strFloat==''?'':'.'+strFloat);
}

/**
 * String format output
 * @param args
 * @returns
 */
String.prototype.format = function () {
	var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(m,i,o,n){
    	if(args[i] == undefined) args[i] = "";
        return args[i];
    });
};

function uInArray(array, v) {
	if(array == null) return false;
	var len = array.length;
	if(len == 0) return false;
	for(var i = 0; i < len; i++) {
		if(array[i] == v) {
			return true;
		}
	}
	return false;
};

function uGetMapValue(map, key) {
	var len = map.length;
	if($.isArray(key)) {
		var keyLen = key.length;
		if(keyLen == 0) return null;
		for(var i = 0; i < len; i++) {
			var mapKey = map[i].key;
			for(var j = 0; j < keyLen; j++) {
				if(mapKey[j] != key[j]) {
					break;
				}
			}
			if(j == keyLen) {
				return map[i].value;
			}
		}
	}
	else {
		for(var i = 0; i < len; i++) {
			if(map[i].key == key) {
				return map[i].value;
			}
		}
	}
	
	return null;
};

function uLicenseFilterKey(sourceArray, filterArray) {
	var slen = sourceArray.length;
	var flen = filterArray.length;
	var bFiltered = false;
	var newArray = [];
	for(var i = 0; i < slen; i++) {
		bFiltered = false;
		for(var j = 0; j < flen; j++) {
			if(sourceArray[i].key == filterArray[j].key) {
				var lic = GetLicense(filterArray[j].value);
				if(lic == license.ENABLED) {
					newArray.push(sourceArray[i]);
				}
				bFiltered = true;
				break;
			}
		}
		if(!bFiltered) {
			newArray.push(sourceArray[i]);
		}
	}
	return newArray;
};

function uLicenseFilterValue(sourceArray, filterArray) {
	var slen = sourceArray.length;
	var flen = filterArray.length;
	
	for(var i = 0; i < slen; i++) {
		for(var j = 0; j < flen; j++) {
			if(sourceArray[i].key == filterArray[j].key) {
				var subArr = filterArray[j].value;
				var newArray = [];
				for(var k = 0; k < subArr.length; k++) {
					var lic = GetLicense(subArr[k]);
					if(lic == license.ENABLED) {
						newArray.push(sourceArray[i].value[k]);
					}
				}
				sourceArray[i].value = newArray;
				break;
			}
		}
	}
	return sourceArray;
};

function uStringLoader() {
	this.map=[];
	
	this.Init = function(dom) {
		var context = this;
		$(dom).children().each(function(i) {
			var object = new Object();
			object.key = $(this).attr('id');
			object.value = $(this).text();
			context.map[i] = object;
		});
	};
	
	this.GetValue = function(key) {
		return uGetMapValue(this.map, key);
	};
};

//check input Int 
function uCheckInputInt(oInput)
{
	var MAX_INT = 999999;
	if('' != oInput.value.replace(/\d/g, ''))
	{
		oInput.value = oInput.value.replace(/\D/g, '');
	}
	var value = parseInt(oInput.value);
	if(isNaN(value)) {
		value = 0;
	}
	if(value > MAX_INT) {
		value = MAX_INT;
	}
	oInput.value = String(value);
}

//check input Float 
function uCheckInputFloat(oInput)
{
	if ( '' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/,''))
	{
		oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
	}
}

/**
 * clone one object deeply.
 * @param Obj
 * @returns
 */ 
function uClone(Obj) {   
    var buf;   
    if (Obj instanceof Array) {   
        buf = [];
        var i = Obj.length;   
        while (i--) {   
            buf[i] = uClone(Obj[i]);   
        }   
        return buf;
    }else if (Obj instanceof Object){   
        buf = {};
        for (var k in Obj) { 
            buf[k] = uClone(Obj[k]);   
        }   
        return buf;   
    }else{   
        return Obj;   
    }   
}
/**
 * 
 * @param {String}ip
 * @returns Boolean
 */
function uCheckIP(ip){	
//	var ptn= /^\s*(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\s*$/;
//	var r = ptn.exec(ip);	
//	return r!=null && r[1]<256 && r[2]<256 & r[3]<256 & r[4]<256;
	

	var ret;	
	
	var ptn= /^\s*(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\s*$/;	
	var r = ptn.exec(ip);	
	ret = (r!=null && r[1]<256 && r[2]<256 & r[3]<256 & r[4]<256);
	
	if(!ret)
		return false;
	
	ret = ! ( /^0\d+/.test(r[1]) || /^0\d+/.test(r[2]) || /^0\d+/.test(r[3]) || /^0\d+/.test(r[4]) );
	return ret;
	
}

function uMs2Hmsf(ms, frameRate) {
	ms = parseInt(ms);
	if(isNaN(ms)) return;
	
	frameRate = parseFloat(frameRate);
	if(isNaN(frameRate)) return;
	
	var o = {};
	o.hour = Math.floor(ms / MS_HOUR);
	remain = ms % MS_HOUR;
	o.minute = Math.floor(remain / MS_MINUTE);
	remain = remain % MS_MINUTE;
	o.second = Math.floor(remain / MS_SECOND);
	remain = remain % MS_SECOND;
	o.frame = Math.floor(remain * frameRate / MS_SECOND);
	return o;
};

/**
 * convert ms to array{hour,minite,second,millisecond}
 * 
 * @param{String} ms
 * @returns {hour,minite,second,millisecond}
 */
function uMs2Hmsm(ms) {
	ms = parseInt(ms);
	if(isNaN(ms)) return;
	
	var o = {};
	o.hour = Math.floor(ms / MS_HOUR);
	remain = ms % MS_HOUR;
	o.minute = Math.floor(remain / MS_MINUTE);
	remain = remain % MS_MINUTE;
	o.second = Math.floor(remain / MS_SECOND);
	remain = remain % MS_SECOND;
	o.millisecond = remain;
	return o;
};

/**
 * @param o - {hour:, minute:, second:, millisecond:}
 * */
function uHmsm2Ms(o) {
	var hour = parseInt(o.hour);
	var minute = parseInt(o.minute);
	var second = parseInt(o.second);
	var millisecond = parseInt(o.millisecond);
	var ms = hour * MS_HOUR + minute * MS_MINUTE + second * MS_SECOND + millisecond;
	return ms;
}

/**
 * @param timeText - "hh:mm:ss:xxx" 
 * @returns {hour:xxx , minute:xxx , second:xxx , millisecond:xxx , ms:xxx}
 */
function uTimeText2Object(timeText) {
	var array = timeText.match(/\d+/g);
	if(array == null) return null;
	if(array.length != 4) return null;
	var o = {};
	o.hour = parseInt(array[0]);
	if(isNaN(o.hour)) o.hour = 0;
	o.minute = parseInt(array[1]);
	if(isNaN(o.minute)) o.minute = 0;
	o.second = parseInt(array[2]);
	if(isNaN(o.second)) o.second = 0;
	o.millisecond = parseInt(array[3]);
	if(isNaN(o.millisecond)) o.millisecond = 0;
	o.ms = o.hour * MS_HOUR + o.minute * MS_MINUTE + o.second * MS_SECOND + o.millisecond;
	return o;
};

function uBindExpandEvent(parentDom){
	var $expandNodes = parentDom.find(".outputExpand_Trigger");
	var targetId = $expandNodes.attr('target');
	var $target = parentDom.find("#" + targetId);
	if($expandNodes.hasClass("ICON_ArrowRight")) {
		$target.hide();
	} else if($expandNodes.hasClass("ICON_ArrowDown")) {
		$target.show();
	}
	
	$expandNodes.unbind("click").click(function(){
		var targetId = $(this).attr('target');
		parentDom.find("#" + targetId).toggle();
		if($(this).hasClass("ICON_ArrowRight")) {
			$(this).removeClass("ICON_ArrowRight").addClass("ICON_ArrowDown");
		} else if($(this).hasClass("ICON_ArrowDown")) {
			$(this).removeClass("ICON_ArrowDown").addClass("ICON_ArrowRight");
		}
	});
	
	var $expandTds = $expandNodes.parent().next();
	$expandTds.css("cursor", "pointer");
	$expandTds.unbind("click").click(function(){
		var targetNode = $(this).prev().children();
		parentDom.find("#" + targetNode.attr('target')).toggle();
	});
}

/**
 * @param o - {$trigger: , $icon: , $target:, expand: true/false, disabled: true/false} 
 */
function uBindExpand(o) {
	function UpdateIcon(bExpand) {
		if(o.$icon == null) return;
		if(bExpand) {
			o.$icon.removeClass(CLASS_ICON_ARROW_RIGHT).addClass(CLASS_ICON_ARROW_DOWN);
		} else {
			o.$icon.removeClass(CLASS_ICON_ARROW_DOWN).addClass(CLASS_ICON_ARROW_RIGHT);
		}
	}
	
	if(o == null) return;
	if(o.$trigger == null || o.$target == null) return;
	if(o.expand == null) o.expand = true;
	
	if(o.expand) {
		o.$target.show();
	} else {
		o.$target.hide();
	}
	UpdateIcon(o.expand);
	
	if(o.disabled != null && o.disabled) {
	}
	else {
		o.$trigger.click(function() {
			
			
			o.expand = !o.expand;
			if(o.expand) {
				o.$target.show();
			} else {
				o.$target.hide();
			}
			UpdateIcon(o.expand);
		});
	}
}

function uAudioTriggerByContainerType(outputGroup){
	var domContainerType = outputGroup.find(JS_OUTPUT_GROUP_CONTAINER);
	var domNewAudioTrigger = outputGroup.find(JS_OUTPUT_STREAM_EXPAND).find(".NewAudioTrigger");
	var domAudioDeleteTrigger =  outputGroup.find(JS_OUTPUT_STREAM_EXPAND).find(".AudioFlock").find(".DeleteAudioTrigger");
	var audioFlock = outputGroup.find(".AudioFlock");
	var streamId = outputGroup.find("input[name='StreamId']");
	var streamSupport = g_taskSupport.GetStream(streamId.val());
	if(domContainerType.val() != 'TS'){
		domNewAudioTrigger.hide();
		domAudioDeleteTrigger.hide();
		if(audioFlock.children().length > 1){
			streamSupport.audioArray = streamSupport.audioArray.slice(0, 1);
			audioFlock.children().slice(1).remove();
		}
	}else{
		if(audioFlock.children().length == 1){
			domAudioDeleteTrigger.hide();
			domNewAudioTrigger.show();
		}else{
			domNewAudioTrigger.show();
			domAudioDeleteTrigger.show();
		}
	}
}

function loadXML(xmlText)
{
	var xmlDoc = null;  
/*	if(window.ActiveXObject) {
		xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
		xmlDoc.async = false;
		xmlDoc.loadXML(xmlText);
	}
	else {
		var parser=new DOMParser();
		xmlDoc = parser.parseFromString(xmlText,"text/xml");
	}*/
		
	try {
		var parser=new DOMParser();
		xmlDoc = parser.parseFromString(xmlText,"text/xml");
	}
	catch(ex) {
		alert(ex);
	}
	
	return xmlDoc;
}

function XmlToString(xmlDom) {
	var xml = null;
	/*var bi = uBrowserInfo();
	if(bi.msie) {
		xml = xmlDom.xml;
	}
	else {
		xml = (new XMLSerializer()).serializeToString(xmlDom);
	}*/
	
	try {
		xml = (new XMLSerializer()).serializeToString(xmlDom);
	}
	catch(ex) {
		alert(ex);
	}
	
	return xml;
}

function parseDom(arg) {
	var objE = document.createElement("div");
	objE.innerHTML = arg;
	return objE.childNodes;
}

function httpPost(url, data, callback) {
	function HandleResponse(xmlText) {
		var bRet = false;
		var xml = loadXML(xmlText);
		//var $xml = $(xml);
		var $error = $(xml).find("error");
		if($error.length == 0) {
			alert(str_common.saveSuccessed);
			bRet = true;
		} else {
			var text = $error.text();
			text = str_common.saveFailed + "\r\n" + text;
			alert(text);
			bRet = false;
		}
		return bRet;
	}
	
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState==4) {
			if(xmlhttp.status==200) {
				var ret = HandleResponse(xmlhttp.responseText);
				if(ret) {
					if($.isFunction(callback)) {
						callback(xmlhttp.responseText);
					}
				}
			} else {
				alert(str_common.saveFailed);
			}
		}
	};
    xmlhttp.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
    xmlhttp.send(data);
}

/*
 * mode = "POST", "GET", "PUT", "DELETE"
 * */
function RestApi(url, mode, xml, fnOnResponse, fnOnFailed) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open(mode, url, true);
    xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				if($.isFunction(fnOnResponse)) {
					fnOnResponse(xmlhttp.responseText);
				}
			} else {
				if($.isFunction(fnOnFailed)) {
					fnOnFailed();
				}
			}
		}
	};
    xmlhttp.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
    xmlhttp.send(xml);
}

function uGetProtocol(uri) {
	if(uri == null) return null;
	var pos = uri.indexOf("://");
	var protocol = uri.substring(0, pos);
	protocol = protocol.toLowerCase();
	return protocol;
}

function uNewGuid()
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
    }
    return guid;    
}

/*Get index of an array value.
 * */   
Array.prototype.getIndexByValue = function(value)  
{  
    var index = -1;  
    for (var i = 0; i < this.length; i++)  
    {  
        if (this[i] == value)  
        {  
            index = i;  
            break;  
        }  
    } 
    return index;  
};

function GetLanguage(c3) {
	var len = languageMap.length;
	for(var i = 0; i < len; i++) {
		if(languageMap[i].key == c3) {
			return languageMap[i].value;
		}
	}
	return null;
};

function URI2HttpURL(uri) {
	if(uri == null) return null;
	var httpURL = null;
	var protocol = uGetProtocol(uri);
	if(protocol == "http" || protocol == "rtsp" || protocol == "rtmp") {
		httpURL = uri;
	} else {
		var _requestURL = location.href.substring(0, location.href.lastIndexOf("/")+1);
		var _action = "tms.content?";
		var _param = "url=" + (uri);
		httpURL = _requestURL + _action + _param;
	}
	return httpURL;
};

function ParseMaterial(data) {
	var $div = $("<div></div>");
	$div.append(data);
	var arr = [];
	$(".MaterialItem", $div).each(function() {
		var o = {};
		o.id = $(".id", this).text();
		o.name = $(".name", this).text();
		o.materialType = $(".materialType", this).text();
		o.content = $(".content", this).text();
		arr.push(o);
	})
	
	return arr;
};

function copy_clip(txt) {
	var ret = true;
    if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;
    } else if (window.netscape) {
            try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                    alert("您的firefox安全限制限制您进行剪贴板操作，请在新窗口的地址栏里输入'about:config'然后找到'signed.applets.codebase_principal_support'设置为true'");
                    return false;
            }
            var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                    return false;
            var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                    return false;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip)
                    return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
    }
    else {
    	ret = false;
    }
    
    return ret;
}


function uGetHexId(size) {
	var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var cs = "";
    for(var i = 0; i < size; i++) {  
    	var n = Math.floor(Math.random() * digits.length);
    	cs += digits[n];
    }  
    return cs;  
}

/**
 * Generate a random string, which is composed of alphabet and number.
 */
function uGetRandomString(len) {
	if(len == null) {
		len = 16;
	}	

	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
	var maxPos = chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

Array.prototype.remove=function(dx) { 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i] 
        } 
    } 
    this.length -= 1 ;
};

function ParseMonitorUrl(data) {
	if(data == null) return null;
	var $data = $(data);
	var text = $("#monitorUrl", $data).text();
	return text;
}