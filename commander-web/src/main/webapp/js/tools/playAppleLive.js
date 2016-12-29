function PlayAppleLive() {
	var JS_PLAY_APPLE_LIVE = ".PlayAppleLive";
	var JS_FILE_LIST_CONTAINER = ".FileListContainer";
	
	var JS_MEDIA_PATH = "input[name='MediaPath']";
	var JS_ADD_MEDIA_PATH_TRIGGER = ".AddMediaPathTrigger";
	

	this.dom = null;
	
	this.init = function() {
		this.dom = $(JS_PLAY_APPLE_LIVE).get(0);
		
		this.updateRoot();
		
		this.bind();
	};
	
	this.updateRoot = function() {
		var pageContext = GetPageContext();
		var $container = $(JS_FILE_LIST_CONTAINER, this.dom);
		this.requestFileList(pageContext.rootPath, $container.get(0));
	};
	
	this.bind = function() {
		var context = this;
		$(JS_ADD_MEDIA_PATH_TRIGGER, this.dom).click(function() {
			context.addMediaPath();
		});
	};
	
	this.addMediaPath = function() {
		var path = $(JS_MEDIA_PATH, this.dom).val();
		var context = this;
		linkPath(path, function() {
			context.updateRoot();
		});
	};
	
	this.requestFileList = function(path, domParent) {
		$('ul', domParent).remove();
		var context = this;
		var url = "getDirFiles";
		var param = {dir: path};
		$.post(url, param, function(data) {
			var $data = $(data);
			context.updateFileList($data.get(0));
			context.bindFileList($data.get(0));
			$(domParent).append($data);
		});
	};
	
	this.bindFileList = function(dom) {
		var context = this;
		$('li a', dom).click(function() {
			var $parent = $(this).parent(); 
			if($parent.hasClass('directory') ) {
				if( $parent.hasClass('collapsed') ) {
					$parent.find('UL').remove(); // cleanup
					str_0 = $(this).attr('rel').match( /.*\// );
					str_1 = encodeURI(str_0);
					$parent.removeClass('collapsed').addClass('expanded');
					context.requestFileList(str_1, $parent.get(0));
				} else {
					// Collapse
					$parent.find('UL').remove(); // cleanup
					$parent.removeClass('expanded').addClass('collapsed');
				}
			} else if( $parent.hasClass('file') ) {
				//start play
				str_0 = $(this).attr('rel');
				var uri = path2Uri(str_0);
				window.location = uri;
			}

			return false;
		});
	};
	
	this.updateFileList = function(dom) {
		$(dom).show();
		$('li a', dom).each(function() {
			var $parent = $(this).parent(); 
			if($parent.hasClass('file')) {
				var str_0 = $(this).attr('rel').match(/.m3u8/);
				if(str_0 == null) {
					$parent.hide();
				}
			}
		});
	};
	
	/*static function*/
	function path2Uri(path) {
		var pageContext = GetPageContext();
		var rootPath = pageContext.rootPath.replace(/\\/gi, "/");
		var uri = path.replace(rootPath, pageContext.baseUri);
		return uri;
	};
	
	function linkPath(path, fnOnLinked) {
		var uri = "linkPath";
		var param = {filePath: path};
		$.post(uri, param, function(data) {
			var result = $(data).find("#result").text();
			if(result == "success") {
				var httpURI = $(data).find("#uri").text();
				fnOnLinked(httpURI);
			} else {
				fnOnLinked();					
			}
		});
	}
};
