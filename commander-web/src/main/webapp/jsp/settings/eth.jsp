<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/eth.js");
jspContext.addCssRef("css/settings/setting.css");
%>

<script type="text/javascript">
<!--
	var id = "<s:property value='id' />";
	var isLocal = "<s:property value='isLocal' />";
	var msgTitle = "<s:text name="msg.dialog.title.warning" />";
	var msgOk = "<s:text name='msg.ok'/>";
	var msgInvalidIp = "<s:text name='settings.err.invalid.ip'/>";
	var msgInvalidMask = "<s:text name='settings.err.invalid.netmask'/>";
	var msgInvalidGateway = "<s:text name='settings.err.invalid.gateway'/>";
	var strNull = "<s:text name='common.null'/>";
	var curEth="<s:property value='eths[index].id' />";
	
	$(function(){
		var eth = new Eth();
		eth.init();
	});
//-->
</script>

<div id="eth">
	<div id="ethTabList">		
		<s:iterator value="eths" var="eth" status="status">
		<div class="ethTab <s:if test="#status.index==index">ethTabActive</s:if>" index="<s:property value='#status.index' />" id="<s:property value='#eth.id' />">	
			<s:if test="#eth.status=='RUNNING'">
				<img class="state" alt="eth" src="images/settings/Network port.png" >
			</s:if>
			<s:else>
				<img class="state" alt="eth" src="images/settings/Network port_disconnect.png" >
			</s:else>
			<div><s:property value='#eth.id' /></div>
			<div><span class="usedRate">0</span>%(<s:property value="#eth.speed" />)</div>			
		</div>
		</s:iterator>		
	</div>
	<s:iterator value="eths" var="eth" status="status">
		<div class="ethContent <s:if test="#status.index!=index">hidden</s:if>" id="eth-<s:property value='#status.index'/>" index="<s:property value='#status.index' />">
			<s:form action="saveEth" method="post">
				<%-- this id will be eth id, not server id, why? 
				<s:hidden name="id"> 
				--%>
				<s:hidden name="isLocal" />
				<s:hidden name="index" value="%{#status.index}" />
				<s:hidden name="eths[%{#status.index}].id" />
				<table>		
					<tr>
						<td class="ethLabel"><s:label key="server.setting.network.eth.name" />:</td>
						<td class="ethVal">
							<s:if test="eths[#status.index].master == null">
								<s:property value="eths[#status.index].id" />
							</s:if>
							<s:else>
								<s:property value="eths[#status.index].master" />
							</s:else>
						</td>
					</tr>
					
					<tr>
						<td class="ethLabel"><s:label key="server.setting.network.eth.bond" />:</td>
						<td class="ethVal">	
							<select name="slaveId" id="slaveId">		
								<option value="" <s:if test="eths[#status.index].master == null">selected="selected"</s:if>>
									<s:text name="common.null" />
								</option>			
								<s:iterator value="eths" var="bondEth" status="bondStatus">	
									<s:if test="eths[#status.index].master == null">
										<s:if test="#bondStatus.index != #status.index && #bondEth.master == null">
											<option value=<s:property value="#bondEth.id" /> >
												<s:property value="#bondEth.id"/>												
											</option>
										</s:if>
									</s:if>
									<s:else>
										<s:if test="#bondStatus.index != #status.index && getSlaveId(#eth.id) == #bondEth.id">>
											<option value=<s:property value="#bondEth.id" /> selected="selected">
												<s:property value="#bondEth.id"/>
											</option>
										</s:if>										
									</s:else>
								</s:iterator>
							</select>													
						</td>
					</tr>	

					<tr  class="<s:if test="getSlaveId(#eth.id) == null">hidden</s:if>">
						<td class="ethLabel"><s:label key="server.setting.network.eth.primary" />:</td>
						<td class="ethVal">	
							<select name="eths[<s:property value='#status.index'/>].primary" id="<s:property value='#eth.id'/>">
								<option value=""><s:text name="common.null" /></option>
								<option value=<s:property value="#eth.id" /> <s:if test="#eth.primary == #eth.id">selected="selected" </s:if>><s:property value="#eth.id"/></option>	
								
								<s:if test="getSlaveId(#eth.id) != null">
									<option value=<s:property value="getSlaveId(#eth.id)" /> <s:if test="#eth.primary == getSlaveId(#eth.id)">selected="selected" </s:if>>
									<s:property value="getSlaveId(#eth.id)"/></option>	
								</s:if>
							</select>
						</td>
					</tr>

					<tr id="primaryReselect" class="<s:if test="#eth.primary == null">hidden</s:if>">
						<td class="ethLabel"><s:label key="server.setting.network.eth.primary.reselect" />:</td>
						<td class="ethVal">
							<s:select name="eths[%{#status.index}].primaryReselect"
							headerKey="" headerValue="%{getText('common.default')}"
							list="primaryReselectOptions" listKey="key" listValue="value"/>
						</td>
					</tr>

					<tr class="<s:if test="eths[#status.index].mode != 1">hidden</s:if>"  >
						<td class="ethLabel"><s:label key="server.setting.network.eth.activity" />:</td>
						<td class="ethVal" id="eths[<s:property value='#status.index'/>].activity">
							<s:if test="#eth.activity != null"><s:property value="#eth.activity" /></s:if>
							<s:else><s:text name="common.null" /></s:else>
						</td>
					</tr>
					
					<tr>
						<td class="ethLabel"><s:label key="server.setting.network.eth.ip.method" />:</td>
						<td class="ethVal"><s:select   
							list="#{true:getText('server.setting.network.eth.DHCP'), false:getText('server.setting.network.eth.static')}"
							name="eths[%{#status.index}].isDHCP"/>
						</td>
					</tr>
				
					<tr id="ip">
						<td class="ethLabel"><s:label key="server.setting.network.eth.ip.address" />:</td>
						<td class="ethVal"><s:textfield  name="eths[%{#status.index}].ip" disabled="%{#eth.isDHCP}" />
							<span class="alert"></span>								
						</td>								
					</tr>
					
					<tr id="netmask">
						<td class="ethLabel"><s:label key="server.setting.network.eth.netmask" />:</td>
						<td class="ethVal"><s:textfield  name="eths[%{#status.index}].mask" disabled="%{#eth.isDHCP}" />
							<span class="alert"></span>							
						</td>								
					</tr>
					
					<tr id="gateway">
						<td class="ethLabel"><s:label key="server.setting.network.eth.gateway" />:</td>
						<td class="ethVal"><s:textfield  name="eths[%{#status.index}].gateway" disabled="%{#eth.isDHCP}" />
							<span class="alert"></span>
						</td>								
					</tr>	
				</table>				
				<div style="width:420px; text-align:center">
				<input class="submitBtn" type="button" value="<s:text name='server.setting.network.apply' />" />				
				</div>				
			</s:form>
		</div>
	</s:iterator>
	<div class="clear"></div>		
</div>

