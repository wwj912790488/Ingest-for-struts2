<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/hostsetting.js");
jspContext.addCssRef("css/settings/setting.css");
%>

<script type="text/javascript">
<!--
	
	var msgTitle = "<s:text name="msg.dialog.title.warning" />";
	var msgOk = "<s:text name='msg.ok'/>";
	var msgCancel = "<s:text name='msg.cancel'/>";
	var msgDeleteConfirm = "<s:text name="msg.server.delete.confirm" />";
	var msgRenameRequired = "<s:text name="server.group.err.name.required" />";
	var msgRenameTooLong = "<s:text name="server.group.err.name.too.long" />";
	var msgRebootConfirm = "<s:text name="msg.server.reboot.confirm" />";
	var msgShutdownConfirm = "<s:text name="msg.server.shutdown.confirm" />";
	var msgSwitchRoleConfirm = "<s:text name="msg.server.switchrole.confirm" />";
	$(function(){
		var hostSetting = new HostSetting();
		hostSetting.init();
	});
//-->
</script>

<div id="itemList">
<input type="hidden" id="id" value="<s:property value='id' />" />
<input type="hidden" id="isLocal" value="<s:property value='isLocal' />" />
<input type="hidden" id="groupId" value="<s:property value='group.id' />" />

<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_RENAME'})">
<div class="onlyInRemote"><input class="item" id="btnRename" type="button" value="<s:text name='rename' />" /></div>
</sec:authorize>

<s:if test="isBackup==false && group.type==0">
	<s:if test="isLicenseEnabled('MANUAL_SWITCH_M_N')">
	<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_SWITCHSERVER'})">
		<div class="onlyInRemote" ><input class="item" id="btnSwitchServer" type="button" value="<s:text name='switch' />" /></div>
	</sec:authorize>
	</s:if>
</s:if>
<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_DELETE'})">
<div class="onlyInRemote" ><input class="item" id="btnDelete" type="button" value="<s:text name='delete.server' />" /></div>
</sec:authorize>
		
	<s:if test="%{isLocal}">
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_EDIT_REBOOT'})">
			<div> <input class="item" id="btnReboot" type="button" value="<s:text name='reboot.server' />" /></div>
		</sec:authorize>
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_LOCAL_EDIT_SHUTDOWN'})">
			<div><input class="item" id="btnShutdown" type="button" value="<s:text name='shutdown' />" /></div>
		</sec:authorize>
	</s:if>
	<s:else>
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_REBOOT'})">
			<div> <input class="item" id="btnReboot" type="button" value="<s:text name='reboot.server' />" /></div>
		</sec:authorize>
		<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_SHUTDOWN'})">
			<div><input class="item" id="btnShutdown" type="button" value="<s:text name='shutdown' />" /></div>
		</sec:authorize>
	</s:else>
	<s:if test="group.type==1 && group.servers.size > 1">
<sec:authorize access="hasAnyRole({'ROLE_ADMIN','ROLE_SERVER_EDIT_SWITCHROLE'})">
<div><input class="item" id="btnSwitchRole" type="button" value="<s:text name='server.settings.host.switchrole'/>" /></div>
</sec:authorize>
</s:if>
</div>
<%@ include file="/jsp/server/renameserver.jsp" %>
<%@ include file="/jsp/server/switchserver.jsp" %>