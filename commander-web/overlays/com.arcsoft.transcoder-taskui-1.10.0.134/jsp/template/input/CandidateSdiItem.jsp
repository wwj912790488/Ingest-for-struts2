<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="CandidateSdiItem alternate_uri_item">
	<div class="CandidateSdiIndex Hide"></div>
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="common.port"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputColumn2">
				<select name="CandidateSdiPort" class="TaskContentText DefaultSelect">
					<option value="1" >1</option>
					<option value="2" >2</option>
					<option value="3" >3</option>
					<option value="4" >4</option>
				</select>
				<input type="hidden" name="CandidateSdiPortDown" value="<s:property value='[0].uri'/>"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteCandidateSdi MouseHover ICON_Delete"></div>
			</td>
			<td style="width:25px"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing Hide"></div>
	<table class="Hide">
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.program"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="CandidateSdiProgramId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="CandidateSdiProgramIdDown" value="<s:property value="[0].programId"/>"/>
			</td>
			<td class="ProgramColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.audio_track"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="CandidateSdiAudioTrackId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="CandidateSdiAudioTrackIdDown" value="<s:property value="[0].audioTrackId"/>"/>
			</td>
			<td class="ProgramColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.subtitle"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="CandidateSdiSubtitleId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="CandidateSdiSubtitleIdDown" value="<s:property value="[0].subtitleId"/>"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing Hide"></div>
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.media_info"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskContentText CandidateSdiMediaInfo"></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
