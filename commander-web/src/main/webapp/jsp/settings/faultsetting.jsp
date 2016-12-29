<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addCssRef("css/settings/setting.css");
jspContext.addJSRef("js/settings/faultsetting.js");
%>

<script>
	var id = '<s:property value="id"/>';
	var isLocal = '<s:property value="isLocal"/>';
	var title = '<s:text name="msg.dialog.title.warning" />';
	var buttonOK = '<s:text name="msg.ok" />';
	$(function(){
		var faultSetting = new FaultSetting();
		faultSetting.init();
	});
</script>

<div style="margin:30px 25px 10px 30px;">
	<s:text name="server.setting.fault.host.monitor"/>
	<s:radio list="#{'false':getText('server.setting.fault.host.monitor.enable'),'true':getText('server.setting.fault.host.monitor.disable')}" name="faultDisabled"/>
</div>	
<div style="margin:10px 25px 20px 30px;">
	<s:text name="server.setting.fault.host.monitor.status"/><s:if test="faultMonitoring==true"> <s:text name="server.setting.fault.host.monitor.status.on"/></s:if><s:else> <s:text name="server.setting.fault.host.monitor.status.off"/></s:else>
</div>