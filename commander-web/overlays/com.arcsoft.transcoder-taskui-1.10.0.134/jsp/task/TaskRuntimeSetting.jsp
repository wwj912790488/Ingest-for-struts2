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
</head>

<body>
	<%request.setAttribute("__topTabActive__", "taskmgr");%><%@ include file="../include/top.jsp" %>
	
	<div style="position:relative;left:0px;top:0px;height:45px;visibility:hidden" ></div>
	
	<s:set value="%{getText('button.label.back')}" name="labelBack" scope="page"/>
	<s:set value="%{getText('button.label.save')}" name="labelSave" scope="page"/>
	
	<div id="SubContainer" class="ContentArea ContentPos">
		<form name="frm" method="post" action="taskRuntimeSetting?flag=save">
		<input type="hidden" name="taskId" value="${taskId }"/>
		<div style="color:#000000;line-height:30px;" class="BodyTitleBar TaskHeadText">
			<s:text name="action.task.settings" />
			( <s:property value="[0].task.name" /> )
		</div>
		<div class="BodyMain" style="padding:20px;">	
			<s:if test="[0].supported">
			<div class="list2columns">
				<div class="row">
					<span class="TaskLabelText lbl"><s:text name="input.allow_program_id_change"/>:</span>
					<span class="val">
						<input type="checkbox" name="rsAllowProgramIdChange" value="1" ${rsAllowProgramIdChange==1? 'checked="checked"':''} />
					</span>
				</div>
			</div>
						
			<div style="text-align:center;margin:20px;">	

				<input type="button" value="${labelBack}" onclick="javascript:location.href='listTask?locateTaskId=${task.id}'" />
				<input type="submit" value="${labelSave }"/>
			</div>
			</s:if>
			<s:else>
				N/A
				<div style="text-align:center;margin:20px;">
					<input type="button" value="${labelBack}" onclick="javascript:location.href='listTask?locateTaskId=${task.id}'" />
				</div>
			</s:else>
		</div>
		</form>
	</div>
	
	<div id="BottomArea" class="BottomArea"><%@ include file="../include/bottom.jsp" %></div>
</body>
</html>