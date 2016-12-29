<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="UdpStreaming" class="OutputGroupSpecial">
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.destination"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.location.uri" /></span>
	</div>
	
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="output.buffer_size"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.bufferSize" /></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl">TTL:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.ttl" /></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl">IGMP source IP:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.igmpSourceIp" /></span>	
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="output.output_ip"/>:</span>
		<span class="val">
			<s:property value="getLocalIpOption([0].srcIp)" />
		</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="output.output_port"/>:</span>
		<span class="val"><s:property value="[0].srcPort" /></span>	
	</div>
	
	<s:iterator value="[0].outputGroupSetting.candidateOutputs" var="cOutput">	
		<div class="paramCol1">
			<span class="TaskLabelText lbl"><s:text name="input.alternate_location"/>:</span>
			<span class="val"><s:property value="[0].uri" /></span>
		</div>
		<div class="param">
			<span class="TaskLabelText lbl"><s:text name="output.buffer_size"/>:</span>
			<span class="val"><s:property value="[0].bufferSize" /></span>
		</div>
		<div class="param">
			<span class="TaskLabelText lbl">TTL:</span>
			<span class="val"><s:property value="[0].ttl" /></span>
		</div>
		<div class="param">
			<span class="TaskLabelText lbl">IGMP source IP:</span>
			<span class="val"><s:property value="[0].igmpSourceIp" /></span>	
		</div>
		<div class="param">
			<span class="TaskLabelText lbl"><s:text name="output.output_ip"/>:</span>
			<span class="val">
				<s:property value="getLocalIpOption([0].srcIp)" />
			</span>
		</div>
		<div class="param">
			<span class="TaskLabelText lbl"><s:text name="output.output_port"/>:</span>
			<span class="val"><s:property value="[0].port" /></span>	
		</div>
	</s:iterator>
		
	<s:if test="[0].containerSetting.containerSettingType.item2=='TS'">	
		<%@ include file="TSAdvancedOptions.jsp" %>
	</s:if>
	
</div>