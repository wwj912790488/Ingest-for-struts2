<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="PipItemTmpl" class="PipItem">
	<!-- Line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PipColumn1">
				<span class="TaskLabelText PipItemIndex">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.pip.pip_file"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 400px">
				<input type="text" name="PipUri" class="TaskContentText" style="width: 380px"
					value=""/>
			</td>
			<td style="width: 20px">
				<div class="SelectPipTrigger icon_folder MouseHover"></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeletePipTrigger MouseHover ICON_Delete"></div>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line2 -->
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="PipColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.program"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<select name="PipProgramId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="PipProgramIdDown" value="-1"/>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.audio_track"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<select name="PipAudioTrackId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="PipAudioTrackIdDown" value="-1"/>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.subtitle"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<select name="PipSubtitleId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="PipSubtitleIdDown" value="-2"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line3 -->
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="PipColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.media_info"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskContentText PipMediaInfo"></span>
			</td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- Line4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PipColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.xpos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<input type="text" name="PipX" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.ypos"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<input type="text" name="PipY" class="TaskContentText VideoText"
					value="0"/>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.pip.alpha"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<input type="text" name="PipAlpha" class="TaskContentText VideoText"
					value="100"/>
				<span class="TaskContentText">%</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="PipColumn1">
				<div class="LinePlaceHolder"></div>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.width"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<input type="text" name="PipWidth" class="TaskContentText VideoText"
					value="100"/>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.height"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<input type="text" name="PipHeight" class="TaskContentText VideoText"
					value="100"/>
			</td>
			<td class="PipColumn2 LabelAlign">
				<span class="TaskLabelText"><s:text name="editor.pip.insert_time"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="PipColumn3">
				<input type="text" name="PipInsertTime" class="TaskContentText VideoText"
					value="0:0:0:0"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
