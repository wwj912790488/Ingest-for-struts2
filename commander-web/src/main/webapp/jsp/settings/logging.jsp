<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/logging.js");
jspContext.addCssRef("css/settings/setting.css");
%>

<script type="text/javascript">
<!--
	var logging;
	$(function(){
		logging = new Logging();
		logging.init();
	});
//-->
</script>

<div id="secondNavigation">
	<div id="secondNavigationPanel">
		<input type="hidden" id="id" value="<s:property value='id' />" />
		<input type="hidden" id="isLocal" value="<s:property value='isLocal' />" />
		<s:if test="isLocal==false">
		<div href="showASLog.action" id="loggingMenu1" class="secondClassNav secondClassNavActive"><s:text name="server.logging.aslog"/></div>
		<div href="viewLogging.action" id="loggingMenu2" class="secondClassNav"><s:text name="server.logging.service"/></div>
		</s:if>
	</div>
</div>

<div id="main">

</div>
