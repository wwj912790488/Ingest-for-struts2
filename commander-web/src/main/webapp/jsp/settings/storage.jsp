<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
	jspContext.addJSRef("js/settings/storage.js");
	jspContext.addCssRef("css/settings/storage.css");
%>

<script type="text/javascript">
<!--
	var msg_mountFail= '<s:text name="msg.error.setting.storage.mount.fail"/>';
	var msg_unmountFail= '<s:text name="msg.error.setting.storage.unmount.fail"/>';
	var msg_deleteFail= '<s:text name="msg.error.delete.fail"/>';
	var msg_addFail= '<s:text name="msg.error.add.fail"/>';
	var msg_editFail= '<s:text name="msg.error.edit.fail"/>';
	var msg_Ok='<s:text name="msg.ok"/>';
	var msg_Cancel='<s:text name="msg.cancel"/>';
	var msg_warning = '<s:text name="msg.dialog.title.warning"/>';
	var msg_deleteStorage = '<s:text name="server.setting.storage.warning.deleteStorage"/>';
	var msg_unmountBeforeEdit = '<s:text name="server.setting.storage.warning.unmountBeforeEdit"/>';
	var serviceId = '<s:property value="id"/>';
	var isLocal = '<s:property value="isLocal"/>';
	var storage = new Storage();
	storage.init();
//-->
</script>

<div id="content_storage">
	<div id="remoteStorage">
		<div class="group_head">
			<s:text name="server.setting.storage.remoteStorage" />
		</div>
		<table>
			<tr>
				<th><div class="td_name"><s:text name="server.setting.storage.name" /></div></th>
				<th><div class="td_path"><s:text name="server.setting.storage.remotePath" /></div></th>
				<th><div class="td_status"><s:text name="server.setting.storage.status" /></div></th>
				<th><div class="td_buttons"></div></th>
			</tr>
			<tr>
				<td class="td_space"></td>
				<td class="td_space"></td>
				<td class="td_space"></td>
				<td class="td_space"></td>
			</tr>
			<s:iterator value="remoteStorageList" var="var" status="st">
				<tr>
					<td><div class="td_name ellipsis" id=<s:property value='#var.id'/>_name><s:property value="#var.name" /></div></td>
					<td><div class="td_path ellipsis" id=<s:property value='#var.id'/>_path><s:property value="#var.path" /></div></td>
					<td><div class="td_status">
							<s:if test="storageStatusList[#st.index]"><s:text name="server.setting.storage.mount"/></s:if>
							<s:else><s:text name="server.setting.storage.umount"/></s:else>
						</div>
					</td>
					<td style="display:none"><div id=<s:property value='#var.id'/>_user><s:property value="#var.user" /></div></td>
					<td style="display:none"><div id=<s:property value='#var.id'/>_pwd><s:property value="#var.pwd" /></div></td>
					<td style="display:none"><div id=<s:property value='#var.id'/>_type><s:property value="#var.type" /></div></td>
					<td><div class="td_buttons">
						<a index=<s:property value='#var.id'/> class="right del_button"><s:text name="action.del"/></a>
						<s:if test="storageStatusList[#st.index]">
							<a index=<s:property value='#var.id'/> isMount="true" class="right edit_button"><s:text name="action.edit"/></a>
							<a class="right unmount" index=<s:property value='#var.id'/>><s:text name="server.setting.storage.umount"/></a>
						</s:if>
						<s:else>
							<a index=<s:property value='#var.id'/> isMount="false" class="right edit_button"><s:text name="action.edit"/></a>
							<a class="right mount" index=<s:property value='#var.id'/>><s:text name="server.setting.storage.mount"/></a>
						</s:else>
					</div></td>
				</tr>
				<tr>
					<td class="td_space"></td>
					<td class="td_space"></td>
					<td class="td_space"></td>
					<td class="td_space"></td>
				</tr>
			</s:iterator>
		</table>
		<div id="div_addButton">
			<button class="right" id="add_button">
				<s:text name="server.setting.storage.add" />
			</button>
		</div>
	</div>
</div>
<%@ include file="/jsp/settings/addStorage.jsp"%>
<%@ include file="/jsp/settings/editStorage.jsp"%>