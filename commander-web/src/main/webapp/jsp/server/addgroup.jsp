<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/header.jsp"%>

<%
jspContext.addJSRef("js/server/addgroup.js");
jspContext.addCssRef("css/server/addgroup.css");
%>

<script type="text/javascript">
<!--
var group = new ServerGroup();
var MAX_NAME_LEN = 32;

function addServer(id, name, type, ip, port, added) {
	if (group) {
		var server = new Server(id, name, type, ip, port, added);
		group.add(server);
	}
}

$(document).ready(function() {
	// initialize the grup.
	group.init(<s:property value="editMode"/>);

	scanFrame.document.location = "scanServers.action";

	<s:if test="!actionErrors.isEmpty()">
	var dialog = new window.top.MessageDialog();
	dialog.title = "<s:text name='msg.dialog.title.error'/>";
	dialog.message = $("#errorMessage").html();
	dialog.addButton("<s:text name='msg.ok'/>");
	dialog.setSize(300, 150);
	dialog.show();
	</s:if>
});
//-->
</script>

<!-- Templates -->
<div style="display: none">
	<s:if test="editMode"><s:hidden name="group.servers.size" id="liveServerSize"/></s:if>

	<!-- text template in select page -->
	<div id="workTextTemplate"><s:text name="server.group.add.select.work.title"/></div>
	<div id="backupTextTemplate"><s:text name="server.group.add.select.backup.title"/></div>
	<div id="nameTooLongText"><s:text name="server.group.err.name.too.long"/></div>

	<!-- server list template in select page -->
	<div id="selectTemplate">
		<table style="width: 500px">
			<tr>
				<td id="select_server_id"><input type="checkbox" value="$id$"/><input type="radio" name="server" value="$id$"/></td>
				<td id="select_server_icon"></td>
				<td id="select_server_ip">$ip$</td>
				<td><input type="text"/><span id="serverNameError"></span></td>
			</tr>
		</table>
	</div>

	<!-- server list template in summary page -->
	<div id="summaryTemplate">
		<table width="400px">
			<tr>
				<td id="summary_server_icon"></td>
				<td><div id="summary_server_name" title="$name$">$name$</div><span id="unnamed" style="display: none"><s:text name="server.group.unnamed"/></span><span id="backup" style="display: none">(<s:text name="server.group.backup"/>)</span></td>
				<td id="summary_server_ip">$ip$</td>
			</tr>
		</table>
	</div>

	<!-- submit fields template for save form -->
	<div id="submitFieldsTemplate">
		<input type="hidden" name="group.servers[$index$].id" value="$id$"/>
		<input type="hidden" name="group.servers[$index$].type" value="$type$"/>
		<input type="hidden" name="group.servers[$index$].name" value="$name$"/>
		<input type="hidden" name="group.servers[$index$].ip" value="$ip$"/>
		<input type="hidden" name="group.servers[$index$].port" value="$port$"/>
		<input type="hidden" name="group.servers[$index$].backup" value="$backup$"/>
	</div>

	<iframe id="scanFrame" name="scanFrame"></iframe>
	<div id="errorMessage" style="display: none"><s:actionerror/></div>
</div>

<form id="saveGroupForm" <s:if test="editMode">action="saveServer.action"</s:if><s:else>action="saveGroup.action"</s:else> method="post">
<s:if test="editMode"><s:hidden name="group.id"/></s:if>

<div id="dialog_title">
	<s:if test="editMode">
		<s:text name="server.group.add.server.dialog.title"/>
	</s:if>
	<s:else>
		<s:text name="server.group.add.dialog.title"/>
	</s:else>
</div>

<div id="dialog_content">
	<div id="step_name">
		<table align="center">
			<tr>
				<td><s:text name="server.group.name"/>: </td>
				<td><s:textfield name="group.name"/> <span id="groupNameError"></span></td>
			</tr>
			<tr>
				<td><s:text name="server.group.type"/>: </td>
				<td><s:select name="group.type"
				list="groupTypes" listKey="key" listValue="value"
				headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select></td>
			</tr>
		</table>
	</div>
	<div id="step_select">
		<div id="serverListTitle"></div>
		<div id="serverList"></div>
	</div>
	<div id="step_summary">
		<div id="summaryTitle"><s:text name="server.group.add.summary.title"/></div>
		<div id="summaryGroupNameTitle"><s:text name="server.group.name"/>: </div>
		<div id="summaryGroupName"></div>
		<div style="clear: both"></div>
		<div id="summaryListTitle"><s:text name="server.group.add.summary.list"/>: </div>
		<div id="summaryList"></div>
	</div>
</div>

<div id="dialog_buttons">
	<table width="100%" height="100%">
	<tr><td>
		<input type="button" id="btnCancel" value="<s:text name="server.group.add.button.cancel"/>" onClick="thisDialog().close()"/>
	</td><td align="right">
		<input type="button" id="btnPrevStep" value="<s:text name="server.group.add.button.previous"/>"/>
		<input type="button" id="btnSkip" value="<s:text name="server.group.add.button.skip"/>"/>
		<input type="button" id="btnNextStep" value="<s:text name="server.group.add.button.next"/>"/>
		<input type="button" id="btnDone" value="<s:text name="server.group.add.button.done"/>"/>
	</td></tr>
	</table>
</div>

<div id="hideFormFields" style="display: none"></div>
</form>

<%@ include file="/jsp/include/footer.jsp"%>
