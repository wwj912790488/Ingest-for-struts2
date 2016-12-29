function MatrixInit(){	
	
	};
MatrixInit.prototype.init = function(){	
		var $this = this;
		//save time to host
		$("#btnSave").click(function(){
			var loading = createLoading(matrix.currentPageName(), getText("common.operation.executing"));
			loading.show();
			var url = "saveMatrix.action";
			$.ajaxSetup({
	            error:function(XMLHttpRequest, textStatus, errorThrown){
	            	loading.close();
	            	showErrorMessage(errorThrown);
	                return false;
	            }
	        });
			$.post(url, $('#matrixinitform').serialize(), function(json){
				loading.close();
				if (json.fieldErrors) {
					for ( var p in json.fieldErrors) {
						showErrorMessage(json.fieldErrors[p]);
					}
				}else if(json.code == 0){
					showMessage(matrix.currentPageName(), json.description);
				}else{
					showErrorMessage(json.description);
				}
			});
		});		
	};