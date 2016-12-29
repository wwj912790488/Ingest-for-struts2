function Fault(){
	this.id = $("#id").val();
	this.isLocal = $("#isLocal").val();
	this.contentNode = $("#main");
	this.tabPage = null;
}

Fault.prototype.init = function(){
	var $this = this;
	$("div[id^=faultMenu]").click(function(){
		$this.tabPage = $(this);
		var loading = createLoading($(this).text(), getText("common.page.loading"));
		loading.show();
		var url = $(this).attr("href");
		url = url + "?id=" + $this.id + "&isLocal=" + $this.isLocal;	
		$(this).siblings(".secondClassNavActive").removeClass("secondClassNavActive");
		$(this).addClass("secondClassNavActive");
		top.$.get(url, function(data){
			$this.contentNode.html(data);
			loading.close();
		});
	});
	
	$("div[id^=faultMenu]:first").click();
};

Fault.prototype.currentPageName = function() {
	if (this.tabPage != null)
		return this.tabPage.text();
	return "";
};
