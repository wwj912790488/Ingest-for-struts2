/**
 * @param overflow null or json object. This value control the overflow x,y style.
 * 								for example:{x : 'auto', y : 'auto'}
 */
function DropdownMenu(callback, args, overflow) {
	/* private variables */
	var $root = null;
	var $this = this;
	var $width = 800;
	var $height = 600;
	var $name = null;
	var $mask = null;
	var $result = -1;
	var $callback = callback;
	var $args = args;
	var $contentCell = null;
	var $animation = false;
	var menuCount = 0;
	var $overflow = args;
	if(overflow){
		$overflow = overflow;
	}
	var id = "uuid" + new Date().getTime() + "_" + parseInt(Math.random()*(65535-10000+1) + 10000);

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
			if($overflow){
				var divFrame = $($root).find("div[name='"+$name+"']");
				divFrame.css("height", $height);
				if($overflow.x){
					divFrame.css("overflow-x", $overflow.x);
				}
				if($overflow.y){
					divFrame.css("overflow-y", $overflow.y);
				}
			}
			
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
			$($mask).addClass("message_dialog_mask_layer_empty");
			$($mask).css("z-index", zorder++);
			$(top.document.body).append($mask);
			
			// create dialog box.
			var table = top.document.createElement("table");
			$(table).addClass("message_dialog_box");
			$(table).attr("id", id);
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
			$($contentCell).html("<div name="+ $name +"></div>");
			$("div[name='"+$name+"']").css("border", "1px solid #D1D1D1");
			// resize the message box.
			resize();
			
			// bind events.
			// disable it currently.
			$($mask).mousedown(function(){$this.close();});
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
	 *	append Menu 
	 */
	this.addMenu = function(Msg, bindName, bindCallback, isSelected){
		if (menuCount > 0)
			$("div[name='"+$name+"']").append("<div class='div_space'></div>");	
		var uuid = "uuid" + new Date().getTime() + "_" + parseInt(Math.random()*(65535-10000+1) + 10000);
		var divObj = $("div[name='"+$name+"']");
		var style = "";
		if(isSelected != undefined && isSelected === true){
			style = "color : #21A4D1";
		}
		divObj.append("<div class='menu menu_text' id='"+ uuid +"' style='"+style+"'>"+ Msg +"</div>");
		$("#"+uuid).bind(bindName, bindCallback);
		divObj.find(".menu_text").hover(function(){
			$(this).addClass("menu_text_hightlight");
		}, function(){
			$(this).removeClass("menu_text_hightlight");
		});
		
		menuCount++;
	};
	
	/**
	 *  move messagebox
	 */
	this.move = function(x, y){
		$("#"+id).css("left", 0);
		$("#"+id).css("top", 0);
		$("#"+id).css("margin-top", y + 26);
		$("#"+id).css("margin-left", x);
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

