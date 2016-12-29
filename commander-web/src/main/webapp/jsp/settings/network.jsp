<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/network.js");
jspContext.addCssRef("css/settings/setting.css");
%>

<script type="text/javascript">
<!--
	var network;
	$(function(){
		network = new Network();
		network.init();
	});
//-->
</script>

<div id="secondNavigation">
	<div id="secondNavigationPanel">
		<input type="hidden" id="id" value="<s:property value='id' />" />
		<input type="hidden" id="isLocal" value="<s:property value='isLocal' />" />
		<input type="hidden" id="groupId" value="<s:property value='group.id' />" />

		<s:if test="isLicenseEnabled('NETWORK_IP_SETTING')">
		<div href="listEth.action" id="networkMenu1" class="secondClassNav secondClassNavActive"><s:text name="server.setting.network.eth" /></div>
		</s:if>
		<s:if test="isLicenseEnabled('NETWORK_IO_SETTING')">
		<s:if test="%{isLocal}">
			<div href="getNio.action" id="networkMenu2" class="secondClassNav secondClassNavActive"><s:text name="server.setting.network.nio" /></div>
		</s:if>
		<s:else>
			<div href="nioBindingView.action" id="networkMenu2" class="secondClassNav secondClassNavActive"><s:text name="server.setting.network.nio" /></div>
		</s:else>
		</s:if>
		<s:if test="isLicenseEnabled('FIREWALL_SETTING')">
		<div href="getFirewall.action" id="networkMenu3" class="secondClassNav"><s:text name="server.setting.network.firewall" /></div>
		</s:if>
		<s:if test="isLicenseEnabled('DNS_SETTING')">
		<div href="getDns.action" id="networkMenu4" class="secondClassNav"><s:text name="server.setting.network.dns" /></div>
		</s:if>
		<s:if test="isLicenseEnabled('ROUTE_SETTING')">
		<div href="getRoute.action" id="networkMenu5" class="secondClassNav"><s:text name="server.setting.network.router" /></div>
		</s:if>
		<s:if test="isLicenseEnabled('SNMP_SETTING')">
		<div href="getSnmp.action" id="networkMenu6" class="secondClassNav"><s:text name="setting.host.snmp" /></div>
		</s:if>
	</div>
</div>

<div id="main">

</div>
