var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_SPACE = 32;

var g_regKeyHandler = [];

function OnKeyDown(event) {
	var keyCode = event.keyCode;
	for(var i = 0; i < g_regKeyHandler.length; i++) {
		var fn = g_regKeyHandler[i];
		fn(keyCode);
	}
}

function RegKeyHandler(fn) {
	if(!$.isFunction(fn)) return; 
	g_regKeyHandler.push(fn);
}
