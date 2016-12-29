<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addCssRef("css/settings/niobinding.css");
jspContext.addJSRef("js/settings/niobinding.js");
%>

<script type="text/javascript">
	var id = '<s:property value="id"/>';
	var isLocal = '<s:property value="isLocal"/>';
	var msgTitle          = '<s:text name="msg.dialog.title.info"/>';
	var msgSaveSuccess    = '<s:text name="msg.success.save"/>';
	var msgBindingFailed  = "<s:text name='msg.error.setting.network.nio.binding'/>";
	
	var nioBinding = new NioBinding();
	$(function() {
		nioBinding.init();
	});
</script>

<div class="nio_content">
	<div>
		<s:text name="server.setting.network.nio.title" />
	</div>
	<div id="space_1"></div>
	<div>
		<form id="nio_binding_from">
			<table id="nio_list_table">
				<tr>
					<td class="nioName"><s:text name="server.setting.network.nio.name"/></td>
					<td class="nioType"><s:text name="server.setting.network.nio.type"/></td>
					<td class="nioEth"><s:text name="server.setting.network.eth.label"/></td>
					<td></td>
				</tr>
				<s:iterator value="nios" var="nio"  status="st">
					<s:hidden name="niobs[%{#st.index}].nio" value="%{#nio.id}"/>
					<s:hidden name="niobs[%{#st.index}].type" value="%{#nio.type}"/>
					<tr>
						<td class="nioName"><s:property value="#nio.name"/></td>
						<td class="nioType"><s:property value="nioOptions[#nio.type]"/></td>
						<td class="nioEth">
							<select name="niobs[<s:property value='%{#st.index}'/>].eth">
								<s:if test="getNioBindingEth(#nio.id) == ''">
									<option selected value=""><s:property value=""/><s:text name="common.select.text"/></option>
								</s:if>
								<s:else>								
									<option value=""><s:property value=""/><s:text name="common.select.text"/></option>
								</s:else>
								<s:iterator value="eths" var="eth">
									<s:if test="getNioBindingEth(#nio.id) == #eth.id">
										<option selected value="<s:property value='%{#eth.id}'/>"><s:property value="%{#eth.id}"/>(<s:property value="%{#eth.ip}"/>)</option>
									</s:if>
									<s:else>								
										<option value="<s:property value='%{#eth.id}'/>"><s:property value="%{#eth.id}"/>(<s:property value="%{#eth.ip}"/>)</option>
									</s:else>
								</s:iterator>
							</select>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div><span class="error"></span></div>			
			<div id="space_3"></div>
			<div align="center">
				<button type="button" id="apply_button"><s:text name="server.setting.network.apply" /></button>
			</div>				
		</form>
	</div>
</div>
