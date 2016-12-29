(function($){
	$.fn.extend({
		/**
		 * add effect like css hover
		 * @param color - string. color value
		 */
		addHover : function(color){
			this.hover(function(){
				$(this).css("background-color", color);
			},function(){
				$(this).css("background-color", "");
			});
		},
		/**
		 * Use div and ul and li to fake a select element.
		 * @params - onSelected(val, parentValue, text)
		 * 				callback of when selected a option
		 * 
		 */
		fakeSelect : function(params){
			var $this = this, optGroups = $this.children("optgroup");
			$this.addClass("selectbox");
			$this.wrap("<div class='fake-select'/>");
			$this.after("<div class='style-select' data=''/>");
			$this.next().after("<div class='select-list'><ul></ul></div>");
			var ulNode = $this.next().next().children("ul");
			var str = "";
			var defaultTextAndValue = null;
			if(optGroups.length > 0){
				$.each(optGroups, function(i, v){
					var optGroup = $(v);
					var data = optGroup.attr("data");
					var event = optGroup.attr("event");
					if(optGroup.attr("selected")){//set default selected value
						defaultTextAndValue = [optGroup.attr("label"), (data ? data : "")];
					}
					str += "<li>";
					str += "<span class='parent' event='"+(event != undefined && event ? event : "")+"' data='"+ (data ? data : "") +"'>"+ optGroup.attr("label") +"</span>";
					str += "<ul>";
					var childOptions = optGroup.children("option");
					$.each(childOptions, function(j, o){
						str += "<span><li class='child' data='"+ o.value +"'>"+ o.text +"</li></span>";
					});
					str += "</ul>";
					str += "</li>";
				});
			}else{
				var allOfOptions = $this.children("option");
				if(allOfOptions.length <= 1){//add empty option when just have default option
					str += "<li class='child' data=''><li>";
				}else{
					$.each(childOptions, function(j, o){
						if(j > 0){
							str += "<span><li class='child' data='"+ o.value +"'>"+ o.text +"</li></span>";
						}
					});
				}
			}
			ulNode.append(str);
			if(defaultTextAndValue == null){
				var defaultIndex = $this.get(0).selectedIndex;
				var defaultOption = $this.get(0).options[defaultIndex];
				defaultTextAndValue = [(defaultOption.text ? defaultOption.text : ""), (defaultOption.value ? defaultOption.value : "")];
			}

			//set default text with default option
			var selNode = $this.next();
			selNode.append(defaultTextAndValue[0]);
			selNode.attr("data", defaultTextAndValue[1]);
			if(defaultTextAndValue && defaultTextAndValue[1]!=""){
				$this.next().next().find("[data='"+ defaultTextAndValue[1] +"']").css("background", "#3399ff");
			}
			//add event
			var parent = $this.parent();
			if(params && params.height){
				parent.css("height", params.height);
				parent.css("line-height", params.height +"px");
			}
			//add hover event
			parent.find(".select-list .parent,.select-list .child").hover(function(){
				parent.find(".select-list .parent,.select-list .child").css("background", "");
				$(this).css("background", "#3399ff").css("cursor", "pointer");
			}, function(){
				$(this).css("background", "").css("cursor", "");
			}).click(function(event){ //click 
				var evtObj = $(event.target);
				if(evtObj.hasClass("parent") || evtObj.hasClass("child")){
					var curData = $(this).attr("data");
					var curEvent = $(this).attr("event");
					if(curData != "" && (curEvent != "" && curEvent != "none")){
						selNode.text($(this).text());
						selNode.attr("data", $(this).attr('data'));
						if(params && params.onSelected){
							//get parent span node when class is child
							var parentSpan = $(this).hasClass("parent") ? null : $(this).parent().parent().prev(".parent");
							params.onSelected(curData, parentSpan == null ? null : parentSpan.attr("data"), $(this).text());
						}
					}
					$(this).parents(".select-list").hide();
				}
			});
			parent.click(function(event){
				var evtTarget = $(event.target);
				if(evtTarget.hasClass("style-select")){
					var curSelectListNode = $(this).find(".select-list");
					//set selected style
					var data = selNode.attr('data');
					if(data && data != ''){
						curSelectListNode.find("[data='"+selNode.attr('data')+"']").css("background", "#3399ff");
					}
					var allSel = $(".fake-select").find(".select-list");
					//hide others fake select first
					if(allSel.length > 1){
						$.each(allSel, function(i, o){
							if(o.style.display == 'block' && evtTarget.prev().attr("id") != $(o).prev().prev().attr('id')){
								$(o).hide();
							}
						});
					}
					//toggle self
					evtTarget.next().toggle();
				}
			});
			$(document).click(function(event){
				if(!$(event.target).hasClass("style-select")){
					//hide all
					$(".fake-select").find(".select-list").hide();
				}
			});
			var rootNode = $this.parent();
			rootNode.css("width", rootNode.width() + 18);
		}
	});
	$.extend({
		/**
		 * pagination
		 * 
		 * @param params - json object
		 * 		  common params:
		 * 				type - 0 or 1, default is 1. 0 will use normal request submit(post), 1 will use ajax submit.
		 * 				data - all of data of submit to server
		 * 		  use in ajax:
		 * 				success - callback function
		 * 		  use in normal form submit:
		 * 				form - form id. if this value is exists then method and data value will be ignored and type value will set to 0.
		 * 				method - get or post. if data is specify then data will append to url.(Only support get for now)
		 * 
		 * Usage:
		 * 		ajax:
		 * 				$.pagination({
		 *				   "data" : {"pager.keySearch" : $("#key_search").val()},
		 *				   "success" : function(data){
		 *					 $("#security_content").empty().append(data);
		 *				   }
		 *			    });
		 *      form:
		 *             $.pagination({"form" : "form"})
		 *      get:
		 *      	   $.pagination({"method" : "get"})
		 * 				
		 */
		pagination : function(params){
			var url = $("#pageUrl");
			var pageIndex = $("#pageIndex");
			params = $.extend({type : 1, data : {}}, params);
			if(params.form || params.method){ 
				params.type = 0;
			}
			init();
			function init(){
				$("#nav_pre").click(function() {
					if(!$(this).hasClass("nav_pre_disable")){
						params.data["pager.pageIndex"] = parseInt(pageIndex.val()) - 1;
						doQuery();
					}
				});
				$("#nav_next").click(function() {
					if(!$(this).hasClass("nav_next_disable")){
						params.data["pager.pageIndex"] = parseInt(pageIndex.val()) + 1;
						doQuery();
					}
				});
				$(".nav_page").click(function() {
					if($(this).attr("index") != pageIndex.val()){
						params.data["pager.pageIndex"] = parseInt($(this).attr("index"));
						doQuery();
					}
				});
				$("#nav_pageindex").keydown(function(e) {
					var keyEvent = e || event;
					if (keyEvent.keyCode == 13) {
						params.data["pager.pageIndex"] = parseInt($(this).val());
						doQuery();
					}
				});
				$("#nav_pagesize").keydown(function(e) {
					var keyEvent = e || event;
					if (keyEvent.keyCode == 13) {
						params.data["pager.pageIndex"] = $("#nav_pageindex").val();
						doQuery();
					}
				});

				//set hover effect
				$(".nav_page").hover(function(){
					if($(this).attr("index") != pageIndex.val()){
						$(this).addClass("nav_page_hover");
					}
				},function(){
					if($(this).attr("index") != pageIndex.val()){
						$(this).removeClass("nav_page_hover");
					}
				});
				
				appendQueryNode();
			}
			function doQuery(){
				var totalRows = $("#pagerForm").find("#totalRows").val();
				var pageSize = parseInt($("#nav_pagesize").val());
				$("#nav_pagesize").removeClass("input_error");
				$("#nav_pageindex").removeClass("input_error");
				if (isNaN(pageSize) || pageSize <= 0) {
					$("#nav_pagesize").addClass("input_error");
					$("#nav_pagesize").focus();
					return;
				}
				var index = params.data["pager.pageIndex"];
				if (isNaN(index) || index <= 0) {
					$("#nav_pageindex").addClass("input_error");
					$("#nav_pageindex").focus();
					return;
				}
				var pageCount = parseInt(totalRows / pageSize);
				if (totalRows % pageSize != 0)
					pageCount++;
				if (index > pageCount) {
					index = pageCount;
				} else if (index < 1) {
					index = 1;
				}
				params.data["pager.pageIndex"] = index;
				params.data["pager.pageSize"] = pageSize;
				if(params.type == 1){
					ajaxQuery();
				}else{
					normalQuery();
				}
			}

			function doRefresh(){
				params.data["pager.pageIndex"] = parseInt($("#pageIndex").val());
				params.data["pager.pageSize"] = parseInt($("#pageSize").val());
				if(params.type == 1){
					ajaxQuery();
				}else{
					normalQuery();
				}
			}

			function ajaxQuery(){
				$.ajax({
					url : url.val(),
					type : "post",
					data : params.data,
					success : function(data){
						params.success(data);
					}
				});
			}
			
			function normalQuery(){
				if(params.form){
					$("#pagerForm").find("#pageIndex").val(params.data["pager.pageIndex"]);
					$("#pagerForm").find("#pageSize").val(params.data["pager.pageSize"]);
					$("#pagerForm").submit();
				}else{//Don't have a form and want to use a get request 
					if(params.method){
						if(params.method == "get"){ //use get request
							var urlQueryString = $.param(params.data);
							var requestUrl = url.val() + "?" + urlQueryString;
							location.href = requestUrl;
						}
					}
				}
			}
			/**
			 * clone all of form's input to pagerForm
			 */
			function appendQueryNode(){
				var form = $("#" + params.form);
				var pagerForm = $("#pagerForm");
				$.each(form.find(":input"), function(idx, o){
					$(this).clone().appendTo(pagerForm);
				});
			};

			function PageControl() {
				this.gotoPage = function(page) {
					if (isNaN(page) || page <= 0)
						return;
					params.data["pager.pageIndex"] = page;
					doQuery();
				};

				this.refresh = function() {
					doRefresh();
				};

				this.next = function() {
					this.gotoPage(parseInt(pageIndex.val()) + 1);
				};

				this.previous = function() {
					this.gotoPage(parseInt(pageIndex.val()) - 1);
				};
			}

			return new PageControl(params);
		}
	});
})(jQuery);