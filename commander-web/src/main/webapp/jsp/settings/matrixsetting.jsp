<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/matrixsetting.js");
jspContext.addJSRef("js/settings/selectPort.js");
jspContext.addCssRef("css/settings/matrixsetting.css");
%>

<script type="text/javascript">
	var matrixSetting = new MatrixSetting();

	$(function(){		
		matrixSetting.init();
	});

</script>

<div id="Panel">
	<form id="matrixsettingform">
	<input type="hidden" name="group.id" value="<s:property value='group.id' />" />
	<input type="hidden" name="matrix.id" value="<s:property value='matrix.id' />" />
	<table id="tbl" align="center">
	
	<tr class="header">
		<td rowspan="2" width="104px"><div class="headertext"><s:text name="group.setting.matrix.server"/></div></td>
		<td rowspan="2" width="104px"><div class="headertext"><s:text name="group.setting.matrix.sdiport"/></div></td>
		<td rowspan="2" width="104px"><div class="headertext"><s:text name="group.setting.matrix.outport"/></div></td>
		<td colspan="2" width="198px"><div class="headertext"><s:text name="group.setting.matrix.inport"/></div></td>
		<td rowspan="2" width="173px"><div class="headertext"><s:text name="group.setting.matrix.remarks"/></div></td>
	</tr>
	<tr class="header">
		 <td><div class="headertext"><s:text name="group.setting.matrix.master"/></div></td>
		 <td><div class="headertext"><s:text name="group.setting.matrix.slave"/></div></td>
	</tr>
	<s:iterator var="server" value="group.servers" status="server_sta">
			<s:iterator var="setting" value="#server.matrixSettings" status="setting_sta">
				<tr class="data">
					<s:if test="%{#setting_sta.index==0}">
						<td rowspan="<s:property value='%{#server.matrixSettings.size()}'/>"><s:property value="#server.name"/></td>
						<input type="hidden" name="group.servers[<s:property value="%{#server_sta.index}"/>].id" value="<s:property value='#server.id'/>" />
					</s:if>
					
					<td class="text-center"><input type="hidden" name="group.servers[<s:property value="%{#server_sta.index}"/>].matrixSettings[<s:property value="%{#setting_sta.index}"/>].id" value="<s:property value='#setting.id'/>" />
											<input type="text" name="group.servers[<s:property value="%{#server_sta.index}"/>].matrixSettings[<s:property value="%{#setting_sta.index}"/>].sdiPort"  value="<s:property value='#setting.sdiPort'/>"  readonly/></td>
					<td class="text-center"><input type="text" name="group.servers[<s:property value="%{#server_sta.index}"/>].matrixSettings[<s:property value="%{#setting_sta.index}"/>].matrixOut"  ondblclick="choosePort(this,<s:property value='matrixOutPortCount'/>);" value="<s:property value='#setting.matrixOut'/>"  readonly/></td>
					<td class="text-center"><input type="text" name="group.servers[<s:property value="%{#server_sta.index}"/>].matrixSettings[<s:property value="%{#setting_sta.index}"/>].matrixMasterIn"  ondblclick="choosePort(this,<s:property value='matrixInPortCount'/>);" value="<s:property value='#setting.matrixMasterIn'/>"  readonly/></td>
					<td class="text-center"><input type="text" name="group.servers[<s:property value="%{#server_sta.index}"/>].matrixSettings[<s:property value="%{#setting_sta.index}"/>].matrixSlaveIn"  ondblclick="choosePort(this,<s:property value='matrixInPortCount'/>);" value="<s:property value='#setting.matrixSlaveIn'/>"  readonly/></td>
					<td><input type="text" name="group.servers[<s:property value="%{#server_sta.index}"/>].matrixSettings[<s:property value="%{#setting_sta.index}"/>].remarks" value="<s:property value='#setting.remarks'/>" /></td>
				</tr>
			</s:iterator>
	</s:iterator>
	</table>	
	<div id="btnPanel">
		<button id="btnSave" type="button"><s:text name='common.save' /></button>
	</div>
	</form>
</div>
