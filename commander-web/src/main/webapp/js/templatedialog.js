/**
 * Template dialog.
 * 
 * @param {jQuery Object} template - the template jQuery object
 */
function TemplateDialog(template) {
	/* public variables */
	this.maskAnimation = true;
	this.maskTransparent = false;

	/* private variables */
	var $root = null;
	var $mask = null;
	var $this = this;
	var $width = 400;
	var $height = 300;
	var $contentCell = null;
	var $animation = false;
	var $template = null;
	var $buttons = null;
	var $content = null;
	var $buttonPanel = null;

	// create mask layer.
	$mask = top.document.createElement("div");
	$(top.document.body).append($mask);

	// create dialog box.
	var frame = top.document.createElement("table");
	$(frame).addClass("message_dialog_box");
	$(frame).attr("cellpadding", 0);
	$(frame).attr("cellspacing", 0);
	$(frame).attr("display", "none");
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
	$content = table;
	switchTemplate(template);

	function switchTemplate(template){
		if ($template != null){
			$($content).html("");
		}
		
		$template = template;
		$buttons = $template.find(".template_button");
		// add dialog title.
		cell = table.insertRow(table.rows.length).insertCell(0);
		$(cell).addClass("message_dialog_title");
		$(cell).html($template.find(".template_title").html());

		// add dialog message.
		cell = table.insertRow(table.rows.length).insertCell(0);
		$(cell).addClass("message_dialog_msg");
		var template_content = $template.find(".template_content");
		var parent_align = template_content.attr("parent_align");
		if (parent_align != null){
			$(cell).attr("align", parent_align);
		}
		$(cell).html(template_content.html());

		// add dialog buttons.
		if ($buttons.length > 0) {
			cell = table.insertRow(table.rows.length).insertCell(0);
			$buttonPanel = cell;
			$(cell).addClass("message_dialog_buttons");
			for (var i = 0; i<$buttons.length; i++) {
				$(cell).append($($buttons[i]).html());
			}
		}
	}

	/**
	 * Resize the dialog.
	 */
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
	 * switch page
	 */
	this.switchTemplate = function(template){
		switchTemplate(template);
	};

	/**
	 * Find the specified elements in this dialog.
	 * 
	 * @param {String} str - jQuery selection expression
	 */
	this.find = function(str) {
		return $($content).find(str);
	};

	/**
	 * Binding click event for the specified button id.
	 * 
	 * @param {String} id - jQuery selection expression
	 * @param {Function} callback - the click callback
	 */
	this.click = function(id, callback) {
		if ($buttonPanel != null) {
			var button = $($buttonPanel).find(id);
			if (button && button.length > 0) {
				button.get(0).dialog = $this;
				button.click(callback);
			}
		}
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
		if ($this.maskTransparent) {
			$($mask).addClass("message_dialog_mask_layer_empty");
		} else {
			$($mask).addClass("message_dialog_mask_layer");
		}

		// set the dialog z-index.
		var zorder = dialogZOrder;
		dialogZOrder += 5;
		$($mask).css("z-index", zorder++);
		$($root).css("z-index", zorder++);

		// resize the message box.
		resize();

		// show dialog.
		if ($this.maskAnimation)
			$($mask).fadeIn();
		else
			$($mask).show();
		if ($animation)
			$($root).fadeIn();
		else
			$($root).show();
	};

	/**
	 * Hide this dialog
	 */
	this.hide = function() {
		$($mask).hide();
		$($root).hide();
	};

	/**
	 * Close this dialog.
	 */
	this.close = function() {
		if ($mask != null) {
			if ($this.maskAnimation) {
				$($mask).fadeOut(300, function() {
					$($mask).remove();
				});
			} else {
				$($mask).remove();
			}
			$mask = null;
		}
		if ($root != null) {
			if ($animation) {
				$($root).fadeOut(300, function() {
					$($root).remove();
				});
			} else {
				$($root).remove();
			}
			$root = null;
		}
	};

}
