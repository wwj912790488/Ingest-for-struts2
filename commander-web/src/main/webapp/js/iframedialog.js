/**
 * Save all dialogs.
 */
var dialogs = new Object();

/**
 * Iframe dialog.
 * 
 * @param {String} url - the dialog url
 * @param {Function} callback - callback when dialog is finished
 * @param {Object} args - the callback arguments
 */
function IframeDialog(url, callback, args) {
	/* private variables */
	var $root = null;
	var $mask = null;
	var $this = this;
	var $width = 800;
	var $height = 600;
	var $name = null;
	var $url = url;
	var $callback = callback;
	var $args = args;
	var $result = -1;
	var $contentCell = null;
	var $animation = false;

	/**
	 * Resize the window.
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
		}
	}

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
		if ($name == null) {
			var zorder = dialogZOrder;
			dialogZOrder += 5;

			// create mask layer.
			$mask = top.document.createElement("div");
			$($mask).addClass("message_dialog_mask_layer");
			$($mask).css("z-index", zorder++);
			$(top.document.body).append($mask);

			// create dialog box.
			var table = top.document.createElement("table");
			$(table).addClass("message_dialog_box");
			$(table).css("z-index", zorder++);
			$(table).attr("cellpadding", 0);
			$(table).attr("cellspacing", 0);
			$(top.document.body).append(table);
			$root = table;

			// create dialog frame
			var row = table.insertRow(table.rows.length);
			$(row.insertCell(0)).addClass("message_dialog_lt1");
			$(row.insertCell(1)).addClass("message_dialog_lt2");
			$(row.insertCell(2)).addClass("message_dialog_tc");
			$(row.insertCell(3)).addClass("message_dialog_rt1");
			$(row.insertCell(4)).addClass("message_dialog_rt2");
			row = table.insertRow(table.rows.length);
			$(row.insertCell(0)).addClass("message_dialog_lt3");
			$(row.insertCell(1)).addClass("message_dialog_main");
			$(row.insertCell(2)).addClass("message_dialog_rt3");
			row = table.insertRow(table.rows.length);
			$(row.insertCell(0)).addClass("message_dialog_lc");
			$(row.insertCell(1)).addClass("message_dialog_rc");
			row = table.insertRow(table.rows.length);
			$(row.insertCell(0)).addClass("message_dialog_lb3");
			$(row.insertCell(1)).addClass("message_dialog_rb3");
			row = table.insertRow(table.rows.length);
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

			// add iframe for sub page.
			$name = "__dialog_frame__" + new Date().getTime() + "_" + parseInt(Math.random()*(65535-10000+1) + 10000);
			$($contentCell).html("<div style='width: 100%; height: 100%'><iframe name='" + $name + "' src='" + $url + "' frameborder=0 style='width: 100%; height: 100%'></iframe></div>");
			dialogs[$name] = $this;

			// resize the message box.
			resize();

			// bind events.
			// disable it currently.
			// $($mask).mousedown(function(){$this.close();});
		}

		// show dialog.
		$($mask).fadeIn();
		if ($animation) {
			$($root).fadeIn();
		} else {
			$($root).show();
		}
	};

	/**
	 * Set result.
	 * 
	 * @param {int} result - the code.
	 */
	this.setResult = function(result) {
		$result = result;
	};

	/**
	 * Done with result code.
	 */
	this.done = function(result) {
		$this.setResult(result);
		$this.close();
	};

	/**
	 * Success done.
	 */
	this.success = function() {
		$this.done(0);
	};

	/**
	 * Close this dialog.
	 */
	this.close = function() {
		if ($name != null) {
			dialogs[$name] = null;
			$name = null;
		}
		if ($mask != null) {
			$($mask).fadeOut(300, function() {
				$($mask).remove();
			});
			$mask = null;
		}
		if ($root != null) {
			// if dialog is shown, callback after fade out.
			if ($animation) {
				$($root).fadeOut(300, function() {
					if (typeof($callback) === 'function') {
						$callback.call($this, $result, $args);
					}
					$($root).remove();
					$callback = null;
					$args = null;
				});
			} else {
				if (typeof($callback) === 'function') {
					$callback.call($this, $result, $args);
				}
				$($root).remove();
				$callback = null;
				$args = null;
			}
			$root = null;
		} else {
			// if dialog is not shown, callback directly.
			if (typeof($callback) === 'function') {
				$callback.call($this, $result, $args);
			}
			$callback = null;
			$args = null;
		}
	};

}

