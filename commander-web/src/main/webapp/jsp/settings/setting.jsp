<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>

<%
	jspContext.addJSRef("js/settings/setting.js");
	jspContext.addCssRef("css/settings/setting.css");
	jspContext.addCssRef("css/settings/storage.css");
%>

<script type="text/javascript">
	var setting;
	$(function() {
		setting = new Setting();
		setting.init();
	});
//-->
</script>

<div id="firstNavigation">
	<div id="firstNavigationPanel">
		<input type="hidden" id="id" value="<s:property value='id' />" />
		<input type="hidden" id="isLocal" value="<s:property value='isLocal' />" />
		<input type="hidden" id="isLicenseOnly" value="<s:property value='#parameters.isLicenseOnly' />" />
		<s:if test="%{isLocal}">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_VIEW'})">
				<div id="settingMenu1" class="firstClassNav firstClassNavActive" href="setHost.action">
					<s:text name="server.setting.host" />
				</div>
			</sec:authorize>
			<s:if test="#parameters.isLicenseOnly == null || 'true'!=#parameters.isLicenseOnly[0]">
			<s:if test="isLicenseEnabled('NETWORK_SETTING')">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_EDIT_NETWORK'})">
				<div id="settingMenu2" class="firstClassNav" href="setNetwork.action">
					<s:text name="server.setting.network" />
				</div>
			</sec:authorize>
			</s:if>
			<s:if test="isLicenseEnabled('TIME_SETTING')">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_EDIT_TIMEZONE'})">
				<div id="settingMenu3" class="firstClassNav" href="setTimezone.action">
					<s:text name="server.setting.time" />
				</div>
			</sec:authorize>
			</s:if>
			<s:if test="isLicenseEnabled('STORAGE_SETTING')">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_EDIT_SETSTORAGE'})">
				<div id="settingMenu4" class="firstClassNav" href="setStorage.action">
					<s:text name="server.setting.storage" />
				</div>
			</sec:authorize>
			</s:if>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_EDIT_SOURCESIGNAL'})">
				<div id="settingMenu5" class="firstClassNav" href="setSourceSignal.action">
					<s:text name="server.setting.source.signal" />
				</div>
			</sec:authorize>
			</s:if>
		</s:if>
		<s:else>
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_VIEW'})">
				<div id="settingMenu1" class="firstClassNav firstClassNavActive" href="setHost.action">
					<s:text name="server.setting.host" />
				</div>
			</sec:authorize>
			<s:if test="isLicenseEnabled('NETWORK_SETTING')">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_NETWORK'})">
				<div id="settingMenu2" class="firstClassNav" href="setNetwork.action">
					<s:text name="server.setting.network" />
				</div>
			</sec:authorize>
			</s:if>
			<s:if test="isLicenseEnabled('TIME_SETTING')">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_TIMEZONE'})">
				<div id="settingMenu3" class="firstClassNav" href="setTimezone.action">
					<s:text name="server.setting.time" />
				</div>
			</sec:authorize>
			</s:if>
			<s:if test="isLicenseEnabled('STORAGE_SETTING')">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_STORAGE'})">
				<div id="settingMenu4" class="firstClassNav" href="setStorage.action">
					<s:text name="server.setting.storage" />
				</div>
			</sec:authorize>
			</s:if>
			<s:if test="isLicenseEnabled('LOGGING_SETTING')">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_UPDATE_ASLOG','ROLE_SERVER_UPDATE_LOGGING_SETTING'})">
				<div id="settingMenu5" class="firstClassNav" href="logging.action">
					<s:text name="server.setting.logging"/>
				</div>
			</sec:authorize>
			</s:if>
			<s:if test="isLicenseEnabled('FAULT_SETTING')">
			<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_FAULT'})">
				<div id="settingMenu6" class="firstClassNav" href="faultView.action">
					<s:text name="server.setting.fault"/>
				</div>
			</sec:authorize>
			</s:if>			
		</s:else>
	</div>
	<div id="navLine"></div>
</div>

<div id="content"></div>

<%@ include file="/jsp/include/footer.jsp"%>