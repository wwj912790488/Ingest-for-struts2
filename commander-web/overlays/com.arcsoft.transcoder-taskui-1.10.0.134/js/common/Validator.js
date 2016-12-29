var VALIDATOR_TYPE_EXTENSION = 0;	//param: {ext: "srt"}
var VALIDATOR_TYPE_FLOAT = 1;	//param: {min: 0.123, max: 123.456, recommend: 0}
var VALIDATOR_TYPE_INTEGER = 2;	//param: {min: -123, max: 456, recommend: 0, warning: true, canEmpty: false}
var VALIDATOR_TYPE_IP = 3; //param: {}
var VALIDATOR_TYPE_COLOR = 4; //param: {recommend: ffffff}
var VALIDATOR_TYPE_HMSF = 5; //param: {recommend: ffffff}
var VALIDATOR_TYPE_HMSM = 6; //param: {recommend: ffffff}

var MODIFICATION_FLOAT = 0x1001;	//param: {min: 0.123, max: 123.456, recommend: 0}
var MODIFICATION_INTEGER = 0x1002; //param: {min: -123, max: 456, recommend: 0, warning: true}

/**
 * @param dom
 * @param validatorMap {selector: ".Class", type: VALIDATOR_TYPE_EXTENSION, param: {min: -123, max: 456, recommend: 0} }
 */
function ValidatorBindArray(domParent, validatorMap) {
	var $dom = $(domParent);
	var len = validatorMap.length;
	for(var i = 0; i < len; i++) {
		var $validator = $dom.find(validatorMap[i].selector);
		$validator.change(validatorMap[i], ValidatorOnChange);
	}
};

/**
 * 
 * @param validatorMap {selector: ".Class", type: VALIDATOR_TYPE_EXTENSION, param: {min: -123, max: 456, recommend: 0} }
 * @param selector ".Class"
 * @returns
 */
function ValidatorGetItem(validatorMap, selector) {
	var len = validatorMap.length;
	for(var i = 0; i < len; i++) {
		if(validatorMap[i].selector == selector) {
			return validatorMap[i]; 
		}
	}
	return null;
}

function warning(bWarning, string) {
	if(bWarning == null) {
		bWarning = true;
	}
	if(bWarning) {
		alert(string);
	}
}

function ValidatorOnChange(event) {
	var dom = this;
	var o = event.data;
	
	if($.isFunction(o.fun)) {
		return o.fun(dom, o.param);
	}
	
	switch(o.type) {
		case VALIDATOR_TYPE_EXTENSION:
			ValidatorExtension(dom, o.param);
			break;
		case VALIDATOR_TYPE_FLOAT:
			ValidatorFloat(dom, o.param);
			break;
		case VALIDATOR_TYPE_INTEGER:
			ValidatorInteger(dom, o.param);
			break;
		case VALIDATOR_TYPE_IP:
			ValidatorIP(dom, o.param);
			break;
		case VALIDATOR_TYPE_COLOR:
			ValidatorColor(dom, o.param);
			break;
		case VALIDATOR_TYPE_HMSF:
			ValidatorHmsf(dom, o.param);
			break;
		case VALIDATOR_TYPE_HMSM:
			ValidatorHmsm(dom, o.param);
			break;
		case MODIFICATION_INTEGER:
			ModificationInteger(dom, o.param);
			break;
		case MODIFICATION_FLOAT:
			ModificationFloat(dom, o.param);
			break;
		default:
			break;
	}
}

function ValidatorExtension(dom, param) {
	if(dom == null || param == null || param.ext == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "\\.(" + param.ext + ")$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	ret = regExp.test(value);
	
	if(!ret) {
		var string = str_warning.fileExtension.format(param.ext);
		alert(string);
	}
	
	return ret;
}

function ValidatorFloat(dom, param) {
	if(dom == null || param == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "^\\d+(\\.\\d+)?$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	ret = regExp.test(value);
	
	var outStr = null;
	if(!ret) {
		outStr = str_warning.needFloat;
		warning(param.warning, outStr);
	}
	
	value = parseFloat(value);
	if(isNaN(value)) value = param.recommend;
	dom.value = uFormatNumber(value, "?.???");
	if(value > param.max || value < param.min) {
		outStr = str_warning.outOfRange.format(param.min, param.max);
		warning(param.warning, outStr);
	}
	
	return ret;
}

function ValidatorInteger(dom, param) {
	if(dom == null || param == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "^-?\\d+$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	var outStr = null;
	
	if(param.canEmpty && value.length == 0) {
		return;
	}
	
	ret = regExp.test(value);
	if(!ret) {
		outStr = str_warning.needInteger;
		warning(param.warning, outStr);
		dom.value = param.recommend;
		return;
	}
	
	value = parseInt(value);
	if(isNaN(value)) {
		outStr = str_warning.needInteger;
		warning(param.warning, outStr);
		dom.value = param.recommend;
		return;
	}
	
	if(param.max != null && value > param.max) {
		outStr = str_warning.outOfMaxRange.format(param.max);
		warning(param.warning, outStr);
		dom.value = param.recommend;
	}
	
	if(param.min != null && value < param.min) {
		outStr = str_warning.outOfMinRange.format(param.min);
		warning(param.warning, outStr);
		dom.value = param.recommend;
	}
	
	return ;
}

function ValidatorIP(dom, param) {
	if(dom == null || param == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "^((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	ret = regExp.test(value);
	if(!ret) {
		outStr = str_warning.invalidIp;
		warning(param.warning, outStr);
	}
	return ret;
}

function ValidatorColor(dom, param) {
	if(dom == null || param == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "^[0-9a-f]{6}$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	ret = regExp.test(value);
	if(!ret) {
		outStr = str_warning.invalidColor;
		warning(param.warning, outStr);
	}
	return ret;
}

function ValidatorHmsf(dom, param) {
	if(dom == null || param == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "^\\d+(:[0-5]?[0-9]){3}$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	ret = regExp.test(value);
	if(!ret) {
		outStr = str_warning.needHmsf;
		warning(param.warning, outStr);
	}
	return ret;
}

function ValidatorHmsm(dom, param) {
	if(dom == null || param == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "^\\d+(:[0-5]?[0-9]){2}:\\d{1,3}$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	ret = regExp.test(value);
	if(!ret) {
		outStr = str_warning.needHmsm;
		warning(param.warning, outStr);
		if(param.recommend != null) {
			dom.value = param.recommend; 
		}
	}
	return ret;
}

function ModificationFloat(dom, param) {
	if(dom == null || param == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "^-?\\d+(\\.\\d+)?$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	ret = regExp.test(value);
	
	var outStr = null;
	if(!ret) {
		outStr = str_warning.needFloat;
		warning(param.warning, outStr);
	}
	
	value = parseFloat(value);
	if(isNaN(value)) value = param.recommend;
	if(value > param.max || value < param.min) {
		outStr = str_warning.outOfRange.format(param.min, param.max);
		warning(param.warning, outStr);
	}
	if(value < param.min) value = param.min;
	if(value > param.max) value = param.max;
	dom.value = uFormatNumber(value, "?.???");
	
	return ret;
}

function ModificationInteger(dom, param) {
	if(dom == null || param == null) return false;
	var ret = true;
	var value = dom.value;
	var pattern = "^-?\\d+$";
	var attributes = "gi";
	var regExp = new RegExp(pattern, attributes);
	ret = regExp.test(value);
	
	var outStr = null;
	if(!ret) {
		outStr = str_warning.needInteger;
		warning(param.warning, outStr);
		dom.value = String(param.recommend);
		return;
	}
	
	value = parseInt(value);
	if(param.max != null) {
		if(value > param.max) {
			outStr = str_warning.outOfMaxRange.format(param.max);
			warning(param.warning, outStr);
			dom.value = param.recommend;
			return;
		}
	}
	
	if(param.min != null) {
		if(value < param.min) {
			outStr = str_warning.outOfMinRange.format(param.min);
			warning(param.warning, outStr);
			dom.value = param.recommend;
			return;
		}
	}
	
	return ret;
}