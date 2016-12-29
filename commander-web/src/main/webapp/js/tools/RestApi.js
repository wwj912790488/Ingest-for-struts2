function RestApi() {
	var str_saveFailed = "Save Failed!";
	var str_saveSuccessed = "Save Successed!";
	
	var JS_REST_BODY = ".RestApiBody";
	var JS_REST_SUBMIT = ".RestSubmit";
	var JS_REST_RESULT = "textarea[name='RestResult']";
	var JS_REST_URL ="input[name='RestUrl']";
	var JS_REST_MODE ="select[name='RestMode']";
	var JS_REST_XML ="textarea[name='RestXml']";
	
	this.dom = null;
	
	this.Init = function() {
		this.dom = $(JS_REST_BODY).get(0);
		
		var requestURL = location.href.substring(0, location.href.lastIndexOf("/")+1)+"api/";
		$(JS_REST_URL, this.dom).val(requestURL);
		
		this.Bind();
	};
	
	this.Bind = function() {
		var context = this;
		$(JS_REST_SUBMIT, this.dom).click(function() {
			context.Submit();
		});
	};
	
	this.Submit = function() {
		var url = $(JS_REST_URL, this.dom).val();
		var mode = $(JS_REST_MODE, this.dom).val();
		var data = $(JS_REST_XML, this.dom).val();
		httpRequest(url, mode, data, null);
	};
	
	function httpRequest(url, mode, data, callback) {
		var xmlhttp;
	    xmlhttp = new XMLHttpRequest();
	    xmlhttp.open(mode, url, true);
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
					alert(str_saveFailed);
				}
			}
		};
	    xmlhttp.setRequestHeader("Content-Type","text/xml; charset=utf-8");
	    xmlhttp.send(data);
	}
	
	function HandleResponse(xmlText) {
		var bRet = false;
		$(JS_REST_RESULT, this.dom).val(xmlText);
		
		/*
		var xml = loadXML(xmlText);
		var $error = $(xml).find("error");
		if($error.length == 0) {
			//alert(str_saveSuccessed);
			bRet = true;
		} else {
			var text = $error.text();
			text = str_saveFailed + "\r\n" + text;
			//alert(text);
			bRet = false;
		}
		return bRet;*/
	}
};
