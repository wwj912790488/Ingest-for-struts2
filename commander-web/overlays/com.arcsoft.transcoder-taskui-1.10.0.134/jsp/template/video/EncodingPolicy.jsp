<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="EncodingPolicy">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign TwoPassOption">
				<span class="TaskLabelText"><s:text name="video.two_pass"/>:</span>
			</td>
			<td class="LabelEndSpacing TwoPassOption"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 TwoPassOption">
				<input type="checkbox" name="TwoPass" class="DefaultCheckbox" value="1"
					<s:if test="[0].videoDescription.videoSetting.twoPasses">checked="checked"</s:if> />
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="video.quality_level"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="QualityLevelDisp" class="TaskContentText VideoSelect">
					<option value="3"></option>
				</select>
				<input type="hidden" name="DeviceId" value="<s:property value='[0].videoDescription.videoSetting.deviceId'/>"/>
				<input type="hidden" name="QualityLevel" value="<s:property value='[0].videoDescription.videoSetting.qualityLevel'/>"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
