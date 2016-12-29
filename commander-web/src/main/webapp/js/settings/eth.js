function Eth(){
	this.id = id;	
	this.isLocal = isLocal;
	this.msgTitle  = msgTitle;
	this.msgOk = msgOk;
	this.curEth = curEth;
	this.strNull=strNull;
}

Eth.prototype.showErrorMessage = function(message){
	var title = this.msgTitle;
	var dialog = new window.top.MessageDialog(title, message);	
	dialog.addButton(this.msgOk);	
	dialog.show();
};

Eth.prototype.refreshPrimary = function(slave){
		var primaryVal;
		var index = slave.selectedIndex;
		var text = slave.options[index].text; 
		var value = slave.options[index].value;
		
		$("select[name$=primary]").each(function(){
			var primary = $(this);
			primaryVal = primary.attr("id");
			
			if(primaryVal == curEth){
				$(primary.find("option")).each(function(){
					var opt = $(this);
					if(opt.text() != primaryVal && opt.val() != ""){
						opt.remove();
					}
				});
				if(value != ""){
					var option = $("<option>").text(text).val(value);
					primary.append(option);
					primary.parent().parent().attr("class","");
				}else{
					primary.parent().parent().attr("class","hidden");
				}
			}
		});
};

Eth.prototype.updateActivity = function(eths){
	for(var i = 0; i < eths.length; i++){
		if(eths[i].activity != null)
			$("td[id='eths[" + i + "].activity']").html(eths[i].activity);
		else
			$("td[id='eths[" + i + "].activity']").html(strNull);
	}
};

Eth.prototype.validate = function(form){
	var err = 0;
	var $form = form;
	$form.find("input[type=text]").each(function(){
		var data = $(this).val();
		var type = $(this).parents("tr").attr("id");
		var text;
		if(type =="ip")
			text = msgInvalidIp;
		else if(type == "netmask")
			text = msgInvalidMask;
		else
			text = msgInvalidGateway;		
		if(data=="" && type != "gateway"){			
			$(this).siblings(".alert").text(text).show();				
			err++;						
		}		
		else if(data != "" && (!isValidIp(data))){
			$(this).siblings(".alert").text(text).show();
			err++;			
		}
	});
	if(err > 0)
		return false;
	return true;
};

Eth.prototype.updateEthStatus = function(){

	var ethIds = new Array();
	var self = this;
	$("#ethTabList").find(".ethTab").each(function(){
		ethIds[ethIds.length] = $(this).attr("id");
	});
	
	//if cannot find the eth id, stop the timer
	if(ethIds.length > 0){
		var url = "refreshUsedRate.action";
		var data = "ethIds=" + ethIds.join(",") + "&id=" + id + "&isLocal=" + isLocal;
		top.$.get(url, data, function(json){
			var $ethTabList = $("#ethTabList");
			self.updateActivity(json.eths);
			for(var i = 0; i < ethIds.length; i++){
				var rate = json.usedRates[i]/100;
				if(json.usedRates[i] == -1){
					rate = 0;
					$ethTabList.find("#" + ethIds[i]).find(".state").attr("src","images/settings/Network port_disconnect.png");
				} else {
					$ethTabList.find("#" + ethIds[i]).find(".state").attr("src","images/settings/Network port.png");
				}				
				if(rate > 10)
					rate = rate.toFixed(1);
				else
					rate = rate.toFixed(2);
				$ethTabList.find("#" + ethIds[i]).find(".usedRate").text(rate);
			}
		});	

		
		setTimeout(function(){self.updateEthStatus();}, 10000);	
	}
};

Eth.prototype.refresh = function(index){
	//refresh eth list
	var url = "listEth.action" ;	
	var params = {};
	params["id"] = id;
	params["isLocal"] = isLocal;
	params["index"] = index;
	top.$.get(url, params, function(data){
		$("#main").html(data);	
	});	
};

Eth.prototype.init = function(){
	var $this = this;
	
	//update the network flow timing
	this.updateEthStatus();
	//when click the eth tab, go to the specific eth page.
	$(".ethTab").click(function(){
		var index = $(this).attr("index");		
		$(this).siblings(".ethTabActive").removeClass("ethTabActive");
		$(this).addClass("ethTabActive");
		curEth = $(this).attr("id");
		$("div[id^=eth-]").hide();		
		$("#eth-" + index).show();
	});
				
	//when click the submit button, save the eth modification.
	$(".submitBtn").click(function(){
		var $form = $(this).parents("form");		
		$form.find("input[type=text]").each(function(){
			$(this).siblings("span").hide();
		});	
//		//validate input
		if(($form.find("select").first().val() == "false" && !$this.validate($form)))
			return;
		var $obj = $(this);
		var url="saveEth.action";
		var data=$form.serialize();
		data+= ("&id=" + id); //add server id
		var loading = createLoading(setting.currentPageName(), getText("common.operation.executing"));
		loading.show();
		$.post(url, data, 
			function(json){
				loading.close();
				if (!$.isEmptyObject(json.fieldErrors)) {
					for ( var p in json.fieldErrors) {
						$obj.parents(".ethContent").find("tr#" + p).find(".alert").text(json.fieldErrors[p]).show();
					}
					return;
				} 
			 
				if(json.code != 0){
					$this.showErrorMessage(json.description);
				}else{					
					var index = $obj.parents(".ethContent").attr("index");					
					var dialog = new window.top.MessageDialog(network.currentPageName(), json.description);					
					dialog.addButton($this.msgOk, Eth.prototype.refresh, index);
					dialog.setSize(400, 200);
					dialog.show();					
				}
			});		
	});

	//when change to DHCP selection, disable the input	
	$("select[id$=isDHCP]").change(function(){
		var isDHCP = $(this).val();
		if(isDHCP == 'true'){
			$(this).parentsUntil(".ethContent").find("input[type=text]").attr("disabled", "disabled");
		}else{
			$(this).parentsUntil(".ethContent").find("input[type=text]").removeAttr("disabled");
		}
	});
	
	$("select[id=slaveId]").change(function(){
		$this.refreshPrimary(this);
	});

	$("select[name$=primary]").change(function(){
		// if primary is selected, show the reselect option.
		var primaryReselectOption = $(this).parentsUntil("table").find("#primaryReselect");
		if ($(this).val() != "")
			primaryReselectOption.show();
		else
			primaryReselectOption.hide();
	});
};
