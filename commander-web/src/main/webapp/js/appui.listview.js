/**
 * Script for list view.
 */
$(function() {
	$(document).on("mouseover", ".tab_list .tab_content", function() {
		$(this).addClass("tab_content_hover");
	}).on("mouseout", ".tab_list .tab_content", function() {
		$(this).removeClass("tab_content_hover");
	}).on("change", ".tab_list .tab_content input[type=checkbox]", function() {
		$(this).parents(".tab_content").toggleClass("tab_content_selected", this.checked);
	}).on("DOMNodeInserted", ".tab_content_parent", function() {
		$(this).find(".tab_list .tab_content:odd").addClass("tab_content_odd");
		$(this).find(".tab_list .tab_content:even").addClass("tab_content_even");
		$(this).find(".tab_list .tab_content .app_text_ellipsis").each(function() {
			if (this.scrollWidth > $(this).width()) {
				$(this).attr("title", $(this).text().trim());
			}
		});
	}).on("click", ".tab_list .tab_content", function(event) {
		var tagName = event.target.tagName.toLowerCase();
		if ($(event.target).hasClass("tab_skip_selection")
				|| tagName == "input"
				|| tagName == "select"
				|| tagName == "textarea") {
			return;
		}
		var tabList = $(this).parents(".tab_list");
		var items = $(this).find("input[type=checkbox]:first");
		if (tabList.hasClass("single_selection")) {
			if (items.length > 0) {
				tabList.find(".tab_content input[type=checkbox]").each(function() {
					if (this == items[0]) {
						if (event.target != this) {
							this.checked = true;
							$(this).trigger("change");
						}
					} else if (this.checked) {
						this.checked = false;
						$(this).trigger("change");
					}
				});
			} else {
				tabList.find(".tab_content").removeClass("tab_content_selected");
				$(this).addClass("tab_content_selected");
			}
		} else if (tabList.hasClass("multi_selection")) {
			if (items.length > 0) {
				if (event.target != items[0]) {
					items[0].checked = !items[0].checked;
					items.trigger("change");
				}
			} else {
				$(this).toggleClass("tab_content_selected");
			}
		}
	});
	$(".tab_list .tab_content:odd").addClass("tab_content_odd");
	$(".tab_list .tab_content:even").addClass("tab_content_even");
	$(".tab_list .tab_content .app_text_ellipsis").each(function() {
		if (this.scrollWidth > $(this).width()) {
			$(this).attr("title", $(this).text().trim());
		}
	});
});
