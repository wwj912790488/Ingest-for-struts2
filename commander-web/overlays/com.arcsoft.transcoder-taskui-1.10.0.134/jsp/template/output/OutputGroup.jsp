<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="OutputGroup" class="OutputGroup output_group">
	<input type="hidden" name="OutputGroupLabel" 
		value="<s:property value="[0].label" />"/>
	<input type="hidden" name="OutputGroupActive" 
		value="<s:property value="[0].active" />"/>
	<table class="OutputGroupDescription">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="common.description"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputGroupColumnEnd">
				<input type="text" name="OutputGroupDescription" class="TaskContentText OutputURIInput"
					value="<s:property value="[0].description" />"/>
			</td>
		</tr>
	</table>
	<div class="LineSpacing OutputGroupDescription"></div>
	<div class="LineSpacing OutputGroupDescription"></div>
	<table class="OutputGroupType">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="output.outputGroupType"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputGroupColumn2">
				<select name="OutputGroupType" class="TaskContentText output_group_select">
					<option value="<s:property value="[0].settingsType" />" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing OutputGroupType"></div>
	<div class="LineSpacing utputGroupType"></div>
	<table class="OutputGroupContainerType">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="output.containerType"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="OutputGroupColumn2">
				<select name="OutputGroupContainer" class="TaskContentText output_group_select">
					<option value="<s:property value="[0].container" />" selected="selected"></option>					
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing OutputGroupContainerType"></div>
	<div class="LineSpacing OutputGroupContainerType"></div>
	<table class="OutputGroupSupportCodec">
		<tr>
			<td class="OutputGroupColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="output.outputGroupCodec"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskContentText ContainerVideoAudio"></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing OutputGroupSupportCodec"></div>
	<div class="OutputGroupOption">
		<s:if test='[0].settingsType.equalsIgnoreCase("AppleStreaming")'>
			<s:include value="/jsp/template/output/OGroupAppleStreaming.jsp" />
		</s:if>
		<s:elseif test='[0].settingsType.equalsIgnoreCase("FlashStreaming")'>
			<s:include value="/jsp/template/output/OGroupFlash.jsp" />
		</s:elseif>
		<s:elseif test='[0].settingsType.equalsIgnoreCase("FileArchive")'>
			<s:include value="/jsp/template/output/OGroupArchive.jsp" />
		</s:elseif>
		<s:elseif test='[0].settingsType.equalsIgnoreCase("UdpStreaming")'>
			<s:include value="/jsp/template/output/OGroupUDP.jsp" />
		</s:elseif>
		<s:elseif test='[0].settingsType.equalsIgnoreCase("RtpStreaming")'>
			<s:include value="/jsp/template/output/OGroupRTP.jsp" />
		</s:elseif>
		<s:elseif test='[0].settingsType.equalsIgnoreCase("MSStreaming")'>
			<s:include value="/jsp/template/output/OGroupMSS.jsp" />
		</s:elseif>
		<s:elseif test='[0].settingsType.equalsIgnoreCase("HttpStreaming")'>
			<s:include value="/jsp/template/output/OGroupHTTP.jsp"/>
		</s:elseif>
		<s:elseif test='[0].settingsType.equalsIgnoreCase("ASIStreaming")'>
			<s:include value="/jsp/template/output/OGroupASI.jsp"/>
		</s:elseif>
		<s:elseif test='[0].settingsType.equalsIgnoreCase("SDIStreaming")'>
			<s:include value="/jsp/template/output/OGroupSDI.jsp"/>
		</s:elseif>
	</div>
	<div class="ContainerSettingDiv">
	<s:if test='[0].container.equalsIgnoreCase("TS")'>
		<s:include value="/jsp/template/output/TSAdvancedOptions.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("HLS")'>
		<s:include value="/jsp/template/output/TSAdvancedOptions.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("UDPOverTS")'>
		<s:include value="/jsp/template/output/TSAdvancedOptions.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("TSOverHTTP")'>
		<s:include value="/jsp/template/output/TSAdvancedOptions.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("ASIStreaming")'>
		<s:include value="/jsp/template/output/TSAdvancedOptions.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("MXF")'>
		<s:include value="/jsp/template/output/MxfSetting.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("MP4") || [0].container.equalsIgnoreCase("MOV") || [0].container.equalsIgnoreCase("FLV")'>
		<s:include value="/jsp/template/output/Mp4Setting.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("AVI")'>
		<s:include value="/jsp/template/output/AviSetting.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("RTPOverES")'>
		<s:include value="/jsp/template/output/ESSetting.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("RTPOverTS")'>
		<s:include value="/jsp/template/output/TSOverRTPSetting.jsp"/>
	</s:if>
	</div>
	<div class="DrmSettingDiv">
	<s:if test='[0].container.equalsIgnoreCase("HLS")'>
		<s:include value="/jsp/template/output/DRMOptions.jsp"/>
	</s:if>
	<s:if test='[0].container.equalsIgnoreCase("MP4")'>
		<s:include value="/jsp/template/output/DRMOptions.jsp"/>
	</s:if>
	</div>
	<div class="LineSpacing"></div>
	<table class="StreamSettingTable">
		<tr style="background-color: #f5f5f5; height: 40px">
			<td>
				<table>
					<tr>
						<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
						<td>
							<span class="TaskHead2Text"><s:text name="output.streamSetting"/></span>
						</td>
						<td style="width: 80px">
							<div class="TaskLabelText operate_button NewOutputTrigger"><s:text name="stream.new_stream"/></div>
						</td>
						<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr style="background-color: #ffffff;">
			<td>
				<table>
					<tr>
						<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
						<td class="OutputFlock">
							<s:iterator value="[0].getLiveOutputs()">
							<s:include value="/jsp/template/output/Output.jsp" />
							</s:iterator>
						</td>
						<td class="OutputIndent"><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
