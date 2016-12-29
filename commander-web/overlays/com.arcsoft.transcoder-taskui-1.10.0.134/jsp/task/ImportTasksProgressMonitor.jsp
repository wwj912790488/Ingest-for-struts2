<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="../include/urlbase.jsp" %>
<base href="<%=urlbase%>/" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script src="js/common/jquery.js" type="text/javascript" ></script>

	<style>
		.ErrorMessage{
			display:inline-block;
			color:red;
		}
	</style>
	
	<script>
		function showProgress(){
			var url = 'importTasksProgress?backgroundJobId=${backgroundJobId}';
			$.post(url,function(data){
				var $res = $(data);
				if($res.find('progress').attr('status')=='done'){	
					var w = window.parent;
					window.parent.uCloseDlg();	
					w.location.reload();
				}else{					
					$('#ProgressDesc').text($res.find('progress').attr('curr'));
					window.setTimeout(showProgress, 1000);
				}				
			});			
		}
	</script>
	
</head>

<body onload="showProgress()">							
	<div style="margin:20px;text-align:center;height:60px;max-width:320px;max-height:60px;overflow:hidden;text-overflow:ellipsis;work-wrap:break-word;word-break:break-all;">
		<span><s:text name="tasklist.importtask"/>:</span> 
		<span id="ProgressDesc"></span>
	</div>
	<div style="margin-left:auto;margin-right:auto;width:60px;height:60px;background:url(images/icons/waitting_60x60.gif)"></div>		
	<div style="margin:10px;text-align:center;">			
		<input type="button" value="<s:text name='button.label.ok'/>" onclick="window.parent.uCloseDlg()"/>
	</div>
</body>
</html>