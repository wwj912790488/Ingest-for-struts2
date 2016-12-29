function MatrixSetting(){	
	
	};
	MatrixSetting.prototype.init = function(){	
		var $this = this;
		//save time to host
		$("#btnSave").click(function(){
			var loading = createLoading(matrix.currentPageName(), getText("common.operation.executing"));
			loading.show();
			var url = "saveMatrixSetting.action";
			$.ajaxSetup({
	            error:function(XMLHttpRequest, textStatus, errorThrown){
	            	loading.close();
	            	showErrorMessage(errorThrown);
	                return false;
	            }
	        });
			$.post(url, $('#matrixsettingform').serialize(), function(json){
				loading.close();
				if(json.code == 0){
					showMessage(matrix.currentPageName(), json.description);
				}else{
					showErrorMessage(json.description);
				}
			});
		});		
	};