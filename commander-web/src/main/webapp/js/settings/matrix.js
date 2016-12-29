function Matrix(){
	this.id = $("#groupid").val();
	this.contentNode = $("#main");
	this.tabPage = null;
}

Matrix.prototype.init = function(){
	var $this = this;
	$("div[id^=matrixMenu]").click(function(){
		$this.tabPage = $(this);
		var loading = createLoading($(this).text(), getText("common.page.loading"));
		loading.show();
		var url = $(this).attr("href");
		url = url + "?group.id=" + $this.id;	
		$(this).siblings(".secondClassNavActive").removeClass("secondClassNavActive");
		$(this).addClass("secondClassNavActive");
		top.$.get(url, function(data){
			$this.contentNode.html(data);
			loading.close();
		});
	});
	
	$("div[id^=matrixMenu]:first").click();
};

Matrix.prototype.currentPageName = function() {
	if (this.tabPage != null)
		return this.tabPage.text();
	return "";
};
