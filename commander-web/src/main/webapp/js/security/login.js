function Login(){
	
};


Login.prototype.init = function(){
	$("input[type='text']").focus();
	$("input[type='text']").bind('keyup', function(event) {
		if (event.keyCode == 13) {
			$("input[type='password']").focus();
		}
	});
	$(".input_submit").mouseup(function(){
		$(this).css("background-color", "#269BDE");
	});
	$(".input_submit").mousedown(function(){
		$(this).css("background-color", "#34B4E3");
	});
	$("input[type='password']").bind('keyup', function(event) {
		if (event.keyCode == 13) {
			$(".input_submit").click();
		}
	});
};
