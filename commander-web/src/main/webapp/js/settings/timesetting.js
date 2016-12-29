function isValidDomain(url){
	var urlreg=/^([\w-]+\.)+((com)|(net)|(org)|(gov.cn)|(info)|(cc)|(com.cn)|(net.cn)|(org.cn)|(name)|(biz)|(tv)|(cn)|(la))$/;
	if (urlreg.test(url))
		return true;
	return false;
}

function TimeSetting(){	
	var ntpList = null;
	
	toggleView = function(){
		//show ntp server or manual set
		var ntp = $("input[id^=rdSync]:checked").val();
		if(ntp == "true"){
			$(".ntpPanelTitle").show();
			$(".ntpPanel").show();
			$(".ntpPanelAdd").show();
			$(".manualPanel").hide();
		}else{
			$(".ntpPanelTitle").hide();
			$(".ntpPanel").hide();
			$(".ntpPanelAdd").hide();
			$(".manualPanel").show();
		}
	};
	
	getNTPList = function(){		
		ntpList = new Array();
		var i = 0;
		$("tr.ntpPanel > td.ntpServer").each(function(){
			ntpList[i] = $(this).text();
			i++;
		});
	};
	
	isNTPExists = function(ntp){
		for(var i =0; i < ntpList.length; i++){
			if(ntp == ntpList[i])
				return true;
		}
		return false;		
	};

	this.init=function(){	
		var $this = this;
		
		toggleView();
		
		getNTPList();
		
		$("input[id^=rdSync]").click(function(){
			toggleView();
		});
		
		//save time to host
		$("#btnSave").click(function(){
			var params = {};
			params["id"] = $("#id").val();
			params["isLocal"] = $("#isLocal").val();
			//params["timezone"] = $("#zoneSelector").val();
			params["ntpStatus.isServiceOn"] = $("input[id^=rdSync]:checked").val();
			
			var ntps = {};
			var i = 0;
			$("#tbl").find(".ntpPanel").each(function(){
				var ntp = $(this).find(".ntpServer").text();
				if ($(this).find(":input[name='ntpPrefer']")[0].checked)
					ntp += " prefer";
				ntps[i] = ntp;
				i++;
			});
			
			params["ntpStatus.ntpServers"] = ntps;
			params["date"] = $("#calander").val();
			//params["time"] = $("#time").val();
		
			//validate input			
			if(params["ntpStatus.isServiceOn"] == "true"){
				if($.isEmptyObject(ntps)){
					showWarnMessage(msgEmptyServer);
					return;
				}				
			}
			else{
				if(params["date"].length == 0){
					showWarnMessage(msgEmptyDate);
					return;
				}
			}		
			var loading = createLoading(setting.currentPageName(), getText("common.operation.executing"));
			loading.show();
			var url = "saveTimezone.action";
			$.ajaxSetup({
	            error:function(XMLHttpRequest, textStatus, errorThrown){
	            	loading.close();
	            	showErrorMessage(errorThrown);
	                return false;
	            }
	        });
			$.post(url, params, function(json){
				loading.close();
				if(json.code == 0){
					showMessage(setting.currentPageName(), json.description);
				}else{
					showErrorMessage(json.description);
				}
			});
		});		
		
		//add a ntp server
		$("#btnAdd").click(function(){
			var ntp = $("input#inputNTP").val();
			if(!isValidIp(ntp) && !isValidDomain(ntp)){
				showWarnMessage(msgInvalidServer);
				return;
			}
			if(isNTPExists(ntp)){
				showWarnMessage(msgExistingServer);
				return;
			}
			ntpList[ntpList.length] = ntp;
			$("input#inputNTP").val("");
			var html = '<tr class="ntpPanel"><td class="timeLabel"></td><td class="ntpServer">'+ ntp +
			'</td><td class="ntpPrefer"><input type="radio" name="ntpPrefer"></td><td class="deleteBtn" align="center"><a class="deleteBtn" onclick="timeSetting.del(this)"></a></td></tr>';
			$(this).parents("tr").before(html);
		});

		//delete a ntp server
		$("a.deleteBtn").click(function(){
			$this.del(this);
			getNTPList();
		});
	};
	
	this.del = function(obj){
		$(obj).parents("tr").remove();		
		getNTPList();
	};
}