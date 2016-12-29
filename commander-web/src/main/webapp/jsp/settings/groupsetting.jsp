<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>

<%
jspContext.addCssRef("css/settings/setting.css");
jspContext.addCssRef("css/settings/groupsetting.css");
jspContext.addJSRef("js/settings/groupsetting.js");
%>

<script type="text/javascript">
<!--
	var groupSetting = new GroupSetting('${group.id}');
	$(function() {
		groupSetting.init();
	});
//-->
</script>

<div id="group_setting_tabs">
	<div id="firstNavigationPanel">
		<s:if test="isLicenseEnabled('LICENSE_SETTING')">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_EDIT_LICENSE'})">
		<div class="firstClassNav">
			<div class="tab_url hidden">groupLicenseView.action</div>
			<div class="tab_name"><s:text name="setting.host.license.manage" /></div>
		</div>
		</sec:authorize>
		</s:if>
		<s:if test="isLicenseEnabled('STORAGE_SETTING')">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_EDIT_STORAGE'})">
		<div class="firstClassNav">
			<div class="tab_url hidden">groupStorageView.action</div>
			<div class="tab_name"><s:text name="server.setting.storage" /></div>
		</div>
		</sec:authorize>
		</s:if>
		<s:if test="isLicenseEnabled('TIME_SETTING')">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_EDIT_TIMEZONE'})">
		<div class="firstClassNav">
			<div class="tab_url hidden">groupTimeView.action</div>
			<div class="tab_name"><s:text name="server.setting.time" /></div>
		</div>
		</sec:authorize>
		</s:if>
		<s:if test="isLicenseEnabled('SDI_MATRIX_CONTROL')">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_EDIT_MATRIX'})">
		<div class="firstClassNav">
			<div class="tab_url hidden">setmatrix.action</div>
			<div class="tab_name"><s:text name="group.setting.matrix" /></div>
		</div>
		</sec:authorize>
		</s:if>
		<s:if test="isLicenseEnabled('LOGGING_SETTING')">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_UPDATE_ASLOG'})">
		<div class="firstClassNav">
			<div class="tab_url hidden">groupASLogView.action</div>
			<div class="tab_name"><s:text name="server.logging.aslog" /></div>
		</div>
		</sec:authorize>
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_GROUP_UPDATE_LOGGING_SETTING'})">
		<div class="firstClassNav">
			<div class="tab_url hidden">groupLoggingSettingView.action</div>
			<div class="tab_name"><s:text name="server.logging.service" /></div>
		</div>
		</sec:authorize>
		</s:if>
	</div>
	<div id="navLine"></div>
</div>

<div id="group_setting_content">

</div>

<div id="execute_result_template" style="display: none">
	<div class="template_title">
		<div id="dialog_title" style="color: white"></div>
	</div>
	<div class="template_content">
		<div id="dialog_content" style="padding: 0px; margin: 0px; width: 100%; height: 100%; overflow-y: auto"></div>
	</div>
	<div class="template_button">
		<input type="button" id="btnResultOk" style="width: 100px; height: 30px" value="<s:text name='msg.ok'/>" />
	</div>
</div>

<%@ include file="/jsp/include/footer.jsp"%>
