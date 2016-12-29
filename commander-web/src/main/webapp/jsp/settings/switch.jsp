<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.commander.dao.settings.EthType" %>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addCssRef("css/settings/switch.css");
jspContext.addJSRef("js/settings/switch.js");
%>


<script type="text/javascript">
	var serverId = "<s:property value='id'/>";
	var isLocal = '<s:property value="isLocal"/>';
	var msgDuplicate   = "<s:text name='server.setting.fault.error.switch.duplicate'/>"
	var msgCommunityEmpty = "<s:text name='server.setting.fault.error.invalid.community'/>"
	var msgInvalidIp   = "<s:text name='settings.err.invalid.ip'/>"
	var msgInvalidIfindex = "<s:text name='server.setting.fault.error.invalid.ifindex'/>"
	var msgSaveSuccess = '<s:text name="msg.success.save"/>';

	$(function(){
		var switchSetting = new SwitchSetting();
		switchSetting.init();
	});	
</script>

<div class="switch_content">
	<div>
		<span><s:text name="server.setting.fault.switch.title"/></span>
	</div>
	<div id="space_1"></div>
	<div>
		<table id="switch_list_table">
			<tr>
				<td class="community"><s:text name="server.setting.fault.switch.community" /></td>
				<td class="ip"><s:text name="server.setting.fault.switch.ip" /></td>
				<td class="ifindex"><s:text name="server.setting.fault.switch.ifindex" /></td>
				<td></td>
				<td></td>
			</tr>
			<s:iterator value="switchList" var="switchSetting">
				<tr>
					<s:hidden name="id" value="%{#switchSetting.id}"/>				
					<s:hidden name="serverId" value="%{#switchSetting.serverId}"/>				
					<td class="community"><s:property value="#switchSetting.community"/></td>
					<td class="ip"><s:property value="#switchSetting.ip"/></td>
					<td class="ifindex"><s:property value="#switchSetting.ifindex"/></td>
					<td class="editBtn" align="center"><a class="editBtn"></a></td>
					<td class="deleteBtn" align="center"><a class="deleteBtn"></a></td>
				</tr>
			</s:iterator>
		</table>
	</div>
	<div id="space_2"></div>
	<div>
		<table id="table_add_switch">
			<tr>
				<td class="community"><s:text name="server.setting.fault.switch.community" /></td>
				<td class="ip"><s:text name="server.setting.fault.switch.ip" /></td>
				<td class="ifindex"><s:text name="server.setting.fault.switch.ifindex" /></td>
				<td></td>
			</tr>
			<tr class="addSwitchFrame">
				<td><input name="inputCommunity" type="text" value="" /></td>
				<td><input name="inputIp" type="text" value="" /></td>
				<td><input name="inputIfindex" type="text" value="" /></td>
				<td>
					<button type="button" id="add_button"><s:text name="server.network.add"/></button>
				</td>
			</tr>
		</table>
		<div><span class="error" id="errorAdd"></span></div>	
	</div>
	<div id="space_3"></div>
	<div align="center">
		<button type="button" id="apply_button"><s:text name="server.setting.fault.apply" /></button>
	</div>
</div>
<%@ include file="/jsp/settings/editswitch.jsp"%>
