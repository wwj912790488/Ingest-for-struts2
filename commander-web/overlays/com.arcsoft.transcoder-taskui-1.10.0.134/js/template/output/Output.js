var JS_OUTPUT_EXPAND_ICON =".OutputExpandIcon";
var JS_OUTPUT_LINKED_STREAM	="select[name='LinkedStream']";
var JS_OUTPUT_PLAYLIST_NAME	="input[name='OutputPlaylistName']";

function OutputSupport() {
	var TAG_OUTPUT				="output";
	var TAG_OUTPUT_STREAM_REF	="streamref";
	
	var FIELD_OUTPUT			="liveOutputs";
	var FIELD_OUTPUT_STREAM_REF	="streamAssemblyId";
	var FIELD_OUTPUT_PLAYLIST_NAME	="playlistName";

	var fieldMap = [
		{key: FIELD_OUTPUT_STREAM_REF, value: JS_OUTPUT_LINKED_STREAM},
		{key: FIELD_OUTPUT_PLAYLIST_NAME, value: JS_OUTPUT_PLAYLIST_NAME}
		];
	
	var tagMap =[
		{key: TAG_PLAYLIST_NAME,		value: JS_OUTPUT_PLAYLIST_NAME}
		];
	          		
	this.dom = null;
	this.outputGroup = null;
	this.expand = false;
	
	this.prefixField = "";
	this.myField = FIELD_OUTPUT;
	this.fieldIndex = null;
	
	this.SetDOM = function(dom) {
		this.dom = dom;
	};
	
	this.Create = function(domOutputGroup) {
		var $tmp = $(JS_OUTPUT_TEMPLATE);
		if($tmp.lenght == 0) return null;
		
		var $outputGroup = $(domOutputGroup);
		var	pilot = $outputGroup.find(JS_OUTPUT_FLOCK).last();
		if(pilot.length == 0) return null;
		
		var $output = $tmp.clone();
		$output.show();
		pilot.append($output.get(0));
		this.SetDOM($output.get(0));
		this.LicenseControl();
		this.Bind();
		this.UpdateStreamList();
		return this.dom;
	};
	
	this.Init = function(dom) {
		this.SetDOM(dom);
		this.LicenseControl();

		this.Bind();
		this.UpdateStreamList();
	};
	
	this.LicenseControl = function() {
		if(GetLicense(license.OUTPUT_PREVIEW) != license.ENABLED) {
			$(JS_OUTPUT_PREVIEW_TRIGGER, this.dom).remove();
		}
		
		if(GetLicense(license.OUTPUT_HLS_PLAYLIST_NAME_MODE) != license.ENABLED) {
			$(".OutputPlaylistName", this.dom).remove();
		}
	};
	
	this.SetOutputGroup = function(outputGroupSupport) {
		this.outputGroup = outputGroupSupport;
	};
	
	this.Bind = function() {
		var $output = $(this.dom);
		var context = this;
		
		$output.find(JS_DELETE_OUTPUT_TRIGGER).click(function() {
			context.outputGroup.DeleteOutput(context);
		});
		
		$output.find(JS_EDIT_OUTPUT_TRIGGER).click(function(){
			if(g_focusOutput == context) {
				context.CloseStream();
			} else {
				context.ExpandStream();
			}
		});
		
		$(JS_OUTPUT_LINKED_STREAM, this.dom).change(function() {
			context.outputGroup.onTotalBitrateChange();
		});
	};
	
	this.UpdateStreamList = function() {
		var arr = g_taskSupport.GetStreamList();
		uUpdateSelect($(JS_OUTPUT_LINKED_STREAM, this.dom).get(0), arr);
	};
	
	this.ShowPreview = function() {
		var streamId = this.GetReferencedStreamId();
		var streamSupport = g_taskSupport.GetStream(streamId);
		streamSupport.ShowPreview();
	};
	
	this.CloseStream = function() {
		if(g_focusOutput != this) return;
		var $output = $(this.dom);
		var domStream = null;
		var ts = g_taskSupport;
		domStream = $output.find(JS_STREAM).get(0);
		ts.RestoreStream(domStream);
		g_focusOutput = null;
		this.expand = false;
		this.UpdateExpandIcon();
	};
	
	this.ExpandStream = function() {
		var $output = $(this.dom);
		var ts = g_taskSupport;
		if(g_focusOutput != null) {
			g_focusOutput.CloseStream();
		}
		
		var streamId = this.GetReferencedStreamId();
		var streamSupport = ts.GetStream(streamId);
		$output.find(JS_OUTPUT_STREAM_EXPAND).append(streamSupport.dom);
		g_focusOutput = this;
		this.expand = true;
		this.UpdateExpandIcon();
	};
	
	this.UpdateExpandIcon = function() {
		var $icon = $(this.dom).find(JS_OUTPUT_EXPAND_ICON);
		if(this.expand) {
			$icon.removeClass(CLASS_ICON_ARROW_RIGHT).addClass(CLASS_ICON_ARROW_DOWN);
		} else {
			$icon.removeClass(CLASS_ICON_ARROW_DOWN).addClass(CLASS_ICON_ARROW_RIGHT);
		}
	};
	
	this.Clone = function() {
		var $output = $(this.dom);
		var $newOutput = $output.clone();
		var newOutputSupport = new OutputSupport();
		newOutputSupport.Init($newOutput[0]);
		
		return newOutputSupport;
	};
	
	this.GetReferencedStreamId = function() {
		var value = $(JS_OUTPUT_LINKED_STREAM, this.dom).val();
		return value;
	};
	
	this.SetIndex = function(index) {
		$(this.dom).find(JS_OUTPUT_INDEX).text(index+1);
	};

	this.Delete = function() {
		$(this.dom).remove();
	};
	
	this.UpdateStream = function(streamSupport) {
		var $output = $(this.dom);
		
		var streamId = streamSupport.GetId();
		$output.find(JS_OUTPUT_LINKED_STREAM).val(streamId);
		
		var summary = streamSupport.FormatText();
		$output.find(JS_SUMMARY).text(summary);
	};
	
	this.XML = function(xml) {
		var value = null;
		
		xml.BeginNode(TAG_OUTPUT);
		
		value = this.GetReferencedStreamId();
		xml.Attrib(TAG_OUTPUT_STREAM_REF, value);
		
		var value = null;
		for(var i = 0; i < tagMap.length; i++) {
			value = this.GetValueByJS(tagMap[i].value);
			if(value != null) {
				xml.Node(tagMap[i].key, value);
			}
		}
		
		xml.EndNode();
	};
	
	/* Field operate */
	this.SetPrefixField = function(prefix) {
		this.prefixField = prefix;
	};
	
	this.SetFieldIndex = function(i) {
		this.fieldIndex = i;
	};
	
	this.GetFullField = function() {
		var field = "";
		if(this.fieldIndex == null) {
			field = this.prefixField + this.myField + ".";
		} else {
			field = this.prefixField + this.myField + "[" + this.fieldIndex + "].";
		}
		return field;
	};
	
	this.UpdateElementName = function() {
		var len = fieldMap.length;
		var fullField = this.GetFullField();
		for(var i = 0; i < len; i++) {
			var $sel = $(fieldMap[i].value, this.dom);
			var elName = fullField + fieldMap[i].key;
			$sel.attr("name", elName);
		};
		this.UpdateSubElement();
	};
	
	this.UpdateSubElement = function() {
	};
	/* Field operate end */
}

OutputSupport.prototype = {
	getTotalBitrate : function() {
		var streamId = this.GetReferencedStreamId();
		var streamSupport = g_taskSupport.GetStream(streamId);
		
		var totalBitrate = null;
		if(streamSupport != null) {
			totalBitrate = streamSupport.getTotalBitrate();
		}
		
		return totalBitrate;
	},

	GetValueByJS : function(selector) {
		var $select = $(selector, this.dom);
		var value = null;
		if($select.attr('type') == "checkbox") {
			if($select.attr('checked') == null) {
				value = "0";
			} else {
				value = "1";
			}
		} else {
			value = $select.val();
		}
		return value;
	},
	
	showPlaylistName: function(bShow) {
		if(bShow) {
			$(".OutputPlaylistName", this.dom).show();
		}
		else {
			$(".OutputPlaylistName", this.dom).hide();
			$(JS_OUTPUT_PLAYLIST_NAME, this.dom).val("");
		}
	},
}