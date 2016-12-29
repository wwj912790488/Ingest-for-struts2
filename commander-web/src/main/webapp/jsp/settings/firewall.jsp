<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
	jspContext.addJSRef("js/settings/firewall.js");
	jspContext.addCssRef("css/settings/firewall.css");
%>

<script>
	var id = '<s:property value="id"/>';
	var isLocal = '<s:property value="isLocal"/>';
	var title = '<s:text name="msg.dialog.title.warning" />';
	var buttonOK = '<s:text name="msg.ok" />';
	var isFirewallOn = '<s:property value="isFirewallOn"/>';
	var msgAddFailed = '<s:text name="msg.error.server.network.firewall.add" />';
	var msgDeleteFailed = '<s:text name="msg.error.server.network.firewall.delete" />';
	var msgStartFailed = '<s:text name="msg.error.server.network.firewall.start" />';
	var msgStopFailed = '<s:text name="msg.error.server.network.firewall.stop" />';

	$(function() {
		var dao = new FirewallDAO();
		dao.init();
	});
</script>

<div class="firewall_content">
	<div class="div_onOff">
		<table class="tabl_onOff">
			<tr>
				<td id="lable"><s:text name="server.network.firewall.firewall" /></td>
				<td id="td_on"><input id="firewall_on" class="radio_onOff" type="radio"
					name="onOff" value="on" <s:if test="isFirewallOn==true">checked="checked"</s:if> /></td>
				<td id="td_on_text"><s:text name="server.network.firewall.on" /></td>
				<td id="td_off"><input id="firewall_off" class="radio_onOff" type="radio"
					name="onOff" value="off" <s:if test="isFirewallOn==false">checked="checked"</s:if> /></td>
				<td id="td_off_text"><s:text name="server.network.firewall.off" /></td>
			</tr>
		</table>

		<div></div>
		<div></div>
	</div>
	<s:if test="isFirewallOn==true">
	<div id="fireware_rules">
		<div id="space1"></div>
		<div>
			<table class="firewall_table">
				<s:iterator value="rules" var="var" status='st'>
					<tr>
						<td class="lable_td"><s:text
								name="server.network.firewall.open_port" />:</td>
						<td class="protocol_td"
							id="protocol_<s:property value="#st.index+1"/>"><s:property
								value="#var.protocol" /></td>
						<td class="dest_port_td"
							id="dport_<s:property value="#st.index+1"/>"><s:property
								value="#var.dport" /></td>
						<td class="deleteBtn" align="center"><a class="deleteBtn"
							index="<s:property value="#st.index+1"/>"></a></td>
					</tr>
				</s:iterator>
			</table>
		</div>
		<div id="space2"></div>
		<div>
			<table width=100% id="table_add_firewall">
				<tr>
					<td><s:text name="server.network.firewall.dport_type" />:<select
						class="port_type" name="port_type">
							<option value="tcp">TCP</option>
							<option value="udp">UDP</option>
					</select></td>
					<td><s:text name="server.network.firewall.dport" />/<s:text name="server.network.firewall.dport_range" />:<input
						id="input_dport" name="dport" type="text" value="" /></td>
					<td>
						<button type="button" id="add_button">
							<s:text name="server.network.add" />
						</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
	</s:if>
</div>