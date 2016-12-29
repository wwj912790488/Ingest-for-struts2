function Setting(){
	this.id = $("#id").val();
	this.isLocal = $("#isLocal").val();
	this.isLicenseOnly = $("#isLicenseOnly").val();
	this.contentNode = $("#content");
	this.tabPage = null;
}

Setting.prototype.init = function(){
	var $this = this;
	$("div[id^=settingMenu]").click(function(){
		$this.tabPage = $(this);
		var loading = createLoading($(this).text(), getText("common.page.loading"));
		loading.show();
		var url = $(this).attr("href");
		url = url + "?id=" + $this.id + "&isLocal=" + $this.isLocal + "&isLicenseOnly=" + $this.isLicenseOnly;
		$(this).siblings(".firstClassNavActive").removeClass("firstClassNavActive");
		$(this).addClass("firstClassNavActive");
		$.ajaxSetup({
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	loading.close();
            	$this.contentNode.html(XMLHttpRequest.responseText);
                return false;
            }
        });
		top.$.get(url, function(data){
			$this.contentNode.html(data);
			loading.close();
		});
	});
	
	$("div[id=settingMenu1]").click();
};

Setting.prototype.currentPageName = function() {
	if (this.tabPage != null)
		return this.tabPage.text();
	return "";
};
