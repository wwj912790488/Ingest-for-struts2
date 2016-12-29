<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/groupstorage.js");
jspContext.addCssRef("css/settings/groupstorage.css");
%>

<script type="text/javascript">
<!--
	var STORAGE_DELETE_CONFIRM = '<s:text name="server.setting.storage.warning.deleteStorage"/>';
	$(function() {
		var groupStorage = new GroupStorage();
		groupStorage.init();
	});
//-->
</script>

<div id="storage_actions">
	<div class="left">
		<s:text name="server.setting.storage.remoteStorage"/>
	</div>
	<div class="right">
		<input type="button" class="button" id="btnAddStorage" value="<s:text name="server.setting.storage.add"/>"/>
	</div>
</div>
<div class="clear"></div>
<div>
	<%@ include file="/jsp/settings/errorservers.jsp"%>
	<s:iterator value="groupView.groupList" var="groupData">
	<div class="group_title">
		<div class="storage_name left pointer">
			<div class="group_icon icon_detail_close"></div>
			(${groupData.list.size()})
			${groupData.list[0].data.name}
		</div>
		<div class="storage_path left pointer">
			${groupData.list[0].data.path}
		</div>
		<div class="right">
			<input type="hidden" name="storage.name" value="${groupData.list[0].data.name}"/>
			<input type="hidden" name="storage.path" value="${groupData.list[0].data.path}"/>
			<a class="btnMountStroage" href="javascript: void(0);"><s:text name="server.setting.storage.mount"/></a>
			<a class="btnUnmountStorage" href="javascript: void(0);"><s:text name="server.setting.storage.umount"/></a>
			<a class="btnRemoveStroage" href="javascript: void(0);"><s:text name="action.del"/></a>
		</div>
	</div>
	<div class="clear"></div>
	<div class="group_detail">
		<s:iterator value="#groupData.list" var="serverData">
		<div>
			<div class="left">
				${serverData.server.name} (${serverData.server.ip})
			</div>
			<div class="left field_space"></div>
			<div class="left">
				<s:text name="server.setting.storage.status" />:
				<s:if test="#serverData.data.mounted">
				<s:text name="server.setting.storage.mount"/>
				</s:if><s:else>
				<s:text name="server.setting.storage.umount"/>
				</s:else>
			</div>
		</div>
		<div class="clear"></div>
		</s:iterator>
	</div>
	</s:iterator>
</div>

<%@ include file="/jsp/settings/addStorage.jsp"%>
<%@ include file="/jsp/settings/editStorage.jsp"%>
