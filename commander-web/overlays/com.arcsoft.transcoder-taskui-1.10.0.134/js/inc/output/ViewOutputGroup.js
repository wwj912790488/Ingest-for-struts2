function ViewOutputGroup() {
	this.dom = null;
	this.outpus = [];
}

ViewOutputGroup.prototype = {
	init : function(dom) {
		this.dom = dom;
		
		this.licenseControl();
		
		this.initSub();
	},
	
	licenseControl : function() {
	},
	
	initSub : function() {
		var context = this;
		
		$(vtjs.OutputStream, this.dom).each(function() {
			var output = new ViewOutput();
			output.init(this);
			context.outpus.push(output);
		});
	},
	
	_end : ""
};

