/**
 * Message dialog example.
 */
function showDialogExample() {
	// create dialog with title and message.
	var dialog = new window.top.MessageDialog("title", "message");
	// two custom arguments for dialog.
	dialog.myargs1="args1";
	dialog.myargs2="args2";
	// add button1 without button args.
	dialog.addButton("button1", function() {
		alert("myargs1: " + this.dialog.myargs1);
		alert("myargs2: " + this.dialog.myargs2);
	});
	// add button2 with button args.
	dialog.addButton("button2", function(args) {
		alert("myargs1: " + this.dialog.myargs1);
		alert("myargs2: " + this.dialog.myargs2);
		alert("buttonargs: " + args);
	}, "argsforbutton");
	// set the dialog size.
	dialog.setSize(800, 600);
	// show dialog.
	dialog.show();
}

/**
 * Iframe dialog example.
 */
function showIframeDialog() {
	var dialog = new IframeDialog("www.baidu.com", function(result, args) {
		alert("result: " + result);
		alert("args: " + args);
	}, "args");
	dialog.setSize(800, 600);
	dialog.show();
}

/*
<div style="display: hidden" id="mydialog">
<div class="template_title">MyTitle</div>
<div class="template_content">
	<div id="content" style="width: 100%; height: 100%">
	Name: <input id="myName" type="text"/>
	</div>
</div>
<div class="template_button">
	<input id="ok" type="button" value="OK"/>
	<input id="cancel" type="button" value="Cancel"/>
</div>
</div>
*/
function showTemplateDialog() {
	var dialog = new window.top.TemplateDialog($("#mydialog"));
	dialog.click("#ok", function() {
		this.dialog.find("#myName").val("I'm a dialog");
	});
	dialog.click("#cancel", function() {
		this.dialog.close();
	});
	dialog.show();
}
