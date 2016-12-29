<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/plugin/My97DatePicker/WdatePicker.js");
jspContext.addJSRef("js/settings/grouptime.js");
jspContext.addCssRef("css/settings/grouptime.css");
%>

<script type="text/javascript">
<!--
var txtNTPServer = '<s:text name="server.setting.ntp.server"/>';
var msgEmptyServer = "<s:text name='msg.error.ntp.server.empty' />";
var msgInvalidServer = "<s:text name='msg.error.ntp.server.invalid'/>";
var msgEmptyDate = "<s:text name='msg.error.date.empty'/>";

$(function() {
	var groupTime = new GroupTime();
	groupTime.init();
});
//-->
</script>

<div id="time_update_panel">
	<table align="center">
		<tr>
			<td class="field_label"><s:text name="server.setting.time" />:</td>
			<td><s:radio id="timeUpdateMode" name="timeUpdateMode" value="true"
				list="#{true:getText('server.setting.time.sync.ntp'), false:getText('server.setting.time.manual.set')}" /></td>
		</tr>
		<tr id="ntpsyncPanel">
			<td class="field_label"><s:text name="server.setting.ntp.server"/>: </td>
			<td>
				<input type="text" id="ntpServerInput"/><input id="btnAddNtpServer" type="button" value="<s:text name="common.action.add"/>"/><input id="btnRemoveNtpServer" type="button" value="<s:text name="common.action.remove"/>"/><br/>
				<div id="serverList">
					<table id="ntpServerList" rules="none">
					</table>
				</div>
			</td>
		</tr>
		<tr id="datetimePanel" class="hidden">
			<td class="field_label"><s:text name="server.setting.date" />:</td>
			<td><input id="calander" class="Wdate" type="text" onclick="WdatePicker()"></td>
		</tr>
		<tr>
			<td></td>
			<th><input id="btnSaveTime" type="button" class="button" value="<s:text name='common.action.save'/>"/></th>
		</tr>
	</table>
</div>
<div>
	<%@ include file="/jsp/settings/errorservers.jsp"%>
	<s:iterator value="groupView.groupList" var="groupData">
	<div class="group_title">
		<div class="left time_list">
			<div class="group_icon icon_detail_close"></div>
			(${groupData.list.size()})
			${groupData.name}
		</div>
	</div>
	<div class="clear"></div>
	<div class="group_detail">
		<s:iterator value="#groupData.list" var="serverData">
		<div>${serverData.server.name} (${serverData.server.ip})</div>
		</s:iterator>
	</div>
	</s:iterator>
</div>

