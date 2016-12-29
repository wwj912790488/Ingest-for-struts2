<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%@ page import="com.arcsoft.arcvideo.web.jsp.JspContext"%>

<html>
<head>

<s:include value="/jsp/include/LicenseData.jsp"/>
<s:set var="currLang" value="locale.language" scope="request" />

<%@ include file="../include/urlbase.jsp" %>
<base href="<%=urlbase%>/" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Task View</title>

<%
String currLang = (String)request.getAttribute("currLang");
JspContext jspContext = new JspContext(request, response, out);

jspContext.addCssRef("style/UIStyle.css");
jspContext.addCssRef("style/uictrl.css");
jspContext.addCssRef("style/TaskDetail.css");
jspContext.addCssRef("style/incTaskView.css");
jspContext.addCssRef("style/TaskView2.css");

jspContext.addJSRef("js/common/jquery.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/common/uictrl.js");
jspContext.addJSRef("js/common/CommonDefine.js");
jspContext.addJSRef("js/common/String_" + currLang + ".js");
jspContext.addJSRef("js/inc/ViewTaskDef.js");
jspContext.addJSRef("js/inc/incTaskView.js");
jspContext.addJSRef("js/task/TaskData.js");
jspContext.addJSRef("js/inc/input/ViewInput.js");
jspContext.addJSRef("js/inc/output/ViewOutputGroup.js");
jspContext.addJSRef("js/inc/output/ViewOutput.js");
jspContext.addJSRef("js/inc/video/ViewVideo.js");
%>
</head>

<body onload="onViewTaskLoaded()">
	<%request.setAttribute("__topTabActive__", "taskmgr");%><%@ include file="../include/top.jsp" %>
	
	<div style="position:relative;left:0px;top:0px;height:45px;visibility:hidden" ></div>
	
	<div id="SubContainer" class="ContentArea ContentPos">
	
		<div class="list2columns">
			<table>
				<tr>
					<td class="TaskColumn1 LabelAlign">
						<span class="TaskLabelText"><s:text name="common.name"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TaskColumn2">
						<span class="TaskContentText"><s:property value="[0].task.name" /></span>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<table>
				<tr>
					<td class="TaskColumn1 LabelAlign TaskPriorityModule">
						<span class="TaskLabelText"><s:text name="taskDetail.priority"/>:</span>
					</td>
					<td class="LabelEndSpacing TaskPriorityModule"><div class="LinePlaceHolder"></div></td>
					<td class="TaskColumn2 TaskPriorityModule">
						<span class="TaskContentText"><s:property value="[0].task.priority" /></span>
					</td>
					<td class="TaskColumn1 LabelAlign LicenseGpuId">
						<span class="TaskLabelText">GPU:</span>
					</td>
					<td class="LabelEndSpacing LicenseGpuId"><div class="LinePlaceHolder"></div></td>
					<td class="TaskColumn2 LicenseGpuId">
						<span class="TaskContentText ViewTaskGpuId"><s:property value="[0].task.gpuId" /></span>
					</td>
					
					<td class="TaskColumn1 LabelAlign LicenseVideoDecoding">
						<span class="TaskLabelText lbl"><s:text name="taskDetail.video_decoding"/>:</span>
					</td>
					<td class="LabelEndSpacing LicenseVideoDecoding"><div class="LinePlaceHolder"></div></td>
					<td class="TaskColumn2 LicenseVideoDecoding">
						<span class="TaskContentText ViewTaskVideoDecoding"><s:property value="[0].task.videoDecoding" /></span>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
		</div>
		
		<div id="TaskInputs" class="TaskInputs">
			<div class="TaskInputsHead">
				<span class="TaskHeadText"><s:text name="taskDetail.inputSetting"/></span>
			</div>
			<div class="TaskInputBody">
				<s:iterator value="inputs" var="input" status="status">	
				<s:include value="/jsp/incTaskView/input/Input.jsp" />	
				</s:iterator>
			</div>
		</div>
		
		<div id="TaskOutputs" class="TaskInputs">
			<div class="TaskInputsHead">
				<span class="TaskHeadText"><s:text name="taskDetail.outputSetting"/></span>
			</div>
			<div class="TaskInputBody">					
				<s:include value="/jsp/incTaskView/output/OutputGroupTab.jsp"/>				
			</div>
		</div>
		<div style="text-align:center;margin:20px;">
			<form>
				<s:set value="%{getText('button.label.back')}" name="labelBack" scope="page"/>
				<input type="button" value="${labelBack}" onclick="javascript:location.href='listTask?locateTaskId=${task.id}'" />
			</form>
		</div>
	</div>
	
	<div id="BottomArea" class="BottomArea"><%@ include file="../include/bottom.jsp" %></div>
</body>
</html>