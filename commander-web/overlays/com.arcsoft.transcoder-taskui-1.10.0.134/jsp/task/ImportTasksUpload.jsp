<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Upload</title>
	<style>
		.errorMessage{
			display:inline-block;
			color:red;
		}
	</style>
</head>
<body>	
	<div class="errorMessage">${errorMessage}</div>
	
	<form name="frm" method="post" 
		enctype="multipart/form-data" 
		onsubmit="return document.frm.pkg.value!=''" 
		action="importTasks">
				
		<div style="margin:20px;text-align:center;">
			<s:text name="tasklist.importtask"/>
		</div>		
		<div style="margin:40px;text-align:center;">
			<input type="file" name="pkg" value="" />
		</div>
		<div style="margin:40px;text-align:center;">
			<input id="submit" type="submit" value="<s:text name='button.label.ok'/>" />
			<input type="button" value="<s:text name='button.label.cancel'/>" onclick="window.parent.uCloseDlg()"/>
		</div>
	</form>
</body>
</html>