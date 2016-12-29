(function($){
	$.extend({
		/**
		 * Override jquery  ajax get method, Support to set cache parameter.
		 * Note: if isCache parameter is null or not exists, then cache will use default value true.
		 * Useage:
		 * 			$.get('demo.action', function(){...}) - Cache 
		 * 			$.get('demo.action', function(){...}, false) - Don't cache current request
		 * 			$.get('demo.action', {name : '111'}, function(){....}, false, 'html') - Don't cache current request
		 * @returns jquery object
		 */
		get : function(url, data, callback, isCache, type ){
			// shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				if(jQuery.type(callback) == "boolean"){
					type = isCache;
					isCache = callback;
				}
				callback = data;
				data = undefined;
			}
			return jQuery.ajax({
				url: url,
				type: 'get',
				dataType: type,
				data: data,
				cache : (isCache || false),
				success: callback
			});
		}
	});
})(jQuery);