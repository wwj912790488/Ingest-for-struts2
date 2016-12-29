<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/fault.js");
jspContext.addCssRef("css/settings/setting.css");
%>

<script type="text/javascript">
	var fault;
	$(function(){
		fault = new Fault();
		fault.init();
	});
</script>

<div id="secondNavigation">
	<div id="secondNavigationPanel">
		<input type="hidden" id="id" value="<s:property value='id' />" />
		<input type="hidden" id="isLocal" value="<s:property value='isLocal' />" />

		<s:if test="%{isLocal}">
		</s:if>
		<s:else>
			<s:if test="isLicenseEnabled('FAULT_SETTING')">
				<div href="getMonitorSetting.action" id="faultMenu1" class="secondClassNav secondClassNavActive"><s:text name="server.setting.fault.setting" /></div>
			</s:if>		
			<s:if test="isLicenseEnabled('FAULT_IPMI_SETTING')">
				<div href="getIpmi.action" id="faultMenu2" class="secondClassNav secondClassNavActive"><s:text name="server.setting.fault.ipmi" /></div>
			</s:if>
			<s:if test="isLicenseEnabled('FAULT_SWITCH_SETTING')">
				<div href="getSwitch.action" id="faultMenu3" class="secondClassNav"><s:text name="server.setting.fault.switch" /></div>
			</s:if>
		</s:else>
	</div>
</div>

<div id="main">

</div>
