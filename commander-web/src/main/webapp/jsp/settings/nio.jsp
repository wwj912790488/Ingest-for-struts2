<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.commander.dao.settings.EthType" %>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addCssRef("css/settings/nio.css");
jspContext.addJSRef("js/settings/nio.js");
%>

<script type="text/javascript">
	var NIOTYPE = {
		<%=EthType.PRIMARY_INPUT%>    : "<s:text name='server.setting.network.nio.primary.input'/>",
		<%=EthType.SECONDARY_INPUT%>  : "<s:text name='server.setting.network.nio.secondary.input'/>",
		<%=EthType.PRIMARY_OUTPUT%>    : "<s:text name='server.setting.network.nio.primary.output'/>",
		<%=EthType.SECONDARY_OUTPUT%> : "<s:text name='server.setting.network.nio.secondary.output'/>"
	}
	var PRIMARY_INPUT_TYPE = <%=EthType.PRIMARY_INPUT%>;
	var SECONDARY_INPUT_TYPE = <%=EthType.SECONDARY_INPUT%>;
	var PRIMARY_OUTPUT_TYPE = <%=EthType.PRIMARY_OUTPUT%>;
	var SECONDARY_OUTPUT_TYPE = <%=EthType.SECONDARY_OUTPUT%>;
	
	
	var msgNoPrimaryInput            = "<s:text name='server.setting.network.nio.warning.noprimaryinput'/>";
	var msgNoOutput                  = "<s:text name='server.setting.network.nio.warning.noprimaryoutput'/>";
	var msgMoreThanOnePrimaryInput   = "<s:text name='server.setting.network.nio.warning.oneprimaryinput'/>";
	var msgMoreThanOneSecondaryInput = "<s:text name='server.setting.network.nio.warning.onesecondaryinput'/>";
	var msgTitle                     = '<s:text name="msg.dialog.title.info"/>';
	var msgSaveSuccess               = '<s:text name="msg.success.save"/>';
	var msgSaveFailed                = "<s:text name='msg.error.setting.network.nio.save'/>";
	
	var nioSetting = new NioSetting();
	$(function() {
		nioSetting.init();
	});
</script>

<div class="nio_content">
	<div>
		<span><s:text name="server.setting.network.nio.title"/></span>
		<span>(<s:text name="server.setting.network.nio.hint"/>)</span>
	</div>
	<div id="space_1"></div>
	<div>
		<table id="nio_list_table">
			<tr>
				<td class="nioName"><s:text name="server.setting.network.nio.name" /></td>
				<td class="nioType"><s:text name="server.setting.network.nio.type" /></td>
				<td></td>
				<td></td>
			</tr>
			<s:iterator value="nios" var="nio">
				<tr>
					<s:hidden name="nioId" value="%{#nio.id}"/>				
					<td class="nioName"><s:property value="#nio.name"/></td>
					<td class="nioType" value="<s:property value='#nio.type'/>">
						<s:property value="nioOptions[#nio.type]"/>
					</td>
					<td class="editBtn" align="center"><a class="editBtn"></a></td>
					<td class="deleteBtn" align="center"><a class="deleteBtn"></a></td>
				</tr>
			</s:iterator>
		</table>
	</div>
	<div id="space_2"></div>
	<div>
		<table id="table_add_nio">
			<tr>
				<td><s:text name="server.setting.network.nio.name" /></td>
				<td><s:text name="server.setting.network.nio.type" /></td>
				<td></td>
			</tr>
			<tr class="addNioFrame">
				<td><input name="inputNioName" type="text" value="" /></td>
				<td><s:select name="selectNioType"
					list="nioOptions" listKey="key" listValue="value">
				</s:select></td>
				<td>
					<button type="button" id="add_button"><s:text name="server.network.add"/></button>
				</td>
			</tr>
		</table>
		<div><span class="error" id="errorAdd"></span></div>	
	</div>
	<div id="space_3"></div>
	<div align="center">
		<button type="button" id="apply_button"><s:text name="server.setting.network.apply" /></button>
	</div>
</div>
<%@ include file="/jsp/settings/editnio.jsp"%>
