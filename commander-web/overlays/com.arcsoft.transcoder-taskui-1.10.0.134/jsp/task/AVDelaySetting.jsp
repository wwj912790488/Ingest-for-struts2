<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/jsp/include/urlbase.jsp" %>
<base href="<%=urlbase%>/" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Task View</title>
<link href="style/UIStyle.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/uictrl.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/incTaskView.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/TaskDetail.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/TaskView2.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<link href="style/MotionIcon.css?<%=rnd%>" rel="stylesheet" type="text/css" />
<script src="js/common/jquery.js?<%=rnd%>" type="text/javascript" ></script>
<script src="js/common/util.js?<%=rnd%>" type="text/javascript" ></script>
<script src="js/inc/incTaskView.js?<%=rnd%>" type="text/javascript" ></script>
<style type="text/css">
	.list2columns .row .lbl{
		width:20%;
		padding:20px;
	}
	.list2columns .row .val{
		width:80%;
		padding:20px;
	}
</style>
<script type="text/javascript">
</script>
<s:set value="%{getText('button.label.apply')}" name="Apply" scope="page"/>
<s:set value="%{getText('button.label.reset')}" name="Reset" scope="page"/>
</head>

<body>
	<%request.setAttribute("__topTabActive__", "taskmgr");%><%@ include file="../include/top.jsp" %>
	
	<div style="position:relative;left:0px;top:0px;height:45px;visibility:hidden" ></div>
		
	<div id="SubContainer" class="ContentArea ContentPos">
		<form name="frm" method="post" action="avDelaySetting?flag=save">	
			<input type="hidden" name="taskId" value="${taskId }" />
			<div class="BodyMain" style="padding:20px;">
				A/V延时： <input type="text" name="delay" value="${delay}" required="required"/> ms
				<div style="color:red;"><s:actionmessage/></div>
			</div>
			<div style="margin:10px;text-align:center;">
				<input type="reset" name="reset" value="${Reset}"/>
				<input type="submit" name="submit" value="${Apply}"/>				
			</div>
			
		</form>
	</div>
	
	<div id="BottomArea" class="BottomArea"><%@ include file="../include/bottom.jsp" %></div>
</body>
</html>