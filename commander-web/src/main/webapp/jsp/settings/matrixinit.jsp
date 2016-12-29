<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/matrixinit.js");
jspContext.addCssRef("css/settings/setting.css");
jspContext.addCssRef("css/settings/groupsetting.css");
%>

<script type="text/javascript">

	var matrixInit = new MatrixInit();

	$(function(){		
		matrixInit.init();
	});

</script>

<div id="timePanel">
	<form id="matrixinitform">
	<input type="hidden" name="matrix.id" value="<s:property value='matrix.id' />" />
	<input type="hidden" name="group.id" value="<s:property value='group.id' />" />
	<table id="tbl" align="center">
	<tr class="ntpPanel" >
		<td class="timeLabel"><s:text name="group.setting.matrix.name"/>:</td>
		<td class="ntpServer"><s:textfield name="matrix.name" /></td>
	</tr>
	
	<tr class="ntpPanel" >
		<td class="timeLabel"><s:text name="group.setting.matrix.ip"/>:</td>
		<td class="ntpServer"><s:textfield name="matrix.ip" /></td>
	</tr>
	
	<tr class="ntpPanel" >
		<td class="timeLabel"><s:text name="group.setting.matrix.port"/>:</td>
		<td class="ntpServer"><s:textfield name="matrix.port" /></td>
	</tr>
	
	<tr class="ntpPanel"">
		<td class="timeLabel"><s:text name="group.setting.matrix.remarks"/>:</td>
		<td class="ntpServer"><s:textfield name="matrix.remarks" /></td>
	</tr>
	
	
	</table>	
	<div id="btnPanel">
		<button id="btnSave" type="button"><s:text name='common.save' /></button>
	</div>
	</form>
</div>
