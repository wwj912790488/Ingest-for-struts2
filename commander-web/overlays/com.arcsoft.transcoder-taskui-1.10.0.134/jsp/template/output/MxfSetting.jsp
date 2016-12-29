<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="MxfSetting">
	<input type="hidden" name="ContainerSetting" value="MXF"/>
	<%-- <div class="LineSpacing"></div>
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
	<div class="LineSpacing"></div>--%>
	<div class="ExpandTarget Hide">
		<!-- line0 -->
		<div class="LineSpacing Hide"></div>
		<table class="Hide">
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">Wrap Mode:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<select name="MxfWrapMode" class="TaskContentText output_group_select">
						<option value="<s:property value='[0].containerSetting.wrapMode'/>" selected="selected"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing Hide"></div>
		<!-- line1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText">Operational Pattern:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<select name="OperationalPattern" class="TaskContentText output_group_select">
						<option value="<s:property value='[0].containerSetting.operationalPattern'/>" selected="selected"></option>
					</select>
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
					<span class="TaskLabelText"><s:text name="output.audio.process.mode"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<select name="AudioProcessMode" class="TaskContentText DefaultSelect">
						<option value=""></option>
					</select>					
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<table class="Hide">
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.mxf_setting.audio_track_follow_source"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="checkbox" name="AudioTrackFollowSource" class="DefaultCheckbox" value="1"
						<s:if test='[0].containerSetting.audioTrackFollowSource.equals(1)'>checked="checked"</s:if> />
				</td>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.mxf_setting.audio_channel_split"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="checkbox" name="AudioChannelSplit" class="DefaultCheckbox" value="1"
						<s:if test='[0].containerSetting.audioChannelSplit.equals(1)'>checked="checked"</s:if> />
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="MxfOpAtom">
			<!-- line3 -->
			<div class="LineSpacing Hide"></div>
			<table class="Hide">
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="mxf.target_path"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="OutputURIInput">
						<input type="text" name="MxfTargetPath" class="TaskContentText OutputURIInput"
							value="<s:property value="[0].containerSetting.targetPath" />"/>
					</td>
					<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="OutputOpenFileButton">
						<div class="TaskLabelText operate_button OpenMxfFileTrigger"><s:text name="common.select"/></div>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<!-- line4 -->
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="mxf.target_name"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="MxfTargetName" class="TaskContentText output_group_text"
							value="<s:property value="[0].containerSetting.targetName" />"/>
					</td>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.extension"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="MxfTargetExt" class="TaskContentText output_group_text" 
							value="<s:property value="[0].containerSetting.targetExt" />"/>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
		</div>
	</div>
</div>