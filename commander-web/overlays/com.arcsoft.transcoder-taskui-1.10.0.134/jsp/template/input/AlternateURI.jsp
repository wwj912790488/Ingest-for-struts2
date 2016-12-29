<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AlternateURI alternate_uri_item">
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="AlternateURIIndex TaskLabelText">1</span><span class="TaskLabelText">.</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<input type="text" name="AlternateURI" class="InputURIInput TaskContentText" 
					value="<s:property value='[0].uri'/>">
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td style="width: 30px">
				<div class="DeleteAlternateURI MouseHover ICON_Delete"></div>
			</td>
			<td style="width:25px"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LicenseOptionSrcIp">
		<div class="LineSpacing"></div>
		<table class="">
			<tr>
				<td class="InputColumn0 LabelAlign">
					<span class="TaskLabelText"><s:text name="input.localEth"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td>
					<select name="optionSrcIp" class="TaskContentText DefaultSelect">
						<option value="<s:property value='[0].srcIp'/>" selected="selected"></option>
					</select>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.program"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="AltUriProgramId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="AltUriProgramIdDown" value="<s:property value="[0].programId"/>"/>
			</td>
			<td class="ProgramColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.audio_track"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="AltUriAudioTrackId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="AltUriAudioTrackIdDown" value="<s:property value="[0].audioTrackId"/>"/>
			</td>
			<td class="ProgramColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.subtitle"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="ProgramColumn2">
				<select name="AltUriSubtitleId" class="TaskContentText DefaultSelect">
				</select>
				<input type="hidden" name="AltUriSubtitleIdDown" value="<s:property value="[0].subtitleId"/>"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn0 LabelAlign">
				<span class="TaskLabelText"><s:text name="input.media_info"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td>
				<span class="TaskContentText AltUriMediaInfo"></span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>
