/**
 * Script for popup menu.
 */
$(function() {
	$(document).on("click", ".app_popupmenu_trigger", function(e) {
		var ev = e || event;
		ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
		$("#" + $(this).attr("menu")).fadeIn();
	}).on("mouseover", ".app_popupmenu span", function() {
		$(this).addClass("app_menu_mouseover");
	}).on("mouseout", ".app_popupmenu span", function() {
		$(this).removeClass("app_menu_mouseover");
	});
	$(document).click(function() {
		$(".app_popupmenu").hide();
	});
	$(window).blur(function() {
		$(".app_popupmenu").hide();
	});
});
