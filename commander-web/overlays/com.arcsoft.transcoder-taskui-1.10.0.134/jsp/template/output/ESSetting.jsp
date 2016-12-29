<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ESSetting">
	<input type="hidden" name="ContainerSetting" value="RTPOverES"/>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td style="width: 30px">
				<div class="ExpandTrigger ExpandIcon MouseHover ICON_ArrowDown"></div>
			</td>
			<td class="TSAdvancedOptionsCol1">
				<span class="TaskHead3Text ExpandTrigger MouseHover" style="font-weight: bold;"><s:text name="output.advanced_options"/></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="ExpandTarget ">
		<!-- line1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="essetting.video_port"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="ESVideoPort" class="TaskContentText TSAdvancedOptionsInput2"
						value="<s:property value="[0].containerSetting.videoPort" />"/>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="essetting.audio_port"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="ESAudioPort" class="TaskContentText TSAdvancedOptionsInput2" 
						value="<s:property value="[0].containerSetting.audioPort" />"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line2 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.destination"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="ESTargetPath" class="TaskContentText OutputURIInput"
						value="<s:property value="[0].containerSetting.targetPath" />"/>
				</td>
				<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="OutputOpenFileButton">
					<div class="TaskLabelText operate_button OpenSdpPathTrigger"><s:text name="common.select"/></div>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<!-- line3 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.targetName"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="ESTargetName" class="TaskContentText TSAdvancedOptionsInput2"
						value="<s:property value="[0].containerSetting.targetName" />"/>
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.extension"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="text" name="ESExtension" class="TaskContentText TSAdvancedOptionsInput2" 
						value="<s:property value="[0].containerSetting.extension" />"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>