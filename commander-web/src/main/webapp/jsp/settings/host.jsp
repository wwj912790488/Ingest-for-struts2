<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/host.js");
jspContext.addCssRef("css/settings/setting.css");
%>

<script type="text/javascript">
	var host;
	$(function(){
		host = new Host();
		host.init();
	});
</script>

<div id="secondNavigation">
	<div id="secondNavigationPanel">
		<input type="hidden" id="id" value="<s:property value='id' />" />
		<input type="hidden" id="isLocal" value="<s:property value='isLocal' />" />

		<s:if test="#parameters.isLicenseOnly == null || 'true'!=#parameters.isLicenseOnly[0]">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_MANAGEHOST'})">
			<div href="manageHost.action" id="hostMenu1" class="secondClassNav secondClassNavActive"><s:text name="setting.host.manage" /></div>
		</sec:authorize>
		<!--
		<div href="upgrade.action" id="hostMenu2" class="secondClassNav"><s:text name="setting.host.upgrade" /></div>
		-->
		<s:if test="%{isLocal}">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_VIEW'})">
				<div href="getVersion.action" id="hostMenu2" class="secondClassNav"><s:text name="setting.host.version" /></div>
			</sec:authorize>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_EDIT_SYSINIT'})">
				<div href="sysinit.action" id="hostMenu4" class="secondClassNav"><s:text name="setting.host.sysinit" /></div>
			</sec:authorize>
		</s:if>
		<s:else>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_VIEW'})">
				<div href="getVersion.action" id="hostMenu2" class="secondClassNav"><s:text name="setting.host.version" /></div>
			</sec:authorize>
		</s:else>
		<s:if test="isLicenseEnabled('LICENSE_SETTING')">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_LINCESE'})">
			<div href="listLicense.action" id="hostMenu3" class="secondClassNav"><s:text name="setting.host.license.manage" /></div>
		</sec:authorize>
		</s:if>
		</s:if>
		<s:else>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_LINCESE'})">
				<div href="listLicense.action" id="hostMenu3" class="secondClassNav"><s:text name="setting.host.license.manage" /></div>
			</sec:authorize>
		</s:else>
	</div>
</div>

<div id="main">

</div>
