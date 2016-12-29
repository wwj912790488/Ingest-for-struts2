var dialogZOrder = 100;

/**
 * Message dialog.
 * 
 * @param {String} title - the dialog title
 * @param {String} message - the dialog message
 */
function MessageDialog(title, message) {
	/* private variables */
	var $root = null;
	var $buttons = new Array();
	var $mask = null;
	var $this = this;
	var $width = 400;
	var $height = 300;
	var $contentCell = null;
	var $animation = false;

	/* public variables */
	this.title = (title === undefined) ? "" : title;
	this.message = (message === undefined) ? "" : message;

	function DialogButton(text, callback, args) {
		this.text = text;
		this.callback = callback;
		this.args = args;
		this.dialog = $this;
	}

	function resize() {
		if ($root != null) {
			$($root).width($width + 28);
			$($root).height($height + 30);
			$($root).css("margin", "-" + ($height+28) / 2 + "px 0 0 -" + ($width+30)/2 + "px");
			$($contentCell).width($width);
			$($contentCell).height($height);
			$($root.rows[0].cells[2]).width($width-20);
			$($root.rows[2].cells[0]).height($height-20);
			// resize dialog message area height.
			var msgHeight = $height;
			var titleHeight = $($contentCell).find(".message_dialog_title").height();
			msgHeight -= titleHeight;
			if ($buttons.length > 0) {
				var buttonsHeight = $($contentCell).find(".message_dialog_buttons").height();
				msgHeight -= buttonsHeight;
			}
			$($contentCell).find(".message_dialog_msg").height(msgHeight);
		}
	}

	/**
	 * Add button to this dialog.
	 * 
	 * @param {String} text - the button text
	 * @param {Function} callback - the callback when button click
	 * @param {Object} args - the callback arguments
	 */
	this.addButton = function(text, callback, args) {
		var button = new DialogButton(text, callback, args);
		$buttons[$buttons.length] = button;
	};

	/**
	 * Set the size of message dialog.
	 * 
	 * @param {int} width
	 * @param {int} height
	 */
	this.setSize = function(width, height) {
		$width = width;
		$height = height;
		resize();
	};

	/**
	 * Show this dialog.
	 */
	this.show = function() {
		var zorder = dialogZOrder;
		dialogZOrder += 5;

		// create mask layer.
		$mask = top.document.createElement("div");
		$($mask).addClass("message_dialog_mask_layer");
		$($mask).css("z-index", zorder++);
		$(top.document.body).append($mask);

		// create dialog box.
		var frame = top.document.createElement("table");
		$(frame).addClass("message_dialog_box");
		$(frame).css("z-index", zorder++);
		$(frame).attr("cellpadding", 0);
		$(frame).attr("cellspacing", 0);
		$(top.document.body).append(frame);
		$root = frame;

		// create dialog frame
		var row = frame.insertRow(frame.rows.length);
		$(row.insertCell(0)).addClass("message_dialog_lt1");
		$(row.insertCell(1)).addClass("message_dialog_lt2");
		$(row.insertCell(2)).addClass("message_dialog_tc");
		$(row.insertCell(3)).addClass("message_dialog_rt1");
		$(row.insertCell(4)).addClass("message_dialog_rt2");
		row = frame.insertRow(frame.rows.length);
		$(row.insertCell(0)).addClass("message_dialog_lt3");
		$(row.insertCell(1)).addClass("message_dialog_main");
		$(row.insertCell(2)).addClass("message_dialog_rt3");
		row = frame.insertRow(frame.rows.length);
		$(row.insertCell(0)).addClass("message_dialog_lc");
		$(row.insertCell(1)).addClass("message_dialog_rc");
		row = frame.insertRow(frame.rows.length);
		$(row.insertCell(0)).addClass("message_dialog_lb3");
		$(row.insertCell(1)).addClass("message_dialog_rb3");
		row = frame.insertRow(frame.rows.length);
		$(row.insertCell(0)).addClass("message_dialog_lb1");
		$(row.insertCell(1)).addClass("message_dialog_lb2");
		$(row.insertCell(2)).addClass("message_dialog_bc");
		$(row.insertCell(3)).addClass("message_dialog_rb1");
		$(row.insertCell(4)).addClass("message_dialog_rb2");

		// get the content cell.
		$contentCell = $root.rows[1].cells[1];
		$($contentCell).attr("rowspan", 3);
		$($contentCell).attr("colspan", 3);
		$($contentCell).attr("display", 'block');

		// create dialog box.
		var table = top.document.createElement("table");
		$(table).css("width", "100%");
		$(table).css("height", "100%");
		$(table).attr("cellpadding", 0);
		$(table).attr("cellspacing", 0);
		$($contentCell).append(table);

		// add dialog title.
		cell = table.insertRow(table.rows.length).insertCell(0);
		$(cell).addClass("message_dialog_title");
		$(cell).html(this.title);

		// add dialog message.
		cell = table.insertRow(table.rows.length).insertCell(0);
		$(cell).addClass("message_dialog_msg");
		$(cell).html(this.message);

		// add dialog buttons.
		if ($buttons.length > 0) {
			cell = table.insertRow(table.rows.length).insertCell(0);
			$(cell).addClass("message_dialog_buttons");

			for (var i = 0; i<$buttons.length; i++) {
				var dialogButton = $buttons[i];
				var button = top.document.createElement("a");
				$(cell).append(button);
				$(button).attr("href", "javascript: void(0)");
				$(button).addClass("message_dialog_button");
				$(button).html(dialogButton.text);
				button.button = dialogButton;
				button.onclick = function() {
					$this.close(function(_button_) {
						if (typeof(_button_.callback) === 'function') {
							_button_.callback.call(_button_, _button_.args);
						}
					}, this.button);
				};
			}
		}

		// resize the message box.
		resize();

		// show dialog.
		// $($mask).mousedown(function(){$this.close();});
		$($mask).fadeIn();
		if ($animation)
			$($root).fadeIn();
		else
			$($root).show();
	};

	/**
	 * Close this dialog.
	 */
	this.close = function(callback, args) {
		if ($mask != null) {
			$($mask).fadeOut(300, function() {
				$($mask).remove();
			});
			$mask = null;
		}
		if ($root != null) {
			if ($animation) {
				// if dialog is shown, callback after fade out.
				$($root).fadeOut(300, function() {
					$($root).remove();
					if (typeof(callback) === 'function') {
						callback.call($this, args);
					}
				});
			} else {
				$($root).remove();
				if (typeof(callback) === 'function') {
					callback.call($this, args);
				}
			}
			$root = null;
		} else {
			// if dialog is not shown, callback directly.
			if (typeof(callback) === 'function') {
				callback.call($this, args);
			}
		}
	};
}
