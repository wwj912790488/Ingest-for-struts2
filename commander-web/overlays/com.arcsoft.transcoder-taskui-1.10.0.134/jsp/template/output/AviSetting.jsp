<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AviSetting">
	<input type="hidden" name="ContainerSetting" value="AVI"/>
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
					<span class="TaskLabelText"><s:text name="output.audio.process.mode"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="TSAdvancedOptionsCol2">
					<select name="AviSplitAudio" class="TaskContentText DefaultSelect">
						<option value="<s:property value='[0].containerSetting.splitAudio'/>" selected="selected"></option>
					</select>					
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
		<div class="AviSplitAudio">
			<!-- line3 -->
			<div class="LineSpacing Hide"></div>
			<table class="Hide">
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="avi.audio_path"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="OutputURIInput">
						<input type="text" name="AviAudioPath" class="TaskContentText OutputURIInput"
							value="<s:property value="[0].containerSetting.audioPath" />"/>
					</td>
					<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="OutputOpenFileButton">
						<div class="TaskLabelText operate_button OpenAviFileTrigger"><s:text name="common.select"/></div>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<!-- line4 -->
			<div class="LineSpacing"></div>
			<table class="AudioFileName">
				<tr>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="avi.audio_name"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="AviAudioName" class="TaskContentText output_group_text"
							value="<s:property value="[0].containerSetting.audioName" />"/>
					</td>
					<td class="TSAdvancedOptionsCol1 LabelAlign">
						<span class="TaskLabelText"><s:text name="output.extension"/>:</span>
					</td>
					<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
					<td class="TSAdvancedOptionsCol2">
						<input type="text" name="AviAudioExt" class="TaskContentText output_group_text" 
							value="<s:property value="[0].containerSetting.audioExt" />"/>
					</td>
					<td><div class="LinePlaceHolder"></div></td>
				</tr>
			</table>
			<div class="LineSpacing"></div>
		</div>
	</div>
</div>