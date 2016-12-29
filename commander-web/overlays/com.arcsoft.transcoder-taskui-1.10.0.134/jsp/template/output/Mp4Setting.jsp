<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="Mp4Setting">
	<input type="hidden" name="ContainerSetting" value="MP4"/>
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
		<!-- line1 -->
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="TSAdvancedOptionsCol1 LabelAlign">
					<span class="TaskLabelText"><s:text name="output.mp4_setting.file_head_foremost"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<input type="checkbox" name="FileHeadForemost" class="DefaultCheckbox" value="1"
						<s:if test='[0].containerSetting.fileHeadForemost.equals(1)'>checked="checked"</s:if> />
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="Mp4AudioProcess Hide">
			<div class="LineSpacing"></div>
			<table>
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.audio.process.mode"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<select name="AudioProcessMode" class="TaskContentText output_group_select">
							 <option value="<s:property value='[0].containerSetting.audioProcessMode'/>" selected="selected"></option>
						</select>					
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
			<div class="Mp4SplitAudio Hide">		
				<table>
					<tr>
						<td class="TSAdvancedOptionsCol1 LabelAlign">
							<span class="TaskLabelText"><s:text name="avi.split_audio"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="TSAdvancedOptionsCol2">
							<input type="checkbox" name="Mp4SplitAudio" class="DefaultCheckbox" value="1"
								<s:if test='[0].containerSetting.splitAudioFile.equals(1)'>checked="checked"</s:if> />
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>					
				<table>
					<tr>
						<td class="TSAdvancedOptionsCol1 LabelAlign">
							<span class="TaskLabelText"><s:text name="avi.audio_path"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="OutputURIInput">
							<input type="text" name="Mp4TargetPath" class="TaskContentText OutputURIInput"
								value="<s:property value="[0].containerSetting.targetPath" />"/>
						</td>
						<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="OutputOpenFileButton">
							<div class="TaskLabelText operate_button OpenMp4FileTrigger"><s:text name="common.select"/></div>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<!-- line4 -->
				<div class="LineSpacing"></div>
				<table>
					<tr>
						<td class="TSAdvancedOptionsCol1 LabelAlign">
							<span class="TaskLabelText"><s:text name="avi.audio_name"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="TSAdvancedOptionsCol2">
							<input type="text" name="Mp4TargetName" class="TaskContentText output_group_text"
								value="<s:property value="[0].containerSetting.targetName" />"/>
						</td>
						<td class="TSAdvancedOptionsCol1 LabelAlign">
							<span class="TaskLabelText"><s:text name="output.extension"/>:</span>
						</td>
						<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
						<td class="TSAdvancedOptionsCol2">
							<input type="text" name="Mp4TargetExt" class="TaskContentText output_group_text" 
								value="<s:property value="[0].containerSetting.targetExt" />"/>
						</td>
						<td><div class="LinePlaceHolder"></div></td>
					</tr>
				</table>
				<div class="LineSpacing"></div>
			</div>
		</div>
	</div>
</div>