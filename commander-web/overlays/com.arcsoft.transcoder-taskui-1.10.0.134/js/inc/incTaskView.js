var g_viewTask = null;

function onViewTaskLoaded() {
	g_viewTask = new ViewTask();
	g_viewTask.init();
}

function ViewTask() {
	this.dom = null;
	this.input = null;
	this.outputGroups = [];
}

ViewTask.prototype = {
	init : function() {
		this.dom = $("body").get(0);
		
		this.licenseControl();
		this.updateUI();
		this.initSub();
	},
	
	licenseControl : function() {
		if(GetLicense(license.TRANS_GPU_ID) != license.ENABLED) {
			$(JS_LICENSE_TRANS_GPU_ID, this.dom).hide();
		}
		
		if(GetLicense(license.TRANS_VIDEO_DECODING) != license.ENABLED) {
			$(JS_LICENSE_TRANS_VIDEO_DECODING, this.dom).hide();
		}

		if(GetLicense(license.PRIORITY) != license.ENABLED) {
			$(JS_TASK_PRIORITY_MODULE, this.dom).hide();
		}
	},
	
	updateUI : function() {
		var arr = null;
		var key = null;
		var value = null;
		
		key = $(vtjs.ViewTaskGpuId, this.dom).text();
		arr = taskData.getGpuId();
		value = uGetMapValue(arr, key);
		$(vtjs.ViewTaskGpuId, this.dom).text(value);
		
		key = $(vtjs.ViewTaskVideoDecoding, this.dom).text();
		arr = taskData.getVideoDecoding();
		value = uGetMapValue(arr, key);
		$(vtjs.ViewTaskVideoDecoding, this.dom).text(value);
	},
	
	initSub : function() {
		var context = this;
		this.input = new ViewInput();
		this.input.init($(JS_INPUT, this.dom).get(0));
		
		$(JS_OUTPUT_GROUP_TAB, this.dom).each(function(i) {
			var outputGroup = new ViewOutputGroup();
			outputGroup.init(this);
			context.outputGroups.push(outputGroup);
		});
	},
	
	_end : ""
};

/**
 * 
 * @param {Element}nodeWithToggleIcon
 * @param {Element}ownerNode  containers Body
 */
function toggleViewBlock(nodeWithToggleIcon, ownerNode){
	var b = uFindFirstNode(ownerNode, function(n){return uIsContainCssClass(n,'Body');},true);
	if(uIsContainCssClass(nodeWithToggleIcon, "IconCollapsed")){
		$(b).show();
		uReplaceStyle(nodeWithToggleIcon,"IconCollapsed","IconExpand");
	}else{
		$(b).hide();
		uReplaceStyle(nodeWithToggleIcon,"IconExpand","IconCollapsed");
	}
}
