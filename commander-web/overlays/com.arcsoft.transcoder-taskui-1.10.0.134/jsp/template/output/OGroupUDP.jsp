<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="UdpStreaming" class="OutputGroupSpecial">
	<input type="hidden" name="OutputGroupSetting" value="UdpStreaming"/>
	<table class="output_group_not_support OutputGroupNotSupport Hide">
		<tr>
			<td>
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="OutputURIInput">
				<div class="TaskLabelText"><s:text name="label.runtime_setting_is_not_support"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="OutputGroupContent">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.destination"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputURIInput">
					<input type="text" name="OutputGroupURI" class="TaskContentText OutputURIInput"
						value="<s:property value="[0].outputGroupSetting.location.uri" />"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.output_ip"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<select name="SourceIP" class="TaskContentText output_group_select">
						<option value="<s:property value="[0].srcIp"/>" selected="selected"></option>
					</select>
				</td>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.output_port"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="SourcePort" class="TaskContentText output_group_text"
						value="<s:property value="[0].srcPort" />"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.buffer_size"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="BufferSize" class="TaskContentText output_group_text"
						value="<s:property value="[0].outputGroupSetting.bufferSize" />"/>
				</td>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText">TTL:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="TTL" class="TaskContentText output_group_text"
						value="<s:property value="[0].outputGroupSetting.ttl" />"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="OutputGroupColumn1 LabelAlign">
					<span class="TaskLabelText">IGMP source IP:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputGroupColumn2">
					<input type="text" name="IgmpSourceIp" class="TaskContentText output_group_text"
						value="<s:property value="[0].outputGroupSetting.igmpSourceIp" />"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<s:include value="/jsp/template/output/CandidateOutputContainer.jsp"/>
		<!-- advance option -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td style="width: 30px">
					<div class="ExpandTrigger ExpandIcon MouseHover ICON_ArrowRight"></div>
				</td>
				<td class="TSAdvancedOptionsCol1">
					<span class="TaskHead3Text ExpandTrigger MouseHover" style="font-weight: bold;"><s:text name="output.advanced_options"/></span>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>